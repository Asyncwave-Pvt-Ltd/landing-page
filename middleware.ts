import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, LOCALE_HEADER, LOCALE_PARAM } from "./i18n/routing";

// The locale lives in ?lang=. Layouts and generateMetadata can't read search
// params, so resolve it once here and pass it down as a request header.
export function middleware(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get(LOCALE_PARAM);
  const locale = isLocale(requested) ? requested : defaultLocale;

  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  // everything except api routes, next internals and files with an extension
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
