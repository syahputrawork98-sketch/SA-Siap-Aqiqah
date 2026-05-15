# Project Control

Folder ini adalah pusat komunikasi resmi antar:

- Room Chat 00 sebagai Team Lead
- Room Chat 01 sebagai Analis
- Gemini 3 Flash sebagai Eksekutor di Antigravity

GitHub adalah source of truth setelah user melakukan commit & push.

## Prinsip Kerja

- User adalah CEO / Owner.
- Room Chat 00 mengambil keputusan.
- Room Chat 01 hanya menganalisa.
- Gemini 3 Flash hanya mengeksekusi satu kali per instruksi.
- Hasil kerja baru dianggap resmi setelah commit & push.
- Jika belum commit & push, maka belum menjadi kondisi resmi project.

## Alur Kerja

1. User memberi arah ke Room Chat 00.
2. Room Chat 00 menentukan scope dan keputusan.
3. Room Chat 00 meminta analisa ke Room Chat 01 jika perlu.
4. Room Chat 01 membaca repository dan memberi laporan analisa.
5. Room Chat 00 membuat instruksi final untuk Gemini 3 Flash.
6. Gemini 3 Flash eksekusi satu kali di Antigravity.
7. Gemini melaporkan hasil ke user.
8. User kirim laporan Gemini ke Room Chat 00.
9. User commit & push jika hasil diterima.
10. Room Chat 00 / Room Chat 01 membaca kondisi terbaru dari GitHub.