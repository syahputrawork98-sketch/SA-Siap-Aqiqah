import React from "react";
import { motion } from "framer-motion";
import { PublicCard, PublicSection, SectionHeading } from "@/shared/ui";

const teamData = [
  {
    nama: "Admin Siqah",
    jabatan: "Manajemen dan Layanan Pelanggan",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    deskripsi:
      "Mengelola sistem, memastikan proses layanan berjalan lancar, dan menjaga komunikasi dengan pelanggan agar selalu puas dan tenang.",
  },
  {
    nama: "Tim Kandang",
    jabatan: "Perawatan dan Pemilihan Hewan",
    foto: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800",
    deskripsi:
      "Bertanggung jawab atas kesehatan dan kelayakan hewan aqiqah, memastikan setiap hewan dipelihara dengan penuh kasih dan sesuai syariat.",
  },
  {
    nama: "Mitra Catering",
    jabatan: "Pengolahan dan Penyajian Menu",
    foto: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    deskripsi:
      "Menyiapkan olahan daging aqiqah dengan standar kebersihan tinggi, cita rasa terbaik, dan penuh keberkahan.",
  },
  {
    nama: "Mitra Kurir",
    jabatan: "Pengantaran dan Ketepatan Waktu",
    foto: "https://images.unsplash.com/photo-1582733775062-eb92170f5e13?auto=format&fit=crop&q=80&w=800",
    deskripsi:
      "Mengantarkan paket aqiqah dengan aman, tepat waktu, dan pelayanan penuh senyum hingga ke tangan penerima.",
  },
];

const TeamSection = () => {
  return (
    <PublicSection
      className="bg-gradient-to-b from-[#fefbf7] to-[#f9f6ef]"
      overlay="soft"
      overlayClassName="backdrop-blur-[2px]"
      containerClassName="space-y-16 px-6 text-center md:px-10"
    >
      <SectionHeading
        title="Tim Siqah"
        description="Di balik setiap proses aqiqah yang amanah, ada tim Siqah yang bekerja dengan hati, tanggung jawab, dan semangat ibadah."
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
        {teamData.map((person) => (
          <motion.div
            key={person.nama}
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          >
            <PublicCard className="p-6 text-center">
              <img
                src={person.foto}
                alt={person.nama}
                className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-[var(--color-public-primary)]/30 object-cover shadow-md"
              />
              <h3 className="text-xl font-semibold text-[var(--color-public-primary)]">{person.nama}</h3>
              <p className="mb-3 text-sm font-medium text-[var(--color-public-accent)]">{person.jabatan}</p>
              <p className="text-sm leading-relaxed text-[color-mix(in_srgb,var(--color-public-primary)_82%,#fff)]">
                {person.deskripsi}
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
            Setiap anggota tim <span className="font-semibold text-[var(--color-public-primary)]">Siqah</span> memiliki
            peran penting dalam memastikan setiap momen aqiqah berjalan dengan sempurna dari kandang
            hingga ke tangan penerima. Kami bekerja bukan hanya untuk melayani, tetapi juga untuk
            menghadirkan keberkahan.
          </p>
        </PublicCard>
      </motion.div>
    </PublicSection>
  );
};

export default TeamSection;
