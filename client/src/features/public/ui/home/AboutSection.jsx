import React from "react";
import { motion } from "framer-motion";
import { PublicButton, PublicSection, SectionHeading } from "@/shared/ui";

const AboutSection = () => {
  return (
    <PublicSection overlay="dark" className="bg-fixed bg-center bg-cover">
      <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:gap-32">
        <motion.div
          className="relative flex basis-1/2 justify-center md:justify-end"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="absolute -z-0 h-72 w-72 rounded-full bg-[var(--color-public-accent)]/20 blur-3xl" />
          <motion.img
            src="https://res.cloudinary.com/dcida9qys/image/upload/v1761098052/Siqah-logo-HD_fpetwm.png"
            alt="Logo Siqah"
            className="relative z-10 h-52 w-80 drop-shadow-2xl md:h-72 md:w-80"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>

        <motion.div
          className="basis-1/2 text-white"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <SectionHeading
            title="Tentang Siqah"
            align="left"
            titleClassName="text-[var(--color-public-accent)]"
            descriptionClassName="siqah-public-text-on-dark-soft mx-0"
            description="Siqah lahir dari doa dan harapan para orang tua Muslim yang ingin menjalankan aqiqah dengan mudah, amanah, dan penuh keberkahan."
          />

          <p className="siqah-public-text-on-dark-soft mb-6 text-base leading-relaxed sm:text-lg">
            Sejak tahun <span className="font-semibold text-[var(--color-public-accent)]">2025</span> di Bandung,
            kami berkomitmen menghadirkan layanan aqiqah yang praktis, syari, dan berkesan -
            mulai dari perawatan hewan, proses penyembelihan sesuai sunnah, hingga pengantaran
            hidangan terbaik untuk keluarga Anda.
          </p>

          <PublicButton as="a" href="#tentang" className="shadow-md">
            Baca Lebih Lanjut
          </PublicButton>
        </motion.div>
      </div>
    </PublicSection>
  );
};

export default AboutSection;
