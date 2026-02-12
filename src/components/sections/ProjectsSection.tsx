"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { ProjectWithData } from "@/types";

interface ProjectsSectionProps {
  projects: ProjectWithData[];
}

const categories = ["All", "Full Stack", "WordPress/CMS", "API", "Mobile"];

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations("projects");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const featured = filtered.filter((p) => p.featured);
  const others = filtered.filter((p) => !p.featured);

  return (
    <SectionWrapper id="projects">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeFilter === cat
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground border border-border"
              }`}
            >
              {cat === "All" ? t("filter_all") : cat}
            </button>
          ))}
        </motion.div>

        {/* Featured projects — large cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {featured.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {featured.map((project) => (
                  <ProjectCard key={project.slug} project={project} t={t} featured />
                ))}
              </div>
            )}

            {others.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {others.map((project) => (
                  <ProjectCard key={project.slug} project={project} t={t} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}

function ProjectCard({
  project,
  t,
  featured,
}: {
  project: ProjectWithData;
  t: ReturnType<typeof useTranslations>;
  featured?: boolean;
}) {
  return (
    <motion.div variants={fadeInUp}>
      <Link href={`/projects/${project.slug}`}>
        <div
          className={`group rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 ${
            featured ? "p-6" : "p-5"
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              {project.featured && (
                <Badge variant="accent" className="mb-2">
                  {t("featured")}
                </Badge>
              )}
              <h3
                className={`font-heading font-semibold group-hover:text-accent transition-colors ${
                  featured ? "text-xl" : "text-lg"
                }`}
              >
                {project.resolvedTitle}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-muted">
              {project.repoData && (
                <>
                  {project.repoData.stars > 0 && (
                    <span className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3" /> {project.repoData.stars}
                    </span>
                  )}
                  {project.repoData.forks > 0 && (
                    <span className="flex items-center gap-1 text-xs">
                      <GitFork className="h-3 w-3" /> {project.repoData.forks}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <p className="text-sm text-muted mb-4 line-clamp-2">
            {project.resolvedDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.resolvedTechStack.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted">
            {project.liveUrl && (
              <span className="flex items-center gap-1 hover:text-accent-teal">
                <ExternalLink className="h-3 w-3" /> {t("live_site")}
              </span>
            )}
            {project.repo && (
              <span className="flex items-center gap-1 hover:text-accent">
                <Github className="h-3 w-3" /> {t("source_code")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
