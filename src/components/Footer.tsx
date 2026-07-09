import Link from "next/link";
import { SITE, FOOTER_LINKS } from "@/lib/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="relative bg-oxblood-deep text-bone">
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="font-serif text-3xl">Red del Vino</p>
          <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-bone/70">{SITE.tagline}</p>
          <p className="mt-6 font-sans text-sm text-bone/70">
            {SITE.address.street}
            <br />
            {SITE.address.city}, {SITE.address.region}, {SITE.address.country}
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <p className="eyebrow text-gold-soft">{title}</p>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline font-sans text-sm text-bone/80 hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="eyebrow text-gold-soft">Wine Club</p>
          <p className="mt-5 font-sans text-sm text-bone/80">
            Join our list for harvest news, allocations, and tastings in Colchagua.
          </p>
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
            <Link href="/privacy-policy" className="text-bone/60 hover:text-bone">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
