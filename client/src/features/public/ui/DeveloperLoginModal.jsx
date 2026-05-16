import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiX, FiShield, FiUserCheck, FiArrowRight, FiLogOut, FiActivity } from "react-icons/fi";
import { getPersona, setPersona, clearPersona, isPersonaActive } from "@/app/router/developerPersona";

export default function DeveloperLoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const currentRole = getPersona();
  const isActive = isPersonaActive();

  const handleSelectRole = (role) => {
    setPersona(role);
    onClose();
    if (role === "admin") navigate("/admin");
    if (role === "superadmin") navigate("/superadmin");
  };

  const handleReset = () => {
    clearPersona();
    onClose();
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="bg-[var(--color-public-primary)] p-6 text-white text-center relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-2xl font-bold font-heading mb-1">Developer Entry</h2>
            <p className="text-white/70 text-sm">Pilih persona untuk masuk ke area backoffice</p>
          </div>

          {/* Current Status Indicator */}
          {isActive && (
            <div className="bg-[var(--color-public-primary)]/5 border-b border-[var(--color-public-primary)]/10 px-8 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[var(--color-public-primary)] text-xs font-bold uppercase tracking-wider">
                <FiActivity className="animate-pulse" />
                <span>Persona Aktif: {currentRole}</span>
              </div>
              <button 
                onClick={handleReset}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-bold"
              >
                <FiLogOut /> Reset
              </button>
            </div>
          )}

          {/* Options */}
          <div className="p-8 space-y-4">
            <button
              onClick={() => handleSelectRole("admin")}
              className={`group w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${
                currentRole === "admin" 
                  ? "border-[var(--color-public-primary)] bg-[var(--color-public-primary)]/5" 
                  : "border-gray-100 hover:border-[var(--color-public-primary)] hover:bg-[var(--color-public-primary)]/5"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors ${
                  currentRole === "admin" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                }`}>
                  <FiUserCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-public-primary)]">Admin Persona</h4>
                  <p className="text-xs text-gray-500">Akses modul Pesanan & Pembayaran</p>
                </div>
              </div>
              <FiArrowRight className={`transition-all ${
                currentRole === "admin" ? "text-[var(--color-public-primary)] translate-x-1" : "text-gray-300 group-hover:text-[var(--color-public-primary)] translate-x-0 group-hover:translate-x-1"
              }`} />
            </button>

            <button
              onClick={() => handleSelectRole("superadmin")}
              className={`group w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${
                currentRole === "superadmin" 
                  ? "border-[var(--color-public-accent)] bg-[var(--color-public-accent)]/5" 
                  : "border-gray-100 hover:border-[var(--color-public-accent)] hover:bg-[var(--color-public-accent)]/5"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors ${
                  currentRole === "superadmin" ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white"
                }`}>
                  <FiShield size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-public-primary)]">Superadmin Persona</h4>
                  <p className="text-xs text-gray-500">Akses penuh seluruh konfigurasi sistem</p>
                </div>
              </div>
              <FiArrowRight className={`transition-all ${
                currentRole === "superadmin" ? "text-[var(--color-public-accent)] translate-x-1" : "text-gray-300 group-hover:text-[var(--color-public-accent)] translate-x-0 group-hover:translate-x-1"
              }`} />
            </button>

            <div className="pt-4 text-center">
              {isActive ? (
                <button 
                  onClick={handleReset}
                  className="text-xs font-bold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-widest"
                >
                  Keluar ke Mode Publik
                </button>
              ) : (
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Internal Testing Only</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
