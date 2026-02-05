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
        const { limit = '50', offset = '0', searchText } = req.query;

        // Build WHERE clause for search
        let contacts, countResult;

        if (searchText && typeof searchText === 'string') {
            contacts = await sql`
                SELECT id, nome, email, telefono, azienda, servizio, messaggio, ip, timestamp
                FROM contacts
                WHERE nome ILIKE ${'%' + searchText + '%'}
                OR email ILIKE ${'%' + searchText + '%'}
                OR azienda ILIKE ${'%' + searchText + '%'}
                ORDER BY timestamp DESC
                LIMIT ${parseInt(limit as string)}
                OFFSET ${parseInt(offset as string)}
            `;

            countResult = await sql`
                SELECT COUNT(*) as total FROM contacts
                WHERE nome ILIKE ${'%' + searchText + '%'}
                OR email ILIKE ${'%' + searchText + '%'}
                OR azienda ILIKE ${'%' + searchText + '%'}
            `;
        } else {
            contacts = await sql`
                SELECT id, nome, email, telefono, azienda, servizio, messaggio, ip, timestamp
                FROM contacts
                ORDER BY timestamp DESC
                LIMIT ${parseInt(limit as string)}
                OFFSET ${parseInt(offset as string)}
            `;

            countResult = await sql`
                SELECT COUNT(*) as total FROM contacts
            `;
        }

        const total = parseInt(countResult[0].total);

        return res.status(200).json({
            contacts,
            total,
            limit: parseInt(limit as string),
            offset: parseInt(offset as string),
        });

    } catch (error) {
        console.error('Error fetching contacts:', error);
        return res.status(500).json({
            error: 'Errore nel recupero dei contatti'
        });
    }
}
