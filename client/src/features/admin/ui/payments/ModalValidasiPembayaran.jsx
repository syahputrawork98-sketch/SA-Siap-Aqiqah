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
              <div>
                <label className="text-xs font-bold text-[#7a7368] uppercase">Konsumen</label>
                <p className="text-sm font-semibold text-[#3b3b3b]">{data.konsumen}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-[#7a7368] uppercase">Jumlah Transfer</label>
                <p className="text-lg font-bold text-[var(--color-brand-primary)]">
                  {formatCurrencyIdr(data.jumlah)}
                </p>
              </div>
              <div>
                <label className="text-xs font-bold text-[#7a7368] uppercase">Metode</label>
                <p className="text-sm text-[#3b3b3b]">{data.metode}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-[#7a7368] uppercase">Tanggal</label>
                <p className="text-sm text-[#3b3b3b]">{data.tanggal}</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex gap-2">
                <AlertCircle size={18} className="text-amber-600 shrink-0" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  Pastikan nominal yang tertera pada bukti transfer sesuai dengan jumlah yang ditagihkan.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7a7368] uppercase">Bukti Transfer</label>
              <div className="border border-[#eee6da] rounded-lg overflow-hidden bg-[#fefbf7]">
                <img
                  src={data.bukti}
                  alt="Bukti Transfer"
                  className="w-full h-auto max-h-[300px] object-contain"
                />
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
              Terima & Validasi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
