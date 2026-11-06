"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X, ZoomIn, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  category: "all" | "google" | "deeplearning" | "python";
  date: string;
  image: string;
  verified?: boolean;
}

const certificateList: Certificate[] = [
  {
    id: 1,
    title: "Bangkit Academy Machine Learning Cohort Graduate",
    issuer: "Google, GoTo, Traveloka & Kemendikbudristek",
    category: "google",
    date: "2024",
    image: "/certificates/bangkit_graduation_kampus_merdeka.png",
    verified: true,
  },
  {
    id: 2,
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI & Stanford University (Andrew Ng)",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Machine_Learning.png",
    verified: true,
  },
  {
    id: 3,
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI & Stanford University",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Supervised_Machine_Learning_Regression_and_Classifications.png",
    verified: true,
  },
  {
    id: 4,
    title: "Advanced Learning Algorithms",
    issuer: "DeepLearning.AI & Stanford University",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Advanced_Learning_Algorithms.png",
    verified: true,
  },
  {
    id: 5,
    title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
    issuer: "DeepLearning.AI & Stanford University",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Unsupervised_Learning_Recommenders.png",
    verified: true,
  },
  {
    id: 6,
    title: "DeepLearning.AI TensorFlow Developer Certificate",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Tensorflow.png",
    verified: true,
  },
  {
    id: 7,
    title: "Introduction to TensorFlow for AI, Machine Learning, Deep Learning",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Introduction_to_TensorFlow_for_Artificial.png",
    verified: true,
  },
  {
    id: 8,
    title: "Convolutional Neural Networks in TensorFlow",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Convolutional_Neural_Networks_in_TensorFlow.png",
    verified: true,
  },
  {
    id: 9,
    title: "Natural Language Processing in TensorFlow",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Natural_Language_Processing_in_TensorFlow.png",
    verified: true,
  },
  {
    id: 10,
    title: "Sequences, Time Series and Prediction",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Sequences_and_Prediction.png",
    verified: true,
  },
  {
    id: 11,
    title: "Advanced Computer Vision with TensorFlow",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Advanced_Computer_Vision_with_TensorFlow.png",
    verified: true,
  },
  {
    id: 12,
    title: "Custom Models, Layers, and Loss Functions with TensorFlow",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Custom_Models_Layers_and_Loss_Functions_TF.png",
    verified: true,
  },
  {
    id: 13,
    title: "Custom and Distributed Training with TensorFlow",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Custom_and_Distributed_Training_with_TensorFlow.png",
    verified: true,
  },
  {
    id: 14,
    title: "Device-based Models with TensorFlow Lite",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Device-based_Models_with_Tensorflow_Lite.png",
    verified: true,
  },
  {
    id: 15,
    title: "Browser-based Models with TensorFlow.js",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Browser-based_Models_with_Tensorflow.png",
    verified: true,
  },
  {
    id: 16,
    title: "Data Pipelines with TensorFlow Data Services",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Data_Pipelines_with_Tensorflow_Service.png",
    verified: true,
  },
  {
    id: 17,
    title: "Advanced Deployment Scenarios with TensorFlow",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Advanced_Deployment_Scenarios_with_TensorFlow.png",
    verified: true,
  },
  {
    id: 18,
    title: "Generative Adversarial Networks (GANs) Specialization",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/GANs.png",
    verified: true,
  },
  {
    id: 19,
    title: "Build Generative Adversarial Networks (GANs)",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Build_Generative_Adversarial_Networks.png",
    verified: true,
  },
  {
    id: 20,
    title: "Structuring Machine Learning Projects",
    issuer: "DeepLearning.AI (Andrew Ng)",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Structuring_Machine_Learning_Projects.png",
    verified: true,
  },
  {
    id: 21,
    title: "Generative AI for Everyone",
    issuer: "DeepLearning.AI (Andrew Ng)",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Generative_AI_for_Everyone.png",
    verified: true,
  },
  {
    id: 22,
    title: "Linear Algebra for Machine Learning and Data Science",
    issuer: "DeepLearning.AI",
    category: "deeplearning",
    date: "2024",
    image: "/certificates/Linear_Algebra_for_Machine_Learning_and_Data_Science.png",
    verified: true,
  },
  {
    id: 23,
    title: "Crash Course on Python",
    issuer: "Google",
    category: "google",
    date: "2024",
    image: "/certificates/Crash_Course_on_Python.png",
    verified: true,
  },
  {
    id: 24,
    title: "Using Python to Interact with the Operating System",
    issuer: "Google",
    category: "google",
    date: "2024",
    image: "/certificates/Using_Python_to_Interact_with_the_Operating_System.png",
    verified: true,
  },
  {
    id: 25,
    title: "Belajar Analisis Data dengan Python",
    issuer: "Dicoding Indonesia",
    category: "python",
    date: "2024",
    image: "/certificates/Dicoding_Belajar_Analisis_Data_dengan_Python.png",
    verified: true,
  },
];

const categoryTabs = [
  { id: "all", label: "All Credentials" },
  { id: "google", label: "Google & Bangkit" },
  { id: "deeplearning", label: "DeepLearning.AI & ML" },
  { id: "python", label: "Python & Data" },
];

export default function Certificates({ standalone = true }: { standalone?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filtered = activeCategory === "all"
    ? certificateList
    : certificateList.filter((c) => c.category === activeCategory);

  const content = (
    <>
      {standalone && (
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Professional Certifications"
            subtitle="Verified credentials from Google, DeepLearning.AI, Stanford University, and Dicoding."
          />
        </div>
      )}

      {/* Filter Tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2 px-6">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeCategory === tab.id
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "border border-dark-border bg-dark-card/60 text-muted hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 opacity-60 text-xs">
              (
              {tab.id === "all"
                ? certificateList.length
                : certificateList.filter((c) => c.category === tab.id).length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Grid of Verified Certificate Cards */}
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filtered.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                onClick={() => setSelectedCert(cert)}
                className="cursor-pointer"
              >
                <GlowCard className="group h-full overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5">
                  <div className="flex h-full flex-col justify-between p-5">
                    {/* Certificate Image Thumbnail with Hover Zoom */}
                    <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-dark-border bg-dark/80">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-dark/30 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px] flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-dark-card/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg border border-white/20">
                          <ZoomIn className="h-3.5 w-3.5 text-accent" />
                          Inspect Certificate
                        </span>
                      </div>
                    </div>

                    {/* Certificate Information */}
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified Credential
                        </span>
                        <span className="text-xs text-muted/80">{cert.date}</span>
                      </div>

                      <h3 className="font-heading text-sm sm:text-base font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                        {cert.title}
                      </h3>

                      <p className="mt-1 text-xs text-muted line-clamp-1">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal for High-Resolution Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-6 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                      {selectedCert.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-muted">
                    Issued by <strong className="text-foreground">{selectedCert.issuer}</strong> • {selectedCert.date}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="rounded-lg border border-dark-border bg-dark/60 p-2 text-muted transition-colors hover:bg-dark-hover hover:text-foreground cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* High-Res Certificate Image */}
              <div className="relative h-[55vh] sm:h-[65vh] w-full overflow-hidden rounded-xl border border-dark-border bg-black/50">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                  Authenticated Physical / Digital Record
                </span>
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
                >
                  Open Original Image <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (!standalone) return content;

  return (
    <section id="certificates" className="relative py-24 md:py-32 overflow-hidden">
      {content}
    </section>
  );
}
