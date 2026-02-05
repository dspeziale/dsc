import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import jwt from 'jwt-simple';

// Middleware to verify JWT token
function verifyToken(req: VercelRequest): { email: string } | null {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET || 'default-secret-change-this';

    try {
        const decoded = jwt.decode(token, jwtSecret);

        if (decoded.exp && decoded.exp < Date.now()) {
            return null;
        }

        return decoded;
    } catch (error) {
        return null;
    }
}

interface IpWhoisResponse {
    ip: string;
    success: boolean;
    country?: string;
    country_code?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    asn?: string;
    org?: string;
    isp?: string;
    timezone?: string;
}

async function lookupIpGeolocation(ip: string): Promise<IpWhoisResponse | null> {
    // Skip lookup for localhost and private IPs
    if (ip === 'unknown' || ip === '::1' || ip === '127.0.0.1' ||
        ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
        return null;
    }

    try {
        const response = await fetch(`https://ipwhois.app/json/${ip}`, {
            headers: {
                'User-Agent': 'DS-Consulting-Admin/1.0'
            }
        });

        if (!response.ok) {
            console.error(`IP lookup failed for ${ip}: ${response.status}`);
            return null;
        }

        const data: IpWhoisResponse = await response.json();

        if (!data.success) {
            console.error(`IP lookup error for ${ip}: Request failed`);
            return null;
        }

        return data;
    } catch (error) {
        console.error(`Error looking up IP ${ip}:`, error);
        return null;
    }
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verify authentication
    const user = verifyToken(req);
    if (!user) {
        return res.status(401).json({ error: 'Non autorizzato' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);

        // Get all unique IPs from visits that don't have geolocation data yet
        const ipsToLookup = await sql`
            SELECT DISTINCT v.ip
            FROM visits v
            LEFT JOIN ip_lookups i ON v.ip = i.ip
            WHERE i.ip IS NULL
            AND v.ip NOT LIKE '192.168.%'
            AND v.ip NOT LIKE '10.%'
            AND v.ip NOT LIKE '172.%'
            AND v.ip != 'unknown'
            AND v.ip != '::1'
            AND v.ip != '127.0.0.1'
            LIMIT 50
        `;

        console.log(`Found ${ipsToLookup.length} IPs to lookup`);

        let successCount = 0;
        let failCount = 0;

        // Lookup each IP with a small delay to respect rate limits
        for (const row of ipsToLookup) {
            const ip = row.ip;
            console.log(`Looking up IP: ${ip}`);

            const geoData = await lookupIpGeolocation(ip);

            if (geoData) {
                // Store in cache
                await sql`
                    INSERT INTO ip_lookups (
                        ip, country, country_code, region, city, 
                        latitude, longitude, isp, organization, asn, timezone
                    ) VALUES (
                        ${ip}, ${geoData.country || null}, ${geoData.country_code || null}, 
                        ${geoData.region || null}, ${geoData.city || null}, 
                        ${geoData.latitude || null}, ${geoData.longitude || null}, 
                        ${geoData.isp || null}, ${geoData.org || null}, 
                        ${geoData.asn || null}, ${geoData.timezone || null}
                    )
                    ON CONFLICT (ip) DO UPDATE SET
                        country = EXCLUDED.country,
                        country_code = EXCLUDED.country_code,
                        region = EXCLUDED.region,
                        city = EXCLUDED.city,
                        latitude = EXCLUDED.latitude,
                        longitude = EXCLUDED.longitude,
                        isp = EXCLUDED.isp,
                        organization = EXCLUDED.organization,
                        asn = EXCLUDED.asn,
                        timezone = EXCLUDED.timezone,
                        cached_at = CURRENT_TIMESTAMP
                `;
                successCount++;
                console.log(`✓ Successfully cached ${ip}: ${geoData.isp || geoData.org || 'Unknown'}`);
            } else {
                failCount++;
                console.log(`✗ Failed to lookup ${ip}`);
            }

            // Small delay to respect rate limits (100ms between requests)
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return res.status(200).json({
            success: true,
            message: `IP refresh completato`,
            total: ipsToLookup.length,
            successful: successCount,
            failed: failCount
        });

    } catch (error) {
        console.error('Error refreshing IPs:', error);
        return res.status(500).json({
            error: 'Errore nel refresh degli IP',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
