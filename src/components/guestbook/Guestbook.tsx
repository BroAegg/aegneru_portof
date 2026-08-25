"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Toast, { useToast } from "@/components/ui/Toast";
import { supabase, type Comment } from "@/lib/supabase";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toasts, addToast, removeToast } = useToast();

  /* ---- Fetch initial comments ---- */
  const fetchComments = useCallback(async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setComments(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  /* ---- Realtime subscription ---- */
  useEffect(() => {
    const channel = supabase
      .channel("guestbook-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          const newComment = payload.new as Comment;
          setComments((prev) => [newComment, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ---- Submit comment ---- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitComment(formData);
      if (result.success) {
        addToast("success", "Comment posted! 🎉");
        setFormData({ guest_name: "", comment_text: "" });
      } else {
        addToast("error", result.error || "Failed to post comment.");
      }
    } catch {
      addToast("error", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/4 bottom-0 h-64 w-64 rounded-full bg-accent-blue/3 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Guestbook"
          subtitle="Leave a message — it appears in real-time for everyone."
        />

        <div className="mx-auto max-w-2xl">
          {/* Comment Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="mb-10 space-y-4 rounded-2xl border border-dark-border bg-dark-card p-6"
          >
            <input
              type="text"
              name="guest_name"
              value={formData.guest_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, guest_name: e.target.value }))
              }
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-dark-border bg-dark py-2.5 px-4 text-sm text-foreground placeholder:text-muted/40 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all"
            />

            <div className="flex gap-3">
              <input
                type="text"
                name="comment_text"
                value={formData.comment_text}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    comment_text: e.target.value,
                  }))
                }
                placeholder="Leave a message..."
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
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </div>

            <p className="text-xs text-muted/50">
              {formData.comment_text.length}/500 characters
            </p>
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
