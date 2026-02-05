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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Verify authentication
    const user = verifyToken(req);
    if (!user) {
        return res.status(401).json({ error: 'Non autorizzato' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);

        if (req.method === 'GET') {
            // Get notifications
            const { unread_only = 'false' } = req.query;

            let notifications;
            if (unread_only === 'true') {
                notifications = await sql`
                    SELECT id, type, title, message, data, is_read, created_at
                    FROM notifications
                    WHERE is_read = false
                    ORDER BY created_at DESC
                    LIMIT 50
                `;
            } else {
                notifications = await sql`
                    SELECT id, type, title, message, data, is_read, created_at
                    FROM notifications
                    ORDER BY created_at DESC
                    LIMIT 50
                `;
            }

            // Get unread count
            const countResult = await sql`
                SELECT COUNT(*) as count
                FROM notifications
                WHERE is_read = false
            `;

            return res.status(200).json({
                notifications,
                unread_count: parseInt(countResult[0].count)
            });

        } else if (req.method === 'POST') {
            // Mark notification(s) as read
            const { notification_id, mark_all = false } = req.body;

            if (mark_all) {
                await sql`
                    UPDATE notifications
                    SET is_read = true
                    WHERE is_read = false
                `;
                return res.status(200).json({ success: true, message: 'All notifications marked as read' });
            } else if (notification_id) {
                await sql`
                    UPDATE notifications
                    SET is_read = true
                    WHERE id = ${notification_id}
                `;
                return res.status(200).json({ success: true, message: 'Notification marked as read' });
            } else {
                return res.status(400).json({ error: 'notification_id or mark_all required' });
            }

        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }

    } catch (error) {
        console.error('Error handling notifications:', error);
        return res.status(500).json({
            error: 'Errore nel gestire le notifiche',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
