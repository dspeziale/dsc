# API Functions - Setup Guide

## Overview

The project includes two **Node.js Serverless Functions** compatible with Vercel deployment:

1. **Contact Form API** (`/api/contact`) - Handles contact form submissions
2. **Visit Logger API** (`/api/log-visit`) - Tracks page visits for analytics

Both APIs have been converted from Edge Functions to standard Node.js runtime to avoid deployment issues.

## Current Status

✅ **Working**: Both APIs accept requests and validate data
✅ **Logging**: All submissions/visits are logged to Vercel console
⚠️ **Storage**: Currently using in-memory storage (resets on each deployment)
⏳ **Email**: Email notifications not yet configured (contact form only)
⏳ **Analytics**: Consider using Vercel Analytics or third-party service

## File Locations

- `api/contact.ts` - Contact form endpoint
- `api/log-visit.ts` - Visit tracking endpoint

---

# Contact Form API (`/api/contact`)


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

---

# Visit Logger API (`/api/log-visit`)

## How It Works

1. Component `VisitLogger` calls `/api/log-visit` on page load
2. API captures IP, user agent, page, and referrer
3. Visit is logged to console and stored in-memory
4. Keeps last 1000 visits to prevent memory issues

## Analytics Integration (Recommended)

Instead of building custom analytics, consider using:

### Option 1: Vercel Analytics (Recommended)
- **Free tier available**
- **Zero configuration** - just enable in Vercel dashboard
- **Privacy-friendly** - GDPR compliant
- **Real-time data**

Enable in: Vercel Dashboard → Project → Analytics → Enable

### Option 2: Plausible Analytics
- Open-source, privacy-focused
- No cookies, GDPR compliant
- Simple dashboard
- Paid service or self-hosted

### Option 3: Google Analytics 4
- Free and comprehensive
- Requires cookie consent
- More complex setup

### Option 4: Umami
- Open-source alternative
- Self-hosted or cloud
- Privacy-focused

## Disabling Visit Logging

If you prefer to use Vercel Analytics or another service, you can remove the visit logger:

1. Delete `api/log-visit.ts`
2. Remove `<VisitLogger />` from `App.tsx`
3. Remove `src/components/VisitLogger.tsx` (if exists)

---

# Database Integration (Optional)

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
