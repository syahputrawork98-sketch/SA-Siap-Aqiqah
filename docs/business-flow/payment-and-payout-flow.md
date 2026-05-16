# Alur Pembayaran & Payout (Payment & Payout Flow)

Dokumen ini menjelaskan aliran uang dalam sistem Siqah, mulai dari pembayaran konsumen hingga distribusi dana ke mitra.

## 1. Pembayaran Konsumen
Sistem menggunakan metode **Down Payment (DP)** dan **Pelunasan**:
- **DP**: Persentase dapat dikonfigurasi (Default: 40% - 50%).
- **Metode**: Transfer manual (Bank BCA/Mandiri/Lainnya).
- **Proses**: Konsumen mengunggah bukti transfer -> Admin melakukan verifikasi manual -> Status berubah menjadi `paid_dp`.

## 2. Pelunasan
- Konsumen harus melunasi sisa tagihan sebelum pesanan selesai diproses atau dikirim (Sesuai kebijakan Admin).
- Bukti pelunasan diunggah dan diverifikasi dengan cara yang sama.

## 3. Komisi Platform & Harga Paket
- **Superadmin** menentukan margin atau komisi platform per transaksi (Misal: 5% - 20%).
- Harga yang tampil di konsumen adalah `Harga Dasar Mitra + Margin Platform`.

## 4. Alur Payout (Bagi Hasil) ke Mitra
Dana akan didistribusikan ke mitra (Kandang, Catering, Kurir) setelah tugas mereka selesai tervalidasi:
- **Kandang Payout**: Setelah konfirmasi penyembelihan selesai.
- **Catering Payout**: Setelah paket siap dikirim/diambil.
- **Kurir Payout**: Setelah status pesanan menjadi `delivered`.

## 5. Mekanisme Payout
- Saat ini payout dilakukan secara manual oleh Admin/Superadmin melalui pencatatan sistem (Sistem menghitung tagihan mitra, transfer dilakukan manual di luar sistem).
- [HOLD]: Payout otomatis via Payment Gateway API.

## Batasan & HOLD
- [Butuh Keputusan Room Chat 00]: Apakah biaya pengiriman (ongkir) seluruhnya masuk ke Kurir atau dipotong platform?
- [Butuh Keputusan Room Chat 00]: Prosedur pengembalian dana (Refund) jika mitra membatalkan di tengah jalan.
