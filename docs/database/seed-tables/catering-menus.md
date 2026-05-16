# Seed Table: Catering Menus

## Deskripsi
Daftar menu olahan masakan yang disediakan oleh Mitra Catering.

## Data Seed
| Menu Name | Price / Porsi | Description | Partner |
| --- | --- | --- | --- |
| Paket Olahan Sate & Gule | 35.000 | Sate maranggi & gule kental. | Dapur Aqiqah Siqah |

## Catatan Implementasi
- Pencegahan duplikasi dilakukan dengan pengecekan `partnerId` + `menuName` sebelum pembuatan.
