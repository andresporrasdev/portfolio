"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28 px-4", className)}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="mx-auto max-w-6xl"
      >
        {children}
      </motion.div>
    </section>
  );
}
