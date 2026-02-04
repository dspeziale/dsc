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
        const { limit = '100', offset = '0', days = '30' } = req.query;

        // Fetch visits from database
        const visits = await sql`
      SELECT id, ip, user_agent, page, referer, timestamp
      FROM visits
      WHERE timestamp >= NOW() - INTERVAL '${parseInt(days as string)} days'
      ORDER BY timestamp DESC
      LIMIT ${parseInt(limit as string)}
      OFFSET ${parseInt(offset as string)}
    `;

        // Get statistics
        const stats = await sql`
      SELECT 
        COUNT(*) as total_visits,
        COUNT(DISTINCT ip) as unique_visitors,
        COUNT(DISTINCT page) as pages_visited
      FROM visits
      WHERE timestamp >= NOW() - INTERVAL '${parseInt(days as string)} days'
    `;

        // Get page visit counts
        const pageStats = await sql`
      SELECT 
        page,
        COUNT(*) as visits,
        COUNT(DISTINCT ip) as unique_visitors
      FROM visits
      WHERE timestamp >= NOW() - INTERVAL '${parseInt(days as string)} days'
      GROUP BY page
      ORDER BY visits DESC
    `;

        // Get visits by date
        const dailyStats = await sql`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as visits,
        COUNT(DISTINCT ip) as unique_visitors
      FROM visits
      WHERE timestamp >= NOW() - INTERVAL '${parseInt(days as string)} days'
      GROUP BY DATE(timestamp)
      ORDER BY date DESC
    `;

        return res.status(200).json({
            visits,
            stats: stats[0],
            pageStats,
            dailyStats,
            limit: parseInt(limit as string),
            offset: parseInt(offset as string),
            days: parseInt(days as string),
        });

    } catch (error) {
        console.error('Error fetching visits:', error);
        return res.status(500).json({
            error: 'Errore nel recupero delle statistiche'
        });
    }
}
