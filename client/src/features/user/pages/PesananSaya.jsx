import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  PublicSection, 
  PublicCard, 
  PublicButton, 
  PublicBadge,
  EmptyState,
  LoadingState,
  ErrorState 
} from "@/shared/ui";
import { FiPackage, FiCalendar, FiCreditCard, FiArrowRight, FiClock, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { orderApi } from "../services/orderApi";
import { formatCurrencyIdr } from "@/shared/lib";

const PesananSaya = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-2">
            <button 
              onClick={() => navigate("/user/dashboard")}
              className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest hover:gap-3 transition-all"
            >
              <FiArrowLeft /> Dashboard
            </button>
            <h2 className="text-4xl font-heading font-bold text-[var(--color-public-primary)] tracking-tight">
              Pesanan <span className="siqah-accent-text">Saya</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-default)]/60 text-sm max-w-xs md:text-right">
            Pantau status aqiqah putra-putri Anda dengan mudah dan transparan.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-blue-50">
            <EmptyState message="Anda belum memiliki riwayat pesanan aqiqah." />
            <div className="mt-8">
              <PublicButton variant="solid" onClick={() => navigate("/paket")}>
                Lihat Paket Aqiqah
              </PublicButton>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <PublicCard 
                key={order.id} 
                onClick={() => navigate(`/user/pesanan/${order.id}`)}
                className="group p-8 bg-white border-none shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-blue-100 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                      <FiPackage size={32} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{order.id}</span>
                        <div className="flex gap-2">
                          <PublicBadge status={order.status} />
                          <PublicBadge status={order.paymentStatus} type="payment" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-[var(--color-public-primary)] group-hover:text-blue-600 transition-colors">{order.paket}</h3>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-text-default)]/50">
                        <span className="flex items-center gap-2"><FiCalendar className="text-blue-500" /> {order.tanggal}</span>
                        <span className="flex items-center gap-2 font-bold text-blue-600"><FiCreditCard /> {formatCurrencyIdr(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                    <PublicButton variant="outline" size="sm" className="group/btn pointer-events-none">
                      Detail Pesanan <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </PublicButton>
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

export default PesananSaya;
