import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getCurrentYear } from "@/shared/lib";

export function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const footer = document.getElementById("footer");
      if (footer && scrollPos > footer.offsetTop + 100) setVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      id="footer"
      className={`relative py-16 px-6 font-sans text-[var(--color-public-text-on-dark)] transition-opacity duration-1000 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 z-0 bg-[image:var(--color-public-footer-gradient)]" />
      <div className="absolute bottom-10 right-10 z-0 h-80 w-80 rounded-full bg-[var(--color-public-footer-glow)] blur-3xl" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-start"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4">
            <img
              src="https://res.cloudinary.com/dcida9qys/image/upload/v1761097925/Siqah-logo-HD_umjt9e.png"
              alt="Logo Siqah"
              className="w-20 transition-transform duration-300 hover:scale-105"
            />
          </div>
          <h3 className="text-2xl siqah-public-accent font-bold mb-2">
            Siap Aqiqah
          </h3>
          <p className="max-w-xs text-center text-sm leading-relaxed text-[var(--color-public-footer-text)] md:text-left">
            Kami berkomitmen memberikan layanan aqiqah terbaik dengan penuh amanah dan profesional.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-4 siqah-public-accent">Navigasi</h4>
          <ul className="space-y-3 text-[var(--color-public-footer-text)]">
            <li>
              <Link to="/" className="siqah-public-link transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tentang" className="siqah-public-link transition-colors duration-300">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link to="/layanan" className="siqah-public-link transition-colors duration-300">
                Layanan
              </Link>
            </li>
            <li>
              <Link to="/paket" className="siqah-public-link transition-colors duration-300">
                Paket
              </Link>
            </li>
            <li>
              <Link to="/kontak" className="siqah-public-link transition-colors duration-300">
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-4 siqah-public-accent">Hubungi Kami</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 siqah-public-link transition-all duration-300">
              <FaWhatsapp className="text-xl" />
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                0812-3456-7890
              </a>
            </li>
            <li className="flex items-center gap-3 siqah-public-link transition-all duration-300">
              <FaEnvelope className="text-xl" />
              <a href="mailto:info@siqah.id">info@siqah.id</a>
            </li>
            <li className="flex items-center gap-3 siqah-public-link transition-all duration-300">
              <FaInstagram className="text-xl" />
              <a href="https://instagram.com/siqah.id" target="_blank" rel="noopener noreferrer">
                @siqah.id
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="relative z-10 mt-12 border-t border-[var(--color-public-divider-soft)] pt-6 text-center text-sm text-[var(--color-public-footer-text-subtle)]">
        &copy; {getCurrentYear()} Siap Aqiqah. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
