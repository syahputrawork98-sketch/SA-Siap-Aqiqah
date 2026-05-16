import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  PublicSection, 
  PublicCard, 
  PublicButton, 
  PublicBadge,
  EmptyState,
  LoadingState,
  ErrorState 
} from "@/shared/ui";
import { FiPackage, FiCalendar, FiCreditCard, FiArrowRight, FiClock, FiCheckCircle } from "react-icons/fi";
import { orderApi } from "../services/orderApi";
import { formatCurrencyIdr } from "@/shared/lib";

const PesananSaya = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // In development, we fetch all orders to ensure new checkouts are visible
        const response = await orderApi.getOrders({});
        setOrders(response.data);
      } catch (err) {
        setError("Gagal memuat daftar pesanan. Silakan coba lagi nanti.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <PublicSection className="py-24"><LoadingState message="Memuat pesanan keluarga Anda..." /></PublicSection>;
  if (error) return <PublicSection className="py-24"><ErrorState message={error} onRetry={() => window.location.reload()} /></PublicSection>;

  return (
    <PublicSection className="py-20" overlay="soft" usePattern={true}>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-heading font-bold text-[var(--color-public-primary)] tracking-tight">
            Pesanan <span className="siqah-accent-text">Saya</span>
          </h2>
          <p className="text-[var(--color-text-default)]/70 max-w-xl mx-auto">
            Pantau status aqiqah putra-putri Anda dengan mudah dan transparan.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-blue-50">
            <EmptyState message="Anda belum memiliki riwayat pesanan aqiqah." />
            <div className="mt-8">
              <PublicButton variant="solid" onClick={() => window.location.href = "/paket"}>
                Lihat Paket Aqiqah
              </PublicButton>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <PublicCard key={order.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-none bg-white">
                <div className="p-1 sm:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-8 sm:flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6 mb-6 sm:mb-0">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <FiPackage size={32} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{order.id}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <h3 className="text-xl font-bold text-[var(--color-public-primary)]">{order.paket}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-default)]/60">
                        <span className="flex items-center gap-1.5"><FiCalendar size={14} /> {order.tanggal}</span>
                        <span className="flex items-center gap-1.5"><FiCreditCard size={14} /> {formatCurrencyIdr(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-4 border-t sm:border-t-0 pt-6 sm:pt-0">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[var(--color-text-default)]/50">Status Pembayaran:</span>
                        <PaymentBadge status={order.paymentStatus} />
                    </div>
                    <Link to={`/user/pesanan/${order.id}`}>
                      <PublicButton variant="outline" className="group/btn">
                        Lihat Detail <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </PublicButton>
                    </Link>
                  </div>
                </div>
              </PublicCard>
            ))}
          </div>
        )}
      </div>
    </PublicSection>
  );
};

const StatusBadge = ({ status }) => {
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

  const friendlyStatus = map[status] || status;
  
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
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[friendlyStatus] || "bg-gray-100 text-gray-600"}`}>
      {friendlyStatus}
    </span>
  );
};

const PaymentBadge = ({ status }) => {
    const styles = {
        "Lunas": "text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100",
        "Valid (DP)": "text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100",
        "Belum Bayar": "text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100",
        "Ditolak": "text-red-600 bg-red-50 px-2 py-0.5 rounded-lg border border-red-100",
    };

    return (
        <span className={`text-[11px] font-bold ${styles[status] || "text-gray-600"}`}>
            {status}
        </span>
    );
};

export default PesananSaya;
