"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Clock, ShieldCheck, WifiOff } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Toast, { useToast } from "@/components/ui/Toast";
import { supabase, isSupabaseConfigured, type Comment } from "@/lib/supabase";
import { submitComment } from "@/lib/actions";

/* ============================================
   Time Formatting Helper
   ============================================ */
function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

/* ============================================
   Guestbook Section
   ============================================ */
export default function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({ guest_name: "", comment_text: "" });
  const [honeypot, setHoneypot] = useState("");
  const mountTimestampRef = useRef<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(() => isSupabaseConfigured);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    mountTimestampRef.current = Date.now();
  }, []);

  /* ---- Fetch approved comments only ---- */
  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    let ignore = false;
    async function loadComments() {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("approved", true)
          .order("created_at", { ascending: false })
          .limit(50);

        if (!ignore) {
          if (!error && data) {
            setComments(data);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error("[Guestbook Fetch Error]:", err);
        if (!ignore) setIsLoading(false);
      }
    }

    loadComments();
    return () => {
      ignore = true;
    };
  }, []);

  /* ---- Realtime subscription for approved comments & approval updates ---- */
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel("guestbook-realtime-moderated")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: "approved=eq.true",
        },
        (payload) => {
          const newComment = payload.new as Comment;
          setComments((prev) => [newComment, ...prev.filter((c) => c.id !== newComment.id)]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "comments",
        },
        (payload) => {
          const updated = payload.new as Comment;
          if (updated.approved) {
            setComments((prev) => {
              const exists = prev.some((c) => c.id === updated.id);
              if (exists) {
                return prev.map((c) => (c.id === updated.id ? updated : c));
              }
              return [updated, ...prev];
            });
          } else {
            setComments((prev) => prev.filter((c) => c.id !== updated.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ---- Submit comment with security tokens ---- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitComment({
        guest_name: formData.guest_name,
        comment_text: formData.comment_text,
        honeypot,
        timestampToken: mountTimestampRef.current || undefined,
      });

      if (result.success) {
        addToast(
          "success",
          result.message || "Thank you! Your message will appear after moderation."
        );
        setFormData({ guest_name: "", comment_text: "" });
      } else {
        addToast("error", result.error || "Failed to post comment. Please try again.");
      }
    } catch {
      addToast("error", "Connection error. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="relative py-24 md:py-32 scroll-mt-20 md:scroll-mt-24">
      <div className="pointer-events-none absolute left-1/4 bottom-0 h-64 w-64 rounded-full bg-accent-blue/3 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Guestbook"
          subtitle="Leave a message — comments are reviewed for a professional, spam-free environment."
        />
        <div className="mx-auto max-w-2xl">
          {/* Offline Notice if Supabase is unconfigured */}
          {!isSupabaseConfigured && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-zinc-700/50 bg-zinc-800/40 p-4 text-xs text-zinc-400">
              <WifiOff className="h-4 w-4 shrink-0 text-zinc-500" />
              <span>
                Guestbook is currently in read-only mode. Database configuration pending — messages will be enabled soon.
              </span>
            </div>
          )}

          {/* Comment Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="mb-10 space-y-4 rounded-2xl border border-dark-border bg-dark-card p-6"
          >
            {/* Honeypot field (hidden from real users, traps bots) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="guest_name" className="sr-only">
                Nama Anda
              </label>
              <input
                id="guest_name"
                type="text"
                name="guest_name"
                value={formData.guest_name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, guest_name: e.target.value }))
                }
                placeholder="Your name (max. 50 characters)"
                maxLength={50}
                required
                className="w-full rounded-xl border border-dark-border bg-dark py-2.5 px-4 text-sm text-foreground placeholder:text-muted/40 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>

            <div>
              <label htmlFor="comment_text" className="sr-only">
                Pesan Komentar
              </label>
              <div className="flex gap-3">
                <input
                  id="comment_text"
                  type="text"
                  name="comment_text"
                  value={formData.comment_text}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      comment_text: e.target.value,
                    }))
                  }
                  placeholder="Write a message, impression, or feedback..."
                  required
                  maxLength={500}
                  className="flex-1 rounded-xl border border-dark-border bg-dark py-2.5 px-4 text-sm text-foreground placeholder:text-muted/40 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all"
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 hover:bg-accent/90 disabled:opacity-50 transition-all cursor-pointer"
                  aria-label="Kirim Komentar"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted/60">
              <span className="flex items-center gap-1 text-[11px] text-muted/70">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Moderated manually before going public
              </span>
              <span>{formData.comment_text.length}/500</span>
            </div>
          </motion.form>

          {/* Comments List */}
          <div className="space-y-3">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-xl border border-dark-border bg-dark-card"
                />
              ))
            ) : comments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center"
              >
                <MessageCircle className="mx-auto mb-3 h-8 w-8 text-muted/30" />
                <p className="text-sm text-muted/50">
                  No messages yet. Be the first to leave one!
                </p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl border border-dark-border bg-dark-card p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
                          <span className="text-xs font-bold">
                            {comment.guest_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-foreground">
                            {comment.guest_name}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted/50">
                            <Clock className="h-3 w-3" />
                            {timeAgo(comment.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 pl-11 text-sm text-muted leading-relaxed">
                      {comment.comment_text}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      <Toast toasts={toasts} onRemove={removeToast} />
    </section>
  );
}
