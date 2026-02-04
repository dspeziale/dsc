import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

interface VisitLog {
  id?: number;
  ip: string;
  timestamp?: string;
  userAgent: string;
  page: string;
  referer: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page } = req.body;

    // Get IP from headers (Vercel forwards the real IP)
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
      || (req.headers['x-real-ip'] as string)
      || req.socket.remoteAddress
      || 'unknown';

    const userAgent = req.headers['user-agent'] || 'unknown';
    const referer = req.headers['referer'] || 'direct';

    // Connect to Neon database
    const sql = neon(process.env.DATABASE_URL!);

    // Insert visit log into database
    const result = await sql`
      INSERT INTO visits (ip, user_agent, page, referer)
      VALUES (${ip}, ${userAgent}, ${page || '/'}, ${referer})
      RETURNING id, timestamp
    `;

    const visitLog = {
      id: result[0].id,
      ip,
      timestamp: result[0].timestamp,
      userAgent,
      page: page || '/',
      referer,
    };

    // Log to console (visible in Vercel logs)
    console.log('Page visit logged:', visitLog);

    return res.status(200).json({
      success: true,
      logged: visitLog
    });

  } catch (error) {
    console.error('Error logging visit:', error);
    return res.status(500).json({
      error: 'Failed to log visit'
    });
  }
}
