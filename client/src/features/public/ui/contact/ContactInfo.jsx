import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { PublicCard } from "@/shared/ui";

const ContactInfo = ({ adminData }) => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <PublicCard className="h-full space-y-4 p-6 text-[var(--color-public-primary)]">
        <h2 className="mb-4 font-heading text-2xl font-semibold text-[var(--color-public-accent)]">Info Kontak</h2>
        <p className="flex items-center gap-2">
          <FiMapPin className="text-[var(--color-public-accent)]" /> {adminData.alamat}
        </p>
        <p className="flex items-center gap-2">
          <FiMail className="text-[var(--color-public-accent)]" />
          <a href={`mailto:${adminData.email}`} className="underline text-[var(--color-public-accent)]">
            {adminData.email}
          </a>
        </p>
        <p className="flex items-center gap-2">
          <FiPhone className="text-[var(--color-public-accent)]" />
          <a href={`tel:${adminData.no_hp}`} className="underline text-[var(--color-public-accent)]">
            {adminData.no_hp}
          </a>
        </p>
        <p>
          <strong>Jam Operasional:</strong> Senin - Jumat: 08:00 - 17:00, Sabtu: 08:00 - 13:00
        </p>

        <div className="mt-4 flex gap-4">
          <a
            href={adminData.sosial.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[var(--color-public-accent)] transition hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href={adminData.sosial.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[var(--color-public-primary)] transition hover:scale-110"
          >
            <FaTiktok />
          </a>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 font-heading text-2xl font-semibold text-[var(--color-public-primary)]">Lokasi Kami</h2>
          <div className="h-64 w-full overflow-hidden rounded-xl shadow-md">
            <iframe
              title="Lokasi Siqah"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.75834994036!2d107.5731!3d-6.9032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63c1b20eecf%3A0xe4c1db9b2e16a6c!2sBandung!5e0!3m2!1sen!2sid!4v1698138640000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </motion.div>
      </PublicCard>
    </motion.div>
  );
};

export default ContactInfo;
