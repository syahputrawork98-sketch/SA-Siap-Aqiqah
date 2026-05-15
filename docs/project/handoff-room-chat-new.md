# Project Handoff - SA-Siap-Aqiqah (Batch 25 Fix Checkpoint)

## Visi Project
SA-Siap-Aqiqah ditargetkan menjadi sistem **Production-Ready** untuk manajemen operasional aqiqah. Status saat ini adalah checkpoint integrasi pada lingkungan pengembangan.

## Status Penting
- **Target Akhir**: Sistem produksi stabil dengan persistensi database.
- **Autentikasi**: Saat ini menggunakan **Developer Persona Switcher** sebagai alat pengujian internal (Internal Testing Tool). Auth produksi akan diimplementasikan kemudian.
- **Pembayaran**: Fokus pada alur **Transfer Manual** sebagai fitur produksi yang valid.
- **Integrasi**: API Data Master (Hewan & Kandang) sudah aktif dan digunakan secara dinamis oleh Frontend.

## Struktur Kerja (Batch 26+)
1. **Integrasi Lanjutan**: Hubungkan Catering, Menu, dan Paket ke API.
2. **API Operasional**: Bangun endpoint untuk alur Pesanan dan Pembayaran.
3. **Persiapan Database**: Mulai merancang skema ERD untuk transisi ke PostgreSQL.

## Batasan (Scope Guard)
- Jangan klaim sistem sudah siap produksi (Production-Ready). Sistem masih "dalam jalur menuju produksi" (Targeting Production-Ready).
- Jangan hapus Developer Persona Switcher; gunakan sebagai tool developer selama fase integrasi.
- Jangan implementasikan database fisik tanpa instruksi perancangan skema terlebih dahulu.

---
*Dibuat untuk menyelaraskan visi pengembangan menuju sistem produksi yang nyata.*
