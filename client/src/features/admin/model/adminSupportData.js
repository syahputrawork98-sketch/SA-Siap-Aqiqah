export const MOCK_REPORTS = [
  { id: 'REP-001', periode: 'Bulan Ini', totalPesanan: 45, totalPendapatan: 112500000, status: 'Final' },
  { id: 'REP-002', periode: 'Bulan Lalu', totalPesanan: 38, totalPendapatan: 95000000, status: 'Final' },
  { id: 'REP-003', periode: 'Minggu Ini', totalPesanan: 12, totalPendapatan: 30000000, status: 'Draft' },
];

export const MOCK_NOTIFICATIONS = [
  { id: 'NOT-001', kategori: 'Pembayaran Masuk', pesan: 'Pembayaran baru dari Ahmad Fauzi sebesar Rp 2.500.000 menunggu validasi.', waktu: '2026-05-15 14:30', isRead: false },
  { id: 'NOT-002', kategori: 'Pesanan Baru', pesan: 'Pesanan baru #ORD-00124 telah masuk ke sistem.', waktu: '2026-05-15 10:15', isRead: false },
  { id: 'NOT-003', kategori: 'Stok Hewan', pesan: 'Stok kambing di Kandang Barokah menipis (Sisa 5 ekor).', waktu: '2026-05-14 16:45', isRead: true },
  { id: 'NOT-004', kategori: 'Sistem', pesan: 'Mode Developer Persona Switcher aktif.', waktu: '2026-05-14 09:00', isRead: true },
  { id: 'NOT-005', kategori: 'Validasi Pembayaran', pesan: 'Admin Budi telah memvalidasi pembayaran Rina Marlina.', waktu: '2026-05-13 15:20', isRead: true },
];

export const BUSINESS_SETTINGS = {
  namaBisnis: 'Siap Aqiqah Amanah',
  whatsapp: '081234567890',
  email: 'halo@siapaqiqah.com',
  alamat: 'Jl. Raya Bogor No. 123, Cibinong, Bogor',
};
