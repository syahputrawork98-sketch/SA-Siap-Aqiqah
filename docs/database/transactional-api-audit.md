# Transactional API & Database Audit (Batch 61)

Audit ini merangkum cakupan integrasi teknis antara API Server dan Database Prisma pada akhir Batch 60.

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
| `GET /api/orders/:id/partner-confirmations` | `PartnerConfirmation` | Mock (Empty) | Aktif |
| `POST /api/orders/:id/partner-confirmations` | `PartnerConfirmation` | **None** | Aktif |
| `PATCH /api/orders/:id/partner-confirmations/:cid/status` | `PartnerConfirmation` | **None** | Aktif |
| `GET /api/orders/:id/timeline-events` | `TimelineEvent` | Mock (Empty) | Aktif |
| `POST /api/orders/:id/timeline-events` | `TimelineEvent` | **None** | Aktif |
| `PATCH /api/orders/:id/timeline-events/:eid/status` | `TimelineEvent` | **None** | Aktif |
| `PATCH /api/orders/:id/timeline-events/:eid/visibility` | `TimelineEvent` | **None** | Aktif |

### Modul Payments (Read/Write)
| Endpoint | Model Prisma | Fallback | Status |
| --- | --- | --- | --- |
| `GET /api/payments` | `Payment` | Mock (Read) | Aktif |
| `POST /api/payments` | `Payment` | **None** (Write) | Aktif |
| `PATCH /api/payments/:id/verify` | `Payment`, `Order` | **None** | Aktif |
| `PATCH /api/payments/:id/reject` | `Payment` | **None** | Aktif |

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
| `Payout` | **HOLD** | Model tersedia, API belum diimplementasikan. |

## 3. Hasil Audit Alur Transaksional (Logical Check)

1. **Order Creation**: `PENDING_CONFIRMATION` -> Pesanan tersimpan di DB dengan relasi `Consumer` dan `Package` yang benar. (LULUS)
2. **Timeline 1 (Partner Confirmation)**: Mitra wajib (Kandang, Catering, Kurir) terdaftar. Status pesanan berubah ke `AWAITING_PAYMENT` hanya jika SEMUA mitra menerima (`ACCEPTED`). (LULUS)
3. **Manual Payment**: Mendukung pembayaran DP. Verifikasi admin memicu perubahan status pesanan ke `PROCESSING`. (LULUS)
4. **Timeline 2 (Fulfillment)**: Progres pelacakan hanya bisa dimulai jika status pesanan minimal `PROCESSING`. Status pesanan berubah otomatis (`ON_DELIVERY`, `DELIVERED`, `COMPLETED`) berdasarkan event kunci. (LULUS)

## 4. Risiko Teknis & Mitigasi

| Risiko | Deskripsi | Mitigasi |
| --- | --- | --- |
| **Data Inconsistency** | Perbedaan struktur antara data Mock dan DB saat fallback. | Pemetaan (Mapping) ketat di level Service. |
| **DB Connectivity** | Server crash jika DB offline pada operasi tulis. | Penanganan error eksplisit dengan status 503/500 di Controller. |
| **Idempotency** | Duplikasi data pada operasi POST yang diulang. | Penggunaan `upsert` pada seed dan cek manual pada `PartnerConfirmation`. |
| **Concurrency** | Tabrakan generate `orderNumber` pada trafik tinggi. | Saat ini cukup untuk Dev; perlu perbaikan untuk Prod di masa depan. |

---
*Audit dilakukan pada: 16 Mei 2026 (Post-UI Integration Sync)*
