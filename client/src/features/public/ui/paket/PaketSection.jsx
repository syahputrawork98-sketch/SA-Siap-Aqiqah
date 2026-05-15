import React from "react";
import { motion } from "framer-motion";
import { PublicButton, PublicCard, PublicSection, SectionHeading } from "@/shared/ui";

const paketList = [
  {
    id: "PKT-001",
    nama: "Paket Aqiqah Premium",
    deskripsi: "Berisi sate kambing, gulai, dan nasi kebuli.",
    harga: 3000000,
    foto: "https://placehold.co/400",
  },
  {
    id: "PKT-002",
    nama: "Paket Aqiqah Hemat",
    deskripsi: "Paket ekonomis dengan cita rasa lezat.",
    harga: 2000000,
    foto: "https://placehold.co/400",
  },
  {
    id: "PKT-003",
    nama: "Paket Aqiqah Keluarga",
    deskripsi: "Paket lengkap untuk keluarga besar.",
    harga: 4000000,
    foto: "https://placehold.co/400",
  },
];

const PaketSection = () => {
  return (
    <PublicSection
      className="bg-gradient-to-b from-[#fefbf7] to-[#f9f6ef]"
      overlay="soft"
      overlayClassName="bg-gradient-to-b from-white/20 via-[var(--color-public-primary)]/20 to-white/40"
      containerClassName="px-6"
    >
      <SectionHeading className="mb-12" title="Daftar Paket Aqiqah Siqah" />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {paketList.map((paket, index) => (
          <motion.div
            key={paket.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <PublicCard className="overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-56 w-full">
                <img src={paket.foto} alt={paket.nama} className="h-full w-full object-cover" />
              </div>

              <div className="p-6 text-center">
                <h3 className="mb-2 font-heading text-2xl text-[var(--color-public-primary)]">{paket.nama}</h3>
                <p className="mb-4 text-sm text-[color-mix(in_srgb,var(--color-public-primary)_76%,#fff)] md:text-base">
                  {paket.deskripsi}
                </p>
                <p className="mb-4 text-xl font-bold text-[var(--color-public-accent)]">
                  Rp {paket.harga.toLocaleString("id-ID")}
                </p>
                <PublicButton size="sm">Lihat Detail</PublicButton>
              </div>
            </PublicCard>
          </motion.div>
        ))}
      </div>
    </PublicSection>
  );
};

export default PaketSection;
