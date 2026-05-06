import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TerminalSection } from "@/components/sections/TerminalSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { resolveAllProjects } from "@/lib/projects";

export default async function HomePage() {
  const projects = await resolveAllProjects();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <SkillsSection />
      <ProjectsSection projects={projects} />
      <EducationSection />
      <TerminalSection />
      <ContactSection />
    </>
  );
}
