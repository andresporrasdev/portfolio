"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  Code,
  Plane,
  MapPin,
  Trophy,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { timeline } from "@/data/timeline";
import { fadeInUp } from "@/lib/animations";

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  project: Code,
  life: Plane,
};

const typeColors = {
  work: "text-accent bg-accent/10 border-accent/30",
  education: "text-accent-gold bg-accent-gold/10 border-accent-gold/30",
  project: "text-accent-teal bg-accent-teal/10 border-accent-teal/30",
  life: "text-accent-coral bg-accent-coral/10 border-accent-coral/30",
};

export function JourneySection() {
  const t = useTranslations("journey");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper id="journey">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Animated line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px">
            <motion.div
              className="w-full bg-gradient-to-b from-accent via-accent-teal to-accent-coral"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Milestones */}
          <div className="space-y-12">
            {timeline.map((milestone, index) => {
              const Icon = typeIcons[milestone.type];
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`relative flex items-start gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } ml-16 md:ml-0`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      isLeft ? "md:text-right md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div
                      className={`rounded-xl border border-border bg-card p-6 ${
                        isLeft ? "md:ml-auto" : ""
                      } max-w-md`}
                    >
                      <div
                        className={`flex items-center gap-2 mb-2 ${
                          isLeft ? "md:justify-end" : ""
                        }`}
                      >
                        <Badge
                          variant={
                            milestone.type === "work"
                              ? "default"
                              : milestone.type === "education"
                                ? "gold"
                                : milestone.type === "project"
                                  ? "teal"
                                  : "coral"
                          }
                        >
                          {milestone.year}
                        </Badge>
                        {milestone.location && (
                          <span className="text-xs text-muted flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {milestone.location}
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-lg font-semibold mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {milestone.description}
                      </p>

                      {milestone.achievements && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {milestone.achievements.map((a) => (
                            <span
                              key={a}
                              className="inline-flex items-center gap-1 text-xs text-accent-gold"
                            >
                              <Trophy className="h-3 w-3" /> {a}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Icon node */}
                  <div
                    className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border ${typeColors[milestone.type]}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
