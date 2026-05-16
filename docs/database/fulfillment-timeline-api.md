# API Fulfillment Timeline (Timeline 2)

Dokumen ini merinci alur pencatatan progres fulfillment (penyelesaian) pesanan setelah pesanan masuk ke tahap `PROCESSING`.

## Status Implementasi
- **Baseline DB**: Selesai (Batch 49).
- **Realtime Update**: **HOLD** (Belum ada WebSocket/Push Notif).
- **Cloud Storage**: **HOLD** (Bukti foto masih berupa placeholder URL).

## Endpoint Baru
| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| `GET` | `/api/orders/:id/timeline-events` | Mengambil daftar event fulfillment (mendukung filter `visibility`). |
| `POST` | `/api/orders/:id/timeline-events` | Membuat record event baru (hanya jika Order >= `PROCESSING`). |
| `PATCH` | `/api/orders/:id/timeline-events/:eventId/status` | Memperbarui status penyelesaian event. |
| `PATCH` | `/api/orders/:id/timeline-events/:eventId/visibility` | Mengubah visibilitas event (INTERNAL/PUBLISHED). |

## Baseline Event Keys
Berikut adalah daftar key event yang disarankan untuk menjaga konsistensi data:
- `ORDER_PROCESSING_STARTED`
- `ANIMAL_PREPARED`
- `SLAUGHTER_SCHEDULED`
- `SLAUGHTER_COMPLETED`
- `MEAT_SENT_TO_CATERING`
- `COOKING_STARTED`
- `COOKING_COMPLETED`
- `READY_FOR_DELIVERY`
- `COURIER_PICKUP`
- `DELIVERED`
- `COMPLETED`

## Alur Transisi Status Order
Status pesanan dapat berubah secara otomatis saat event tertentu ditandai sebagai `DONE`:
1. `COURIER_PICKUP` + `DONE` -> Order Status: **`ON_DELIVERY`**
2. `DELIVERED` + `DONE` -> Order Status: **`DELIVERED`**
3. `COMPLETED` + `DONE` -> Order Status: **`COMPLETED`**

## Visibilitas Event
- **INTERNAL**: Hanya dapat dilihat oleh Admin dan Mitra terkait.
- **PUBLISHED**: Dapat dilihat oleh Konsumen pada dashboard pelacakan mereka.

## Contoh Payload POST (Create Event)
```json
{
  "eventKey": "SLAUGHTER_COMPLETED",
  "title": "Penyembelihan Selesai",
  "description": "Hewan telah disembelih sesuai syariat dan sedang dibersihkan.",
  "status": "DONE",
  "visibility": "PUBLISHED",
  "updatedBy": "MITRA_KANDANG"
}
```

## Keterbatasan Saat Ini
- `proofImageUrl` masih menggunakan manual string URL (placeholder).
- Belum ada validasi urutan event (misal: penyembelihan harus sebelum pengiriman).
- Payout mitra belum dipicu secara otomatis saat status `COMPLETED`.

---
*Dokumentasi ini dibuat pada Batch 49.*
