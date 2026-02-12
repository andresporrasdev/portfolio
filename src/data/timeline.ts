import type { TimelineMilestone } from "@/types";

export const timeline: TimelineMilestone[] = [
  {
    year: "2007-2009",
    title: "Computer Technician Studies",
    description:
      "Started my journey in tech with a Computer Technician program, building a strong foundation in hardware, networking, and technical support.",
    type: "education",
    location: "Colombia",
  },
  {
    year: "2010-2012",
    title: "Technical Support Specialist",
    description:
      "Provided technical support at Contact Center Americas, honing problem-solving skills and customer communication.",
    type: "work",
    location: "Colombia",
  },
  {
    year: "2013-2019",
    title: "IT Senior Tech & Web Developer",
    description:
      "Led IT operations and web development at Cervantes School. Built and maintained the school website serving 10,000+ monthly users, drove 50% social media growth and 20% admission increase.",
    type: "work",
    location: "Colombia",
    projects: ["liceocervantes"],
    achievements: [
      "10,000+ monthly website visitors",
      "50% social media growth",
      "20% admission increase",
    ],
  },
  {
    year: "2019-2022",
    title: "Freelance Full Stack Developer",
    description:
      "Launched freelance career building custom websites and web applications for diverse clients. Delivered e-commerce platforms, corporate sites, and custom backend solutions.",
    type: "work",
    location: "Colombia",
    projects: ["tuwatch", "seguridad-laboral-nasbec", "acrilicol"],
  },
  {
    year: "2023",
    title: "Moved to Canada",
    description:
      "Relocated to Ontario, Canada to pursue new opportunities and advance my career in software development.",
    type: "life",
    location: "Ontario, Canada",
  },
  {
    year: "2023-2024",
    title: "Algonquin College — Honours Graduate",
    description:
      "Completed Computer Programming program with Honours (3.66 GPA). Built the Charity Portal capstone project using the MERN stack.",
    type: "education",
    location: "Ontario, Canada",
    projects: ["charity-portal"],
    achievements: ["Honours Graduate", "3.66 GPA"],
  },
  {
    year: "2024",
    title: "Charity Portal & Continued Growth",
    description:
      "Developed the Charity Portal with MERN stack, JWT authentication, and Eventbrite API integration. Continued part-time work with Acrilicol on backend services.",
    type: "project",
    location: "Ontario, Canada",
    projects: ["charity-portal", "acrilicol"],
  },
  {
    year: "2025",
    title: "Volunteer Developer — Landseed.ca",
    description:
      "Joined Landseed.ca as a volunteer Full Stack Developer, building a platform connecting tiny house enthusiasts with landowners across Canada. Working with React, Node.js, and MongoDB.",
    type: "work",
    location: "Ontario, Canada",
    projects: ["landseed"],
  },
  {
    year: "2026",
    title: "Open to Opportunities",
    description:
      "Continuing volunteer work with Landseed.ca while actively seeking full-time software developer positions in Ontario and remote.",
    type: "life",
    location: "Ontario, Canada",
    projects: ["landseed"],
  },
];
