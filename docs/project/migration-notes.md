# Migration Notes: SIQAH Frontend -> SA-Siap-Aqiqah

## Strategi Migrasi
Migrasi dilakukan dengan metode **"Shift, Stabilize, and Modularize Later"**:
1. Buat wadah baru (SA-Siap-Aqiqah) dengan monorepo-lite structure.
2. Pindahkan potongan kode secara bertahap (per batch).
3. Pastikan potongan tersebut berjalan (build & lint verification).
4. OOP-style/refactor modular besar dilakukan di fase lanjutan setelah migrasi dasar selesai.

## Hasil Tahap Awal (Batch 1-10)
- **Public Core**: Berhasil memindahkan Landing Page dan halaman statis lainnya.
- **Layout Foundation**: Layout backoffice berhasil distandarisasi menggunakan alias `@` dan struktur folder yang lebih rapi (`app/layouts`).
- **Mock Data Layer**: Menggunakan model statis di dalam folder feature (misal: `features/admin/model/`) untuk mensimulasikan dashboard tanpa API.

## Perubahan Struktur Folder & Penamaan
| Lama (SIQAH) | Baru (SA-Siap-Aqiqah) | Keterangan |
| --- | --- | --- |
| `src/` | `client/src/` | Lokasi utama kode frontend. |
| (New) | `server/` | Tempat backend (saat ini masih placeholder). |
| `docs/project-control/` | `docs/project/` | Konsolidasi dokumentasi aktif. |
| `src/shared/ui/` | `client/src/shared/ui/` | Komponen UI distandarisasi dengan penamaan PascalCase. |

## Catatan Teknis & Checkpoint
- **Dependency Alignment**: Versi React dan Vite telah diselaraskan dengan repo lama untuk meminimalkan breaking changes saat copy-paste.
- **Tailwind v4**: Project menggunakan Tailwind CSS v4, sehingga beberapa class atau plugin mungkin memerlukan penyesuaian (meskipun sebagian besar class v3 tetap kompatibel).
- **PascalCase Convention**: File komponen baru dipaksa menggunakan PascalCase (contoh: `PublicCard.jsx`) untuk konsistensi.
