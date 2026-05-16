# Migrasi API Data Master ke Prisma (Read-only)

Dokumen ini mencatat progres transisi modul Data Master dari penggunaan data mock (in-memory) ke database fisik (Prisma/PostgreSQL).

## Status Migrasi
- **Read-only**: Selesai (Batch 44).
- **Write/Create**: Belum diimplementasikan (Masih HOLD).
- **Fallback Mechanism**: Aktif.

## Modul yang Terintegrasi
| Modul | Model Prisma | Status | Fallback |
| --- | --- | --- | --- |
| Paket (Packages) | `Package` | DB-Aware | `mockData.PACKAGES` |
| Hewan (Animals) | `Animal` | DB-Aware | `mockData.ANIMALS` |
| Menu Catering | `CateringMenu` | DB-Aware | `mockData.MENUS` |
| Mitra (Kandang) | `PartnerProfile` | DB-Aware | `mockData.PENS` |
| Mitra (Catering) | `PartnerProfile` | DB-Aware | `mockData.CATERINGS` |

## Mekanisme Guarded Fallback
Untuk menjaga stabilitas aplikasi selama fase pengembangan database, kami menerapkan helper `tryDB` di `dataMaster.service.js`.

**Prinsip Kerja:**
1. Aplikasi mencoba melakukan query ke Prisma Client.
2. Jika database aktif dan data tersedia, sistem mengembalikan data dari DB.
3. Jika terjadi kesalahan koneksi (misal: P1001), sistem mencatat log warning dan **otomatis beralih ke data mock/in-memory**.
4. Hal ini mencegah server crash jika pengembang belum mengaktifkan PostgreSQL lokal.

## Mapping Data
Karena skema Prisma menggunakan penamaan field yang berbeda dengan kontrak mock awal, dilakukan mapping di tingkat service:
- `Animal.type` -> `kategori`
- `Package.priceBase` -> `harga`
- `PartnerProfile.businessName` -> `nama`
- Dll.

---
*Dokumentasi ini dibuat pada Batch 44.*
