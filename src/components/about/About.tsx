"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 scroll-mt-20 md:scroll-mt-24">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/3 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="About Me"
          subtitle="A passionate software engineer building resilient solutions from front to back."
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Profile Photo - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
            className="flex justify-center lg:col-span-2"
          >
            <div className="group relative">
              {/* Glow behind photo */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-blue/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Photo frame */}
              <div className="relative h-72 w-72 overflow-hidden rounded-3xl border border-dark-border bg-dark-card sm:h-80 sm:w-80">
                <Image
                  src="/profile.jpg"
                  alt="Aegner Billik"
                  fill
                  sizes="(max-width: 640px) 288px, 320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />

                {/* Decorative corner accent */}
                <div className="absolute -right-1 -top-1 h-20 w-20 rounded-bl-3xl border-b border-l border-accent/30 pointer-events-none" />
                <div className="absolute -bottom-1 -left-1 h-20 w-20 rounded-tr-3xl border-t border-r border-accent-blue/30 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Bio Content - Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0, 0, 0.2, 1], delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                I&apos;m an Informatics Engineering graduate from Universitas Muhammadiyah Bandung (GPA 3.75/4.00, graduated July 2026), based in Bandung, Indonesia. Available immediately for Fullstack, Backend, and Software Engineer positions (both onsite and remote).
              </p>
              <p>
                My production experience includes building{" "}
                <span className="text-foreground font-semibold">
                  an autonomous enterprise cooperative ERP & offline-first POS system from scratch
                </span>{" "}
                (&gt;1 year dev, maintaining <strong className="text-emerald-400">0 downtime across 2+ months of live operational production</strong>), architecting multi-tenant academic accreditation portals in{" "}
                <span className="text-foreground font-semibold">
                  Next.js 14 and PostgreSQL
                </span>
                , and developing automated document OCR microservices in{" "}
                <span className="text-foreground font-semibold">
                  FastAPI and OpenCV
                </span>.
              </p>
              <p>
                As a graduate of Google Bangkit Academy 2024 (Machine Learning Path) and recipient of the National P2MW Innovation Grant, I combine solid computer science fundamentals with modern software engineering practices, ACID-compliant database architectures, and pragmatic AI-assisted workflows.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: "GPA / IPK (UMB)", value: "3.75" },
                { label: "Projects Built", value: "10+" },
                { label: "Verified Credentials", value: "25+" },
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
