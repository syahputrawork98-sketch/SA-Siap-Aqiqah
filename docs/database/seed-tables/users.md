# Seed Table: Users

## Deskripsi
Tabel utama autentikasi. Seed data di sini disesuaikan dengan sistem **Developer Persona Switcher**.

## Data Seed
| Email | Role | Deskripsi |
| --- | --- | --- |
| `user@siqah.dev` | `USER` | Akun konsumen untuk testing pesanan. |
| `kandang@siqah.dev` | `MITRA_KANDANG` | Akun mitra penyedia hewan. |
| `catering@siqah.dev` | `MITRA_CATERING` | Akun mitra pengolah makanan. |
| `kurir@siqah.dev` | `MITRA_KURIR` | Akun mitra pengantaran. |
| `admin@siqah.dev` | `ADMIN` | Akun operator harian. |
| `superadmin@siqah.dev` | `SUPERADMIN` | Akun pemilik platform / kebijakan. |

## Catatan Implementasi
- Menggunakan `upsert` pada field `email`.
- `passwordHash` menggunakan nilai placeholder karena autentikasi dev persona tidak mengecek password.
