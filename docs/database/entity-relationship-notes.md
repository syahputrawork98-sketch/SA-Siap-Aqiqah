# Entity Relationship Notes

Dokumen ini menjelaskan bagaimana entitas-entitas dalam sistem Siqah saling berinteraksi secara naratif.

## 1. Hubungan Pengguna (User-Centric)
- **Satu User, Satu Peran**: Setiap akun (`User`) hanya memiliki satu profil terkait, baik itu `ConsumerProfile` (sebagai pelanggan) atau `PartnerProfile` (sebagai mitra).
- **Relasi Profil**: 
  - `User` (role: user) -> `ConsumerProfile`
  - `User` (role: mitra_*) -> `PartnerProfile`
  - `User` (role: admin/superadmin) -> Tidak memerlukan profil tambahan untuk operasional dasar, namun terhubung ke log aktivitas.

## 2. Hubungan Pesanan (Order-Centric)
- **Konsumen & Pesanan**: Satu `ConsumerProfile` dapat melakukan banyak pemesanan (`Orders`) dari waktu ke waktu (One-to-Many).
- **Pesanan & Paket**: Setiap `Order` harus merujuk pada satu `Package` utama yang dipilih konsumen (Many-to-One).

## 3. Hubungan Operasional Mitra (Timeline 1)
- **Order & Partner Confirmation**: Satu `Order` melibatkan tiga konfirmasi wajib (Kandang, Catering, Kurir).
- **Pencarian Mitra**: Admin dapat mengirimkan permintaan konfirmasi ke beberapa mitra jika mitra sebelumnya menolak (`rejected`). Namun, pada akhirnya satu `Order` hanya memiliki satu mitra "Accepted" untuk masing-masing tipe mitra.

## 4. Hubungan Proses Fulfillment (Timeline 2)
- **Order & Timeline Events**: Satu `Order` memiliki serangkaian kejadian (`TimelineEvents`) yang mencatat progres dari penyembelihan hingga pengantaran.
- **Update Status**: Kejadian ini diupdate oleh Admin atau Mitra terkait (Kandang mengupdate penyembelihan, Catering mengupdate masakan, Kurir mengupdate pengantaran).

## 5. Hubungan Finansial
- **Order & Payments**: Satu `Order` dapat memiliki beberapa catatan pembayaran (`Payments`), misalnya satu untuk DP dan satu untuk Pelunasan.
- **Order & Payouts**: Setelah pesanan selesai (`delivered`), sistem menghitung kewajiban pembayaran (`Payouts`) ke ketiga mitra yang terlibat berdasarkan harga dasar yang disepakati.

## Ringkasan Kardinalitas (Draft)

| Dari | Ke | Kardinalitas | Penjelasan |
| --- | --- | --- | --- |
| User | ConsumerProfile | 1:1 | Satu akun konsumen satu profil. |
| User | PartnerProfile | 1:1 | Satu akun mitra satu profil bisnis. |
| Consumer | Order | 1:N | Satu konsumen bisa pesan berkali-kali. |
| Order | OrderItem | 1:N | Detail item hewan/menu dalam pesanan. |
| Order | PartnerConfirmation | 1:N | Histori konfirmasi ketersediaan mitra. |
| Order | Payment | 1:N | Histori pembayaran (DP & Pelunasan). |
| Order | TimelineEvent | 1:N | Histori progres fulfillment. |
| Order | Payout | 1:N | Pembayaran ke mitra-mitra yang terlibat. |

---
## Catatan [Butuh Keputusan Room Chat 00]
- **Multi-Catering**: Apakah satu pesanan bisa melibatkan lebih dari satu dapur catering (misal: pesanan sangat besar)? (Rencana: HOLD, saat ini diasumsikan 1 Order = 1 Catering).
- **Transfer Antar Mitra**: Bagaimana jika Kurir yang mengambil daging dari Kandang adalah kurir yang berbeda dengan pengantar ke Konsumen? (Rencana: HOLD, saat ini diasumsikan 1 Order = 1 Mitra Kurir).
