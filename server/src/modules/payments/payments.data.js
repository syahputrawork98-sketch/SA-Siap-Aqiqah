const PAYMENTS = [
  { id: 'PAY-001', orderId: 'ORD-00123', konsumen: 'Ahmad Fauzi', tanggal: '2026-05-15', jumlah: 1500000, status: 'Pengajuan', metode: 'Transfer Bank BCA', bukti: null },
  { id: 'PAY-002', orderId: 'ORD-00122', konsumen: 'Rina Marlina', tanggal: '2026-05-14', jumlah: 1800000, status: 'Menunggu Validasi', metode: 'Transfer Bank Mandiri', bukti: 'https://placehold.co/400x600?text=Bukti+Transfer' },
  { id: 'PAY-003', orderId: 'ORD-00121', konsumen: 'Siti Lestari', tanggal: '2026-05-13', jumlah: 1500000, status: 'Diterima', metode: 'Transfer Bank BNI', bukti: 'https://placehold.co/400x600?text=Bukti+Transfer' },
  { id: 'PAY-004', orderId: 'ORD-00120', konsumen: 'Budi Utomo', tanggal: '2026-05-12', jumlah: 2100000, status: 'Lunas', metode: 'Transfer Bank BCA', bukti: 'https://placehold.co/400x600?text=Bukti+Transfer' },
  { id: 'PAY-005', orderId: 'ORD-00119', konsumen: 'Hani Amalia', tanggal: '2026-05-11', jumlah: 1200000, status: 'Menunggu Validasi', metode: 'Transfer Bank BRI', bukti: 'https://placehold.co/400x600?text=Bukti+Transfer' },
];

const BANK_ACCOUNTS = [
  { bank: 'BCA', nomor: '1234567890', nama: 'PT Siap Aqiqah Amanah' },
  { bank: 'Mandiri', nomor: '0987654321', nama: 'PT Siap Aqiqah Amanah' },
];

module.exports = {
  PAYMENTS,
  BANK_ACCOUNTS,
};
