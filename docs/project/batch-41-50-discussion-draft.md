# Draft Diskusi Rencana Batch 41 - 50

Dokumen ini merupakan draf usulan pengerjaan untuk fase berikutnya. Rencana ini belum bersifat final dan akan didiskusikan kembali di Room Chat 00.

## Visi Utama
Transisi dari sistem berbasis mock (In-memory) ke sistem berbasis database fisik (Prisma/PostgreSQL) dan pengaktifan modul operasional backoffice secara bertahap.

## Usulan Area Pengerjaan (Bertahap)

### 1. Inisialisasi Database (Fokus Batch 41-42)
- Menjalankan migrasi pertama (`npx prisma migrate dev`).
- Setup script seed data awal untuk Data Master (Paket, Layanan, Mitra).
- Sinkronisasi koneksi server ke database lokal.

### 2. Integrasi API Data Master (Fokus Batch 43-44)
- Mengubah controller Mitra (Kandang, Catering, Kurir) agar membaca dari DB.
- Mengubah controller Paket & Layanan agar membaca dari DB.
- Pengujian stabilitas data master.

### 3. Alur Pesanan & Konfirmasi (Fokus Batch 45-47)
- Implementasi penyimpanan Order baru ke DB.
- Pengaktifan modul Konfirmasi Mitra (Timeline 1) secara operasional.
- Integrasi status mitra (Accepted/Rejected) ke dalam record database.

### 4. Pembayaran & Timeline (Fokus Batch 48-49)
- Implementasi penyimpanan data Payment (DP/Full) dan verifikasi Admin.
- Pengaktifan modul Timeline Fulfillment (Timeline 2) secara operasional.
- Tracking status fulfillment oleh mitra di DB.

### 5. Checkpoint & Sinkronisasi (Batch 50)
- Audit stabilitas database.
- Sinkronisasi dokumentasi teknis.
- Persiapan fase selanjutnya (Auth Production / Cloud Storage).

## Opsi Strategis Diskusi
- **Opsi A**: Fokus pada stabilitas database master terlebih dahulu (lebih aman).
- **Opsi B**: Langsung mengaktifkan alur Order-to-Payment (lebih cepat melihat hasil operasional).
- **Opsi C**: Prioritas pada dashboard Admin untuk monitoring global.

## Keputusan Krusial Sebelum Lanjut
- Apakah database PostgreSQL akan di-host secara lokal atau menggunakan layanan cloud untuk tahap development?
- Apakah struktur `OrderNumber` perlu mengikuti pola tertentu (misal: SIQ-2026-XXXX)?
- Prioritas integrasi mitra: Apakah serentak (Kandang, Catering, Kurir) atau bertahap?

---
*Dokumen ini hanya digunakan sebagai bahan diskusi awal untuk Room Chat 00.*
