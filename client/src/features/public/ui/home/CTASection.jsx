import React from "react";
import { motion } from "framer-motion";
import { PublicButton, PublicSection, SectionHeading } from "@/shared/ui";

const CTASection = () => {
  return (
    <PublicSection
      className="py-24 text-center"
      overlay="dark"
      containerClassName="max-w-4xl text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <SectionHeading
          title="Wujudkan Aqiqah Penuh Berkah Bersama Siqah"
          titleClassName="text-[var(--color-public-accent)]"
          descriptionClassName="siqah-public-text-on-dark-soft"
          description="Percayakan momen berharga keluarga Anda pada Siqah, layanan aqiqah yang berkualitas, terpercaya, dan siap memberi pengalaman terbaik dari kandang hingga rumah."
          className="mb-10"
        />

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          viewport={{ once: true }}
        >
          <PublicButton as="a" href="#paket" size="lg" className="shadow-md">
            Lihat Paket Aqiqah
          </PublicButton>
          <PublicButton as="a" href="#kontak" size="lg" className="shadow-md">
            Konsultasi Sekarang
          </PublicButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="siqah-public-overlay-soft-glow absolute inset-0"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </PublicSection>
  );
};

export default CTASection;
