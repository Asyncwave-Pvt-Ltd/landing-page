// Adding a language = add it here + drop a messages/<locale>.json next to en.json.
export const locales = ["en", "hi"] as const;
export const defaultLocale = "en";

/** Search param carrying the locale, e.g. /about-us?lang=hi */
export const LOCALE_PARAM = "lang";

/** Internal header middleware.ts uses to hand the resolved locale to the server. */
export const LOCALE_HEADER = "x-locale";

export type Locale = (typeof locales)[number];

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

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Stamp `?lang=` onto an internal href so the locale survives navigation.
 * Default locale keeps clean URLs; external/hash-only hrefs are left alone.
 */
export function withLocale(href: string, locale: string) {
  if (locale === defaultLocale || !href.startsWith("/")) return href;

  const [beforeHash, hash] = href.split("#");
  const [pathname, search] = beforeHash.split("?");
  const params = new URLSearchParams(search);
  params.set(LOCALE_PARAM, locale);

  return `${pathname}?${params}${hash ? `#${hash}` : ""}`;
}
