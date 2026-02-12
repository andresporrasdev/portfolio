"use client";

import { motion } from "motion/react";
import { GraduationCap, MapPin, Award } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { education } from "@/data/education";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function EducationSection() {
  const t = useTranslations("education");

  return (
    <SectionWrapper id="education">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {education.map((edu) => (
            <motion.div
              key={edu.institution}
              variants={fadeInUp}
              className="rounded-xl border border-border bg-card p-6 relative overflow-hidden"
            >
              {edu.honors && (
                <div className="absolute top-4 right-4">
                  <Badge variant="gold">
                    <Award className="h-3 w-3" />
                    {t("honors")}
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-gold/10">
                  <GraduationCap className="h-6 w-6 text-accent-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-accent">{edu.institution}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-muted">
                <span>{edu.period}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {edu.location}
                </span>
              </div>

              {edu.gpa && (
                <p className="text-sm mb-3">
                  <span className="text-muted">{t("gpa")}: </span>
                  <span className="font-semibold text-accent-gold">
                    {edu.gpa}
                  </span>
                </p>
              )}

              {edu.description && (
                <p className="text-sm text-muted leading-relaxed">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
