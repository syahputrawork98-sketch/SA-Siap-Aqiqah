import React from "react";
import { PublicButton, PublicSection } from "@/shared/ui";
import { FiGrid, FiClock } from "react-icons/fi";

const MitraKandangDashboard = () => {
  return (
    <PublicSection className="py-24" overlay="soft" usePattern={true}>
      <div className="max-w-4xl mx-auto p-12 text-center space-y-8 bg-white rounded-3xl shadow-xl border border-emerald-100">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <FiGrid size={40} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-heading font-bold text-[var(--color-public-primary)]">Dashboard Mitra Kandang</h2>
          <div className="flex items-center justify-center gap-2 text-amber-600 font-medium">
            <FiClock />
            <span>Fitur Sedang Disiapkan</span>
          </div>
        </div>

        <p className="text-[var(--color-text-default)]/70 leading-relaxed max-w-xl mx-auto">
          Halaman untuk mengelola stok hewan, status kesehatan, dan pemilihan hewan aqiqah oleh konsumen sedang dalam tahap pengembangan.
        </p>

        <div className="pt-4">
          <PublicButton variant="solid" onClick={() => window.location.href = "/"}>
            Kembali ke Beranda
          </PublicButton>
        </div>
      </div>
    </PublicSection>
  );
};

export default MitraKandangDashboard;
