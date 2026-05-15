import React from "react";
import { motion } from "framer-motion";
import { PublicSection, PublicStat, SectionHeading } from "@/shared/ui";

const HeroSection = () => {
  return (
    <PublicSection className="py-24 text-center" overlay="dark" containerClassName="max-w-3xl px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <SectionHeading
          title="Pilih Paket Aqiqah Terbaik untuk Keluarga Anda"
          titleClassName="text-[var(--color-public-accent)]"
          descriptionClassName="font-sans text-gray-100"
          description="Disiapkan oleh catering profesional, disembelih sesuai syariat, dan dikirim dengan amanah."
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <PublicStat label="Mulai Harga" value="Rp2,0jt" helper="Paket hemat" />
          <PublicStat label="Menu" value="15+" helper="Variasi olahan" />
          <PublicStat label="On-time" value="99%" helper="Pengantaran tepat" />
        </div>
      </motion.div>
    </PublicSection>
  );
};

export default HeroSection;
