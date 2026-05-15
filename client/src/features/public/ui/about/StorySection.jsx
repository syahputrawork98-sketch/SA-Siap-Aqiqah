import React from "react";
import { motion } from "framer-motion";
import { PublicCard, PublicSection, SectionHeading } from "@/shared/ui";

const storySteps = [
  {
    id: 1,
    title: "Dari Niat yang Tulus",
    description:
      "Dimulai dari rasa ingin membantu keluarga Muslim agar bisa beribadah dengan nyaman dan sesuai sunnah.",
    image: "https://res.cloudinary.com/dcida9qys/image/upload/v1761270102/Keluarga_thg4y4.png",
    alt: "Ide Siqah",
  },
  {
    id: 2,
    title: "Kolaborasi Penuh Amanah",
    description:
      "Siqah membangun ekosistem yang melibatkan peternak, catering halal, dan kurir yang bekerja dengan penuh tanggung jawab.",
    image: "https://res.cloudinary.com/dcida9qys/image/upload/v1761270102/Kolaborasi_szz0ib.png",
    alt: "Kolaborasi Tim",
  },
  {
    id: 3,
    title: "Modern dan Transparan",
    description:
      "Dengan sistem digital, setiap proses aqiqah kini bisa dipantau langsung dari hewan, catering, hingga pengantaran.",
    image: "https://res.cloudinary.com/dcida9qys/image/upload/v1761270101/Modern_transparan_pflgyz.png",
    alt: "Transformasi Digital",
  },
];

const StorySection = () => {
  return (
    <PublicSection
      className="bg-gradient-to-b from-[#fefbf7] to-[#f9f6ef]"
      overlay="soft"
      overlayClassName="backdrop-blur-[2px]"
      containerClassName="space-y-16 px-6 text-center md:px-10"
    >
      <SectionHeading
        title="Kisah Siqah"
        description="Perjalanan kami bermula dari niat sederhana: menghadirkan ibadah aqiqah dan qurban yang tidak hanya mudah, tetapi juga benar-benar bermakna dan penuh berkah."
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <PublicCard className="p-8 text-left md:p-12 md:text-center">
          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">
            <span className="font-semibold text-[var(--color-public-primary)]">Siqah</span> lahir dari
            keinginan untuk menjawab kebutuhan banyak keluarga Muslim yang ingin menjalankan ibadah
            aqiqah dengan tenang, tanpa harus bingung mengurus hewan, catering, atau distribusi.
            Kami menyadari bahwa momen aqiqah bukan sekadar acara, tetapi bentuk syukur dan doa
            keluarga atas anugerah Allah.
          </p>
        </PublicCard>
      </motion.div>

      <motion.div
        className="grid gap-10 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        viewport={{ once: true }}
      >
        {storySteps.map((step) => (
          <motion.div
            key={step.id}
            className="flex flex-col items-center space-y-4 text-center"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          >
            <img src={step.image} alt={step.alt} className="w-40 md:w-48" />
            <h3 className="text-xl font-semibold text-[var(--color-public-primary)]">{step.title}</h3>
            <p className="leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <PublicCard className="p-8 md:p-12">
          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">
            Hari ini, <span className="font-semibold text-[var(--color-public-primary)]">Siqah</span> terus
            tumbuh bersama keluarga Muslim di seluruh Indonesia. Kami ingin setiap momen aqiqah
            menjadi pengalaman yang mudah, berkah, dan tak terlupakan dari kandang hingga tangan Anda.
          </p>
        </PublicCard>
      </motion.div>
    </PublicSection>
  );
};

export default StorySection;
