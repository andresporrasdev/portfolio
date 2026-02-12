"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const languageLabels: Record<string, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    // Remove current locale prefix from pathname
    const segments = pathname.split("/");
    if (routing.locales.includes(segments[1] as "en" | "fr" | "es")) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            locale === loc
              ? "bg-accent text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          {languageLabels[loc]}
        </button>
      ))}
    </div>
  );
}
