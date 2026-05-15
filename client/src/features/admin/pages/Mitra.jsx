import React, { useState } from "react";
import { Card, CardContent, Button, EmptyState } from "@/shared/ui";
import { Search, Filter, Plus, Edit, Trash2, Eye, Users, MapPin, Briefcase } from "lucide-react";
import { MOCK_MITRA } from "../model/adminUsersData";

export default function Mitra() {
  const [search, setSearch] = useState("");
  const [filterTipe, setFilterTipe] = useState("Semua");
  const [data] = useState(MOCK_MITRA);

  const filteredData = data.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || 
                       item.mitra.toLowerCase().includes(search.toLowerCase());
    const matchTipe = filterTipe === "Semua" || item.tipe === filterTipe;
    return matchSearch && matchTipe;
  });

  const stats = [
    { title: "Total Mitra", value: data.length, icon: Users, color: "bg-blue-50 text-blue-600" },
    { title: "Mitra Kandang", value: data.filter(m => m.tipe === 'Kandang').length, icon: Briefcase, color: "bg-amber-50 text-amber-600" },
    { title: "Mitra Catering", value: data.filter(m => m.tipe === 'Catering').length, icon: Briefcase, color: "bg-green-50 text-green-600" },
    { title: "Aktif", value: data.filter(m => m.status === 'Aktif').length, icon: Users, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#3b3b3b]">Manajemen Mitra</h1>
          <p className="text-sm text-[#7a7368]">Kelola data mitra kandang dan catering yang bekerjasama.</p>
        </div>
        <Button className="w-fit" onClick={() => alert("Fitur Tambah Mitra - UI Only")}>
          <Plus size={18} />
          Tambah Mitra
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
            placeholder="Cari nama mitra atau penanggung jawab..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#eee6da] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={18} className="text-[#7a7368]" />
          <select
            className="bg-white border border-[#eee6da] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)] transition-all w-full md:w-48"
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
          >
            <option value="Semua">Semua Tipe</option>
            <option value="Kandang">Mitra Kandang</option>
            <option value="Catering">Mitra Catering</option>
          </select>
        </div>
      </div>

      <Card className="border border-[#eee6da] shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-[#f9f6ef] text-[#7a7368] border-b border-[#eee6da]">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Nama Mitra</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Tipe</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Lokasi</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Penanggung Jawab</th>
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
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                          item.tipe === 'Kandang' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-green-50 text-green-600 border-green-100'
                        }`}>
                          {item.tipe}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#7a7368]">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className="text-[var(--color-brand-primary)]" />
                          <span>{item.lokasi}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#555]">{item.mitra}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          item.status === 'Aktif' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
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
                      <EmptyState message="Tidak ada data mitra yang ditemukan." />
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
