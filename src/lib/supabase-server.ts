import "server-only";
import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isServerSupabaseConfigured = Boolean(
  rawUrl && rawUrl.startsWith("http") && rawServiceKey && rawServiceKey.length > 10
);

if (!isServerSupabaseConfigured) {
  console.warn(
    "[Supabase Server] Warning: SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL is missing or invalid. Database writes via Server Actions will not be authenticated with service role."
  );
}

export const supabaseServer = createClient(
  rawUrl && rawUrl.startsWith("http") ? rawUrl : "http://localhost:54321",
  rawServiceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-service-key",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
