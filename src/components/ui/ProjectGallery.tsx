"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface ProjectGalleryProps {
  screenshots: string[];
  projectTitle: string;
}

export function ProjectGallery({
  screenshots,
  projectTitle,
}: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isOpen = selectedIndex !== null;
  const count = screenshots.length;

  const close = useCallback(() => setSelectedIndex(null), []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % count : null
    );
  }, [count]);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + count) % count : null
    );
  }, [count]);

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, close, goNext, goPrev]);

  return (
    <>
      {/* Thumbnail Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {screenshots.map((src, i) => (
          <motion.button
            key={i}
            variants={fadeInUp}
            onClick={() => setSelectedIndex(i)}
            className="group relative aspect-video rounded-xl border border-border overflow-hidden bg-card cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${projectTitle} screenshot ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/15 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/90 backdrop-blur-sm"
              onClick={close}
            />

            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 rounded-full bg-card/80 p-2 text-muted hover:text-foreground hover:bg-card transition-colors backdrop-blur-sm border border-border"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Navigation arrows */}
            {count > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-4 z-10 rounded-full bg-card/80 p-2 text-muted hover:text-foreground hover:bg-card transition-colors backdrop-blur-sm border border-border"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-4 z-10 rounded-full bg-card/80 p-2 text-muted hover:text-foreground hover:bg-card transition-colors backdrop-blur-sm border border-border"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                src={screenshots[selectedIndex!]}
                alt={`${projectTitle} screenshot ${selectedIndex! + 1}`}
                className="relative z-[1] max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>

            {/* Image counter */}
            {count > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 rounded-full bg-card/80 px-4 py-1.5 text-sm text-muted backdrop-blur-sm border border-border">
                {selectedIndex! + 1} / {count}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
