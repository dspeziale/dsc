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

    try {
        const sql = neon(process.env.DATABASE_URL!);

        // Get query parameters
        const {
            limit = '100',
            offset = '0',
            days = '30',
            startDate,
            endDate,
            networkType,
            ipSearch
        } = req.query;

        const limitNum = parseInt(limit as string);
        const offsetNum = parseInt(offset as string);
        const daysNum = parseInt(days as string);

        console.log('Fetching visits with params:', {
            limitNum, offsetNum, daysNum, startDate, endDate, networkType, ipSearch
        });

        // Calculate the date threshold
        let dateString: string;
        if (startDate && typeof startDate === 'string') {
            dateString = new Date(startDate).toISOString();
        } else {
            const dateThreshold = new Date();
            dateThreshold.setDate(dateThreshold.getDate() - daysNum);
            dateString = dateThreshold.toISOString();
        }

        const endDateString = endDate && typeof endDate === 'string'
            ? new Date(endDate).toISOString()
            : new Date().toISOString();

        console.log('Date range:', { dateString, endDateString });

        // Fetch visits from database with filters using proper parameterized queries
        const visits = await sql`
            SELECT id, ip, user_agent, page, referer, timestamp
            FROM visits
            WHERE timestamp >= ${dateString} 
            AND timestamp <= ${endDateString}
            ${ipSearch && typeof ipSearch === 'string' ? sql`AND ip ILIKE ${'%' + ipSearch + '%'}` : sql``}
            ${networkType === 'private' ? sql`AND (ip LIKE '192.168.%' OR ip LIKE '10.%' OR ip LIKE '172.%')` : sql``}
            ${networkType === 'public' ? sql`AND ip NOT LIKE '192.168.%' AND ip NOT LIKE '10.%' AND ip NOT LIKE '172.%'` : sql``}
            ${networkType === 'italian' ? sql`AND (ip LIKE '151.%' OR ip LIKE '93.%' OR ip LIKE '79.%')` : sql``}
            ${networkType === 'european' ? sql`AND (ip LIKE '2.%' OR ip LIKE '5.%')` : sql``}
            ORDER BY timestamp DESC
            LIMIT ${limitNum}
            OFFSET ${offsetNum}
        `;

        console.log('Visits fetched:', visits.length);

        // Get statistics
        const stats = await sql`
      SELECT 
        COUNT(*) as total_visits,
        COUNT(DISTINCT ip) as unique_visitors,
        COUNT(DISTINCT page) as pages_visited
      FROM visits
      WHERE timestamp >= ${dateString}
    `;

        console.log('Stats calculated:', stats[0]);

        // Get IP visit statistics with network description and geolocation
        const { ipLimit = '50', ipOffset = '0' } = req.query;
        const ipLimitNum = parseInt(ipLimit as string);
        const ipOffsetNum = parseInt(ipOffset as string);

        const ipStats = await sql`
      SELECT 
        v.ip,
        COUNT(*) as visits,
        MIN(v.timestamp) as first_visit,
        MAX(v.timestamp) as last_visit,
        i.country,
        i.country_code,
        i.region,
        i.city,
        i.isp,
        i.organization,
        i.asn,
        i.timezone
      FROM visits v
      LEFT JOIN ip_lookups i ON v.ip = i.ip
      WHERE v.timestamp >= ${dateString}
      GROUP BY v.ip, i.country, i.country_code, i.region, i.city, i.isp, i.organization, i.asn, i.timezone
      ORDER BY visits DESC
      LIMIT ${ipLimitNum}
      OFFSET ${ipOffsetNum}
    `;

        // Get total count of unique IPs
        const ipCountResult = await sql`
      SELECT COUNT(DISTINCT ip) as total
      FROM visits
      WHERE timestamp >= ${dateString}
    `;
        const totalIps = parseInt(ipCountResult[0].total);

        // Add network description based on geolocation or IP ranges
        const ipStatsWithNetwork = ipStats.map((stat: any) => {
            const ip = stat.ip;
            let networkDescription = 'Rete Pubblica';

            // Priority 1: Use ISP name from IPWhois
            if (stat.isp) {
                networkDescription = stat.isp;
                // Add ASN if available for better identification
                if (stat.asn) {
                    networkDescription += ` (${stat.asn})`;
                }
            }
            // Priority 2: Use organization name
            else if (stat.organization) {
                networkDescription = stat.organization;
                if (stat.asn) {
                    networkDescription += ` (${stat.asn})`;
                }
            }
            // Priority 3: Use country/city
            else if (stat.country) {
                networkDescription = `${stat.country}${stat.city ? ` - ${stat.city}` : ''}`;
            }
            // Fallback: IP range detection
            else {
                if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
                    networkDescription = 'Rete Privata/Locale';
                } else if (ip.startsWith('151.') || ip.startsWith('93.') || ip.startsWith('79.')) {
                    networkDescription = 'Provider Italiano (Telecom/Fastweb/Wind)';
                } else if (ip.startsWith('2.') || ip.startsWith('5.')) {
                    networkDescription = 'Provider Europeo';
                } else if (ip.startsWith('8.8.') || ip.startsWith('1.1.')) {
                    networkDescription = 'DNS Pubblico (Google/Cloudflare)';
                } else if (ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') {
                    networkDescription = 'Localhost/Sconosciuto';
                }
            }

            return {
                ip: stat.ip,
                visits: stat.visits,
                first_visit: stat.first_visit,
                last_visit: stat.last_visit,
                country: stat.country,
                country_code: stat.country_code,
                region: stat.region,
                city: stat.city,
                isp: stat.isp,
                organization: stat.organization,
                timezone: stat.timezone,
                network_description: networkDescription
            };
        });

        console.log('IP stats:', ipStatsWithNetwork.length);

        // Get visits by date
        const dailyStats = await sql`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as visits,
        COUNT(DISTINCT ip) as unique_visitors
      FROM visits
      WHERE timestamp >= ${dateString}
      GROUP BY DATE(timestamp)
      ORDER BY date DESC
    `;

        console.log('Daily stats:', dailyStats.length);

        return res.status(200).json({
            visits,
            stats: stats[0],
            ipStats: ipStatsWithNetwork,
            totalIps,
            dailyStats,
            limit: limitNum,
            offset: offsetNum,
            days: daysNum,
        });

    } catch (error) {
        console.error('Error fetching visits:', error);
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
        return res.status(500).json({
            error: 'Errore nel recupero delle statistiche',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
