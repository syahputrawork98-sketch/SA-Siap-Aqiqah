import {
  LayoutDashboard,
  Package,
  CreditCard,
  Database,
  Users,
  Bell,
  Settings,
  BarChart3,
} from "lucide-react";

export const ADMIN_SIDEBAR_MENU = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Pesanan", icon: Package, path: "/admin/pesanan" },
  {
    name: "Data Master",
    icon: Database,
    children: [
      { name: "Dashboard Data", path: "/admin/data-master/dashboard" },
      { name: "Data Kandang", path: "/admin/data-master/kandang" },
      { name: "Data Hewan", path: "/admin/data-master/hewan" },
      { name: "Data Catering", path: "/admin/data-master/catering" },
      { name: "Data Paket", path: "/admin/data-master/paket" },
      { name: "Data Menu", path: "/admin/data-master/menu" },
    ],
  },
  {
    name: "Pembayaran",
    icon: CreditCard,
    children: [
      { name: "Dashboard Pembayaran", path: "/admin/pembayaran" },
      { name: "Data Pengajuan", path: "/admin/pembayaran/pengajuan" },
      { name: "Data Invoice", path: "/admin/pembayaran/invoice" },
      { name: "Data Pembayaran", path: "/admin/pembayaran/data" },
    ],
  },
  {
    name: "Manajemen User",
    icon: Users,
    children: [
      { name: "Data Konsumen", path: "/admin/users/konsumen" },
      { name: "Data Mitra", path: "/admin/users/mitra" },
      { name: "Data Staff", path: "/admin/users/staff" },
    ],
  },
  { name: "Laporan", icon: BarChart3, path: "/admin/laporan" },
  { name: "Notifikasi", icon: Bell, path: "/admin/notifikasi" },
  { name: "Pengaturan", icon: Settings, path: "/admin/pengaturan" },
];
