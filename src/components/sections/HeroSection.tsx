"use client";

import { motion } from "motion/react";
import { ArrowDown, FolderOpen, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Gradient Blobs */}
      <div className="gradient-blob gradient-blob-violet w-[500px] h-[500px] -top-20 -left-20 absolute" />
      <div className="gradient-blob gradient-blob-teal w-[400px] h-[400px] -bottom-20 -right-20 absolute" />
      <div className="gradient-blob gradient-blob-coral w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute opacity-10" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatusBadge />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 text-lg text-muted"
        >
          {t("greeting")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 font-heading text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="bg-gradient-to-r from-accent via-accent-teal to-accent bg-clip-text text-transparent">
            {t("name")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 font-heading text-xl text-accent-teal sm:text-2xl"
        >
          {t("title")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 max-w-2xl mx-auto text-muted leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="#projects" size="lg">
            <FolderOpen className="h-5 w-5" />
            {t("cta_projects")}
          </Button>
          <Button href="#contact" variant="secondary" size="lg">
            <Send className="h-5 w-5" />
            {t("cta_contact")}
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator — positioned relative to section, not content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted"
        >
          <span className="text-xs">{t("scroll")}</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
