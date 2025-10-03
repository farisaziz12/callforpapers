-- Drop all existing policies on cfps table
DROP POLICY IF EXISTS "Admins can manage CFPs" ON cfps;
DROP POLICY IF EXISTS "Only admins can manage CFPs" ON cfps;
DROP POLICY IF EXISTS "CFPs are viewable by everyone" ON cfps;

-- Disable RLS on cfps table
ALTER TABLE cfps DISABLE ROW LEVEL SECURITY;
