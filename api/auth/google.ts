import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as jwt from 'jwt-simple';

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
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ error: 'Missing credential' });
        }

        // Verify Google token
        const response = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
        );

        if (!response.ok) {
            return res.status(401).json({ error: 'Invalid Google token' });
        }

        const googleUser = await response.json();

        // Check if email is in whitelist
        const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim());

        if (!adminEmails.includes(googleUser.email)) {
            return res.status(403).json({
                error: 'Accesso negato. Email non autorizzata.'
            });
        }

        // Create JWT token
        const jwtSecret = process.env.JWT_SECRET || 'default-secret-change-this';
        const token = jwt.encode(
            {
                email: googleUser.email,
                name: googleUser.name,
                picture: googleUser.picture,
                exp: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
            },
            jwtSecret
        );

        return res.status(200).json({
            token,
            user: {
                email: googleUser.email,
                name: googleUser.name,
                picture: googleUser.picture,
            },
        });

    } catch (error) {
        console.error('Google auth error:', error);
        return res.status(500).json({
            error: 'Errore durante l\'autenticazione'
        });
    }
}
