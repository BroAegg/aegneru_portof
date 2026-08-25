"use client";

import { Github, Linkedin, Instagram, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-border bg-dark-card/50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Brand */}
          <div>
            <span className="font-heading text-lg font-bold gradient-text">
              Aegneru
            </span>
            <p className="mt-1 text-xs text-muted">
              Fullstack Developer Portfolio
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { href: "https://github.com/BroAegg", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
              { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted transition-colors hover:text-accent"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="flex items-center gap-1 text-xs text-muted/50">
            © {currentYear} Aegneru. Built with{" "}
            <Heart className="inline h-3 w-3 text-accent" /> and Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
