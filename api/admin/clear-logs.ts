import { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import jwt from 'jwt-simple';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-this';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verify authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        jwt.decode(token, JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const { days } = req.body;

    if (days === undefined || isNaN(Number(days)) || Number(days) < 0) {
        return res.status(400).json({ error: 'Numero di giorni non valido' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);
        const thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - Number(days));
        const dateString = thresholdDate.toISOString();

        // Delete logs older than the threshold
        await sql`
            DELETE FROM visits 
            WHERE timestamp < ${dateString}
        `;

        // Also clean up ip_lookups that are no longer referenced in visits
        await sql`
            DELETE FROM ip_lookups 
            WHERE ip NOT IN (SELECT DISTINCT ip FROM visits)
        `;

        return res.status(200).json({
            message: `Log più vecchi di ${days} giorni eliminati con successo`
        });
    } catch (error) {
        console.error('Error clearing logs:', error);
        return res.status(500).json({ error: 'Errore durante l\'eliminazione dei log' });
    }
}
