-- Admin Dashboard Enhancement - Database Migration
-- Creates tables for IP geolocation caching and notifications system

-- IP lookup cache table
-- Stores geolocation data for IP addresses to reduce external API calls
CREATE TABLE IF NOT EXISTS ip_lookups (
  id SERIAL PRIMARY KEY,
  ip VARCHAR(45) UNIQUE NOT NULL,
  country VARCHAR(100),
  country_code VARCHAR(2),
  region VARCHAR(100),
  city VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  isp VARCHAR(255),
  organization VARCHAR(255),
  timezone VARCHAR(100),
  cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on IP for fast lookups
CREATE INDEX IF NOT EXISTS idx_ip_lookups_ip ON ip_lookups(ip);
CREATE INDEX IF NOT EXISTS idx_ip_lookups_cached_at ON ip_lookups(cached_at);

-- Notifications table
-- Stores admin notifications for new contacts and suspicious activity
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- 'new_contact', 'suspicious_visit'
  title VARCHAR(255) NOT NULL,
  message TEXT,
  data JSONB, -- Store related data (contact_id, ip, etc.)
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);

-- Add comment to tables
COMMENT ON TABLE ip_lookups IS 'Cache for IP geolocation lookups to reduce external API calls';
COMMENT ON TABLE notifications IS 'Admin notifications for new contacts and suspicious visits';
