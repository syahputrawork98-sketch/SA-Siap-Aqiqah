import React from "react";
import { motion } from "framer-motion";
import { PublicCard, PublicSection, SectionHeading } from "@/shared/ui";

const VisiMisi = () => {
  return (
    <PublicSection
      className="bg-gradient-to-b from-[#fefbf7] to-[#f9f6ef]"
      overlay="soft"
      overlayClassName="backdrop-blur-[2px]"
      containerClassName="px-6 md:px-10"
    >
      <SectionHeading
        className="mb-14"
        title="Visi dan Misi Siqah"
        description="Nilai dan arah yang menuntun kami dalam memberikan layanan aqiqah dan qurban yang syari, amanah, dan penuh berkah."
      />

      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <PublicCard className="p-8">
            <h3 className="mb-3 text-2xl font-semibold text-[var(--color-public-primary)]">Visi Kami</h3>
            <p className="leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">
              Menjadi penyedia layanan aqiqah terpercaya yang menghadirkan kemudahan,
              keberkahan, dan ketenangan bagi setiap keluarga Muslim di seluruh Indonesia.
            </p>
          </PublicCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <PublicCard className="p-8">
            <h3 className="mb-3 text-2xl font-semibold text-[var(--color-public-primary)]">Misi Kami</h3>
            <ul className="list-inside list-disc space-y-2 text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">
              <li>Menyediakan layanan yang syari dan transparan.</li>
              <li>Memberdayakan peternak lokal dan catering halal.</li>
              <li>Menjaga kualitas hewan dan kebersihan catering.</li>
              <li>Memberikan pengalaman mudah dan berkesan bagi keluarga.</li>
            </ul>
          </PublicCard>
        </motion.div>
      </div>
    </PublicSection>
  );
};

export default VisiMisi;
