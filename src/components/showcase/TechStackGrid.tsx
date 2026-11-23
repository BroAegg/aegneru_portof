"use client";

import { motion } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";
import IntegrationsSection from "@/components/ui/integrations-component";
import { Layout, Server, Smartphone, Brain, Cpu, Wrench } from "lucide-react";

interface TechItem {
  name: string;
  color: string;
  iconText?: string;
  svg?: React.ReactNode;
}

interface TechCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Type-safe interfaces, modern component architectures, and responsive utility styling.",
    icon: Layout,
    color: "#38bdf8",
    items: [
      {
        name: "Next.js",
        color: "#FFFFFF",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#000" stroke="#444" strokeWidth="1" />
            <path d="M7.5 7.5V16.5M16.5 16.5L10 7.5H7.5" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5 7.5V13" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "React.js",
        color: "#61DAFB",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
            <g stroke="#61DAFB" strokeWidth="1.2">
              <ellipse cx="12" cy="12" rx="9" ry="3.5" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
            </g>
          </svg>
        ),
      },
      {
        name: "TypeScript",
        color: "#3178C6",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="4" fill="#3178C6" />
            <path d="M12.4 12.8h-2.1v6.2H7.7v-6.2H5.6v-2.3h6.8v2.3zm6.1 1.7c0-1.7-1.3-2.6-3.4-2.8l-.9-.1c-.9-.1-1.3-.4-1.3-.9 0-.6.5-.9 1.4-.9.9 0 1.7.3 2.3.8l1.3-1.6c-1-1-2.4-1.4-3.8-1.4-2.4 0-4 1.3-4 3.2 0 1.7 1.2 2.5 3.3 2.7l.9.1c1.1.1 1.4.4 1.4.9 0 .6-.6 1-1.6 1-1.1 0-2.1-.4-2.8-1.1l-1.4 1.6c1.1 1.2 2.7 1.7 4.4 1.7 2.7.1 4.2-1.2 4.2-3.3z" fill="#FFF" />
          </svg>
        ),
      },
      {
        name: "JavaScript",
        color: "#F7DF1E",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="4" fill="#F7DF1E" />
            <path d="M6.45 18.52c.98.58 2.13.97 3.32.97 1.83 0 2.87-.87 2.87-2.19 0-1.35-.98-1.93-2.61-2.61l-.87-.36c-2.48-1.03-3.66-2.28-3.66-4.63 0-2.88 2.3-4.94 5.9-4.94 1.48 0 2.76.36 3.71.84l-.87 2.39c-.71-.39-1.74-.74-2.84-.74-1.55 0-2.42.74-2.42 1.77 0 1.2.97 1.74 2.58 2.42l.87.36c2.81 1.16 3.97 2.42 3.97 4.87 0 3.03-2.36 5.09-6.32 5.09-1.68 0-3.32-.45-4.29-1.03l.66-2.33zm11.39-9.58h3.35v7.26c0 2.74-1.55 3.97-4.1 3.97-.97 0-1.93-.22-2.58-.55l.55-2.29c.48.26 1.19.45 1.87.45.97 0 1.58-.45 1.58-1.81V8.94z" fill="#000" />
          </svg>
        ),
      },
      {
        name: "Tailwind CSS",
        color: "#06B6D4",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <path d="M12 6c-3.314 0-5.5 1.657-6.6 4.971 1.32-1.32 2.86-1.817 4.62-1.491 1.005.186 1.723.91 2.518 1.712C13.834 12.5 15.34 14 19.2 14c3.314 0 5.5-1.657 6.6-4.971-1.32 1.32-2.86 1.817-4.62 1.491-1.005-.186-1.723-.91-2.518-1.712C17.366 7.5 15.86 6 12 6zM4.8 13.2c-3.314 0-5.5 1.657-6.6 4.971 1.32-1.32 2.86-1.817 4.62-1.491 1.005.186 1.723.91 2.518 1.712C6.634 19.7 8.14 21.2 12 21.2c3.314 0 5.5-1.657 6.6-4.971-1.32 1.32-2.86 1.817-4.62 1.491-1.005-.186-1.723-.91-2.518-1.712C10.166 14.7 8.66 13.2 4.8 13.2z" fill="#06B6D4" />
          </svg>
        ),
      },
      {
        name: "Livewire",
        color: "#FB70A9",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#FB70A9" />
            <path d="M7 12l3-3m0 0l3 3m-3-3v8M17 12l-3 3m0 0l-3-3m3 3V4" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "backend-db",
    title: "Backend & Database",
    description: "ACID transactions, double-entry ledger engines, low-latency caches, and resilient APIs.",
    icon: Server,
    color: "#a855f7",
    items: [
      {
        name: "Laravel",
        color: "#FF2D20",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <path d="M3.5 6.5l8.5-5 8.5 5v11l-8.5 5-8.5-5v-11z" stroke="#FF2D20" strokeWidth="1.8" />
            <path d="M3.5 6.5l8.5 5 8.5-5M12 11.5v10.5" stroke="#FF2D20" strokeWidth="1.8" />
          </svg>
        ),
      },
      {
        name: "PHP",
        color: "#777BB4",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#777BB4" />
            <text x="12" y="15.5" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PHP</text>
          </svg>
        ),
      },
      {
        name: "Node.js",
        color: "#339933",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <path d="M12 1.5L21.5 7V17L12 22.5L2.5 17V7L12 1.5Z" fill="#339933" />
            <path d="M12 4.5L18.5 8.5V15.5L12 19.5L5.5 15.5V8.5L12 4.5Z" fill="#000" opacity="0.2" />
            <path d="M12 7.5L16.5 10.2V14.8L12 17.5L7.5 14.8V10.2L12 7.5Z" fill="#FFF" opacity="0.9" />
          </svg>
        ),
      },
      {
        name: "FastAPI",
        color: "#009688",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#009688" />
            <path d="M13 3L6 14h5l-1 7 8-11h-5l1-7z" fill="#FFF" />
          </svg>
        ),
      },
      {
        name: "PostgreSQL",
        color: "#4169E1",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#4169E1" />
            <path d="M7 8c2-3 8-3 10 0 2 3 1 7-1 9-2 2-7 2-9 0-2-2-2-6 0-9z" stroke="#FFF" strokeWidth="1.5" />
            <path d="M12 7v10M8.5 12h7" stroke="#FFF" strokeWidth="1.5" />
          </svg>
        ),
      },
      {
        name: "MySQL",
        color: "#4479A1",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#00758F" />
            <path d="M4 14c2-4 5-6 8-6s6 2 8 6" stroke="#F29111" strokeWidth="2" strokeLinecap="round" />
            <circle cx="8" cy="11" r="1" fill="#FFF" />
          </svg>
        ),
      },
      {
        name: "Redis",
        color: "#DC382D",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#DC382D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        name: "Supabase",
        color: "#3ECF8E",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <path d="M13.35 22.87c-.4.54-1.28.26-1.28-.41V13.8H3.6a.7.7 0 01-.54-1.14L10.65 1.13c.4-.54 1.28-.26 1.28.41v8.66h8.47a.7.7 0 01.54 1.14L13.35 22.87z" fill="#3ECF8E" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "mobile-offline",
    title: "Mobile & Offline Systems",
    description: "Tablet-first hybrid runtimes, local IndexedDB transactional storage, and hardware peripheral bridges.",
    icon: Smartphone,
    color: "#10b981",
    items: [
      {
        name: "Capacitor",
        color: "#119EFF",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#119EFF" />
            <path d="M6 12h12M12 6v12" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "IndexedDB",
        color: "#F58220",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#F58220" strokeWidth="1.8" />
            <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#F58220" strokeWidth="1.8" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "ai-vision",
    title: "AI & Computer Vision",
    description: "Deep learning models, image preprocessing filters, audio DSP feature extraction, and OCR pipelines.",
    icon: Brain,
    color: "#f59e0b",
    items: [
      {
        name: "PyTorch",
        color: "#EE4C2C",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#1e1e1e" stroke="#EE4C2C" strokeWidth="1.5" />
            <path d="M12 6l3.5 3.5a5 5 0 11-7 0L12 6z" stroke="#EE4C2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="15.5" cy="9.5" r="1" fill="#EE4C2C" />
          </svg>
        ),
      },
      {
        name: "OpenCV",
        color: "#5C3EE8",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="7" r="3.5" stroke="#FF0000" strokeWidth="1.8" />
            <circle cx="7.5" cy="15.5" r="3.5" stroke="#00FF00" strokeWidth="1.8" />
            <circle cx="16.5" cy="15.5" r="3.5" stroke="#0000FF" strokeWidth="1.8" />
          </svg>
        ),
      },
      {
        name: "Tesseract OCR",
        color: "#5C9FD6",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#1b2a47" />
            <text x="12" y="16" textAnchor="middle" fill="#5C9FD6" fontSize="11" fontWeight="bold" fontFamily="monospace">OCR</text>
          </svg>
        ),
      },
    ],
  },
  {
    id: "hardware-iot",
    title: "Hardware & IoT",
    description: "ESP32 microcontrollers, RFID RC522 scanning, and bidirectional WebSocket telemetry feeds.",
    icon: Cpu,
    color: "#06b6d4",
    items: [
      {
        name: "C/C++ (ESP32)",
        color: "#00599C",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#00599C" />
            <text x="12" y="15.5" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="bold" fontFamily="monospace">C++</text>
          </svg>
        ),
      },
      {
        name: "WebSockets",
        color: "#3b82f6",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="1.8" />
            <path d="M8 12l3-3 3 3 3-3M8 15l3-3 3 3 3-3" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools & DevOps",
    description: "Version control workflows, API documentation, edge serverless hosting, and modern bundlers.",
    icon: Wrench,
    color: "#ec4899",
    items: [
      {
        name: "Git & GitHub",
        color: "#F05032",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#24292e" />
            <path d="M12 2C6.47 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" fill="#FFF" />
          </svg>
        ),
      },
      {
        name: "Postman",
        color: "#FF6C37",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#FF6C37" />
            <path d="M12 7l4 5-4 5-1.5-2 2.5-3-2.5-3L12 7zM9 9l2.5 3L9 15l-1.5-2L9.5 12 7.5 10 9 9z" fill="#FFF" />
          </svg>
        ),
      },
      {
        name: "Vercel",
        color: "#FFFFFF",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#000" stroke="#444" strokeWidth="1" />
            <path d="M12 6L18 16.5H6L12 6z" fill="#FFF" />
          </svg>
        ),
      },
      {
        name: "Vite",
        color: "#646CFF",
        svg: (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <path d="M22.5 4.5L12 22.5L1.5 4.5L12 1.5L22.5 4.5Z" fill="#646CFF" />
            <path d="M12 2.5L21 5L12 21L3 5L12 2.5Z" fill="#FFC928" />
          </svg>
        ),
      },
    ],
  },
];

