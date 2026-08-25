import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl =
  rawUrl && rawUrl.startsWith("http")
    ? rawUrl
    : "https://placeholder.supabase.co";

const supabaseAnonKey = rawKey || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ============================================
   Database Type Definitions
   ============================================ */

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Comment {
  id: string;
  guest_name: string;
  comment_text: string;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}
