import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);

        // Get the start of today in UTC
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString();

        // Count unique IPs for today
        const result = await sql`
            SELECT COUNT(DISTINCT ip) as count
            FROM visits
            WHERE timestamp >= ${todayStr}
        `;

        const count = parseInt(result[0].count);

        return res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
