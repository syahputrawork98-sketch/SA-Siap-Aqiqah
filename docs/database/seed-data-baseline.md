# Seed Data Baseline

Dokumen ini menjelaskan data awal (Seed Data) yang dimasukkan ke dalam database untuk mendukung proses pengembangan dan pengujian sistem SA-Siap-Aqiqah.

## 1. Konfigurasi Platform (PlatformSettings)
- `dp_pct`: 50 (Persentase DP default 50%).
- `platform_fee_pct`: 10 (Komisi platform default 10%).

## 2. Pengguna & Persona (Users)
Daftar akun pengembang yang selaras dengan Developer Persona Switcher:
- `user@siqah.dev` (Role: USER)
- `kandang@siqah.dev` (Role: MITRA_KANDANG)
- `catering@siqah.dev` (Role: MITRA_CATERING)
- `kurir@siqah.dev` (Role: MITRA_KURIR)
- `admin@siqah.dev` (Role: ADMIN)
- `superadmin@siqah.dev` (Role: SUPERADMIN)

## 3. Profil & Mitra (Profiles & Partners)
- **Konsumen**: Ahmad Konsumen.
- **Mitra Kandang**: Berkah Ternak Siqah (Pemilik: Haji Kandang).
- **Mitra Catering**: Dapur Aqiqah Siqah (Pemilik: Ibu Catering).
- **Mitra Kurir**: Siqah Express (Pemilik: Bang Kurir).

## 4. Produk & Layanan (Packages)
- **Paket Aqiqah Hemat**: Rp 2.500.000.
- **Paket Aqiqah Premium**: Rp 4.500.000.

## 5. Katalog Hewan (Animals)
- Kambing Jantan (30-35kg) dari Mitra Kandang: Rp 2.000.000.

## 6. Menu Catering (CateringMenus)
- Paket Olahan Sate & Gule: Rp 35.000 / porsi.

---
## Cara Menjalankan Seed
Pastikan database PostgreSQL sudah aktif dan migrasi sudah dilakukan, lalu jalankan:
```bash
npm run prisma:seed
```
Script ini menggunakan `upsert` sehingga aman dijalankan berkali-kali tanpa menduplikasi data pengguna atau paket yang sudah ada.
