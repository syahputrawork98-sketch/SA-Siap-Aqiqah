# Seed Table: Animals

## Deskripsi
Daftar hewan yang tersedia untuk dipilih oleh konsumen. Dimiliki oleh Mitra Kandang.

## Data Seed
| Type | Weight | Gender | Price | Partner |
| --- | --- | --- | --- | --- |
| Kambing | 30-35kg | Jantan | 2.000.000 | Berkah Ternak Siqah |

## Catatan Implementasi
- Pencegahan duplikasi dilakukan dengan pengecekan `partnerId` + `type` + `price` sebelum pembuatan.
