# Migrasi API Payment ke Prisma (Manual Baseline)

Dokumen ini mencatat proses integrasi modul Pembayaran ke database Prisma, dengan fokus pada verifikasi manual.

## Status Migrasi
- **Read-only**: Selesai (Batch 48).
- **Write/Create (Manual)**: Selesai (Batch 48).
- **Fallback Mechanism**: Aktif untuk operasi baca (**GET**).
- **Payment Gateway**: **HOLD** (Belum diimplementasikan).
- **Cloud Storage**: **HOLD** (Belum diimplementasikan, bukti bayar masih berupa placeholder URL).

## Modul yang Terintegrasi
| Endpoint | Model Prisma Utama | Status | Fallback |
| --- | --- | --- | --- |
| `GET /api/payments/summary` | `Payment` | DB-Aware | `mockData.PAYMENTS` summary |
| `GET /api/payments` | `Payment` | DB-Aware | `mockData.PAYMENTS` list |
| `GET /api/payments/:id` | `Payment` | DB-Aware | `mockData.PAYMENTS` find |
| `POST /api/payments` | `Payment` | **Write Active** | **NONE** (Error if DB offline) |
| `PATCH /api/payments/:id/verify` | `Payment`, `Order` | **Write Active** | **NONE** (Error if DB offline) |
| `PATCH /api/payments/:id/reject` | `Payment` | **Write Active** | **NONE** (Error if DB offline) |

## Alur Pembayaran Manual (Batch 48)

### 1. Pencatatan Pembayaran (`POST`)
Menerima data pembayaran manual (misal: konfirmasi via WhatsApp).
- `type`: `DP`, `FULL`, atau `REMAINING`.
- `status` awal: `PENDING_VERIFICATION`.

### 2. Verifikasi Admin (`PATCH .../verify`)
Admin memvalidasi mutasi bank secara manual.
- Jika `type` = `DP` diverifikasi -> Status Payment menjadi `PAID_DP`.
- Jika `type` = `FULL` atau `REMAINING` diverifikasi -> Status Payment menjadi `PAID_FULL`.
- **Transisi Status Order**: Jika status pesanan adalah `AWAITING_PAYMENT` dan pembayaran `DP` diverifikasi, maka status pesanan otomatis berubah menjadi **`PROCESSING`**.

### 3. Penolakan Admin (`PATCH .../reject`)
Admin menolak bukti bayar (misal: nominal tidak sesuai).
- Status Payment menjadi `REJECTED`.
- Status pesanan **tidak berubah**.

## Contoh Payload POST (Create Payment)
```json
{
  "orderId": "SIQ-20260516-0001",
  "type": "DP",
  "amount": 1000000,
  "proofImageUrl": "https://placehold.co/400x600?text=Bukti+Manual",
  "adminNote": "Bukti diterima via CS"
}
```

## Keterbatasan Saat Ini
- Belum ada integrasi dengan layanan penyimpanan gambar (Cloudinary/S3).
- Belum ada audit trail untuk siapa admin yang memverifikasi (masih bersifat anonim/global admin).
- Belum ada pembuatan record `TimelineEvent` saat status pesanan berubah menjadi `PROCESSING`.

---
*Dokumentasi ini dibuat pada Batch 48.*
