"use client";

import { motion } from "motion/react";
import {
  Code,
  Server,
  Database,
  Wrench,
  Palette,
  Layout,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { skills } from "@/data/skills";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Code,
  Backend: Server,
  Database: Database,
  "DevOps & Tools": Wrench,
  Design: Palette,
  "CMS & Platforms": Layout,
};

const categoryColors: Record<string, string> = {
  Frontend: "from-accent to-accent/50",
  Backend: "from-accent-teal to-accent-teal/50",
  Database: "from-accent-coral to-accent-coral/50",
  "DevOps & Tools": "from-accent-gold to-accent-gold/50",
  Design: "from-pink-500 to-pink-500/50",
  "CMS & Platforms": "from-cyan-500 to-cyan-500/50",
};

export function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <SectionWrapper id="skills">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category) => {
            const Icon = categoryIcons[category.title] || Code;
            const gradient = categoryColors[category.title] || "from-accent to-accent/50";

            return (
              <motion.div
                key={category.title}
                variants={fadeInUp}
                className="rounded-xl border border-border bg-card p-6 hover:border-accent/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${gradient}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-md bg-background px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
