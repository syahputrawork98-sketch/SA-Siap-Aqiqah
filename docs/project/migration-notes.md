# Migration Notes: SIQAH Frontend -> SA-Siap-Aqiqah

## Strategi Migrasi
Migrasi dilakukan dengan metode **"Shift, Stabilize, and Modularize Later"**:
1. Buat wadah baru (SA-Siap-Aqiqah) dengan monorepo-lite structure.
2. Pindahkan potongan kode secara bertahap (per batch).
3. Pastikan potongan tersebut berjalan (build & lint verification).
4. Fokus pada fungsionalitas visual (Frontend-only) sebelum masuk ke integrasi server.

## Hasil Fase Operasional (Batch 11-15)
- **Admin Operasional**: Berhasil memigrasikan fitur utama Manajemen Pesanan dan Pembayaran.
- **Mock Validation**: Validasi pembayaran disimulasikan menggunakan state lokal (`useState`) di dalam komponen untuk menunjukkan flow kerja tanpa API.
- **Master Data Foundation**: Menyiapkan struktur folder dan dashboard untuk area Data Master, menggunakan placeholder untuk modul detail guna menjaga fokus batch.

## Perubahan Struktur & Pola Kerja
- **Shared UI**: Terus menggunakan komponen dari `shared/ui` (Card, Button, AsyncState) untuk konsistensi.
- **Local Components**: Komponen yang sangat spesifik fitur (misal: `ModalValidasiPembayaran`) diletakkan di dalam folder `features/admin/ui/`.
- **Data Mocking**: Seluruh data simulasi dipusatkan di folder `features/admin/model/` untuk memudahkan transisi ke API Service di masa depan.

## Catatan Teknis Lanjutan
- **React Router 6**: Menggunakan rute dinamis (`:id`) dan nested routes untuk struktur Data Master.
- **Recharts Integration**: Dashboard Data Master menggunakan Recharts untuk visualisasi data distribusi hewan.
- **Handoff Readiness**: Seluruh kode telah diverifikasi melalui `build` dan `lint` untuk memastikan tidak ada "technical debt" visual sebelum pindah ke room chat baru.
