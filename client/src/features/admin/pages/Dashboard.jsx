import React from "react";
import { Card, CardHeader, CardContent, EmptyState } from "@/shared/ui";
import { Package, CheckCircle, Clock, CreditCard } from "lucide-react";
import { DEFAULT_ADMIN_DASHBOARD } from "../model/adminDashboardData";

export default function Dashboard() {
  // Using static mock data for Batch 9
  const data = DEFAULT_ADMIN_DASHBOARD;

  return (
    <div className="space-y-6">
      {/* Judul Halaman */}
      <div>
        <h2 className="text-xl font-semibold text-[#3b3b3b] tracking-wide">
          Selamat Datang, <span className="siqah-accent-text">Admin Siqah</span>
        </h2>
        <p className="text-sm text-[#7a7368]">
          Pantau aktivitas dan data pesanan terkini (Mock Data).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={Package}
          title="Total Pesanan"
          value={data.totalPesanan}
          color="from-[#fefbf7] to-[#f9f6ef]"
        />
        <StatCard
          icon={Clock}
          title="Pesanan Diproses"
          value={data.pesananDiproses}
          color="from-[#f9f6ef] to-[#f5efe3]"
        />
        <StatCard
          icon={CreditCard}
          title="Pembayaran Menunggu"
          value={data.pembayaranMenunggu}
          color="from-[#fff9ed] to-[#f6f0e4]"
        />
        <StatCard
          icon={CheckCircle}
          title="Pesanan Selesai"
          value={data.pesananSelesai}
          color="from-[#fefcf8] to-[#f9f3e7]"
        />
      </div>

      <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm">
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#3b3b3b]">
            Pesanan Terbaru
          </h3>
          <p className="text-sm text-[#7a7368]">
            Daftar beberapa pesanan terbaru dari konsumen
          </p>
        </CardHeader>
        <CardContent>
          {data.pesananTerbaru.length === 0 ? (
            <EmptyState message="Belum ada pesanan terbaru." />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="text-left text-sm text-[#7a7368] border-b border-[#eee6da]">
                    <th className="py-2 px-3">ID Pesanan</th>
                    <th className="py-2 px-3">Nama Konsumen</th>
                    <th className="py-2 px-3">Tanggal</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pesananTerbaru.map((p) => (
                    <tr
                      key={p.id}
                      className="text-sm text-[#3b3b3b] border-b border-[#f0ebe2] hover:bg-[#f9f6ef]/60 transition-colors"
                    >
                      <td className="py-2 px-3 font-medium">{p.id}</td>
                      <td className="py-2 px-3">{p.nama}</td>
                      <td className="py-2 px-3">{p.tanggal}</td>
                      <td className="py-2 px-3">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- Komponen tambahan ---------- */

function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div
      className={`p-5 rounded-xl border border-[#eee6da] bg-gradient-to-br ${color} shadow-sm hover:shadow-md transition-all`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-[#e2b97f]/10 rounded-lg">
          <Icon size={20} className="siqah-accent-text" />
        </div>
        <p className="text-sm font-medium text-[#7a7368]">{title}</p>
      </div>
      <h4 className="text-2xl font-semibold text-[#3b3b3b]">{value}</h4>
    </div>
  );
}

function StatusBadge({ status }) {
  const base = "px-2 py-1 rounded-full text-xs font-semibold";
  switch (status) {
    case "Menunggu Pembayaran":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
          {status}
        </span>
      );
    case "Diproses":
      return (
        <span className={`${base} bg-blue-100 text-blue-700`}>
          {status}
        </span>
      );
    case "Selesai":
      return (
        <span className={`${base} bg-green-100 text-green-700`}>
          {status}
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>
      );
  }
}
