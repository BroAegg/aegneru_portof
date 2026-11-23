import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  rawUrl && rawUrl.startsWith("http") && rawKey && rawKey.length > 10
);

if (!isSupabaseConfigured && typeof window !== "undefined") {
  console.warn(
    "[Supabase Client] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Guestbook is running in offline demo mode."
  );
}

export const supabase = createClient(
  rawUrl && rawUrl.startsWith("http") ? rawUrl : "http://localhost:54321",
  rawKey || "dummy-anon-key"
);

/* ============================================
   Database Type Definitions
   ============================================ */

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  ip_hash?: string;
  created_at: string;
}

export interface Comment {
  id: string;
  guest_name: string;
  comment_text: string;
  approved: boolean;
  ip_hash?: string;
  created_at: string;
}
