import React from "react";
import { motion } from "framer-motion";
import { GiCookingPot, GiDeliveryDrone, GiGoat } from "react-icons/gi";
import { PublicButton, PublicSection } from "@/shared/ui";

const highlights = [
  {
    icon: <GiGoat />,
    title: "Peternakan Amanah",
    desc: "Hewan sehat dari kandang terverifikasi.",
  },
  {
    icon: <GiCookingPot />,
    title: "Catering Profesional",
    desc: "Diolah oleh juru masak berpengalaman.",
  },
  {
    icon: <GiDeliveryDrone />,
    title: "Pengantaran Tepat Waktu",
    desc: "Dikirim aman ke lokasi Anda.",
  },
];

const HeroSection = () => {
  return (
    <PublicSection
      className="min-h-screen flex items-center py-24"
      overlay="dark"
      overlayClassName="bg-[var(--color-public-primary)]/90"
      containerClassName="flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-8 text-white md:flex-row"
    >
      <motion.div
        className="text-center md:w-1/2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="mb-6 font-heading text-5xl font-bold leading-tight text-[var(--color-public-accent)] drop-shadow-xl md:text-6xl">
          Layanan Aqiqah dan Qurban Terpadu
        </h1>

        <p className="mb-10 text-lg leading-relaxed text-gray-100 md:text-xl">
          Siqah menghadirkan sistem layanan terintegrasi mulai dari pemilihan hewan di kandang,
          pengolahan di catering, hingga pengantaran oleh kurir terpercaya.
        </p>

        <div className="flex items-center justify-center gap-4">
          <PublicButton as="a" href="#layanan" className="rounded-xl shadow-md">
            Jelajahi Layanan
          </PublicButton>
          <PublicButton as="a" href="/paket" variant="outline" className="rounded-xl">
            Lihat Paket
          </PublicButton>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-10 md:w-1/2 md:flex-row md:items-end md:justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
      >
        {highlights.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-3 text-6xl text-[var(--color-public-accent)]">{item.icon}</div>
            <h4 className="text-lg font-semibold">{item.title}</h4>
            <p className="w-40 text-center text-sm text-gray-200">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/30 to-transparent" />
    </PublicSection>
  );
};

export default HeroSection;
