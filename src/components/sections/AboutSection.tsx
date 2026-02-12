"use client";

import { motion } from "motion/react";
import { MapPin, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { GitHubHeatmap } from "@/components/ui/GitHubHeatmap";
import { staggerContainer, fadeInUp } from "@/lib/animations";

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

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div variants={fadeInUp} className="space-y-5">
            <p className="text-foreground/90 leading-relaxed">{t("bio_1")}</p>
            <p className="text-foreground/90 leading-relaxed">{t("bio_2")}</p>
            <p className="text-foreground/90 leading-relaxed">{t("bio_3")}</p>

            <div className="flex items-center gap-2 text-muted">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{t("location_value")}</span>
            </div>
          </motion.div>

          {/* Languages & Info */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div>
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
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <div>
                      <p className="text-sm font-medium">{lang.name}</p>
                      <p className="text-xs text-muted">{lang.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
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
