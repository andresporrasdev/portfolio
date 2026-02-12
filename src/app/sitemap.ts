import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://andresporras.dev";
  const entries: MetadataRoute.Sitemap = [];

  // Main pages for each locale
  for (const locale of routing.locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });

    // Project pages
    for (const project of projects) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
