import type { GitHubRepoData } from "@/types";

const GITHUB_USERNAME = "andresporrasdev";
const GITHUB_API = "https://api.github.com";

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function getRepoData(
  repoName: string
): Promise<GitHubRepoData | null> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return {
      description: data.description,
      language: data.language,
      stars: data.stargazers_count,
      forks: data.forks_count,
      topics: data.topics || [],
      updatedAt: data.updated_at,
      homepage: data.homepage,
      defaultBranch: data.default_branch || "main",
    };
  } catch {
    return null;
  }
}

export async function getRepoReadme(
  repoName: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
      {
        headers: {
          ...getHeaders(),
          Accept: "application/vnd.github.v3.raw",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export function parseReadmeImages(
  readme: string,
  repoName: string,
  defaultBranch: string = "main"
): string[] {
  const images: string[] = [];

  // Match markdown images: ![alt](url)
  const mdImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = mdImageRegex.exec(readme)) !== null) {
    images.push(resolveGitHubImageUrl(match[2], repoName, defaultBranch));
  }

  // Match HTML img tags: <img src="url" />
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  while ((match = htmlImageRegex.exec(readme)) !== null) {
    images.push(resolveGitHubImageUrl(match[1], repoName, defaultBranch));
  }

  return images;
}

function resolveGitHubImageUrl(
  url: string,
  repoName: string,
  defaultBranch: string
): string {
  // Already absolute URL
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Relative path — convert to raw GitHub URL
  const cleanPath = url.replace(/^\.\//, "");
  return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/${cleanPath}`;
}

export function parseReadmeDescription(readme: string): string {
  const lines = readme.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip headings, empty lines, badges, images
    if (
      trimmed === "" ||
      trimmed.startsWith("#") ||
      trimmed.startsWith("![") ||
      trimmed.startsWith("<img") ||
      trimmed.startsWith("[![") ||
      trimmed.startsWith("---") ||
      trimmed.startsWith("```")
    ) {
      continue;
    }
    // Found a paragraph
    return trimmed;
  }
  return "";
}
