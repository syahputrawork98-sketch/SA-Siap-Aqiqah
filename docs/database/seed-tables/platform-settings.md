# Seed Table: Platform Settings

## Deskripsi
Menyimpan konfigurasi global yang memengaruhi perhitungan harga dan pembayaran di seluruh sistem.

## Data Seed
| Key | Value | Deskripsi |
| --- | --- | --- |
| `dp_pct` | `50` | Persentase uang muka (DP) default (50%). |
| `platform_fee_pct` | `10` | Persentase komisi yang diambil platform (10%). |

## Catatan Implementasi
- Menggunakan `upsert` pada field `key`.
- Data ini dikelola oleh Superadmin melalui dashboard konfigurasi (di masa depan).
