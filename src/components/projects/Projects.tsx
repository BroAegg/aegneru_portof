"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import GlowCard from "@/components/ui/GlowCard";
import type { GitHubRepo } from "@/lib/supabase";

/* ============================================
   Static Projects Data
   ============================================ */
const staticProjects = [
  {
    title: "Koperasi UMB — Enterprise ERP & Hybrid POS",
    description:
      "Full-featured enterprise platform for Koperasi UMB handling member savings, loans via payroll deductions, General Ledger accounting, and an offline-first Android tablet POS with native Bluetooth thermal printing via IndexedDB.",
    tags: ["Laravel 11", "React.js", "PostgreSQL", "Capacitor", "IndexedDB", "Bluetooth SPP"],
    size: "large" as const,
  },
  {
    title: "Academic Portal & Accreditation CMS",
    description:
      "Modern university portal and multi-tenant CMS for academic accreditation (Biotechnology, Fashion Craft, FST) with high-performance SSR and dynamic document archival.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST API"],
    size: "medium" as const,
  },
  {
    title: "Real-Time Factory QC Telemetry (IoT)",
    description:
      "Industrial manufacturing tracking system connecting ESP32 microcontrollers and RFID readers to live web dashboards via bidirectional WebSockets and Redis pub/sub.",
    tags: ["ESP32", "RFID", "WebSockets", "Redis", "React.js", "C/C++"],
    size: "medium" as const,
  },
  {
    title: "OCR e-KTP Document Extraction",
    description:
      "Automated document processing pipeline for university admissions using OpenCV computer vision filters, Tesseract OCR, and regex parsing to digitize national ID cards.",
    tags: ["Python", "OpenCV", "Tesseract OCR", "RegEx", "Machine Learning"],
    size: "medium" as const,
  },
  {
    title: "Deep Learning Audio Genre Classifier",
    description:
      "Audio DSP and deep learning system extracting Mel-Frequency Cepstral Coefficients (MFCC) to classify audio tracks across 10 musical genres with a CNN architecture.",
    tags: ["PyTorch", "Librosa", "CNN", "Streamlit", "Audio DSP"],
    size: "medium" as const,
  },
];

/* ============================================
   GitHub Repo Card
   ============================================ */
function GitHubRepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    "C++": "#f34b7d",
    Go: "#00ADD8",
    Rust: "#dea584",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <GlowCard className="h-full">
        <div className="flex h-full flex-col justify-between p-5">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Github className="h-4 w-4 text-muted" />
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-sm font-semibold text-foreground hover:text-accent transition-colors flex items-center gap-1"
              >
                {repo.name}
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            </div>
            <p className="text-xs leading-relaxed text-muted line-clamp-2">
              {repo.description || "No description available."}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      languageColors[repo.language] || "#6e7681",
                  }}
                />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" /> {repo.forks_count}
            </span>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

/* ============================================
   Projects Section
   ============================================ */
export default function Projects({ standalone = true }: { standalone?: boolean }) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const username =
          process.env.NEXT_PUBLIC_GITHUB_USERNAME || "BroAegg";
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`,
          {
            headers: { Accept: "application/vnd.github.v3+json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const content = (
    <>
      {standalone && (
        <SectionHeading
          title="Projects"
          subtitle="A curated selection of work that showcases my skills and interests."
        />
      )}

      {/* Bento Grid — Asymmetric Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[280px]">
          {staticProjects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>

        {/* GitHub Repos Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="mb-8 flex items-center gap-3">
            <Github className="h-5 w-5 text-accent" />
            <h3 className="font-heading text-xl font-bold text-foreground">
              GitHub Repositories
            </h3>
            <div className="h-px flex-1 bg-dark-border" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-2xl border border-dark-border bg-dark-card"
                />
              ))}
            </div>
          ) : repos.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo, i) => (
                <GitHubRepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted">
              Could not load GitHub repositories. Please check your connection.
            </p>
          )}
        </motion.div>
    </>
  );

  if (!standalone) return content;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent-blue/3 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">{content}</div>
    </section>
  );
}
