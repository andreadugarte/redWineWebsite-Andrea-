import { NextResponse, type NextRequest } from "next/server";
import { legacyRedirect } from "@/lib/legacyRedirect";

/**
 * Spanish-first: the unprefixed URLs are the English pages, but a Chilean
 * buyer landing on `/` or `/wines` should get Spanish. Visitors with no saved
 * language preference are redirected to the `/es` version; picking a language
 * in the switcher stores `rdv-locale` so that choice is respected afterwards.
 */
const LOCALE_PREFIX = /^\/(es|pt|zh)(\/|$)/;
const PASS_THROUGH = /^\/(api|_next|checkout\/return)(\/|$)|\.[a-zA-Z0-9]+$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PASS_THROUGH.test(pathname)) return NextResponse.next();

  // Old WordPress URLs (still in Google) → their page here, permanently.
  const legacy = legacyRedirect(pathname);
  if (legacy !== null) {
    const url = req.nextUrl.clone();
    url.pathname = legacy;
    return NextResponse.redirect(url, 301);
  }

  if (LOCALE_PREFIX.test(pathname)) return NextResponse.next();
  if (req.cookies.get("rdv-locale")) return NextResponse.next();
  // Let crawlers and link-preview fetchers see each URL as published.
  if (/bot|crawl|spider|slurp|facebookexternalhit|whatsapp|preview/i.test(req.headers.get("user-agent") ?? "")) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
