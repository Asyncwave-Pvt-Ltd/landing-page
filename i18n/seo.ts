import { localeHreflang, routing, type Locale } from "./routing";

export const SITE_URL = "https://asyncwave.in";

export function localeUrl(path: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

/** canonical + hreflang alternates for a path, for every configured locale. */
export function alternates(path: string, locale: string) {
  return {
    canonical: localeUrl(path, locale),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((l) => [localeHreflang[l], localeUrl(path, l)]),
      ),
      "x-default": localeUrl(path, routing.defaultLocale),
    },
  };
}
