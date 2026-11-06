"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";
import { ExternalLink, Github, Globe, Radio, Activity, Terminal } from "lucide-react";

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  liveUrl?: string;
  image?: string;
  visualType?: "browser" | "iot" | "audio" | "finance";
}

interface ProjectCardProps extends ProjectItem {
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  liveUrl,
  image,
  visualType = "browser",
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0, 0, 0.2, 1] }}
      className="flex h-full"
    >
      <GlowCard className="group flex h-full w-full flex-col justify-between overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5">
        <div>
          {/* 1. Visual Header (Fixed uniform height h-48 across ALL cards) */}
          <div className="relative h-48 w-full overflow-hidden border-b border-dark-border/70 bg-dark/90">
            {image ? (
              // Browser Frame Mockup with Screenshot
              <div className="flex h-full w-full flex-col">
                {/* Browser top bar */}
                <div className="flex items-center gap-2 border-b border-dark-border/60 bg-dark-card/95 px-3 py-2 z-10">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="mx-auto rounded bg-dark/80 px-2.5 py-0.5 text-[10.5px] font-mono text-muted/70 truncate max-w-[210px]">
                    {liveUrl ? liveUrl.replace("https://", "") : "web.preview"}
                  </div>
                </div>

                {/* Screenshot with hover zoom */}
                <a
                  href={liveUrl || href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/img relative flex-1 w-full overflow-hidden cursor-pointer bg-dark"
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-50 group-hover/img:opacity-20 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-dark-card/95 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl">
                      <ExternalLink className="h-3.5 w-3.5 text-accent" />
                      Visit Live System
                    </span>
                  </div>
                </a>
              </div>
            ) : visualType === "iot" ? (
              // Hardware IoT Telemetry Mockup
              <div className="flex h-full w-full flex-col justify-between p-4 bg-gradient-to-br from-dark to-dark-card font-mono text-xs">
                <div className="flex items-center justify-between border-b border-dark-border/50 pb-2">
                  <span className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    ESP32 LIVE TELEMETRY
                  </span>
                  <span className="text-[10px] text-muted">WS: 12ms</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-muted py-2">
                  <div className="flex justify-between">
                    <span>RFID Scanner RC522:</span>
                    <span className="text-foreground">STANDBY / READY</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Redis Pub/Sub:</span>
                    <span className="text-accent">CONNECTED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packet Stream:</span>
                    <span className="text-emerald-400">BIDIRECTIONAL</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded bg-dark/80 px-2.5 py-1 text-[10.5px] text-muted/80 border border-dark-border/60">
                  <Radio className="h-3.5 w-3.5 text-accent animate-pulse" />
                  Real-time Factory Floor Tracking
                </div>
              </div>
            ) : visualType === "audio" ? (
              // Audio DSP Waveform Mockup
              <div className="flex h-full w-full flex-col justify-between p-4 bg-gradient-to-br from-dark to-dark-card font-mono text-xs">
                <div className="flex items-center justify-between border-b border-dark-border/50 pb-2">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px]">
                    <Activity className="h-3.5 w-3.5" />
                    AUDIO DSP & MFCC
                  </span>
                  <span className="text-[10px] text-muted">PyTorch CNN</span>
                </div>
                {/* Waveform bars simulation */}
                <div className="flex items-end justify-between gap-1 h-14 px-2 py-1 bg-dark/60 rounded-lg border border-dark-border/50">
                  {[35, 65, 45, 90, 75, 40, 85, 95, 60, 80, 50, 70, 85, 30, 90, 60, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-full rounded-t bg-gradient-to-t from-cyan-500 to-accent"
                      style={{ height: `${h}%` }}
                      animate={{ height: [`${h}%`, `${Math.max(20, (h + 30) % 100)}%`, `${h}%`] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted">
                  <span>Input: Librosa Audio Signal</span>
                  <span className="text-accent font-semibold">10 Musical Genres</span>
                </div>
              </div>
            ) : (
              // Financial Ledger Mockup (PSAK 109)
              <div className="flex h-full w-full flex-col justify-between p-4 bg-gradient-to-br from-dark to-dark-card font-mono text-xs">
                <div className="flex items-center justify-between border-b border-dark-border/50 pb-2">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                    <Terminal className="h-3.5 w-3.5" />
                    PSAK 109 ACCOUNTING
                  </span>
                  <span className="text-[10px] text-emerald-400">AUDIT VERIFIED</span>
                </div>
                <div className="space-y-1 text-[11px] text-muted py-1.5">
                  <div className="flex justify-between rounded bg-dark/40 px-2 py-0.5">
                    <span>Dana Zakat (8 Asnaf):</span>
                    <span className="text-amber-400 font-semibold">PSAK 109</span>
                  </div>
                  <div className="flex justify-between rounded bg-dark/40 px-2 py-0.5">
                    <span>Kalkulator Nisab:</span>
                    <span className="text-foreground">Livewire Realtime</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10.5px] text-muted/80 rounded bg-dark/80 px-2.5 py-1 border border-dark-border/60">
                  <span>Export: PDF Receipt & Invoice</span>
                  <span className="text-accent font-medium">Laravel 11</span>
                </div>
              </div>
            )}
          </div>

          {/* 2. Card Content Area */}
          <div className="p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Header: Index + Action Links */}
              <div className="mb-3 flex items-center justify-between">
                <span className="font-heading text-xs font-bold text-accent">
                  PROJECT {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-2">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-white cursor-pointer"
                      title="Buka Live Web"
                    >
                      <Globe className="h-3 w-3" />
                      Live Demo ↗
                    </a>
                  )}
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-dark-border bg-dark/60 p-1.5 text-muted transition-all duration-300 hover:border-accent/40 hover:bg-dark-hover hover:text-accent cursor-pointer"
                      title="View GitHub Repository"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-heading text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                {liveUrl || href ? (
                  <a
                    href={liveUrl || href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    {title}
                  </a>
                ) : (
                  title
                )}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm leading-relaxed text-muted line-clamp-3">
                {description}
              </p>
            </div>

            {/* Bottom: Tags */}
            <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-dark-border/40">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-dark/80 px-2 py-0.5 text-[10.5px] font-medium text-muted/80 border border-dark-border/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
