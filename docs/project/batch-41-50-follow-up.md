# Batch 41–50 Technical Follow-up & Gap List

Daftar ini mencatat hal-berikut yang perlu diperhatikan atau diperbaiki setelah siklus integrasi database Batch 41–50.

## 1. Follow-up Teknis (Minor/Bugfix)
- **Konsistensi Fallback**: Memastikan seluruh endpoint READ (seperti PartnerConfirmation dan TimelineEvent) memiliki perilaku fallback yang seragam jika database offline (saat ini sudah sebagian besar).
- **Validasi Enum**: Menambahkan validasi skema (Zod/Joi) atau pengecekan manual yang lebih ketat pada `Payment.type` (DP, FULL, REMAINING) dan `TimelineEvent.status`.
- **Query Visibility**: Memastikan filter `visibility=PUBLISHED` pada TimelineEvent benar-benar berfungsi di level database untuk endpoint publik.
- **Route Ordering**: Melakukan review pada file `order.routes.js` untuk memastikan rute statis (seperti `/summary`) tidak terbentur dengan rute dinamis (seperti `/:id`).

## 2. Follow-up Produk & Alur Bisnis
- **Payout & Settlement**: Merancang alur pembagian dana ke mitra (Kandang, Catering, Kurir) setelah status pesanan `COMPLETED`.
- **Audit Trail**: Implementasi pencatatan "siapa melakukan apa" pada perubahan status pesanan dan pembayaran (saat ini `updatedBy` masih bersifat placeholder).
- **Refund Flow**: Merancang alur pengembalian dana jika pesanan dibatalkan setelah pembayaran diverifikasi.
- **Invoice Generation**: Implementasi pembuatan dokumen PDF atau tampilan faktur resmi (HOLD).

## 3. Gap Kesiapan UI
- **Admin Dashboard**: Perlu pembaruan UI untuk mendukung operasi tulis (Verify Payment, Create Timeline Event, Assign Partner).
- **Partner Dashboard**: Perlu UI khusus mitra untuk memberikan konfirmasi dan update progres fulfillment.
- **Consumer Pelacakan**: Sinkronisasi tampilan "Progress Bar" di sisi konsumen dengan data `TimelineEvent` dari database.

## 4. Status "Hold" Permanen (Batch Ini)
- **Auth Production**: Tetap menggunakan Developer Persona.
- **Payment Gateway**: Tetap manual transfer.
- **Cloud Storage**: Tetap menggunakan placeholder URL.

---
*Follow-up ini menjadi input bagi perencanaan Batch 51–60.*
