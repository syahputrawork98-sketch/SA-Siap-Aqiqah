# Alur Pesanan Konsumen (Consumer Order Flow)

Dokumen ini menjelaskan alur perjalanan konsumen (User) dalam melakukan pemesanan layanan aqiqah di platform Siqah.

## 1. Pemilihan Paket & Layanan
Konsumen memulai dengan menjelajahi halaman publik (Landing Page, Layanan, Paket):
- Memilih kategori paket (Hemat, Premium, dll).
- Memilih jenis layanan (Aqiqah Laki-laki, Aqiqah Perempuan, atau Qurban).

## 2. Kustomisasi Pesanan
Konsumen mengisi formulir detail pesanan yang mencakup:
- **Hewan/Kandang**: Memilih jenis hewan dan lokasi kandang (bila tersedia pilihan mitra kandang).
- **Catering/Menu**: Memilih paket olahan daging (jenis masakan, jumlah porsi, dll).
- **Jadwal**: Menentukan tanggal dan waktu pelaksanaan aqiqah/pengiriman.
- **Lokasi**: Memasukkan alamat lengkap pengantaran.

## 3. Pengiriman Pesanan
- Konsumen meninjau (review) ringkasan pesanan.
- Konsumen mengirimkan pesanan ke sistem.
- **Status Awal**: `pending_initial_confirmation`.

## 4. Timeline 1: Konfirmasi Ketersediaan
Setelah pesanan masuk, konsumen akan melihat **Timeline 1**:
- Pesanan sedang diverifikasi oleh Admin.
- Admin melakukan pengecekan ketersediaan ke Mitra Kandang, Catering, dan Kurir.
- Konsumen menunggu hingga semua mitra yang dibutuhkan memberikan konfirmasi `accepted`.

## 5. Timeline 2: Proses Utama (Fulfillment)
Jika semua mitra telah dikonfirmasi dan Admin menyetujui pesanan:
- Pesanan berubah status menjadi `awaiting_payment`.
- Konsumen diminta melakukan pembayaran DP (Down Payment).
- Setelah DP diverifikasi, pesanan masuk ke fase eksekusi (slaughter, cooking, delivery).

## Batasan & HOLD
- Pembayaran saat ini dilakukan secara transfer manual (HOLD: Payment Gateway).
- Komunikasi detail seringkali masih dibantu via WhatsApp sebagai fallback.
- [Butuh Keputusan Room Chat 00]: Batas waktu pembatalan pesanan oleh konsumen setelah mitra dikonfirmasi.
