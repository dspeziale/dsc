import type { VercelRequest, VercelResponse } from '@vercel/node';

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

// In-memory storage (for demo purposes)
// In production, you should use a database or external storage
const messages: ContactMessage[] = [];

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
    const { nome, email, telefono, azienda, servizio, messaggio } = req.body;

    // Validate required fields
    if (!nome || !email || !messaggio) {
      return res.status(400).json({
        error: 'Nome, email e messaggio sono campi obbligatori'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Indirizzo email non valido'
      });
    }

    // Get IP address
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
      || (req.headers['x-real-ip'] as string)
      || req.socket.remoteAddress
      || 'unknown';

    const contactMessage: ContactMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      nome,
      email,
      telefono: telefono || '',
      azienda: azienda || '',
      servizio: servizio || '',
      messaggio,
      timestamp: new Date().toISOString(),
      ip,
    };

    // Store message (in-memory for now)
    messages.push(contactMessage);

    // Log to console (visible in Vercel logs)
    console.log('New contact form submission:', contactMessage);

    // TODO: Integrate with email service
    // You can add email sending here using services like:
    // - Resend (recommended for Vercel)
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // 
    // Example with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@dsconsulting.it',
    //   to: 'info@dsconsulting.it',
    //   subject: `Nuovo contatto da ${nome}`,
    //   html: `<p><strong>Nome:</strong> ${nome}</p>...`
    // });

    return res.status(200).json({
      success: true,
      message: 'Messaggio ricevuto con successo. Ti contatteremo presto!',
      id: contactMessage.id
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      error: 'Errore del server. Riprova più tardi.'
    });
  }
}
