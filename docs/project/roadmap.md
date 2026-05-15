# Roadmap SA-Siap-Aqiqah

## Fase 1: Migrasi & Stabilisasi (Batch 1 - 10)
Fokus pada pemindahan fitur dari SIQAH Frontend ke struktur baru tanpa melakukan refactor besar pada logic bisnis.

- **Batch 1**: Setup Fondasi Repo & Struktur Docs (Selesai).
- **Batch 2**: Setup Client Foundation (Package.json, Vite/CRA, Folder Structure).
- **Batch 3**: Migrasi Komponen UI Dasar & Shared Assets.
- **Batch 4-6**: Migrasi Fitur Public & Landing Page.
- **Batch 7-9**: Migrasi Fitur Admin/Dashboard (Read-only/Mock data).
- **Batch 10**: Finalisasi Migrasi Struktur & Smoke Test Global.

## Fase 2: Refactor Modular & OOP-Style (Batch 11+)
Fokus pada peningkatan kualitas kode dan implementasi arsitektur yang lebih solid.

- Pemisahan logic ke Services & Hooks secara menyeluruh.
- Implementasi Model & DTO di Frontend.
- Penguatan Type Safety (jika menggunakan TypeScript) atau Prop Validation.
- Refactor modular style untuk memisahkan domain bisnis.

## Fase 3: Backend Integration (TBD)
- Setup Express Server.
- Layered Architecture implementation.
- Database integration.
