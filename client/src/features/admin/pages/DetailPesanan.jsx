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
import { paymentApi } from "../services/paymentApi";

export default function DetailPesanan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pesanan, setPesanan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

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

  const handleUpdatePartnerStatus = async (confId, status) => {
    const actionKey = `partner-${confId}`;
    if (actionLoading[actionKey]) return;
    
    if (!window.confirm(`Apakah Anda yakin ingin mengubah status mitra menjadi ${status}?`)) return;

    setActionLoading(prev => ({ ...prev, [actionKey]: true }));
    try {
      await orderApi.updatePartnerConfirmationStatus(pesanan.id, confId, { 
        status,
        notesPartner: status === 'REJECTED' ? 'Ditolak oleh Admin' : 'Disetujui oleh Admin'
      });
      await fetchDetail();
    } catch (err) {
      alert(err.message || "Gagal mengubah status mitra.");
    } finally {
      setActionLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  };

  const handleVerifyPayment = async () => {
    const actionKey = 'verify-payment';
    if (actionLoading[actionKey]) return;

    if (!window.confirm("Verifikasi pembayaran ini? Order akan masuk ke tahap pemrosesan.")) return;

    setActionLoading(prev => ({ ...prev, [actionKey]: true }));
    try {
      const paymentId = pesanan.pembayaran.id || id; // Fallback if id not available in mapOrder yet
      await paymentApi.verifyPayment(paymentId, { adminNote: "Verified by Admin" });
      await fetchDetail();
    } catch (err) {
      alert(err.message || "Gagal verifikasi pembayaran.");
    } finally {
      setActionLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  };

  const handleRejectPayment = async () => {
    const actionKey = 'reject-payment';
    if (actionLoading[actionKey]) return;

    const reason = window.prompt("Alasan penolakan pembayaran:");
    if (reason === null) return;

    setActionLoading(prev => ({ ...prev, [actionKey]: true }));
    try {
      const paymentId = pesanan.pembayaran.id || id;
      await paymentApi.rejectPayment(paymentId, { adminNote: reason });
      await fetchDetail();
    } catch (err) {
      alert(err.message || "Gagal menolak pembayaran.");
    } finally {
      setActionLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  };

  const handleUpdateTimelineStatus = async (eventId, status) => {
    const actionKey = `timeline-${eventId}`;
    if (actionLoading[actionKey]) return;

    setActionLoading(prev => ({ ...prev, [actionKey]: true }));
    try {
      await orderApi.updateTimelineEventStatus(pesanan.id, eventId, { 
        status,
        updatedBy: 'ADMIN'
      });
      await fetchDetail();
    } catch (err) {
      alert(err.message || "Gagal update status timeline.");
    } finally {
      setActionLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  };

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
        <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full flex items-center gap-1">
          <Server size={12} />
          Admin Action Control Active
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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#3b3b3b]">
                <CreditCard size={18} className="siqah-accent-text" /> Informasi Pembayaran
              </h3>
              {pesanan.pembayaran?.status === 'UNPAID' && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-600 hover:bg-red-50"
                    onClick={handleRejectPayment}
                    isLoading={actionLoading['reject-payment']}
                  >
                    Tolak
                  </Button>
                  <Button 
                    size="sm" 
                    variant="primary"
                    onClick={handleVerifyPayment}
                    isLoading={actionLoading['verify-payment']}
                  >
                    Verifikasi
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-[#f0ebe2] pb-2">
                <span className="text-[#7a7368]">Status Pembayaran</span>
                <StatusBadge status={pesanan.pembayaran?.status || pesanan.paymentStatus} type="payment" />
              </div>
              <div className="flex justify-between border-b border-[#f0ebe2] pb-2">
                <span className="text-[#7a7368]">Metode Pembayaran</span>
                <span className="font-medium">{pesanan.pembayaran?.metode || "Transfer Bank"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-[#7a7368] block">Bukti Pembayaran:</span>
              {pesanan.pembayaran?.bukti ? (
                <div className="relative group">
                  <img
                    src={pesanan.pembayaran.bukti}
                    alt="Bukti Pembayaran"
                    className="max-w-[200px] rounded-lg border border-[#eee6da] shadow-sm"
                  />
                  <a 
                    href={pesanan.pembayaran.bukti} 
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
                  >
                    <span className="text-white text-[10px] font-bold uppercase">Lihat Full</span>
                  </a>
                </div>
              ) : (
                <div className="p-4 border border-dashed border-[#eee6da] rounded-lg text-xs text-[#7a7368] italic">
                  Bukti pembayaran belum diunggah.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timeline 1: Konfirmasi Mitra */}
        <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#3b3b3b]">
                <Clock size={18} className="siqah-accent-text" /> Tahap 1: Konfirmasi Persiapan (Pra-Proses)
              </h3>
              <span className="text-[10px] bg-[#eee6da] text-[#7a7368] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                System Timeline 1
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["MITRA_KANDANG", "MITRA_CATERING", "MITRA_KURIR"].map((role) => {
                const conf = pesanan.konfirmasiMitra?.find(c => c.peran === role);
                const actionKey = `partner-${conf?.id}`;
                return (
                  <div key={role} className="p-4 border border-[#eee6da] rounded-xl bg-white/50">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[#7a7368] uppercase tracking-widest">{role.replace("MITRA_", "")}</span>
                        {conf?.status === 'PENDING' && (
                          <div className="flex gap-1">
                            <button 
                              onClick={() => handleUpdatePartnerStatus(conf.id, 'REJECTED')}
                              disabled={actionLoading[actionKey]}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                              title="Tolak"
                            >
                              <AlertCircle size={14} />
                            </button>
                            <button 
                              onClick={() => handleUpdatePartnerStatus(conf.id, 'ACCEPTED')}
                              disabled={actionLoading[actionKey]}
                              className="p-1 text-emerald-500 hover:bg-emerald-50 rounded transition-colors"
                              title="Terima"
                            >
                              <CheckCircle size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                         <StatusBadge status={conf?.status || "PENDING"} type="confirmation" />
                         {conf?.waktu && <span className="text-[9px] text-[#aaa]">{new Date(conf.waktu).toLocaleDateString()}</span>}
                      </div>
                      {conf?.catatan && <p className="text-[11px] text-[#7a7368] italic mt-1">"{conf.catatan}"</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Timeline 2: Fulfillment Process */}
        <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm lg:col-span-2">
          <CardHeader>
             <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#3b3b3b]">
                <Package size={18} className="siqah-accent-text" /> Tahap 2: Fulfillment & Produksi
              </h3>
              <div className="flex items-center gap-3">
                {['PROCESSING', 'ON_DELIVERY', 'DELIVERED'].includes(pesanan.pembayaran?.status === 'PAID_DP' || pesanan.pembayaran?.status === 'PAID_FULL' ? 'PROCESSING' : 'WAITING') && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/20 hover:bg-[var(--color-brand-primary)]/5"
                    onClick={async () => {
                      const title = window.prompt("Nama Milestone (misal: Penyembelihan Selesai):");
                      if (!title) return;
                      const eventKey = window.prompt("Event Key (misal: SEMBELIH_DONE, COOKING_DONE, PICKUP, DELIVERED):");
                      if (!eventKey) return;
                      
                      const actionKey = 'add-timeline';
                      setActionLoading(prev => ({ ...prev, [actionKey]: true }));
                      try {
                        await orderApi.createTimelineEvent(pesanan.id, {
                          title,
                          eventKey,
                          status: 'DONE',
                          updatedBy: 'ADMIN'
                        });
                        await fetchDetail();
                      } catch (err) {
                        alert(err.message || "Gagal menambah milestone.");
                      } finally {
                        setActionLoading(prev => ({ ...prev, [actionKey]: false }));
                      }
                    }}
                    isLoading={actionLoading['add-timeline']}
                  >
                    + Tambah Progres
                  </Button>
                )}
                <span className="text-[10px] bg-[#e2b97f]/20 text-[var(--color-brand-primary)] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[var(--color-brand-primary)]/20">
                  Timeline 2 (Produksi)
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {pesanan.progress && pesanan.progress.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pesanan.progress.map((p, idx) => {
                  const actionKey = `timeline-${p.id}`;
                  return (
                    <div
                      key={`${p.tahap}-${idx}`}
                      className="p-4 border border-[#eee6da] rounded-xl bg-white/50 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center justify-between gap-3 text-[#3b3b3b] font-semibold mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#e2b97f]/10 rounded-lg group-hover:bg-[#e2b97f]/20 transition-colors">
                            {p.tahap.toLowerCase().includes("sembelih") ? (
                              <Camera size={18} className="siqah-accent-text" />
                            ) : p.tahap.toLowerCase().includes("catering") ? (
                              <Utensils size={18} className="siqah-accent-text" />
                            ) : (
                              <Truck size={18} className="siqah-accent-text" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-tight">{p.tahap}</span>
                            <StatusBadge status={p.status} />
                          </div>
                        </div>
                        {p.status !== 'DONE' && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-emerald-600 p-1"
                            onClick={() => handleUpdateTimelineStatus(p.id, 'DONE')}
                            isLoading={actionLoading[actionKey]}
                          >
                            <CheckCircle size={16} />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-1 mb-4">
                        <p className="text-xs text-[#7a7368]">
                          Mitra: <span className="font-semibold text-[#3b3b3b]">{p.mitra}</span>
                        </p>
                        <p className="text-xs text-[#7a7368]">
                          Waktu: <span className="font-medium text-[10px]">{p.waktu}</span>
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
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-[#eee6da] rounded-xl">
                 <p className="text-sm text-[#7a7368] italic">Belum ada progres fulfillment yang dicatat untuk pesanan ini.</p>
                 <p className="text-[10px] text-[#aaa] mt-1 uppercase tracking-widest">Fulfillment dimulai setelah pembayaran DP divalidasi</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Info Label */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-[#aaa] font-medium uppercase tracking-widest">
        <Server size={12} />
        <span>Backend Status: API-Backed (Action Control Active)</span>
      </div>
    </div>
  );
}


function StatusBadge({ status, type = "order" }) {
  const base =
    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border";
  
  if (type === "payment") {
    switch (status) {
      case "Lunas":
      case "Valid (DP)":
      case "PAID_DP":
      case "PAID_FULL":
        return <span className={`${base} bg-emerald-50 text-emerald-600 border-emerald-100 tracking-tight`}>{status.replace("PAID_", "Lunas ")}</span>;
      case "Belum Bayar":
      case "UNPAID":
        return <span className={`${base} bg-amber-50 text-amber-600 border-amber-100`}>Belum Bayar</span>;
      default:
        return <span className={`${base} bg-gray-50 text-gray-600 border-gray-100`}>{status}</span>;
    }
  }

  if (type === "confirmation") {
    switch (status) {
      case "ACCEPTED":
        return <span className={`${base} bg-emerald-50 text-emerald-600 border-emerald-100`}><CheckCircle size={10} /> Disetujui</span>;
      case "REJECTED":
        return <span className={`${base} bg-red-50 text-red-600 border-red-100`}><AlertCircle size={10} /> Ditolak</span>;
      case "NEED_RESCHEDULE":
        return <span className={`${base} bg-amber-50 text-amber-600 border-amber-100`}><RefreshCw size={10} /> Reschedule</span>;
      default:
        return <span className={`${base} bg-gray-50 text-gray-600 border-gray-100`}><Clock size={10} /> Pending</span>;
    }
  }

  switch (status) {
    case "Menunggu Konfirmasi":
    case "Menunggu Pembayaran":
    case "AWAITING_PAYMENT":
    case "PENDING_CONFIRMATION":
      return (
        <span className={`${base} bg-amber-50 text-amber-600 border border-amber-100`}>
          <Clock size={14} /> {status.replace(/_/g, " ")}
        </span>
      );
    case "Diproses":
    case "PROCESSING":
    case "ON_DELIVERY":
      return (
        <span className={`${base} bg-blue-50 text-blue-600 border border-blue-100`}>
          <Package size={14} /> {status.replace(/_/g, " ")}
        </span>
      );
    case "Selesai":
    case "Diterima":
    case "Lunas":
    case "Valid":
    case "DELIVERED":
    case "COMPLETED":
    case "DONE":
      return (
        <span className={`${base} bg-emerald-50 text-emerald-600 border border-emerald-100`}>
          <CheckCircle size={14} /> {status.replace(/_/g, " ")}
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

