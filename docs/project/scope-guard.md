# Scope Guard - Batasan Project

Dokumen ini berfungsi untuk menjaga agar pengerjaan tetap fokus pada tujuan setiap batch dan menghindari *scope creep*.

## Batasan Umum (Development Suite Phase)
1. **No Production Database**: Jangan menggunakan database fisik (PostgreSQL/MySQL/MongoDB) atau Prisma. Data tetap disimpan di memori (in-memory) atau file lokal.
2. **No Production Auth**: Jangan mengimplementasikan JWT, RBAC, atau Session Management yang nyata. Role Guard tetap menggunakan simulasi lokal (Developer Persona Switcher).
3. **No Real File Upload**: Upload file (bukti transfer) dilarang masuk ke server storage atau cloud storage. Cukup gunakan preview lokal di browser.
4. **No Payment Gateway**: Integrasi Midtrans/Xendit atau sejenisnya dilarang keras. Pembayaran tetap menggunakan metode transfer manual dengan validasi admin manual.
5. **No Production Deployment**: Fokus tetap pada local development environment.
6. **No Legal Invoice/BAST**: Pembuatan dokumen legal tetap dilarang. Fokus pada manajemen data mentah saja.

## Aturan Komunikasi & Eksekusi
- **Satu Eksekusi Per Turn**: Gemini mengeksekusi instruksi satu kali saja per turn untuk menjaga fokus.
- **Decision Maker**: Perubahan dari in-memory data ke database fisik harus melalui instruksi eksplisit dari Room Chat 00.
- **Wording Policy**: Hindari klaim "Production Ready". Gunakan istilah "Development Suite" atau "Production-minded".

## Definisi Selesai (Batch 21 - 25)
- Backend Express fungsional dengan rute Health Check.
- API Data Master tersedia secara Read-only (In-memory).
- Halaman Data Hewan dan Data Kandang terintegrasi secara dinamis ke API.
- Dokumentasi project tersinkronisasi dan mencerminkan status terbaru integrasi client-server.
- Build dan Lint di folder `client/` serta `server/` berstatus OK.
