import React from "react";
import { motion } from "framer-motion";
import { PackageSearch, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui";

/**
 * BackofficeHoldState
 * Reusable component for features that are still in development (Hold state).
 */
export default function BackofficeHoldState({ 
  title = "Fitur Sedang Disiapkan", 
  description = "Modul ini masih dalam tahap pengembangan dan akan tersedia pada batch berikutnya.",
  icon: Icon = PackageSearch,
  showBackButton = true
}) {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-[#eee6da] shadow-sm"
    >
      <div className="p-5 bg-[var(--color-brand-primary-soft)] rounded-full mb-6">
        <Icon size={48} className="siqah-accent-text" />
      </div>
      
      <h3 className="text-2xl font-bold text-[#3b3b3b] mb-3">
        {title}
      </h3>
      
      <p className="text-[#7a7368] max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {showBackButton && (
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Kembali
        </Button>
      )}
    </motion.div>
  );
}
