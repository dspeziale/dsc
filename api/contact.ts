import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

interface ContactMessage {
  id?: number;
  nome: string;
  email: string;
  telefono: string;
  azienda: string;
  servizio: string;
  messaggio: string;
  ip: string;
  timestamp?: string;
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

    // Connect to Neon database
    const sql = neon(process.env.DATABASE_URL!);

    // Insert contact message into database
    const result = await sql`
      INSERT INTO contacts (nome, email, telefono, azienda, servizio, messaggio, ip)
      VALUES (${nome}, ${email}, ${telefono || ''}, ${azienda || ''}, ${servizio || ''}, ${messaggio}, ${ip})
      RETURNING id, timestamp
    `;

    const contactId = result[0].id;
    const timestamp = result[0].timestamp;

    // Create notification for new contact
    try {
      await sql`
        INSERT INTO notifications (type, title, message, data, is_read)
        VALUES (
          'new_contact',
          'Nuovo Contatto',
          ${`Nuovo messaggio da ${nome} (${email})`},
          ${JSON.stringify({ contact_id: contactId, nome, email, servizio })},
          false
        )
      `;
    } catch (notifError) {
      console.error('Error creating notification:', notifError);
      // Continue even if notification fails
    }

    // Log to console (visible in Vercel logs)
    console.log('New contact form submission:', {
      id: contactId,
      nome,
      email,
      timestamp,
    });

    // TODO: Send email notification
    // You can add email sending here using services like:
    // - Resend (recommended for Vercel)
    // - SendGrid
    // - Mailgun
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
      id: contactId
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      error: 'Errore del server. Riprova più tardi.'
    });
  }
}
