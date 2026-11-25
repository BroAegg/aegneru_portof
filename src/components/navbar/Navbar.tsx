"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<string>("projects");
  const showcaseTabRef = useRef("projects");

  useEffect(() => {
    showcaseTabRef.current = activeShowcaseTab;
  }, [activeShowcaseTab]);

  // Track scroll position for navbar background solidifying (scrollY > 8)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for tab changes from ShowcaseSection
  useEffect(() => {
    const handleTabActive = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveShowcaseTab(customEvent.detail);
      }
    };
    window.addEventListener("portfolio-tab-active", handleTabActive);

    // Initial check from URL hash deferred to avoid synchronous setState inside effect
    const frameId = requestAnimationFrame(() => {
      const initialHash = window.location.hash.replace("#", "");
      if (["projects", "certificates", "techstack"].includes(initialHash)) {
        setActiveShowcaseTab(initialHash);
        setActiveSection(initialHash);
      }
    });

    return () => {
      window.removeEventListener("portfolio-tab-active", handleTabActive);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Intersection Observer for active section on scroll
  useEffect(() => {
    const observedSectionIds = ["home", "about", "showcase", "contact"];
    const sectionElements = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // Select the visible entry with the highest intersection ratio
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }

        if (bestEntry) {
          const targetId = bestEntry.target.id;
          if (targetId === "showcase") {
            setActiveSection(showcaseTabRef.current);
          } else {
            setActiveSection(targetId);
          }
        }
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const target = href.replace("#", "");

    if (["projects", "certificates", "techstack"].includes(target)) {
      setActiveShowcaseTab(target);
      setActiveSection(target);
      window.history.replaceState(null, "", `#${target}`);
      window.dispatchEvent(new CustomEvent("portfolio-tab-change", { detail: target }));
      const showcaseEl = document.getElementById("showcase");
      if (showcaseEl) {
        showcaseEl.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const el = document.getElementById(target);
    if (el) {
      setActiveSection(target);
      window.history.replaceState(null, "", `#${target}`);
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#09090b]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40"
          : "bg-[#09090b]/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="font-heading text-xl font-bold tracking-tight"
        >
          <span className="gradient-text">Aegner Billik</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const linkKey = link.href.slice(1);
            const isActive = activeSection === linkKey;

            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-blue"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          <a
            href="/CV_Aegner_Billik.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-white"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="relative z-50 rounded-lg p-2 text-foreground transition-colors hover:bg-dark-hover md:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-dark-border bg-[#09090b]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => {
                const linkKey = link.href.slice(1);
                const isActive = activeSection === linkKey;

                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "bg-dark-hover text-foreground font-semibold"
                        : "text-muted hover:bg-dark-hover hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
              <a
                href="/CV_Aegner_Billik.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-center text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
              >
                View Resume / CV ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
