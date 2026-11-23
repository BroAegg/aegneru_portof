"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard, { type ProjectItem } from "./ProjectCard";

/* ============================================
   Curated Featured Projects Data (7 Projects strictly from Authentic Profile)
   ============================================ */
export const projects: ProjectItem[] = [
  {
    title: "Sistem ERP & POS Koperasi Manasuka",
    description:
      "Autonomous cooperative ERP & POS engine with double-entry General Ledger (GL) in PostgreSQL ACID, offline-first tablet workstation via IndexedDB outbox sync (1,000+ tx/month, 0 downtime 2+ months live), Bluetooth ESC/POS thermal printing (<1.2s), and statutory SHU RAT profit-sharing automation.",
    tags: ["Next.js", "React", "IndexedDB", "PostgreSQL ACID", "Bluetooth ESC/POS", "SHU RAT"],
    liveUrl: "https://opencoop-enterprise-demo.vercel.app/",
    href: "https://github.com/BroAegg/opencoop-enterprise-demo",
    image: "/projects/koperasi-bermadani.png",
    visualType: "browser",
    caseStudyUrl: "/projects/manasuka",
  },
  {
    title: "Academic Accreditation Portal & Multi-Tenant CMS",
    description:
      "High-performance academic portal and multi-tenant CMS for university accreditation (Tekpang UMB) achieving 100% Google Lighthouse SEO scores and sub-800ms page loads with Next.js 14 App Router, ISR, and PostgreSQL granular RBAC.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST API", "ISR"],
    liveUrl: "https://tekpang.umbandung.ac.id/",
    href: "https://github.com/BroAegg/cms_prodi_tekpang_umbandung",
    image: "/projects/tekpang.png",
    visualType: "browser",
  },
  {
    title: "Automated Admissions Document OCR Pipeline",
    description:
      "Automated document extraction pipeline for university admissions processing 1,000+ applicants with 94%+ character accuracy, reducing manual verification by 75% and data entry errors by 80% using OpenCV preprocessing, Tesseract OCR, and FastAPI.",
    tags: ["FastAPI", "Python", "OpenCV", "Tesseract OCR", "Next.js", "Computer Vision"],
    liveUrl: "https://ocr-pmb-umbandung.vercel.app/",
    href: "https://github.com/BroAegg/proyek_MachineLearning_analisis_data",
    image: "/projects/ocr-pmb.png",
    visualType: "browser",
  },
  {
    title: "PBF Pharmaceutical Regulatory ERP",
    description:
      "Frontend developer in a 3-person team building an enterprise pharmaceutical distribution ERP complying with BPOM CDOB standards, featuring Pharmacist-in-Charge license lifecycle tracking (APJ, SIPA, NIB).",
    tags: ["Vite", "TypeScript", "Tailwind CSS", "Laravel 12", "CDOB BPOM"],
    badge: "Team Project • In Development",
    visualType: "finance",
  },
  {
    title: "Real-Time Factory QC Telemetry (IoT)",
    description:
      "Industrial manufacturing tracking system connecting ESP32 microcontrollers and RFID readers to live web dashboards via bidirectional WebSockets and Redis pub/sub for real-time production defect and telemetry monitoring.",
    tags: ["ESP32", "RFID RC522", "WebSockets", "Redis", "React.js", "C/C++"],
    href: "https://github.com/BroAegg/Monitoring-QC-RFID",
    visualType: "iot",
  },
  {
    title: "ZIS & Waqf Financial Management System",
    description:
      "Standard PSAK 109 Islamic finance and donation accounting portal with interactive real-time nisab calculator, comprehensive audit trail logs, and automated invoice PDF receipts.",
    tags: ["Laravel", "Livewire", "Tailwind CSS", "MySQL", "PSAK 109 Accounting"],
    href: "https://github.com/BroAegg/Lazismu_Lengkong-php",
    visualType: "finance",
  },
  {
    title: "Deep Learning Audio Genre Classifier",
    description:
      "Audio DSP and deep learning system extracting Mel-Frequency Cepstral Coefficients (MFCC) to classify audio tracks across 10 musical genres with a custom PyTorch Convolutional Neural Network and Streamlit interface.",
    tags: ["PyTorch", "Librosa", "CNN", "Streamlit", "Audio DSP"],
    href: "https://github.com/BroAegg/Music_Genre_Classification",
    visualType: "audio",
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

      {/* Symmetrical Grid: 1 Flagship Card + 6 Standard Cards (2x3) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 0: Flagship Featured Project */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <ProjectCard {...projects[0]} index={0} featured />
        </div>

        {/* Cards 1-6: Symmetrical 3x2 Grid */}
        {projects.slice(1).map((project, i) => (
          <ProjectCard key={project.title} {...project} index={i + 1} />
        ))}
      </div>
    </>
  );

  if (!standalone) return content;

  return (
    <section id="projects" className="relative py-24 md:py-32 scroll-mt-20 md:scroll-mt-24">
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent-blue/3 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">{content}</div>
    </section>
  );
}
