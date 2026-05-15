import React from "react";
import { motion } from "framer-motion";
import { PublicCard, PublicSection, SectionHeading } from "@/shared/ui";
import ContactInfo from "@/features/public/ui/contact/ContactInfo";
import ContactForm from "@/features/public/ui/contact/ContactForm";

const adminData = {
  nama: "Admin Utama Siqah",
  email: "admin@siqah.id",
  no_hp: "081234567890",
  jabatan: "Super Admin",
  foto: "https://placehold.co/400",
  alamat: "Jl. Raya Siqah No. 1, Bandung",
  sosial: {
    instagram: "https://instagram.com/siqah",
    tiktok: "https://tiktok.com/@siqah",
  },
};

const Contact = () => {
  return (
    <PublicSection className="py-24" overlay="soft" overlayClassName="bg-gradient-to-b from-white/20 via-[var(--color-public-primary)]/20 to-white/40">
      <div className="text-center">
        <motion.img
          src="https://res.cloudinary.com/dcida9qys/image/upload/v1761097925/Siqah-logo-HD_umjt9e.png"
          alt="Siqah Logo"
          className="mx-auto mb-4 w-32"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
        <SectionHeading
          className="mb-16"
          title="Hubungi Siqah"
          description="Kami siap membantu Anda dengan layanan aqiqah dan qurban terbaik untuk keluarga."
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <ContactInfo adminData={adminData} />
        <ContactForm />
      </div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-6 font-heading text-2xl font-semibold text-[var(--color-public-primary)]">Tim Siqah</h2>
        <PublicCard className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <img
              src={adminData.foto}
              alt={adminData.nama}
              className="h-32 w-32 rounded-full object-cover shadow-md"
            />
            <div className="text-[var(--color-public-primary)]">
              <h3 className="text-xl font-bold">{adminData.nama}</h3>
              <p>{adminData.jabatan}</p>
              <p>
                Email: {" "}
                <a href={`mailto:${adminData.email}`} className="underline text-[var(--color-public-accent)]">
                  {adminData.email}
                </a>
              </p>
              <p>
                HP: {" "}
                <a href={`tel:${adminData.no_hp}`} className="underline text-[var(--color-public-accent)]">
                  {adminData.no_hp}
                </a>
              </p>
            </div>
          </div>
        </PublicCard>
      </motion.div>
    </PublicSection>
  );
};

export default Contact;
