import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardContent,
  EmptyState,
} from "@/shared/ui";
import { Eye, CreditCard, Clock, CheckCircle, FileCheck, RefreshCw, AlertCircle, Server } from "lucide-react";
import { formatCurrencyIdr } from "@/shared/lib";
import { paymentApi } from "../services/paymentApi";
import ModalValidasiPembayaran from "../ui/payments/ModalValidasiPembayaran";

export default function Pembayaran() {
  const [activeTab, setActiveTab] = useState("menunggu");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { id: "menunggu", label: "Menunggu Validasi", status: "Menunggu Validasi" },
    { id: "validasi", label: "Diterima", status: "Diterima" },
    { id: "lunas", label: "Lunas", status: "Lunas" },
    { id: "ditolak", label: "Ditolak", status: "Ditolak" },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentApi.getPayments();
      setData(response.data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data pembayaran.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getFilteredData = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return [];
    return data.filter((item) => item.status === tab.status);
  };

  const handleOpenModal = (item) => {
    setSelectedData(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApprove = async () => {
    if (!selectedData) return;
    setIsSubmitting(true);
    
    try {
      await paymentApi.verifyPayment(selectedData.id, { adminNote: "Verified by Admin" });
      await fetchData();
      setShowModal(false);
    } catch (err) {
      alert(err.message || "Gagal verifikasi pembayaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!selectedData) return;
    const reason = window.prompt("Alasan penolakan pembayaran:");
    if (reason === null) return;

    setIsSubmitting(true);
    try {
      await paymentApi.rejectPayment(selectedData.id, { adminNote: reason });
      await fetchData();
      setShowModal(false);
    } catch (err) {
      alert(err.message || "Gagal menolak pembayaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentFilteredData = getFilteredData(activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-semibold text-[#3b3b3b] tracking-wide">
              Manajemen <span className="siqah-accent-text">Pembayaran</span>
            </h2>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full flex items-center gap-1">
              <Server size={10} />
              Admin Action Active
            </span>
          </div>

          <p className="text-sm text-[#7a7368]">
            Kelola dan validasi pembayaran konsumen secara dinamis.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchData} disabled={loading} className="text-[#7a7368]">
          <RefreshCw size={16} className={loading ? "animate-spin mr-2" : "mr-2"} />
          Muat Ulang
        </Button>
      </div>

      {/* Custom Tabs */}
      <div className="border-b border-[#eee6da]">
        <div className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]"
                  : "border-transparent text-[#7a7368] hover:text-[#3b3b3b] hover:border-[#eee6da]"
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 bg-[#f9f6ef] rounded-full text-[10px] text-[#7a7368]">
                {getFilteredData(tab.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-red-100 text-red-600 rounded-full">
              <AlertCircle size={40} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-800">Gagal Memuat Pembayaran</h3>
              <p className="text-sm text-red-600 max-w-md mx-auto mt-1">{error}</p>
            </div>
            <Button variant="primary" onClick={fetchData} className="bg-red-600 hover:bg-red-700 border-none">
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw size={32} className="animate-spin text-[var(--color-brand-primary)]" />
                <span className="text-xs font-bold text-[#7a7368] uppercase tracking-widest">Sinkronisasi Pembayaran...</span>
              </div>
            </div>
          )}
          <CardHeader>
            <h3 className="text-lg font-semibold text-[#3b3b3b] capitalize">
               {activeTab === "menunggu"
                 ? "Menunggu Validasi"
                 : activeTab === "validasi"
                 ? "Pembayaran Divalidasi"
                 : activeTab === "lunas"
                 ? "Pembayaran Lunas"
                 : "Pembayaran Ditolak"}
            </h3>
          </CardHeader>
          <CardContent>
            {currentFilteredData.length === 0 ? (
              <EmptyState message={loading ? "Memuat data..." : "Tidak ada data pembayaran pada kategori ini."} />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="text-sm text-[#7a7368] border-b border-[#eee6da]">
                      <th className="py-2 px-3 text-left font-semibold">ID</th>
                      <th className="py-2 px-3 text-left font-semibold">Nama Konsumen</th>
                      <th className="py-2 px-3 text-left font-semibold">Tanggal</th>
                      <th className="py-2 px-3 text-left font-semibold">Jumlah</th>
                      <th className="py-2 px-3 text-left font-semibold">Status</th>
                      <th className="py-2 px-3 text-center font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0ebe2]">
                    {currentFilteredData.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => handleOpenModal(item)}
                        className="text-sm text-[#3b3b3b] hover:bg-blue-50/50 cursor-pointer transition-colors group"
                      >
                        <td className="py-3 px-3 font-medium">{item.id}</td>
                        <td className="py-3 px-3">{item.konsumen}</td>
                        <td className="py-3 px-3">{item.tanggal}</td>
                        <td className="py-3 px-3 font-semibold">{formatCurrencyIdr(item.jumlah)}</td>
                        <td className="py-3 px-3">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="py-3 px-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mx-auto text-[var(--color-public-accent)] hover:text-blue-600 px-2 group-hover:bg-blue-100/50"
                          >
                            <Eye size={16} className="mr-1" />
                            <span className="text-xs font-bold">Validasi</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {showModal && selectedData && (
        <ModalValidasiPembayaran
          data={selectedData}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Info Label */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-[#aaa] font-medium uppercase tracking-widest">
        <Server size={12} />
        <span>Backend Status: API-Backed (Read-Only Mode)</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const base =
    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5";

  switch (status) {
    case "Menunggu Validasi":
      return (
        <span className={`${base} bg-amber-50 text-amber-600 border border-amber-100`}>
          <Clock size={12} /> {status}
        </span>
      );
    case "Diterima":
      return (
        <span className={`${base} bg-blue-50 text-blue-600 border border-blue-100`}>
          <CheckCircle size={12} /> {status}
        </span>
      );
    case "Lunas":
      return (
        <span className={`${base} bg-emerald-50 text-emerald-600 border border-emerald-100`}>
          <CreditCard size={12} /> {status}
        </span>
      );
    case "Ditolak":
      return (
        <span className={`${base} bg-red-50 text-red-600 border border-red-100`}>
          <AlertCircle size={12} /> {status}
        </span>
      );
    default:
      return <span className={`${base} bg-gray-50 text-gray-600 border border-gray-100`}>{status}</span>;
  }
}
