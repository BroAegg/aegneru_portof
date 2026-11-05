import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aegner Billik — Software Engineer & Fullstack Developer",
  description:
    "Personal portfolio of Aegner Billik, Software Engineer and Informatics Engineering graduate from Universitas Muhammadiyah Bandung (GPA 3.75). Experienced in Next.js, React, Laravel, TypeScript, Python, PostgreSQL, and IoT systems.",
  keywords: [
    "Aegner Billik",
    "software engineer",
    "fullstack developer",
    "portfolio",
    "react",
    "next.js",
    "typescript",
    "laravel",
    "python",
    "postgresql",
    "iot",
  ],
  authors: [{ name: "Aegner Billik", url: "https://github.com/BroAegg" }],
  openGraph: {
    title: "Aegner Billik — Software Engineer & Fullstack Developer",
    description:
      "Engineering resilient fullstack platforms, offline-first systems, and industrial IoT solutions.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col noise-overlay">
        {children}
      </body>
    </html>
  );
}
