# SA-Siap-Aqiqah

Project Sistem Informasi Manajemen Aqiqah (Siap Aqiqah) yang dikembangkan sebagai evolusi dari project SIQAH Frontend menjadi sebuah **Production-minded Development Suite**.

## Status Saat Ini: Batch 25 (Development Suite Checkpoint)

Project telah mencapai fase integrasi awal antara Frontend dan Backend Development API. Status ringkas:
- **Public Website**: Selesai.
- **Backoffice UI**: Selesai untuk Admin & Superadmin (Pesanan, Pembayaran, Laporan, Notifikasi, Pengaturan).
- **Data Master**: UI Selesai. Integrasi API aktif untuk Hewan dan Kandang.
- **Backend Foundation**: Express.js aktif dengan rute health check dan Data Master API (Read-only, In-memory).
- **Pembayaran Manual**: UI instruksi rekening dan upload preview selesai (Frontend-only).

## Struktur Project

- **`client/`**: Frontend React + Vite + Tailwind v4 + DaisyUI.
- **`server/`**: Backend Express.js (Development Mode, In-memory Data).
- **`docs/`**: Dokumentasi aktif (Roadmap, Status, Batches).

## Cara Menjalankan Project (Local Development)

### 1. Menjalankan Backend (Server)
```bash
cd server
npm install
cp .env.example .env
npm run dev # atau npm run start
```
*Port default: 3001*

### 2. Menjalankan Frontend (Client)
```bash
cd client
npm install
cp .env.example .env
npm run dev
```
*Pastikan VITE_API_BASE_URL di .env mengarah ke port server (default: http://localhost:3001/api)*

---
*Catatan: Project saat ini adalah Development Suite. Fitur database, otentikasi produksi, dan payment gateway masih dalam status HOLD.*