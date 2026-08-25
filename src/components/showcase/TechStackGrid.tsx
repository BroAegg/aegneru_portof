"use client";

import { motion } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";

interface TechItem {
  name: string;
  category: string;
  svg: React.ReactNode;
  color: string;
}

const techItems: TechItem[] = [
  {
    name: "HTML5",
    category: "Frontend",
    color: "#E34F26",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0z" />
        <path fill="#EF652A" d="M12 2.182v19.56l7.15-2.036 1.623-17.524H12z" />
        <path fill="#FFF" d="M12 8.291H8.182l-.273-3.091H12V2.182H4.818l.818 9.199H12V8.291zm0 7.042l-3.864-1.045-.245-2.753H4.818l.491 5.518L12 18.91v-3.577z" />
        <path fill="#E0E0E0" d="M12 8.291v3.09h3.545l-.333 3.753L12 16.177v3.577l6.682-1.854.9-10.169H12zM12 2.182v3.018h6.818L19.091 2.182H12z" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    category: "Frontend",
    color: "#1572B6",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0z" />
        <path fill="#33A9DC" d="M12 2.182v19.56l7.15-2.036 1.623-17.524H12z" />
        <path fill="#FFF" d="M12 8.291H8.182l-.273-3.091H12V2.182H4.818l.818 9.199H12V8.291zm0 7.042l-3.864-1.045-.245-2.753H4.818l.491 5.518L12 18.91v-3.577z" />
        <path fill="#E0E0E0" d="M12 8.291v3.09h3.545l-.333 3.753L12 16.177v3.577l6.682-1.854.9-10.169H12z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    category: "Frontend",
    color: "#F7DF1E",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M6.45 18.52c.98.58 2.13.97 3.32.97 1.83 0 2.87-.87 2.87-2.19 0-1.35-.98-1.93-2.61-2.61l-.87-.36c-2.48-1.03-3.66-2.28-3.66-4.63 0-2.88 2.3-4.94 5.9-4.94 1.48 0 2.76.36 3.71.84l-.87 2.39c-.71-.39-1.74-.74-2.84-.74-1.55 0-2.42.74-2.42 1.77 0 1.2.97 1.74 2.58 2.42l.87.36c2.81 1.16 3.97 2.42 3.97 4.87 0 3.03-2.36 5.09-6.32 5.09-1.68 0-3.32-.45-4.29-1.03l.66-2.33zm11.39-9.58h3.35v7.26c0 2.74-1.55 3.97-4.1 3.97-.97 0-1.93-.22-2.58-.55l.55-2.29c.48.26 1.19.45 1.87.45.97 0 1.58-.45 1.58-1.81V8.94z" fill="#000" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    color: "#06B6D4",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path d="M12 6c-3.314 0-5.5 1.657-6.6 4.971 1.32-1.32 2.86-1.817 4.62-1.491 1.005.186 1.723.91 2.518 1.712C13.834 12.5 15.34 14 19.2 14c3.314 0 5.5-1.657 6.6-4.971-1.32 1.32-2.86 1.817-4.62 1.491-1.005-.186-1.723-.91-2.518-1.712C17.366 7.5 15.86 6 12 6zM4.8 13.2c-3.314 0-5.5 1.657-6.6 4.971 1.32-1.32 2.86-1.817 4.62-1.491 1.005.186 1.723.91 2.518 1.712C6.634 19.7 8.14 21.2 12 21.2c3.314 0 5.5-1.657 6.6-4.971-1.32 1.32-2.86 1.817-4.62 1.491-1.005-.186-1.723-.91-2.518-1.712C10.166 14.7 8.66 13.2 4.8 13.2z" fill="#06B6D4" />
      </svg>
    ),
  },
  {
    name: "ReactJS",
    category: "Frontend",
    color: "#61DAFB",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
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
    name: "Vite",
    category: "Tools",
    color: "#646CFF",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path d="M22.5 4.5L12 22.5L1.5 4.5L12 1.5L22.5 4.5Z" fill="#646CFF" />
        <path d="M12 2.5L21 5L12 21L3 5L12 2.5Z" fill="#FFC928" />
      </svg>
    ),
  },
  {
    name: "Node JS",
    category: "Backend",
    color: "#339933",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path d="M12 1.5L21.5 7V17L12 22.5L2.5 17V7L12 1.5Z" fill="#339933" />
        <path d="M12 4.5L18.5 8.5V15.5L12 19.5L5.5 15.5V8.5L12 4.5Z" fill="#000" opacity="0.2" />
        <path d="M12 7.5L16.5 10.2V14.8L12 17.5L7.5 14.8V10.2L12 7.5Z" fill="#FFF" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "Frontend",
    color: "#FFFFFF",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#000" stroke="#333" strokeWidth="1" />
        <path d="M7.5 7.5V16.5M16.5 16.5L10 7.5H7.5" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 7.5V13" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Frontend",
    color: "#3178C6",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M12.4 12.8h-2.1v6.2H7.7v-6.2H5.6v-2.3h6.8v2.3zm6.1 1.7c0-1.7-1.3-2.6-3.4-2.8l-.9-.1c-.9-.1-1.3-.4-1.3-.9 0-.6.5-.9 1.4-.9.9 0 1.7.3 2.3.8l1.3-1.6c-1-1-2.4-1.4-3.8-1.4-2.4 0-4 1.3-4 3.2 0 1.7 1.2 2.5 3.3 2.7l.9.1c1.1.1 1.4.4 1.4 shadow .9 0 .6-.6 1-1.6 1-1.1 0-2.1-.4-2.8-1.1l-1.4 1.6c1.1 1.2 2.7 1.7 4.4 1.7 2.7.1 4.2-1.2 4.2-3.3z" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "Backend",
    color: "#3776AB",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path d="M11.85 1.5c-4.85 0-4.5 2.1-4.5 2.1v2.16h4.56v.64H5.7a2.7 2.7 0 00-2.7 2.7v4.06a2.7 2.7 0 002.7 2.7h1.62v-2.28a3.1 3.1 0 013.1-3.1h4.86a2.7 2.7 0 002.7-2.7V5.7a4.2 4.2 0 00-4.2-4.2h-1.93zm-2.03 1.35a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#3776AB" />
        <path d="M12.15 22.5c4.85 0 4.5-2.1 4.5-2.1v-2.16h-4.56v-.64h6.21a2.7 2.7 0 002.7-2.7v-4.06a2.7 2.7 0 00-2.7-2.7h-1.62v2.28a3.1 3.1 0 01-3.1 3.1H8.72a2.7 2.7 0 00-2.7 2.7v2.16a4.2 4.2 0 004.2 4.2h1.93zm2.03-1.35a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    category: "Backend",
    color: "#3ECF8E",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path d="M13.35 22.87c-.4.54-1.28.26-1.28-.41V13.8H3.6a.7.7 0 01-.54-1.14L10.65 1.13c.4-.54 1.28-.26 1.28.41v8.66h8.47a.7.7 0 01.54 1.14L13.35 22.87z" fill="#3ECF8E" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "Backend",
    color: "#4169E1",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.97.71-3.77 1.9-5.18l1.45 1.45A5.96 5.96 0 006 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.32-.43-2.54-1.15-3.53l1.43-1.43C19.29 8.23 20 10.03 20 12c0 4.41-3.59 8-8 8z" fill="#4169E1" />
      </svg>
    ),
  },
  {
    name: "Git",
    category: "Tools",
    color: "#F05032",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path d="M21.6 10.7L13.3 2.4a1.7 1.7 0 00-2.4 0L8.5 4.8l3.1 3.1a2 2 0 012.3 2.3l2.8 2.8a2 2 0 11-1.2 1.2l-2.6-2.6v4.6a2 2 0 11-1.8 0V11.2a2 2 0 01-1.1-1.1L6.9 7 2.4 11.5a1.7 1.7 0 000 2.4l8.3 8.3a1.7 1.7 0 002.4 0l8.5-8.5a1.7 1.7 0 000-2.4z" fill="#F05032" />
      </svg>
    ),
  },
  {
    name: "OpenCV",
    category: "Tools",
    color: "#5C3EE8",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="4.5" stroke="#E52521" strokeWidth="2.2" />
        <circle cx="7" cy="16" r="4.5" stroke="#43B02A" strokeWidth="2.2" />
        <circle cx="17" cy="16" r="4.5" stroke="#00A3E0" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    name: "Figma",
    category: "Tools",
    color: "#F24E1E",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path d="M8 24a4 4 0 01-4-4 4 4 0 014-4h4v4a4 4 0 01-4 4z" fill="#0ACF83" />
        <path d="M4 12a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" fill="#A259FF" />
        <path d="M4 4a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" fill="#F24E1E" />
        <path d="M12 0h4a4 4 0 014 4 4 4 0 01-4 4h-4V0z" fill="#FF7262" />
        <circle cx="16" cy="12" r="4" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    category: "Tools",
    color: "#FFFFFF",
    svg: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
        <path d="M12 1L24 22H0L12 1Z" fill="#FFF" />
      </svg>
    ),
  },
];

export default function TechStackGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {techItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.04, ease: [0, 0, 0.2, 1] }}
          whileHover={{ y: -6, scale: 1.02 }}
        >
          <GlowCard
            glowColor={`${item.color}25`}
            className="group flex h-36 flex-col items-center justify-center gap-3.5 p-5 text-center transition-all duration-300 hover:border-accent/40"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-dark/60 p-2.5 transition-transform duration-300 group-hover:scale-110">
              {item.svg}
            </div>
            <span className="font-heading text-sm font-semibold text-foreground tracking-wide transition-colors group-hover:text-accent">
              {item.name}
            </span>
          </GlowCard>
        </motion.div>
      ))}
    </div>
  );
}
