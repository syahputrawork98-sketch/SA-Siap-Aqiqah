# Dokumentasi Alur Bisnis Siqah Aqiqah

Dokumentasi ini berisi blueprint alur operasional dan bisnis platform SA-Siap-Aqiqah (Siqah). Dokumen ini berfungsi sebagai panduan utama (Source of Truth) untuk implementasi fitur pada fase pengembangan selanjutnya.

## Daftar Dokumen Alur

1. **[Alur Pesanan Konsumen (Consumer Order Flow)](consumer-order-flow.md)**
   Menjelaskan langkah-langkah konsumen mulai dari pemilihan paket hingga pengiriman pesanan.

2. **[Alur Konfirmasi Mitra (Partner Confirmation Flow)](partner-confirmation-flow.md)**
   Menjelaskan proses "Timeline 1" di mana Admin memvalidasi ketersediaan mitra (Kandang, Catering, Kurir).

3. **[Alur Timeline Fulfillment (Fulfillment Timeline Flow)](fulfillment-timeline-flow.md)**
   Menjelaskan proses "Timeline 2" mulai dari pembayaran DP hingga pesanan selesai dikirim.

4. **[Alur Pembayaran & Payout (Payment & Payout Flow)](payment-and-payout-flow.md)**
   Menjelaskan mekanisme pembayaran DP/Pelunasan konsumen serta bagi hasil (payout) ke mitra.

5. **[Alur Kerja Admin & Superadmin (Admin & Superadmin Flow)](admin-superadmin-flow.md)**
   Menjelaskan pembagian peran operasional (Admin) dan manajerial/konfigurasi (Superadmin).

6. **[Matriks Status Sistem (Status Matrix)](status-matrix.md)**
   Tabel referensi untuk seluruh status (Order, Payment, Partner, Timeline).

## Hierarki Aktor

| Aktor | Peran Utama |
| --- | --- |
| **Konsumen** | Pemilik hajat aqiqah, pemberi instruksi pesanan. |
| **Admin** | Operator harian, jembatan antara konsumen dan mitra. |
| **Mitra Kandang** | Penyedia dan perawat hewan aqiqah/qurban. |
| **Mitra Catering** | Pengolah daging menjadi hidangan siap saji. |
| **Mitra Kurir** | Pengantar paket hidangan ke lokasi tujuan. |
| **Superadmin** | Pemilik platform, pengatur kebijakan biaya dan komisi. |

---
*Dokumentasi ini bersifat dinamis dan akan diperbarui sesuai keputusan bisnis di Room Chat 00.*
