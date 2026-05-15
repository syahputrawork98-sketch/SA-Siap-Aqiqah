const ANIMALS = [
  { id: 'HWN-001', nama: 'Domba Garut A', jenis: 'Domba', berat: 35, harga: 2500000, status: 'Tersedia', kandang: 'KND-001' },
  { id: 'HWN-002', nama: 'Domba Garut B', jenis: 'Domba', berat: 40, harga: 2800000, status: 'Tersedia', kandang: 'KND-001' },
  { id: 'HWN-003', nama: 'Kambing Kacang A', jenis: 'Kambing', berat: 25, harga: 2200000, status: 'Dipesan', kandang: 'KND-002' },
  { id: 'HWN-004', nama: 'Sapi Limosin A', jenis: 'Sapi', berat: 450, harga: 22000000, status: 'Tersedia', kandang: 'KND-003' },
];

const PENS = [
  { id: 'KND-001', lokasi: 'Kandang Utama - Sektor A', kapasitas: 20, terisi: 12, status: 'Aktif' },
  { id: 'KND-002', lokasi: 'Kandang Utama - Sektor B', kapasitas: 15, terisi: 15, status: 'Penuh' },
  { id: 'KND-003', lokasi: 'Kandang Sapi - Sektor C', kapasitas: 10, terisi: 3, status: 'Aktif' },
];

const CATERINGS = [
  { id: 'CTR-001', nama: 'Catering Lezat', lokasi: 'Jakarta Selatan', mitra: 'Ibu Sarah', jumlahMenu: 15, kapasitas: '200 porsi/hari', status: 'Aktif' },
  { id: 'CTR-002', nama: 'Dapur Aqiqah', lokasi: 'Tangerang Kota', mitra: 'Bpk. Ridwan', jumlahMenu: 12, kapasitas: '150 porsi/hari', status: 'Aktif' },
];

const MENUS = [
  { id: 'MNU-001', nama: 'Sate Kambing Spesial', kategori: 'Olahan Daging', catering: 'Catering Lezat', harga: 45000, status: 'Aktif' },
  { id: 'MNU-002', nama: 'Gule Kambing', kategori: 'Olahan Daging', catering: 'Catering Lezat', harga: 40000, status: 'Aktif' },
  { id: 'MNU-003', nama: 'Nasi Kebuli', kategori: 'Paket Nasi', catering: 'Dapur Aqiqah', harga: 35000, status: 'Aktif' },
];

const PACKAGES = [
  { id: 'PKT-001', nama: 'Paket Bronze (Domba)', jenisHewan: 'Domba', menu: 'Sate + Gule + Nasi', harga: 2500000, status: 'Aktif' },
  { id: 'PKT-002', nama: 'Paket Silver (Domba)', jenisHewan: 'Domba', menu: 'Sate + Gule + Kebuli', harga: 2800000, status: 'Aktif' },
  { id: 'PKT-003', nama: 'Paket Gold (Kambing)', jenisHewan: 'Kambing', menu: 'Sate + Tongseng + Kebuli', harga: 3200000, status: 'Aktif' },
];

module.exports = {
  ANIMALS,
  PENS,
  CATERINGS,
  MENUS,
  PACKAGES,
};
