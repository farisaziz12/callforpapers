-- Create custom types
CREATE TYPE cfp_format AS ENUM ('conference', 'workshop', 'meetup', 'online');
CREATE TYPE moderation_status AS ENUM ('pending', 'approved', 'rejected');

-- CFPs table
CREATE TABLE cfps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  topics TEXT[] NOT NULL DEFAULT '{}',
  closes_at TIMESTAMPTZ NOT NULL,
  format cfp_format NOT NULL,
  perks_travel BOOLEAN NOT NULL DEFAULT false,
  perks_hotel BOOLEAN NOT NULL DEFAULT false,
  perks_honorarium BOOLEAN NOT NULL DEFAULT false,
  website_url TEXT NOT NULL,
  cfp_url TEXT NOT NULL,
  timeline_opens_at TIMESTAMPTZ,
  timeline_closes_at TIMESTAMPTZ NOT NULL,
  platform TEXT,
  notes TEXT,
  last_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Moderation queue table
CREATE TABLE moderation_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status moderation_status NOT NULL DEFAULT 'pending',
  -- Conference details
  conference_name TEXT NOT NULL,
  conference_website_url TEXT NOT NULL,
  conference_city TEXT NOT NULL,
  conference_country TEXT NOT NULL,
  conference_platform TEXT,
  -- CFP details
  cfp_title TEXT NOT NULL,
  cfp_url TEXT NOT NULL,
  cfp_topics TEXT[] NOT NULL DEFAULT '{}',
  cfp_format cfp_format NOT NULL,
  cfp_opens_at TIMESTAMPTZ,
  cfp_closes_at TIMESTAMPTZ NOT NULL,
  cfp_perks_travel BOOLEAN NOT NULL DEFAULT false,
  cfp_perks_hotel BOOLEAN NOT NULL DEFAULT false,
  cfp_perks_honorarium BOOLEAN NOT NULL DEFAULT false,
  cfp_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Saved searches table
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- Will be replaced with proper auth later
  name TEXT NOT NULL,
  -- Search filters stored as JSON
  filter_query TEXT,
  filter_country TEXT,
  filter_topic TEXT,
  filter_format cfp_format,
  filter_closes_before TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Immutable function for array_to_string (required for GIN index)
CREATE OR REPLACE FUNCTION immutable_array_to_string(text[], text)
RETURNS text AS $$
  SELECT array_to_string($1, $2);
$$ LANGUAGE sql IMMUTABLE;

-- Indexes for performance
CREATE INDEX idx_cfps_slug ON cfps(slug);
CREATE INDEX idx_cfps_closes_at ON cfps(closes_at);
CREATE INDEX idx_cfps_country ON cfps(country);
CREATE INDEX idx_cfps_format ON cfps(format);
CREATE INDEX idx_cfps_topics ON cfps USING GIN(topics);
CREATE INDEX idx_cfps_search ON cfps USING GIN(to_tsvector('english', title || ' ' || immutable_array_to_string(topics, ' ')));

CREATE INDEX idx_moderation_status ON moderation_queue(status);
CREATE INDEX idx_moderation_submitted_at ON moderation_queue(submitted_at);

CREATE INDEX idx_saved_searches_user_id ON saved_searches(user_id);

-- Row Level Security (RLS) Policies
ALTER TABLE cfps ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

-- CFPs: Public read access
CREATE POLICY "CFPs are viewable by everyone"
  ON cfps FOR SELECT
  USING (true);

-- CFPs: Only authenticated users with admin role can insert/update/delete
CREATE POLICY "Only admins can manage CFPs"
  ON cfps FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Moderation queue: Public can submit
CREATE POLICY "Anyone can submit to moderation queue"
  ON moderation_queue FOR INSERT
  WITH CHECK (true);

-- Moderation queue: Only admins can view and manage
CREATE POLICY "Only admins can view moderation queue"
  ON moderation_queue FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can manage moderation queue"
  ON moderation_queue FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Saved searches: Users can only access their own
CREATE POLICY "Users can view their own saved searches"
  ON saved_searches FOR SELECT
  USING (user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can insert their own saved searches"
  ON saved_searches FOR INSERT
  WITH CHECK (user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can update their own saved searches"
  ON saved_searches FOR UPDATE
  USING (user_id = auth.jwt() ->> 'sub')
  WITH CHECK (user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can delete their own saved searches"
  ON saved_searches FOR DELETE
  USING (user_id = auth.jwt() ->> 'sub');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for saved_searches updated_at
CREATE TRIGGER update_saved_searches_updated_at
  BEFORE UPDATE ON saved_searches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for cfps last_updated_at
CREATE TRIGGER update_cfps_last_updated_at
  BEFORE UPDATE ON cfps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
