import React from "react";
import { motion } from "framer-motion";
import { PublicButton, PublicSection, SectionHeading } from "@/shared/ui";

const CTASection = () => {
  return (
    <PublicSection
      className="py-24"
      overlay="dark"
      overlayClassName="bg-[var(--color-public-primary)]/90"
      containerClassName="max-w-3xl px-6 text-center text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <SectionHeading
          className="mb-10"
          title="Siap Memulai Aqiqah Bersama Siqah?"
          titleClassName="text-[var(--color-public-accent)] drop-shadow-lg"
          descriptionClassName="text-gray-100"
          description="Wujudkan momen penuh berkah dan kebahagiaan keluarga Anda dengan layanan aqiqah yang amanah, profesional, dan sesuai syariat."
        />

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PublicButton as="a" href="/kontak" size="lg" className="rounded-xl shadow-md">
            Konsultasi Sekarang
          </PublicButton>

          <PublicButton as="a" href="/paket" variant="outline" size="lg" className="rounded-xl">
            Lihat Paket Aqiqah
          </PublicButton>
        </div>
      </motion.div>
    </PublicSection>
  );
};

export default CTASection;
