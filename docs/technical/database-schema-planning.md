# Database Schema Planning & Production Data Model Draft

## 1. Status Saat Ini (Batch 29 Checkpoint)
Saat ini sistem **SA-Siap-Aqiqah** berada pada tahap integrasi frontend-backend menggunakan **Backend Development API**.
- **Backend**: Node.js + Express (Development Only).
- **Data Persistence**: In-memory / Mock data (JSON-based objects).
- **API Mode**: Read-only (GET).
- **Database Status**: Belum ada (No Prisma, No PostgreSQL).
- **Payment Path**: Manual Payment (Transfer Bank + Bukti Upload).
- **Auth Simulation**: Developer Persona Switcher (Alat internal/dev testing).

Dokumen ini berfungsi sebagai cetak biru (blueprint) untuk transisi dari data in-memory ke database relasional (PostgreSQL) menggunakan Prisma ORM di masa mendatang.

---

## 2. Entity Kandidat Production Database

### A. Core Master Data
| Entity | Deskripsi | Field Utama |
| :--- | :--- | :--- |
| **Hewan (Animal)** | Data hewan aqiqah (kambing/domba/sapi). | id, nama, jenis, berat, harga, status, penId |
| **Kandang (Pen)** | Lokasi penempatan hewan. | id, nama, kapasitas, lokasi, partnerId |
| **Catering** | Unit penyedia jasa masak. | id, nama, lokasi, partnerId |
| **Menu** | Jenis olahan makanan (Sate, Gule, dll). | id, nama, kategori, cateringId |
| **Paket (Package)** | Kombinasi hewan dan menu catering. | id, nama, harga, status, animalCategory, menuSummary |

### B. User & Stakeholders
| Entity | Deskripsi | Field Utama |
| :--- | :--- | :--- |
| **User** | Akun internal untuk staf/admin. | id, email, password (hashed), roleId, name |
| **Role** | Definisi hak akses (Admin, Mandor, dll). | id, name, permissions (JSON) |
| **Konsumen (Customer)** | Data profil pembeli. | id, name, email, phone, address, userId |
| **Mitra (Partner)** | Penyedia sumber daya (Kandang/Catering). | id, name, type, location, phone |

### C. Operational & Transactional
| Entity | Deskripsi | Field Utama |
| :--- | :--- | :--- |
| **Pesanan (Order)** | Transaksi pembelian aqiqah. | id, customerId, total, status, paymentStatus, orderDate |
| **Item Pesanan (OrderItem)** | Rincian paket yang dibeli dalam satu order. | id, orderId, packageId, quantity, priceAtPurchase |
| **Pembayaran (Payment)** | Histori transaksi pembayaran manual. | id, orderId, amount, status, method, verifiedBy, bankAccountId |
| **Rekening (BankAccount)** | Daftar rekening resmi Siap Aqiqah. | id, bankName, accountNumber, accountHolderName |
| **Bukti Transfer (PaymentProof)** | Data/file bukti bayar konsumen. | id, paymentId, fileUrl, uploadTimestamp |
| **Progress (OrderProgress)** | Log perjalanan operasional pesanan. | id, orderId, stage, description, partnerId, photoUrl, timestamp |

---

## 3. Relasi Utama (High-Level ERD)

1.  **Customer - Order**: `1 : N` (Satu konsumen dapat memiliki banyak pesanan).
2.  **Order - Payment**: `1 : N` (Satu pesanan bisa dibayar bertahap/DP, meski saat ini fokus lunas).
3.  **Order - OrderProgress**: `1 : N` (Satu pesanan memiliki histori progress: Penyembelihan -> Masak -> Kirim).
4.  **Partner - Pen/Catering**: `1 : N` (Satu mitra bisa mengelola beberapa kandang atau unit catering).
5.  **Pen - Animal**: `1 : N` (Satu kandang menampung banyak hewan).
6.  **Catering - Menu**: `1 : N` (Satu unit catering memiliki banyak varian menu).
7.  **Payment - BankAccount**: `N : 1` (Banyak pembayaran ditujukan ke satu rekening resmi).

