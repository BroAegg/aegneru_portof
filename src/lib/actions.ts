"use server";

import { supabase } from "./supabase";

/* ============================================
   Contact Form Server Action
   ============================================ */

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContact(formData: ContactFormData) {
  const { name, email, message } = formData;

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const { error } = await supabase
    .from("contacts")
    .insert([{ name, email, message }]);

  if (error) {
    console.error("Supabase contact insert error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }

  return { success: true, error: null };
}

/* ============================================
   Guestbook Comment Server Action
   ============================================ */

interface CommentFormData {
  guest_name: string;
  comment_text: string;
}

export async function submitComment(formData: CommentFormData) {
  const { guest_name, comment_text } = formData;

  if (!guest_name || !comment_text) {
    return { success: false, error: "Name and comment are required." };
  }

  if (comment_text.length > 500) {
    return { success: false, error: "Comment must be under 500 characters." };
  }

  const { error } = await supabase
    .from("comments")
    .insert([{ guest_name, comment_text }]);

  if (error) {
    console.error("Supabase comment insert error:", error);
    return { success: false, error: "Failed to post comment. Please try again." };
  }

  return { success: true, error: null };
}

/* ============================================
   GitHub Pinned Repos Fetcher
   ============================================ */

export async function fetchGitHubRepos() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "BroAegg";

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    return { success: true, data: repos, error: null };
  } catch (error) {
    console.error("GitHub API fetch error:", error);
    return { success: false, data: [], error: "Failed to fetch GitHub repos." };
  }
}
