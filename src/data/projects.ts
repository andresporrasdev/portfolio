import type { Project } from "@/types";

export const projects: Project[] = [
  // === Featured Projects ===
  {
    slug: "landseed",
    title: "Landseed.ca",
    description:
      "Full-stack volunteer platform connecting landowners with community gardeners. Built with modern React architecture, Node.js backend, and MongoDB for data persistence.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    screenshots: ["/images/projects/landseed-1.png"],
    featured: true,
    category: "Full Stack",
  },
  {
    slug: "liceocervantes",
    title: "liceocervantes.edu.co",
    description:
      "School website serving 10,000+ monthly visitors. Designed and maintained during 6 years as IT Senior Technician. Built with WordPress and Elementor, featuring responsive design and optimized performance.",
    techStack: ["WordPress", "Elementor", "PHP", "MySQL", "CSS"],
    screenshots: ["/images/projects/liceocervantes-1.png"],
    liveUrl: "https://liceocervantes.edu.co",
    featured: true,
    category: "WordPress/CMS",
  },
  // === Public GitHub Repos (auto-fetched) ===
  {
    slug: "charity-portal",
    repo: "Charity-Portal",
    featured: true,
    category: "Full Stack",
  },
  {
    slug: "traffic-volumes",
    repo: "Traffic-Volumes-Provincial-Highway-System",
    featured: false,
    category: "Full Stack",
  },
  {
    slug: "acme-college-rest-api",
    repo: "acme-college-rest-api",
    featured: false,
    category: "API",
  },
  {
    slug: "android-multi-app",
    repo: "FinalProjectAndroid",
    featured: false,
    category: "Mobile",
  },
  // === Private / External Projects ===
  {
    slug: "acrilicol",
    title: "Acrilicol.com",
    description:
      "Informative site with live pricing for acrylic sheets. Features a Python backend service for generating invoices (PDF, print, email). More than just CMS — has custom backend logic for pricing calculations and document generation.",
    techStack: ["WordPress", "Python", "MySQL", "PDF Generation"],
    screenshots: ["/images/projects/acrilicol-1.png"],
    liveUrl: "https://acrilicol.com",
    featured: false,
    category: "Full Stack",
  },
  {
    slug: "tuwatch",
    title: "tuwatch.co",
    description:
      "Responsive e-commerce platform for browsing, searching, and purchasing products. Handled frontend design, backend development, and database administration.",
    techStack: ["WordPress", "Divi", "JavaScript", "jQuery", "MySQL"],
    screenshots: ["/images/projects/tuwatch-1.png"],
    liveUrl: "https://tuwatch.co",
    featured: false,
    category: "WordPress/CMS",
  },
  {
    slug: "seguridad-laboral-nasbec",
    title: "seguridadlaboralnasbec.com",
    description:
      "Corporate website for occupational safety company. Built with WordPress and Divi Builder, featuring professional design and responsive layout.",
    techStack: ["WordPress", "Divi", "CSS"],
    screenshots: ["/images/projects/seguridad-1.png"],
    liveUrl: "https://seguridadlaboralnasbec.com",
    featured: false,
    category: "WordPress/CMS",
  },
  {
    slug: "yb-publicidad",
    title: "ybpublicidad.com",
    description:
      "Landing page for customer acquisition plus a Node.js intranet backend for customers and employees featuring task queue and work management.",
    techStack: ["WordPress", "Node.js", "JavaScript", "MySQL"],
    screenshots: ["/images/projects/ybpublicidad-1.png"],
    liveUrl: "https://ybpublicidad.com",
    featured: false,
    category: "WordPress/CMS",
  },
];
