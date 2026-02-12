"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { profile } from "@/data/profile";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-sm text-muted">
          <span>
            &copy; {new Date().getFullYear()} {t("copyright")}
          </span>
        </div>

        <p className="text-xs text-muted">{t("built_with")}</p>

        <div className="flex items-center gap-4">
          <a
            href={`https://github.com/${profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={`https://linkedin.com/in/${profile.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-muted hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
