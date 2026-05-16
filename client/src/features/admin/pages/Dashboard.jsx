import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, EmptyState, Button } from "@/shared/ui";
import { Package, CheckCircle, Clock, CreditCard, RefreshCw, Server, AlertCircle } from "lucide-react";
import { orderApi } from "../services/orderApi";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryRes, ordersRes] = await Promise.all([
        orderApi.getOrderSummary(),
        orderApi.getOrders({ limit: 5 })
      ]);
      setSummary(summaryRes);
      setRecentOrders(ordersRes.data.slice(0, 5));
    } catch (err) {
      setError("Gagal sinkronisasi data dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Judul Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-semibold text-[#3b3b3b] tracking-wide">
              Selamat Datang, <span className="siqah-accent-text">Admin Siqah</span>
            </h2>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full flex items-center gap-1">
              <Server size={10} />
              Development API
            </span>
          </div>
          <p className="text-sm text-[#7a7368]">
            Pantau aktivitas dan data pesanan terkini secara real-time.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchData} disabled={loading} className="text-[#7a7368]">
          <RefreshCw size={16} className={loading ? "animate-spin mr-2" : "mr-2"} />
          Muat Ulang
        </Button>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="text-sm font-medium">{error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            icon={Package}
            title="Total Pesanan"
            value={summary?.totalOrders || 0}
            color="from-[#fefbf7] to-[#f9f6ef]"
            loading={loading}
          />
          <StatCard
            icon={Clock}
            title="Menunggu Bayar"
            value={summary?.waitingPayment || 0}
            color="from-[#fff9ed] to-[#f6f0e4]"
            loading={loading}
          />
          <StatCard
            icon={CreditCard}
            title="Sedang Diproses"
            value={summary?.processing || 0}
            color="from-[#f9f6ef] to-[#f5efe3]"
            loading={loading}
          />
          <StatCard
            icon={CheckCircle}
            title="Pesanan Selesai"
            value={summary?.completed || 0}
            color="from-[#fefcf8] to-[#f9f3e7]"
            loading={loading}
          />
        </div>
      )}

      <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <RefreshCw size={24} className="animate-spin text-[var(--color-brand-primary)]" />
          </div>
        )}
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#3b3b3b]">
            Pesanan Terbaru
          </h3>
          <p className="text-sm text-[#7a7368]">
            Daftar 5 pesanan terbaru dari konsumen
          </p>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <EmptyState message="Belum ada pesanan terbaru." />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="text-left text-xs font-bold uppercase tracking-wider text-[#7a7368] border-b border-[#eee6da]">
                    <th className="py-3 px-3">ID Pesanan</th>
                    <th className="py-3 px-3">Nama Konsumen</th>
                    <th className="py-3 px-3">Tanggal</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((p) => (
                    <tr
                      key={p.id}
                      className="text-sm text-[#3b3b3b] border-b border-[#f0ebe2] hover:bg-[#f9f6ef]/60 transition-colors"
                    >
                      <td className="py-3 px-3 font-bold">{p.id}</td>
                      <td className="py-3 px-3 font-medium">{p.nama}</td>
                      <td className="py-3 px-3 text-xs">{p.tanggal}</td>
                      <td className="py-3 px-3">
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

      {/* Info Label */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-[#aaa] font-medium uppercase tracking-widest">
        <Server size={12} />
        <span>Dashboard Status: API-Backed (Action Control Ready)</span>
      </div>
    </div>
  );
}

/* ---------- Komponen tambahan ---------- */

function StatCard({ icon: Icon, title, value, color, loading }) {
  return (
    <div
      className={`p-5 rounded-xl border border-[#eee6da] bg-gradient-to-br ${color} shadow-sm hover:shadow-md transition-all h-full`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-[#e2b97f]/10 rounded-lg">
          <Icon size={20} className="siqah-accent-text" />
        </div>
        <p className="text-sm font-medium text-[#7a7368]">{title}</p>
      </div>
      {loading ? (
        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
      ) : (
        <h4 className="text-2xl font-bold text-[#3b3b3b]">{value}</h4>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const base = "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border tracking-tight inline-flex items-center gap-1";
  switch (status) {
    case "Menunggu Konfirmasi":
    case "Menunggu Pembayaran":
      return (
        <span className={`${base} bg-amber-50 text-amber-600 border-amber-100`}>
          <Clock size={10} /> {status}
        </span>
      );
    case "Dikonfirmasi":
    case "Diproses":
      return (
        <span className={`${base} bg-blue-50 text-blue-600 border-blue-100`}>
          <Package size={10} /> {status}
        </span>
      );
    case "Selesai":
      return (
        <span className={`${base} bg-emerald-50 text-emerald-600 border-emerald-100`}>
          <CheckCircle size={10} /> {status}
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-50 text-gray-700 border-gray-100`}>{status}</span>
      );
  }
}

