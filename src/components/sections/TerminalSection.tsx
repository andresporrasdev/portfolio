"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Terminal, Circle } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { fadeInUp } from "@/lib/animations";

interface TerminalLine {
  type: "input" | "output" | "error" | "ai";
  content: string;
}

const MAX_AI_MESSAGES = 10;
const AI_SESSION_KEY = "terminal-ai-count";

const staticCommands: Record<string, () => string> = {
  help: () =>
    `Available commands:
  help        - Show this help message
  about       - Learn about Andres
  skills      - View technical skills
  projects    - List projects
  experience  - View work experience
  contact     - Get contact info
  languages   - See language skills
  clear       - Clear terminal

Or just type a question to chat with AI!`,

  about: () =>
    `${profile.name} — ${profile.title}
Location: ${profile.location}
GitHub: github.com/${profile.github}

Full Stack Developer with 6+ years of experience building web applications.
From WordPress sites serving 10,000+ users to MERN stack applications.
Algonquin College Honours Graduate (3.66 GPA).
Currently volunteering with Landseed.ca, building a platform for the Canadian market.
Trilingual: English, French, Spanish.`,

  skills: () => {
    return skills
      .map((cat) => `[${cat.title}]\n  ${cat.skills.map((s) => s.name).join(", ")}`)
      .join("\n\n");
  },

  projects: () => {
    return projects
      .filter((p) => p.featured)
      .map(
        (p) =>
          `• ${p.title || p.repo || p.slug} — ${p.description?.slice(0, 80) || "GitHub auto-fetch"}...`
      )
      .join("\n");
  },

  experience: () => {
    return experiences
      .slice(0, 4)
      .map((e) => `${e.period} | ${e.role} @ ${e.company}\n  ${e.description}`)
      .join("\n\n");
  },

  contact: () =>
    `Email: ${profile.email}
GitHub: github.com/${profile.github}
LinkedIn: linkedin.com/in/${profile.linkedin}
Resume: ${profile.resumeUrl}`,

  languages: () =>
    `English  — Fluent
French   — Intermediate
Spanish  — Native`,
};

export function TerminalSection() {
  const t = useTranslations("terminal");
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: t("welcome") },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (!hasInteracted) return;
    const el = terminalRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [hasInteracted]);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  function getAiCount(): number {
    if (typeof window === "undefined") return 0;
    return parseInt(sessionStorage.getItem(AI_SESSION_KEY) || "0", 10);
  }

  function incrementAiCount() {
    const count = getAiCount() + 1;
    sessionStorage.setItem(AI_SESSION_KEY, count.toString());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    setInput("");
    setHasInteracted(true);
    setLines((prev) => [...prev, { type: "input", content: `> ${cmd}` }]);

    const lowerCmd = cmd.toLowerCase();

    // Check for clear command
    if (lowerCmd === "clear") {
      setLines([{ type: "output", content: t("welcome") }]);
      return;
    }

    // Check for static commands
    if (staticCommands[lowerCmd]) {
      setLines((prev) => [
        ...prev,
        { type: "output", content: staticCommands[lowerCmd]() },
      ]);
      return;
    }

    // AI mode
    if (getAiCount() >= MAX_AI_MESSAGES) {
      setLines((prev) => [
        ...prev,
        { type: "error", content: t("rate_limit") },
      ]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cmd }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const isError = !data.response || data.response.startsWith("AI is currently");
      if (!isError) incrementAiCount();
      setLines((prev) => [
        ...prev,
        { type: isError ? "error" : "ai", content: data.response },
      ]);
    } catch {
      setLines((prev) => [
        ...prev,
        {
          type: "error",
          content: "AI unavailable. Try static commands: help, about, skills, projects",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SectionWrapper id="terminal">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </div>

        <div className="mx-auto max-w-3xl rounded-xl border border-border bg-[#0d0d14] shadow-2xl overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <Circle className="h-3 w-3 fill-accent-coral text-accent-coral" />
            <Circle className="h-3 w-3 fill-accent-gold text-accent-gold" />
            <Circle className="h-3 w-3 fill-accent-teal text-accent-teal" />
            <span className="ml-2 text-xs text-white/40 font-mono flex items-center gap-1.5">
              <Terminal className="h-3 w-3" /> andres@portfolio ~ %
            </span>
          </div>

          {/* Terminal content */}
          <div
            ref={terminalRef}
            className="p-4 h-[400px] overflow-y-auto terminal-scrollbar font-mono text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div key={i} className="mb-2">
                {line.type === "input" && (
                  <span className="text-accent-teal">{line.content}</span>
                )}
                {line.type === "output" && (
                  <pre className="text-white/80 whitespace-pre-wrap">
                    {line.content}
                  </pre>
                )}
                {line.type === "ai" && (
                  <div className="text-accent/90 whitespace-pre-wrap">
                    <span className="text-accent-gold text-xs mr-2">[AI]</span>
                    {line.content}
                  </div>
                )}
                {line.type === "error" && (
                  <span className="text-accent-coral">{line.content}</span>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="text-accent animate-pulse">{t("ai_thinking")}</div>
            )}

            <div />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-white/5 px-4 py-3 flex items-center gap-2"
          >
            <span className="text-accent-teal font-mono text-sm">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              disabled={isLoading}
              className="flex-1 bg-transparent font-mono text-sm text-white/90 placeholder-white/30 outline-none"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
