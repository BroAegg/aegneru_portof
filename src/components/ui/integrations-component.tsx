"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Cpu, Database, Globe, Layers, Terminal, Sparkles } from "lucide-react";

interface IntegrationItem {
  category: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  tags: string[];
  link?: string;
}

const integrations: IntegrationItem[] = [
  {
    category: "Modern Web Architecture",
    title: "Next.js 14 & React Ecosystem",
    description: "App Router, Server Components, SSR/SSG, and type-safe state pipelines for fast responsive web interfaces.",
    icon: Globe,
    accentColor: "from-cyan-500/20 to-blue-500/20",
    tags: ["Next.js 14", "React 19", "TypeScript", "Tailwind CSS"],
    link: "https://nextjs.org",
  },
  {
    category: "Enterprise Backend & Data",
    title: "Laravel 11 & PostgreSQL / Redis",
    description: "Multi-tenant ERP logic, transactional integrity, General Ledger accounting, and low-latency Redis caching.",
    icon: Database,
    accentColor: "from-red-500/20 to-orange-500/20",
    tags: ["Laravel 11", "PostgreSQL", "MySQL", "Redis Pub/Sub"],
    link: "https://laravel.com",
  },
  {
    category: "Applied AI & Computer Vision",
    title: "Python, PyTorch & OpenCV",
    description: "Document OCR pipelines with Tesseract, feature extraction (MFCC), and deep learning CNN classification models.",
    icon: Sparkles,
    accentColor: "from-amber-500/20 to-yellow-500/20",
    tags: ["Python 3.12", "PyTorch", "OpenCV", "Tesseract OCR"],
    link: "https://pytorch.org",
  },
  {
    category: "Hardware & Edge Telemetry",
    title: "ESP32, RFID & WebSockets",
    description: "Real-time industrial sensor telemetry, RC522 RFID authentication, and bidirectional WebSocket pipelines.",
    icon: Cpu,
    accentColor: "from-emerald-500/20 to-teal-500/20",
    tags: ["ESP32", "RFID RC522", "WebSockets", "Capacitor"],
    link: "https://www.espressif.com",
  },
  {
    category: "Mobile & Offline-First POS",
    title: "Capacitor & IndexedDB Bridge",
    description: "Tablet-first Android application with native Bluetooth thermal printing (SPP) and offline local storage.",
    icon: Layers,
    accentColor: "from-purple-500/20 to-indigo-500/20",
    tags: ["Capacitor", "Android APK", "IndexedDB", "Bluetooth SPP"],
    link: "https://capacitorjs.com",
  },
  {
    category: "Cloud, CI/CD & Toolchain",
    title: "Git, GitHub, Vercel & Supabase",
    description: "Automated continuous deployments, version control workflows, Row Level Security, and real-time database feeds.",
    icon: Terminal,
    accentColor: "from-blue-500/20 to-slate-500/20",
    tags: ["GitHub", "Vercel", "Supabase", "Turbopack"],
    link: "https://github.com/BroAegg",
  },
];

export default function IntegrationsSection() {
  return (
    <div className="py-2">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -5 }}
              >
                <Card className="group relative flex h-full flex-col justify-between overflow-hidden border-dark-border bg-dark-card/90 p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
                  {/* Subtle Top Gradient Accent on Hover */}
                  <div
                    className={`absolute -top-12 -right-12 h-28 w-28 rounded-full bg-gradient-to-br ${item.accentColor} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <div>
                    {/* Header: Category Badge + Icon */}
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full border border-dark-border bg-dark/60 px-3 py-1 text-[11px] font-semibold tracking-wider text-muted/80 uppercase">
                        {item.category}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-dark-border bg-dark/70 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:border-accent/40">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-heading text-base font-bold text-foreground transition-colors group-hover:text-accent">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom: Tags & Link */}
                  <div className="mt-6 border-t border-dark-border/50 pt-4">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-dark/80 px-2 py-0.5 text-[10.5px] font-medium text-muted/80 border border-dark-border/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted transition-colors hover:text-accent"
                      >
                        Explore Architecture <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
