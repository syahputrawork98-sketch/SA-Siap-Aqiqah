import React, { useState } from "react";
import { Card, CardContent, Button, EmptyState } from "@/shared/ui";
import { Search, Plus, Edit, Trash2, Eye, User, Phone, Mail, ShoppingBag } from "lucide-react";
import { MOCK_KONSUMEN } from "../model/adminUsersData";

export default function Konsumen() {
  const [search, setSearch] = useState("");
  const [data] = useState(MOCK_KONSUMEN);

  const filteredData = data.filter((item) => {
    return item.nama.toLowerCase().includes(search.toLowerCase()) || 
           item.email.toLowerCase().includes(search.toLowerCase()) ||
           item.kontak.includes(search);
  });

  const stats = [
    { title: "Total Konsumen", value: data.length, icon: User, color: "bg-blue-50 text-blue-600" },
    { title: "Konsumen Aktif", value: data.filter(c => c.status === 'Aktif').length, icon: User, color: "bg-green-50 text-green-600" },
    { title: "Total Pesanan", value: data.reduce((acc, c) => acc + c.totalPesanan, 0), icon: ShoppingBag, color: "bg-amber-50 text-amber-600" },
    { title: "Konsumen Baru", value: data.filter(c => c.status === 'Baru').length, icon: User, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#3b3b3b]">Manajemen Konsumen</h1>
          <p className="text-sm text-[#7a7368]">Kelola data pelanggan dan riwayat pesanan singkat.</p>
        </div>
        <Button className="w-fit" onClick={() => alert("Fitur Tambah Konsumen - UI Only")}>
          <Plus size={18} />
          Tambah Konsumen
        </Button>
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
                <h3 className="text-2xl font-bold text-[#3b3b3b]">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 p-4 rounded-xl border border-[#eee6da]">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 text-[#7a7368]" size={18} />
          <input
            type="text"
            placeholder="Cari nama, email, atau kontak konsumen..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#eee6da] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card className="border border-[#eee6da] shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-[#f9f6ef] text-[#7a7368] border-b border-[#eee6da]">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Nama Konsumen</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Kontak</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Pesanan</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee6da]">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-[#fefbf7] transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-[#7a7368]">{item.id}</td>
                      <td className="px-6 py-4 font-semibold text-[#3b3b3b]">{item.nama}</td>
                      <td className="px-6 py-4 text-[#7a7368]">
                        <div className="flex items-center gap-1.5">
                          <Phone size={14} className="text-[#aaa]" />
                          <span>{item.kontak}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#7a7368]">
                        <div className="flex items-center gap-1.5">
                          <Mail size={14} className="text-[#aaa]" />
                          <span className="text-xs">{item.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-[#3b3b3b]">{item.totalPesanan}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          item.status === 'Aktif' ? 'bg-green-50 text-green-600 border-green-100' : 
                          item.status === 'Baru' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Detail">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <EmptyState message="Tidak ada data konsumen yang ditemukan." />
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
