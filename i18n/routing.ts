import { defineRouting } from "next-intl/routing";

// Adding a language = add it here + drop a messages/<locale>.json next to en.json.
export const routing = defineRouting({
  locales: ["en", "hi"],
  defaultLocale: "en",
  // default locale stays unprefixed so the already-indexed URLs don't move
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Shown in the navbar switcher.
export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

// hreflang values for <link rel="alternate"> / sitemap.
export const localeHreflang: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
};
