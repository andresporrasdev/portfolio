# Andres Porras — Portfolio

Personal portfolio website built with Next.js 16, showcasing my projects, skills, and career journey as a Full Stack Developer.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4?logo=framer)

## Features

- **AI-Powered Terminal** — Interactive CLI where visitors can type commands or ask natural language questions about me, powered by Claude Haiku via the Vercel AI SDK
- **Multilingual (EN/FR/ES)** — Full internationalization with `next-intl`, including language switcher and locale-based routing
- **Auto-Fetched Projects** — Public GitHub repos pull descriptions, screenshots, and stats directly from the GitHub API and README files via ISR (revalidates hourly)
- **Career Journey Timeline** — Animated scroll-linked timeline from Colombia to Canada, built with Framer Motion
- **GitHub Contribution Heatmap** — Live coding activity grid using `react-github-calendar`
- **Dark/Light Mode** — Theme toggle powered by `next-themes` with a dark-first design
- **Contact Form** — Server-side email delivery via Resend API with Zod validation
- **SEO Optimized** — Structured data (JSON-LD), Open Graph metadata, dynamic sitemap, and robots.txt
- **Fully Responsive** — Mobile-first design with glassmorphism navbar and animated mobile menu

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, CSS custom properties, clsx + tailwind-merge |
| **Animations** | Framer Motion (`motion` package v12) |
| **i18n** | next-intl (EN, FR, ES) |
| **AI Chat** | Vercel AI SDK, Anthropic Claude Haiku |
| **Contact** | Resend API, React Hook Form, Zod |
| **Icons** | Lucide React |
| **Theming** | next-themes |
| **Markdown** | react-markdown, remark-gfm |
| **GitHub Data** | GitHub REST API with ISR caching, react-github-calendar |

## Project Structure

```
portfolio/
├── messages/                    # i18n translation files (en, fr, es)
├── public/
│   ├── images/                  # Profile photo, project screenshots
│   └── resume/                  # Downloadable PDF resume
├── src/
│   ├── app/
│   │   ├── [locale]/            # Locale-wrapped pages
│   │   │   ├── page.tsx         # Main page (all sections)
│   │   │   └── projects/[slug]/ # Dynamic project detail pages
│   │   ├── api/
│   │   │   ├── chat/            # AI terminal chat endpoint
│   │   │   └── contact/         # Contact form email endpoint
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/              # Navbar, Footer, LanguageSwitcher
│   │   ├── sections/            # Hero, About, Terminal, Journey, Projects, Skills, Education, Contact
│   │   ├── ui/                  # Button, Badge, ContactForm, GitHubHeatmap, StatusBadge, ThemeToggle
│   │   ├── seo/                 # JSON-LD structured data
│   │   └── providers/           # ThemeProvider
│   ├── data/                    # Profile, experience, projects, skills, education, timeline
│   ├── i18n/                    # next-intl routing and request config
│   ├── lib/                     # GitHub API, project resolver, animation variants, utilities
│   └── types/                   # TypeScript interfaces
└── .env.local                   # API keys (not committed)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/andresporrasdev/portfolio.git
cd portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Anthropic API key for AI terminal chat
ANTHROPIC_API_KEY=your_anthropic_api_key

# Resend API key for contact form emails
RESEND_API_KEY=your_resend_api_key

# Email address to receive contact form messages
CONTACT_EMAIL=your@email.com

# GitHub token for higher API rate limits (optional)
GITHUB_TOKEN=your_github_token
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Adding Projects

**Public GitHub repo** — Add one entry to `src/data/projects.ts`:

```ts
{ slug: "my-project", repo: "My-Repo", featured: true, category: "Full Stack" }
```

All data (description, screenshots, stats) is auto-fetched from the GitHub API and README.

**Private or non-GitHub project** — Provide full local data:

```ts
{
  slug: "my-project",
  title: "My Project",
  description: "Project description",
  techStack: ["React", "Node.js"],
  screenshots: ["/images/projects/my-project.png"],
  liveUrl: "https://my-project.com",
}
```

## License

This project is personal and not open for redistribution. Feel free to use it as inspiration for your own portfolio.
