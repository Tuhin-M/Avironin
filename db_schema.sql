-- Database Schema for Avironin.org Portfolio

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Authors table
CREATE TABLE authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  role VARCHAR(100),
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts table for essays/articles
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  summary TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('STRATEGY', 'TECHNOLOGY', 'AI_SYSTEMS', 'FRAMEWORKS', 'RESEARCH', 'STARTUP_STRATEGY', 'TECHNOLOGY_ENGINEERING', 'AI_FUTURE_SYSTEMS')),
  author_id UUID REFERENCES authors(id),
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  read_time INTEGER, -- in minutes
  seo_title VARCHAR(255),
  seo_description TEXT,
  keywords TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media table for post images
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE,
  token VARCHAR(255),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  stage VARCHAR(50) CHECK (stage IN ('IDEATION', 'PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B', 'LATER')),
  message TEXT NOT NULL,
  priority INTEGER DEFAULT 1, -- 1=normal, 2=high, 3=urgent
  status VARCHAR(50) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'REVIEWED', 'CONTACTED', 'ARCHIVED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) - Basic Setup
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for published posts" ON posts FOR SELECT USING (published = true);

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for authors" ON authors FOR SELECT TO public USING (true);
