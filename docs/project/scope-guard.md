# Scope Guard - Batasan Project

Dokumen ini berfungsi untuk menjaga agar pengerjaan tetap fokus pada tujuan setiap batch dan menghindari *scope creep*.

## Batasan Umum (Batch 1 - 10)
1. **No New Heavy Features**: Jangan membuat fitur baru yang tidak ada di SIQAH Frontend.
2. **No Backend Implementation**: Jangan membuat logic server, database, atau integrasi API nyata. Gunakan mock data jika diperlukan.
3. **No Auth/Security Complex**: Jangan mengimplementasikan JWT, RBAC, atau Session Management di fase ini.
4. **No Payment/Legal**: Jangan menyentuh area Payment Gateway, Invoice Legal, atau BAST.
5. **No Deployment**: Fokus pada local development environment saja.

## Aturan Refactor
- **Batch 1-10**: Refactor dilarang kecuali untuk menyesuaikan struktur folder baru. Biarkan kode lama berjalan apa adanya di tempat baru.
- **Batch 11+**: Refactor diperbolehkan secara bertahap menuju OOP-style/Modular.

## Definisi Selesai (Batch 1)
- Struktur folder `client/`, `server/`, `docs/` terbentuk.
- README dan dokumentasi dasar tersedia.
- Tidak ada kode fitur yang termigrasi secara tidak sengaja.
