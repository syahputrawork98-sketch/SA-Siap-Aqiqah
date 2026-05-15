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

## Batch 03: Migration Phase - App Shell & Base Layout (Upcoming)
- **Tujuan**: Migrasi struktur layout utama (Shell) dari SIQAH Frontend.
- **Rencana**: Setup Router, Sidebar, dan Topbar dasar.
