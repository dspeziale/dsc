import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import jwt from 'jwt-simple';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-this';

// Middleware to verify JWT token
function verifyToken(req: VercelRequest): { email: string } | null {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    const token = authHeader.substring(7);
    try {
        const decoded = jwt.decode(token, JWT_SECRET);
        if (decoded.exp && decoded.exp < Date.now()) return null;
        return decoded;
    } catch (error) {
        return null;
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Non autorizzato' });

    try {
        const sql = neon(process.env.DATABASE_URL!);

        // 1. Visits per hour (Last 24 hours)
        const hourlyStats = await sql`
            SELECT 
                DATE_TRUNC('hour', timestamp) as hour,
                COUNT(*) as visits,
                COUNT(DISTINCT ip) as unique_visitors
            FROM visits
            WHERE timestamp >= NOW() - INTERVAL '24 hours'
            GROUP BY hour
            ORDER BY hour ASC
        `;

        // 2. Top Countries (Last 7 days)
        const countryStats = await sql`
            SELECT 
                COALESCE(i.country, 'Sconosciuto') as name,
                i.country_code as code,
                COUNT(*) as value
            FROM visits v
            LEFT JOIN ip_lookups i ON v.ip = i.ip
            WHERE v.timestamp >= NOW() - INTERVAL '7 days'
            GROUP BY i.country, i.country_code
            ORDER BY value DESC
            LIMIT 10
        `;

        // 3. Browser Distribution (Last 7 days)
        // Simple regex-based extraction for common browsers
        const browserStats = await sql`
            SELECT 
                CASE 
                    WHEN user_agent ILIKE '%edg%' THEN 'Edge'
                    WHEN user_agent ILIKE '%chrome%' THEN 'Chrome'
                    WHEN user_agent ILIKE '%safari%' AND NOT (user_agent ILIKE '%chrome%') THEN 'Safari'
                    WHEN user_agent ILIKE '%firefox%' THEN 'Firefox'
                    ELSE 'Altri'
                END as name,
                COUNT(*) as value
            FROM visits
            WHERE timestamp >= NOW() - INTERVAL '7 days'
            GROUP BY name
            ORDER BY value DESC
        `;

        // 4. Recent Activity (Last 10 visits)
        const recentActivity = await sql`
            SELECT 
                v.id,
                v.ip,
                v.page,
                v.timestamp,
                COALESCE(i.isp, 'Sconosciuto') as isp,
                i.country_code
            FROM visits v
            LEFT JOIN ip_lookups i ON v.ip = i.ip
            ORDER BY v.timestamp DESC
            LIMIT 10
        `;

        return res.status(200).json({
            hourlyStats,
            countryStats,
            browserStats,
            recentActivity
        });

    } catch (error) {
        console.error('Analytics API Error:', error);
        return res.status(500).json({ error: 'Errore generico nel caricamento analytics' });
    }
}
