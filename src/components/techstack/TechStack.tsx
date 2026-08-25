"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";

/* ============================================
   Tech Stack Data
   ============================================ */
interface TechItem {
  name: string;
  icon: string;
  color: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Next.js", icon: "▲", color: "#ffffff" },
      { name: "TypeScript", icon: "TS", color: "#3178c6" },
      { name: "Tailwind CSS", icon: "🎨", color: "#06B6D4" },
      { name: "Framer Motion", icon: "🔄", color: "#BB4B96" },
    ],
  },
  {
    title: "Backend & Database",
    items: [
      { name: "Node.js", icon: "🟢", color: "#339933" },
      { name: "Python", icon: "🐍", color: "#3572A5" },
      { name: "Supabase", icon: "⚡", color: "#3ECF8E" },
      { name: "PostgreSQL", icon: "🐘", color: "#4169E1" },
    ],
  },
  {
    title: "Tools & Others",
    items: [
      { name: "Git", icon: "📦", color: "#F05032" },
      { name: "OpenCV", icon: "👁️", color: "#5C3EE8" },
      { name: "VS Code", icon: "💻", color: "#007ACC" },
      { name: "Figma", icon: "🎯", color: "#F24E1E" },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="techstack" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/2 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Tech Stack"
          subtitle="Technologies and tools I use to bring ideas to life."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.15, duration: 0.5 }}
            >
              <GlowCard>
                <div className="p-6">
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent mb-6">
                    {category.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.15 + i * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="group flex items-center gap-3 rounded-xl border border-dark-border bg-dark/50 p-3 transition-colors duration-300 hover:border-accent/30"
                      >
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-sm"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium text-muted transition-colors group-hover:text-foreground">
                          {item.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
