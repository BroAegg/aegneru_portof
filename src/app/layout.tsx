import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aegner.my.id"),
  title: {
    default: "Aegner Billik, S.Kom. | Fullstack & Backend Engineer",
    template: "%s | Aegner Billik",
  },
  description:
    "Portofolio teknis Aegner Billik, S.Kom., Fullstack & Backend Engineer berbasis di Bandung. Pengalaman membangun sistem ERP Koperasi Manasuka (PostgreSQL ACID, offline-first IndexedDB POS), portal CMS multi-tenant, dan microservices OCR.",
  keywords: [
    "Aegner Billik",
    "Fullstack Engineer",
    "Backend Engineer",
    "Next.js",
    "Laravel",
    "PostgreSQL",
    "IndexedDB POS",
    "Double-Entry Ledger",
    "FastAPI",
    "PyTorch",
    "Bandung",
  ],
  authors: [{ name: "Aegner Billik, S.Kom.", url: "https://github.com/BroAegg" }],
  creator: "Aegner Billik",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aegner Billik, S.Kom. — Fullstack & Backend Engineer",
    description:
      "Next.js, Laravel & PostgreSQL • Offline-First POS Systems • Double-Entry Ledger Engines",
    url: "https://aegner.my.id",
    siteName: "Aegner Billik Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aegner Billik, S.Kom. — Fullstack & Backend Engineer",
    description:
      "Next.js, Laravel & PostgreSQL • Offline-First POS Systems • Double-Entry Ledger Engines",
    creator: "@BroAegg",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://aegner.my.id/#person",
      name: "Aegner Billik",
      alternateName: ["Aegner Billik, S.Kom.", "BroAegg"],
      jobTitle: "Fullstack / Backend Engineer",
      description:
        "Fullstack and Backend Software Engineer specializing in Next.js, Laravel, PostgreSQL ACID double-entry ledgers, and offline-first POS systems.",
      url: "https://aegner.my.id",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universitas Muhammadiyah Bandung",
      },
      sameAs: [
        "https://github.com/BroAegg",
        "https://www.linkedin.com/in/aegnerbillik/",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Laravel",
        "PHP",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "IndexedDB",
        "FastAPI",
        "PyTorch",
        "OpenCV",
        "ESP32",
        "WebSockets",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://aegner.my.id/#website",
      url: "https://aegner.my.id",
      name: "Aegner Billik Portfolio",
      publisher: {
        "@id": "https://aegner.my.id/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-full flex flex-col noise-overlay">
        {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[999] rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-white shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
        >
          Lewati ke konten utama
        </a>

        {children}
      </body>
    </html>
  );
}
