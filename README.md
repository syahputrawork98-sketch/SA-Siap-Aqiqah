# SA-Siap-Aqiqah

Project Sistem Informasi Manajemen Aqiqah (Siap Aqiqah) yang sedang dikembangkan sebagai evolusi dari project SIQAH Frontend.

## Status Saat Ini: Batch 15 (Handoff Checkpoint)
Project telah menyelesaikan fase migrasi operasional admin tahap awal yang mencakup:
- Seluruh halaman publik (Home, Tentang, Layanan, Paket, Kontak).
- Fondasi layout Backoffice (Admin & Superadmin).
- Dashboard Utama & Dashboard Data Master (Visual).
- Halaman Operasional Admin (Pesanan, Detail, Pembayaran) secara visual dan mock logic.

## Struktur Project
Project ini menggunakan struktur monorepo ringan:
- **`client/`**: Frontend aplikasi menggunakan React + Vite + Tailwind v4.
- **`server/`**: Backend aplikasi (saat ini masih berupa placeholder).
- **`docs/`**: Pusat dokumentasi aktif project.
  - `docs/project/`: Roadmap, status terkini, handoff, dan panduan workflow.
  - `docs/batches/`: Log histori pengerjaan per batch.

## Menjalankan Project (Local Development)
Untuk menjalankan frontend:
```bash
cd client
npm install
npm run dev
```

---
*Catatan: Status terakhir adalah Batch 15 Checkpoint. Transisi ke pengembangan fitur data master detail atau inisiasi backend akan dilakukan di sesi berikutnya.*