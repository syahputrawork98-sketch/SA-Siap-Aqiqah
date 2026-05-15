import React, { useState } from "react";
import { motion } from "framer-motion";
import { PublicButton, PublicCard } from "@/shared/ui";

const ContactForm = () => {
  const [formData, setFormData] = useState({ nama: "", email: "", hp: "", pesan: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.nama || !formData.email || !formData.pesan) {
      setStatus({ type: "error", message: "Harap isi semua field yang wajib." });
      return;
    }

    setTimeout(() => {
      setStatus({ type: "success", message: "Pesan berhasil dikirim." });
      setFormData({ nama: "", email: "", hp: "", pesan: "" });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <PublicCard className="h-full p-6 text-[var(--color-public-primary)]">
        <h2 className="mb-4 font-heading text-2xl font-semibold text-[var(--color-public-primary)]">Kirim Pesan</h2>
        {status && (
          <div
            className={`mb-4 rounded p-2 ${
              status.type === "success" ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"
            }`}
          >
            {status.message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={formData.nama}
            onChange={handleChange}
            className="siqah-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="siqah-field"
          />
          <input
            type="text"
            name="hp"
            placeholder="Nomor HP"
            value={formData.hp}
            onChange={handleChange}
            className="siqah-field"
          />
          <textarea
            name="pesan"
            placeholder="Pesan Anda"
            rows="4"
            value={formData.pesan}
            onChange={handleChange}
            className="siqah-field"
          />

          <PublicButton type="submit" className="w-full">
            Kirim Pesan
          </PublicButton>
        </form>
      </PublicCard>
    </motion.div>
  );
};

export default ContactForm;
