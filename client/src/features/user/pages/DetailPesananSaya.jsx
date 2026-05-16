import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  PublicSection, 
  PublicCard, 
  PublicButton, 
  LoadingState,
  ErrorState 
} from "@/shared/ui";
import { 
  FiPackage, 
  FiCalendar, 
  FiMapPin, 
  FiCreditCard, 
  FiArrowLeft, 
  FiCheckCircle, 
  FiClock, 
  FiTruck,
  FiShoppingBag,
  FiActivity
} from "react-icons/fi";
import { orderApi } from "../services/orderApi";
import { formatCurrencyIdr } from "@/shared/lib";

const DetailPesananSaya = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await orderApi.getOrderById(id);
        setOrder(response.data);
      } catch (err) {
        setError("Gagal memuat detail pesanan. Silakan coba lagi nanti.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) return <PublicSection className="py-24"><LoadingState message="Menyiapkan data pesanan Anda..." /></PublicSection>;
  if (error) return <PublicSection className="py-24"><ErrorState message={error} onRetry={() => window.location.reload()} /></PublicSection>;
  if (!order) return <PublicSection className="py-24"><ErrorState message="Pesanan tidak ditemukan." /></PublicSection>;

  return (
    <PublicSection className="py-20" overlay="soft" usePattern={true}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link to="/user/pesanan" className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              <FiArrowLeft /> Kembali ke Daftar Pesanan
            </Link>
            <h2 className="text-3xl font-heading font-bold text-[var(--color-public-primary)]">
              Detail Pesanan <span className="siqah-accent-text">{order.id}</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <StatusBadge status={order.status} />
             <PaymentBadge status={order.paymentStatus} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Summary & Info */}
          <div className="lg:col-span-1 space-y-8">
            <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl rounded-3xl">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <FiShoppingBag size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-public-primary)]">Informasi Paket</h3>
                  <p className="text-xs text-[var(--color-text-default)]/50">Detail layanan aqiqah pilihan</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[var(--color-text-default)]/60">Paket</span>
                  <span className="text-sm font-bold text-right">{order.paket}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--color-text-default)]/60">Tanggal Jadwal</span>
                  <span className="text-sm font-bold">{order.tanggal}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-sm font-medium text-[var(--color-text-default)]/60">Total Pembayaran</span>
                  <span className="text-xl font-black text-blue-600">{formatCurrencyIdr(order.total)}</span>
                </div>
              </div>
            </PublicCard>

            <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl rounded-3xl">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-public-primary)]">Alamat Pengiriman</h3>
                  <p className="text-xs text-[var(--color-text-default)]/50">Lokasi pelaksanaan/pengantaran</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-text-default)]/70 italic">
                "{order.konsumen?.alamat || 'Alamat tidak tersedia'}"
              </p>
            </PublicCard>
          </div>

          {/* Right Column: Timeline 1 & 2 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline 1: Partner Confirmation */}
            <PublicCard className="p-8 bg-white border-none shadow-xl rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <FiCheckCircle size={120} />
              </div>
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[var(--color-public-primary)] flex items-center gap-2">
                    <FiActivity className="text-blue-600" /> Tahap 1: Persiapan Pesanan
                  </h3>
                  <p className="text-xs text-[var(--color-text-default)]/50">Konfirmasi kesediaan tim operasional (Kandang, Catering, Kurir)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {order.konfirmasiMitra && order.konfirmasiMitra.length > 0 ? (
                    order.konfirmasiMitra.map(c => (
                        <div key={c.id} className={`p-4 rounded-2xl border transition-all ${c.status === 'ACCEPTED' ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{c.peran.replace('MITRA_', '')}</span>
                                {c.status === 'ACCEPTED' ? <FiCheckCircle className="text-emerald-500" /> : <FiClock className="text-amber-500" />}
                            </div>
                            <h4 className="text-sm font-bold text-[var(--color-public-primary)]">{c.status === 'ACCEPTED' ? 'Siap Bertugas' : 'Menunggu'}</h4>
                            <p className="text-[10px] text-gray-500 mt-1">{c.waktu ? new Date(c.waktu).toLocaleDateString('id-ID') : 'Penjadwalan...'}</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 py-6 text-center text-sm text-gray-400 italic bg-gray-50 rounded-2xl">
                        Menunggu alokasi tim oleh admin...
                    </div>
                )}
              </div>
            </PublicCard>

            {/* Timeline 2: Fulfillment */}
            <PublicCard className="p-8 bg-white border-none shadow-xl rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <FiTruck size={120} />
              </div>
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[var(--color-public-primary)] flex items-center gap-2">
                    <FiPackage className="text-indigo-600" /> Tahap 2: Proses Aqiqah & Pengiriman
                  </h3>
                  <p className="text-xs text-[var(--color-text-default)]/50">Progres pemotongan hewan, pengolahan masakan, hingga pengantaran</p>
                </div>
              </div>

              {order.progress && order.progress.length > 0 ? (
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-indigo-500 before:to-transparent">
                  {order.progress.map((step, idx) => (
                    <div key={step.id} className="relative flex items-start gap-6 group">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${step.status === 'DONE' ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-white border-2 border-gray-200 text-gray-400 group-hover:border-blue-300'}`}>
                        {step.status === 'DONE' ? <FiCheckCircle size={20} /> : <span className="text-xs font-bold">{idx + 1}</span>}
                      </div>
                      <div className="space-y-2 pb-2">
                        <div className="flex items-center gap-3">
                            <h4 className={`font-bold transition-colors ${step.status === 'DONE' ? 'text-[var(--color-public-primary)]' : 'text-gray-400'}`}>
                                {step.tahap}
                            </h4>
                            {step.status === 'IN_PROGRESS' && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 animate-pulse bg-blue-50 px-2 py-0.5 rounded-full">
                                    <FiActivity size={10} /> SEDANG BERLANGSUNG
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-[var(--color-text-default)]/50 flex items-center gap-2">
                            <FiClock size={12} /> {step.waktu.includes('-') ? new Date(step.waktu).toLocaleString('id-ID') : step.waktu}
                        </p>
                        {step.foto && step.status === 'DONE' && (
                            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 shadow-sm max-w-xs group-hover:shadow-md transition-shadow">
                                <img src={step.foto} alt={step.tahap} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm">
                        <FiClock size={32} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-500">Progres Belum Dimulai</p>
                        <p className="text-[10px] text-gray-400 max-w-xs mx-auto">
                            Tahap pelaksanaan akan diperbarui secara real-time setelah persiapan tim dan pembayaran selesai.
                        </p>
                    </div>
                </div>
              )}
            </PublicCard>
          </div>
        </div>
      </div>
    </PublicSection>
  );
};

// Reuse Badges from List or move to components
// Friendly mapping for consumer-facing labels
const getFriendlyOrderStatus = (status) => {
  const map = {
    'PENDING_CONFIRMATION': 'Menunggu Konfirmasi Tim',
    'AWAITING_PAYMENT': 'Menunggu Pembayaran',
    'PROCESSING': 'Pesanan Sedang Diproses',
    'ON_DELIVERY': 'Dalam Pengiriman',
    'DELIVERED': 'Telah Sampai di Lokasi',
    'COMPLETED': 'Pesanan Selesai',
    'CANCELLED': 'Pesanan Dibatalkan',
    'Menunggu Konfirmasi': 'Menunggu Konfirmasi Tim',
    'Menunggu Pembayaran': 'Menunggu Pembayaran',
    'Diproses': 'Pesanan Sedang Diproses',
    'Dalam Pengiriman': 'Dalam Pengiriman',
    'Telah Sampai': 'Telah Sampai di Lokasi',
    'Selesai': 'Pesanan Selesai',
  };
  return map[status] || status;
};

const StatusBadge = ({ status }) => {
  const friendlyStatus = getFriendlyOrderStatus(status);
  
  const styles = {
    "Menunggu Konfirmasi Tim": "bg-amber-100 text-amber-600",
    "Menunggu Pembayaran": "bg-indigo-100 text-indigo-600",
    "Pesanan Sedang Diproses": "bg-purple-100 text-purple-600",
    "Dalam Pengiriman": "bg-orange-100 text-orange-600",
    "Telah Sampai di Lokasi": "bg-emerald-100 text-emerald-600",
    "Pesanan Selesai": "bg-green-100 text-green-600",
    "Pesanan Dibatalkan": "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${styles[friendlyStatus] || "bg-gray-100 text-gray-600"}`}>
      {friendlyStatus}
    </span>
  );
};

const PaymentBadge = ({ status }) => {
    const map = {
        "PAID_FULL": "Lunas",
        "PAID_DP": "DP Valid",
        "UNPAID": "Belum Bayar",
        "REJECTED": "Ditolak",
        "Lunas": "Lunas",
        "Valid (DP)": "DP Valid",
        "Belum Bayar": "Belum Bayar",
    };
    
    const friendlyStatus = map[status] || status;

    const styles = {
        "Lunas": "text-green-600 bg-green-50 px-4 py-1.5 rounded-full border border-green-100",
        "DP Valid": "text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100",
        "Belum Bayar": "text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100",
        "Ditolak": "text-red-600 bg-red-50 px-4 py-1.5 rounded-full border border-red-100",
    };

    return (
        <span className={`text-xs font-bold uppercase tracking-widest ${styles[friendlyStatus] || "text-gray-600"}`}>
            {friendlyStatus}
        </span>
    );
};

export default DetailPesananSaya;
