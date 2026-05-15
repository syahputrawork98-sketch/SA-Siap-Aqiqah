# Production Readiness Audit & Database Implementation Gate (Batch 30)

## 1. Executive Summary
Audit Batch 30 dilakukan untuk mengevaluasi kesiapan infrastruktur dan kode sebelum memasuki fase implementasi database fisik (Prisma/PostgreSQL). Secara keseluruhan, integrasi frontend-backend telah berjalan stabil dalam mode **Read-Only Development API**. Namun, terdapat beberapa *gap* standarisasi kontrak data yang harus diputuskan sebelum skema database permanen dikunci.

---

## 2. Status Integrasi Modul (API-Backed)
| Module | Status API | Keterangan |
| :--- | :--- | :--- |
| **Data Master** | ✅ Selesai | Hewan, Kandang, Catering, Menu, Paket (5/5 terintegrasi). |
| **Pesanan (Orders)** | ✅ Selesai | List, Detail, dan Summary terintegrasi. |
| **Pembayaran (Payments)** | ✅ Selesai | List, Summary, dan Rekening Bank terintegrasi. |
| **Konfirmasi Pembayaran** | ✅ Selesai | Integrasi list rekening bank untuk publik. |

> [!IMPORTANT]
> Seluruh integrasi saat ini masih bersifat **Read-Only** (hanya GET) dan menggunakan **In-Memory Data** di sisi server.

---

## 3. Database Readiness Audit
Berdasarkan dokumen `database-schema-planning.md` (Batch 29), berikut adalah evaluasi kesiapannya:

### A. Entitas Prioritas (Phase 1 Schema)
1.  **User & Role**: Fondasi autentikasi (HOLD).
2.  **Customer & Partner**: Data profil stakeholders.
3.  **Animal & Pen**: Master data logistik hewan.
4.  **Catering & Menu**: Master data jasa masak.
5.  **Order & OrderItem**: Transaksi inti.
6.  **Payment & BankAccount**: Alur keuangan manual.

### B. Contract Gaps (Inkonsistensi Data)
Ditemukan beberapa perbedaan penamaan field antara modul yang perlu distandarkan sebelum pembuatan `schema.prisma`:

| Field Context | Current (In-Memory) | Proposed Standard (Prisma) |
| :--- | :--- | :--- |
| **Identity** | `nama`, `konsumen`, `mitra` | `name` |
| **Date** | `tanggal` | `createdAt` / `orderDate` |
| **Financial** | `jumlah`, `total`, `harga` | `amount`, `totalPrice`, `price` |
| **Evidence** | `bukti` | `proofUrl` |
| **Phone** | `telepon`, `customerPhone` | `phone` |

---

## 4. Manual Payment Production Path
Alur pembayaran manual telah dinyatakan sebagai **Jalur Produksi Valid**.
- **Kesiapan**: UI sudah mendukung upload preview dan instruksi rekening.
- **Gap Utama**: 
  - Belum ada **Physical Storage** (Cloud/Local Disk) untuk file bukti transfer.
  - Belum ada **Audit Trail** (Siapa admin yang melakukan verifikasi).
  - Belum ada **Locking Mechanism** (Pesanan tidak boleh 'Diproses' sebelum pembayaran 'Lunas').

---

## 5. Developer Persona Switcher Gate
- **Kondisi**: Fitur ini sangat krusial untuk testing tetapi berisiko jika bocor ke user asli.
- **Keputusan**: Tetap dipertahankan sebagai alat **Internal/Dev Testing**.
- **Gate**: Harus dibatasi menggunakan Environment Variable (`VITE_DEV_MODE=true`) atau hanya muncul jika user memiliki role `DEVELOPER`.

---

## 6. Readiness Checklist for Batch 31
| Kriteria | Status | Catatan |
| :--- | :--- | :--- |
| **API Contract Stability** | ⚠️ Standar | Perlu normalisasi nama field (English vs Indo). |
| **Schema Planning** | ✅ Siap | Blueprint sudah tersedia di Batch 29. |
| **Infrastructure Prep** | ⚠️ Belum | Butuh instalasi Prisma & Docker/PostgreSQL. |
| **Write Logic Ready** | ❌ Belum | Endpoint POST/PATCH belum dibuat di API. |

---

## 7. Decision Gate: Rekomendasi Batch 31

Berdasarkan temuan audit, terdapat dua opsi jalur pengembangan:

### Opsi A: API Contract Normalization (Direkomendasikan)
Melakukan standarisasi seluruh field API (menggunakan Bahasa Inggris dan naming convention camelCase) pada mock data server-side sebelum membuat schema Prisma. Ini mencegah migrasi database yang berulang-ulang di masa depan.

### Opsi B: Prisma Schema Foundation
Langsung memulai inisialisasi Prisma schema berdasarkan planning Batch 29, dengan risiko melakukan banyak *rename* field di tengah jalan.

> [!TIP]
> **Rekomendasi Auditor**: **Opsi A (API Contract Normalization)**. 
> Batch 31 sebaiknya fokus merapikan kontrak data agar benar-benar "Production-Ready" secara skema sebelum menyentuh database fisik.

---

## 8. Kesimpulan
Repo **SA-Siap-Aqiqah** telah mencapai kematangan integrasi yang cukup (90% read-only terintegrasi). Namun, implementasi database fisik (Batch 31) sebaiknya diawali dengan **Normalisasi Kontrak API** untuk memastikan konsistensi jangka panjang.
