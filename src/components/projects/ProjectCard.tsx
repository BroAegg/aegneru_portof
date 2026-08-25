"use client";

import { motion } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  size?: "large" | "medium" | "small";
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  size = "medium",
  index,
}: ProjectCardProps) {
  const sizeClasses: Record<string, string> = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-1",
    small: "md:col-span-1 md:row-span-1",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0, 0, 0.2, 1] }}
      className={sizeClasses[size]}
    >
      <GlowCard className="group h-full">
        <div className="flex h-full flex-col justify-between p-6 sm:p-8">
          {/* Top: Project icon decoration */}
          <div>
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <span className="font-heading text-lg font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-muted opacity-0 transition-all duration-300 hover:bg-dark-hover hover:text-accent group-hover:opacity-100"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <h3 className="font-heading text-xl font-bold text-foreground mb-3 sm:text-2xl">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {description}
            </p>
          </div>

          {/* Bottom: Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-dark/80 px-3 py-1 text-xs font-medium text-muted border border-dark-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
