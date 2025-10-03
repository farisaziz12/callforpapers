-- Admin users table (separate from public auth.users)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow admins to view admin users
CREATE POLICY "Only admins can view admin users"
  ON admin_users FOR SELECT
  USING (id = auth.uid());

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to use is_admin function
DROP POLICY IF EXISTS "Only admins can manage CFPs" ON cfps;
CREATE POLICY "Only admins can manage CFPs"
  ON cfps FOR ALL
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Only admins can view moderation queue" ON moderation_queue;
CREATE POLICY "Only admins can view moderation queue"
  ON moderation_queue FOR SELECT
  USING (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Only admins can manage moderation queue" ON moderation_queue;
CREATE POLICY "Only admins can manage moderation queue"
  ON moderation_queue FOR UPDATE
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));
