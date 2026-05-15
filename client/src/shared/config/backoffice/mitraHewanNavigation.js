import { LayoutDashboard, Database, Bell, Settings } from "lucide-react";

export const MITRA_HEWAN_SIDEBAR_MENU = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/mitra-hewan" },
  { name: "Stok Hewan", icon: Database, path: "/mitra-hewan/stok-hewan" },
  { name: "Notifikasi", icon: Bell, path: "/mitra-hewan/notifikasi" },
  { name: "Pengaturan", icon: Settings, path: "/mitra-hewan/pengaturan" },
];
