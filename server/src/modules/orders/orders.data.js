const ORDERS = [
  { 
    id: 'ORD-00123', 
    nama: 'Ahmad Fauzi', 
    tanggal: '2026-05-15', 
    total: 1500000, 
    status: 'Menunggu Pembayaran', 
    customerPhone: '081234567890', 
    paket: 'Paket Bronze (Domba)', 
    paymentStatus: 'Belum Bayar',
    konsumen: {
      nama: 'Ahmad Fauzi',
      telepon: '081234567890',
      alamat: 'Jl. Merdeka No. 123, Jakarta Pusat'
    },
    pembayaran: {
      status: 'Belum Bayar',
      metode: 'Transfer Bank BCA',
      bukti: null
    },
    progress: [
      { tahap: 'Penyembelihan', mitra: 'Mandor Heri', waktu: 'Menunggu', foto: 'https://placehold.co/600x400?text=Menunggu+Penyembelihan' },
      { tahap: 'Catering', mitra: 'Catering Berkah', waktu: 'Menunggu', foto: 'https://placehold.co/600x400?text=Menunggu+Catering' },
      { tahap: 'Pengiriman', mitra: 'Logistik Siap', waktu: 'Menunggu', foto: 'https://placehold.co/600x400?text=Menunggu+Pengiriman' }
    ]
  },
  { 
    id: 'ORD-00122', 
    nama: 'Rina Marlina', 
    tanggal: '2026-05-14', 
    total: 1800000, 
    status: 'Diproses', 
    customerPhone: '082345678901', 
    paket: 'Paket Silver (Domba)', 
    paymentStatus: 'Valid',
    konsumen: {
      nama: 'Rina Marlina',
      telepon: '082345678901',
      alamat: 'Perumahan Indah, Blok B2, Bekasi'
    },
    pembayaran: {
      status: 'Diterima',
      metode: 'Transfer Bank Mandiri',
      bukti: 'https://placehold.co/400x600?text=Bukti+Transfer'
    },
    progress: [
      { tahap: 'Penyembelihan', mitra: 'Mandor Heri', waktu: '2026-05-14 09:00', foto: 'https://placehold.co/600x400?text=Foto+Penyembelihan' },
      { tahap: 'Catering', mitra: 'Catering Berkah', waktu: 'Sedang Diproses', foto: 'https://placehold.co/600x400?text=Foto+Catering' },
      { tahap: 'Pengiriman', mitra: 'Logistik Siap', waktu: 'Menunggu', foto: 'https://placehold.co/600x400?text=Menunggu+Pengiriman' }
    ]
  },
  { 
    id: 'ORD-00121', 
    nama: 'Siti Lestari', 
    tanggal: '2026-05-13', 
    total: 1500000, 
    status: 'Selesai', 
    customerPhone: '083456789012', 
    paket: 'Paket Bronze (Domba)', 
    paymentStatus: 'Lunas',
    konsumen: {
      nama: 'Siti Lestari',
      telepon: '083456789012',
      alamat: 'Jl. Melati No. 45, Depok'
    },
    pembayaran: {
      status: 'Lunas',
      metode: 'Transfer Bank BNI',
      bukti: 'https://placehold.co/400x600?text=Bukti+Transfer'
    },
    progress: [
      { tahap: 'Penyembelihan', mitra: 'Mandor Heri', waktu: '2026-05-13 08:00', foto: 'https://placehold.co/600x400?text=Foto+Penyembelihan' },
      { tahap: 'Catering', mitra: 'Catering Berkah', waktu: '2026-05-13 14:00', foto: 'https://placehold.co/600x400?text=Foto+Catering' },
      { tahap: 'Pengiriman', mitra: 'Logistik Siap', waktu: '2026-05-13 17:00', foto: 'https://placehold.co/600x400?text=Foto+Pengiriman' }
    ]
  },
  { 
    id: 'ORD-00120', 
    nama: 'Budi Utomo', 
    tanggal: '2026-05-12', 
    total: 2100000, 
    status: 'Selesai', 
    customerPhone: '084567890123', 
    paket: 'Paket Silver (Domba)', 
    paymentStatus: 'Lunas',
    konsumen: {
      nama: 'Budi Utomo',
      telepon: '084567890123',
      alamat: 'Apartemen Green View, Jakarta Barat'
    },
    pembayaran: {
      status: 'Lunas',
      metode: 'Transfer Bank BCA',
      bukti: 'https://placehold.co/400x600?text=Bukti+Transfer'
    },
    progress: [
      { tahap: 'Penyembelihan', mitra: 'Mandor Heri', waktu: '2026-05-12 08:30', foto: 'https://placehold.co/600x400?text=Foto+Penyembelihan' },
      { tahap: 'Catering', mitra: 'Catering Berkah', waktu: '2026-05-12 15:00', foto: 'https://placehold.co/600x400?text=Foto+Catering' },
      { tahap: 'Pengiriman', mitra: 'Logistik Siap', waktu: '2026-05-12 18:30', foto: 'https://placehold.co/600x400?text=Foto+Pengiriman' }
    ]
  },
  { 
    id: 'ORD-00119', 
    nama: 'Hani Amalia', 
    tanggal: '2026-05-11', 
    total: 1200000, 
    status: 'Diproses', 
    customerPhone: '085678901234', 
    paket: 'Custom Catering', 
    paymentStatus: 'Valid',
    konsumen: {
      nama: 'Hani Amalia',
      telepon: '085678901234',
      alamat: 'Jl. Anggrek No. 7, Tangerang'
    },
    pembayaran: {
      status: 'Diterima',
      metode: 'Transfer Bank BRI',
      bukti: 'https://placehold.co/400x600?text=Bukti+Transfer'
    },
    progress: [
      { tahap: 'Penyembelihan', mitra: 'N/A', waktu: 'N/A (Hanya Catering)', foto: 'https://placehold.co/600x400?text=Tidak+Ada+Penyembelihan' },
      { tahap: 'Catering', mitra: 'Catering Berkah', waktu: 'Sedang Diproses', foto: 'https://placehold.co/600x400?text=Foto+Catering' },
      { tahap: 'Pengiriman', mitra: 'Logistik Siap', waktu: 'Menunggu', foto: 'https://placehold.co/600x400?text=Menunggu+Pengiriman' }
    ]
  },
];

module.exports = {
  ORDERS,
};
