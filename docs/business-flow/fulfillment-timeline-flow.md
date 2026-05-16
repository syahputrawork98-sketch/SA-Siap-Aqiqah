# Alur Timeline Fulfillment (Fulfillment Timeline Flow)

Dokumen ini menjelaskan alur "Timeline 2", yaitu proses eksekusi pesanan dari awal pembayaran hingga hidangan sampai ke tangan konsumen.

## 1. Aktivasi Timeline 2
Timeline 2 dimulai setelah status pesanan menjadi `confirmed` dan pembayaran DP diverifikasi oleh Admin.

## 2. Visibilitas Timeline
Timeline ini dapat dipantau secara real-time oleh:
- **Konsumen**: Melihat progres ibadah aqiqahnya.
- **Admin**: Memantau seluruh operasional.
- **Mitra**: Melihat tugas spesifik yang harus mereka kerjakan.

## 3. Tahapan Operasional (Standard)

| Tahap | Penjelasan | Aktor Utama |
| --- | --- | --- |
| **Order Confirmed** | Pesanan disetujui, mitra terkunci. | Admin |
| **Payment DP Verified** | DP diterima, persiapan dimulai. | Admin |
| **Animal Prepared** | Hewan dipisahkan dan disiapkan di kandang. | Mitra Kandang |
| **Slaughter Scheduled** | Waktu penyembelihan ditetapkan. | Admin / Kandang |
| **Slaughter Completed** | Hewan disembelih sesuai syariat. | Mitra Kandang |
| **Meat Sent to Catering** | Daging dikirim ke dapur catering. | Mitra Kandang / Kurir |
| **Cooking/Processing** | Daging diolah menjadi menu pilihan. | Mitra Catering |
| **Ready for Delivery** | Makanan sudah dikemas dalam box/paket. | Mitra Catering |
| **Courier Pickup** | Kurir mengambil paket dari catering. | Mitra Kurir |
| **Delivered** | Paket diterima oleh Konsumen. | Mitra Kurir |
| **Completed** | Pesanan selesai secara sistem (Pelunasan ok). | Admin |

## 4. Kontrol Admin
Admin memiliki kewenangan untuk:
- Mengupdate status tiap tahap jika mitra lupa/mengalami kendala teknis.
- Mengatur tahap mana yang "Published" (terlihat oleh konsumen) dan mana yang "Internal" (hanya tim operasional).

## Batasan & HOLD
- [Butuh Keputusan Room Chat 00]: Apakah diperlukan dokumentasi foto/video penyembelihan untuk setiap pesanan? (Rencana: Disematkan di timeline).
- [Butuh Keputusan Room Chat 00]: Mekanisme pelunasan (sebelum delivery atau saat delivery/COD).
