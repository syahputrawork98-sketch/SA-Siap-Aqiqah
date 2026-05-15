# Scope Guard

## Struktur Peran

### CEO / Owner
- Pemilik keputusan akhir.
- Melakukan commit & push manual.
- Menentukan arah besar project.

### Room Chat 00 - Team Lead
- Mengambil keputusan.
- Menjaga scope.
- Membuat instruksi untuk Room Chat 01.
- Membuat instruksi final untuk Gemini 3 Flash.
- Mengevaluasi hasil eksekusi.

### Room Chat 01 - Analis
- Hanya menganalisa.
- Membaca repository dan dokumen.
- Menemukan gap, risiko, konflik, dan rekomendasi.
- Tidak boleh mengubah file.
- Tidak boleh mengambil keputusan final.
- Tidak boleh memberi instruksi langsung ke Gemini.

### Gemini 3 Flash - Eksekutor
- Hanya menjalankan instruksi dari Room Chat 00.
- Hanya eksekusi satu kali per instruksi.
- Tidak boleh memperluas scope.
- Tidak boleh mengambil keputusan strategis.
- Setelah eksekusi, wajib melaporkan hasil.

## Aturan Hemat Token

- Gemini 3 Flash tidak boleh melakukan loop analisa-fix-check berulang.
- Gemini hanya boleh melakukan satu kali check ringan setelah eksekusi.
- Jika ada error/blocker, Gemini cukup melaporkan.
- Room Chat 00 yang menentukan langkah berikutnya.