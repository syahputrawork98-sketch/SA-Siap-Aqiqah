import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  PublicSection, 
  PublicCard, 
  PublicButton, 
  LoadingState,
  ErrorState,
  EmptyState
} from "@/shared/ui";
import { FiTruck, FiCalendar, FiClock, FiArrowRight, FiCheckCircle, FiMapPin } from "react-icons/fi";
import { mitraApi } from "../services/mitraApi";

const MitraKurirDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all orders for development smoke test visibility
        const response = await mitraApi.getOrders(); 
        setOrders(response.data);
      } catch (err) {
        setError("Gagal memuat tugas kurir. Silakan coba lagi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <PublicSection className="py-24"><LoadingState message="Memuat tugas pengiriman..." /></PublicSection>;
  if (error) return <PublicSection className="py-24"><ErrorState message={error} onRetry={() => window.location.reload()} /></PublicSection>;

  const relevantOrders = orders.filter(order => order.konfirmasiMitra?.some(c => c.peran === 'MITRA_KURIR'));

  return (
    <PublicSection className="py-20" overlay="soft" usePattern={true}>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-public-primary)]">
              Dashboard <span className="siqah-accent-text text-purple-600">Mitra Kurir</span>
            </h2>
            <p className="text-sm text-[var(--color-text-default)]/60">
              Pantau jadwal pengiriman dan update status paket.
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
            <FiTruck size={24} />
          </div>
        </div>

        {relevantOrders.length === 0 ? (
          <PublicCard className="p-12 text-center bg-white border-purple-50">
            <EmptyState message="Belum ada tugas pengiriman yang perlu ditindaklanjuti." />
          </PublicCard>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {relevantOrders.map((order) => {
              const myConfirmation = order.konfirmasiMitra?.find(c => c.peran === 'MITRA_KURIR');
              
              return (
                <PublicCard 
                  key={order.id} 
                  onClick={() => navigate(`/mitra-kurir/pesanan/${order.id}`)}
                  className="group overflow-hidden bg-white border-purple-50 hover:border-purple-300 hover:shadow-lg cursor-pointer transition-all duration-300"
                >
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${getStatusColor(myConfirmation?.status)}`}>
                         {myConfirmation?.status === 'ACCEPTED' ? <FiTruck size={24} /> : <FiClock size={24} />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{order.id}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getStatusBadgeColor(myConfirmation?.status)}`}>
                            {myConfirmation?.status || 'PENDING'}
                          </span>
                        </div>
                        <h3 className="font-bold text-[var(--color-public-primary)] group-hover:text-purple-700 transition-colors">{order.paket}</h3>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><FiCalendar size={12} /> {order.tanggal}</span>
                          <span className="flex items-center gap-1 text-purple-600 font-semibold"><FiMapPin size={12} /> {order.konsumen?.alamat?.substring(0, 30)}...</span>
                          <span className="text-[10px] bg-gray-50 px-2 py-0.5 rounded border text-gray-400">{getFriendlyOrderStatus(order.status)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                        <PublicButton variant="outline" size="sm" className="group/btn pointer-events-none">
                          Detail Pengiriman <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </PublicButton>
                    </div>
                  </div>
                </PublicCard>
              );
            })}
          </div>
        )}
      </div>
    </PublicSection>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'ACCEPTED': return 'bg-purple-50 text-purple-600';
    case 'REJECTED': return 'bg-red-50 text-red-600';
    default: return 'bg-amber-50 text-amber-600';
  }
};

const getStatusBadgeColor = (status) => {
  const map = {
    'ACCEPTED': 'bg-purple-100 text-purple-700',
    'REJECTED': 'bg-red-100 text-red-700',
    'PENDING': 'bg-amber-100 text-amber-700'
  };
  return map[status] || 'bg-gray-100 text-gray-700';
};

const getFriendlyOrderStatus = (status) => {
  const map = {
    'PENDING_CONFIRMATION': 'Menunggu Konfirmasi',
    'AWAITING_PAYMENT': 'Menunggu Pembayaran',
    'PROCESSING': 'Diproses',
    'ON_DELIVERY': 'Dalam Pengiriman',
    'DELIVERED': 'Telah Sampai',
    'COMPLETED': 'Selesai',
    'Menunggu Konfirmasi': 'Menunggu Konfirmasi',
    'Menunggu Pembayaran': 'Menunggu Pembayaran',
    'Diproses': 'Diproses',
    'Dalam Pengiriman': 'Dalam Pengiriman',
    'Telah Sampai': 'Telah Sampai',
    'Selesai': 'Selesai',
  };
  return map[status] || status;
};

export default MitraKurirDashboard;
