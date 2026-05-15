import React from "react";
import { motion } from "framer-motion";
import { PublicButton, PublicSection, SectionHeading } from "@/shared/ui";

const PaketPilihan = () => {
  return (
    <PublicSection className="py-24 text-center" overlay="dark" containerClassName="max-w-4xl px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          title="Buat Paket Aqiqah Sesuai Keinginan Anda"
          titleClassName="text-white"
          descriptionClassName="font-sans text-gray-100"
          description="Pilih menu, jumlah hewan, dan layanan tambahan sesuai kebutuhan keluarga Anda. Kami siap membantu mewujudkan paket aqiqah yang sempurna dan sesuai syariat."
          className="mb-10"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <PublicButton size="lg" className="font-bold shadow-lg hover:shadow-xl">
            Buat Paket Saya
          </PublicButton>
        </motion.div>
      </motion.div>
    </PublicSection>
  );
};

export default PaketPilihan;
