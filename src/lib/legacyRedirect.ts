import producersJson from "@content/site/producers.json";
import winesJson from "@content/site/wines.json";
import bundlesJson from "@content/site/bundles.json";

/**
 * Google still sends visitors to URLs from the old WordPress site
 * (/chile-fair-trade-wine/…, /es/vino-artesanal/…, /cn/contact-us, /es/nosotros…),
 * which 404 on this site. `legacyRedirect` maps such a path to its page here,
 * keeping the visitor's language, or returns null for paths this site serves.
 */

const has = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k);

const slugsOf = (json: unknown) => {
  const list = (Array.isArray(json) ? json : Object.values(json as object)[0]) as { slug: string }[];
  return new Set(list.map((x) => x.slug));
};
const WINES = slugsOf(winesJson);
const PRODUCERS = slugsOf(producersJson);
const BUNDLES = slugsOf(bundlesJson);

// Top-level sections that exist on this site (under every locale prefix).
const SECTIONS = new Set([
  "", "cart", "checkout", "contact", "event-center", "feria", "find-your-wine", "packs",
  "privacy-policy", "producers", "reservation-policy", "returns", "shipping",
  "social-responsibility", "story", "sustainability", "tourism", "trade", "visita", "wines",
]);

// Old language prefixes → this site's prefix ("" = English). French never existed here.
const LANG: Record<string, string> = { es: "/es", en: "", cn: "/zh", zh: "/zh", pt: "/pt", fr: "/es" };

// Old single pages → section here.
const PAGES: Record<string, string> = {
  "about-us": "story", "nosotros": "story", "quienes-somos": "story", "our-team": "story",
  "board-of-directors": "story", "fair-trade-certified-grapes-chile": "story",
  "grapes-fair-trade-certified-colchagua-chile": "story", "fairtrade": "story",
  "fair-trade-wine-grape-producers": "producers", "socios-red-del-vino": "producers",
  "productores": "producers",
  "fair-trade-wines-chile": "wines", "tienda-de-vinos-artesanales": "wines", "tienda": "wines",
  "shop": "wines", "vinos": "wines",
  "carrito": "cart", "contact-us": "contact", "contacto": "contact",
  "tourism-colchagua-chile": "tourism", "turismo-rural-colchagua-chile": "tourism", "turismo": "tourism",
  "comite-de-equidad-de-genero": "social-responsibility",
  "vinos-parcela-33-colchagua-chile": "producers/gilberto-lopez-arias",
  "home": "", "inicio": "",
};

// Old winery pages (/es/vina-artesanal/<winery>) → that winery's producer.
const WINERIES: Record<string, string> = {
  "vina-don-clemente": "producers/osvaldo-diaz-poblete",
  "vina-la-manda-de-don-clemente": "producers/osvaldo-diaz-poblete",
  "vina-cea": "producers/jaime-cea-morales",
  "vina-parcela-33": "producers/gilberto-lopez-arias",
  "vina-un-buen-caballero": "producers/abelardo-becerra-meneses",
  "vina-don-lalo": "producers/abelardo-becerra-meneses",
  "vina-don-dago": "producers/dagoberto-munoz-diaz",
};

const WINE_DIRS = new Set(["chile-fair-trade-wine", "vino-artesanal", "vinos-artesanales", "producto", "product", "tienda", "wine"]);
const PRODUCER_DIRS = new Set(["producers", "wine-producer", "socio", "member", "productor", "productores"]);

function isServed(parts: string[]) {
  const [section, slug, ...more] = parts;
  if (!SECTIONS.has(section ?? "")) return false;
  if (slug === undefined) return true;
  if (more.length) return false;
  if (section === "wines") return WINES.has(slug);
  if (section === "producers") return PRODUCERS.has(slug);
  if (section === "packs") return BUNDLES.has(slug);
  return section === "checkout" && slug === "return";
}

function producerFor(slug: string) {
  if (PRODUCERS.has(slug)) return `producers/${slug}`;
  // Old Spanish pages used shortened names ("gerardo-orellana" → "gerardo-orellana-diaz").
  const match = Array.from(PRODUCERS).find((p) => p.startsWith(`${slug}-`));
  return match ? `producers/${match}` : "producers";
}

function target(parts: string[]): string | null {
  const [dir, slug] = parts;
  if (dir === undefined) return "";
  if (has(PAGES, dir)) return PAGES[dir];
  if (dir === "category") return "wines";
  if (WINE_DIRS.has(dir)) return slug && WINES.has(slug) ? `wines/${slug}` : "wines";
  if (PRODUCER_DIRS.has(dir)) return slug ? producerFor(slug) : "producers";
  if (dir === "vina-artesanal") return slug && has(WINERIES, slug) ? WINERIES[slug] : "producers";
  if (dir === "tourism") return "tourism";
  if (dir === "wines") return "wines";
  if (dir === "packs") return "packs";
  return null;
}

export function legacyRedirect(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  // Old language prefixes can stack (/es/en/… after our own /es redirect); the innermost one is the visitor's.
  let prefix: string | null = null;
  while (parts.length && has(LANG, parts[0])) prefix = LANG[parts.shift()!];
  if (isServed(parts)) {
    // A served page under an old prefix (/cn/wines, /es/en/story) still needs the right prefix.
    const wanted = `${prefix ?? ""}/${parts.join("/")}`.replace(/\/$/, "") || "/";
    return prefix === null || wanted === pathname.replace(/\/$/, "") ? null : wanted;
  }
  const to = target(parts);
  if (to === null) return null;
  return `${prefix ?? ""}${to ? `/${to}` : ""}` || "/";
}
