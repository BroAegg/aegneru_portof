"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard, { type ProjectItem } from "./ProjectCard";

/* ============================================
   Curated Featured Projects Data (6 Symmetrical Cards)
   ============================================ */
const projects: ProjectItem[] = [
  {
    title: "Manasuka / OpenCoop Enterprise ERP & Offline POS",
    description:
      "Autonomous cooperative ERP & POS engine with double-entry General Ledger (GL), offline-first tablet workstation via IndexedDB outbox sync, Bluetooth ESC/POS thermal printing, and statutory SHU RAT profit-sharing automation.",
    tags: ["Next.js", "React", "IndexedDB", "Double-Entry GL", "Bluetooth ESC/POS", "SHU RAT"],
    liveUrl: "https://opencoop-enterprise-demo.vercel.app",
    href: "https://github.com/BroAegg/opencoop-enterprise-demo",
    image: "/projects/koperasi-bermadani.png",
    visualType: "browser",
  },
  {
    title: "Academic Accreditation Portal & Multi-Tenant CMS",
    description:
      "High-performance academic portal and multi-tenant CMS for university accreditation (Tekpang UMB) achieving 100% Google Lighthouse SEO scores and sub-800ms page loads with Next.js 14 App Router, ISR, and PostgreSQL RBAC.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST API", "ISR"],
    liveUrl: "https://tekpang.umbandung.ac.id/",
    href: "https://github.com/BroAegg/cms_prodi_tekpang_umbandung",
    image: "/projects/tekpang.png",
    visualType: "browser",
  },
  {
    title: "Automated Admissions Document OCR Pipeline",
    description:
      "Automated document extraction pipeline for university admissions achieving 94%+ character accuracy using OpenCV preprocessing filters, Tesseract OCR engine, and FastAPI microservices.",
    tags: ["FastAPI", "Python", "OpenCV", "Tesseract OCR", "Next.js", "Computer Vision"],
    liveUrl: "https://ocr-pmb-umbandung.vercel.app/",
    href: "https://github.com/BroAegg/proyek_MachineLearning_analisis_data",
    image: "/projects/ocr-pmb.png",
    visualType: "browser",
  },
  {
    title: "Real-Time Factory QC Telemetry (IoT)",
    description:
      "Industrial manufacturing tracking system connecting ESP32 microcontrollers and RFID readers to live web dashboards via bidirectional WebSockets and Redis pub/sub.",
    tags: ["ESP32", "RFID RC522", "WebSockets", "Redis", "React.js", "C/C++"],
    href: "https://github.com/BroAegg/Monitoring-QC-RFID",
    visualType: "iot",
  },
  {
    title: "Deep Learning Audio Genre Classifier",
    description:
      "Audio DSP and deep learning system extracting Mel-Frequency Cepstral Coefficients (MFCC) to classify audio tracks across 10 musical genres with a CNN architecture.",
    tags: ["PyTorch", "Librosa", "CNN", "Streamlit", "Audio DSP"],
    href: "https://github.com/BroAegg/Music_Genre_Classification",
    visualType: "audio",
  },
  {
    title: "ZIS & Waqf Financial Management System",
    description:
      "Standard PSAK 109 Islamic finance and donation accounting portal with interactive real-time nisab calculator, audit logs, and automated invoice PDF receipts.",
    tags: ["Laravel", "Livewire", "Tailwind CSS", "MySQL", "PSAK 109 Accounting"],
    href: "https://github.com/BroAegg/Lazismu_Lengkong-php",
    visualType: "finance",
  },
];

/* ============================================
   Projects Section
   ============================================ */
export default function Projects({ standalone = true }: { standalone?: boolean }) {
  const content = (
    <>
      {standalone && (
        <SectionHeading
          title="Featured Projects"
          subtitle="Curated real-world systems engineered for production, verified impact, and live deployment."
        />
      )}

      {/* Symmetrical 3x2 Grid (No awkward voids, perfectly aligned) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} {...project} index={i} />
        ))}
      </div>
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
