"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, MessageCircle, Linkedin, Github } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Toast, { useToast } from "@/components/ui/Toast";
import { submitContact } from "@/lib/actions";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const mountTimestampRef = useRef<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    mountTimestampRef.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        honeypot,
        timestampToken: mountTimestampRef.current || undefined,
      });
      if (result.success) {
        addToast("success", "Pesan berhasil terkirim! Saya akan segera merespons email Anda.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        addToast("error", result.error || "Gagal mengirim pesan.");
      }
    } catch {
      addToast("error", "Terjadi kesalahan koneksi. Silakan coba lagi.");
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
    <section id="contact" className="relative py-24 md:py-32 scroll-mt-20 md:scroll-mt-24">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/3 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have an open engineering position, contract, or project in mind? Let's connect directly."
        />

        {/* Direct Channels Cluster for HR & CTOs */}
        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          <a
            href="https://wa.me/62895416185355?text=Halo%20Aegner,%20kami%20tertarik%20dengan%20profil%20dan%20portofolio%20Anda"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center rounded-2xl border border-dark-border bg-dark-card p-5 text-center transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:shadow-xl hover:shadow-emerald-500/5"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="font-heading text-sm font-bold text-foreground">WhatsApp</span>
            <span className="mt-0.5 text-xs text-muted">+62 895-4161-85355</span>
          </a>

          <a
            href="mailto:aegneru@gmail.com"
            className="group flex flex-col items-center justify-center rounded-2xl border border-dark-border bg-dark-card p-5 text-center transition-all duration-300 hover:border-accent/50 hover:bg-accent/5 hover:shadow-xl hover:shadow-accent/5"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
              <Mail className="h-5 w-5" />
            </div>
            <span className="font-heading text-sm font-bold text-foreground">Email</span>
            <span className="mt-0.5 text-xs text-muted truncate max-w-[140px]">aegneru@gmail.com</span>
          </a>

          <a
            href="https://www.linkedin.com/in/aegnerbillik/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center rounded-2xl border border-dark-border bg-dark-card p-5 text-center transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/5 hover:shadow-xl hover:shadow-blue-500/5"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <Linkedin className="h-5 w-5" />
            </div>
            <span className="font-heading text-sm font-bold text-foreground">LinkedIn</span>
            <span className="mt-0.5 text-xs text-muted">in/aegnerbillik</span>
          </a>

          <a
            href="https://github.com/BroAegg"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center rounded-2xl border border-dark-border bg-dark-card p-5 text-center transition-all duration-300 hover:border-accent/50 hover:bg-accent/5 hover:shadow-xl hover:shadow-accent/5"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-dark/80 text-foreground group-hover:scale-110 transition-transform border border-dark-border/60">
              <Github className="h-5 w-5" />
            </div>
            <span className="font-heading text-sm font-bold text-foreground">GitHub</span>
            <span className="mt-0.5 text-xs text-muted">BroAegg</span>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field (hidden from real users, traps bots) */}
            <input
              type="text"
              name="company_url"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

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
                  maxLength={50}
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
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-muted"
                >
                  Message
                </label>
                <span className="text-xs text-muted/50">
                  {formData.message.length}/500
                </span>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-muted/50 transition-colors group-focus-within:text-accent" />
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, contract, or open position..."
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
