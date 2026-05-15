import React from "react";
import HeroSection from "@/features/public/ui/services/HeroSection";
import ServicesList from "@/features/public/ui/services/ServicesList";
import ProcessSection from "@/features/public/ui/services/ProcessSection";
import AdvantagesSection from "@/features/public/ui/services/AdvantagesSection";
import CTASection from "@/features/public/ui/services/CTASection";

const Services = () => {
  return (
    <main className="w-full overflow-hidden">
      <HeroSection />
      <ServicesList />
      <ProcessSection />
      <AdvantagesSection />
      <CTASection />
    </main>
  );
};

export default Services;
