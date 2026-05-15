import React from "react";
import { motion } from "framer-motion";
import { PublicBadge, PublicCard, PublicSection, SectionHeading } from "@/shared/ui";

const values = [
  {
    title: "Amanah",
    icon: "Handshake",
    description:
      "Kami menjaga kepercayaan pelanggan dengan menjalankan proses aqiqah secara jujur, bertanggung jawab, dan sesuai janji.",
  },
  {
    title: "Syari",
    icon: "Compliance",
    description:
      "Setiap tahapan dilakukan sesuai tuntunan Islam mulai dari pemilihan hewan, penyembelihan, hingga distribusi hasil aqiqah.",
  },
  {
    title: "Transparansi",
    icon: "Visibility",
    description:
      "Dengan sistem digital Siqah, pelanggan dapat memantau progres aqiqah secara langsung dari kandang, catering, hingga pengiriman.",
  },
  {
    title: "Kualitas",
    icon: "Quality",
    description:
      "Kami menjamin kualitas terbaik dalam setiap aspek: hewan sehat, catering higienis, dan cita rasa masakan yang lezat.",
  },
];

const ValuesSection = () => {
  return (
    <PublicSection
      className="bg-gradient-to-b from-[#fefbf7] to-[#f9f6ef]"
      overlay="soft"
      overlayClassName="backdrop-blur-[2px]"
      containerClassName="space-y-16 px-6 text-center md:px-10"
    >
      <SectionHeading
        title="Nilai Utama Siqah"
        description="Nilai yang menjadi dasar dalam setiap langkah kami, memastikan layanan aqiqah dan qurban selalu amanah, syari, dan penuh berkah."
      />

      <motion.div
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        viewport={{ once: true }}
      >
        {values.map((value) => (
          <motion.div
            key={value.title}
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          >
            <PublicCard className="flex h-full flex-col items-center p-8 text-center">
              <PublicBadge className="mb-4 uppercase tracking-[0.2em]">{value.icon}</PublicBadge>
              <h3 className="mb-3 text-2xl font-semibold text-[var(--color-public-primary)]">{value.title}</h3>
              <p className="text-sm leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">
                {value.description}
              </p>
            </PublicCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <PublicCard className="mx-auto mt-16 max-w-4xl p-8 md:p-12">
          <p className="text-lg leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">
            Nilai-nilai ini bukan hanya prinsip kerja, tetapi juga niat ibadah yang kami tanamkan dalam
            setiap layanan. Bersama <span className="font-semibold text-[var(--color-public-primary)]">Siqah</span>,
            kami ingin menghadirkan pengalaman aqiqah yang penuh
            <span className="font-semibold text-[var(--color-public-accent)]"> keberkahan dan kepercayaan</span>.
          </p>
        </PublicCard>
      </motion.div>
    </PublicSection>
  );
};

export default ValuesSection;
