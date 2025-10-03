-- User Profiles Table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website_url TEXT,
  twitter_handle TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  speaking_experience TEXT, -- 'beginner', 'intermediate', 'expert'
  preferred_topics TEXT[] DEFAULT '{}',
  preferred_formats TEXT[] DEFAULT '{}',
  willing_to_travel BOOLEAN DEFAULT true,
  available_for_speaking BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User Submissions Table (Track CFP applications)
CREATE TYPE submission_status AS ENUM ('interested', 'applied', 'accepted', 'rejected', 'withdrawn', 'waitlisted');

CREATE TABLE user_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cfp_id UUID NOT NULL REFERENCES cfps(id) ON DELETE CASCADE,
  status submission_status NOT NULL DEFAULT 'interested',
  talk_title TEXT,
  talk_abstract TEXT,
  applied_at TIMESTAMPTZ,
  response_received_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, cfp_id)
);

-- Conference Ratings Table
CREATE TABLE conference_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cfp_id UUID NOT NULL REFERENCES cfps(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_title TEXT,
  review_text TEXT,
  would_recommend BOOLEAN DEFAULT true,
  organizer_responsiveness INTEGER CHECK (organizer_responsiveness >= 1 AND organizer_responsiveness <= 5),
  speaker_experience INTEGER CHECK (speaker_experience >= 1 AND speaker_experience <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, cfp_id)
);

-- Conference Metadata Table (Intelligence data)
CREATE TABLE conference_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cfp_id UUID NOT NULL REFERENCES cfps(id) ON DELETE CASCADE UNIQUE,
  total_speakers_count INTEGER DEFAULT 0,
  estimated_acceptance_rate NUMERIC(5,2), -- Percentage
  average_response_time_days INTEGER,
  attendee_count INTEGER,
  conference_size TEXT, -- 'small', 'medium', 'large'
  has_code_of_conduct BOOLEAN DEFAULT false,
  has_diversity_initiative BOOLEAN DEFAULT false,
  records_talks BOOLEAN DEFAULT false,
  provides_slides_platform BOOLEAN DEFAULT false,
  previous_years_data JSONB DEFAULT '{}', -- Store historical data
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User Recommendations Table
CREATE TABLE user_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cfp_id UUID NOT NULL REFERENCES cfps(id) ON DELETE CASCADE,
  score NUMERIC(5,2) NOT NULL, -- Recommendation score 0-100
  reasons JSONB DEFAULT '[]', -- Array of reason codes
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, cfp_id)
);

-- User Talk Library Table (Reusable talk proposals)
CREATE TABLE user_talks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  abstract TEXT NOT NULL,
  description TEXT,
  topics TEXT[] DEFAULT '{}',
  duration_minutes INTEGER,
  slides_url TEXT,
  video_url TEXT,
  github_url TEXT,
  is_active BOOLEAN DEFAULT true,
  times_submitted INTEGER DEFAULT 0,
  times_accepted INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notification Preferences Table
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT true,
  deadline_reminders BOOLEAN DEFAULT true,
  new_cfp_alerts BOOLEAN DEFAULT true,
  saved_search_digest BOOLEAN DEFAULT true,
  digest_frequency TEXT DEFAULT 'weekly', -- 'daily', 'weekly', 'monthly'
  push_notifications BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notification Queue Table
CREATE TYPE notification_type AS ENUM ('deadline_reminder', 'new_cfp', 'saved_search', 'submission_update', 'general');
CREATE TYPE notification_status AS ENUM ('pending', 'sent', 'failed');

CREATE TABLE notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  status notification_status DEFAULT 'pending',
  scheduled_for TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_submissions_user_id ON user_submissions(user_id);
CREATE INDEX idx_user_submissions_cfp_id ON user_submissions(cfp_id);
CREATE INDEX idx_user_submissions_status ON user_submissions(status);
CREATE INDEX idx_conference_ratings_cfp_id ON conference_ratings(cfp_id);
CREATE INDEX idx_conference_ratings_user_id ON conference_ratings(user_id);
CREATE INDEX idx_conference_metadata_cfp_id ON conference_metadata(cfp_id);
CREATE INDEX idx_user_recommendations_user_id ON user_recommendations(user_id);
CREATE INDEX idx_user_recommendations_score ON user_recommendations(score DESC);
CREATE INDEX idx_user_talks_user_id ON user_talks(user_id);
CREATE INDEX idx_user_talks_active ON user_talks(is_active);
CREATE INDEX idx_notification_queue_user_status ON notification_queue(user_id, status);
CREATE INDEX idx_notification_queue_scheduled ON notification_queue(scheduled_for) WHERE status = 'pending';

-- Row Level Security Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conference_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conference_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_talks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view all public profiles"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User Submissions Policies
CREATE POLICY "Users can view their own submissions"
  ON user_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own submissions"
  ON user_submissions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Conference Ratings Policies
CREATE POLICY "Everyone can view ratings"
  ON conference_ratings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create ratings"
  ON conference_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
  ON conference_ratings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings"
  ON conference_ratings FOR DELETE
  USING (auth.uid() = user_id);

-- Conference Metadata Policies (Public read, admin write)
CREATE POLICY "Everyone can view conference metadata"
  ON conference_metadata FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage metadata"
  ON conference_metadata FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- User Recommendations Policies
CREATE POLICY "Users can view their own recommendations"
  ON user_recommendations FOR SELECT
  USING (auth.uid() = user_id);

-- User Talks Policies
CREATE POLICY "Users can view their own talks"
  ON user_talks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own talks"
  ON user_talks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Notification Preferences Policies
CREATE POLICY "Users can view their own notification preferences"
  ON notification_preferences FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can manage their own notification preferences"
  ON notification_preferences FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Notification Queue Policies
CREATE POLICY "Users can view their own notifications"
  ON notification_queue FOR SELECT
  USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_submissions_updated_at
  BEFORE UPDATE ON user_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conference_ratings_updated_at
  BEFORE UPDATE ON conference_ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conference_metadata_updated_at
  BEFORE UPDATE ON conference_metadata
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_talks_updated_at
  BEFORE UPDATE ON user_talks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email)
  VALUES (NEW.id, NEW.email);

  INSERT INTO notification_preferences (id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Function to calculate conference statistics
CREATE OR REPLACE FUNCTION update_conference_stats()
RETURNS TRIGGER AS $$
DECLARE
  avg_rating NUMERIC;
  rating_count INTEGER;
BEGIN
  -- Calculate average rating
  SELECT AVG(rating), COUNT(*)
  INTO avg_rating, rating_count
  FROM conference_ratings
  WHERE cfp_id = NEW.cfp_id;

  -- Update or insert metadata
  INSERT INTO conference_metadata (cfp_id)
  VALUES (NEW.cfp_id)
  ON CONFLICT (cfp_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update conference stats when rating changes
CREATE TRIGGER update_conference_stats_on_rating
  AFTER INSERT OR UPDATE ON conference_ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_conference_stats();
