# Alur Konfirmasi Mitra (Partner Confirmation Flow)

Dokumen ini menjelaskan alur "Timeline 1" (Pre-Agreement), yaitu tahap krusial di mana Admin memastikan ketersediaan seluruh sumber daya mitra sebelum pesanan benar-benar diproses.

## 1. Notifikasi Pesanan Baru
Setiap ada pesanan masuk, Admin menerima notifikasi dan melakukan pemeriksaan awal terhadap detail pesanan (kelayakan jadwal dan alamat).

## 2. Permintaan Konfirmasi Mitra
Admin secara paralel atau berurutan mengirimkan permintaan ketersediaan kepada:
- **Mitra Kandang**: Apakah hewan yang dipilih tersedia dan siap pada jadwal tersebut?
- **Mitra Catering**: Apakah kapasitas dapur tersedia untuk mengolah pesanan tersebut?
- **Mitra Kurir**: Apakah ada kurir yang tersedia untuk mengantar pada slot waktu tersebut?

## 3. Status Konfirmasi Mitra
Setiap mitra akan memberikan respon melalui dashboard mereka masing-masing dengan status:
- `pending_confirmation`: Menunggu respon mitra.
- `accepted`: Mitra bersedia menjalankan tugas.
- `rejected`: Mitra tidak bersedia (misal: stok habis atau kapasitas penuh).
- `need_reschedule`: Mitra bersedia tapi meminta perubahan waktu.

## 4. Penanganan Rejeksi & Reschedule
- **Jika Mitra Reject**: Admin harus mencari mitra pengganti (Manual override) untuk peran yang sama.
- **Jika Need Reschedule**: Admin menghubungi konsumen untuk menawarkan perubahan jadwal.

## 5. Finalisasi Timeline 1
Pesanan hanya dapat berlanjut ke tahap pembayaran jika:
- Status Mitra Kandang = `accepted`.
- Status Mitra Catering = `accepted`.
- Status Mitra Kurir = `accepted`.

Setelah semua `accepted`, Admin mengubah status pesanan menjadi `confirmed_ready_to_pay`.

## Batasan & HOLD
- Saat ini pencarian mitra pengganti masih dilakukan secara manual oleh Admin.
- [Butuh Keputusan Room Chat 00]: Apakah ada penalti bagi mitra yang sering menolak (reject) pesanan yang sudah masuk?
