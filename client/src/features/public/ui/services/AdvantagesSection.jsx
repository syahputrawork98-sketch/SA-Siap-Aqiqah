import React from "react";
import { motion } from "framer-motion";
import { FaHandsHelping, FaMosque, FaShieldAlt, FaSmileBeam, FaUserCheck } from "react-icons/fa";
import { PublicCard, PublicSection, SectionHeading } from "@/shared/ui";

const advantages = [
  {
    icon: <FaMosque className="text-4xl text-[var(--color-public-accent)]" />,
    title: "Sesuai Syariat Islam",
    desc: "Seluruh proses aqiqah dan qurban dilaksanakan dengan tuntunan syariat yang benar dan diawasi langsung oleh ahlinya.",
  },
  {
    icon: <FaHandsHelping className="text-4xl text-[var(--color-public-accent)]" />,
    title: "Amanah dan Transparan",
    desc: "Setiap tahap dapat dipantau melalui sistem pelacakan Siqah agar pelanggan selalu merasa tenang dan percaya.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-[var(--color-public-accent)]" />,
    title: "Kualitas Terjamin",
    desc: "Dari pemilihan hewan hingga hidangan akhir, semua dilakukan dengan kontrol mutu tinggi untuk hasil terbaik.",
  },
  {
    icon: <FaUserCheck className="text-4xl text-[var(--color-public-accent)]" />,
    title: "Tim Profesional",
    desc: "Dikelola oleh tenaga ahli dari peternakan, catering, hingga kurir yang bekerja penuh tanggung jawab.",
  },
  {
    icon: <FaSmileBeam className="text-4xl text-[var(--color-public-accent)]" />,
    title: "Kepuasan Pelanggan",
    desc: "Kami berkomitmen memberikan pengalaman aqiqah yang mudah, nyaman, dan penuh keberkahan.",
  },
];

const AdvantagesSection = () => {
  return (
    <PublicSection
      className="py-24"
      overlay="soft"
      overlayClassName="bg-gradient-to-b from-white/20 via-[var(--color-public-primary)]/20 to-white/40"
    >
      <SectionHeading
        className="mb-16"
        title="Mengapa Memilih Siqah?"
        description="Siqah hadir untuk memberikan ketenangan hati bagi setiap keluarga Muslim melalui layanan yang amanah, profesional, dan penuh keberkahan."
      />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
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

export default AdvantagesSection;
