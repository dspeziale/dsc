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

        const limitNum = parseInt(limit as string);
        const offsetNum = parseInt(offset as string);
        const daysNum = parseInt(days as string);

        console.log('Fetching visits with params:', { limitNum, offsetNum, daysNum });

        // Calculate the date threshold in JavaScript
        const dateThreshold = new Date();
        dateThreshold.setDate(dateThreshold.getDate() - daysNum);
        const dateString = dateThreshold.toISOString();

        console.log('Date threshold:', dateString);

        // Fetch visits from database
        const visits = await sql`
      SELECT id, ip, user_agent, page, referer, timestamp
      FROM visits
      WHERE timestamp >= ${dateString}
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

        // Get page visit counts
        const pageStats = await sql`
      SELECT 
        page,
        COUNT(*) as visits,
        COUNT(DISTINCT ip) as unique_visitors
      FROM visits
      WHERE timestamp >= ${dateString}
      GROUP BY page
      ORDER BY visits DESC
    `;

        console.log('Page stats:', pageStats.length);

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
            pageStats,
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
