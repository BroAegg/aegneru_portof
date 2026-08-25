# Blueprint Web Portofolio: Aegner

## 1. Project Overview & Tech Stack
- **Nama Aplikasi:** Aegneru_portof
- **Brand Name:** Aegneru
- **Role Utama:** Fullstack Developer
- **Tech Stack Frontend:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Tech Stack Backend & DB:** Supabase (PostgreSQL, Auth, Storage).
- **Deployment:** Vercel.
- **UI/UX Libraries:** 
  - `framer-motion` (untuk animasi dan transisi mikro).
  - `@studio-freight/react-lenis` (untuk smooth scrolling ala studio).
  - `@splinetool/react-spline` atau `three.js` (untuk render 3D di Hero section).
  - `lucide-react` (untuk iconography).

## 2. Design System & UI/UX Guidelines
- **Theme:** Dark mode, clean, minimalis, dan profesional.
- **Colors:**
  - Background: Sangat gelap (contoh: `#09090b` atau `#0a0a0a`).
  - Accent/Neon Glow: Ungu/Biru elektrik (contoh: `#8b5cf6` atau `#3b82f6`) namun dengan opacity rendah agar *subtle* dan elegan.
- **Typography:**
  - Headings: Gunakan font Sans-serif geometris seperti **Space Grotesk** atau **Syne**.
  - Body: Gunakan font modern yang bersih seperti **Plus Jakarta Sans** atau **Inter**.
- **Layout Style:** Hindari *grid template* AI yang kaku. Gunakan **Asymmetric Bento Grid** untuk section Projects dan Tech Stack. Terapkan efek *magnetic hover* pada tombol-tombol utama.

## 3. Content Architecture & Sections

### A. Navigation Bar
- **Brand/Logo:** Teks "Aegneru" di pojok kiri atas (bold, dengan sedikit efek gradient text).
- **Menu:** Home, About, Projects, Certificates, Tech Stack, Contact.
- **Behavior:** Fixed/Sticky top dengan efek *glassmorphism* (blur) saat di-scroll.

### B. Landing Page (Home)
- **Layout:** Split-screen (Teks di kiri, Visual 3D di kanan).
- **Kiri (Teks & Interaksi):**
  - Badge Component: "Ready to Innovate" dengan ikon bintang/sparkles kecil.
  - Heading 1: "Fullstack Developer" (Ukuran besar, tebal).
  - Subheading Animasi (Typewriter/Flip): "Tech | React, Node.js, Python, Supabase"
  - Deskripsi: "Menciptakan website yang inovatif, fungsional, dan user-friendly untuk solusi digital."
  - CTA Buttons: 
    1. Primary: "Projects" (dengan panah panah diagonal `↗`).
    2. Secondary: "Contact" (dengan ikon amplop).
  - Social Links: Ikon GitHub, LinkedIn, Instagram di kiri bawah (dengan animasi *hover scale*).
- **Kanan (Visual):**
  - Integrasikan kanvas 3D interaktif. Jangan gunakan gambar statis 2D. 

### C. About Me
- **Visual:** Slot untuk foto profil personal (bentuk frame asimetris atau melingkar dengan efek *glow* halus di belakangnya).
- **Bio Content:**
  "Saya adalah mahasiswa Teknik Informatika yang memiliki ketertarikan mendalam pada pengembangan perangkat lunak secara *end-to-end*. Saat ini, saya sedang menyelesaikan tugas akhir yang berfokus pada pengembangan sistem Optical Character Recognition (OCR) menggunakan Python, OpenCV, dan Tesseract. 
  
  Di ranah akademis, saya aktif sebagai Asisten Praktikum Web Design, di mana saya mengevaluasi dan merancang rubrik penilaian untuk modul praktikum mahasiswa. Di luar pengembangan web, saya gemar mengeksplorasi ide-ide kreatif, salah satunya dengan merancang game indie hibrida yang memadukan genre Real-Time Strategy (RTS) dan mekanik Minesweeper."

### D. Projects (Bento Grid Layout)
Tampilkan dalam bentuk grid asimetris. Setiap *card* harus memiliki efek *border glow* saat di-hover.
1. **Sistem OCR Berbasis Python:** Proyek tugas akhir pengenalan karakter optik dari gambar menggunakan stack OpenCV dan Tesseract.
2. **ProjectM x RTS:** Konsep pengembangan game indie dengan tema ekosistem laut, berfokus pada pelestarian alga dan terumbu karang yang menggabungkan elemen strategi dan mekanik *puzzle*.
3. **Web Design Assessment Platform:** Sistem dan rubrik penilaian terstruktur yang dirancang untuk mengevaluasi modul praktikum kelas web design (IF 24 C).
4. *(Opsional Tambahan)*: Slot dinamis untuk menarik *Pinned Repositories* dari GitHub API.

### E. Certificates & Tech Stack
- **Certificates:** Tampilkan sertifikat relevan dalam bentuk *carousel* horizontal yang bisa di-drag.
- **Tech Stack:** Buat grid kecil berisikan logo/nama teknologi. Bagi menjadi:
  - Frontend: React, Next.js, Tailwind.
  - Backend & DB: Node.js, Python, Supabase.
  - Tools: Git, OpenCV.

### F. Contact & Guestbook (Supabase Integration)
- **Contact Form:**
  - Input: Nama, Email, Pesan.
  - Aksi: Insert ke tabel Supabase `contacts`.
  - Beri *toast notification* (pesan sukses) setelah submit.
- **Guestbook / Comments:**
  - Kolom bagi pengunjung untuk meninggalkan pesan singkat.
  - Tampilkan list pesan (nama, komentar, waktu) yang diambil dari tabel Supabase `comments`.
  - Harus *real-time* (gunakan fitur `Supabase Realtime`).

## 4. Supabase Database Schema Requirements
AI harus membuatkan fungsi atau memberikan file SQL migrasi untuk tabel berikut:
- **Table `contacts`**: `id` (uuid), `name` (text), `email` (text), `message` (text), `created_at` (timestamp).
- **Table `comments`**: `id` (uuid), `guest_name` (text), `comment_text` (text), `created_at` (timestamp). Aktifkan Row Level Security (RLS) untuk *insert* (anon) dan *select* (anon).