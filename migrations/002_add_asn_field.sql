-- Add ASN (Autonomous System Number) field to ip_lookups table
-- This stores the network owner information from IPWhois

ALTER TABLE ip_lookups 
ADD COLUMN IF NOT EXISTS asn VARCHAR(100);

-- Create index on ASN for grouping by network owner
CREATE INDEX IF NOT EXISTS idx_ip_lookups_asn ON ip_lookups(asn);

-- Add comment
COMMENT ON COLUMN ip_lookups.asn IS 'Autonomous System Number - identifies the network owner';
