import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardContent, Button } from "@/shared/ui";
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
      <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <Check size={40} />
        </div>
        <h2 className="text-2xl font-bold text-[#3b3b3b]">Bukti Berhasil Diunggah!</h2>
        <p className="text-[#7a7368]">
          Terima kasih. Bukti pembayaran Anda sedang dalam proses verifikasi oleh tim Admin kami. 
          Pemberitahuan akan dikirimkan setelah status diperbarui.
        </p>
        <Button variant="primary" onClick={() => window.location.href = "/"}>
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-3xl font-bold text-[#3b3b3b]">Konfirmasi <span className="siqah-accent-text">Pembayaran</span></h1>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full flex items-center gap-1">
            <Server size={10} />
            Dev API
          </span>
        </div>
        <p className="text-[#7a7368]">Silakan lakukan transfer dan unggah bukti pembayaran Anda.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side: Instructions */}
        <div className="space-y-6">
          <Card className="border-[#eee6da]">
            <CardHeader className="bg-[#f9f6ef]">
              <h3 className="font-bold text-[#3b3b3b]">Detail Tagihan</h3>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-[#7a7368]">ID Pesanan</span>
                <span className="font-mono font-bold text-[#3b3b3b]">{orderInfo.id}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#eee6da]">
                <span className="text-[#7a7368]">Total Bayar</span>
                <span className="text-xl font-bold text-[var(--color-brand-primary)]">
                  {formatCurrencyIdr(orderInfo.total)}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-bold text-[#3b3b3b] flex items-center gap-2">
              <AlertCircle size={18} className="text-amber-600" />
              Transfer ke Rekening Berikut:
            </h3>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2 border border-[#eee6da] rounded-xl bg-white/50">
                <RefreshCw size={24} className="animate-spin text-[var(--color-brand-primary)]" />
                <span className="text-xs text-[#7a7368]">Memuat rekening...</span>
              </div>
            ) : error ? (
              <div className="p-4 border border-red-200 bg-red-50 rounded-xl text-center">
                <p className="text-sm text-red-600 mb-2">{error}</p>
                <Button variant="ghost" size="sm" onClick={fetchBankAccounts} className="text-red-700 hover:bg-red-100">
                  <RefreshCw size={14} className="mr-2" /> Coba Lagi
                </Button>
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

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700 leading-relaxed">
            <strong>Penting:</strong> Pastikan Anda mentransfer sesuai dengan nominal total bayar agar verifikasi dapat dilakukan dengan lebih cepat.
          </div>
        </div>

        {/* Right Side: Upload Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="border-[#eee6da] overflow-hidden">
              <CardHeader className="bg-[#f9f6ef]">
                <h3 className="font-bold text-[#3b3b3b]">Unggah Bukti Transfer</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all min-h-[200px] relative ${
                    previewUrl ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary-soft)]/5' : 'border-[#eee6da] hover:border-[#ccc]'
                  }`}
                >
                  {previewUrl ? (
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#eee6da] bg-white">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                      <button 
                        type="button"
                        onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg"
                      >
                        <Check size={16} className="rotate-45" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-[#f9f6ef] rounded-full mb-4">
                        <Upload size={32} className="text-[var(--color-brand-primary)]" />
                      </div>
                      <p className="text-sm font-semibold text-[#3b3b3b]">Pilih atau seret foto bukti transfer</p>
                      <p className="text-xs text-[#7a7368] mt-1">Format: JPG, PNG (Maks 2MB)</p>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>

                <div className="mt-6 flex items-start gap-2 text-xs text-[#7a7368]">
                  <ImageIcon size={14} className="shrink-0 mt-0.5" />
                  <p>Hanya preview lokal. Data tidak akan disimpan di server (Development mode).</p>
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full py-6 text-lg" 
              disabled={!selectedFile || isUploading}
              isLoading={isUploading}
            >
              Kirim Bukti Pembayaran
            </Button>
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
