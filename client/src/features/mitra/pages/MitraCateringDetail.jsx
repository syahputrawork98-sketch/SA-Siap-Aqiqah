import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  PublicSection, 
  PublicCard, 
  PublicButton, 
  LoadingState,
  ErrorState 
} from "@/shared/ui";
import { 
  FiArrowLeft, 
  FiCheckCircle, 
  FiXCircle, 
  FiCalendar, 
  FiMapPin, 
  FiCoffee, 
  FiInfo,
  FiClock
} from "react-icons/fi";
import { mitraApi } from "../services/mitraApi";

const MitraCateringDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await mitraApi.getOrderById(id);
        setOrder(response.data);
      } catch (err) {
        setError("Gagal memuat detail pesanan mitra.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  const handleAction = async (status) => {
    const myConfirmation = order.konfirmasiMitra?.find(c => c.peran === 'MITRA_CATERING');
    if (!myConfirmation) return;

    if (!window.confirm(`Apakah Anda yakin ingin ${status === 'ACCEPTED' ? 'Menerima' : 'Menolak'} tugas ini?`)) return;

    setActionLoading(true);
    try {
      await mitraApi.updateConfirmationStatus(order.id, myConfirmation.id, status);
      // Refresh data
      const response = await mitraApi.getOrderById(id);
      setOrder(response.data);
    } catch (err) {
      alert("Gagal memperbarui status: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <PublicSection className="py-24"><LoadingState message="Menyiapkan data tugas..." /></PublicSection>;
  if (error) return <PublicSection className="py-24"><ErrorState message={error} onRetry={() => window.location.reload()} /></PublicSection>;
  if (!order) return <PublicSection className="py-24"><ErrorState message="Pesanan tidak ditemukan." /></PublicSection>;

  const myConfirmation = order.konfirmasiMitra?.find(c => c.peran === 'MITRA_CATERING');

  return (
    <PublicSection className="py-20" overlay="soft" usePattern={true}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link to="/mitra-catering" className="flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
              <FiArrowLeft /> Kembali ke Dashboard
            </Link>
            <h2 className="text-3xl font-heading font-bold text-[var(--color-public-primary)]">
              Detail Tugas <span className="siqah-accent-text text-orange-600">{order.id}</span>
            </h2>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusBadgeColor(myConfirmation?.status)}`}>
            {myConfirmation?.status || 'PENDING'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Info */}
          <div className="md:col-span-2 space-y-6">
            <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl rounded-3xl">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                  <FiCoffee size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-public-primary)]">Informasi Katering</h3>
                  <p className="text-xs text-gray-400">Detail menu yang harus disiapkan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Menu Paket</span>
                  <p className="font-bold text-gray-700">{order.paket}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Jadwal Pengantaran</span>
                  <p className="font-bold text-orange-600 flex items-center gap-2"><FiCalendar /> {order.tanggal}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Catatan Khusus</span>
                  <p className="text-sm text-gray-600 italic">"{order.notesConsumer || 'Tidak ada catatan khusus'}"</p>
                </div>
              </div>
            </PublicCard>

            <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl rounded-3xl">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-public-primary)]">Tujuan Pengiriman</h3>
                  <p className="text-xs text-gray-400">Pastikan koordinasi pengiriman tepat waktu</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {order.konsumen?.alamat || 'Alamat tidak tersedia'}
              </p>
            </PublicCard>
          </div>

          {/* Right Column: Actions */}
          <div className="space-y-6">
            <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl rounded-3xl">
              <div className="space-y-1">
                <h3 className="font-bold text-[var(--color-public-primary)]">Konfirmasi Kesiapan</h3>
                <p className="text-xs text-gray-400">Konfirmasi kesanggupan tim dapur</p>
              </div>

              <div className="pt-4 space-y-4">
                {myConfirmation?.status === 'PENDING' ? (
                  <>
                    <PublicButton 
                      variant="solid" 
                      className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white border-none"
                      onClick={() => handleAction('ACCEPTED')}
                      disabled={actionLoading}
                    >
                      <FiCheckCircle className="mr-2" /> Siap Memasak
                    </PublicButton>
                    <PublicButton 
                      variant="outline" 
                      className="w-full py-4 border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleAction('REJECTED')}
                      disabled={actionLoading}
                    >
                      <FiXCircle className="mr-2" /> Tidak Sanggup
                    </PublicButton>
                  </>
                ) : (
                  <div className={`p-6 rounded-2xl text-center space-y-3 ${myConfirmation?.status === 'ACCEPTED' ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700'}`}>
                    {myConfirmation?.status === 'ACCEPTED' ? (
                      <FiCheckCircle size={40} className="mx-auto" />
                    ) : (
                      <FiXCircle size={40} className="mx-auto" />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold uppercase tracking-widest text-xs">Konfirmasi {myConfirmation?.status === 'ACCEPTED' ? 'Diterima' : 'Ditolak'}</p>
                      <p className="text-[10px] opacity-70">Respons telah dikirimkan ke Admin pada {myConfirmation?.waktu ? new Date(myConfirmation.waktu).toLocaleString('id-ID') : 'saat ini'}</p>
                    </div>
                  </div>
                )}
              </div>
            </PublicCard>

            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
              <FiInfo className="text-amber-600 shrink-0 mt-1" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">Penting</p>
                <p className="text-[10px] text-amber-700 leading-relaxed">
                  Konfirmasi diperlukan minimal H-3 dari jadwal aqiqah untuk persiapan bahan baku berkualitas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicSection>
  );
};

const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'ACCEPTED': return 'bg-orange-100 text-orange-700';
    case 'REJECTED': return 'bg-red-100 text-red-700';
    default: return 'bg-amber-100 text-amber-700';
  }
};

export default MitraCateringDetail;
