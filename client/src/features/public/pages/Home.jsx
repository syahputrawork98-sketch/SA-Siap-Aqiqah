import React from "react";
import HeroSection from "@/features/public/ui/home/HeroSection";
import AboutSection from "@/features/public/ui/home/AboutSection";
import PaketSection from "@/features/public/ui/home/PaketSection";
import TimelineSection from "@/features/public/ui/home/TimelineSection";
import HewanSection from "@/features/public/ui/home/HewanSection";
import TestimoniSection from "@/features/public/ui/home/TestimoniSection";
import TimSection from "@/features/public/ui/home/TimSection";
import CTASection from "@/features/public/ui/home/CTASection"

const Home = () => {
  return (
    <main className="w-full text-gray-800">
      <HeroSection />
      <AboutSection />
      <PaketSection />
      <TimelineSection />
      <HewanSection />
      <TestimoniSection />
      <TimSection />
      <CTASection />
    </main>
  );
};

export default Home;
