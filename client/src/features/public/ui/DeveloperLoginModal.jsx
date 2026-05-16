import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiX, FiShield, FiUserCheck, FiArrowRight, FiLogOut, FiActivity, FiUser, FiTruck, FiCoffee, FiGrid } from "react-icons/fi";
import { getPersona, setPersona, clearPersona, isPersonaActive, DEV_PERSONAS } from "@/app/router/developerPersona";
import { DEFAULT_PATHS } from "@/app/router/accessPolicy";

const ROLE_META = {
  user: { icon: FiUser, color: "bg-blue-50 text-blue-600", activeColor: "bg-blue-600 text-white", borderColor: "border-blue-100", activeBorder: "border-blue-600", desc: "Akses area Konsumen / Pelanggan" },
  mitra_kandang: { icon: FiGrid, color: "bg-emerald-50 text-emerald-600", activeColor: "bg-emerald-600 text-white", borderColor: "border-emerald-100", activeBorder: "border-emerald-600", desc: "Kelola status hewan di kandang" },
  mitra_catering: { icon: FiCoffee, color: "bg-orange-50 text-orange-600", activeColor: "bg-orange-600 text-white", borderColor: "border-orange-100", activeBorder: "border-orange-600", desc: "Kelola proses masak & packing" },
  mitra_kurir: { icon: FiTruck, color: "bg-purple-50 text-purple-600", activeColor: "bg-purple-600 text-white", borderColor: "border-purple-100", activeBorder: "border-purple-600", desc: "Lacak pengantaran paket aqiqah" },
  admin: { icon: FiUserCheck, color: "bg-slate-50 text-slate-600", activeColor: "bg-slate-600 text-white", borderColor: "border-slate-100", activeBorder: "border-slate-600", desc: "Kelola pesanan & operasional" },
  superadmin: { icon: FiShield, color: "bg-amber-50 text-amber-600", activeColor: "bg-amber-600 text-white", borderColor: "border-amber-100", activeBorder: "border-amber-600", desc: "Akses penuh konfigurasi sistem" },
};

export default function DeveloperLoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const currentRole = getPersona();
  const isActive = isPersonaActive();

  const handleSelectRole = (role) => {
    setPersona(role);
    onClose();
    navigate(DEFAULT_PATHS[role] || "/");
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
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
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
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEV_PERSONAS.map((persona) => {
              const meta = ROLE_META[persona.role];
              const Icon = meta.icon;
              const isSelected = currentRole === persona.role;

              return (
                <button
                  key={persona.role}
                  onClick={() => handleSelectRole(persona.role)}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    isSelected 
                      ? `${meta.activeBorder} bg-[var(--color-public-primary)]/5` 
                      : `border-gray-100 hover:${meta.activeBorder} hover:bg-[var(--color-public-primary)]/5`
                  }`}
                >
                  <div className={`p-3 rounded-xl transition-colors ${
                    isSelected ? meta.activeColor : `${meta.color} group-hover:${meta.activeColor}`
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[var(--color-public-primary)] truncate">{persona.label}</h4>
                    <p className="text-[10px] text-gray-400 line-clamp-1">{meta.desc}</p>
                  </div>
                  <FiArrowRight className={`shrink-0 transition-all ${
                    isSelected ? "text-[var(--color-public-primary)] translate-x-1" : "text-gray-300 group-hover:text-[var(--color-public-primary)] translate-x-1"
                  }`} />
                </button>
              );
            })}
          </div>

          <div className="pb-6 text-center">
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
