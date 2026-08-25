"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Sparkles, Github, Linkedin, Instagram } from "lucide-react";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/ui/MagneticButton";

// Dynamic import for Three.js scene (SSR disabled)
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
    </div>
  ),
});

/* ============================================
   Typewriter Effect
   ============================================ */
const techStack = ["React", "Next.js", "Node.js", "Python", "Supabase", "TypeScript"];

function TypewriterText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = techStack[currentIndex];
    const timeout = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % techStack.length);
        }
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <span className="text-accent">
      {displayText}
      <span className="typewriter-cursor ml-0.5" />
    </span>
  );
}

/* ============================================
   Social Link Button
   ============================================ */
function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-dark-border bg-dark-card text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  );
}

/* ============================================
   Hero Section
   ============================================ */
export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-accent-blue/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8">
        {/* Left: Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Ready to Innovate
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Fullstack
            <br />
            <span className="gradient-text">Developer</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            variants={itemVariants}
            className="font-heading text-lg font-medium text-muted sm:text-xl"
          >
            Tech | <TypewriterText />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-lg text-base leading-relaxed text-muted/80 sm:text-lg"
          >
            Crafting innovative, functional, and user-friendly websites
            for modern digital solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <MagneticButton href="#projects" variant="primary">
              Projects <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              <Mail className="h-4 w-4" /> Contact
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-3 pt-4">
            <SocialLink
              href="https://github.com/BroAegg"
              icon={Github}
              label="GitHub"
            />
            <SocialLink
              href="https://linkedin.com"
              icon={Linkedin}
              label="LinkedIn"
            />
            <SocialLink
              href="https://instagram.com"
              icon={Instagram}
              label="Instagram"
            />
          </motion.div>
        </motion.div>

        {/* Right: 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative h-[400px] lg:h-[550px]"
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>

          {/* Decorative glow behind 3D */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-accent/5 blur-3xl" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted/50">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-dark-border p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
