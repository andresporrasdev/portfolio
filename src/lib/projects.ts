import { projects } from "@/data/projects";
import {
  getRepoData,
  getRepoReadme,
  parseReadmeImages,
  parseReadmeDescription,
} from "./github";
import type { ProjectWithData } from "@/types";

export async function resolveAllProjects(): Promise<ProjectWithData[]> {
  const resolved = await Promise.all(
    projects.map(async (project) => {
      let repoData = null;
      let readmeContent = null;

      if (project.repo) {
        [repoData, readmeContent] = await Promise.all([
          getRepoData(project.repo),
          getRepoReadme(project.repo),
        ]);
      }

      const readmeImages = readmeContent
        ? parseReadmeImages(readmeContent)
        : [];
      const readmeDescription = readmeContent
        ? parseReadmeDescription(readmeContent)
        : "";

      return {
        ...project,
        resolvedTitle:
          project.title || project.repo || project.slug,
        resolvedDescription:
          project.description || readmeDescription || repoData?.description || "",
        resolvedTechStack:
          project.techStack || repoData?.topics || [],
        resolvedScreenshots:
          project.screenshots || readmeImages,
        repoData: repoData || undefined,
        readmeContent: readmeContent || undefined,
      } satisfies ProjectWithData;
    })
  );

  return resolved;
}

export async function resolveProject(
  slug: string
): Promise<ProjectWithData | null> {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  let repoData = null;
  let readmeContent = null;

  if (project.repo) {
    [repoData, readmeContent] = await Promise.all([
      getRepoData(project.repo),
      getRepoReadme(project.repo),
    ]);
  }

  const readmeImages = readmeContent ? parseReadmeImages(readmeContent) : [];
  const readmeDescription = readmeContent
    ? parseReadmeDescription(readmeContent)
    : "";

  return {
    ...project,
    resolvedTitle:
      project.title || project.repo || project.slug,
    resolvedDescription:
      project.description || readmeDescription || repoData?.description || "",
    resolvedTechStack: project.techStack || repoData?.topics || [],
    resolvedScreenshots: project.screenshots || readmeImages,
    repoData: repoData || undefined,
    readmeContent: readmeContent || undefined,
  } satisfies ProjectWithData;
}
