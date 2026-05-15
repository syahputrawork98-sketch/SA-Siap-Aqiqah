# Project Handoff - SA-Siap-Aqiqah (Batch 25 Checkpoint)

## Status Project Saat Ini
Project saat ini berada pada tahap **Development Suite Candidate**. Fondasi Backend Express sudah aktif dan mulai diintegrasikan dengan Frontend Data Master.

### Capaian Batch 16 - 25:
- **Frontend**: Seluruh modul Backoffice (Data Master, User Management, Pembayaran Manual, Laporan, Notifikasi, Pengaturan) telah memiliki UI fungsional.
- **Backend**: Express.js aktif dengan rute Health Check dan Data Master API (Read-only, In-memory).
- **Integrasi**: Modul Hewan dan Kandang sudah mengambil data secara dinamis dari API Backend.
- **Environment**: Konfigurasi `.env` sudah tersedia untuk Client dan Server.

## Cara Menjalankan Project (Local Development)

### 1. Menjalankan Server
```bash
cd server
npm install
# Pastikan .env sudah ada (cek .env.example)
npm run dev
```
- Endpoint Health: `http://localhost:3001/api/health`
- Endpoint Data Master: `http://localhost:3001/api/data-master/summary`

### 2. Menjalankan Client
```bash
cd client
npm install
# Pastikan .env sudah ada (VITE_API_BASE_URL=http://localhost:3001/api)
npm run dev
```

## Prioritas Pengembangan Batch 26+
1. **Integrasi Lanjutan**: Menghubungkan modul Catering, Menu, dan Paket ke API Data Master.
2. **API Bisnis**: Membangun endpoint Read-only untuk modul Pesanan dan Pembayaran (In-memory).
3. **Database Planning**: Mulai merancang skema ERD/Prisma untuk transisi dari In-memory ke PostgreSQL (Batch 30+).

## Batasan Kritis (Scope Guard)
- **DILARANG** mengimplementasikan database fisik tanpa instruksi khusus.
- **DILARANG** mengimplementasikan Auth/JWT nyata (tetap gunakan persona switcher).
- **DILARANG** mengimplementasikan Payment Gateway nyata.
- **DILARANG** mengimplementasikan Cloud Storage untuk upload file.

---
*Dibuat oleh: Gemini 3 Flash pada Batch 25 Checkpoint.*
