import React, { useState } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardContent,
  EmptyState,
} from "@/shared/ui";
import { Eye, CreditCard, Clock, CheckCircle, FileCheck } from "lucide-react";
import { formatCurrencyIdr } from "@/shared/lib";
import { MOCK_PAYMENTS } from "../model/adminPaymentsData";
import ModalValidasiPembayaran from "../ui/payments/ModalValidasiPembayaran";

export default function Pembayaran() {
  const [activeTab, setActiveTab] = useState("pengajuan");
  const [data, setData] = useState(MOCK_PAYMENTS);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { id: "pengajuan", label: "Pengajuan" },
    { id: "menunggu", label: "Menunggu Validasi" },
    { id: "validasi", label: "Diterima" },
    { id: "lunas", label: "Lunas" },
  ];

  const getFilteredData = (tabId) => {
    switch (tabId) {
      case "pengajuan":
        return data.filter((item) => item.status === "Pengajuan");
      case "menunggu":
        return data.filter((item) => item.status === "Menunggu Validasi");
      case "validasi":
        return data.filter((item) => item.status === "Diterima");
      case "lunas":
        return data.filter((item) => item.status === "Lunas");
      default:
        return data;
    }
  };

  const handleOpenModal = (item) => {
    setSelectedData(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApprove = () => {
    if (!selectedData) return;
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const nextStatus = selectedData.status === "Pengajuan" ? "Menunggu Validasi" : 
                         selectedData.status === "Menunggu Validasi" ? "Diterima" : "Lunas";
      
      setData(prev => prev.map(item => 
        item.id === selectedData.id ? { ...item, status: nextStatus } : item
      ));
      
      setIsSubmitting(false);
      setShowModal(false);
      
      // Auto switch tab to show progress
      if (nextStatus === "Menunggu Validasi") setActiveTab("menunggu");
      else if (nextStatus === "Diterima") setActiveTab("validasi");
      else if (nextStatus === "Lunas") setActiveTab("lunas");
    }, 800);
  };

  const handleReject = () => {
    if (!selectedData) return;
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setData(prev => prev.map(item => 
        item.id === selectedData.id ? { ...item, status: "Pengajuan" } : item
      ));
      
      setIsSubmitting(false);
      setShowModal(false);
      setActiveTab("pengajuan");
    }, 800);
  };

  const currentFilteredData = getFilteredData(activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#3b3b3b] tracking-wide">
          Manajemen <span className="siqah-accent-text">Pembayaran</span>
        </h2>
        <p className="text-sm text-[#7a7368]">
          Kelola dan validasi pembayaran konsumen (Mock Data).
        </p>
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

      <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm">
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#3b3b3b] capitalize">
            {activeTab === "pengajuan"
              ? "Pengajuan Baru"
              : activeTab === "menunggu"
              ? "Menunggu Validasi"
              : activeTab === "validasi"
              ? "Pembayaran Divalidasi"
              : "Pembayaran Lunas"}
          </h3>
        </CardHeader>
        <CardContent>
          {currentFilteredData.length === 0 ? (
            <EmptyState message="Tidak ada data pembayaran pada kategori ini." />
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
                <tbody>
                  {currentFilteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="text-sm text-[#3b3b3b] border-b border-[#f0ebe2] hover:bg-[#f9f6ef]/60 transition"
                    >
                      <td className="py-2 px-3 font-medium">{item.id}</td>
                      <td className="py-2 px-3">{item.konsumen}</td>
                      <td className="py-2 px-3">{item.tanggal}</td>
                      <td className="py-2 px-3 font-semibold">{formatCurrencyIdr(item.jumlah)}</td>
                      <td className="py-2 px-3">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <Button
                          onClick={() => handleOpenModal(item)}
                          variant="ghost"
                          size="sm"
                          className="mx-auto text-[var(--color-public-accent)] hover:text-[var(--color-public-accent-hover)]"
                        >
                          <Eye size={16} />
                          <span className="text-sm">Lihat</span>
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

      {showModal && selectedData && (
        <ModalValidasiPembayaran
          data={selectedData}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const base =
    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5";

  switch (status) {
    case "Pengajuan":
      return (
        <span className={`${base} bg-gray-50 text-gray-600 border border-gray-100`}>
          <FileCheck size={12} /> {status}
        </span>
      );
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
    default:
      return <span className={`${base} bg-gray-50 text-gray-600 border border-gray-100`}>{status}</span>;
  }
}
