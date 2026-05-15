# Migration Notes: SIQAH Frontend -> SA-Siap-Aqiqah

## Strategi Migrasi
Migrasi dilakukan dengan metode **"Shift & Stabilize"**:
1. Buat wadah baru (SA-Siap-Aqiqah).
2. Pindahkan potongan kode secara bertahap.
3. Pastikan potongan tersebut berjalan (smoke test).
4. Lanjut ke potongan berikutnya.

## Perubahan Struktur Folder
| Lama (SIQAH) | Baru (SA-Siap-Aqiqah) | Keterangan |
| --- | --- | --- |
| `src/` | `client/src/` | Lokasi utama kode frontend. |
| (New) | `server/` | Tempat backend di masa depan. |
| `docs/` | `docs/` | Dokumentasi lebih terstruktur. |

## Catatan Teknis
- Frontend tetap menggunakan **Functional Components + Hooks** (pola React modern).
- Hindari meng-copy folder `.git` atau `node_modules` dari repo lama.
- Pastikan `package.json` nantinya bersih dari dependency yang tidak digunakan.
