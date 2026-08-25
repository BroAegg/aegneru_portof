# Aegneru — Fullstack Developer Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)

**A premium dark-mode portfolio website with 3D visuals, smooth animations, and realtime features.**

</div>

---

## ✨ Features

- 🎨 **Dark Mode Design** — Clean, minimalist dark theme with subtle neon accents
- 🧊 **Interactive 3D Hero** — React Three Fiber scene with animated geometries
- 🎞️ **Framer Motion** — Smooth scroll reveals, stagger animations, magnetic buttons
- 🌊 **Lenis Smooth Scroll** — Studio-quality scrolling experience
- 📐 **Asymmetric Bento Grid** — Projects & tech stack in modern bento layout
- 💬 **Realtime Guestbook** — Supabase-powered live comments
- 📩 **Contact Form** — Server action submission to Supabase
- 🐙 **GitHub Integration** — Dynamic pinned repos from GitHub API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- Supabase project

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_GITHUB_USERNAME=BroAegg
```

### Database Setup

Run the SQL migration in your Supabase SQL Editor:

```bash
# File: supabase/migration.sql
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| 3D Graphics | React Three Fiber |
| Smooth Scroll | Lenis |
| Database | Supabase (PostgreSQL) |
| Icons | Lucide React |
| Fonts | Space Grotesk + Plus Jakarta Sans |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Home page (all sections)
│   └── globals.css         # Design system & utilities
├── components/
│   ├── navbar/             # Sticky glassmorphism navbar
│   ├── hero/               # Split-screen hero + 3D scene
│   ├── about/              # Profile photo + bio
│   ├── projects/           # Bento grid + GitHub repos
│   ├── certificates/       # Draggable carousel
│   ├── techstack/          # Categorized tech grid
│   ├── contact/            # Contact form
│   ├── guestbook/          # Realtime comments
│   ├── footer/             # Footer
│   └── ui/                 # Shared components
└── lib/
    ├── supabase.ts         # Supabase client & types
    └── actions.ts          # Server actions
```

## 📄 License

MIT © Aegner
