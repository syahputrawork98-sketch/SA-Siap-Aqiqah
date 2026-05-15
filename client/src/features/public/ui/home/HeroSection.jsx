import React from "react";
import { motion } from "framer-motion";
import { PublicButton, PublicSection } from "@/shared/ui";

const HeroSection = () => {
  return (
    <PublicSection
      className="siqah-public-bg-base"
      containerClassName="flex flex-col-reverse items-center justify-center gap-10 md:flex-row md:gap-20"
      overlay="hero"
      backgroundImage="https://images.unsplash.com/photo-1716047866102-ec21d084fe0e?q=80&w=1170&auto=format&fit=crop"
      fixedBackground={false}
    >
      <motion.div
        className="max-w-xl text-center text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="mb-4 font-heading text-4xl font-bold leading-tight drop-shadow-lg md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Rayakan Kelahiran Si Kecil <br />
          dengan Aqiqah yang Penuh Berkah
        </motion.h1>

        <motion.p
          className="siqah-public-text-on-dark-soft mb-6 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Siqah menghadirkan layanan aqiqah yang praktis, syari, dan hangat - dari
          pemilihan hewan hingga pengantaran ke rumah Anda dengan penuh amanah.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <PublicButton as="a" href="#paket" className="shadow-lg">
            Lihat Paket Aqiqah
          </PublicButton>
          <PublicButton as="a" href="#kontak" variant="outline">
            Hubungi Kami
          </PublicButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative flex justify-center md:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <div className="relative overflow-hidden rounded-3xl border-4 border-[var(--color-public-surface-border-strong)] shadow-2xl">
          <motion.div
            className="siqah-public-overlay-soft-glow absolute inset-0 z-10 rounded-3xl"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <video
            src="https://res.cloudinary.com/dcida9qys/video/upload/v1761261096/White_Minimalist_Morning_Routine_Mobile_Video_1_a04fes.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="relative z-10 mx-auto h-[300px] w-[90%] rounded-3xl object-cover md:h-[400px] md:w-[500px]"
          />

          <motion.div
            className="absolute right-4 top-4 z-20 rounded-full bg-[var(--color-public-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-text-inverse)] shadow-md backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Amanah dan Halal
          </motion.div>
        </div>
      </motion.div>
    </PublicSection>
  );
};

export default HeroSection;
