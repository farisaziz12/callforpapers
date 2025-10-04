-- Migration to allow multiple talk submissions per CFP
-- Users can now submit multiple different talks to the same CFP

-- Drop the unique constraint that prevents multiple submissions per CFP
ALTER TABLE user_submissions DROP CONSTRAINT IF EXISTS user_submissions_user_id_cfp_id_key;

-- Add a composite unique constraint on user_id, cfp_id, and talk_title to prevent duplicate talks
-- This allows multiple talks but prevents submitting the exact same talk title twice
ALTER TABLE user_submissions
  ADD CONSTRAINT user_submissions_user_cfp_talk_unique
  UNIQUE(user_id, cfp_id, talk_title);

-- Make talk_title NOT NULL since it's now required for tracking multiple submissions
-- First, update any existing NULL talk_title to a default value
UPDATE user_submissions
SET talk_title = 'Untitled Submission #' || substring(id::text, 1, 8)
WHERE talk_title IS NULL;

-- Now make the column NOT NULL
ALTER TABLE user_submissions
  ALTER COLUMN talk_title SET NOT NULL;

-- Add an index for better query performance when fetching submissions by user and CFP
CREATE INDEX IF NOT EXISTS idx_user_submissions_user_cfp ON user_submissions(user_id, cfp_id);

-- Add a comment to document this change
COMMENT ON CONSTRAINT user_submissions_user_cfp_talk_unique ON user_submissions IS
  'Allows users to submit multiple talks to the same CFP, but prevents duplicate talk titles';
