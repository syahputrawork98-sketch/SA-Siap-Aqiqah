import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardHeader, CardContent } from "@/shared/ui";
import { Search, Filter, Eye, CheckCircle, Clock, Package, RefreshCw, AlertCircle, Server } from "lucide-react";
import { orderApi } from "../services/orderApi";

export default function Pesanan() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [dataPesanan, setDataPesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        search,
        status: filterStatus === "Semua" ? undefined : filterStatus
      };
      const response = await orderApi.getOrders(params);
      setDataPesanan(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError(err.message || "Gagal mengambil data pesanan.");
    } finally {
      setLoading(false);
    }
  }, [search, filterStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchData]);

  return (
    <div className="space-y-6">
      {/* Judul halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-semibold text-[#3b3b3b] tracking-wide">
              Manajemen <span className="siqah-accent-text">Pesanan</span>
            </h2>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full flex items-center gap-1">
              <Server size={10} />
              Development API
            </span>
          </div>
          <p className="text-sm text-[#7a7368]">
            Lihat, filter, dan kelola data pesanan konsumen secara dinamis.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchData} disabled={loading} className="text-[#7a7368]">
          <RefreshCw size={16} className={loading ? "animate-spin mr-2" : "mr-2"} />
          Muat Ulang
        </Button>
      </div>

      {/* Filter dan pencarian */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-1/3">
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-[#7a7368]"
          />
          <input
            type="text"
            placeholder="Cari ID atau nama konsumen..."
            className="w-full pl-9 pr-3 py-2 border border-[#eee6da] rounded-lg text-sm bg-white/70 focus:ring-2 focus:ring-[#e2b97f]/40 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[#7a7368]" />
          <select
            className="border border-[#eee6da] bg-white/70 rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-[#e2b97f]/40 focus:outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      {/* Konten Utama */}
      {error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-red-100 text-red-600 rounded-full">
              <AlertCircle size={40} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-800">Gagal Memuat Pesanan</h3>
              <p className="text-sm text-red-600 max-w-md mx-auto mt-1">{error}</p>
            </div>
            <Button variant="primary" onClick={fetchData} className="bg-red-600 hover:bg-red-700 border-none">
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw size={32} className="animate-spin text-[var(--color-public-accent)]" />
                <span className="text-xs font-bold text-[#7a7368] uppercase tracking-widest">Sinkronisasi Pesanan...</span>
              </div>
            </div>
          )}
          <CardHeader>
            <h3 className="text-lg font-semibold text-[#3b3b3b]">
              Daftar Pesanan
            </h3>
            <p className="text-sm text-[#7a7368]">
              Menampilkan {meta?.filtered || dataPesanan.length} pesanan dari total {meta?.total || dataPesanan.length}.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="text-[11px] text-[#7a7368] border-b border-[#eee6da] uppercase tracking-wider">
                    <th className="py-3 px-3 text-left font-bold">Pesanan</th>
                    <th className="py-3 px-3 text-left font-bold">Konsumen</th>
                    <th className="py-3 px-3 text-left font-bold">Jadwal</th>
                    <th className="py-3 px-3 text-left font-bold">Status Utama</th>
                    <th className="py-3 px-3 text-left font-bold">Pembayaran</th>
                    <th className="py-3 px-3 text-left font-bold">Timeline 1 (Mitra)</th>
                    <th className="py-3 px-3 text-left font-bold">Timeline 2 (Progres)</th>
                    <th className="py-3 px-3 text-center font-bold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ebe2]">
                  {dataPesanan.length > 0 ? (
                    dataPesanan.map((p) => (
                      <tr
                        key={p.id}
                        onClick={() => navigate(`/admin/pesanan/${p.id}`)}
                        className="text-sm text-[#3b3b3b] hover:bg-blue-50/50 cursor-pointer transition-colors group"
                      >
                        <td className="py-3 px-3">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#3b3b3b] group-hover:text-blue-600 transition-colors">{p.id}</span>
                            <span className="text-[10px] text-[#7a7368]">{p.paket}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex flex-col">
                            <span className="font-medium">{p.nama}</span>
                            <span className="text-[10px] text-[#7a7368]">{p.customerPhone}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-xs">{p.tanggal}</span>
                        </td>
                        <td className="py-3 px-3">
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="py-3 px-3">
                          <StatusBadge status={p.paymentStatus} type="payment" />
                        </td>
                        <td className="py-3 px-3">
                          <TimelineIndicator1 confirmations={p.konfirmasiMitra} />
                        </td>
                        <td className="py-3 px-3">
                          <TimelineIndicator2 progress={p.progress} />
                        </td>
                        <td className="py-3 px-3 text-center">
                          <Button variant="ghost" size="sm" className="mx-auto text-[var(--color-public-accent)] hover:text-blue-600 px-2 group-hover:bg-blue-100/50">
                            <Eye size={14} className="mr-1" />
                            <span className="text-xs font-bold">Buka</span>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center text-[#7a7368] py-10 text-sm italic"
                      >
                        {loading ? "Memuat data..." : "Tidak ada data pesanan yang sesuai dengan filter."}
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

function StatusBadge({ status, type = "order" }) {
  const base =
    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 border";
  
  if (type === "payment") {
    switch (status) {
      case "Lunas":
      case "Valid (DP)":
      case "PAID_DP":
      case "PAID_FULL":
        return <span className={`${base} bg-emerald-50 text-emerald-600 border-emerald-100`}>{status === 'PAID_DP' ? 'Valid (DP)' : (status === 'PAID_FULL' ? 'Lunas' : status)}</span>;
      case "Belum Bayar":
      case "UNPAID":
        return <span className={`${base} bg-amber-50 text-amber-600 border-amber-100`}>Belum Bayar</span>;
      default:
        return <span className={`${base} bg-gray-50 text-gray-600 border-gray-100`}>{status}</span>;
    }
  }

  const map = {
    'PENDING_CONFIRMATION': 'Menunggu Konfirmasi',
    'AWAITING_PAYMENT': 'Menunggu Pembayaran',
    'PROCESSING': 'Diproses',
    'ON_DELIVERY': 'Dalam Pengiriman',
    'DELIVERED': 'Telah Sampai',
    'COMPLETED': 'Selesai',
    'CANCELLED': 'Dibatalkan',
    'Menunggu Konfirmasi': 'Menunggu Konfirmasi',
    'Menunggu Pembayaran': 'Menunggu Pembayaran',
    'Diproses': 'Diproses',
    'Dalam Pengiriman': 'Dalam Pengiriman',
    'Telah Sampai': 'Telah Sampai',
    'Selesai': 'Selesai',
  };

  const friendlyStatus = map[status] || status;

  switch (friendlyStatus) {
    case "Menunggu Pembayaran":
      return (
        <span className={`${base} bg-indigo-50 text-indigo-600 border-indigo-100`}>
          <Clock size={10} /> {friendlyStatus}
        </span>
      );
    case "Menunggu Konfirmasi":
      return (
        <span className={`${base} bg-amber-50 text-amber-600 border-amber-100`}>
          <Clock size={10} /> {friendlyStatus}
        </span>
      );
    case "Dikonfirmasi":
    case "Diproses":
    case "Dalam Pengiriman":
      return (
        <span className={`${base} bg-blue-50 text-blue-600 border-blue-100`}>
          <Package size={10} /> {friendlyStatus}
        </span>
      );
    case "Telah Sampai":
    case "Selesai":
      return (
        <span className={`${base} bg-emerald-50 text-emerald-600 border-emerald-100`}>
          <CheckCircle size={10} /> {friendlyStatus}
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-50 text-gray-600 border-gray-100`}>{friendlyStatus}</span>
      );
  }
}

function TimelineIndicator1({ confirmations = [] }) {
  const roles = ["MITRA_KANDANG", "MITRA_CATERING", "MITRA_KURIR"];
  return (
    <div className="flex gap-1">
      {roles.map(role => {
        const conf = confirmations.find(c => c.peran === role);
        const isAccepted = conf?.status === "ACCEPTED";
        return (
          <div 
            key={role} 
            title={`${role}: ${conf?.status || "PENDING"}`}
            className={`w-2 h-2 rounded-full ${isAccepted ? "bg-emerald-500" : "bg-gray-200"}`}
          />
        );
      })}
    </div>
  );
}

function TimelineIndicator2({ progress = [] }) {
  const steps = progress.length;
  const done = progress.filter(p => p.status === "DONE").length;
  
  return (
    <div className="flex flex-col gap-1 w-24">
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--color-public-accent)]" 
          style={{ width: `${steps > 0 ? (done / steps) * 100 : 0}%` }}
        />
      </div>
      <span className="text-[9px] text-[#7a7368] font-medium">{done}/{steps} Selesai</span>
    </div>
  );
}