---

## 4. Manual Payment Production Path
Manual payment adalah jalur utama pembayaran yang valid secara produksi. Untuk menjadi *production-ready*, alur ini memerlukan:
- **Persistent Storage**: Data rekening dan transaksi harus disimpan di DB.
- **File Storage**: Bukti transfer tidak boleh hanya preview lokal; harus diunggah ke cloud storage (S3/GCS) atau local storage server.
- **Audit Trail**: Mencatat siapa admin yang memverifikasi (`verifiedBy`), kapan waktunya (`verifiedAt`), dan alasan jika ditolak (`rejectionReason`).
- **Data Integrity**: Status pesanan harus terkunci otomatis menjadi 'Diproses' hanya setelah status pembayaran menjadi 'Lunas/Diterima'.

---

## 5. Developer Persona Switcher Position
- **Status**: Tetap dipertahankan sebagai **Internal Testing Tool**.
- **Peran**: Digunakan oleh pengembang atau QA untuk berpindah konteks role tanpa harus login berkali-kali.
- **Keamanan**: Dalam production sesungguhnya, fitur ini harus disembunyikan di balik flag lingkungan (`ENV !== 'production'`) atau akses terbatas superadmin.
- **Relasi**: Tidak disimpan dalam tabel `User` sebagai record permanen, melainkan sebagai metadata sesi pengembang.

---

## 6. Suggested Prisma Model Draft (Pseudo-code)

```prisma
// Ini adalah draft awal, bukan file implementasi final.

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @relation(fields: [roleId], references: [id])
  roleId    String
  profile   Profile?
}

model Customer {
  id        String   @id @default(uuid())
  name      String
  phone     String
  orders    Order[]
}

model Order {
  id            String          @id @default(cuid())
  customerId    String
  customer      Customer        @relation(fields: [customerId], references: [id])
  total         Float
  status        OrderStatus     @default(WAITING_PAYMENT)
  payments      Payment[]
  progress      OrderProgress[]
  createdAt     DateTime        @default(now())
}

model Payment {
  id            String        @id @default(cuid())
  orderId       String
  order         Order         @relation(fields: [orderId], references: [id])
  amount        Float
  status        PaymentStatus @default(PENDING)
  proofUrl      String?
  verifiedAt    DateTime?
  verifiedBy    String?       // User ID
}

model Animal {
  id        String   @id @default(cuid())
  name      String
  category  String
  price     Float
  status    String
  penId     String
  pen       Pen      @relation(fields: [penId], references: [id])
}
```

---

## 7. Migration Strategy (Roadmap)

1.  **Phase 1**: Finalisasi Data Model Draft (Selesai di Batch 29).
2.  **Phase 2**: Inisialisasi Prisma & Schema (Batch 30+).
3.  **Phase 3**: Database Seeding menggunakan data dari `mock-data.js` saat ini.
4.  **Phase 4**: Refaktor API untuk membaca data dari database (PostgreSQL) namun tetap read-only.
5.  **Phase 5**: Implementasi endpoint Write (POST/PATCH/DELETE) untuk Admin.
6.  **Phase 6**: Integrasi Auth Production & Audit Trail.

---

## 8. Risiko & Mitigasi
- **Data Consistency**: Inkonsistensi status antara tabel Order dan Payment. Mitigasi: Gunakan database transaction.
- **Storage Strategy**: Penumpukan file bukti transfer di server. Mitigasi: Implementasi Cloud Storage terpisah.
- **Schema Evolution**: Perubahan field di tengah jalan. Mitigasi: Migration management Prisma yang ketat.
- **Sensitive Data**: Ekspos data konsumen di log. Mitigasi: Masking data pada level logging.

> [!NOTE]
> Dokumen ini adalah dokumen perencanaan. Tidak ada kode server atau client yang berubah pada batch ini.
