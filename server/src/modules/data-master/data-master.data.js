const ANIMALS = [
  { id: 'HWN-001', nama: 'Domba Garut A', kategori: 'Domba', berat: 35, harga: 2500000, status: 'Tersedia', kandang: 'KND-001' },
  { id: 'HWN-002', nama: 'Domba Garut B', kategori: 'Domba', berat: 40, harga: 2800000, status: 'Tersedia', kandang: 'KND-001' },
  { id: 'HWN-003', nama: 'Kambing Kacang A', kategori: 'Kambing', berat: 25, harga: 2200000, status: 'Dalam Proses', kandang: 'KND-002' },
  { id: 'HWN-004', nama: 'Sapi Limosin A', kategori: 'Sapi', berat: 450, harga: 22000000, status: 'Tersedia', kandang: 'KND-003' },
  { id: 'HWN-005', nama: 'Domba Priangan', kategori: 'Domba', berat: 32, harga: 2300000, status: 'Sold Out', kandang: 'KND-001' },
];

const PENS = [
  { id: 'KND-001', nama: 'Kandang Utama A', lokasi: 'Bogor - Sektor A', mitra: 'Bpk. Junaedi', kapasitas: 20, stok: 12, status: 'Aktif' },
  { id: 'KND-002', nama: 'Kandang Utama B', lokasi: 'Bogor - Sektor B', mitra: 'Bpk. Junaedi', kapasitas: 15, stok: 15, status: 'Aktif' },
  { id: 'KND-003', nama: 'Kandang Sapi C', lokasi: 'Ciawi - Sektor C', mitra: 'Bpk. Ridwan', kapasitas: 10, stok: 3, status: 'Aktif' },
  { id: 'KND-004', nama: 'Kandang Isolasi', lokasi: 'Bogor - Sektor D', mitra: 'Bpk. Junaedi', kapasitas: 5, stok: 0, status: 'Tidak Aktif' },
];

const CATERINGS = [
  { id: 'CTR-001', nama: 'Catering Lezat', lokasi: 'Jakarta Selatan', mitra: 'Ibu Sarah', jumlahMenu: 15, kapasitas: '200 porsi/hari', status: 'Aktif' },
  { id: 'CTR-002', nama: 'Dapur Aqiqah', lokasi: 'Tangerang Kota', mitra: 'Bpk. Ridwan', jumlahMenu: 12, kapasitas: '150 porsi/hari', status: 'Aktif' },
  { id: 'CTR-003', nama: 'Berkah Catering', lokasi: 'Depok', mitra: 'Ibu Aminah', jumlahMenu: 10, kapasitas: '100 porsi/hari', status: 'Aktif' },
  { id: 'CTR-004', nama: 'Catering Amanah', lokasi: 'Bogor Kota', mitra: 'Bpk. Yusuf', jumlahMenu: 8, kapasitas: '80 porsi/hari', status: 'Tidak Aktif' },
];

const MENUS = [
  { id: 'MNU-001', nama: 'Sate Kambing Spesial', kategori: 'Olahan Daging', catering: 'Catering Lezat', harga: 45000, status: 'Aktif' },
  { id: 'MNU-002', nama: 'Gule Kambing', kategori: 'Olahan Daging', catering: 'Catering Lezat', harga: 40000, status: 'Aktif' },
  { id: 'MNU-003', nama: 'Nasi Kebuli', kategori: 'Paket Nasi', catering: 'Dapur Aqiqah', harga: 35000, status: 'Aktif' },
  { id: 'MNU-004', nama: 'Tongseng Kambing', kategori: 'Olahan Daging', catering: 'Berkah Catering', harga: 42000, status: 'Aktif' },
  { id: 'MNU-005', nama: 'Nasi Putih Spesial', kategori: 'Paket Nasi', catering: 'Dapur Aqiqah', harga: 15000, status: 'Aktif' },
];

const PACKAGES = [
  { id: 'PKT-001', nama: 'Paket Bronze (Domba)', jenisHewan: 'Domba', menu: 'Sate + Gule + Nasi', harga: 2500000, status: 'Aktif' },
  { id: 'PKT-002', nama: 'Paket Silver (Domba)', jenisHewan: 'Domba', menu: 'Sate + Gule + Kebuli', harga: 2800000, status: 'Aktif' },
  { id: 'PKT-003', nama: 'Paket Gold (Kambing)', jenisHewan: 'Kambing', menu: 'Sate + Tongseng + Kebuli', harga: 3200000, status: 'Aktif' },
  { id: 'PKT-004', nama: 'Paket Sapi Ekonomis', jenisHewan: 'Sapi', menu: 'Rendang + Sop + Nasi', harga: 22000000, status: 'Aktif' },
];

module.exports = {
  ANIMALS,
  PENS,
  CATERINGS,
  MENUS,
  PACKAGES,
};
