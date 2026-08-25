-- ============================================
-- Aegneru Portfolio — Supabase Migration
-- ============================================

-- Table: contacts (for contact form submissions)
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact form
CREATE POLICY "Allow anonymous inserts on contacts"
  ON public.contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ============================================

-- Table: comments (for guestbook / public comments)
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Anyone can leave a comment
CREATE POLICY "Allow anonymous inserts on comments"
  ON public.comments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Anyone can read comments
CREATE POLICY "Allow anonymous reads on comments"
  ON public.comments
  FOR SELECT
  TO anon
  USING (true);

-- Enable Realtime for comments table
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
