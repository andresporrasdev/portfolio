"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { GitHubHeatmap } from "@/components/ui/GitHubHeatmap";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";

export function AboutSection() {
  const t = useTranslations("about");

  const languages = [
    { name: t("english"), level: "Fluent", flag: "🇬🇧" },
    { name: t("french"), level: "Intermediate", flag: "🇫🇷" },
    { name: t("spanish"), level: "Native", flag: "🇨🇴" },
  ];

  return (
    <SectionWrapper id="about">
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

        {/* Photo + Bio: editorial layout */}
        <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-start">
          {/* Profile photo with decorative elements */}
          <motion.div
            variants={scaleIn}
            className="flex justify-center md:sticky md:top-28"
          >
            <div className="relative">
              {/* Glow behind photo */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-accent/20 via-accent-teal/10 to-transparent blur-2xl" />

              {/* Gradient accent border */}
              <div className="relative rounded-2xl bg-gradient-to-br from-accent via-accent-teal/50 to-accent-coral/30 p-[2px]">
                <div className="rounded-2xl bg-card overflow-hidden">
                  <div className="relative h-56 w-56 sm:h-64 sm:w-64">
                    <Image
                      src="/images/profile/andres-porras.jpeg"
                      alt="Andres Porras"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Location badge pinned under photo */}
              <div className="mt-4 flex items-center justify-center gap-2 text-muted text-sm">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span>{t("location_value")}</span>
              </div>
            </div>
          </motion.div>

          {/* Bio + Languages */}
          <div className="space-y-10">
            <motion.div variants={fadeInUp} className="space-y-5">
              <p className="text-foreground/90 leading-relaxed text-lg">
                {t("bio_1")}
              </p>
              <p className="text-foreground/90 leading-relaxed">
                {t("bio_2")}
              </p>
              <p className="text-foreground/90 leading-relaxed">
                {t("bio_3")}
              </p>
            </motion.div>

            {/* Languages */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-2 mb-4">
                <Languages className="h-5 w-5 text-accent" />
                <h3 className="font-heading text-lg font-semibold">
                  {t("languages")}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-accent/30"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <div>
                      <p className="text-sm font-medium">{lang.name}</p>
                      <p className="text-xs text-muted">{lang.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* GitHub Heatmap */}
        <motion.div variants={fadeInUp} className="mt-16">
          <h3 className="font-heading text-lg font-semibold mb-6">
            {t("activity")}
          </h3>
          <div className="rounded-xl border border-border bg-card p-6 overflow-hidden">
            <GitHubHeatmap />
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
