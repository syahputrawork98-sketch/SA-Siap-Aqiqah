# Status Enum Contract

Dokumen ini mendefinisikan nilai-nilai enumerasi (Enum) yang akan digunakan di database untuk menjaga konsistensi status di seluruh aplikasi.

## 1. UserRole
| Value | Arti |
| --- | --- |
| `user` | Konsumen / Pelanggan. |
| `mitra_kandang` | Mitra peternakan. |
| `mitra_catering` | Mitra pengolahan makanan. |
| `mitra_kurir` | Mitra pengantaran. |
| `admin` | Operator operasional. |
| `superadmin` | Pengatur sistem dan kebijakan. |

## 2. OrderStatus
| Value | Arti | Aktor Utama |
| --- | --- | --- |
| `draft` | Belum dikirim konsumen. | Konsumen |
| `pending_confirmation` | Menunggu cek Admin/Mitra (Timeline 1). | Admin |
| `confirmed` | Mitra siap, menunggu bayar. | Admin |
| `awaiting_payment` | Menunggu DP. | Konsumen |
| `processing` | Sedang dikerjakan (Timeline 2). | Mitra |
| `on_delivery` | Sedang dikirim. | Kurir |
| `delivered` | Sudah sampai. | Kurir |
| `completed` | Selesai & Lunas. | Admin |
| `cancelled` | Dibatalkan. | Admin |

## 3. PartnerConfirmationStatus
| Value | Arti |
| --- | --- |
| `pending` | Belum direspon mitra. |
| `accepted` | Mitra bersedia. |
| `rejected` | Mitra menolak. |
| `need_reschedule` | Mitra minta ganti waktu. |

## 4. PaymentStatus
| Value | Arti |
| --- | --- |
| `unpaid` | Belum bayar. |
| `pending_verification` | Menunggu cek Admin. |
| `paid_dp` | DP Lunas. |
| `paid_full` | Lunas Seluruhnya. |
| `rejected` | Bukti bayar ditolak. |

## 5. FulfillmentStatus (Timeline Event)
| Value | Arti |
| --- | --- |
| `waiting` | Antre / Belum mulai. |
| `in_progress` | Sedang dikerjakan. |
| `done` | Selesai. |
| `issue` | Ada kendala. |

## 6. PayoutStatus
| Value | Arti |
| --- | --- |
| `pending` | Belum dibayar ke mitra. |
| `paid` | Sudah ditransfer ke mitra. |

## 7. TimelineVisibility
| Value | Arti |
| --- | --- |
| `internal` | Hanya untuk Admin & Mitra. |
| `published` | Bisa dilihat Konsumen. |

---
## Catatan Implementasi
- Seluruh nilai enum di atas harus ditulis dalam format **snake_case** di database.
- Perubahan pada nilai enum harus melalui migrasi database yang terencana.
- [Butuh Keputusan]: Apakah perlu status `refunded` pada `PaymentStatus`?
