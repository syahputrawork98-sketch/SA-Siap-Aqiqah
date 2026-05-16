# API Partner Confirmation (Timeline 1)

Dokumen ini merinci alur konfirmasi mitra yang harus dilalui sebelum sebuah pesanan dapat berlanjut ke tahap pembayaran.

## Status Implementasi
- **Baseline DB**: Selesai (Batch 47).
- **Auto-matching**: Belum diimplementasikan (Masih manual input partnerId).

## Endpoint Baru
| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| `GET` | `/api/orders/:id/partner-confirmations` | Mengambil daftar konfirmasi mitra untuk suatu pesanan. |
| `POST` | `/api/orders/:id/partner-confirmations` | Menginisialisasi record konfirmasi untuk mitra-mitra yang dipilih. |
| `PATCH` | `/api/orders/:id/partner-confirmations/:confirmationId/status` | Mengubah status konfirmasi oleh mitra. |

## Alur Transisi Status Order
Status pesanan hanya akan berubah dari `PENDING_CONFIRMATION` menjadi `AWAITING_PAYMENT` jika dan hanya jika ketiga peran mitra berikut telah memberikan status `ACCEPTED`:
1. `MITRA_KANDANG`
2. `MITRA_CATERING`
3. `MITRA_KURIR`

Jika salah satu mitra menolak (`REJECTED`) atau meminta perubahan jadwal (`NEED_RESCHEDULE`), status pesanan tetap pada `PENDING_CONFIRMATION`.

## Contoh Payload POST (Inisialisasi)
```json
{
  "confirmations": [
    {
      "partnerId": "cm...kandang_id",
      "partnerRole": "MITRA_KANDANG"
    },
    {
      "partnerId": "cm...catering_id",
      "partnerRole": "MITRA_CATERING"
    },
    {
      "partnerId": "cm...kurir_id",
      "partnerRole": "MITRA_KURIR"
    }
  ]
}
```

## Contoh Payload PATCH (Update Status)
```json
{
  "status": "ACCEPTED",
  "notesPartner": "Stok hewan tersedia, siap diproses sesuai jadwal."
}
```

## Keterbatasan Saat Ini
- Pemilihan mitra masih dilakukan secara manual melalui ID (belum ada sistem auto-assign).
- Belum ada sistem notifikasi otomatis ke mitra saat record konfirmasi dibuat.
- Penggantian mitra yang menolak (`REJECTED`) masih harus dilakukan melalui inisialisasi ulang.

---
*Dokumentasi ini dibuat pada Batch 47.*
