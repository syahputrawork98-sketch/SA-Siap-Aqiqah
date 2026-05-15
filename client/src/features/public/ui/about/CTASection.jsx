import React from "react";
import { motion } from "framer-motion";
import { PublicButton, PublicSection, SectionHeading } from "@/shared/ui";

const CTASection = () => {
  return (
    <PublicSection
      className="py-24 text-center"
      overlay="dark"
      containerClassName="max-w-5xl px-6 text-center text-white md:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <SectionHeading
          title="Siap Menjalankan Ibadah Aqiqah Bersama Kami?"
          titleClassName="text-white"
          descriptionClassName="text-gray-100"
          description="Percayakan momen penuh syukur keluarga Anda kepada Siqah Aqiqah. Kami siap melayani dengan cara yang mudah, syari, dan penuh berkah."
        />

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PublicButton as="a" href="/layanan" size="lg" className="shadow-md">
            Lihat Layanan Kami
          </PublicButton>

          <PublicButton as="a" href="/kontak" variant="light" size="lg" className="shadow-md">
            Hubungi Kami
          </PublicButton>
        </div>
      </motion.div>
    </PublicSection>
  );
};

export default CTASection;
