"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, GripHorizontal } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";

/* ============================================
   Placeholder Certificate Data
   ============================================ */
const certificates = [
  {
    id: 1,
    title: "Bangkit Academy Machine Learning Cohort",
    issuer: "Google, GoTo, Traveloka & Kemendikbud",
    date: "2024",
  },
  {
    id: 2,
    title: "Google IT Automation with Python",
    issuer: "Google & Coursera",
    date: "2024",
  },
  {
    id: 3,
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI & Stanford (Andrew Ng)",
    date: "2024",
  },
  {
    id: 4,
    title: "TensorFlow Developer & Advanced CV",
    issuer: "DeepLearning.AI",
    date: "2024",
  },
  {
    id: 5,
    title: "Node.js, Express & MongoDB Bootcamp",
    issuer: "Jonas Schmedtmann",
    date: "2024",
  },
  {
    id: 6,
    title: "The Complete JavaScript Course: Zero to Expert",
    issuer: "Jonas Schmedtmann",
    date: "2024",
  },
  {
    id: 7,
    title: "SQL & PostgreSQL Developer's Guide",
    issuer: "Stephen Grider",
    date: "2024",
  },
  {
    id: 8,
    title: "P2MW National Innovation Grantee",
    issuer: "Ditjen Diktiristek Kemendikbudristek",
    date: "2024",
  },
];

export default function Certificates({ standalone = true }: { standalone?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const content = (
    <>
      {standalone && (
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Certificates"
            subtitle="Professional certifications and achievements."
          />
        </div>
      )}

      {/* Draggable Horizontal Carousel */}
      <div ref={containerRef} className="relative">
        <motion.div
          drag="x"
          dragConstraints={{ left: -800, right: 0 }}
          style={{ x }}
          className="flex cursor-grab gap-6 px-6 active:cursor-grabbing md:px-[calc(50vw-560px)]"
        >
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex-shrink-0"
            >
              <GlowCard className="w-[300px] sm:w-[340px]">
                <div className="p-6">
                  {/* Certificate image placeholder */}
                  <div className="mb-4 flex h-40 items-center justify-center rounded-xl border border-dark-border bg-dark/50">
                    <Award className="h-12 w-12 text-accent/30" />
                  </div>

                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {cert.title}
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted">
                    <span>{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Drag indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted/50">
          <GripHorizontal className="h-4 w-4" />
          <span>Drag to browse</span>
        </div>
      </div>
    </>
  );

  if (!standalone) return content;

  return (
    <section id="certificates" className="relative py-24 md:py-32 overflow-hidden">
      {content}
    </section>
  );
}
