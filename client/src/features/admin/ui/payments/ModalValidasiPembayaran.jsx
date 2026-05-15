import React from "react";
import { Card, CardHeader, CardContent, Button } from "@/shared/ui";
import { X, Check, AlertCircle } from "lucide-react";
import { formatCurrencyIdr } from "@/shared/lib";

export default function ModalValidasiPembayaran({
  data,
  onClose,
  onApprove,
  onReject,
  isSubmitting = false,
}) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        <CardHeader className="flex flex-row items-center justify-between border-b border-[#eee6da] pb-4">
          <div>
            <h3 className="text-xl font-bold text-[#3b3b3b]">Validasi Pembayaran</h3>
            <p className="text-sm text-[#7a7368]">ID: {data.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f9f6ef] rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <X size={20} className="text-[#7a7368]" />
          </button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <label className="text-xs font-bold text-[#7a7368] uppercase">Konsumen</label>
                  <p className="text-sm font-semibold text-[#3b3b3b]">{data.konsumen}</p>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                  data.status === 'Diterima' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  data.status === 'Menunggu Validasi' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-gray-50 text-gray-600 border-gray-100'
                }`}>
                  {data.status}
                </span>
              </div>
              <div>
                <label className="text-xs font-bold text-[#7a7368] uppercase">Jumlah Transfer</label>
                <p className="text-lg font-bold text-[var(--color-brand-primary)]">
                  {formatCurrencyIdr(data.jumlah)}
                </p>
              </div>
              <div className="p-3 bg-[#f9f6ef] rounded-lg border border-[#eee6da] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[10px] font-bold text-[#7a7368] uppercase tracking-wider">Metode</span>
                  <span className="text-xs font-semibold text-[#3b3b3b]">{data.metode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-bold text-[#7a7368] uppercase tracking-wider">Tanggal</span>
                  <span className="text-xs font-semibold text-[#3b3b3b]">{data.tanggal}</span>
                </div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex gap-2">
                <AlertCircle size={18} className="text-amber-600 shrink-0" />
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  Bandingkan nominal bukti transfer dengan total tagihan. Pastikan bukti tidak duplikat atau palsu.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7a7368] uppercase">Bukti Transfer</label>
              <div className="border border-[#eee6da] rounded-lg overflow-hidden bg-[#fefbf7] relative group">
                {data.bukti ? (
                  <>
                    <img
                      src={data.bukti}
                      alt="Bukti Transfer"
                      className="w-full h-auto max-h-[300px] object-contain"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a href={data.bukti} target="_blank" rel="noreferrer" className="text-white text-xs bg-[var(--color-brand-primary)] px-3 py-1.5 rounded-full shadow-lg">
                        Buka Gambar Full
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="w-full aspect-[3/4] flex flex-col items-center justify-center text-[#7a7368] space-y-2">
                    <AlertCircle size={32} />
                    <p className="text-xs font-semibold uppercase">Belum Unggah Bukti</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3 justify-end">
            <Button
              variant="ghost"
              onClick={onReject}
              disabled={isSubmitting}
              className="text-red-600 hover:bg-red-50"
            >
              Tolak Pembayaran
            </Button>
            <Button
              variant="primary"
              onClick={onApprove}
              isLoading={isSubmitting}
            >
              <Check size={18} />
              Konfirmasi & Terima
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
