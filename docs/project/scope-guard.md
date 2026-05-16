# Scope Guard - Batasan Project

Dokumen ini menjaga agar pengerjaan tetap fokus pada target **Production-Ready System** tanpa melakukan lompatan teknis prematur.

## Aturan Pengembangan Menuju Produksi

1. **Database Persistence**: Implementasi database fisik (**PostgreSQL via Prisma**) telah dimulai sejak Batch 41. Penggunaan database fisik diperbolehkan untuk operasional transaksional lokal. Mekanisme **Guarded Fallback** ke mock data wajib dipertahankan untuk menjamin stabilitas server selama pengembangan.
2. **Production Authentication (HOLD)**: Implementasi sistem login/logout nyata dilarang sebelum batch khusus. **Developer Persona Switcher** wajib digunakan sebagai alat pengujian internal dan tidak boleh dianggap sebagai sistem keamanan final.
3. **Manual Payment Path**: Pengerjaan diarahkan untuk mematangkan alur pembayaran manual (Instruksi -> Upload -> Verifikasi Admin) sebagai jalur produksi yang sah. Integrasi Payment Gateway otomatis tetap dalam status **HOLD**.
4. **Cloud/Server Storage (HOLD)**: Upload bukti transfer dilarang disimpan secara permanen di server/cloud sebelum infrastruktur storage disiapkan secara resmi. Gunakan string placeholder URL untuk saat ini.
5. **No Premature Deployment**: Segala aktivitas pengerjaan harus dilakukan di local development environment hingga audit production-readiness selesai.

## Kebijakan Wording & Konsep
- Project ini ditargetkan menjadi sistem **Production-Ready**.
- Fase saat ini adalah **Transactional Integration Baseline** (Batch 50).
- Developer Persona Switcher adalah **Internal Testing Tool**, bukan pengganti Auth produksi final.

## Daftar Fitur HOLD (Tetap Dilarang)
- Production Auth/JWT/Session/RBAC nyata.
- Payment Gateway Otomatis (Midtrans/Xendit/dll).
- Upload/Storage Production (S3/Cloudinary/Local Disk Storage permanen).
- Deployment ke server production/staging.
- Realtime/WebSocket/Chat/GPS.
- Payout otomatis/Settlement akuntansi final.
- Notifikasi otomatis (Email/WA/Push).
