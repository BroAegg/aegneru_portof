"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";

export default function IntegrationsSection() {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <IntegrationCard
            title="React & Next.js"
            description="Modern fullstack web application development with SSR and App Router."
            link="https://nextjs.org">
            <ReactNextLogo />
          </IntegrationCard>

          <IntegrationCard
            title="TypeScript & Tailwind"
            description="Type-safe codebase styled with modern utility-first CSS design systems."
            link="https://www.typescriptlang.org">
            <TypeScriptLogo />
          </IntegrationCard>

          <IntegrationCard
            title="Python & OpenCV"
            description="Optical Character Recognition (OCR) pipeline and computer vision."
            link="https://opencv.org">
            <PythonLogo />
          </IntegrationCard>

          <IntegrationCard
            title="Supabase & Postgres"
            description="Scalable backend with Row Level Security, Auth, and Realtime subscriptions."
            link="https://supabase.com">
            <SupabaseLogo />
          </IntegrationCard>

          <IntegrationCard
            title="GitHub & Git"
            description="Version control, CI/CD workflows, and open-source collaboration."
            link="https://github.com/BroAegg">
            <GitHubLogo />
          </IntegrationCard>

          <IntegrationCard
            title="VS Code & Figma"
            description="Design prototyping, clean coding environment, and extension ecosystem."
            link="https://code.visualstudio.com">
            <VSCodeLogo />
          </IntegrationCard>
        </div>
      </div>
    </div>
  );
}

export const IntegrationCard = ({
  title,
  description,
  children,
  link = "https://github.com/BroAegg",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  link?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dark/60 p-2.5 transition-transform duration-300 group-hover:scale-110">
            {children}
          </div>

          <div className="space-y-2 py-6">
            <h3 className="text-base font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-muted text-sm line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex gap-3 border-t border-dark-border/60 pt-4">
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="gap-1 pr-3 shadow-none text-xs hover:text-accent hover:border-accent/40"
            >
              <Link href={link} target="_blank" rel="noopener noreferrer">
                Learn More
                <ChevronRight className="ml-0.5 h-3.5 w-3.5 opacity-60" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// --- Logos (inline SVG) ---
const ReactNextLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-cyan-400">
    <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="9" ry="3.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
    </g>
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8">
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path d="M12.4 12.8h-2.1v6.2H7.7v-6.2H5.6v-2.3h6.8v2.3zm6.1 1.7c0-1.7-1.3-2.6-3.4-2.8l-.9-.1c-.9-.1-1.3-.4-1.3-.9 0-.6.5-.9 1.4-.9.9 0 1.7.3 2.3.8l1.3-1.6c-1-1-2.4-1.4-3.8-1.4-2.4 0-4 1.3-4 3.2 0 1.7 1.2 2.5 3.3 2.7l.9.1c1.1.1 1.4.4 1.4 .9 0 .6-.6 1-1.6 1-1.1 0-2.1-.4-2.8-1.1l-1.4 1.6c1.1 1.2 2.7 1.7 4.4 1.7 2.7.1 4.2-1.2 4.2-3.3z" fill="#FFF" />
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
    <path d="M11.85 1.5c-4.85 0-4.5 2.1-4.5 2.1v2.16h4.56v.64H5.7a2.7 2.7 0 00-2.7 2.7v4.06a2.7 2.7 0 002.7 2.7h1.62v-2.28a3.1 3.1 0 013.1-3.1h4.86a2.7 2.7 0 002.7-2.7V5.7a4.2 4.2 0 00-4.2-4.2h-1.93zm-2.03 1.35a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#3776AB" />
    <path d="M12.15 22.5c4.85 0 4.5-2.1 4.5-2.1v-2.16h-4.56v-.64h6.21a2.7 2.7 0 002.7-2.7v-4.06a2.7 2.7 0 00-2.7-2.7h-1.62v2.28a3.1 3.1 0 01-3.1 3.1H8.72a2.7 2.7 0 00-2.7 2.7v2.16a4.2 4.2 0 004.2 4.2h1.93zm2.03-1.35a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#FFD43B" />
  </svg>
);

const SupabaseLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-emerald-400">
    <path d="M13.35 22.87c-.4.54-1.28.26-1.28-.41V13.8H3.6a.7.7 0 01-.54-1.14L10.65 1.13c.4-.54 1.28-.26 1.28.41v8.66h8.47a.7.7 0 01.54 1.14L13.35 22.87z" fill="#3ECF8E" />
  </svg>
);

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-foreground">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.204.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.304 3.492.997.108-.775.42-1.304.763-1.604-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.52.117-3.167 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.004 2.045.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.647.243 2.864.12 3.167.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.92.431.372.816 1.102.816 2.222 0 1.606-.015 2.9-.015 3.293 0 .32.19.694.8.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const VSCodeLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
    <path d="M23.15 2.587L18.21.782a1.493 1.493 0 0 0-1.748.513L8.416 11.238l-4.14-3.136a.747.747 0 0 0-.964.064L.435 10.871a.747.747 0 0 0 0 1.056l2.877 2.705-2.877 2.705a.747.747 0 0 0 0 1.056l2.877 2.705a.747.747 0 0 0 .964.064l4.14-3.136 8.046 9.943a1.493 1.493 0 0 0 1.748.513l4.94-1.805a1.493 1.493 0 0 0 1.01-1.405V3.992a1.493 1.493 0 0 0-1.01-1.405z" fill="#007ACC" />
  </svg>
);
