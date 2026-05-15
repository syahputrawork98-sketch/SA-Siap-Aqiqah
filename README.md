# SA-Siap-Aqiqah

Project Sistem Informasi Manajemen Aqiqah (Siap Aqiqah) yang ditargetkan menjadi sebuah **Production-Ready System** dengan alur bisnis yang matang dan teruji.

## Status Saat Ini: Batch 25 Fix (Production-Ready Target Checkpoint)

Project sedang berada pada fase integrasi awal antara Frontend dan Backend Development API menuju sistem produksi yang lengkap.
- **Visi Utama**: Membangun sistem manajemen aqiqah yang siap pakai secara nyata.
- **Status Integrasi**: Data Master Hewan dan Kandang telah terhubung ke Backend Development API (Read-only).
- **Tool Internal**: **Developer Persona Switcher** tetap dipertahankan sebagai alat pengujian internal/developer untuk mensimulasikan role sebelum sistem autentikasi produksi (Auth) diimplementasikan.
- **Metode Pembayaran**: Fokus pada **Transfer Manual** (Rekening & Upload Bukti) sebagai jalur pembayaran produksi yang valid dan legal.

## Struktur Project

- **`client/`**: Frontend React + Vite + Tailwind v4 + DaisyUI.
- **`server/`**: Backend Express.js (Development Mode, In-memory Data).
- **`docs/`**: Pusat dokumentasi aktif (Roadmap, Status, Batches).

## Cara Menjalankan Project (Local Development)

### 1. Menjalankan Backend (Server)
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### 2. Menjalankan Frontend (Client)
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

---
*Catatan: SA-Siap-Aqiqah ditargetkan menjadi sistem production-ready. Pada fase saat ini, project masih berada pada checkpoint integrasi development. Developer Persona Switcher adalah alat internal testing, bukan pengganti autentikasi produksi final.*