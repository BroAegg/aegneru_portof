"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Toast, { useToast } from "@/components/ui/Toast";
import { submitContact } from "@/lib/actions";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContact(formData);
      if (result.success) {
        addToast("success", "Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        addToast("error", result.error || "Something went wrong.");
      }
    } catch {
      addToast("error", "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/3 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind or just want to say hello? Drop me a message."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="group relative">
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-medium text-muted"
              >
                Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/50 transition-colors group-focus-within:text-accent" />
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-dark-border bg-dark-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted/40 transition-all duration-300 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="group relative">
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-medium text-muted"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/50 transition-colors group-focus-within:text-accent" />
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-dark-border bg-dark-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted/40 transition-all duration-300 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="group relative">
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-medium text-muted"
              >
                Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-muted/50 transition-colors group-focus-within:text-accent" />
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-xl border border-dark-border bg-dark-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted/40 transition-all duration-300 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-heading font-semibold text-sm text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <Toast toasts={toasts} onRemove={removeToast} />
    </section>
  );
}
