export const MOCK_PAYMENTS = [
  {
    id: "PAY-001",
    konsumen: "Ahmad Fauzi",
    tanggal: "2026-05-15",
    jumlah: 1500000,
    status: "Pengajuan",
    metode: "Transfer Bank BCA",
    bukti: "https://via.placeholder.com/400x600?text=Bukti+Transfer+Ahmad",
  },
  {
    id: "PAY-002",
    konsumen: "Rina Marlina",
    tanggal: "2026-05-14",
    jumlah: 1800000,
    status: "Menunggu Validasi",
    metode: "Transfer Bank Mandiri",
    bukti: "https://via.placeholder.com/400x600?text=Bukti+Transfer+Rina",
  },
  {
    id: "PAY-003",
    konsumen: "Siti Lestari",
    tanggal: "2026-05-13",
    jumlah: 1500000,
    status: "Diterima",
    metode: "Transfer Bank BNI",
    bukti: "https://via.placeholder.com/400x600?text=Bukti+Transfer+Siti",
  },
  {
    id: "PAY-004",
    konsumen: "Budi Utomo",
    tanggal: "2026-05-12",
    jumlah: 2100000,
    status: "Lunas",
    metode: "Transfer Bank BCA",
    bukti: "https://via.placeholder.com/400x600?text=Bukti+Transfer+Budi",
  },
  {
    id: "PAY-005",
    konsumen: "Hani Amalia",
    tanggal: "2026-05-11",
    jumlah: 1200000,
    status: "Menunggu Validasi",
    metode: "Transfer Bank BRI",
    bukti: "https://via.placeholder.com/400x600?text=Bukti+Transfer+Hani",
  },
];

export const BANK_ACCOUNTS = [
  { bank: 'BCA', noRek: '1234567890', atasNama: 'PT Siap Aqiqah Amanah' },
  { bank: 'Mandiri', noRek: '0987654321', atasNama: 'PT Siap Aqiqah Amanah' },
];
