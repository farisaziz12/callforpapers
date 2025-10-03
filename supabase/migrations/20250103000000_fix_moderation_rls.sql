-- Drop existing policies for moderation_queue
DROP POLICY IF EXISTS "Anyone can submit to moderation queue" ON moderation_queue;
DROP POLICY IF EXISTS "Only admins can view moderation queue" ON moderation_queue;
DROP POLICY IF EXISTS "Only admins can manage moderation queue" ON moderation_queue;

-- Recreate policies with better handling for anonymous users
-- Allow anyone (including anonymous) to insert into moderation queue
CREATE POLICY "Anyone can submit to moderation queue"
  ON moderation_queue FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can view moderation queue
CREATE POLICY "Only admins can view moderation queue"
  ON moderation_queue FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Only admins can update moderation queue
CREATE POLICY "Only admins can manage moderation queue"
  ON moderation_queue FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Make cfp_title optional (use conference_name as fallback)
ALTER TABLE moderation_queue ALTER COLUMN cfp_title DROP NOT NULL;
