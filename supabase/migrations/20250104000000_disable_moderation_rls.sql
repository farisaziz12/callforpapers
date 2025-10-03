-- Disable RLS entirely for moderation_queue to allow anonymous submissions
ALTER TABLE moderation_queue DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Anyone can submit to moderation queue" ON moderation_queue;
DROP POLICY IF EXISTS "Only admins can view moderation queue" ON moderation_queue;
DROP POLICY IF EXISTS "Only admins can manage moderation queue" ON moderation_queue;
