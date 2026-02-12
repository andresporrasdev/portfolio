"use client";

import { useTranslations } from "next-intl";
import { profile } from "@/data/profile";

export function StatusBadge() {
  const t = useTranslations("hero");

  if (!profile.availableForHire) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-accent-teal/30 bg-accent-teal/10 px-4 py-2 text-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-teal" />
      </span>
      <span className="text-accent-teal font-medium">{t("status")}</span>
    </div>
  );
}
