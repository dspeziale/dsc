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

function convertToCSV(data: any[], headers: string[]): string {
    const csvRows = [];

    // Add header row
    csvRows.push(headers.join(','));

    // Add data rows
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header.toLowerCase().replace(/ /g, '_')];
            // Escape quotes and wrap in quotes if contains comma
            const escaped = String(value || '').replace(/"/g, '""');
            return escaped.includes(',') ? `"${escaped}"` : escaped;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
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

    const { type, format = 'csv', startDate, endDate, networkType, ipSearch, searchText } = req.query;

    if (!type || (type !== 'visits' && type !== 'contacts')) {
        return res.status(400).json({ error: 'Type must be "visits" or "contacts"' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);
        let data: any[] = [];
        let headers: string[] = [];
        let filename = '';

        if (type === 'visits') {
            // Calculate date range
            let dateString: string;
            if (startDate && typeof startDate === 'string') {
                dateString = new Date(startDate).toISOString();
            } else {
                const dateThreshold = new Date();
                dateThreshold.setDate(dateThreshold.getDate() - 30);
                dateString = dateThreshold.toISOString();
            }

            const endDateString = endDate && typeof endDate === 'string'
                ? new Date(endDate).toISOString()
                : new Date().toISOString();

            // Fetch visits with geolocation
            const visits = await sql`
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
                    i.organization
                FROM visits v
                LEFT JOIN ip_lookups i ON v.ip = i.ip
                WHERE v.timestamp >= ${dateString}
                AND v.timestamp <= ${endDateString}
                ${ipSearch && typeof ipSearch === 'string' ? sql`AND v.ip ILIKE ${'%' + ipSearch + '%'}` : sql``}
                ${networkType === 'private' ? sql`AND (v.ip LIKE '192.168.%' OR v.ip LIKE '10.%' OR v.ip LIKE '172.%')` : sql``}
                ${networkType === 'public' ? sql`AND v.ip NOT LIKE '192.168.%' AND v.ip NOT LIKE '10.%' AND v.ip NOT LIKE '172.%'` : sql``}
                ${networkType === 'italian' ? sql`AND (v.ip LIKE '151.%' OR v.ip LIKE '93.%' OR v.ip LIKE '79.%')` : sql``}
                ${networkType === 'european' ? sql`AND (v.ip LIKE '2.%' OR v.ip LIKE '5.%')` : sql``}
                GROUP BY v.ip, i.country, i.country_code, i.region, i.city, i.isp, i.organization
                ORDER BY visits DESC
            `;

            data = visits;
            headers = ['IP', 'Visits', 'Country', 'City', 'ISP', 'First Visit', 'Last Visit'];
            filename = `visits_${new Date().toISOString().split('T')[0]}.csv`;

        } else if (type === 'contacts') {
            // Fetch contacts
            const contacts = await sql`
                SELECT nome, email, telefono, azienda, servizio, messaggio, ip, timestamp
                FROM contacts
                ${searchText && typeof searchText === 'string' ? sql`
                    WHERE nome ILIKE ${'%' + searchText + '%'} 
                    OR email ILIKE ${'%' + searchText + '%'}
                    OR azienda ILIKE ${'%' + searchText + '%'}
                ` : sql``}
                ORDER BY timestamp DESC
            `;

            data = contacts;
            headers = ['Nome', 'Email', 'Telefono', 'Azienda', 'Servizio', 'Messaggio', 'IP', 'Timestamp'];
            filename = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
        }

        if (format === 'csv') {
            const csv = convertToCSV(data, headers);

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

            return res.status(200).send(csv);
        } else {
            // For future Excel support
            return res.status(400).json({ error: 'Only CSV format is currently supported' });
        }

    } catch (error) {
        console.error('Error exporting data:', error);
        return res.status(500).json({
            error: 'Errore durante l\'esportazione',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
