-- Add starts_at and ends_at columns to cfps table
ALTER TABLE cfps
ADD COLUMN IF NOT EXISTS starts_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS ends_at TIMESTAMPTZ;

-- Add starts_at and ends_at columns to moderation_queue table
ALTER TABLE moderation_queue
ADD COLUMN IF NOT EXISTS starts_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS ends_at TIMESTAMPTZ;

-- Create index for date filtering
CREATE INDEX IF NOT EXISTS idx_cfps_starts_ends_at ON cfps(starts_at, ends_at);
