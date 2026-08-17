import { defaultLocale, localeHreflang, locales, LOCALE_PARAM } from "./routing";

export const SITE_URL = "https://asyncwave.in";

/** Absolute URL for a path in a locale. Default locale stays param-free. */
export function localeUrl(path: string, locale: string) {
  const suffix = locale === defaultLocale ? "" : `?${LOCALE_PARAM}=${locale}`;
  return `${SITE_URL}${path}${suffix}`;
}

/** canonical + hreflang alternates for a path, for every configured locale. */
export function alternates(path: string, locale: string) {
  return {
    canonical: localeUrl(path, locale),
    languages: {
      ...Object.fromEntries(
        locales.map((l) => [localeHreflang[l], localeUrl(path, l)]),
      ),
      "x-default": localeUrl(path, defaultLocale),
    },
  };
}
