# Neon Database Setup Guide

## 1. Create Neon Database

1. Go to https://neon.tech
2. Sign up / Log in
3. Click **"Create a project"**
4. Choose a name (e.g., "ds-consulting-db")
5. Select region closest to your users
6. Click **Create project**

## 2. Get Connection String

After creating the project, Neon will show you a connection string like:

```
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
```

Copy this connection string.

## 3. Add to Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project
2. Go to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your Neon connection string
   - **Environment**: Production, Preview, Development (select all)
4. Click **Save**

## 4. Create Database Tables

In the Neon dashboard, go to **SQL Editor** and run this SQL:

```sql
-- Table for visit logs
CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  ip VARCHAR(45) NOT NULL,
  user_agent TEXT,
  page VARCHAR(255) NOT NULL,
  referer TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for contact form submissions
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  azienda VARCHAR(255),
  servizio VARCHAR(100),
  messaggio TEXT NOT NULL,
  ip VARCHAR(45),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_visits_timestamp ON visits(timestamp DESC);
CREATE INDEX idx_visits_ip ON visits(ip);
CREATE INDEX idx_visits_page ON visits(page);
CREATE INDEX idx_contacts_timestamp ON contacts(timestamp DESC);
CREATE INDEX idx_contacts_email ON contacts(email);
```

## 5. Test Locally (Optional)

To test locally, create a `.env.local` file in your project root:

```env
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
```

Then run:
```bash
npm run dev
```

## 6. Deploy to Vercel

```bash
git add .
git commit -m "Add Neon database integration"
git push
```

Vercel will automatically deploy with the environment variables.

## 7. Verify It's Working

After deployment:

1. Visit your site and navigate through pages (logs visits)
2. Submit the contact form
3. Check Neon dashboard → **Tables** → **contacts** and **visits**
4. You should see the data!

## Query Examples

### View Recent Contacts
```sql
SELECT * FROM contacts ORDER BY timestamp DESC LIMIT 10;
```

### View Visit Statistics
```sql
SELECT 
  page, 
  COUNT(*) as visits,
  COUNT(DISTINCT ip) as unique_visitors
FROM visits 
GROUP BY page 
ORDER BY visits DESC;
```

### View Visits by Date
```sql
SELECT 
  DATE(timestamp) as date,
  COUNT(*) as visits
FROM visits 
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

## Neon Features

✅ **Serverless** - Scales to zero when not in use
✅ **Fast** - Built on PostgreSQL
✅ **Free Tier** - 0.5 GB storage, 100 hours compute/month
✅ **Branching** - Create database branches for testing
✅ **Auto-suspend** - Saves costs when inactive

## Troubleshooting

**Error: "DATABASE_URL is not defined"**
- Make sure you added the environment variable in Vercel
- Redeploy after adding the variable

**Error: "relation 'contacts' does not exist"**
- Run the SQL CREATE TABLE commands in Neon SQL Editor

**Connection timeout**
- Check your connection string is correct
- Ensure `?sslmode=require` is at the end

## Next Steps

- Set up email notifications for contact form (see API_SETUP.md)
- Create admin dashboard to view contacts and analytics
- Add data export functionality
- Set up automated backups (Neon does this automatically)
