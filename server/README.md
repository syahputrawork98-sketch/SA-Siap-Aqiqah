# SA-Siap-Aqiqah Backend (Server)

Folder ini disiapkan sebagai tempat untuk logic backend aplikasi.

## Status Saat Ini
- **Status**: Placeholder / Belum Aktif
- **Fase**: Setup Fondasi (Batch 1)

## Rencana Arsitektur
Backend akan dikembangkan menggunakan **Layered Architecture** untuk memastikan kode yang bersih dan mudah di-test. Struktur folder yang direncanakan:

- `routes/`: Definisi endpoint API.
- `controllers/`: Logic untuk menangani request dan response.
- `services/`: Business logic utama aplikasi.
- `repositories/`: Akses data / database logic.
- `dto/` (Data Transfer Object) atau `mapper/`: Transformasi data.

## Batasan (Saat Ini)
Belum ada implementasi untuk:
- Auth Production (JWT/Session/RBAC)
- Database Schema & Connection
- Payment Gateway Integration
- Deployment Scripts
