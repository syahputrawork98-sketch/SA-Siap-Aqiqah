# Scope Guard - Batasan Project

Dokumen ini berfungsi untuk menjaga agar pengerjaan tetap fokus pada tujuan setiap batch dan menghindari *scope creep*.

## Batasan Umum (Fase Migrasi Frontend & Operasional)
1. **No Backend Implementation**: Jangan membuat logic server, database, atau integrasi API nyata tanpa rencana batch khusus yang disetujui Room Chat 00.
2. **No Production Auth**: Jangan mengimplementasikan JWT, RBAC, atau Session Management yang nyata. Role Guard tetap menggunakan simulasi lokal.
3. **No Payment/Legal**: Jangan menyentuh area Payment Gateway, Invoice Legal, atau BAST.
4. **No Deployment**: Fokus pada local development environment saja.
5. **No Full CRUD Together with Refactor**: Hindari melakukan pembuatan fitur CRUD besar secara bersamaan dengan refactor arsitektur besar untuk menjaga stabilitas build.

## Aturan Pasca Handoff (Batch 16+)
- **Satu Eksekusi Per Turn**: Gemini tetap mengeksekusi instruksi satu kali saja per turn.
- **Decision Maker**: Segala keputusan strategis (pindah ke backend, refactor OOP, dll) harus melalui instruksi resmi dari Room Chat 00 baru.
- **Reporting**: Laporan hasil eksekusi tetap wajib menyertakan status build, lint, dan git status.

## Definisi Selesai (Batch 11-15)
- Halaman Admin Pesanan, Detail, dan Pembayaran aktif secara visual.
- Dashboard Data Master aktif dengan rute placeholder detail.
- Build dan Lint di folder `client/` berstatus OK.
- Dokumen Handoff untuk Room Chat baru telah disiapkan.
