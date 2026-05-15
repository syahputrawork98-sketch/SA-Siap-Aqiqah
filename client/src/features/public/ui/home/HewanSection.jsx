import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { PublicButton, PublicCard, PublicSection, SectionHeading } from "@/shared/ui";
import hewanList from "@/shared/mocks/public/home/hewan.json";

const HewanSection = () => {
  return (
    <PublicSection className="siqah-public-bg-reverse">
      <SectionHeading
        className="mb-12"
        title="Pilihan Hewan Aqiqah"
        description="Semua hewan kami dirawat dengan baik dan disembelih sesuai tuntunan syariat Islam. Anda dapat memilih sesuai kebutuhan keluarga dan paket aqiqah Anda."
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {hewanList.map((hewan, index) => (
          <motion.div
            key={hewan.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <PublicCard className="group relative overflow-hidden">
              <div className="relative">
                <img
                  src={hewan.img}
                  alt={hewan.nama}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {hewan.ready && (
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[var(--color-public-accent)] px-3 py-1 text-xs font-semibold text-[var(--color-text-inverse)] shadow-md">
                    <FaCheckCircle />
                    Siap Aqiqah
                  </div>
                )}
              </div>

              <div className="p-6 text-center">
                <h3 className="mb-2 font-heading text-xl font-bold text-[var(--color-public-primary)]">{hewan.nama}</h3>
                <p className="siqah-public-text-soft mb-1 text-sm">Berat: {hewan.berat}</p>
                <p className="text-lg font-bold text-[var(--color-public-accent)]">{hewan.harga}</p>

                <PublicButton className="mt-4" size="sm">
                  Pilih Sekarang
                </PublicButton>
              </div>
            </PublicCard>
          </motion.div>
        ))}
      </div>
    </PublicSection>
  );
};

export default HewanSection;
