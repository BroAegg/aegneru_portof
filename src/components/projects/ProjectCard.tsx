"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";
import { ExternalLink, Github, Globe } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  liveUrl?: string;
  image?: string;
  size?: "large" | "medium" | "small";
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  liveUrl,
  image,
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
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0, 0, 0.2, 1] }}
      className={sizeClasses[size]}
    >
      <GlowCard className="group h-full">
        <div className="flex h-full flex-col justify-between p-6 sm:p-7">
          <div>
            {/* Top Bar: Project Index & Quick Links */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent font-heading text-sm font-bold">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="flex items-center gap-2">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-white"
                    title="Buka Live Web"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Live Demo</span>
                  </a>
                )}
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-dark-border bg-dark/60 p-1.5 text-muted transition-all duration-300 hover:border-accent/40 hover:bg-dark-hover hover:text-accent"
                    title="View GitHub Repository"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Optional Image Preview (e.g. Bermadani landing page preview mockup) */}
            {image && (
              <div className="relative mb-5 overflow-hidden rounded-xl border border-dark-border bg-dark/80 group-hover:border-accent/40 transition-colors shadow-lg">
                {/* Browser frame dots */}
                <div className="flex items-center gap-2 border-b border-dark-border/60 bg-dark-card/90 px-3 py-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="mx-auto rounded bg-dark/80 px-3 py-0.5 text-[11px] font-mono text-muted/80 truncate max-w-[220px]">
                    {liveUrl ? liveUrl.replace("https://", "") : "bermadaniumbandung.id"}
                  </div>
                </div>

                {/* Screenshot with live hover overlay */}
                <a
                  href={liveUrl || href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/img block relative h-48 sm:h-56 w-full overflow-hidden cursor-pointer bg-dark"
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-dark-card/95 px-4 py-2 text-xs font-semibold text-white shadow-2xl">
                      <ExternalLink className="h-3.5 w-3.5 text-accent" />
                      Kunjungi Portal Bermadani ↗
                    </span>
                  </div>
                </a>
              </div>
            )}

            {/* Project Title */}
            <h3 className="font-heading text-lg font-bold text-foreground mb-2.5 sm:text-xl">
              {liveUrl || href ? (
                <a
                  href={liveUrl || href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent inline-flex items-center gap-1.5"
                >
                  {title}
                  <ExternalLink className="h-4 w-4 opacity-50 inline" />
                </a>
              ) : (
                title
              )}
            </h3>

            {/* Project Description */}
            <p className="text-xs sm:text-sm leading-relaxed text-muted">
              {description}
            </p>
          </div>

          {/* Bottom: Tags */}
          <div className="mt-5 flex flex-wrap gap-1.5 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-dark/80 px-2.5 py-1 text-[11px] font-medium text-muted border border-dark-border"
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
