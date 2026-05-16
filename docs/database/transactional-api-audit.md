# Transactional API & Database Audit (Batch 50)

Audit ini merangkum cakupan integrasi teknis antara API Server dan Database Prisma pada akhir Batch 50.

## 1. Cakupan Endpoint DB-Aware

### Modul Data Master (Read-only + Fallback)
| Endpoint | Model Prisma | Fallback | Status |
| --- | --- | --- | --- |
| `GET /api/data-master/animals` | `Animal` | Mock | Aktif |
| `GET /api/data-master/packages` | `Package` | Mock | Aktif |
| `GET /api/data-master/catering-menus` | `CateringMenu` | Mock | Aktif |
| `GET /api/data-master/pens` | `PartnerProfile` | Mock | Aktif |
| `GET /api/data-master/summary` | Multiple | Mock | Aktif |

### Modul Orders (Read/Write)
| Endpoint | Model Prisma | Fallback | Status |
| --- | --- | --- | --- |
| `GET /api/orders` | `Order` | Mock (Read) | Aktif |
| `POST /api/orders` | `Order`, `OrderItem` | **None** (Write) | Aktif |
| `GET /api/orders/:id/confirmations` | `PartnerConfirmation` | Mock (Empty) | Aktif |
| `POST /api/orders/:id/confirmations` | `PartnerConfirmation` | **None** | Aktif |
| `PATCH /api/orders/:id/confirmations/:cid` | `PartnerConfirmation` | **None** | Aktif |
| `GET /api/orders/:id/timeline-events` | `TimelineEvent` | Mock (Empty) | Aktif |
| `POST /api/orders/:id/timeline-events` | `TimelineEvent` | **None** | Aktif |

### Modul Payments (Read/Write)
| Endpoint | Model Prisma | Fallback | Status |
| --- | --- | --- | --- |
| `GET /api/payments` | `Payment` | Mock (Read) | Aktif |
| `POST /api/payments` | `Payment` | **None** (Write) | Aktif |
| `PATCH /api/payments/:id/verify` | `Payment`, `Order` | **None** | Aktif |

## 2. Penggunaan Model Prisma

| Model | Status | Catatan |
| --- | --- | --- |
| `User` | Terbatas | Digunakan untuk resolve `ConsumerProfile` via email. |
| `ConsumerProfile` | Aktif | Relasi utama pesanan. |
| `PartnerProfile` | Aktif | Digunakan untuk Data Master dan Konfirmasi Mitra. |
| `Package` | Aktif | Digunakan untuk Data Master dan Order. |
| `Animal` | Aktif | Digunakan untuk Data Master dan OrderItem. |
| `CateringMenu` | Aktif | Digunakan untuk Data Master dan OrderItem. |
| `Order` | Aktif | Core transaksi. |
| `OrderItem` | Aktif | Detil pesanan. |
| `PartnerConfirmation` | Aktif | Alur Timeline 1. |
| `Payment` | Aktif | Alur Pembayaran Manual. |
| `TimelineEvent` | Aktif | Alur Timeline 2 (Fulfillment). |
| `PlatformSetting` | Aktif | Digunakan untuk konstanta `dp_pct`. |
| `Payout` | **Idle** | Belum diaktifkan di API. |

## 3. Risiko Teknis & Mitigasi

| Risiko | Deskripsi | Mitigasi |
| --- | --- | --- |
| **Data Inconsistency** | Perbedaan struktur antara data Mock dan DB saat fallback. | Pemetaan (Mapping) ketat di level Service. |
| **DB Connectivity** | Server crash jika DB offline pada operasi tulis. | Penanganan error eksplisit dengan status 503/500 di Controller. |
| **Idempotency** | Duplikasi data pada operasi POST yang diulang. | Penggunaan `upsert` pada seed dan cek manual pada `PartnerConfirmation`. |
| **Concurrency** | Tabrakan generate `orderNumber` pada trafik tinggi. | Saat ini cukup untuk Dev; perlu perbaikan untuk Prod di masa depan. |

---
*Audit dilakukan pada: 16 Mei 2026*
