# Scope Guard - Batasan Project

Dokumen ini menjaga agar pengerjaan tetap fokus pada target **Production-Ready System** tanpa melakukan lompatan teknis prematur.

## Aturan Pengembangan Menuju Produksi
1. **Database Persistence**: Implementasi database fisik (PostgreSQL) dilarang dilakukan sebelum Fase 5 (Batch 31+) atau instruksi khusus perancangan skema. Data saat ini tetap dikelola via in-memory/mock API.
2. **Production Authentication**: Implementasi sistem login/logout nyata dilarang sebelum batch khusus. **Developer Persona Switcher** wajib digunakan sebagai alat pengujian internal dan tidak boleh dianggap sebagai sistem keamanan final.
3. **Manual Payment Path**: Pengerjaan diarahkan untuk mematangkan alur pembayaran manual (Instruksi -> Upload -> Verifikasi Admin) sebagai jalur produksi yang sah. Integrasi Payment Gateway otomatis tetap dalam status HOLD dan bersifat opsional di masa depan.
4. **Cloud/Server Storage**: Upload bukti transfer dilarang disimpan secara permanen di server/cloud sebelum infrastruktur storage disiapkan secara resmi.
5. **No Premature Deployment**: Segala aktivitas pengerjaan harus dilakukan di local development environment hingga audit production-readiness selesai.

## Kebijakan Wording & Konsep
- Project ini ditargetkan menjadi sistem **Production-Ready**.
- Fase saat ini adalah **Development Integration Checkpoint**.
- Developer Persona Switcher adalah **Internal Testing Tool**, bukan pengganti Auth produksi final.

## Definisi Selesai Batch 25 Fix
- Seluruh dokumentasi telah selaras dengan visi "Production-Ready Target".
- Catatan teknis tetap mencerminkan status pengembangan saat ini (In-memory, Read-only API).
- Roadmap mencerminkan jalur hardening menuju sistem produksi yang stabil.
