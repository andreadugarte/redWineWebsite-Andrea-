/**
 * Internationalisation for Red del Vino.
 *
 * Locale is path-based (`/` = English, `/es` = Spanish) for SEO/GEO: each
 * language gets its own indexable URL with correct <html lang> and hreflang.
 *
 * UI (chrome) strings live here in `t`; long-form content (producer bios,
 * wine notes, editorial pages) is translated in the content layer.
 */

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(v: string | undefined): v is Locale {
  return v === "en" || v === "es";
}

/** Prefix a path with the locale segment (English stays at root). */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/es${clean === "/" ? "" : clean}`;
}

type Dict = Record<string, { en: string; es: string }>;

/** UI string table. Spanish is written natively, not translated word-for-word. */
export const UI: Dict = {
  // Header / nav
  "nav.wines": { en: "Wines", es: "Vinos" },
  "nav.producers": { en: "Producers", es: "Productores" },
  "nav.story": { en: "Our Story", es: "Nuestra Historia" },
  "nav.sustainability": { en: "Sustainability", es: "Sostenibilidad" },
  "nav.tourism": { en: "Wine Tourism", es: "Enoturismo" },
  "nav.events": { en: "Events", es: "Eventos" },
  "nav.contact": { en: "Contact", es: "Contacto" },
  "header.openCart": { en: "Open cart", es: "Abrir carrito" },
  "header.menu": { en: "Menu", es: "Menú" },
  "header.closeMenu": { en: "Close menu", es: "Cerrar menú" },

  // Hero
  "hero.eyebrow": { en: "Colchagua Valley · Chile · Since 2004", es: "Valle de Colchagua · Chile · Desde 2004" },
  "hero.exploreWines": { en: "Explore the Wines", es: "Descubre los Vinos" },
  "hero.ourStory": { en: "Our Fair-Trade Story", es: "Nuestra Historia de Comercio Justo" },
  "hero.scroll": { en: "Scroll", es: "Desliza" },

  // Story intro
  "story.eyebrow": { en: "Welcome to Red del Vino", es: "Bienvenido a Red del Vino" },
  "story.title": {
    en: "Maintaining the traditions and identity of rural wine farmers.",
    es: "Preservando las tradiciones y la identidad de los viñateros campesinos.",
  },
  "story.readMore": { en: "Read our story", es: "Lee nuestra historia" },
  "story.stat.founded": { en: "Founded", es: "Fundada" },
  "story.stat.families": { en: "Producer families", es: "Familias productoras" },
  "story.stat.valley": { en: "Valley · Colchagua", es: "Valle · Colchagua" },

  // Featured wines
  "wines.eyebrow": { en: "The Campesino Line", es: "La Línea Campesino" },
  "wines.featuredTitle": {
    en: "Four wines, nineteen families, one valley.",
    es: "Cuatro vinos, diecinueve familias, un solo valle.",
  },
  "wines.viewAll": { en: "View all wines", es: "Ver todos los vinos" },

  // Producers strip / grid
  "producers.eyebrow": { en: "The People", es: "La Gente" },
  "producers.stripTitle": {
    en: "Nineteen families, one shared devotion to the land.",
    es: "Diecinueve familias, una misma devoción por la tierra.",
  },
  "producers.meet": { en: "Meet the producers", es: "Conoce a los productores" },
  "producers.allProducers": { en: "All producers", es: "Todos los productores" },
  "producers.detailEyebrow": { en: "Producer · Colchagua Valley", es: "Productor · Valle de Colchagua" },
  "producers.theirWines": { en: "Wines from these grapes", es: "Vinos de estas uvas" },
  "producers.next": { en: "Next producer", es: "Siguiente productor" },
  "producers.inactiveNotice": {
    en: "This producer is no longer an active part of Red del Vino.",
    es: "Este productor ya no forma parte activa de Red del Vino.",
  },

  // Filters (shared)
  "filter.varietal": { en: "Varietal", es: "Cepa" },
  "filter.style": { en: "Style", es: "Estilo" },
  "filter.all": { en: "All", es: "Todos" },
  "common.view": { en: "View", es: "Ver" },
  "wines.noMatch": { en: "No wines match that selection.", es: "No hay vinos que coincidan con esa selección." },

  // Footer
  "footer.wineClub": { en: "Wine Club", es: "Club del Vino" },
  "footer.wineClubBody": {
    en: "Join our list for harvest news, allocations, and tastings in Colchagua.",
    es: "Únete a nuestra lista para novedades de la vendimia, asignaciones y catas en Colchagua.",
  },
  "footer.explore": { en: "Explore", es: "Explorar" },
  "footer.visit": { en: "Visit", es: "Visítanos" },
  "footer.privacy": { en: "Privacy", es: "Privacidad" },
};

export function t(key: string, locale: Locale): string {
  const entry = UI[key];
  if (!entry) return key;
  return entry[locale] ?? entry.en;
}
