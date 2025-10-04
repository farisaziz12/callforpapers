-- Add conference start and end dates to cfps table
ALTER TABLE cfps
ADD COLUMN conference_starts_at TIMESTAMPTZ,
ADD COLUMN conference_ends_at TIMESTAMPTZ;

-- Add conference start and end dates to moderation_queue table
ALTER TABLE moderation_queue
ADD COLUMN conference_starts_at TIMESTAMPTZ,
ADD COLUMN conference_ends_at TIMESTAMPTZ;

-- Create index for conference dates for better query performance
CREATE INDEX idx_cfps_conference_dates ON cfps(conference_starts_at, conference_ends_at);
