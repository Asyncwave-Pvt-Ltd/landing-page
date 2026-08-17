import { headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, LOCALE_HEADER } from "./routing";

export default getRequestConfig(async () => {
  // Set by middleware.ts from the ?lang= search param — a layout can't read
  // search params itself, so the resolved locale rides in on a request header.
  const requested = headers().get(LOCALE_HEADER);
  const locale = isLocale(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
