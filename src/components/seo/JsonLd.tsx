import { profile } from "@/data/profile";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: "https://andresporras.dev",
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ottawa",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
    sameAs: [
      `https://github.com/${profile.github}`,
      `https://linkedin.com/in/${profile.linkedin}`,
    ],
    knowsLanguage: ["en", "fr", "es"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
