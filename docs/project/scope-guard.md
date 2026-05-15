# Scope Guard - Batasan Project

Dokumen ini berfungsi untuk menjaga agar pengerjaan tetap fokus pada tujuan setiap batch dan menghindari *scope creep*.

## Batasan Umum (Fase Migrasi Frontend)
1. **No New Heavy Features**: Jangan membuat fitur baru yang tidak ada di SIQAH Frontend.
2. **No Backend Implementation**: Jangan membuat logic server, database, atau integrasi API nyata. Gunakan mock data jika diperlukan.
3. **No Auth/Security Complex**: Jangan mengimplementasikan JWT, RBAC, atau Session Management yang nyata. Role Guard tetap menggunakan simulasi lokal.
4. **No Payment/Legal**: Jangan menyentuh area Payment Gateway, Invoice Legal, atau BAST.
5. **No Deployment**: Fokus pada local development environment saja.
6. **No External Requests**: Hindari membuat API call ke server eksternal selain aset statis (seperti Cloudinary).

## Aturan Eksekusi (Gemini)
- Gemini hanya mengeksekusi instruksi **satu kali per turn**.
- Tidak ada loop perbaikan otomatis yang tidak diminta.
- Jika terjadi error atau blocker teknis di luar scope batch, laporkan ke Room Chat 00.

## Definisi Selesai (Batch 1-10)
- Struktur folder `client/`, `server/`, `docs/` stabil.
- Public Website, Backoffice Layout, dan Dashboard Utama berhasil dimigrasikan secara visual.
- Build dan Lint di folder `client/` berstatus OK.
- Dokumentasi project tersinkronisasi dengan kondisi codebase terbaru.
