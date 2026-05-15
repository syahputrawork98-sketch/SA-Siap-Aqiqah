export const MOCK_ORDER_DETAILS = {
  "ORD-00123": {
    id: "ORD-00123",
    tanggal: "2026-05-15",
    total: 1500000,
    status: "Menunggu Pembayaran",
    konsumen: {
      nama: "Ahmad Fauzi",
      telepon: "081234567890",
      alamat: "Jl. Merdeka No. 123, Jakarta Pusat",
    },
    pembayaran: {
      status: "Menunggu Pembayaran",
      metode: "Transfer Bank BCA",
      bukti: "https://via.placeholder.com/400x600?text=Bukti+Transfer",
    },
    progress: [
      {
        tahap: "Penyembelihan",
        mitra: "Kandang Amanah",
        waktu: "2026-05-15 08:00",
        foto: "https://via.placeholder.com/300x200?text=Foto+Penyembelihan",
      },
      {
        tahap: "Pengolahan / Catering",
        mitra: "Catering Lezat",
        waktu: "2026-05-15 10:00",
        foto: "https://via.placeholder.com/300x200?text=Foto+Catering",
      },
      {
        tahap: "Pengiriman",
        mitra: "Kurir Express",
        waktu: "Menunggu",
        foto: "https://via.placeholder.com/300x200?text=Foto+Kurir",
      },
    ],
  },
  "ORD-00122": {
    id: "ORD-00122",
    tanggal: "2026-05-14",
    total: 1800000,
    status: "Diproses",
    konsumen: {
      nama: "Rina Marlina",
      telepon: "089876543210",
      alamat: "Perum Gading Serpong Blok A, Tangerang",
    },
    pembayaran: {
      status: "Selesai",
      metode: "Transfer Bank Mandiri",
      bukti: "https://via.placeholder.com/400x600?text=Bukti+Transfer",
    },
    progress: [
      {
        tahap: "Penyembelihan",
        mitra: "Kandang Barokah",
        waktu: "2026-05-14 07:30",
        foto: "https://via.placeholder.com/300x200?text=Foto+Penyembelihan",
      },
      {
        tahap: "Pengolahan / Catering",
        mitra: "Catering Enak",
        waktu: "2026-05-14 09:45",
        foto: "https://via.placeholder.com/300x200?text=Foto+Catering",
      },
      {
        tahap: "Pengiriman",
        mitra: "Kurir Kilat",
        waktu: "Menunggu",
        foto: "https://via.placeholder.com/300x200?text=Foto+Kurir",
      },
    ],
  },
  "ORD-00121": {
    id: "ORD-00121",
    tanggal: "2026-05-13",
    total: 1500000,
    status: "Selesai",
    konsumen: {
      nama: "Siti Lestari",
      telepon: "085211223344",
      alamat: "Jl. Sudirman No. 45, Bandung",
    },
    pembayaran: {
      status: "Selesai",
      metode: "Transfer Bank BNI",
      bukti: "https://via.placeholder.com/400x600?text=Bukti+Transfer",
    },
    progress: [
      {
        tahap: "Penyembelihan",
        mitra: "Kandang Mulia",
        waktu: "2026-05-13 08:15",
        foto: "https://via.placeholder.com/300x200?text=Foto+Penyembelihan",
      },
      {
        tahap: "Pengolahan / Catering",
        mitra: "Catering Mantap",
        waktu: "2026-05-13 11:30",
        foto: "https://via.placeholder.com/300x200?text=Foto+Catering",
      },
      {
        tahap: "Pengiriman",
        mitra: "Kurir Hebat",
        waktu: "2026-05-13 14:00",
        foto: "https://via.placeholder.com/300x200?text=Foto+Kurir",
      },
    ],
  },
};
