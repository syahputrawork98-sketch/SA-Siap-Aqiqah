import React from "react";
import { motion } from "framer-motion";
import { PublicCard, PublicSection, SectionHeading } from "@/shared/ui";

const logoItems = [
  {
    title: "Lingkaran di Atas",
    tone: "text-[var(--color-public-accent)]",
    description:
      "Melambangkan anak yang baru lahir sekaligus simbol kesempurnaan dan berkah dari Allah SWT. Menjadi pusat makna dari ibadah aqiqah yang penuh rasa syukur.",
  },
  {
    title: "Lengkungan Emas di Samping",
    tone: "text-[var(--color-public-accent)]",
    description:
      "Menggambarkan kedua orang tua yang merentangkan tangan penuh syukur. Bentuknya menyerupai figur manusia yang sedang berdoa, melambangkan doa, kebahagiaan, dan keberkahan keluarga.",
  },
  {
    title: "Lengkungan Hijau di Bawah",
    tone: "text-[var(--color-public-primary)]",
    description:
      "Menyerupai tanduk atau bagian tubuh kambing dan domba, hewan yang disyariatkan dalam aqiqah. Warna hijau merepresentasikan Islam, kesuburan, dan kehidupan baru.",
  },
  {
    title: "Komposisi Keseluruhan",
    tone: "text-[var(--color-public-primary)]",
    description:
      "Secara utuh, logo membentuk figur manusia yang tegak dengan tangan terbuka, simbol syukur keluarga atas kelahiran anak. Unsur hijau dan emas berpadu menjadi makna ibadah aqiqah sesuai syariat Islam.",
  },
];

const LogoMeaning = () => {
  return (
    <PublicSection
      className="bg-gradient-to-b from-[#fefbf7] to-[#f9f6ef]"
      overlay="soft"
      overlayClassName="backdrop-blur-[2px]"
      containerClassName="space-y-16 px-6 text-center md:px-10"
    >
      <SectionHeading
        title="Makna Logo Siqah"
        description="Setiap elemen dalam logo Siqah memiliki arti mendalam yang mencerminkan rasa syukur, kebahagiaan, dan keberkahan dalam ibadah aqiqah."
      />

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src="https://res.cloudinary.com/dcida9qys/image/upload/v1761098052/Siqah-logo-HD_fpetwm.png"
          alt="Logo Siqah"
          className="w-60 drop-shadow-lg transition-transform duration-500 hover:scale-105 md:w-72 lg:w-80"
        />
      </motion.div>

      <motion.div
        className="grid gap-10 text-left md:grid-cols-2 md:text-justify"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        viewport={{ once: true }}
      >
        {logoItems.map((item) => (
          <motion.div key={item.title} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
            <PublicCard className="p-8">
              <h3 className={`mb-3 text-2xl font-semibold ${item.tone}`}>{item.title}</h3>
              <p className="leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">{item.description}</p>
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
        <PublicCard className="mx-auto max-w-4xl p-8 text-center md:p-12">
          <h3 className="mb-4 text-2xl font-semibold text-[var(--color-public-primary)]">Warna dan Tipografi</h3>
          <p className="mx-auto max-w-3xl leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">
            Warna hijau mencerminkan Islam, kesuburan, dan kehidupan baru. Warna emas melambangkan
            kebahagiaan, syukur, dan keberkahan. Logo ini menggunakan font Cormorant Garamond dan
            Montserrat yang menghadirkan nuansa elegan dan modern.
          </p>
        </PublicCard>
      </motion.div>
    </PublicSection>
  );
};

export default LogoMeaning;
