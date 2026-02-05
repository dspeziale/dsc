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

        // Get IP visit statistics grouped by network owner (ISP/Organization)
        const { ipLimit = '50', ipOffset = '0' } = req.query;
        const ipLimitNum = parseInt(ipLimit as string);
        const ipOffsetNum = parseInt(ipOffset as string);

        const ipStats = await sql`
      SELECT 
        COALESCE(i.isp, i.organization, 'Sconosciuto') as network_owner,
        i.asn,
        STRING_AGG(DISTINCT i.country_code, ', ' ORDER BY i.country_code) as country_codes,
        STRING_AGG(DISTINCT i.country, ', ' ORDER BY i.country) as countries,
        COUNT(DISTINCT v.ip) as unique_ips,
        COUNT(*) as visits,
        MIN(v.timestamp) as first_visit,
        MAX(v.timestamp) as last_visit,
        STRING_AGG(DISTINCT v.ip, ', ' ORDER BY v.ip) as ip_list
      FROM visits v
      LEFT JOIN ip_lookups i ON v.ip = i.ip
      WHERE v.timestamp >= ${dateString}
      GROUP BY i.isp, i.organization, i.asn
      ORDER BY visits DESC
      LIMIT ${ipLimitNum}
      OFFSET ${ipOffsetNum}
    `;

        // Get total count of unique network owners
        const ownerCountResult = await sql`
      SELECT COUNT(DISTINCT COALESCE(i.isp, i.organization, 'Sconosciuto')) as total
      FROM visits v
      LEFT JOIN ip_lookups i ON v.ip = i.ip
      WHERE v.timestamp >= ${dateString}
    `;
        const totalIps = parseInt(ownerCountResult[0].total);

        // Add network description based on geolocation or IP ranges
        const ipStatsWithNetwork = ipStats.map((stat: any) => {
            let networkDescription = stat.network_owner;

            // Add ASN if available
            if (stat.asn) {
                networkDescription += ` (${stat.asn})`;
            }

            // Fallback for unknown networks
            if (networkDescription === 'Sconosciuto' || !networkDescription) {
                // Try to identify by IP pattern from the list
                const firstIp = stat.ip_list?.split(',')[0]?.trim();
                if (firstIp) {
                    if (firstIp.startsWith('192.168.') || firstIp.startsWith('10.') || firstIp.startsWith('172.')) {
                        networkDescription = 'Rete Privata/Locale';
                    } else if (firstIp.startsWith('151.') || firstIp.startsWith('93.') || firstIp.startsWith('79.')) {
                        networkDescription = 'Provider Italiano';
                    } else if (firstIp.startsWith('2.') || firstIp.startsWith('5.')) {
                        networkDescription = 'Provider Europeo';
                    } else {
                        networkDescription = 'Rete Pubblica';
                    }
                }
            }

            return {
                network_owner: stat.network_owner,
                network_description: networkDescription,
                asn: stat.asn,
                countries: stat.countries,
                country_codes: stat.country_codes,
                unique_ips: stat.unique_ips,
                visits: stat.visits,
                first_visit: stat.first_visit,
                last_visit: stat.last_visit,
                ip_list: stat.ip_list
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
