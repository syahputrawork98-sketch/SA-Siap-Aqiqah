# Migrasi API Order ke Prisma (Read-only)

Dokumen ini mencatat progres transisi modul Order dari penggunaan data mock (in-memory) ke database fisik (Prisma/PostgreSQL).

## Status Migrasi
- **Read-only**: Selesai (Batch 45).
- **Write/Create (Baseline)**: Selesai (Batch 46).
- **Fallback Mechanism**: Aktif (Hanya untuk READ).
- **Write Operation**: Tidak ada fallback (Gagal jika DB offline).

## Modul yang Terintegrasi
| Endpoint | Model Prisma Utama | Status | Fallback |
| --- | --- | --- | --- |
| `GET /api/orders/summary` | `Order` | DB-Aware | `mockData.ORDERS` summary |
| `GET /api/orders` | `Order` | DB-Aware | `mockData.ORDERS` list |
| `GET /api/orders/:id` | `Order` | DB-Aware | `mockData.ORDERS` find |
| `POST /api/orders` | `Order`, `OrderItem` | **Write Active** | **NONE** (Error if DB offline) |

## Fitur Create Order (Batch 46)
Sistem sekarang mendukung pembuatan pesanan baru yang disimpan langsung ke database Prisma.

**Logika Bisnis:**
- **Order Number**: Menggunakan pola `SIQ-YYYYMMDD-XXXX` (berdasarkan urutan harian).
- **Status Awal**: `PENDING_CONFIRMATION`.
- **Perhitungan Harga**: 
  - `totalAmount` dihitung dari akumulasi `quantity * priceAtOrder` pada `OrderItem`.
  - `dpAmount` dihitung berdasarkan `dp_pct` di `PlatformSetting` (default 50%).
- **Relasi**: Otomatis menghubungkan ke `ConsumerProfile` (via email/ID) dan `Package` (via slug/ID).

**Keamanan Operasi:**
- Operasi tulis (**POST**) tidak memiliki fallback ke mock data. Jika database offline, API akan mengembalikan status `503 Service Unavailable`.
- Menggunakan `prisma.$transaction` untuk memastikan integritas data antara `Order` dan `OrderItem`.

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
