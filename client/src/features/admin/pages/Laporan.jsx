import React, { useState } from "react";
import { Card, CardContent, Button, EmptyState } from "@/shared/ui";
import { FileText, TrendingUp, Clock, CheckCircle, Filter, Download, Eye } from "lucide-react";
import { formatCurrencyIdr } from "@/shared/lib";
import { MOCK_REPORTS } from "../model/adminSupportData";

export default function Laporan() {
  const [periode, setPeriode] = useState("Bulan Ini");
  const [data] = useState(MOCK_REPORTS);

  const stats = [
    { title: "Total Pesanan", value: 45, icon: FileText, color: "bg-blue-50 text-blue-600" },
    { title: "Total Pendapatan", value: formatCurrencyIdr(112500000), icon: TrendingUp, color: "bg-green-50 text-green-600" },
    { title: "Menunggu Validasi", value: 8, icon: Clock, color: "bg-amber-50 text-amber-600" },
    { title: "Pesanan Selesai", value: 32, icon: CheckCircle, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#3b3b3b]">Laporan Operasional</h1>
          <p className="text-sm text-[#7a7368]">Ringkasan performa pesanan dan pendapatan bisnis.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => alert("Fitur Export PDF - UI Only")}>
            <Download size={18} />
            Export PDF
          </Button>
          <Button variant="primary" onClick={() => alert("Fitur Export Excel - UI Only")}>
            <Download size={18} />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-[#eee6da] shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#7a7368] uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-xl font-bold text-[#3b3b3b]">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 p-4 rounded-xl border border-[#eee6da]">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={18} className="text-[#7a7368]" />
          <select
            className="bg-white border border-[#eee6da] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)] transition-all w-full md:w-48"
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
          >
            <option value="Hari Ini">Hari Ini</option>
            <option value="Minggu Ini">Minggu Ini</option>
            <option value="Bulan Ini">Bulan Ini</option>
            <option value="Tahun Ini">Tahun Ini</option>
          </select>
        </div>
      </div>

      <Card className="border border-[#eee6da] shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-[#f9f6ef] text-[#7a7368] border-b border-[#eee6da]">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">ID Laporan</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Periode</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Total Pesanan</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Total Pendapatan</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee6da]">
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id} className="hover:bg-[#fefbf7] transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-[#7a7368]">{item.id}</td>
                      <td className="px-6 py-4 font-semibold text-[#3b3b3b]">{item.periode}</td>
                      <td className="px-6 py-4 text-[#3b3b3b]">{item.totalPesanan} Pesanan</td>
                      <td className="px-6 py-4 font-bold text-[var(--color-brand-primary)]">{formatCurrencyIdr(item.totalPendapatan)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          item.status === 'Final' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Detail">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <EmptyState message="Tidak ada data laporan yang ditemukan." />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
