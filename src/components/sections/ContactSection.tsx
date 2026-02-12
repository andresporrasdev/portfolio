"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ContactForm } from "@/components/ui/ContactForm";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <SectionWrapper id="contact">
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
          <p className="mt-3 text-muted max-w-lg mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <motion.div variants={fadeInUp}>
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:border-accent/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted">{profile.email}</p>
                </div>
              </a>

              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:border-accent/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Github className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">GitHub</p>
                  <p className="text-sm text-muted">@{profile.github}</p>
                </div>
              </a>

              <a
                href={`https://linkedin.com/in/${profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:border-accent/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Linkedin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">LinkedIn</p>
                  <p className="text-sm text-muted">@{profile.linkedin}</p>
                </div>
              </a>
            </div>

            <Button
              href={profile.resumeUrl}
              variant="secondary"
              className="w-full"
            >
              <Download className="h-4 w-4" />
              {t("download_resume")}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
