import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, Button, EmptyState } from "@/shared/ui";
import { Search, Plus, Edit, Trash2, Eye, UtensilsCrossed, MapPin, User, Star, RefreshCw, AlertCircle, Server } from "lucide-react";
import { dataMasterApi } from "../../services/dataMasterApi";

export default function DataCatering() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { search };
      const response = await dataMasterApi.getCaterings(params);
      setData(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError(err.message || "Gagal mengambil data catering.");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const stats = [
    { title: "Total Mitra", value: meta?.total || data.length, icon: UtensilsCrossed, color: "bg-blue-50 text-blue-600" },
    { title: "Aktif", value: data.filter(k => k.status === 'Aktif').length, icon: UtensilsCrossed, color: "bg-green-50 text-green-600" },
    { title: "Total Menu", value: data.reduce((acc, k) => acc + (k.jumlahMenu || 0), 0), icon: UtensilsCrossed, color: "bg-amber-50 text-amber-600" },
    { title: "Rating Rata-rata", value: "4.8", icon: Star, color: "bg-yellow-50 text-yellow-600" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold text-[#3b3b3b]">Data Master Catering</h1>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full flex items-center gap-1">
              <Server size={10} />
              Development API
            </span>
          </div>
          <p className="text-sm text-[#7a7368]">Kelola mitra catering penyedia menu aqiqah.</p>
        </div>
        <Button className="w-fit" onClick={() => alert("Fitur Tambah Catering - UI Only")}>
          <Plus size={18} />
          Tambah Catering
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

      {/* Search Area */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 p-4 rounded-xl border border-[#eee6da]">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 text-[#7a7368]" size={18} />
          <input
            type="text"
            placeholder="Cari nama, ID, atau mitra catering..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#eee6da] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="sm" onClick={fetchData} disabled={loading} title="Refresh Data">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          <span className="ml-2 text-xs">Muat Ulang</span>
        </Button>
      </div>

      {/* Table Area */}
      {error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-red-100 text-red-600 rounded-full">
              <AlertCircle size={40} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-800">Gagal Memuat Data Catering</h3>
              <p className="text-sm text-red-600 max-w-md mx-auto mt-1">{error}</p>
            </div>
            <Button variant="primary" onClick={fetchData} className="bg-red-600 hover:bg-red-700 border-none">
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-[#eee6da] shadow-sm overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw size={32} className="animate-spin text-[var(--color-brand-primary)]" />
                <span className="text-xs font-bold text-[#7a7368] uppercase tracking-widest">Sinkronisasi Data...</span>
              </div>
            </div>
          )}
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[#f9f6ef] text-[#7a7368] border-b border-[#eee6da]">
                  <tr>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Nama Catering</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Lokasi</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Mitra</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Menu</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Kapasitas</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eee6da]">
                  {data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item.id} className="hover:bg-[#fefbf7] transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-[#7a7368]">{item.id}</td>
                        <td className="px-6 py-4 font-semibold text-[#3b3b3b]">{item.nama}</td>
                        <td className="px-6 py-4 text-[#7a7368]">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-[var(--color-brand-primary)]" />
                            <span>{item.lokasi}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#555]">
                          <div className="flex items-center gap-1.5">
                            <User size={14} className="text-[#7a7368]" />
                            <span>{item.mitra}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#3b3b3b] font-medium">{item.jumlahMenu} Menu</td>
                        <td className="px-6 py-4 text-xs text-[#7a7368]">{item.kapasitas}</td>
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
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <EmptyState message={loading ? "Memuat data mitra..." : "Tidak ada data catering yang ditemukan."} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Label */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-[#aaa] font-medium uppercase tracking-widest">
        <Server size={12} />
        <span>Backend Status: API-Backed (Read-Only Mode)</span>
      </div>
    </div>
  );
}
