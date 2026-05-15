import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  EmptyState,
} from "@/shared/ui";
import { formatCurrencyIdr } from "@/shared/lib";
import {
  ArrowLeft,
  CreditCard,
  Package,
  User,
  Truck,
  Utensils,
  Camera,
  CheckCircle,
  Clock,
  RefreshCw,
  AlertCircle,
  Server
} from "lucide-react";
import { orderApi } from "../services/orderApi";

export default function DetailPesanan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pesanan, setPesanan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderApi.getOrderById(id);
      if (response.success) {
        setPesanan(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || "Gagal mengambil detail pesanan.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <RefreshCw size={40} className="animate-spin text-[var(--color-brand-primary)]" />
        <p className="text-sm font-bold text-[#7a7368] uppercase tracking-widest">Memuat Detail Pesanan...</p>
      </div>
    );
  }

  if (error || !pesanan) {
    return (
      <div className="space-y-6">
        <Button onClick={() => navigate(-1)} variant="ghost">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Kembali</span>
        </Button>
        {error && !error.includes("not found") ? (
           <Card className="border-red-200 bg-red-50">
           <CardContent className="p-12 flex flex-col items-center justify-center text-center space-y-4">
             <div className="p-4 bg-red-100 text-red-600 rounded-full">
               <AlertCircle size={40} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-red-800">Gagal Memuat Detail</h3>
               <p className="text-sm text-red-600 max-w-md mx-auto mt-1">{error}</p>
             </div>
             <Button variant="primary" onClick={fetchDetail} className="bg-red-600 hover:bg-red-700 border-none">
               Coba Lagi
             </Button>
           </CardContent>
         </Card>
        ) : (
          <EmptyState message={error || `Detail pesanan dengan ID ${id} tidak ditemukan.`} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="hover:text-[var(--color-brand-primary)]"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Kembali</span>
        </Button>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full flex items-center gap-1">
          <Server size={12} />
          Development API (Read-Only)
        </span>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[#3b3b3b] tracking-wide">
          Detail <span className="siqah-accent-text">Pesanan</span>
        </h2>
        <p className="text-sm text-[#7a7368]">
          ID Pesanan: <strong className="text-[#3b3b3b]">{id}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informasi Utama */}
        <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm h-full">
          <CardHeader>
            <h3 className="text-lg font-semibold text-[#3b3b3b]">Informasi Pesanan</h3>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[#3b3b3b]">
            <div className="flex justify-between border-b border-[#f0ebe2] pb-2">
              <span className="text-[#7a7368]">Paket</span>
              <span className="font-semibold text-[var(--color-brand-primary)]">{pesanan.paket}</span>
            </div>
            <div className="flex justify-between border-b border-[#f0ebe2] pb-2">
              <span className="text-[#7a7368]">Tanggal Pesanan</span>
              <span className="font-medium">{pesanan.tanggal}</span>
            </div>
            <div className="flex justify-between border-b border-[#f0ebe2] pb-2">
              <span className="text-[#7a7368]">Total Bayar</span>
              <span className="font-bold text-[var(--color-brand-primary)]">
                {formatCurrencyIdr(pesanan.total)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#7a7368]">Status Pesanan</span>
              <StatusBadge status={pesanan.status} />
            </div>
          </CardContent>
        </Card>

        {/* Data Konsumen */}
        <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm h-full">
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#3b3b3b]">
              <User size={18} className="siqah-accent-text" /> Data Konsumen
            </h3>
          </CardHeader>
          <CardContent className="text-sm text-[#3b3b3b] space-y-3">
            <div className="flex gap-4">
              <div className="w-20 text-[#7a7368]">Nama</div>
              <div className="flex-1 font-medium">{pesanan.konsumen?.nama || pesanan.nama}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-20 text-[#7a7368]">Telepon</div>
              <div className="flex-1 font-medium">{pesanan.konsumen?.telepon || pesanan.customerPhone}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-20 text-[#7a7368]">Alamat</div>
              <div className="flex-1 text-[#555] leading-relaxed">
                {pesanan.konsumen?.alamat || "Alamat belum tersedia di development API."}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pembayaran */}
        <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#3b3b3b]">
              <CreditCard size={18} className="siqah-accent-text" /> Informasi Pembayaran
            </h3>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-[#f0ebe2] pb-2">
                <span className="text-[#7a7368]">Status Pembayaran</span>
                <StatusBadge status={pesanan.pembayaran?.status || pesanan.paymentStatus} />
              </div>
              <div className="flex justify-between border-b border-[#f0ebe2] pb-2">
                <span className="text-[#7a7368]">Metode Pembayaran</span>
                <span className="font-medium">{pesanan.pembayaran?.metode || "Transfer Bank"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-[#7a7368] block">Bukti Pembayaran:</span>
              {pesanan.pembayaran?.bukti ? (
                <img
                  src={pesanan.pembayaran.bukti}
                  alt="Bukti Pembayaran"
                  className="max-w-[200px] rounded-lg border border-[#eee6da] shadow-sm"
                />
              ) : (
                <div className="p-4 border border-dashed border-[#eee6da] rounded-lg text-xs text-[#7a7368] italic">
                  Bukti pembayaran belum diunggah.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress Pesanan */}
        {pesanan.progress && (
          <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm lg:col-span-2">
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#3b3b3b]">
                <Package size={18} className="siqah-accent-text" /> Progress Operasional
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pesanan.progress.map((p, idx) => (
                  <div
                    key={`${p.tahap}-${idx}`}
                    className="p-4 border border-[#eee6da] rounded-xl bg-white/50 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3 text-[#3b3b3b] font-semibold mb-3">
                      <div className="p-2 bg-[#e2b97f]/10 rounded-lg group-hover:bg-[#e2b97f]/20 transition-colors">
                        {p.tahap.includes("Penyembelihan") ? (
                          <Camera size={18} className="siqah-accent-text" />
                        ) : p.tahap.includes("Catering") ? (
                          <Utensils size={18} className="siqah-accent-text" />
                        ) : (
                          <Truck size={18} className="siqah-accent-text" />
                        )}
                      </div>
                      <span className="text-sm uppercase tracking-tight">{p.tahap}</span>
                    </div>
                    <div className="space-y-1 mb-4">
                      <p className="text-xs text-[#7a7368]">
                        Mitra: <span className="font-semibold text-[#3b3b3b]">{p.mitra}</span>
                      </p>
                      <p className="text-xs text-[#7a7368]">
                        Waktu: <span className="font-medium">{p.waktu}</span>
                      </p>
                    </div>
                    <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#eee6da] bg-white">
                      <img
                        src={p.foto}
                        alt={p.tahap}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Info Label */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-[#aaa] font-medium uppercase tracking-widest">
        <Server size={12} />
        <span>Backend Status: API-Backed (Read-Only Mode)</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const base =
    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5";
  switch (status) {
    case "Menunggu Pembayaran":
    case "Belum Bayar":
      return (
        <span className={`${base} bg-amber-50 text-amber-600 border border-amber-100`}>
          <Clock size={14} /> {status}
        </span>
      );
    case "Diproses":
      return (
        <span className={`${base} bg-blue-50 text-blue-600 border border-blue-100`}>
          <Package size={14} /> {status}
        </span>
      );
    case "Selesai":
    case "Diterima":
    case "Lunas":
    case "Valid":
      return (
        <span className={`${base} bg-emerald-50 text-emerald-600 border border-emerald-100`}>
          <CheckCircle size={14} /> {status}
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-50 text-gray-600 border border-gray-100`}>
          {status}
        </span>
      );
  }
}
