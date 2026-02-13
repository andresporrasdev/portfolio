import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Star, GitFork, Clock } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveProject } from "@/lib/projects";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectGallery } from "@/components/ui/ProjectGallery";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const project = await resolveProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              {project.featured && (
                <Badge variant="accent" className="mb-3">
                  Featured
                </Badge>
              )}
              <h1 className="font-heading text-3xl font-bold sm:text-4xl">
                {project.resolvedTitle}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <Button href={project.liveUrl} size="sm" external>
                  <ExternalLink className="h-4 w-4" />
                  Live Site
                </Button>
              )}
              {project.repo && (
                <Button
                  href={`https://github.com/andresporrasdev/${project.repo}`}
                  variant="secondary"
                  size="sm"
                  external
                >
                  <Github className="h-4 w-4" />
                  Source
                </Button>
              )}
            </div>
          </div>

          <p className="mt-4 text-muted leading-relaxed max-w-3xl">
            {project.resolvedDescription}
          </p>

          {/* Repo stats */}
          {project.repoData && (
            <div className="flex items-center gap-4 mt-4 text-sm text-muted">
              {project.repoData.language && (
                <span>{project.repoData.language}</span>
              )}
              {project.repoData.stars > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" /> {project.repoData.stars}
                </span>
              )}
              {project.repoData.forks > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" /> {project.repoData.forks}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Updated{" "}
                {new Date(project.repoData.updatedAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Tech Stack */}
        {project.resolvedTechStack.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.resolvedTechStack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Screenshots */}
        {project.resolvedScreenshots.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold mb-4">
              Gallery
            </h2>
            <ProjectGallery
              screenshots={project.resolvedScreenshots}
              projectTitle={project.resolvedTitle}
            />
          </div>
        )}

        {/* README */}
        {project.readmeContent && (
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold mb-4">README</h2>
            <div className="rounded-xl border border-border bg-card p-6 prose prose-invert max-w-none prose-headings:font-heading prose-a:text-accent prose-code:text-accent-teal prose-pre:bg-background prose-pre:border prose-pre:border-border">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.readmeContent}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
