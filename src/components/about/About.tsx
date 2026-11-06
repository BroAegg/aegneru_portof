"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
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
                I&apos;m an Informatics Engineering graduate from Universitas Muhammadiyah Bandung (GPA 3.75/4.00, graduating January 2027), focused on building resilient fullstack architectures and real-time systems.
              </p>
              <p>
                My production experience includes engineering{" "}
                <span className="text-foreground font-medium">
                  Koperasi UMB&apos;s ERP & hybrid offline POS system
                </span>{" "}
                (with native Bluetooth thermal printing & IndexedDB sync), architecting multi-tenant academic portals in{" "}
                <span className="text-foreground font-medium">
                  Next.js 14 and Tailwind CSS
                </span>
                , and deploying industrial{" "}
                <span className="text-foreground font-medium">
                  IoT telemetry dashboards
                </span>{" "}
                using ESP32, RFID, and WebSockets.
              </p>
              <p>
                As a graduate of Google Bangkit Academy 2024 (Machine Learning Path) and recipient of the National P2MW Innovation Grant, I thrive at the intersection of robust backend logic, distributed databases, and high-performance user interfaces.
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
