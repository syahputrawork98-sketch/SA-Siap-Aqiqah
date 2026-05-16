import React from "react";
import { PublicButton, PublicSection } from "@/shared/ui";
import { FiUser, FiClock } from "react-icons/fi";

const UserDashboard = () => {
  return (
    <PublicSection className="py-24" overlay="soft" usePattern={true}>
      <div className="max-w-4xl mx-auto p-12 text-center space-y-8 bg-white rounded-3xl shadow-xl border border-blue-100">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <FiUser size={40} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-heading font-bold text-[var(--color-public-primary)]">Dashboard Konsumen</h2>
          <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
            <FiCheckCircle />
            <span>Akses Pesanan Aktif</span>
          </div>
        </div>

        <p className="text-[var(--color-text-default)]/70 leading-relaxed max-w-xl mx-auto">
          Selamat datang di portal keluarga Siap Aqiqah. Di sini Anda dapat memantau status persiapan hewan, proses memasak, hingga pengiriman paket aqiqah ke lokasi Anda secara transparan.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <PublicButton variant="solid" onClick={() => window.location.href = "/user/pesanan"}>
            <FiPackage className="mr-2" /> Lihat Pesanan Saya
          </PublicButton>
          <PublicButton variant="outline" onClick={() => window.location.href = "/"}>
            Kembali ke Beranda
          </PublicButton>
        </div>
      </div>
    </PublicSection>
  );
};

export default UserDashboard;
