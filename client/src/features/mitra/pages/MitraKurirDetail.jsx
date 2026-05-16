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
  FiTruck, 
  FiInfo,
  FiClock,
  FiBox,
  FiNavigation
} from "react-icons/fi";
import { mitraApi } from "../services/mitraApi";

const MitraKurirDetail = () => {
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
        setError("Gagal memuat detail tugas kurir.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  const handleConfirmationAction = async (status) => {
    const myConfirmation = order.konfirmasiMitra?.find(c => c.peran === 'MITRA_KURIR');
    if (!myConfirmation) return;

    if (!window.confirm(`Apakah Anda yakin ingin ${status === 'ACCEPTED' ? 'Menerima' : 'Menolak'} tugas pengiriman ini?`)) return;

    setActionLoading(true);
    try {
      await mitraApi.updateConfirmationStatus(order.id, myConfirmation.id, status);
      // Refresh data
      const response = await mitraApi.getOrderById(id);
      setOrder(response.data);
    } catch (err) {
      alert("Gagal memperbarui konfirmasi: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateDelivery = async (eventKey, status, tahap) => {
    // Find event in progress array
    const event = order.progress?.find(e => e.eventKey === eventKey);
    if (!event) {
       alert("Event timeline tidak ditemukan. Pastikan Admin sudah mempublikasikan timeline pengiriman.");
       return;
    }

    if (!window.confirm(`Update status menjadi: ${tahap}?`)) return;

    setActionLoading(true);
    try {
      await mitraApi.updateTimelineEventStatus(order.id, event.id, {
        status: status,
        updatedBy: 'MITRA_KURIR',
        description: `Status pengiriman diperbarui oleh Kurir: ${tahap}`
      });
      // Refresh data
      const response = await mitraApi.getOrderById(id);
      setOrder(response.data);
    } catch (err) {
      alert("Gagal memperbarui status delivery: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <PublicSection className="py-24"><LoadingState message="Menyiapkan data tugas pengiriman..." /></PublicSection>;
  if (error) return <PublicSection className="py-24"><ErrorState message={error} onRetry={() => window.location.reload()} /></PublicSection>;
  if (!order) return <PublicSection className="py-24"><ErrorState message="Pesanan tidak ditemukan." /></PublicSection>;

  const myConfirmation = order.konfirmasiMitra?.find(c => c.peran === 'MITRA_KURIR');
  const deliveryEvents = order.progress?.filter(e => ['COURIER_PICKUP', 'DELIVERED', 'COMPLETED'].includes(e.eventKey)) || [];

  return (
    <PublicSection className="py-20" overlay="soft" usePattern={true}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link to="/mitra-kurir" className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
              <FiArrowLeft /> Kembali ke Dashboard
            </Link>
            <h2 className="text-3xl font-heading font-bold text-[var(--color-public-primary)]">
              Tugas Pengiriman <span className="siqah-accent-text text-purple-600">{order.id}</span>
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
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-public-primary)]">Tujuan Pengiriman</h3>
                  <p className="text-xs text-gray-400">Informasi alamat lengkap konsumen</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-sm font-bold text-gray-700 mb-1">{order.konsumen?.nama}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{order.konsumen?.alamat}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                      <FiCalendar className="text-purple-600" />
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Jadwal</p>
                        <p className="text-xs font-bold text-purple-700">{order.tanggal}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                      <FiClock className="text-purple-600" />
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Waktu Ideal</p>
                        <p className="text-xs font-bold text-purple-700">Pagi (08:00 - 10:00)</p>
                      </div>
                   </div>
                </div>
              </div>
            </PublicCard>

            <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl rounded-3xl">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <FiBox size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-public-primary)]">Ringkasan Paket</h3>
                  <p className="text-xs text-gray-400">Pastikan jumlah box/paket sesuai</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Paket Utama:</span>
                  <span className="font-bold text-gray-700">{order.paket}</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl text-[10px] text-amber-800 italic">
                  Catatan: {order.notesConsumer || 'Tidak ada catatan khusus.'}
                </div>
              </div>
            </PublicCard>

            {/* Delivery Timeline Controls */}
            {myConfirmation?.status === 'ACCEPTED' && (
              <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl rounded-3xl">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <FiNavigation size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-public-primary)]">Update Progress Pengiriman</h3>
                    <p className="text-xs text-gray-400">Update status secara real-time untuk konsumen</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {deliveryEvents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {deliveryEvents.map((event, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${event.status === 'DONE' ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50 border-gray-100 opacity-70'}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${event.status === 'DONE' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                              {event.status === 'DONE' ? <FiCheckCircle size={14} /> : <FiClock size={14} />}
                            </div>
                            <div>
                              <p className={`text-sm font-bold ${event.status === 'DONE' ? 'text-emerald-700' : 'text-gray-600'}`}>{event.tahap}</p>
                              <p className="text-[10px] text-gray-400">{event.status === 'DONE' ? 'Selesai' : 'Menunggu update...'}</p>
                            </div>
                          </div>
                          
                          {event.status !== 'DONE' && (
                            <PublicButton 
                              variant="solid" 
                              size="sm" 
                              className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] border-none"
                              onClick={() => handleUpdateDelivery(event.eventKey, 'DONE', event.tahap)}
                              disabled={actionLoading}
                            >
                              Selesaikan
                            </PublicButton>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                       <p className="text-xs text-gray-400">Timeline pengiriman belum tersedia.</p>
                       <p className="text-[10px] text-gray-400 mt-1">Admin sedang menyiapkan jadwal fulfillment.</p>
                    </div>
                  )}
                </div>
              </PublicCard>
            )}
          </div>

          {/* Right Column: Actions */}
          <div className="space-y-6">
            <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl rounded-3xl">
              <div className="space-y-1">
                <h3 className="font-bold text-[var(--color-public-primary)]">Konfirmasi Tugas</h3>
                <p className="text-xs text-gray-400">Konfirmasi kesanggupan pengantaran</p>
              </div>

              <div className="pt-4 space-y-4">
                {myConfirmation?.status === 'PENDING' ? (
                  <>
                    <PublicButton 
                      variant="solid" 
                      className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white border-none"
                      onClick={() => handleConfirmationAction('ACCEPTED')}
                      disabled={actionLoading}
                    >
                      <FiCheckCircle className="mr-2" /> Terima Tugas
                    </PublicButton>
                    <PublicButton 
                      variant="outline" 
                      className="w-full py-4 border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleConfirmationAction('REJECTED')}
                      disabled={actionLoading}
                    >
                      <FiXCircle className="mr-2" /> Tolak Tugas
                    </PublicButton>
                  </>
                ) : (
                  <div className={`p-6 rounded-2xl text-center space-y-3 ${myConfirmation?.status === 'ACCEPTED' ? 'bg-purple-50 text-purple-700' : 'bg-red-50 text-red-700'}`}>
                    {myConfirmation?.status === 'ACCEPTED' ? (
                      <FiCheckCircle size={40} className="mx-auto" />
                    ) : (
                      <FiXCircle size={40} className="mx-auto" />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold uppercase tracking-widest text-xs">Tugas {myConfirmation?.status === 'ACCEPTED' ? 'Diterima' : 'Ditolak'}</p>
                      <p className="text-[10px] opacity-70">Terdaftar dalam sistem pada {myConfirmation?.waktu ? new Date(myConfirmation.waktu).toLocaleString('id-ID') : 'saat ini'}</p>
                    </div>
                  </div>
                )}
              </div>
            </PublicCard>

            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
              <FiInfo className="text-amber-600 shrink-0 mt-1" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">SOP Kurir</p>
                <p className="text-[10px] text-amber-700 leading-relaxed">
                  Pastikan paket dalam kondisi tersegel dan suhu terjaga. Segera update status saat tiba di lokasi.
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
    case 'ACCEPTED': return 'bg-purple-100 text-purple-700';
    case 'REJECTED': return 'bg-red-100 text-red-700';
    default: return 'bg-amber-100 text-amber-700';
  }
};

export default MitraKurirDetail;
