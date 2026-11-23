import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Database,
  WifiOff,
  Printer,
  Clock,
  ShieldCheck,
  Layers,
  Cpu,
  TrendingUp,
  FileText,
  RefreshCw,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study: ERP & Offline-First POS Koperasi Manasuka",
  description:
    "Arsitektur teknis mendalam sistem ERP & POS Koperasi Manasuka: antrean sinkronisasi outbox IndexedDB, general ledger double-entry SAK-ETAP di PostgreSQL, dan integrasi thermal printer Bluetooth native SPP.",
  alternates: {
    canonical: "/projects/manasuka",
  },
};

export default function ManasukaCaseStudy() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-purple-500/20 selection:text-purple-300">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#09090b]/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/#showcase"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
              Live Production
            </span>
            <a
              href="https://opencoop-enterprise-demo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-sm shadow-purple-900/40"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/BroAegg/opencoop-enterprise-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Repository</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Hero Header */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Architecture Deep Dive
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Koperasi Manasuka
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-white/5">
              Production since Sep 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-space leading-tight">
            Sistem ERP & POS Offline-First Koperasi Manasuka
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Arsitektur enterprise POS terdistribusi dengan pola antrean <span className="text-purple-300 font-medium">Outbox Pattern IndexedDB</span>, engine general ledger <span className="text-blue-300 font-medium">Double-Entry SAK-ETAP</span> di PostgreSQL ACID, dan driver pencetakan Bluetooth thermal native via Java RFCOMM SPP.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-white font-space">0 Downtime</div>
              <div className="text-xs text-zinc-400 mt-1">2+ Bulan Live Operasional</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 font-space">1.000+</div>
              <div className="text-xs text-zinc-400 mt-1">Tx/Bulan Tanpa Kehilangan Data</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 font-space">&lt; 1,2 Detik</div>
              <div className="text-xs text-zinc-400 mt-1">Struk Thermal Bluetooth SPP</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-space">&lt; 15 Detik</div>
              <div className="text-xs text-zinc-400 mt-1">Audit Konsinyasi & SHU RAT (dari 3 Hari)</div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white font-space">Problem Statement & Tantangan Bisnis</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                <WifiOff className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Instabilitas Jaringan Kasir Fisik</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Unit kasir minimarket dan gudang Koperasi Manasuka berada di lokasi dengan jangkauan seluler fluktuatif. Pada jam sibuk, terputusnya koneksi internet sering menyebabkan antrean kasir macet jika POS bergantung pada arsitektur web client-server murni. Sistem membutuhkan kemampuan transaksi kasir yang tetap berjalan lancar 100% tanpa internet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Keterlambatan Pembukuan & Audit RAT</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Sebelum digitalisasi, rekonsiliasi stok konsinyasi dari puluhan supplier dan penghitungan Sisa Hasil Usaha (SHU) untuk Rapat Anggota Tahunan (RAT) membutuhkan waktu hingga 3 hari kerja manual dengan spreadsheet. Hal ini rawan selisih kas, kesalahan FIFO pada barang konsinyasi, dan penundaan laporan keuangan regulatori.
              </p>
            </div>
          </div>
        </section>

        {/* Architecture 1: Offline-First & Outbox Pattern */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <h2 className="text-2xl font-bold text-white font-space">Arsitektur 1: Offline-First POS & Outbox Pattern</h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Untuk menjamin kasir dapat terus memproses transaksi tanpa koneksi internet, sistem mengimplementasikan pola <span className="text-zinc-200 font-semibold">Transactional Client Outbox</span>. Setiap transaksi di-commit seketika ke basis data lokal perangkat sebelum dikirimkan ke cloud.
          </p>

          {/* Inline SVG Diagram 1 */}
          <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-white/10 overflow-x-auto">
            <div className="min-w-[720px]">
              <svg viewBox="0 0 760 260" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#71717a" />
                  </marker>
                  <marker id="arrowPurple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#a78bfa" />
                  </marker>
                  <marker id="arrowEmerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#34d399" />
                  </marker>
                </defs>

                {/* Node 1: Tablet Kasir */}
                <rect x="20" y="50" width="160" height="150" rx="12" fill="url(#purpleGrad)" stroke="#8b5cf6" strokeWidth="1.5" />
                <text x="100" y="80" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="13" fontFamily="var(--font-space-grotesk)">POS Client UI</text>
                <text x="100" y="100" textAnchor="middle" fill="#a1a1aa" fontSize="11">Next.js Tablet / PWA</text>
                <rect x="35" y="125" width="130" height="55" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
                <text x="100" y="146" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="500">Checkout Event</text>
                <text x="100" y="164" textAnchor="middle" fill="#71717a" fontSize="10">UUID Idempotency Key</text>

                {/* Arrow from POS to Thermal Printer */}
                <path d="M 100 200 L 100 220" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrowPurple)" />
                <text x="105" y="240" fill="#a78bfa" fontSize="10" fontWeight="500">Bluetooth RFCOMM (&lt;1,2s)</text>

                {/* Arrow 1: To IndexedDB */}
                <path d="M 180 125 L 230 125" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrowPurple)" />
                <text x="205" y="115" textAnchor="middle" fill="#a1a1aa" fontSize="10">Instant Write</text>

                {/* Node 2: IndexedDB Outbox */}
                <rect x="240" y="50" width="160" height="150" rx="12" fill="url(#blueGrad)" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="320" y="80" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="13" fontFamily="var(--font-space-grotesk)">Local IndexedDB</text>
                <text x="320" y="100" textAnchor="middle" fill="#60a5fa" fontSize="11">Outbox Storage</text>
                <rect x="255" y="118" width="130" height="30" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="320" y="137" textAnchor="middle" fill="#93c5fd" fontSize="10 font-mono">Status: PENDING</text>
                <rect x="255" y="155" width="130" height="30" rx="6" fill="#18181b" stroke="#27272a" />
                <text x="320" y="174" textAnchor="middle" fill="#71717a" fontSize="10">Compound Index</text>

                {/* Arrow 2: To Sync Worker */}
                <path d="M 400 125 L 450 125" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* Node 3: Sync Service */}
                <rect x="460" y="50" width="130" height="150" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="525" y="80" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="13" fontFamily="var(--font-space-grotesk)">Sync Engine</text>
                <text x="525" y="100" textAnchor="middle" fill="#a1a1aa" fontSize="11">Online Listener</text>
                <rect x="470" y="120" width="110" height="65" rx="6" fill="#27272a" stroke="#3f3f46" />
                <text x="525" y="138" textAnchor="middle" fill="#38bdf8" fontSize="10">Batch Outbox</text>
                <text x="525" y="154" textAnchor="middle" fill="#94a3b8" fontSize="9">Exp. Backoff</text>
                <text x="525" y="170" textAnchor="middle" fill="#34d399" fontSize="9">Auto-Replay</text>

                {/* Arrow 3: To Backend */}
                <path d="M 590 125 L 630 125" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowEmerald)" />
                <text x="610" y="115" textAnchor="middle" fill="#34d399" fontSize="9">HTTPS REST</text>

                {/* Node 4: PostgreSQL Backend */}
                <rect x="640" y="50" width="105" height="150" rx="12" fill="url(#emeraldGrad)" stroke="#10b981" strokeWidth="1.5" />
                <text x="692" y="80" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="13" fontFamily="var(--font-space-grotesk)">PostgreSQL</text>
                <text x="692" y="100" textAnchor="middle" fill="#34d399" fontSize="11">ACID Ledger</text>
                <rect x="648" y="122" width="90" height="60" rx="6" fill="#064e3b" stroke="#047857" />
                <text x="692" y="142" textAnchor="middle" fill="#a7f3d0" fontSize="10 font-bold">Idempotency</text>
                <text x="692" y="158" textAnchor="middle" fill="#6ee7b7" fontSize="9">Double-Entry</text>
                <text x="692" y="172" textAnchor="middle" fill="#d1fae5" fontSize="8 font-mono">SYNCED = true</text>
              </svg>
            </div>
          </div>

          <div className="space-y-3 text-sm text-zinc-400">
            <h4 className="font-semibold text-zinc-200">Alur Eksekusi Transaksi Kasir:</h4>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>
                <strong className="text-zinc-200">Local Atomic Commit:</strong> Saat kasir menekan tombol bayar, transaksi dibuat dengan UUID v4 client-generated sebagai <code className="text-purple-300 font-mono">idempotency_key</code> dan langsung disimpan di store IndexedDB dengan status <code className="text-amber-400 font-mono">PENDING</code>.
              </li>
              <li>
                <strong className="text-zinc-200">Pencetakan Struk Instan:</strong> Struk langsung dicetak via Bluetooth thermal tanpa menunggu respons jaringan (eliminasi lag kasir).
              </li>
              <li>
                <strong className="text-zinc-200">Background Sync Worker:</strong> Listener jaringan mendeteksi koneksi online dan mengambil antrean transaksi pending berdasarkan urutan timestamp FIFO.
              </li>
              <li>
                <strong className="text-zinc-200">Server Idempotency Guard:</strong> Backend menerima payload batch, memeriksa keunikan <code className="text-purple-300 font-mono">idempotency_key</code> di PostgreSQL. Jika koneksi sempat drop saat pengiriman sebelumnya, server tidak akan memproses mutasi kas berulang. Setelah sukses di-commit, status lokal diubah menjadi <code className="text-emerald-400 font-mono">SYNCED</code>.
              </li>
            </ol>
          </div>
        </section>

        {/* Architecture 2: SAK-ETAP Double-Entry General Ledger */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white font-space">Arsitektur 2: Engine General Ledger Double-Entry (SAK-ETAP)</h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Koperasi Manasuka wajib mematuhi standar akuntansi entitas tanpa akuntabilitas publik (SAK-ETAP). Tidak ada angka keuangan yang disimpan sebagai kolom saldo statis bebas; seluruh saldo akun dihitung secara dinamis dari agregasi ayat jurnal berpasangan (<span className="text-zinc-200 font-semibold">Debit &amp; Kredit</span>) dalam transaksi PostgreSQL ACID.
          </p>

          {/* Inline SVG Diagram 2 */}
          <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-white/10 overflow-x-auto">
            <div className="min-w-[720px]">
              <svg viewBox="0 0 760 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
                  </marker>
                </defs>

                {/* Source Operations */}
                <rect x="20" y="35" width="160" height="150" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="100" y="65" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="13" fontFamily="var(--font-space-grotesk)">Sumber Operasional</text>
                <rect x="35" y="80" width="130" height="26" rx="5" fill="#27272a" />
                <text x="100" y="97" textAnchor="middle" fill="#d4d4d8" fontSize="10">Penjualan Kasir POS</text>
                <rect x="35" y="112" width="130" height="26" rx="5" fill="#27272a" />
                <text x="100" y="129" textAnchor="middle" fill="#d4d4d8" fontSize="10">Konsinyasi Supplier FIFO</text>
                <rect x="35" y="144" width="130" height="26" rx="5" fill="#27272a" />
                <text x="100" y="161" textAnchor="middle" fill="#d4d4d8" fontSize="10">Simpan Pinjam Anggota</text>

                {/* Arrow to Journal */}
                <path d="M 180 110 L 230 110" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow2)" />

                {/* Journal Vouchers */}
                <rect x="240" y="35" width="180" height="150" rx="10" fill="#064e3b" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                <text x="330" y="65" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="13" fontFamily="var(--font-space-grotesk)">Jurnal Transaksi (Vouchers)</text>
                <rect x="255" y="80" width="150" height="45" rx="6" fill="#022c22" stroke="#059669" />
                <text x="330" y="98" textAnchor="middle" fill="#6ee7b7" fontSize="10 font-mono">DEBIT: Kas / Piutang</text>
                <text x="330" y="114" textAnchor="middle" fill="#a7f3d0" fontSize="9 font-mono">Rp X.XXX.XXX</text>
                <rect x="255" y="132" width="150" height="45" rx="6" fill="#022c22" stroke="#059669" />
                <text x="330" y="150" textAnchor="middle" fill="#fca5a5" fontSize="10 font-mono">KREDIT: Penjualan / Utang</text>
                <text x="330" y="166" textAnchor="middle" fill="#fecaca" fontSize="9 font-mono">Rp X.XXX.XXX</text>

                {/* Balance constraint note */}
                <text x="330" y="200" textAnchor="middle" fill="#34d399" fontSize="10 font-bold">CONSTRAINT: SUM(Debit) = SUM(Kredit)</text>

                {/* Arrow to Ledger */}
                <path d="M 420 110 L 470 110" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow2)" />

                {/* General Ledger */}
                <rect x="480" y="35" width="110" height="150" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="535" y="65" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="13" fontFamily="var(--font-space-grotesk)">Buku Besar</text>
                <rect x="490" y="80" width="90" height="26" rx="5" fill="#27272a" />
                <text x="535" y="97" textAnchor="middle" fill="#d4d4d8" fontSize="10">Akun Aset</text>
                <rect x="490" y="112" width="90" height="26" rx="5" fill="#27272a" />
                <text x="535" y="129" textAnchor="middle" fill="#d4d4d8" fontSize="10">Kewajiban</text>
                <rect x="490" y="144" width="90" height="26" rx="5" fill="#27272a" />
                <text x="535" y="161" textAnchor="middle" fill="#d4d4d8" fontSize="10">Ekuitas &amp; SHU</text>

                {/* Arrow to Reports */}
                <path d="M 590 110 L 630 110" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow2)" />

                {/* Financial Statements */}
                <rect x="640" y="35" width="105" height="150" rx="10" fill="#1e1b4b" fillOpacity="0.4" stroke="#6366f1" strokeWidth="1.5" />
                <text x="692" y="65" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="13" fontFamily="var(--font-space-grotesk)">Laporan RAT</text>
                <rect x="648" y="80" width="90" height="26" rx="5" fill="#312e81" />
                <text x="692" y="97" textAnchor="middle" fill="#c7d2fe" fontSize="9 font-semibold">Neraca Saldo</text>
                <rect x="648" y="112" width="90" height="26" rx="5" fill="#312e81" />
                <text x="692" y="129" textAnchor="middle" fill="#c7d2fe" fontSize="9 font-semibold">Laba / Rugi</text>
                <rect x="648" y="144" width="90" height="26" rx="5" fill="#312e81" />
                <text x="692" y="161" textAnchor="middle" fill="#a5b4fc" fontSize="8 font-bold">SHU RAT &lt;15s</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Technical Implementation & Design Decisions */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white font-space">Keputusan Desain &amp; Implementasi Teknis</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Decision 1: IndexedDB vs localStorage */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-purple-400">
                <Database className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-white">1. Mengapa IndexedDB, Bukan localStorage?</h3>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200">Kapasitas Penyimpanan:</strong> localStorage terbatas pada ~5MB per domain, sedangkan IndexedDB mampu menampung ratusan megabyte katalog produk, riwayat transaksi, dan cache gambar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200">Non-blocking Asynchronous I/O:</strong> localStorage bersifat synchronous dan memblokir UI thread saat menulis nota belanja panjang. IndexedDB berjalan secara asynchronous melalui event loop.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200">Compound Indexing:</strong> Indeks majemuk <code className="text-xs bg-zinc-800 text-purple-300 px-1 py-0.5 rounded font-mono">[status, created_at]</code> memungkinkan pengambilan antrean pending dalam hitungan sub-milidetik.
                  </span>
                </li>
              </ul>
            </div>

            {/* Decision 2: Conflict Resolution */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-blue-400">
                <RefreshCw className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-white">2. Strategi Penanganan Konflik Sinkronisasi</h3>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200">Server Authority with Idempotency Token:</strong> Server bertindak sebagai sumber kebenaran tunggal (<em className="italic">single source of truth</em>). Setiap request mutasi menyertakan UUID unik klien.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200">Penanganan Duplikasi Jaringan:</strong> Bila terjadi retry akibat network timeout, server mengembalikan status sukses yang sama tanpa mengeksekusi jurnal ganda.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-200">Alokasi Stok FIFO:</strong> Pengurangan stok konsinyasi menggunakan nomor batch dan timestamp server untuk mencegah inkonsistensi multi-kasir.
                  </span>
                </li>
              </ul>
            </div>

            {/* Decision 3: Thermal Printer Bluetooth */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Printer className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-white">3. Integrasi Thermal Printer Bluetooth ESC/POS</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Cetak struk kasir melalui browser web konvensional (dialog print OS) terlalu lambat dan sering terputus. Solusinya:
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Membangun jembatan native via <strong className="text-zinc-200">Capacitor Custom Plugin</strong> ke Java Android socket <code className="text-xs bg-zinc-800 text-purple-300 px-1 py-0.5 rounded font-mono">BluetoothDevice.createRfcommSocketToServiceRecord</code> (SPP UUID).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Mengirimkan buffer byte biner murni command <strong className="text-zinc-200">ESC/POS (58mm/80mm)</strong> tanpa render grafik HTML, memangkas durasi cetak struk hingga <strong className="text-emerald-400">&lt; 1,2 detik</strong>.
                  </span>
                </li>
              </ul>
            </div>

            {/* Decision 4: SQL Query Optimization */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Zap className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-white">4. Optimasi SQL: Konsinyasi FIFO &amp; SHU RAT</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Kalkulasi dividen tahunan (SHU) koperasi melibatkan agregasi bobot modal simpanan dan volume belanja seluruh anggota:
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Menggantikan kalkulasi looping di application layer dengan <strong className="text-zinc-200">Common Table Expressions (CTEs)</strong> dan PostgreSQL Window Functions yang terindeks pada <code className="text-xs bg-zinc-800 text-purple-300 px-1 py-0.5 rounded font-mono">(member_id, fiscal_year)</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Durasi kompilasi laporan audit konsinyasi dan pembagian SHU RAT dipangkas dari <strong className="text-zinc-200">3 hari kerja manual</strong> menjadi <strong className="text-emerald-400">&lt; 15 detik</strong>.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real Production Metrics Table */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white font-space">Metrik Validasi Produksi</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/30">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-800/50 text-xs uppercase tracking-wider text-zinc-400 border-b border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">Parameter Sistem</th>
                  <th scope="col" className="px-6 py-4">Sebelum Sistem</th>
                  <th scope="col" className="px-6 py-4">Setelah Implementasi</th>
                  <th scope="col" className="px-6 py-4">Dampak &amp; Reliabilitas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    Ketahanan Jaringan Kasir
                  </td>
                  <td className="px-6 py-4 text-zinc-500">Antrean macet saat internet drop</td>
                  <td className="px-6 py-4 text-emerald-400 font-semibold">100% Offline-First (Outbox)</td>
                  <td className="px-6 py-4 text-zinc-400">1.000+ transaksi bulanan tanpa data hilang</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Durasi Audit RAT &amp; Konsinyasi
                  </td>
                  <td className="px-6 py-4 text-zinc-500">3 hari kerja kompilasi nota fisik</td>
                  <td className="px-6 py-4 text-emerald-400 font-semibold">&lt; 15 detik (SQL FIFO)</td>
                  <td className="px-6 py-4 text-zinc-400">Otomatisasi neraca &amp; laporan laba rugi</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <Printer className="w-4 h-4 text-blue-400" />
                    Kecepatan Cetak Struk Kasir
                  </td>
                  <td className="px-6 py-4 text-zinc-500">4 - 6 detik via browser print dialog</td>
                  <td className="px-6 py-4 text-emerald-400 font-semibold">&lt; 1,2 detik (RFCOMM SPP)</td>
                  <td className="px-6 py-4 text-zinc-400">Pencetakan raw byte ESC/POS instan</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Kepatuhan Akuntansi
                  </td>
                  <td className="px-6 py-4 text-zinc-500">Pencatatan saldo manual rentan selisih</td>
                  <td className="px-6 py-4 text-emerald-400 font-semibold">SAK-ETAP Double-Entry</td>
                  <td className="px-6 py-4 text-zinc-400">PostgreSQL ACID Transaction Boundaries</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tech Stack Summary */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white font-space">Teknologi yang Digunakan</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "PostgreSQL ACID",
              "SAK-ETAP Accounting",
              "IndexedDB Outbox",
              "Capacitor",
              "Java RFCOMM SPP",
              "ESC/POS Thermal Protocol",
              "REST API",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-zinc-900 border border-white/10 text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Bottom Navigation */}
        <section className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#showcase"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Kembali ke Portofolio Utama</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="https://opencoop-enterprise-demo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors"
            >
              <span>Buka Demo Aplikasi</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/BroAegg/opencoop-enterprise-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
