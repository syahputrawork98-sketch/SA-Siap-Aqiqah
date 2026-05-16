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

## Fase 5: Hardening & Production Launch (Batch 31+) - ACTIVE FOCUS
Membangun sistem yang benar-benar siap pakai secara nyata.

- **Batch 31-36**: **Backoffice Polish & Persona Expansion** - Perbaikan UI publik dan perluasan sistem testing Developer Persona (6 Role).
- **Batch 37**: **Business Flow Blueprint** - Dokumentasi alur bisnis end-to-end (Consumer, Partner, Payment, Fulfillment). (SELESAI)
- **Batch 38**: **Database Contract Mapping** - Pemetaan entitas, relasi, dan enum data berdasarkan alur bisnis. (SELESAI)
- **Batch 39**: **Prisma Schema Baseline** - Implementasi draft skema Prisma berdasarkan kontrak data. (SELESAI)
- **Batch 40**: **Documentation Checkpoint** - Sinkronisasi perencanaan data dan persiapan rencana Batch 41-50. (SELESAI)
- **Batch 41**: **Database Local Initialization** - Setup Prisma, environment, dan validasi skema lokal. (SELESAI)
- **Batch 42**: **Seed Data Baseline** - Implementasi script seed data untuk persona dev dan data master. (SELESAI)
- **Batch 43**: **Seed Modularization** - Refactor script seed menjadi modular per tabel dan dokumentasi detail. (SELESAI)
- **Batch 44**: **API Data Master Migration** - Integrasi read-only modul data master ke Prisma dengan guarded fallback. (SELESAI)
- **Batch 45**: **Order API Read-only** - Integrasi read-only modul Order ke Prisma dengan guarded fallback. (SELESAI)
- **Batch 46**: **Order Creation Write** - Implementasi penulisan pesanan baru ke model Order dan OrderItem. (SELESAI)
- **Batch 47**: **Partner Confirmation Baseline** - Implementasi alur konfirmasi mitra dan transisi status order. (SELESAI)
- **Batch 48**: **Manual Payment Verification** - Implementasi pencatatan dan verifikasi pembayaran manual oleh admin. (SELESAI)
- **Batch 49-50**: **Fulfillment Timeline** - Implementasi alur fulfillment (Timeline 2) dan penyelesaian transaksional. (NEXT FOCUS)
- **Otentikasi Produksi**: Implementasi Auth, JWT, dan RBAC nyata bagi User/Mitra.
- **Storage Produksi**: Implementasi Server/Cloud Storage untuk bukti transfer.
- **Audit & Logging**: Implementasi Audit Trail untuk transaksi finansial.
- **Deployment**: Hardening infrastruktur dan peluncuran produksi.
