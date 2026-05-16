# Alur Kerja Admin & Superadmin (Admin & Superadmin Flow)

Dokumen ini membedakan tanggung jawab antara tim operasional harian (Admin) dan pengambil kebijakan sistem (Superadmin).

## 1. Peran Admin (Operasional)
Admin bertanggung jawab atas kelancaran setiap pesanan yang masuk:
- **Manajemen Pesanan**: Memvalidasi data pesanan, menghubungi mitra untuk konfirmasi ketersediaan.
- **Validasi Pembayaran**: Mengecek mutasi bank manual dan mencocokkan dengan bukti transfer yang diunggah konsumen.
- **Kontrol Timeline**: Mengupdate progres pengerjaan di sistem agar konsumen mendapatkan update real-time.
- **Penanganan Masalah**: Menghubungi konsumen jika terjadi kendala pada mitra atau jadwal.

## 2. Peran Superadmin (Manajerial)
Superadmin berfokus pada kesehatan bisnis dan konfigurasi sistem:
- **Konfigurasi Global**: Menentukan persentase DP, margin platform, dan aturan pajak/fee lainnya.
- **Manajemen Mitra**: Menyetujui pendaftaran mitra baru (Kandang/Catering/Kurir) dan memantau performa mereka.
- **Laporan & Audit**: Melihat total transaksi, keuntungan platform, dan kewajiban pembayaran (payout) ke mitra.
- **Override**: Melakukan intervensi pada data jika terjadi kesalahan input oleh Admin.

## 3. Alokasi Keuntungan (Profit Split)
Sistem secara otomatis menghitung:
- `Total Bayar Konsumen` - `(HPP Mitra Kandang + HPP Mitra Catering + Ongkir Kurir)` = `Profit Platform`.

## 4. Keamanan & Akses
- Admin tidak memiliki akses untuk mengubah konfigurasi margin platform.
- Superadmin memiliki visibilitas penuh ke seluruh data tanpa batasan.

## Batasan & HOLD
- [Butuh Keputusan Room Chat 00]: Apakah Admin diperbolehkan mengedit harga pesanan setelah dibuat oleh konsumen?
- [Butuh Keputusan Room Chat 00]: Apakah diperlukan fitur chat internal antara Admin dan Mitra di dalam sistem?
