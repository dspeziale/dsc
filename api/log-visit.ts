import type { VercelRequest, VercelResponse } from '@vercel/node';

interface VisitLog {
  ip: string;
  timestamp: string;
  userAgent: string;
  page: string;
  referer: string;
}

// In-memory storage for visit logs
// In production, consider using a database or analytics service
const visits: VisitLog[] = [];

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

    const visitLog: VisitLog = {
      ip,
      timestamp: new Date().toISOString(),
      userAgent,
      page: page || '/',
      referer,
    };

    // Add new visit
    visits.push(visitLog);

    // Keep only last 1000 visits to avoid memory issues
    if (visits.length > 1000) {
      visits.shift(); // Remove oldest visit
    }

    // Log to console (visible in Vercel logs)
    console.log('Page visit logged:', visitLog);

    // TODO: For production, consider integrating with analytics services:
    // - Google Analytics
    // - Plausible Analytics
    // - Umami
    // - Vercel Analytics (built-in)
    // 
    // Or store in a database:
    // - Vercel Postgres
    // - MongoDB Atlas
    // - Supabase

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
