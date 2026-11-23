-- ========================================================
-- Portfolio Migration 002: Moderation, Rate Limiting & RLS Hardening
-- ========================================================

-- 1. Add moderation & tracking columns
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS approved boolean NOT NULL DEFAULT false;
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS ip_hash text;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS ip_hash text;

-- 2. Create indexes for performant rate limiting & approved filtering
CREATE INDEX IF NOT EXISTS idx_comments_approved ON public.comments (approved, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_ip_hash ON public.comments (ip_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_ip_hash ON public.contacts (ip_hash, created_at DESC);

-- 3. Hardened RLS for public.comments
-- Drop old permissive policies
DROP POLICY IF EXISTS "Allow anonymous inserts on comments" ON public.comments;
DROP POLICY IF EXISTS "Allow anonymous reads on comments" ON public.comments;
DROP POLICY IF EXISTS "Allow anon select approved comments" ON public.comments;

-- Policy: Anonymous public users can ONLY SELECT approved comments
CREATE POLICY "Allow anon select approved comments"
  ON public.comments
  FOR SELECT
  TO anon
  USING (approved = true);

-- Note: Anonymous browser clients CANNOT INSERT directly to comments or contacts.
-- All writes are handled strictly through Next.js Server Actions using SUPABASE_SERVICE_ROLE_KEY.

-- 4. Hardened RLS for public.contacts
DROP POLICY IF EXISTS "Allow anonymous inserts on contacts" ON public.contacts;

-- 5. Realtime configuration
-- Ensure replica identity is set to FULL so UPDATE payloads emit complete rows to Realtime listeners
ALTER TABLE public.comments REPLICA IDENTITY FULL;
