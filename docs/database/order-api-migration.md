# Migrasi API Order ke Prisma (Read-only)

Dokumen ini mencatat progres transisi modul Order dari penggunaan data mock (in-memory) ke database fisik (Prisma/PostgreSQL).

## Status Migrasi
- **Read-only**: Selesai (Batch 45).
- **Write/Create**: Belum diimplementasikan (Direncanakan Batch 46).
- **Fallback Mechanism**: Aktif.

## Modul yang Terintegrasi
| Endpoint | Model Prisma Utama | Status | Fallback |
| --- | --- | --- | --- |
| `GET /api/orders/summary` | `Order` | DB-Aware | `mockData.ORDERS` summary |
| `GET /api/orders` | `Order` | DB-Aware | `mockData.ORDERS` list |
| `GET /api/orders/:id` | `Order` | DB-Aware | `mockData.ORDERS` find |

## Mekanisme Guarded Fallback
Sama seperti modul Data Master, modul Order menggunakan helper `tryDB` untuk memastikan server tidak crash jika database belum aktif di environment lokal.

**Detail Mapping:**
- `orderNumber` diprioritaskan sebagai ID untuk kompatibilitas frontend (format `ORD-XXXXX`).
- Relasi `consumer`, `package`, `payments`, dan `timelineEvents` disertakan dalam query detail.
- Enum status dipetakan ke label UI yang sudah ada (misal: `AWAITING_PAYMENT` -> `Menunggu Pembayaran`).

## Keterbatasan Saat Ini
- Karena belum ada fitur *create order* yang menulis ke DB, daftar pesanan di database kemungkinan besar masih kosong kecuali jika diisi manual atau melalui seed di masa depan.
- Data `timelineEvents` dipetakan ke array `progress` di frontend.

---
*Dokumentasi ini dibuat pada Batch 45.*
