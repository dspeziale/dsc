# API Contact Form - Setup Guide

## Overview

The contact form API is now configured as a **Node.js Serverless Function** compatible with Vercel deployment.

## Current Status

✅ **Working**: The API accepts form submissions and validates data
✅ **Logging**: All submissions are logged to Vercel console
⚠️ **Storage**: Currently using in-memory storage (resets on each deployment)
⏳ **Email**: Email notifications not yet configured

## File Location

`api/contact.ts` - Serverless function endpoint

## How It Works

1. User submits contact form on `/contatti` page
2. Form data is sent to `/api/contact` endpoint
3. API validates required fields (nome, email, messaggio)
4. API validates email format
5. Message is logged and stored (in-memory)
6. Success response is returned to user

## Next Steps: Email Integration

To receive email notifications when users submit the contact form, you need to integrate an email service.

### Recommended: Resend (Best for Vercel)

1. **Sign up for Resend**: https://resend.com
2. **Get API Key**: Create an API key in Resend dashboard
3. **Add to Vercel**: 
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add: `RESEND_API_KEY` = your-api-key

4. **Install Resend**:
   ```bash
   npm install resend
   ```

5. **Update `api/contact.ts`**:
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // Inside the handler, after validation:
   await resend.emails.send({
     from: 'noreply@yourdomain.com',
     to: 'info@dsconsulting.it',
     subject: `Nuovo contatto da ${nome}`,
     html: `
       <h2>Nuovo messaggio dal form di contatto</h2>
       <p><strong>Nome:</strong> ${nome}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Telefono:</strong> ${telefono}</p>
       <p><strong>Azienda:</strong> ${azienda}</p>
       <p><strong>Servizio:</strong> ${servizio}</p>
       <p><strong>Messaggio:</strong></p>
       <p>${messaggio}</p>
     `
   });
   ```

### Alternative: SendGrid

1. **Sign up**: https://sendgrid.com
2. **Get API Key**
3. **Add to Vercel Environment Variables**: `SENDGRID_API_KEY`
4. **Install**: `npm install @sendgrid/mail`
5. **Update code** (see SendGrid documentation)

### Alternative: Mailgun

1. **Sign up**: https://www.mailgun.com
2. **Get API Key and Domain**
3. **Add to Vercel**: `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`
4. **Install**: `npm install mailgun.js`

## Database Integration (Optional)

For persistent storage of contact messages:

### Option 1: Vercel Postgres
```bash
npm install @vercel/postgres
```

### Option 2: MongoDB Atlas
```bash
npm install mongodb
```

### Option 3: Supabase
```bash
npm install @supabase/supabase-js
```

## Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

- `RESEND_API_KEY` - For email sending (if using Resend)
- `ADMIN_EMAIL` - Email address to receive notifications
- `DATABASE_URL` - If using database storage (optional)

## Testing Locally

To test the API locally:

```bash
npm run dev
```

Then submit the contact form at http://localhost:5174/contatti

Check the terminal for logged messages.

## Deployment

The API will automatically deploy with your Vercel project. No additional configuration needed.

## Security Notes

- ✅ CORS headers configured
- ✅ Email validation implemented
- ✅ Required field validation
- ✅ IP address logging for spam prevention
- ⚠️ Consider adding rate limiting for production
- ⚠️ Consider adding CAPTCHA for spam prevention

## Troubleshooting

**Error: "Method not allowed"**
- Make sure you're sending a POST request

**Error: "Campi obbligatori mancanti"**
- Ensure nome, email, and messaggio fields are filled

**Email not sending**
- Check Vercel logs for errors
- Verify environment variables are set
- Check email service API key is valid

## Support

For issues or questions, check:
- Vercel Logs: Project Dashboard → Deployments → Function Logs
- API endpoint: https://your-domain.vercel.app/api/contact
