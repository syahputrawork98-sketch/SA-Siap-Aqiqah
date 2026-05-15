import React from "react";
import HeroSection from "@/features/public/ui/paket/HeroSection";
import PaketSection from "@/features/public/ui/paket/PaketSection";
import PaketPilihan from "@/features/public/ui/paket/PaketPilihan";

const Paket = () => {
  return (
    <main className="w-full overflow-hidden">
      <HeroSection />
      <PaketSection />
      <PaketPilihan />
    </main>
  );
};

export default Paket;
