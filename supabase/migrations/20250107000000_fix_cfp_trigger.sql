-- Fix the trigger for cfps table to use correct column name

-- Drop the existing trigger
DROP TRIGGER IF EXISTS update_cfps_last_updated_at ON cfps;

-- Create correct function for last_updated_at
CREATE OR REPLACE FUNCTION update_last_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger with correct function
CREATE TRIGGER update_cfps_last_updated_at
  BEFORE UPDATE ON cfps
  FOR EACH ROW
  EXECUTE FUNCTION update_last_updated_at_column();