export default function TechStackGrid() {
  return (
    <div className="space-y-16">
      {/* Grouped Categories with Subheadings */}
      <div className="space-y-12">
        {techCategories.map((category) => {
          const CategoryIcon = category.icon;

          return (
            <div key={category.id} className="space-y-4">
              {/* Category Subheading Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dark-border/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-dark-border bg-dark/70"
                    style={{ color: category.color }}
                  >
                    <CategoryIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
                      {category.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-muted max-w-md sm:text-right">
                  {category.description}
                </p>
              </div>

              {/* Grid of Tech Cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {category.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: itemIdx * 0.03 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <GlowCard
                      glowColor={`${item.color}25`}
                      className="group flex h-28 sm:h-32 flex-col items-center justify-center gap-2.5 p-3 text-center transition-all duration-300 hover:border-accent/40"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dark/60 p-2 transition-transform duration-300 group-hover:scale-110">
                        {item.svg}
                      </div>
                      <span className="font-heading text-xs font-semibold text-foreground tracking-wide transition-colors group-hover:text-accent truncate max-w-full px-1">
                        {item.name}
                      </span>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Workflow & Ecosystem Integrations */}
      <div className="border-t border-dark-border/60 pt-12">
        <div className="mb-8 text-center">
          <h3 className="font-heading text-2xl font-bold text-foreground">
            Workflow & Ecosystem Integrations
          </h3>
          <p className="mt-2 text-sm text-muted">
            Seamlessly connected platforms and architectures powering end-to-end development.
          </p>
        </div>
        <IntegrationsSection />
      </div>
    </div>
  );
}
