import React from "react";
import { motion } from "framer-motion";
import { GiBoxUnpacking, GiCookingPot, GiDeliveryDrone, GiGoat, GiMeatCleaver } from "react-icons/gi";
import { PublicCard, PublicSection, SectionHeading } from "@/shared/ui";

const processes = [
  {
    icon: <GiGoat className="text-5xl text-[var(--color-public-accent)]" />,
    title: "Pemilihan Hewan",
    desc: "Konsumen memilih hewan terbaik dari peternakan Siqah yang sehat dan terverifikasi.",
  },
  {
    icon: <GiMeatCleaver className="text-5xl text-[var(--color-public-accent)]" />,
    title: "Pemotongan Sesuai Syariat",
    desc: "Proses penyembelihan dilakukan oleh juru sembelih bersertifikat sesuai tuntunan syariat Islam.",
  },
  {
    icon: <GiCookingPot className="text-5xl text-[var(--color-public-accent)]" />,
    title: "Pengolahan di Catering Siqah",
    desc: "Daging diolah oleh tim catering profesional menjadi hidangan lezat dan higienis.",
  },
  {
    icon: <GiBoxUnpacking className="text-5xl text-[var(--color-public-accent)]" />,
    title: "Pengemasan Aman",
    desc: "Setiap hidangan dikemas rapi dan higienis agar tetap segar saat diterima.",
  },
  {
    icon: <GiDeliveryDrone className="text-5xl text-[var(--color-public-accent)]" />,
    title: "Pengantaran ke Lokasi",
    desc: "Pesanan dikirim langsung oleh kurir Siqah dengan sistem pelacakan modern.",
  },
];

const ProcessSection = () => {
  return (
    <PublicSection
      className="py-24"
      overlay="dark"
      overlayClassName="bg-gradient-to-b from-[var(--color-public-primary)]/95 via-[var(--color-public-primary)]/80 to-[var(--color-public-primary)]/95"
      containerClassName="text-white"
    >
      <SectionHeading
        className="mb-16"
        title="Proses Layanan Siqah"
        titleClassName="text-[var(--color-public-accent)]"
        descriptionClassName="text-gray-100"
        description="Kami memastikan setiap tahap dilakukan dengan penuh amanah, transparansi, dan profesionalisme."
      />

      <div className="flex flex-col flex-wrap items-center justify-between gap-12 md:flex-row md:gap-6">
        {processes.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-[18%]"
          >
            <PublicCard className="flex flex-col items-center bg-white/10 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
              <div className="mb-4">{step.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-[#FFD88D]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-200">{step.desc}</p>
            </PublicCard>
          </motion.div>
        ))}
      </div>
    </PublicSection>
  );
};

export default ProcessSection;
