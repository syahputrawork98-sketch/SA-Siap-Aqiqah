import React from "react";
import { motion } from "framer-motion";
import { PublicCard, PublicSection, SectionHeading } from "@/shared/ui";
import teamMembers from "@/shared/mocks/public/home/team-members.json";

const TimSection = () => {
  return (
    <PublicSection className="siqah-public-bg-reverse" overlay="wash">
      <SectionHeading
        className="mb-12"
        title="Tim Amanah Siqah"
        description="Di balik setiap proses aqiqah yang lancar, ada tim yang bekerja tulus dan penuh dedikasi untuk menghadirkan keberkahan bagi keluarga Anda."
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        {teamMembers.map((person, index) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <PublicCard className="relative p-6 text-center">
              <div className="siqah-public-avatar-ring mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4">
                <img src={person.img} alt={person.nama} className="h-full w-full object-cover" />
              </div>

              <h3 className="mb-1 font-heading text-lg font-bold text-[var(--color-public-primary)]">{person.nama}</h3>
              <p className="mb-3 text-sm font-semibold text-[var(--color-public-accent)]">{person.role}</p>
              <p className="siqah-public-text-soft text-sm leading-relaxed">
                &quot;{person.quote}&quot;
              </p>
            </PublicCard>
          </motion.div>
        ))}
      </div>
    </PublicSection>
  );
};

export default TimSection;
