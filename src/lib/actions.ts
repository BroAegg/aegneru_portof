"use server";

import { headers } from "next/headers";
import crypto from "crypto";
import { supabaseServer } from "./supabase-server";
import { containsProfanity } from "./profanity";

/* ============================================
   Security & Sanitization Helpers
   ============================================ */

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>?/gm, "").trim();
}

async function getHashedIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const realIp = headerList.get("x-real-ip");
  const ip = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";
  const salt = process.env.RATE_LIMIT_SALT || "portfolio_default_rate_limit_salt_2026";
  return crypto.createHash("sha256").update(`${ip}_${salt}`).digest("hex");
}

async function checkRateLimit(table: "contacts" | "comments", ipHash: string): Promise<boolean> {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  try {
    const { count, error } = await supabaseServer
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", tenMinutesAgo);

    if (error) {
      console.warn(`[RateLimit Warning] ${table}:`, error.message);
      return true; // Graceful degradation if column/table doesn't have ip_hash yet
    }

    return (count || 0) < 3;
  } catch {
    return true;
  }
}

/* ============================================
   Contact Form Server Action
   ============================================ */

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
  timestampToken?: number;
}

export async function submitContact(formData: ContactFormData) {
  const { name, email, message, honeypot, timestampToken } = formData;

  // 1. Honeypot check (bot traps: return success silently without database insert)
  if (honeypot && honeypot.trim().length > 0) {
    return { success: true, error: null };
  }

  // 2. Minimum submission duration check (< 3 seconds indicates automated script)
  if (timestampToken && Date.now() - timestampToken < 3000) {
    return { success: false, error: "Mohon tunggu beberapa detik sebelum mengirim pesan." };
  }

  // 3. Sanitization
  const cleanName = stripHtml(name || "");
  const cleanEmail = stripHtml(email || "").toLowerCase();
  const cleanMessage = stripHtml(message || "");

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { success: false, error: "Semua kolom wajib diisi." };
  }

  if (cleanName.length > 50) {
    return { success: false, error: "Nama maksimal 50 karakter." };
  }

  if (cleanMessage.length > 500) {
    return { success: false, error: "Pesan maksimal 500 karakter." };
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, error: "Format alamat email tidak valid." };
  }

  // 4. Inappropriate language filter
  if (containsProfanity(cleanName) || containsProfanity(cleanMessage)) {
    return {
      success: false,
      error: "Tolong gunakan bahasa yang sopan dan profesional.",
    };
  }

  // 5. Rate limiting (max 3 submits per 10 minutes)
  const ipHash = await getHashedIp();
  const allowed = await checkRateLimit("contacts", ipHash);
  if (!allowed) {
    return {
      success: false,
      error: "Terlalu banyak permintaan dari jaringan Anda. Silakan coba kembali dalam 10 menit.",
    };
  }

  // 6. Server-only insert via Service Role
  const { error } = await supabaseServer.from("contacts").insert([
    {
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      ip_hash: ipHash,
    },
  ]);

  if (error) {
    console.error("[Supabase Server Contact Insert Error]:", error);
    return { success: false, error: "Gagal mengirim pesan ke server. Silakan coba lagi." };
  }

  return { success: true, error: null };
}

/* ============================================
   Guestbook Comment Server Action
   ============================================ */

interface CommentFormData {
  guest_name: string;
  comment_text: string;
  honeypot?: string;
  timestampToken?: number;
}

export async function submitComment(formData: CommentFormData) {
  const { guest_name, comment_text, honeypot, timestampToken } = formData;

  // 1. Honeypot check (bot trap)
  if (honeypot && honeypot.trim().length > 0) {
    return {
      success: true,
      pendingModeration: true,
      message: "Terima kasih! Pesan akan tampil setelah dimoderasi.",
      error: null,
    };
  }

  // 2. Minimum submission duration check
  if (timestampToken && Date.now() - timestampToken < 3000) {
    return {
      success: false,
      error: "Mohon tunggu beberapa detik sebelum mengirim komentar.",
    };
  }

  // 3. Sanitization
  const cleanName = stripHtml(guest_name || "");
  const cleanComment = stripHtml(comment_text || "");

  if (!cleanName || !cleanComment) {
    return { success: false, error: "Nama dan pesan komentar wajib diisi." };
  }

  if (cleanName.length > 50) {
    return { success: false, error: "Nama maksimal 50 karakter." };
  }

  if (cleanComment.length > 500) {
    return { success: false, error: "Komentar maksimal 500 karakter." };
  }

  // 4. Inappropriate language filter
  if (containsProfanity(cleanName) || containsProfanity(cleanComment)) {
    return {
      success: false,
      error: "Tolong gunakan bahasa yang sopan dan profesional.",
    };
  }

  // 5. Rate limiting (max 3 submits per 10 minutes)
  const ipHash = await getHashedIp();
  const allowed = await checkRateLimit("comments", ipHash);
  if (!allowed) {
    return {
      success: false,
      error: "Batas pengiriman tercapai (maks 3 per 10 menit). Silakan coba lagi nanti.",
    };
  }

  // 6. Server-only insert via Service Role with approved=false
  const { error } = await supabaseServer.from("comments").insert([
    {
      guest_name: cleanName,
      comment_text: cleanComment,
      approved: false,
      ip_hash: ipHash,
    },
  ]);

  if (error) {
    console.error("[Supabase Server Comment Insert Error]:", error);
    return { success: false, error: "Gagal menyimpan komentar. Silakan coba lagi." };
  }

  return {
    success: true,
    pendingModeration: true,
    message: "Terima kasih! Komentar Anda telah diterima dan akan tampil setelah dimoderasi.",
    error: null,
  };
}
