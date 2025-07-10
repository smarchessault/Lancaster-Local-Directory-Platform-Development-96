-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (if not using Supabase Auth)
-- This is handled by Supabase Auth automatically

-- Create ads table
CREATE TABLE ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ad_size TEXT NOT NULL DEFAULT '1x3',
  slot_position INTEGER NOT NULL,
  logo_url TEXT,
  business_name TEXT NOT NULL,
  offer_text TEXT NOT NULL,
  contact_phone TEXT,
  contact_website TEXT,
  contact_address TEXT,
  ad_visual_url TEXT,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ad_analytics table
CREATE TABLE ad_analytics (
  ad_id UUID PRIMARY KEY REFERENCES ads(id) ON DELETE CASCADE,
  scan_count INTEGER DEFAULT 0,
  call_clicks INTEGER DEFAULT 0,
  website_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_ads_user_id ON ads(user_id);
CREATE INDEX idx_ads_is_active ON ads(is_active);
CREATE INDEX idx_ads_slot_position ON ads(slot_position);
CREATE INDEX idx_ads_created_at ON ads(created_at);

-- Create RLS policies
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_analytics ENABLE ROW LEVEL SECURITY;

-- Ads policies
CREATE POLICY "Users can view their own ads" ON ads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ads" ON ads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ads" ON ads
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ads" ON ads
  FOR DELETE USING (auth.uid() = user_id);

-- Public can view active ads
CREATE POLICY "Anyone can view active ads" ON ads
  FOR SELECT USING (is_active = true);

-- Ad analytics policies
CREATE POLICY "Users can view analytics for their ads" ON ad_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ads 
      WHERE ads.id = ad_analytics.ad_id 
      AND ads.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can update analytics for active ads" ON ad_analytics
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM ads 
      WHERE ads.id = ad_analytics.ad_id 
      AND ads.is_active = true
    )
  );

-- Functions for incrementing analytics
CREATE OR REPLACE FUNCTION increment_scan_count(ad_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE ad_analytics 
  SET scan_count = scan_count + 1, updated_at = NOW()
  WHERE ad_analytics.ad_id = increment_scan_count.ad_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_call_clicks(ad_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE ad_analytics 
  SET call_clicks = call_clicks + 1, updated_at = NOW()
  WHERE ad_analytics.ad_id = increment_call_clicks.ad_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_website_clicks(ad_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE ad_analytics 
  SET website_clicks = website_clicks + 1, updated_at = NOW()
  WHERE ad_analytics.ad_id = increment_website_clicks.ad_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create analytics record when ad is created
CREATE OR REPLACE FUNCTION create_ad_analytics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO ad_analytics (ad_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_ad_analytics_trigger
  AFTER INSERT ON ads
  FOR EACH ROW
  EXECUTE FUNCTION create_ad_analytics();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_ads_updated_at
  BEFORE UPDATE ON ads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ad_analytics_updated_at
  BEFORE UPDATE ON ad_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();