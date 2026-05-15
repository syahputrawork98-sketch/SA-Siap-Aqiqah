import React, { useState } from "react";
import { Card, CardContent, Button, EmptyState } from "@/shared/ui";
import { Search, Filter, Plus, Edit, Trash2, Eye, Drumstick } from "lucide-react";
import { formatCurrencyIdr } from "@/shared/lib";
import { MOCK_ANIMALS } from "../../model/adminDataMasterData";

export default function DataHewan() {
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [data] = useState(MOCK_ANIMALS);

  const filteredData = data.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || 
                       item.id.toLowerCase().includes(search.toLowerCase());
    const matchKategori = filterKategori === "Semua" || item.kategori === filterKategori;
    return matchSearch && matchKategori;
  });

  const stats = [
    { title: "Total Hewan", value: data.length, icon: Drumstick, color: "bg-blue-50 text-blue-600" },
    { title: "Tersedia", value: data.filter(h => h.status === 'Tersedia').length, icon: Drumstick, color: "bg-green-50 text-green-600" },
    { title: "Dalam Proses", value: data.filter(h => h.status === 'Dalam Proses').length, icon: Drumstick, color: "bg-amber-50 text-amber-600" },
    { title: "Sold Out", value: data.filter(h => h.status === 'Sold Out').length, icon: Drumstick, color: "bg-red-50 text-red-600" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#3b3b3b]">Data Master Hewan</h1>
          <p className="text-sm text-[#7a7368]">Manajemen stok hewan aqiqah dari berbagai mitra kandang.</p>
        </div>
        <Button className="w-fit" onClick={() => alert("Fitur Tambah Hewan - UI Only")}>
          <Plus size={18} />
          Tambah Hewan
        </Button>
      </div>

      {/* Stats */}
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

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 p-4 rounded-xl border border-[#eee6da]">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 text-[#7a7368]" size={18} />
          <input
            type="text"
            placeholder="Cari ID atau nama hewan..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#eee6da] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={18} className="text-[#7a7368]" />
          <select
            className="bg-white border border-[#eee6da] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)] transition-all w-full md:w-40"
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
          >
            <option value="Semua">Semua Jenis</option>
            <option value="Domba">Domba</option>
            <option value="Kambing">Kambing</option>
            <option value="Sapi">Sapi</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Card className="border border-[#eee6da] shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-[#f9f6ef] text-[#7a7368] border-b border-[#eee6da]">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Nama/Jenis</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Berat</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Harga</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Kandang</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee6da]">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-[#fefbf7] transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-[#7a7368]">{item.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#3b3b3b]">{item.nama}</span>
                          <span className="text-[10px] text-[var(--color-brand-primary)] font-bold uppercase">{item.kategori}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#555]">{item.berat}</td>
                      <td className="px-6 py-4 font-bold text-[#3b3b3b]">{formatCurrencyIdr(item.harga)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          item.status === 'Tersedia' ? 'bg-green-50 text-green-600 border-green-100' :
                          item.status === 'Dalam Proses' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-[#7a7368]">{item.kandang}</td>
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
                      <EmptyState message="Tidak ada data hewan yang ditemukan." />
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
