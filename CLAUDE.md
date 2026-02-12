# CLAUDE.md — Andres Porras Portfolio

## Project Overview

Personal portfolio website for Andres Porras, a Full Stack Developer based in Ontario, Canada. The site showcases projects, skills, career timeline, and includes an AI-powered terminal. It's multilingual (EN/FR/ES) with a bold dark-first design.

**GitHub**: `andresporrasdev`
**Location**: `/Users/mac/Git/Portfolio/portfolio/`

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS v4 (uses `@theme inline` in CSS, not `tailwind.config.ts`), clsx + tailwind-merge
- **Animations**: Framer Motion via `motion` package v12 — import from `motion/react`, NOT `framer-motion`
- **i18n**: `next-intl` v4 — locales: `en`, `fr`, `es` — translation files in `/messages/`
- **Theming**: `next-themes` — dark mode is default, uses `class` strategy
- **AI Chat**: Anthropic API directly (Claude Haiku 4.5) — route at `/api/chat/`
- **Contact Form**: Resend API — route at `/api/contact/`
- **Icons**: Lucide React
- **Fonts**: Inter (body), Space Grotesk (headings), JetBrains Mono (terminal) — via `next/font/google`
- **GitHub Data**: GitHub REST API with ISR (`revalidate: 3600`)

## Architecture

### Routing
- `src/app/layout.tsx` — Root layout, just returns `children` (no `<html>` tag)
- `src/app/[locale]/layout.tsx` — Locale layout with `<html>`, fonts, ThemeProvider, NextIntlClientProvider, Navbar, Footer
- `src/app/[locale]/page.tsx` — Main page composing all 8 sections
- `src/app/[locale]/projects/[slug]/page.tsx` — Project detail pages
- `src/middleware.ts` — next-intl middleware for locale detection and redirects

### Main Page Sections (in order)
1. HeroSection — full-screen, animated name, status badge, CTAs
2. AboutSection — bio, trilingual badges, GitHub heatmap
3. TerminalSection — dual-mode CLI (static commands + AI chat)
4. JourneySection — animated career timeline Colombia -> Canada
5. ProjectsSection — bento grid with auto-fetched GitHub data
6. SkillsSection — categorized skill groups
7. EducationSection — Algonquin (honours), Uniapel
8. ContactSection — form + social links + resume download

### Data Layer
- `src/data/profile.ts` — name, location, email, GitHub, LinkedIn, availableForHire flag
- `src/data/projects.ts` — project configs (public repos: minimal; private: full local data)
- `src/data/experience.ts` — work experience array
- `src/data/skills.ts` — categorized skill groups
- `src/data/education.ts` — education entries
- `src/data/timeline.ts` — career journey milestones

### GitHub Auto-Fetch
- Public repos in `projects.ts` only need `{ slug, repo, category }` — everything else comes from GitHub API + README
- `src/lib/github.ts` — `getRepoData()`, `getRepoReadme()`, `parseReadmeImages()`, `parseReadmeDescription()`
- `src/lib/projects.ts` — `resolveAllProjects()` merges local data with GitHub-fetched data
- ISR caches for 1 hour; optional `GITHUB_TOKEN` env var for higher rate limits

### AI Terminal
- Static commands: `help`, `about`, `skills`, `projects`, `experience`, `contact`, `languages`, `clear`
- AI mode: any other input goes to `/api/chat/` which calls Anthropic API with a system prompt containing Andres's profile data
- Rate limited: max 5 AI messages per session (sessionStorage)
- Terminal only auto-scrolls after user interaction (prevents page jump on load)

## Key Conventions

### Imports
- Motion: `import { motion } from "motion/react"` (NOT `framer-motion`)
- GitHub Calendar: `import { GitHubCalendar } from "react-github-calendar"` (named export, NOT default)
- Path aliases: `@/components`, `@/lib`, `@/data`, `@/types`, `@/i18n`

### Next.js 16 Specifics
- `params` is a Promise in page/layout components — must `await params`
- Middleware works but shows deprecation warning (Next.js 16 prefers "proxy")
- Tailwind CSS v4 uses CSS-based config (`globals.css` with `@theme inline`), not `tailwind.config.ts`

### Components
- Section components are in `src/components/sections/`
- UI primitives are in `src/components/ui/`
- Layout components (Navbar, Footer, LanguageSwitcher) are in `src/components/layout/`
- Client components must have `"use client"` directive
- Server components are the default — keep as much as possible server-side

### Translations
- All UI text uses `useTranslations()` from `next-intl`
- Translation keys are in `messages/{en,fr,es}.json`
- When adding new UI text, add the key to ALL 3 translation files
- Project data from GitHub READMEs stays in English (not translated)

### Styling
- Colors defined as CSS custom properties in `globals.css` (e.g., `--accent`, `--accent-teal`, `--accent-coral`)
- Use Tailwind utility classes that reference these vars: `text-accent`, `bg-card`, `border-border`, `text-muted`
- Grain texture overlay applied via `grain-overlay` class on `<body>`
- Gradient blobs use `gradient-blob` + variant classes (`gradient-blob-violet`, etc.)

## Environment Variables

```
ANTHROPIC_API_KEY=     # Required for AI terminal chat
RESEND_API_KEY=        # Required for contact form emails
CONTACT_EMAIL=         # Email to receive contact messages
GITHUB_TOKEN=          # Optional, for higher GitHub API rate limits
```

## Common Tasks

### Adding a new project
1. **Public GitHub repo**: Add entry to `src/data/projects.ts` with `{ slug, repo, category }`. Data auto-fetches.
2. **Private/external**: Add full entry with `title`, `description`, `techStack`, `screenshots`, optional `liveUrl`.
3. Add screenshot to `public/images/projects/` if needed.

### Adding a timeline milestone
Add object to `src/data/timeline.ts`:
```ts
{ year: "2026", title: "...", description: "...", type: "work"|"education"|"project"|"life", location: "...", projects?: ["slug"] }
```

### Adding a new translation key
Add the key to ALL 3 files: `messages/en.json`, `messages/fr.json`, `messages/es.json`.

### Build & Dev
```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint
```

## Projects in Portfolio (10 total)

| Project | Type | Auto-fetch |
|---------|------|-----------|
| Landseed.ca (featured) | Full Stack | No — private repo |
| liceocervantes.edu.co (featured) | WordPress/CMS | No — local data |
| Charity Portal (featured) | Full Stack | Yes — public repo `Charity-Portal` |
| Traffic Volumes | Full Stack | Yes — public repo `Traffic-Volumes` |
| ACME College REST API | API | Yes — public repo `REST-ACME-College` |
| Android Multi-App | Mobile | Yes — public repo `Android-Multi-App` |
| Acrilicol.co | Full Stack | No — WordPress + Python backend |
| tuwatch.co | WordPress/CMS | No — e-commerce, Divi + jQuery |
| seguridadlaboralnasbec.com | WordPress/CMS | No — Divi |
| ybpublicidad.com | WordPress/CMS | No — WordPress + Node.js intranet |

## Owner Info

- **Name**: Andres Porras
- **Location**: Ontario, Canada (do NOT mention Ottawa specifically)
- **Email**: andresporrasdev@gmail.com
- **Trilingual**: English, French, Spanish
- **Currently**: Volunteering at Landseed.ca, open to full-time positions
