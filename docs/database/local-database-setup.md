# Panduan Setup Database Lokal

Dokumen ini berisi langkah-langkah untuk menyiapkan lingkungan database PostgreSQL lokal guna mendukung pengerjaan SA-Siap-Aqiqah.

## 1. Prasyarat
Sebelum memulai, pastikan Anda telah menginstal komponen berikut:
- **PostgreSQL** (Versi 14 atau lebih baru direkomendasikan).
- **Node.js** (Versi 18 atau lebih baru).

## 2. Konfigurasi Database
1. Buat database baru bernama `siqah_dev` di PostgreSQL Anda.
2. Salin file `.env.example` menjadi `.env` di folder `server/`:
   ```bash
   cp .env.example .env
   ```
3. Sesuaikan nilai `DATABASE_URL` di dalam file `.env`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/siqah_dev?schema=public"
   ```
   *Ganti `USER` dan `PASSWORD` sesuai dengan kredensial PostgreSQL Anda.*

## 3. Instalasi Dependensi
Jalankan perintah berikut di dalam direktori `server/`:
```bash
npm install
```

## 4. Perintah Prisma (Helper Scripts)
Kami telah menyediakan beberapa script di `package.json` untuk mempermudah operasional database:

- **Format Schema**: Merapikan penulisan file `schema.prisma`.
  ```bash
  npm run prisma:format
  ```
- **Validate Schema**: Mengecek kevalidan struktur skema.
  ```bash
  npm run prisma:validate
  ```
- **Generate Client**: Membuat Prisma Client untuk digunakan di kode aplikasi.
  ```bash
  npm run prisma:generate
  ```
- **Run Migration**: Menjalankan migrasi database (hanya jalankan jika PostgreSQL sudah siap).
  ```bash
  npm run prisma:migrate
  ```

## 5. Troubleshooting Umum
- **Error P1001 (Can't reach database server)**: Pastikan layanan PostgreSQL sudah berjalan dan port (5432) tidak diblokir.
- **Error P1012 (Validation Error)**: Jika menggunakan npx secara global, pastikan versi Prisma yang digunakan adalah versi 5.x (sesuai `package.json`).
- **Prisma 7 Compatibility**: Gunakan versi 5.14.0 untuk stabilitas maksimal sesuai kontrak baseline saat ini.

---
*Dokumentasi ini dibuat pada Batch 41 sebagai panduan pengembang.*
