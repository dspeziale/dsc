import { put, list } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

interface ContactMessage {
  id: string;
  nome: string;
  email: string;
  telefono: string;
  azienda: string;
  servizio: string;
  messaggio: string;
  timestamp: string;
  ip: string;
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

    // Validate required fields
    if (!body.nome || !body.email || !body.messaggio) {
      return new Response(JSON.stringify({ error: 'Campi obbligatori mancanti' }), {
        status: 400,
        headers,
      });
    }

    // Get IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    const contactMessage: ContactMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      nome: body.nome,
      email: body.email,
      telefono: body.telefono || '',
      azienda: body.azienda || '',
      servizio: body.servizio || '',
      messaggio: body.messaggio,
      timestamp: new Date().toISOString(),
      ip,
    };

    // Read existing messages
    const blobName = 'contacts.json';
    let messages: ContactMessage[] = [];

    try {
      const { blobs } = await list({ prefix: blobName });
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].url);
        messages = await response.json();
      }
    } catch {
      // File doesn't exist yet
      messages = [];
    }

    // Add new message
    messages.push(contactMessage);

    // Save updated messages
    await put(blobName, JSON.stringify(messages, null, 2), {
      access: 'public',
      addRandomSuffix: false,
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Messaggio ricevuto con successo',
      id: contactMessage.id
    }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    return new Response(JSON.stringify({ error: 'Errore nel salvataggio del messaggio' }), {
      status: 500,
      headers,
    });
  }
}
