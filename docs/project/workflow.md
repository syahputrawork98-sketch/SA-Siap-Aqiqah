# Project Workflow & Roles

Dokumen ini mendefinisikan aturan kerja resmi, peran masing-masing pihak, dan alur komunikasi dalam pengembangan project SA-Siap-Aqiqah.

## Struktur Peran

### 1. CEO / Owner (User)
- Pemilik keputusan akhir dan pemegang kendali utama project.
- Melakukan **commit & push** secara manual setelah hasil eksekusi diterima dan divalidasi.
- Menentukan arah besar project dan prioritas batch.

### 2. Room Chat 00 (Team Lead / Decision Maker)
- Pengambil keputusan taktis dan strategis dalam pengerjaan batch.
- Menjaga batasan scope (*Scope Guard*).
- Membuat instruksi final untuk Gemini 3 Flash.
- Mengevaluasi hasil eksekusi sebelum diteruskan ke Owner.

### 3. Room Chat 01 (Analis)
- Melakukan analisa mendalam terhadap repository dan dokumen.
- Mengidentifikasi gap, risiko, konflik, dan memberikan rekomendasi teknis.
- **Batasan**: Tidak boleh mengubah file, tidak boleh mengambil keputusan final, dan tidak boleh memberi instruksi langsung ke Gemini.

### 4. Gemini 3 Flash (Eksekutor)
- Menjalankan instruksi teknis yang diberikan oleh Room Chat 00.
- **Aturan Eksekusi**: Hanya mengeksekusi satu kali per instruksi (mencegah loop/token waste).
- **Laporan**: Wajib memberikan laporan detail hasil eksekusi dan kondisi terbaru repository.
- **Batasan**: Tidak boleh memperluas scope atau mengambil keputusan strategis di luar instruksi.

## Alur Kerja Resmi

1. **Arah**: Owner memberi arahan ke Room Chat 00.
2. **Keputusan**: Room Chat 00 menentukan scope, prioritas, dan keputusan final.
3. **Analisa**: Room Chat 00 meminta analisa ke Room Chat 01 jika diperlukan.
4. **Laporan Analisa**: Room Chat 01 memberikan laporan analisa berdasarkan kondisi terbaru GitHub.
5. **Instruksi**: Room Chat 00 menyusun instruksi final untuk Gemini 3 Flash.
6. **Eksekusi**: Gemini 3 Flash mengeksekusi instruksi di lingkungan Antigravity.
7. **Laporan Gemini**: Gemini memberikan laporan hasil pengerjaan kepada User.
8. **Validasi**: User mengirimkan laporan Gemini ke Room Chat 00 untuk dievaluasi.
9. **Finalisasi**: Jika hasil diterima, User melakukan **commit & push** ke GitHub.
10. **Sinkronisasi**: Room Chat 00/01 menyinkronkan data dengan membaca kondisi terbaru dari GitHub.

## Source of Truth (SoT)

- **GitHub** adalah satu-satunya *Single Source of Truth* setelah proses commit & push dilakukan.
- Segala perubahan yang belum di-commit/push dianggap belum resmi dan tidak menjadi acuan untuk batch berikutnya.
- **docs/project/** adalah pusat dokumentasi aktif untuk status, roadmap, dan aturan kerja.
