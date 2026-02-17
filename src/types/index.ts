export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  availableForHire: boolean;
  resumeUrl: string;
}

export interface Project {
  slug: string;
  repo?: string;
  title?: string;
  description?: string;
  techStack?: string[];
  screenshots?: string[];
  liveUrl?: string;
  featured?: boolean;
  category: "Full Stack" | "WordPress/CMS" | "API" | "Mobile" | "Frontend";
}

export interface GitHubRepoData {
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  homepage: string | null;
  defaultBranch: string;
}

export interface ProjectWithData extends Project {
  resolvedTitle: string;
  resolvedDescription: string;
  resolvedTechStack: string[];
  resolvedScreenshots: string[];
  repoData?: GitHubRepoData;
  readmeContent?: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  type: "work" | "education" | "project" | "life";
  projects?: string[];
  location?: string;
  achievements?: string[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  gpa?: string;
  honors?: boolean;
  description?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
}
