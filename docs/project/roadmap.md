# Roadmap SA-Siap-Aqiqah

## Fase 1 & 2: Migrasi & Operasional UI (Batch 1 - 15) - SELESAI
Membangun fondasi UI dan alur bisnis operasional secara visual.

## Fase 3: Integrasi API & Development Checkpoint (Batch 16 - 25) - SELESAI
Fokus pada penghubungan Frontend ke Backend Development API.

- **Batch 21-23**: Inisiasi Backend API (Data Master).
- **Batch 24**: Integrasi API Hewan & Kandang.
- **Batch 25 Fix**: Checkpoint Keselarasan Visi Production-Ready.

## Fase 4: Integrasi Bisnis & Persiapan Persistensi (Batch 26 - 30) - NEXT FOCUS
Menghubungkan seluruh modul operasional ke API dan merancang persistensi data.

- **Batch 26**: Integrasi API Catering, Menu, dan Paket.
- **Batch 27**: Development API Pesanan dan Pembayaran Manual.
- **Batch 28**: Integrasi Frontend Pesanan/Pembayaran ke API.
- **Batch 29**: Perencanaan Database Schema & Migrasi Draft (Prisma/Postgres).
- **Batch 30**: **Production Readiness Audit** - Evaluasi kelayakan transisi ke database fisik.

## Fase 5: Hardening & Production Launch (Batch 31+) - FUTURE FOCUS
Membangun sistem yang benar-benar siap pakai secara nyata.

- **Batch 31**: **API Contract Normalization** - Standarisasi seluruh field API (English naming) sebelum masuk ke database fisik.
- **Batch 32-35**: **Persistensi Data** - Implementasi Database fisik (PostgreSQL) menggunakan Prisma ORM.
- **Otentikasi Produksi**: Implementasi Auth, JWT, dan RBAC nyata bagi User/Mitra.
- **Storage Produksi**: Implementasi Server/Cloud Storage untuk bukti transfer.
- **Audit & Logging**: Implementasi Audit Trail untuk transaksi finansial.
- **Deployment**: Hardening infrastruktur dan peluncuran produksi.
