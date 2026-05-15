export const MOCK_DATA_MASTER_DASHBOARD = {
  counts: {
    catering: 12,
    kandang: 8,
    hewan: 450,
    paket: 15,
    menu: 32,
  },
  chartData: [
    { name: "Domba", value: 280 },
    { name: "Kambing", value: 120 },
    { name: "Sapi", value: 50 },
  ],
  activities: [
    {
      tanggal: "2026-05-15 09:30",
      mitra: "Kandang Barokah",
      aktivitas: "Update stok 20 ekor domba garut",
    },
    {
      tanggal: "2026-05-15 08:45",
      mitra: "Catering Lezat",
      aktivitas: "Input menu baru: Nasi Kebuli Spesial",
    },
    {
      tanggal: "2026-05-14 16:20",
      mitra: "Kandang Amanah",
      aktivitas: "Pendaftaran mitra kandang baru",
    },
    {
      tanggal: "2026-05-14 14:10",
      mitra: "Mitra Kurir",
      aktivitas: "Update status pengiriman ORD-00121",
    },
    {
      tanggal: "2026-05-14 10:00",
      mitra: "Admin Sistem",
      aktivitas: "Sinkronisasi data master paket",
    },
  ],
};

export const MOCK_ANIMALS = [
  { id: 'HWN-001', nama: 'Domba Garut Super', kategori: 'Domba', berat: '45kg', harga: 3500000, status: 'Tersedia', kandang: 'Kandang Barokah' },
  { id: 'HWN-002', nama: 'Kambing Etawa A', kategori: 'Kambing', berat: '38kg', harga: 2800000, status: 'Dalam Proses', kandang: 'Kandang Amanah' },
  { id: 'HWN-003', nama: 'Sapi Limousin X', kategori: 'Sapi', berat: '450kg', harga: 22000000, status: 'Tersedia', kandang: 'Kandang Mulia' },
  { id: 'HWN-004', nama: 'Domba Priangan', kategori: 'Domba', berat: '40kg', harga: 3000000, status: 'Sold Out', kandang: 'Kandang Barokah' },
  { id: 'HWN-005', nama: 'Kambing PE', kategori: 'Kambing', berat: '35kg', harga: 2500000, status: 'Tersedia', kandang: 'Kandang Amanah' },
];

export const MOCK_PENS = [
  { id: 'KND-001', nama: 'Kandang Barokah', lokasi: 'Bogor Barat', mitra: 'H. Syukri', kapasitas: 100, stok: 85, status: 'Aktif' },
  { id: 'KND-002', nama: 'Kandang Amanah', lokasi: 'Ciawi', mitra: 'Bpk. Junaedi', kapasitas: 80, stok: 60, status: 'Aktif' },
  { id: 'KND-003', nama: 'Kandang Mulia', lokasi: 'Lembang', mitra: 'Ibu Ratna', kapasitas: 150, stok: 45, status: 'Aktif' },
  { id: 'KND-004', nama: 'Kandang Sejahtera', lokasi: 'Cianjur', mitra: 'Bpk. Ahmad', kapasitas: 50, stok: 0, status: 'Tidak Aktif' },
];

export const MOCK_CATERING = [
  { id: 'CTR-001', nama: 'Catering Lezat', lokasi: 'Jakarta Selatan', mitra: 'Ibu Sarah', jumlahMenu: 15, kapasitas: '200 porsi/hari', status: 'Aktif' },
  { id: 'CTR-002', nama: 'Dapur Aqiqah', lokasi: 'Tangerang Kota', mitra: 'Bpk. Ridwan', jumlahMenu: 12, kapasitas: '150 porsi/hari', status: 'Aktif' },
  { id: 'CTR-003', nama: 'Berkah Catering', lokasi: 'Depok', mitra: 'Ibu Aminah', jumlahMenu: 10, kapasitas: '100 porsi/hari', status: 'Aktif' },
  { id: 'CTR-004', nama: 'Catering Amanah', lokasi: 'Bogor Kota', mitra: 'Bpk. Yusuf', jumlahMenu: 8, kapasitas: '80 porsi/hari', status: 'Tidak Aktif' },
];

export const MOCK_MENU = [
  { id: 'MNU-001', nama: 'Sate Kambing Spesial', kategori: 'Olahan Daging', catering: 'Catering Lezat', harga: 45000, status: 'Aktif' },
  { id: 'MNU-002', nama: 'Gule Kambing', kategori: 'Olahan Daging', catering: 'Catering Lezat', harga: 40000, status: 'Aktif' },
  { id: 'MNU-003', nama: 'Nasi Kebuli', kategori: 'Paket Nasi', catering: 'Dapur Aqiqah', harga: 35000, status: 'Aktif' },
  { id: 'MNU-004', nama: 'Tongseng Kambing', kategori: 'Olahan Daging', catering: 'Berkah Catering', harga: 42000, status: 'Aktif' },
  { id: 'MNU-005', nama: 'Nasi Putih Spesial', kategori: 'Paket Nasi', catering: 'Dapur Aqiqah', harga: 15000, status: 'Aktif' },
];

export const MOCK_PAKET = [
  { id: 'PKT-001', nama: 'Paket Bronze (Domba)', jenisHewan: 'Domba', menu: 'Sate + Gule + Nasi', harga: 2500000, status: 'Aktif' },
  { id: 'PKT-002', nama: 'Paket Silver (Domba)', jenisHewan: 'Domba', menu: 'Sate + Gule + Kebuli', harga: 2800000, status: 'Aktif' },
  { id: 'PKT-003', nama: 'Paket Gold (Kambing)', jenisHewan: 'Kambing', menu: 'Sate + Tongseng + Kebuli', harga: 3200000, status: 'Aktif' },
  { id: 'PKT-004', nama: 'Paket Sapi Ekonomis', jenisHewan: 'Sapi', menu: 'Rendang + Sop + Nasi', harga: 22000000, status: 'Aktif' },
];
