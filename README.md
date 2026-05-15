# SA-Siap-Aqiqah

Project Sistem Informasi Manajemen Aqiqah (Siap Aqiqah) yang sedang dikembangkan sebagai evolusi dari project SIQAH Frontend.

## Status Saat Ini: Batch 10 (Frontend Migration Checkpoint)
Project telah menyelesaikan fase migrasi frontend tahap awal yang mencakup:
- Seluruh halaman publik (Home, Tentang, Layanan, Paket, Kontak).
- Fondasi layout Backoffice (Admin & Superadmin).
- Dashboard utama Admin & Superadmin (UI-only dengan mock data).

## Struktur Project
Project ini menggunakan struktur monorepo ringan:
- **`client/`**: Frontend aplikasi menggunakan React + Vite + Tailwind v4.
- **`server/`**: Backend aplikasi (saat ini masih berupa placeholder).
- **`docs/`**: Pusat dokumentasi aktif project.
  - `docs/project/`: Roadmap, status terkini, dan panduan workflow.
  - `docs/batches/`: Log histori pengerjaan setiap batch.

## Menjalankan Project (Local Development)
Untuk menjalankan frontend:
```bash
cd client
npm install
npm run dev
```

---
*Catatan: Segala rujukan teknis dan aturan kerja mengacu pada `docs/project/workflow.md`.*