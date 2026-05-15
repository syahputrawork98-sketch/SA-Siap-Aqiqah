import React from "react";
import HeroAbout from "@/features/public/ui/about/HeroAbout";
import VisiMisi from "@/features/public/ui/about/VisiMisi";
import StorySection from "@/features/public/ui/about/StorySection";
import LogoMeaning from "@/features/public/ui/about/LogoMeaning";
import TeamSection from "@/features/public/ui/about/TeamSection";
import ValuesSection from "@/features/public/ui/about/ValuesSection";
import CTASection from "@/features/public/ui/about/CTASection";

const About = () => {
  return (
    <main className="w-full">
      <HeroAbout />
      <VisiMisi />
      <StorySection />
      <LogoMeaning />
      <TeamSection />
      <ValuesSection />
      <CTASection />
    </main>
  );
};

export default About;
