import React from "react";
import { motion } from "framer-motion";
import { PublicButton, PublicCard, PublicSection, SectionHeading } from "@/shared/ui";
import paketData from "@/shared/mocks/public/home/paket.json";

const PaketSection = () => {
  return (
    <PublicSection id="paket" className="siqah-public-bg-base">
      <SectionHeading
        className="mb-12"
        title="Pilihan Paket Aqiqah"
        description="Kami menyediakan beragam paket aqiqah yang dirancang dengan cinta untuk membantu keluarga Muslim merayakan kelahiran dengan penuh berkah dan kemudahan."
      />

      <motion.div
        className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {paketData.map((paket, index) => (
          <motion.div
            key={paket.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <PublicCard className="overflow-hidden">
              <div className="relative">
                <img src={paket.gambar} alt={paket.nama} className="h-56 w-full object-cover" />
                <div className="siqah-public-overlay-image-bottom absolute inset-0" />
              </div>

              <div className="p-6 text-center">
                <h3 className="mb-2 font-heading text-xl font-bold text-[var(--color-public-primary)]">
                  {paket.nama}
                </h3>
                <p className="siqah-public-text-soft mb-3 font-sans">
                  {paket.deskripsi}
                </p>
                <p className="mb-4 text-lg font-bold text-[var(--color-public-accent)]">{paket.harga}</p>
                <PublicButton as="a" href="#transaksi" size="sm" className="shadow-md">
                  Pesan Sekarang
                </PublicButton>
              </div>
            </PublicCard>
          </motion.div>
        ))}
      </motion.div>
    </PublicSection>
  );
};

export default PaketSection;
