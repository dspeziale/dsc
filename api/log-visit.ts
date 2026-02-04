import { put, list } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

interface VisitLog {
  ip: string;
  timestamp: string;
  userAgent: string;
  page: string;
  referer: string;
}

export default async function handler(request: Request) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers,
    });
  }

  try {
    const body = await request.json();

    // Get IP from headers (Vercel forwards the real IP)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'direct';

    const visitLog: VisitLog = {
      ip,
      timestamp: new Date().toISOString(),
      userAgent,
      page: body.page || '/',
      referer,
    };

    // Read existing logs
    const blobName = 'visits.json';
    let visits: VisitLog[] = [];

    try {
      const { blobs } = await list({ prefix: blobName });
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].url);
        visits = await response.json();
      }
    } catch {
      // File doesn't exist yet, start with empty array
      visits = [];
    }

    // Add new visit
    visits.push(visitLog);

    // Keep only last 1000 visits to avoid blob size issues
    if (visits.length > 1000) {
      visits = visits.slice(-1000);
    }

    // Save updated logs
    await put(blobName, JSON.stringify(visits, null, 2), {
      access: 'public',
      addRandomSuffix: false,
    });

    return new Response(JSON.stringify({ success: true, logged: visitLog }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error logging visit:', error);
    return new Response(JSON.stringify({ error: 'Failed to log visit' }), {
      status: 500,
      headers,
    });
  }
}
