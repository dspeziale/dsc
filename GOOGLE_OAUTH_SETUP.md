# Google OAuth Admin Setup Guide

## Overview

This guide will help you set up Google OAuth authentication for the admin panel.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "DS Consulting Admin")
4. Click "Create"

## Step 2: Enable Google+ API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: DS Consulting Admin
   - User support email: your email
   - Developer contact: your email
   - Click "Save and Continue"
   - Scopes: Skip this step
   - Test users: Add your admin email(s)
   - Click "Save and Continue"

4. Back to Create OAuth client ID:
   - Application type: **Web application**
   - Name: DS Consulting Web Client
   
5. **Authorized JavaScript origins:**
   - `http://localhost:5174` (for local development)
   - `https://your-domain.vercel.app` (for production)
   
6. **Authorized redirect URIs:**
   - `http://localhost:5174` (for local development)
   - `https://your-domain.vercel.app` (for production)

7. Click "Create"

8. **Copy your credentials:**
   - Client ID (looks like: `xxxxx.apps.googleusercontent.com`)
   - Client Secret

## Step 4: Configure Environment Variables

### Local Development

Create a `.env.local` file in your project root:

```env
# Frontend variable (exposed to browser)
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

# Backend variables (server-only)
GOOGLE_CLIENT_SECRET=your-client-secret
JWT_SECRET=your-random-secret-key-min-32-chars
ADMIN_EMAILS=your-email@gmail.com,another-admin@gmail.com
DATABASE_URL=your-neon-database-url
```

### Vercel Production

1. Go to Vercel Dashboard → Your Project
2. Go to Settings → Environment Variables
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_GOOGLE_CLIENT_ID` | Your Google Client ID | Production, Preview, Development |
| `GOOGLE_CLIENT_SECRET` | Your Google Client Secret | Production, Preview, Development |
| `JWT_SECRET` | Random 32+ character string | Production, Preview, Development |
| `ADMIN_EMAILS` | Comma-separated admin emails | Production, Preview, Development |
| `DATABASE_URL` | Your Neon database URL | Production, Preview, Development |

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 5: Test Locally

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5174/admin`
3. You should be redirected to `/login`
4. Click "Sign in with Google"
5. Select your Google account
6. If your email is in `ADMIN_EMAILS`, you'll be redirected to `/admin`

## Step 6: Deploy to Vercel

```bash
git add .
git commit -m "Add Google OAuth admin panel"
git push
```

Vercel will automatically deploy with the environment variables you configured.

## Security Checklist

✅ **Client ID** is public (safe to expose in frontend)
✅ **Client Secret** is server-only (never exposed to frontend)
✅ **JWT Secret** is strong (32+ characters, random)
✅ **ADMIN_EMAILS** contains only authorized emails
✅ **HTTPS** is enforced in production (Vercel does this automatically)
✅ **Authorized origins** match your domains exactly

## Troubleshooting

### "Access blocked: This app's request is invalid"
- Check that your redirect URIs match exactly (no trailing slashes)
- Ensure your domain is added to Authorized JavaScript origins

### "Email not authorized"
- Check that your email is in the `ADMIN_EMAILS` environment variable
- Ensure there are no typos or extra spaces
- Emails are case-sensitive

### "Invalid Google token"
- Check that `GOOGLE_CLIENT_SECRET` is set correctly in Vercel
- Verify the Client ID matches in both Google Console and Vercel

### "VITE_GOOGLE_CLIENT_ID is undefined"
- Environment variables with `VITE_` prefix must be set at build time
- Redeploy after adding the variable in Vercel
- For local dev, restart the dev server after adding to `.env.local`

## Admin Panel Features

Once logged in, you can:

- 📧 View all contact form submissions
- 📊 See visit analytics and statistics
- 👥 Track unique visitors
- 📈 Monitor page visit counts
- 🔍 Filter and search data

## Adding More Admin Users

Simply add their email addresses to the `ADMIN_EMAILS` environment variable:

```env
ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com,admin3@company.com
```

Then redeploy or restart your dev server.

## Next Steps

- Set up email notifications for new contacts (see `API_SETUP.md`)
- Add data export functionality
- Create custom analytics dashboards
- Implement rate limiting for security
