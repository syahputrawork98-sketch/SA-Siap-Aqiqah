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
  FiPackage, 
  FiInfo,
  FiClock
} from "react-icons/fi";
import { mitraApi } from "../services/mitraApi";

const MitraKandangDetail = () => {
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
    const myConfirmation = order.konfirmasiMitra?.find(c => c.peran === 'MITRA_KANDANG');
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

  const myConfirmation = order.konfirmasiMitra?.find(c => c.peran === 'MITRA_KANDANG');

  return (
    <PublicSection className="py-20" overlay="soft" usePattern={true}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link to="/mitra-kandang" className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
              <FiArrowLeft /> Kembali ke Dashboard
            </Link>
            <h2 className="text-3xl font-heading font-bold text-[var(--color-public-primary)]">
              Detail Tugas <span className="siqah-accent-text text-emerald-600">{order.id}</span>
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
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <FiPackage size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-public-primary)]">Informasi Pesanan</h3>
                  <p className="text-xs text-gray-400">Detail paket yang dipesan konsumen</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Paket Aqiqah</span>
                  <p className="font-bold text-gray-700">{order.paket}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Jadwal Pelaksanaan</span>
                  <p className="font-bold text-emerald-600 flex items-center gap-2"><FiCalendar /> {order.tanggal}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Catatan Konsumen</span>
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
                  <h3 className="font-bold text-[var(--color-public-primary)]">Lokasi Pengiriman</h3>
                  <p className="text-xs text-gray-400">Untuk koordinasi logistik/pengiriman</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {order.konsumen?.alamat || 'Alamat tidak tersedia'}
              </p>
            </PublicCard>

            {/* Timeline 2: Progres Produksi (Read-Only for Kandang) */}
            <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl rounded-3xl">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <FiClock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-public-primary)]">Progres Produksi</h3>
                  <p className="text-xs text-gray-400">Pantau tahapan pelaksanaan aqiqah</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {order.progress && order.progress.length > 0 ? (
                  <div className="relative space-y-6 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-100">
                    {order.progress.map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${step.status === 'DONE' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {step.status === 'DONE' ? <FiCheckCircle size={14} /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                        </div>
                        <div className="space-y-0.5">
                           <p className={`text-xs font-bold ${step.status === 'DONE' ? 'text-gray-800' : 'text-gray-400'}`}>{step.tahap}</p>
                           <p className="text-[10px] text-gray-400">{step.waktu}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                     <p className="text-[10px] text-gray-400">Progres produksi belum dimulai.</p>
                     <p className="text-[9px] text-gray-400 mt-1">Akan muncul setelah konfirmasi mitra & pembayaran selesai.</p>
                  </div>
                )}
              </div>
            </PublicCard>
          </div>

          {/* Right Column: Actions */}
          <div className="space-y-6">
            <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl rounded-3xl">
              <div className="space-y-1">
                <h3 className="font-bold text-[var(--color-public-primary)]">Status Konfirmasi</h3>
                <p className="text-xs text-gray-400">Berikan respons untuk tugas ini</p>
              </div>

              <div className="pt-4 space-y-4">
                {myConfirmation?.status === 'PENDING' && ['PENDING_CONFIRMATION', 'Menunggu Konfirmasi'].includes(order.status) ? (
                  <>
                    <PublicButton 
                      variant="solid" 
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                      onClick={() => handleAction('ACCEPTED')}
                      disabled={actionLoading}
                    >
                      <FiCheckCircle className="mr-2" /> Terima Tugas
                    </PublicButton>
                    <PublicButton 
                      variant="outline" 
                      className="w-full py-4 border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleAction('REJECTED')}
                      disabled={actionLoading}
                    >
                      <FiXCircle className="mr-2" /> Tolak Tugas
                    </PublicButton>
                  </>
                ) : (
                  <div className={`p-6 rounded-2xl text-center space-y-3 ${myConfirmation?.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700' : myConfirmation?.status === 'REJECTED' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-400'}`}>
                    {myConfirmation?.status === 'ACCEPTED' ? (
                      <FiCheckCircle size={40} className="mx-auto" />
                    ) : myConfirmation?.status === 'REJECTED' ? (
                      <FiXCircle size={40} className="mx-auto" />
                    ) : (
                      <FiClock size={40} className="mx-auto" />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold uppercase tracking-widest text-xs">
                        {myConfirmation?.status === 'ACCEPTED' ? 'Tugas Diterima' : 
                         myConfirmation?.status === 'REJECTED' ? 'Tugas Ditolak' : 
                         'Tugas Terkunci'}
                      </p>
                      <p className="text-[10px] opacity-70">
                        {myConfirmation?.status === 'PENDING' 
                          ? 'Waktu konfirmasi telah habis atau pesanan sudah lanjut ke tahap berikutnya.'
                          : `Respons telah dikirimkan ke Admin pada ${myConfirmation?.waktu ? new Date(myConfirmation.waktu).toLocaleString('id-ID') : 'saat ini'}`
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </PublicCard>

            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
              <FiInfo className="text-amber-600 shrink-0 mt-1" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">Instruksi</p>
                <p className="text-[10px] text-amber-700 leading-relaxed">
                  Harap periksa ketersediaan stok hewan sebelum menerima tugas. Jika ditolak, Admin akan mencari mitra pengganti.
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
    case 'ACCEPTED': return 'bg-emerald-100 text-emerald-700';
    case 'REJECTED': return 'bg-red-100 text-red-700';
    default: return 'bg-amber-100 text-amber-700';
  }
};

export default MitraKandangDetail;
