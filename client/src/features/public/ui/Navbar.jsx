import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLogIn, FiUser } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { PublicButton } from "@/shared/ui";
import DeveloperLoginModal from "./DeveloperLoginModal";
import { getPersona, isPersonaActive } from "@/app/router/developerPersona";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const currentRole = getPersona();
  const isActive = isPersonaActive();

  // Ubah background saat scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Tentang", path: "/tentang" },
    { name: "Layanan", path: "/layanan" },
    { name: "Paket", path: "/paket" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 px-6 py-3 transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--color-public-border-soft)] bg-[var(--color-public-overlay-elevated)] shadow-md backdrop-blur-lg"
          : "bg-[var(--color-public-overlay-light)] backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* ========== KIRI: MENU DESKTOP ========== */}
        <ul className="hidden lg:flex flex-1 justify-start items-center gap-8 font-sans font-semibold text-[var(--color-public-primary)]">
          {menuItems.map((item, idx) => {
            const isActiveLink = location.pathname === item.path;
            return (
              <li key={idx} className="relative group">
                <Link
                  to={item.path}
                  className={`transition-colors duration-300 ${
                    isActiveLink ? "siqah-public-accent" : "siqah-public-link"
                  }`}
                >
                  {item.name}
                </Link>
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[var(--color-public-accent)] transition-all duration-300 ${
                    isActiveLink ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </li>
            );
          })}
        </ul>

        {/* ========== TENGAH: LOGO ========== */}
        <div className="flex-none flex flex-col items-center justify-center mx-4 cursor-pointer group transition-transform duration-300 hover:scale-105">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dcida9qys/image/upload/v1761098052/Siqah-logo-HD_fpetwm.png"
              alt="Siqah Logo"
              className="w-14 h-14 object-contain"
            />
          </Link>
        </div>

        {/* ========== KANAN: LOGIN & MENU MOBILE ========== */}
        <div className="flex items-center gap-4">
          {isActive && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[var(--color-public-primary)]/10 border border-[var(--color-public-primary)]/20 rounded-full text-[var(--color-public-primary)] text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              {currentRole}
            </div>
          )}
          
          <PublicButton
            variant="solid"
            className="hidden lg:flex"
            onClick={() => setLoginModalOpen(true)}
          >
            {isActive ? <FiUser className="text-lg" /> : <FiLogIn className="text-lg" />}
            {isActive ? "Dashboard" : "Login"}
          </PublicButton>

          {/* Tombol toggle mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col justify-center items-center space-y-1"
          >
            <span
              className={`block h-0.5 w-6 bg-[var(--color-public-primary)] transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-[var(--color-public-primary)] transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-[var(--color-public-primary)] transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* ========== MENU MOBILE ========== */}
      {mobileOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden flex flex-col items-center gap-6 mt-4 pb-4 font-semibold text-[var(--color-public-primary)] bg-[var(--color-public-overlay-mobile)] backdrop-blur-md rounded-xl shadow-md"
        >
          {menuItems.map((item, idx) => {
            const isActiveLink = location.pathname === item.path;
            return (
              <li key={idx}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg ${
                    isActiveLink ? "siqah-public-accent" : "siqah-public-link"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          
          <div className="w-full px-8 flex flex-col items-center gap-4">
            {isActive && (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-[var(--color-public-primary)]/10 border border-[var(--color-public-primary)]/20 rounded-full text-[var(--color-public-primary)] text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                {currentRole} Mode
              </div>
            )}
            
            <PublicButton
              variant="solid"
              className="flex w-full"
              onClick={() => {
                setMobileOpen(false);
                setLoginModalOpen(true);
              }}
            >
              {isActive ? <FiUser className="text-lg" /> : <FiLogIn className="text-lg" />}
              {isActive ? "Dashboard / Switch" : "Login"}
            </PublicButton>
          </div>
        </motion.ul>
      )}

      <DeveloperLoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />
    </motion.nav>
  );
};

export default Navbar;
