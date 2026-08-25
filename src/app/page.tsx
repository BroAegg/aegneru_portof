"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Certificates from "@/components/certificates/Certificates";
import TechStack from "@/components/techstack/TechStack";
import Contact from "@/components/contact/Contact";
import Guestbook from "@/components/guestbook/Guestbook";
import Footer from "@/components/footer/Footer";

// Dynamic import for Lenis smooth scroll (client only)
const SmoothScroll = dynamic(
  () => import("@/components/ui/SmoothScroll"),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />

      <main className="flex-1">
        <Hero />

        <div className="section-divider mx-auto max-w-7xl" />

        <About />

        <div className="section-divider mx-auto max-w-7xl" />

        <Projects />

        <div className="section-divider mx-auto max-w-7xl" />

        <Certificates />

        <div className="section-divider mx-auto max-w-7xl" />

        <TechStack />

        <div className="section-divider mx-auto max-w-7xl" />

        <Contact />

        <div className="section-divider mx-auto max-w-7xl" />

        <Guestbook />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
