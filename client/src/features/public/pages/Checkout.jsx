import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  PublicSection, 
  PublicCard, 
  PublicButton, 
  SectionHeading,
  LoadingState,
  ErrorState 
} from "@/shared/ui";
import { 
  FiPackage, 
  FiCalendar, 
  FiMapPin, 
  FiFileText, 
  FiCheckCircle, 
  FiArrowRight, 
  FiShoppingBag 
} from "react-icons/fi";
import { dataMasterApi } from "@/features/admin/services/dataMasterApi";
import { orderApi } from "@/features/user/services/orderApi";
import { getPersona } from "@/app/router/developerPersona";
import { formatCurrencyIdr } from "@/shared/lib";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPackageId = queryParams.get("packageId");

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    packageId: initialPackageId || "",
    scheduledDate: "",
    deliveryAddress: "",
    notesConsumer: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await dataMasterApi.getPackages({ status: 'ACTIVE' });
        setPackages(response.data);
        if (!initialPackageId && response.data.length > 0) {
          setFormData(prev => ({ ...prev, packageId: response.data[0].id }));
        }
      } catch (err) {
        setError("Gagal memuat data paket. Silakan muat ulang halaman.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [initialPackageId]);

  const selectedPackage = packages.find(p => p.id === formData.packageId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const persona = getPersona();
    
    if (persona !== 'user') {
      alert("Anda harus masuk sebagai persona 'Konsumen' untuk melakukan pemesanan.");
      return;
    }

    if (!formData.scheduledDate || !formData.deliveryAddress) {
      alert("Harap isi tanggal jadwal dan alamat pengiriman.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        consumerEmail: 'user@siqah.dev', 
        packageId: formData.packageId,
        scheduledDate: formData.scheduledDate,
        deliveryAddress: formData.deliveryAddress,
        notesConsumer: formData.notesConsumer,
        items: [
          {
            entityType: 'PACKAGE',
            animalId: null,
            cateringMenuId: null,
            quantity: 1,
            priceAtOrder: selectedPackage?.harga || 0
          }
        ]
      };

      const response = await orderApi.createOrder(payload);
      
      if (response.success) {
        setCreatedOrderId(response.data.id);
        setShowSuccess(true);
        // Redirect after a short delay to show success state
        setTimeout(() => {
          navigate(`/user/pesanan/${response.data.id}`);
        }, 2000);
      }
    } catch (err) {
      alert(err.message || "Gagal membuat pesanan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <PublicSection className="py-24"><LoadingState message="Menyiapkan formulir pemesanan..." /></PublicSection>;
  if (error) return <PublicSection className="py-24"><ErrorState message={error} onRetry={() => window.location.reload()} /></PublicSection>;

  if (showSuccess) {
    return (
      <PublicSection className="py-32 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center space-y-6 border border-emerald-50">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <FiCheckCircle size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[var(--color-public-primary)]">Pesanan Berhasil!</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Pesanan <span className="font-bold text-emerald-600">#{createdOrderId}</span> telah berhasil dibuat. Anda akan segera dialihkan ke halaman detail pesanan.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-12 h-1 bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '50%' }}></div>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes loading {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}} />
        </div>
      </PublicSection>
    );
  }

  return (
    <PublicSection className="py-20" overlay="soft" usePattern={true}>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-heading font-bold text-[var(--color-public-primary)] tracking-tight">
            Selesaikan <span className="siqah-accent-text">Pemesanan</span>
          </h2>
          <p className="text-[var(--color-text-default)]/70 max-w-xl mx-auto">
            Hampir selesai! Isi detail pelaksanaan aqiqah Anda di bawah ini.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <PublicCard className="p-8 space-y-6 bg-white border-none shadow-xl sticky top-24">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <FiShoppingBag size={24} />
                </div>
                <h3 className="font-bold text-[var(--color-public-primary)]">Ringkasan</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pilih Paket</label>
                  <select 
                    value={formData.packageId}
                    onChange={(e) => setFormData(prev => ({ ...prev, packageId: e.target.value }))}
                    className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>{pkg.nama}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Harga Paket</span>
                    <span className="font-bold">{formatCurrencyIdr(selectedPackage?.harga || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Biaya Layanan</span>
                    <span className="text-emerald-600 font-bold text-xs uppercase">Gratis</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-[var(--color-public-primary)]">Total</span>
                    <span className="text-xl font-black text-blue-600">{formatCurrencyIdr(selectedPackage?.harga || 0)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                  <FiCheckCircle /> Konfirmasi Otomatis
                </div>
                <p className="text-[10px] text-blue-600 leading-relaxed">
                  Pesanan akan langsung diteruskan ke tim Admin dan Mitra untuk pengecekan ketersediaan.
                </p>
              </div>
            </PublicCard>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            <PublicCard className="p-8 space-y-8 bg-white border-none shadow-xl">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-bold text-[var(--color-public-primary)]">
                    <FiCalendar className="text-blue-600" /> Tanggal Jadwal Aqiqah
                  </label>
                  <input 
                    type="date"
                    required
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                  <p className="text-[10px] text-gray-400 italic">Pilih tanggal pelaksanaan penyembelihan & pengantaran.</p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-bold text-[var(--color-public-primary)]">
                    <FiMapPin className="text-blue-600" /> Alamat Pengiriman Lengkap
                  </label>
                  <textarea 
                    required
                    rows="3"
                    placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 02, Kec. Serpong, Tangerang Selatan"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                    className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-bold text-[var(--color-public-primary)]">
                    <FiFileText className="text-blue-600" /> Catatan Tambahan (Opsional)
                  </label>
                  <textarea 
                    rows="2"
                    placeholder="Contoh: Nama anak, titip bumbu gulai lebih pedas, dll."
                    value={formData.notesConsumer}
                    onChange={(e) => setFormData(prev => ({ ...prev, notesConsumer: e.target.value }))}
                    className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <PublicButton 
                  type="submit" 
                  variant="solid" 
                  size="lg" 
                  className="w-full py-5 text-lg font-black tracking-wide group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Memproses Pesanan..." : (
                    <span className="flex items-center justify-center gap-2">
                      Konfirmasi & Buat Pesanan <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </PublicButton>
              </div>
            </PublicCard>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">
              <FiPackage />
              <span>Amanah • Sesuai Syariat • Higienis</span>
            </div>
          </div>
        </form>
      </div>
    </PublicSection>
  );
};

export default Checkout;
