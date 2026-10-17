import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { isLocale, localizedPath } from "@/lib/i18n";

/**
 * Flow sends the payer back with a POST (token in the form body), but a page
 * route can't receive a POST — so this endpoint accepts either verb and
 * 303-redirects the browser to the localized result page with ?token=.
 */
async function handle(req: Request, token: string | undefined) {
  const lang = new URL(req.url).searchParams.get("lang") ?? undefined;
  const locale = isLocale(lang) ? lang : "es";
  const dest = new URL(localizedPath("/checkout/return", locale), SITE.url);
  if (token) dest.searchParams.set("token", token);
  dest.searchParams.set("lang", locale);
  return NextResponse.redirect(dest, 303);
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  return handle(req, form?.get("token")?.toString());
}

export async function GET(req: Request) {
  return handle(req, new URL(req.url).searchParams.get("token") ?? undefined);
}
