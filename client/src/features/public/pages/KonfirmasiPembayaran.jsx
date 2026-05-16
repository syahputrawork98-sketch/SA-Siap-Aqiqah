import React, { useState, useEffect, useCallback } from "react";
import { PublicCard, PublicButton, SectionHeading } from "@/shared/ui";
import { Copy, Check, Upload, Image as ImageIcon, AlertCircle, RefreshCw, Server } from "lucide-react";
import { formatCurrencyIdr } from "@/shared/lib";
import { paymentApi } from "@/features/admin/services/paymentApi";

export default function KonfirmasiPembayaran() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock order info (Still static until Public Order feature is developed)
  const orderInfo = {
    id: "ORD-00123",
    total: 2500000,
    status: "Menunggu Pembayaran",
  };

  const fetchBankAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentApi.getBankAccounts();
      if (response.success) {
        setBankAccounts(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || "Gagal mengambil data rekening.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBankAccounts();
  }, [fetchBankAccounts]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setIsUploading(true);
    // Simulate upload (Persistence remains UI-only)
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center space-y-6 bg-white rounded-3xl shadow-xl border border-[var(--color-public-surface-border)]">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Check size={40} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-[var(--color-public-primary)]">Bukti Berhasil Diunggah!</h2>
        <p className="text-[var(--color-text-default)]/70 leading-relaxed">
          Terima kasih. Bukti pembayaran Anda sedang dalam proses verifikasi oleh tim Admin kami. 
          Pemberitahuan akan dikirimkan setelah status diperbarui.
        </p>
        <PublicButton variant="solid" onClick={() => window.location.href = "/"}>
          Kembali ke Beranda
        </PublicButton>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 pb-20">
      <SectionHeading 
        title={<span>Konfirmasi <span className="siqah-public-accent">Pembayaran</span></span>}
        description="Silakan lakukan transfer dan unggah bukti pembayaran Anda."
      />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side: Instructions */}
        <div className="space-y-6">
          <PublicCard className="overflow-hidden border-none shadow-md">
            <div className="bg-[var(--color-public-primary)] p-4 text-white font-bold">
              Detail Tagihan
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-text-default)]/60">ID Pesanan</span>
                <span className="font-mono font-bold text-[var(--color-public-primary)] px-2 py-1 bg-gray-50 rounded">{orderInfo.id}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-sm text-[var(--color-text-default)]/60">Total Bayar</span>
                <span className="text-2xl font-bold text-[var(--color-public-accent)]">
                  {formatCurrencyIdr(orderInfo.total)}
                </span>
              </div>
            </div>
          </PublicCard>

          <div className="space-y-4">
            <h3 className="font-bold text-[#3b3b3b] flex items-center gap-2">
              <AlertCircle size={18} className="text-amber-600" />
              Transfer ke Rekening Berikut:
            </h3>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 border border-dashed border-[var(--color-public-surface-border)] rounded-3xl bg-white/40">
                <RefreshCw size={24} className="animate-spin text-[var(--color-public-accent)]" />
                <span className="text-xs text-[var(--color-text-default)]/50">Memuat rekening...</span>
              </div>
            ) : error ? (
              <div className="p-6 border border-red-100 bg-red-50/50 rounded-3xl text-center">
                <p className="text-sm text-red-600 mb-3">{error}</p>
                <button onClick={fetchBankAccounts} className="text-sm font-bold text-red-700 hover:underline flex items-center justify-center mx-auto gap-2">
                  <RefreshCw size={14} /> Coba Lagi
                </button>
              </div>
            ) : bankAccounts.length > 0 ? (
              bankAccounts.map((acc, idx) => (
                <div key={idx} className="p-4 bg-white border border-[#eee6da] rounded-xl flex justify-between items-center shadow-sm">
                  <div>
                    <p className="text-xs font-bold text-[var(--color-brand-primary)] uppercase">{acc.bank}</p>
                    <p className="text-lg font-bold text-[#3b3b3b]">{acc.noRek}</p>
                    <p className="text-xs text-[#7a7368]">a.n. {acc.atasNama}</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(acc.noRek, idx)}
                    className="p-2 hover:bg-[#f9f6ef] rounded-lg transition-colors text-[#7a7368]"
                    title="Salin No. Rekening"
                  >
                    {copiedIndex === idx ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                  </button>
                </div>
              ))
            ) : (
              <div className="p-4 border border-[#eee6da] rounded-xl text-center italic text-sm text-[#7a7368]">
                Tidak ada data rekening tersedia.
              </div>
            )}
          </div>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-xs text-amber-800 leading-relaxed shadow-sm">
            <strong>Penting:</strong> Pastikan Anda mentransfer sesuai dengan nominal total bayar agar verifikasi dapat dilakukan dengan lebih cepat.
          </div>
        </div>

        {/* Right Side: Upload Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PublicCard className="overflow-hidden border-none shadow-md">
              <div className="bg-[var(--color-public-primary)] p-4 text-white font-bold">
                Unggah Bukti Transfer
              </div>
              <div className="p-6">
                <div 
                  className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all min-h-[220px] relative ${
                    previewUrl ? 'border-[var(--color-public-accent)] bg-[var(--color-public-accent)]/5' : 'border-gray-200 hover:border-[var(--color-public-accent)]/40 hover:bg-gray-50'
                  }`}
                >
                  {previewUrl ? (
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                      <button 
                        type="button"
                        onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                      >
                        <Check size={18} className="rotate-45" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="p-5 bg-[var(--core-public-bg-end)] rounded-full mb-4 shadow-inner">
                        <Upload size={32} className="text-[var(--color-public-accent)]" />
                      </div>
                      <p className="text-sm font-semibold text-[var(--color-public-primary)]">Pilih atau seret foto bukti transfer</p>
                      <p className="text-xs text-[var(--color-text-default)]/50 mt-1">Format: JPG, PNG (Maks 2MB)</p>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>

                <div className="mt-6 flex items-start gap-2 text-[10px] text-[var(--color-text-default)]/40 italic">
                  <ImageIcon size={14} className="shrink-0 mt-0.5" />
                  <p>Hanya preview lokal. Data tidak akan disimpan di server (Development mode).</p>
                </div>
              </div>
            </PublicCard>

            <PublicButton 
              type="submit" 
              variant="solid" 
              size="lg"
              className="w-full py-4 shadow-lg" 
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Mengunggah..." : "Kirim Bukti Pembayaran"}
            </PublicButton>
          </form>
        </div>
      </div>
      
      {/* Info Label */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-[#aaa] font-medium uppercase tracking-widest mt-8">
        <Server size={12} />
        <span>Backend Status: API-Backed (Read-Only Mode)</span>
      </div>
    </div>
  );
}
