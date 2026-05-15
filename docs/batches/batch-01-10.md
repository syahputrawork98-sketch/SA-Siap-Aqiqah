# Log Batch 01 - 10

## Batch 01: Setup Fondasi Repo
- **Tanggal**: 2026-05-15
- **Tujuan**: Menyiapkan struktur dasar monorepo.
- **Pekerjaan**:
  - Membuat folder `client/`, `server/`, `docs/`.
  - Membuat root README dengan deskripsi project baru.
  - Membuat placeholder `server/README.md`.
  - Menyusun dokumentasi awal (`current-status`, `roadmap`, `scope-guard`, `migration-notes`).
- **Status**: Selesai.

---

## Batch 01.1: Konsolidasi Dokumentasi (Fix Batch 1)
- **Tanggal**: 2026-05-15
- **Tujuan**: Menyatukan pusat dokumentasi agar tidak terjadi dualisme antara `docs/project/` dan `docs/project-control/`.
- **Pekerjaan**:
  - Membuat `docs/project/workflow.md` (Migrasi peran & alur dari `project-control`).
  - Menghapus folder `docs/project-control/`.
  - Mengupdate status project dan root README.
- **Status**: Selesai.

---

## Batch 01.2: Root .gitignore Setup
- **Tanggal**: 2026-05-15
- **Tujuan**: Menyiapkan `.gitignore` baseline agar file sampah/dependency tidak masuk Git.
- **Pekerjaan**:
  - Membuat `.gitignore` di root folder.
  - Memastikan `node_modules`, `dist`, `.env`, dan file editor diabaikan.
- **Status**: Selesai.

---

## Batch 02: Client Foundation Setup
- **Tanggal**: 2026-05-15
- **Tujuan**: Inisialisasi project frontend di folder `client/`.
- **Pekerjaan**:
  - Inisialisasi `package.json` dengan React 19, Vite 6, Tailwind 4, dan DaisyUI 5.
  - Setup `vite.config.js` dengan import alias `@` ke `src/` dan subfolder FSD.
  - Setup `eslint.config.js` dan basic styling.
  - Membuat placeholder `App.jsx` dengan test counter dan DaisyUI components.
  - Berhasil menjalankan `npm run build` dan `npm run lint`.
- **Status**: Selesai.

---

## Batch 02.1: Dependency Alignment (Fix Batch 2)
- **Tanggal**: 2026-05-15
- **Tujuan**: Menyelaraskan versi dependency client dengan repo lama SIQAH Frontend.
- **Pekerjaan**:
  - Mengupdate `client/package.json` agar sesuai dengan versi React 19.1, Vite 7.1, Tailwind 4.1, dan DaisyUI 5.3.
  - Mempertahankan `eslint-plugin-react` untuk kualitas kode.
  - Verifikasi ulang dengan `npm run build` dan `npm run lint`.
- **Status**: Selesai.

---

## Batch 03: Migration Phase - App Shell & Base Layout
- **Tanggal**: 2026-05-15
- **Tujuan**: Membangun fondasi struktur aplikasi dan sistem routing.
- **Pekerjaan**:
  - Setup struktur folder `app/`, `features/`, `shared/`.
  - Implementasi `AppRouter` dengan `publicRoutes`, `adminRoutes`, dan `superadminRoutes`.
  - Membuat `PublicLayout` dan `RoleLayout` dasar.
  - Implementasi `RoleGuard` (mock) dan `AppErrorBoundary`.
  - Membuat placeholder pages untuk Home, Admin Dashboard, dan Superadmin Dashboard.
  - Berhasil verifikasi build dan linting.
- **Status**: Selesai.

---

## Batch 04: Migration Phase - Public Layout & Shared UI
- **Tanggal**: 2026-05-15
- **Tujuan**: Memigrasikan elemen visual dasar dan layout publik.
- **Pekerjaan**:
  - Migrasi `Navbar` dan `Footer` dari SIQAH Frontend.
  - Setup `shared/ui/Button` dan `shared/lib/date`.
  - Update `PublicLayout` untuk menggunakan komponen Navbar & Footer asli.
  - Membuat placeholder pages untuk rute: `/tentang`, `/layanan`, `/paket`, `/kontak`.
  - Sinkronisasi token CSS dan font di `index.css`.
- **Status**: Selesai.

---

## Batch 05: Migration Phase - Public Pages Content
- **Tanggal**: 2026-05-15
- **Tujuan**: Memigrasikan konten lengkap halaman Home/Landing Page.
- **Pekerjaan**:
  - Migrasi 8 section utama Home (Hero, About, Paket, Timeline, Hewan, Testimoni, Tim, CTA).
  - Migrasi data mock ke `shared/mocks/public/home/`.
  - Implementasi komponen shared UI pendukung: `PublicSection`, `PublicButton`, `PublicCard`, `SectionHeading`.
  - Perbaikan linting untuk karakter spesial (quotes).
  - Update `index.css` dengan utility pendukung (overlay, avatar-ring, dll).
- **Status**: Selesai.

---

## Batch 05.1: Fix CSS Circular Reference
- **Tanggal**: 2026-05-15
- **Tujuan**: Memperbaiki bug self-reference pada token CSS `--color-public-accent-hover`.
- **Pekerjaan**: Mengubah value token agar merujuk ke `--core-public-accent-hover`.
- **Status**: Selesai.

---

## Batch 06: Migration Phase - Full Public Pages (About, Services, etc) (Upcoming)
- **Tujuan**: Migrasi konten lengkap untuk halaman Tentang, Layanan, Paket, dan Kontak.
- **Rencana**: Memindahkan sisa halaman publik agar tidak ada lagi placeholder di sisi User.
