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

        // Check if token is expired
        if (decoded.exp && decoded.exp < Date.now()) {
            return null;
        }

        return decoded;
    } catch (error) {
        return null;
    }
}

interface IpApiResponse {
    ip: string;
    country?: string;
    country_code?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    org?: string;
    timezone?: string;
}

async function lookupIpGeolocation(ip: string): Promise<IpApiResponse | null> {
    // Skip lookup for localhost and private IPs
    if (ip === 'unknown' || ip === '::1' || ip === '127.0.0.1' ||
        ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
        return null;
    }

    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`, {
            headers: {
                'User-Agent': 'DS-Consulting-Admin/1.0'
            }
        });

        if (!response.ok) {
            console.error(`IP lookup failed for ${ip}: ${response.status}`);
            return null;
        }

        const data = await response.json();

        // Check for error in response
        if (data.error) {
            console.error(`IP lookup error for ${ip}:`, data.reason);
            return null;
        }

        return {
            ip: data.ip,
            country: data.country_name,
            country_code: data.country_code,
            region: data.region,
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude,
            org: data.org,
            timezone: data.timezone
        };
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verify authentication
    const user = verifyToken(req);
    if (!user) {
        return res.status(401).json({ error: 'Non autorizzato' });
    }

    const { ip } = req.query;

    if (!ip || typeof ip !== 'string') {
        return res.status(400).json({ error: 'IP address required' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);

        // Check cache first
        const cached = await sql`
            SELECT * FROM ip_lookups
            WHERE ip = ${ip}
            AND cached_at > NOW() - INTERVAL '30 days'
            LIMIT 1
        `;

        if (cached.length > 0) {
            console.log(`Cache hit for IP: ${ip}`);
            return res.status(200).json({
                ...cached[0],
                cached: true
            });
        }

        // Lookup from external API
        console.log(`Cache miss for IP: ${ip}, looking up...`);
        const geoData = await lookupIpGeolocation(ip);

        if (!geoData) {
            return res.status(200).json({
                ip,
                country: null,
                city: null,
                cached: false
            });
        }

        // Store in cache
        await sql`
            INSERT INTO ip_lookups (
                ip, country, country_code, region, city, 
                latitude, longitude, isp, organization, timezone
            ) VALUES (
                ${ip}, ${geoData.country}, ${geoData.country_code}, 
                ${geoData.region}, ${geoData.city}, ${geoData.latitude}, 
                ${geoData.longitude}, ${geoData.org}, ${geoData.org}, 
                ${geoData.timezone}
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
                timezone = EXCLUDED.timezone,
                cached_at = CURRENT_TIMESTAMP
        `;

        return res.status(200).json({
            ip: geoData.ip,
            country: geoData.country,
            country_code: geoData.country_code,
            region: geoData.region,
            city: geoData.city,
            latitude: geoData.latitude,
            longitude: geoData.longitude,
            isp: geoData.org,
            organization: geoData.org,
            timezone: geoData.timezone,
            cached: false
        });

    } catch (error) {
        console.error('Error in IP lookup:', error);
        return res.status(500).json({
            error: 'Errore nel lookup IP',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
