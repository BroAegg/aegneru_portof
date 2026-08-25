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
  title: "Aegneru — Fullstack Developer Portfolio",
  description:
    "Personal portfolio of Aegner, a Fullstack Developer specializing in React, Next.js, Node.js, Python, and Supabase. Crafting innovative and user-friendly digital solutions.",
  keywords: [
    "fullstack developer",
    "portfolio",
    "web developer",
    "react",
    "next.js",
    "typescript",
    "python",
    "supabase",
  ],
  authors: [{ name: "Aegner", url: "https://github.com/BroAegg" }],
  openGraph: {
    title: "Aegneru — Fullstack Developer Portfolio",
    description:
      "Crafting innovative, functional, and user-friendly websites for modern digital solutions.",
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
