# Seed Data Baseline

Dokumen ini berisi gambaran umum data awal (Seed Data) yang digunakan dalam platform Siqah. Untuk menjaga keterbacaan, detail data dipisah ke dalam dokumen spesifik per tabel.

## Ringkasan Seed Modular

Sistem seed data Siqah kini dipecah menjadi beberapa modul utama untuk memudahkan pemeliharaan:

1. **[Platform Settings](seed-tables/platform-settings.md)**: Konfigurasi DP dan komisi platform.
2. **[Users](seed-tables/users.md)**: Akun autentikasi untuk 6 persona pengembang.
3. **[Consumer Profiles](seed-tables/consumer-profiles.md)**: Data profil pelanggan.
4. **[Partner Profiles](seed-tables/partner-profiles.md)**: Data profil untuk mitra Kandang, Catering, dan Kurir.
5. **[Packages](seed-tables/packages.md)**: Katalog paket layanan aqiqah.
6. **[Animals](seed-tables/animals.md)**: Katalog hewan kurban/aqiqah.
7. **[Catering Menus](seed-tables/catering-menus.md)**: Katalog menu masakan mitra.

## Cara Menjalankan Seed
Pastikan database sudah termigrasi, lalu jalankan perintah:
```bash
npm run prisma:seed
```

## Keamanan Data (Idempotency)
Seluruh script seed telah dirancang agar **aman dijalankan berkali-kali**. Sistem akan melakukan pengecekan data existing sebelum menambahkan data baru untuk mencegah duplikasi (menggunakan `upsert` atau pengecekan manual).

---
*Dokumentasi diperbarui pada Batch 43 (Refactor Modular Seed).*
