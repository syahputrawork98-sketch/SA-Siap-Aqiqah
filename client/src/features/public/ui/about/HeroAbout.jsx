import React from "react";
import { motion } from "framer-motion";
import { PublicButton, PublicSection } from "@/shared/ui";

const HeroAbout = () => {
  return (
    <PublicSection
      className="bg-gradient-to-b from-[#fefbf7] to-[#f9f6ef]"
      overlay="soft"
      overlayClassName="backdrop-blur-[2px]"
      containerClassName="flex flex-col items-center gap-12 px-6 md:flex-row md:px-10"
    >
      <motion.div
        className="flex-1 space-y-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="font-heading text-4xl font-bold leading-snug text-[var(--color-public-primary)] md:text-5xl">
          Tentang <span className="text-[var(--color-public-accent)]">Siqah Aqiqah</span>
        </h1>
        <p className="text-lg leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">
          <span className="font-semibold text-[var(--color-public-primary)]">Siqah</span> hadir untuk
          membantu keluarga Muslim menjalankan ibadah aqiqah dan qurban dengan cara yang mudah,
          amanah, dan sesuai tuntunan syariat. Kami berkomitmen menghadirkan layanan yang
          profesional, transparan, dan penuh keberkahan bagi setiap keluarga.
        </p>
        <PublicButton as="a" href="/layanan" className="shadow-md">
          Lihat Layanan Kami
        </PublicButton>
      </motion.div>

      <motion.div
        className="flex flex-1 justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src="https://res.cloudinary.com/dcida9qys/image/upload/v1761098052/Siqah-logo-HD_fpetwm.png"
          alt="Tentang Siqah"
          className="w-72 rounded-2xl transition-transform duration-500 hover:scale-105 md:w-[400px]"
        />
      </motion.div>
    </PublicSection>
  );
};

export default HeroAbout;
