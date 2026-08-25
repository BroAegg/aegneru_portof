"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/3 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="About Me"
          subtitle="A passionate developer building solutions from front to back."
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Profile Photo - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center lg:col-span-2"
          >
            <div className="group relative">
              {/* Glow behind photo */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-blue/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Photo frame */}
              <div className="relative h-72 w-72 overflow-hidden rounded-3xl border border-dark-border bg-dark-card sm:h-80 sm:w-80">
                {/* Placeholder — replace with actual photo */}
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted">
                  <User className="h-16 w-16 text-dark-border" />
                  <span className="text-sm text-muted/60">Your Photo Here</span>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute -right-1 -top-1 h-20 w-20 rounded-bl-3xl border-b border-l border-accent/30" />
                <div className="absolute -bottom-1 -left-1 h-20 w-20 rounded-tr-3xl border-t border-r border-accent-blue/30" />
              </div>
            </div>
          </motion.div>

          {/* Bio Content - Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                I&apos;m an Informatics Engineering student with a deep passion for
                end-to-end software development. Currently, I&apos;m completing my
                final thesis focused on building an{" "}
                <span className="text-foreground font-medium">
                  Optical Character Recognition (OCR) system
                </span>{" "}
                using Python, OpenCV, and Tesseract.
              </p>
              <p>
                In the academic sphere, I serve as a{" "}
                <span className="text-foreground font-medium">
                  Web Design Lab Assistant
                </span>
                , where I evaluate and design assessment rubrics for student lab
                modules. Beyond web development, I enjoy exploring creative
                ideas — one of which involves designing a hybrid indie game
                that combines{" "}
                <span className="text-foreground font-medium">
                  Real-Time Strategy (RTS)
                </span>{" "}
                mechanics with Minesweeper puzzles.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: "Projects", value: "10+" },
                { label: "Tech Stack", value: "12+" },
                { label: "Experience", value: "3+ yrs" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="rounded-xl border border-dark-border bg-dark-card p-4 text-center"
                >
                  <div className="font-heading text-2xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
