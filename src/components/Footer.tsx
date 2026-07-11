"use client";

import Link from "next/link";
import { SITE, FOOTER_LINKS } from "@/lib/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath, HREF_LABEL_KEY } from "@/lib/i18n";

const SECTION_KEY: Record<string, string> = { Explore: "footer.explore", Visit: "footer.visit" };

export function Footer() {
  const locale = useLocale();
  const tr = useT();

  return (
    <footer className="relative bg-oxblood-deep text-bone">
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="font-serif text-3xl">Red del Vino</p>
          <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-bone/70">{tr("footer.tagline")}</p>
          <p className="mt-6 font-sans text-sm text-bone/70">
            {SITE.address.street}
            <br />
            {SITE.address.city}, {SITE.address.region}, {SITE.address.country}
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <p className="eyebrow text-gold-soft">{tr(SECTION_KEY[title] ?? "")}</p>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={localizedPath(l.href, locale)} className="link-underline font-sans text-sm text-bone/80 hover:text-bone">
                    {HREF_LABEL_KEY[l.href] ? tr(HREF_LABEL_KEY[l.href]) : l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="eyebrow text-gold-soft">{tr("footer.wineClub")}</p>
          <p className="mt-5 font-sans text-sm text-bone/80">{tr("footer.wineClubBody")}</p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-bone/15">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="font-sans text-xs text-bone/50">
            © {new Date().getFullYear()} Red del Vino S.A. · Colchagua Valley, Chile
          </p>
          <div className="flex items-center gap-6 font-sans text-xs">
            <a href={SITE.facebook} className="text-bone/60 hover:text-bone">Facebook</a>
            <a href={SITE.instagram} className="text-bone/60 hover:text-bone">Instagram</a>
            <Link href={localizedPath("/privacy-policy", locale)} className="text-bone/60 hover:text-bone">{tr("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
