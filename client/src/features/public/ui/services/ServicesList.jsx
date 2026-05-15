import React from "react";
import { motion } from "framer-motion";
import { FaBoxOpen, FaChartLine, FaGift, FaMapMarkedAlt } from "react-icons/fa";
import { PublicCard, PublicSection, SectionHeading } from "@/shared/ui";

const services = [
  {
    icon: <FaMapMarkedAlt className="text-4xl text-[var(--color-public-accent)]" />,
    title: "Teknologi Pelacakan Canggih",
    desc: "Pantau setiap tahap proses aqiqah dan qurban secara real-time melalui sistem tracking Siqah.",
  },
  {
    icon: <FaChartLine className="text-4xl text-[var(--color-public-accent)]" />,
    title: "Laporan Proses Otomatis",
    desc: "Dapatkan pembaruan singkat dari proses aqiqah Anda, mulai dari pemotongan hingga pengiriman.",
  },
  {
    icon: <FaBoxOpen className="text-4xl text-[var(--color-public-accent)]" />,
    title: "Paket Sesuai Kebutuhan",
    desc: "Pilih berbagai paket aqiqah lengkap yang dapat disesuaikan dengan kebutuhan dan anggaran keluarga Anda.",
  },
  {
    icon: <FaGift className="text-4xl text-[var(--color-public-accent)]" />,
    title: "Bonus dan Hadiah Tambahan",
    desc: "Nikmati bonus menarik seperti mukena, sajadah, dan perlengkapan ibadah sebagai bentuk apresiasi dari Siqah.",
  },
];

const ServicesList = () => {
  return (
    <PublicSection
      id="layanan"
      className="py-24 bg-[#F9F9F7]"
      overlay="soft"
      overlayClassName="bg-gradient-to-b from-white/20 via-[var(--color-public-primary)]/20 to-white/40"
    >
      <SectionHeading
        className="mb-16"
        title="Keunggulan Layanan Siqah"
        description="Kami berkomitmen memberikan pengalaman aqiqah dan qurban yang modern, amanah, dan penuh keberkahan."
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {services.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <PublicCard className="flex flex-col items-center p-8 text-center transition-all duration-300 hover:-translate-y-1">
              {item.icon}
              <h3 className="mt-4 mb-2 text-xl font-semibold text-[var(--color-public-primary)]">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_76%,#fff)] md:text-base">
                {item.desc}
              </p>
            </PublicCard>
          </motion.div>
        ))}
      </div>
    </PublicSection>
  );
};

export default ServicesList;
