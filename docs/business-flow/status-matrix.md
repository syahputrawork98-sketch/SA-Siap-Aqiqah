# Matriks Status Sistem (Status Matrix)

Tabel di bawah ini merangkum seluruh status utama yang digunakan dalam platform Siqah untuk menjaga konsistensi data.

## 1. Status Pesanan (Order Status)

| Status | Arti | Aktor Utama |
| --- | --- | --- |
| `draft` | Pesanan baru dibuat, belum dikirim. | Konsumen |
| `pending_confirmation` | Pesanan dikirim, menunggu verifikasi Admin/Mitra. | Admin |
| `confirmed` | Seluruh mitra sudah OK, siap dibayar. | Admin |
| `awaiting_payment` | Menunggu pembayaran DP dari konsumen. | Konsumen |
| `processing` | Pembayaran DP OK, sedang dalam pengerjaan (Timeline 2). | Admin / Mitra |
| `on_delivery` | Hidangan sedang dikantar oleh kurir. | Mitra Kurir |
| `delivered` | Paket sudah sampai di tangan konsumen. | Mitra Kurir |
| `completed` | Pesanan selesai (Pelunasan OK, Ibadah Selesai). | Admin |
| `cancelled` | Pesanan dibatalkan (oleh Admin/Konsumen). | Admin |

## 2. Status Konfirmasi Mitra (Partner Confirmation Status)

| Status | Arti | Aktor Utama |
| --- | --- | --- |
| `pending` | Menunggu respon mitra. | Mitra |
| `accepted` | Mitra bersedia. | Mitra |
| `rejected` | Mitra tidak bisa (Stok/Waktu tidak cocok). | Mitra |
| `need_reschedule` | Mitra bisa tapi minta geser waktu. | Mitra |

## 3. Status Pembayaran (Payment Status)

| Status | Arti | Aktor Utama |
| --- | --- | --- |
| `unpaid` | Belum ada pembayaran masuk. | Konsumen |
| `pending_verification` | Bukti transfer sudah diunggah, menunggu cek Admin. | Admin |
| `paid_dp` | DP sudah lunas dan terverifikasi. | Admin |
| `paid_full` | Pesanan sudah lunas sepenuhnya. | Admin |
| `rejected` | Bukti transfer tidak valid/palsu. | Admin |

## 4. Status Fulfillment (Operasional)

| Status | Arti | Aktor Utama |
| --- | --- | --- |
| `waiting` | Menunggu gilirian pengerjaan. | Mitra |
| `in_progress` | Sedang dikerjakan (Penyembelihan/Masak). | Mitra |
| `done` | Selesai dikerjakan di tahap tersebut. | Mitra |
| `issue` | Ada kendala di lapangan (Sakit/Kecelakaan). | Mitra |

## 5. Visibilitas Timeline (Timeline Visibility)

| Status | Arti |
| --- | --- |
| `internal` | Hanya terlihat oleh Admin dan Mitra terkait. |
| `published` | Terlihat oleh Konsumen sebagai update progres. |

---
*Status-status di atas akan diimplementasikan sebagai konstanta/enum di dalam aplikasi.*
