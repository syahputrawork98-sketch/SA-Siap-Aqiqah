# Database Contract Mapping

Dokumen ini memetakan kebutuhan data dari alur bisnis Siqah Aqiqah ke dalam struktur entitas database. Pemetaan ini berfungsi sebagai kontrak awal sebelum implementasi skema fisik (Prisma).

## 1. Entitas Pengguna & Profil (User & Profile)

### User / Account
- **Fungsi**: Entitas autentikasi pusat.
- **Field Kandidat**: `id`, `email`, `password_hash`, `role` (Enum), `is_active`, `created_at`, `updated_at`.
- **Relasi**: Memiliki satu `ConsumerProfile` atau satu `PartnerProfile`.
- **Aktor**: Seluruh pengguna sistem.

### Consumer Profile (Konsumen)
- **Fungsi**: Data profil pelanggan yang memesan aqiqah.
- **Field Kandidat**: `id`, `user_id`, `full_name`, `phone`, `address_default`, `avatar_url`.
- **Relasi**: `belongsTo User`, `hasMany Orders`.
- **Aktor**: Konsumen.

### Partner Profile (Mitra)
- **Fungsi**: Data profil mitra (Kandang, Catering, Kurir).
- **Field Kandidat**: `id`, `user_id`, `type` (Enum: mitra_kandang, mitra_catering, mitra_kurir), `business_name`, `owner_name`, `phone`, `address`, `bio`, `bank_account_info`, `is_verified`.
- **Relasi**: `belongsTo User`, `hasMany PartnerConfirmations`, `hasMany Payouts`.
- **Aktor**: Mitra, Admin, Superadmin.

## 2. Entitas Produk & Layanan (Product & Service)

### Package (Paket Aqiqah)
- **Fungsi**: Paket layanan utama yang ditawarkan.
- **Field Kandidat**: `id`, `name`, `slug`, `description`, `price_base`, `image_url`, `is_active`.
- **Relasi**: `hasMany Orders`.

### Animal (Hewan)
- **Fungsi**: Data hewan yang tersedia di mitra kandang.
- **Field Kandidat**: `id`, `partner_id` (Mitra Kandang), `type` (Kambing/Domba), `weight`, `gender`, `price`, `status` (Available/Reserved/Sold), `image_url`.
- **Relasi**: `belongsTo Partner (Kandang)`.

### Catering Menu
- **Fungsi**: Menu olahan daging yang disediakan mitra catering.
- **Field Kandidat**: `id`, `partner_id` (Mitra Catering), `menu_name`, `description`, `price_per_porsi`.
- **Relasi**: `belongsTo Partner (Catering)`.

## 3. Entitas Transaksi (Transaction)

### Order (Pesanan)
- **Fungsi**: Data utama transaksi aqiqah.
- **Field Kandidat**: `id`, `order_number`, `consumer_id`, `package_id`, `status` (Enum), `total_amount`, `dp_amount`, `remaining_amount`, `scheduled_date`, `delivery_address`, `notes_consumer`, `created_at`.
- **Relasi**: `belongsTo Consumer`, `belongsTo Package`, `hasMany OrderItems`, `hasMany PartnerConfirmations`, `hasMany Payments`, `hasMany TimelineEvents`.

### Order Item (Detail Pesanan)
- **Fungsi**: Rincian hewan dan menu dalam satu pesanan.
- **Field Kandidat**: `id`, `order_id`, `entity_type` (Animal/Menu), `entity_id`, `quantity`, `price_at_order`.

## 4. Entitas Operasional (Operational)

### Partner Confirmation
- **Fungsi**: Rekam jejak konfirmasi ketersediaan mitra (Timeline 1).
- **Field Kandidat**: `id`, `order_id`, `partner_id`, `partner_role` (Kandang/Catering/Kurir), `status` (Enum: Pending/Accepted/Rejected), `notes_partner`, `confirmed_at`.
- **Relasi**: `belongsTo Order`, `belongsTo Partner`.

### Fulfillment Timeline Event
- **Fungsi**: Progres pengerjaan pesanan (Timeline 2).
- **Field Kandidat**: `id`, `order_id`, `event_key` (Slaughter/Cooking/etc), `title`, `description`, `status` (Enum: Waiting/In_Progress/Done), `visibility` (Enum: Internal/Published), `proof_image_url`, `updated_by` (Admin/Partner), `created_at`.
- **Relasi**: `belongsTo Order`.

## 5. Entitas Finansial (Financial)

### Payment
- **Fungsi**: Rekam jejak pembayaran dari konsumen.
- **Field Kandidat**: `id`, `order_id`, `type` (DP/Full/Remaining), `amount`, `proof_image_url`, `status` (Enum: Pending/Verified/Rejected), `admin_note`, `verified_at`.
- **Relasi**: `belongsTo Order`.

### Payout
- **Fungsi**: Rekam jejak bagi hasil untuk mitra.
- **Field Kandidat**: `id`, `order_id`, `partner_id`, `amount`, `status` (Enum: Pending/Paid), `paid_at`, `admin_note`.
- **Relasi**: `belongsTo Order`, `belongsTo Partner`.

### Platform Setting (Config)
- **Fungsi**: Pengaturan biaya global.
- **Field Kandidat**: `id`, `key` (platform_fee_pct, dp_pct), `value`, `updated_at`.

---
## Catatan HOLD / Butuh Keputusan Room Chat 00
- [Butuh Keputusan]: Apakah `Platform Setting` perlu histori versi atau cukup satu nilai aktif?
- [Butuh Keputusan]: Apakah `Fulfillment Timeline Event` memerlukan koordinasi GPS untuk Kurir atau cukup manual update?
- [Butuh Keputusan]: Struktur multi-hewan dalam satu order (misal: 2 kambing untuk anak laki-laki) - apakah `Order Item` sudah cukup fleksibel?
