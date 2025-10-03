-- Drop the restrictive admin policy
DROP POLICY IF EXISTS "Only admins can manage CFPs" ON cfps;

-- Create a more permissive policy that checks admin_users table instead of JWT role
CREATE POLICY "Admins can manage CFPs"
  ON cfps FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );
