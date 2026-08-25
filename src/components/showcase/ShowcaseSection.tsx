"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Award, Layers } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Projects from "@/components/projects/Projects";
import Certificates from "@/components/certificates/Certificates";
import TechStackGrid from "./TechStackGrid";

type TabId = "projects" | "certificates" | "techstack";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "techstack", label: "Tech Stack", icon: Layers },
];

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<TabId>("techstack");

  // Listen to hash changes or custom events if user clicks navbar links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "projects" || hash === "certificates" || hash === "techstack") {
        setActiveTab(hash as TabId);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <section id="showcase" className="relative py-24 md:py-32">
      {/* Invisible anchors for direct navbar scrolling */}
      <div id="projects" className="absolute -top-24" />
      <div id="certificates" className="absolute -top-24" />
      <div id="techstack" className="absolute -top-24" />

      {/* Background glow accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Skills & Showcase"
          subtitle="Explore my projects, professional certificates, and technology stack."
        />

        {/* Tab Navigation Header — Matching Screenshot Style */}
        <div className="mb-14 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-2xl border border-dark-border bg-dark-card/90 p-2 shadow-2xl backdrop-blur-xl sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.history.replaceState(null, "", `#${tab.id}`);
                  }}
                  className={`relative flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-heading font-semibold transition-all duration-300 cursor-pointer sm:px-7 sm:py-3.5 ${
                    isActive
                      ? "text-white shadow-lg shadow-accent/20"
                      : "text-muted hover:text-foreground hover:bg-dark-hover/50"
                  }`}
                >
                  {/* Active tab background pill */}
                  {isActive && (
                    <motion.div
                      layoutId="showcaseActiveTab"
                      className="absolute inset-0 rounded-xl border border-accent/40 bg-gradient-to-r from-accent/90 to-accent-blue/90"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-muted"}`} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Tab Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
          >
            {activeTab === "projects" && <Projects standalone={false} />}
            {activeTab === "certificates" && <Certificates standalone={false} />}
            {activeTab === "techstack" && <TechStackGrid />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
