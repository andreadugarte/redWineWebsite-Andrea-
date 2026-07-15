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

/** Detect the locale from a pathname (`/es` or `/es/...` → es). */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

/** The same page in the other language (for the language toggle). */
export function otherLocalePath(pathname: string): string {
  if (localeFromPath(pathname) === "es") {
    const rest = pathname.slice(3); // drop "/es"
    return rest === "" ? "/" : rest;
  }
  return pathname === "/" ? "/es" : `/es${pathname}`;
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
  "story.fairtradeCaption": {
    en: "Fairtrade certified — the first certified peasant association in the region.",
    es: "Certificación Fairtrade — la primera asociación campesina certificada de la región.",
  },
  "story.stat.founded": { en: "Founded", es: "Fundada" },
  "story.stat.families": { en: "Founding families", es: "Familias fundadoras" },
  "story.stat.valley": { en: "Valley · Colchagua", es: "Valle · Colchagua" },

  // Featured wines
  "wines.eyebrow": { en: "The Campesino Line", es: "La Línea Campesino" },
  "wines.featuredTitle": {
    en: "One shared label, born of the cooperative's founding families.",
    es: "Una etiqueta compartida, nacida de las familias fundadoras de la cooperativa.",
  },
  "wines.viewAll": { en: "View all wines", es: "Ver todos los vinos" },

  // Producers strip / grid
  "producers.eyebrow": { en: "The People", es: "La Gente" },
  "producers.stripTitle": {
    en: "Founded by nineteen families — one shared devotion to the land.",
    es: "Fundada por diecinueve familias — una misma devoción por la tierra.",
  },
  "producers.meet": { en: "Meet the producers", es: "Conoce a los productores" },
  "producers.grower": { en: "Grape-growing member", es: "Socio productor de uva" },
  "producers.growerNote": {
    en: "This founding member grows grapes for the cooperative's winemaking families rather than bottling wine under an own label.",
    es: "Este socio fundador cultiva uva para las familias vinificadoras de la cooperativa, y no embotella vino con etiqueta propia.",
  },
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
  "filter.brand": { en: "Brand", es: "Marca" },
  "filter.occasion": { en: "Occasion", es: "Ocasión" },
  "filter.clear": { en: "Clear filters", es: "Limpiar filtros" },
  "filter.all": { en: "All", es: "Todos" },
  "filter.red": { en: "Red", es: "Tinto" },
  "filter.white": { en: "White", es: "Blanco" },
  "filter.rose": { en: "Rosé", es: "Rosado" },
  "common.view": { en: "View", es: "Ver" },
  "wines.soldOut": { en: "Sold out", es: "Sin stock" },
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
  "footer.join": { en: "Join", es: "Únete" },
  "footer.emailPlaceholder": { en: "Your email", es: "Tu correo" },
  "footer.tagline": {
    en: "Fair-trade wines from the small producers of Colchagua Valley, Chile.",
    es: "Vinos de comercio justo de los pequeños productores del Valle de Colchagua, Chile.",
  },
  // Footer link labels
  "link.wines": { en: "Wines", es: "Vinos" },
  "link.packs": { en: "Wine Packs", es: "Packs de Vino" },
  "link.producers": { en: "Producers", es: "Productores" },
  "link.story": { en: "Our Story", es: "Nuestra Historia" },
  "link.sustainability": { en: "Sustainability", es: "Sostenibilidad" },
  "link.trade": { en: "Trade / B2B", es: "Ventas Mayoristas" },
  "link.socialResponsibility": { en: "Social Responsibility", es: "Responsabilidad Social" },
  "link.tastings": { en: "Wine Tastings & Tours", es: "Catas y Tours" },
  "link.eventCenter": { en: "Event Center", es: "Centro de Eventos" },
  "link.reservationPolicy": { en: "Reservation Policy", es: "Política de Reservas" },
  "link.contact": { en: "Contact", es: "Contacto" },

  // Wine detail
  "wine.allWines": { en: "All wines", es: "Todos los vinos" },
  "wine.indicativePrice": { en: "Indicative pricing · 750ml", es: "Precio indicativo · 750ml" },
  "wine.note": { en: "Note", es: "Nota" },
  "wine.grownBy": { en: "Grown by", es: "Cultivado por" },
  "wine.continueTasting": { en: "Continue tasting", es: "Continúa probando" },
  "wine.moreFromCellar": { en: "More from the cellar", es: "Más de la bodega" },

  // Nav additions (commercial-path-first)
  "nav.packs": { en: "Wine Packs", es: "Packs de Vino" },
  "nav.findWine": { en: "Find Your Wine", es: "Encuentra tu Vino" },
  "nav.trade": { en: "Trade / B2B", es: "Ventas Mayoristas" },

  // Packs / bundles
  "packs.eyebrow": { en: "Curated Packs", es: "Packs Seleccionados" },
  "packs.title": { en: "Wine packs, chosen for you", es: "Packs de vino, elegidos para ti" },
  "packs.intro": {
    en: "Nine producer families make choosing hard. These packs make it easy — by occasion, by budget, or to discover the whole cooperative in one case.",
    es: "Con nueve familias productoras, elegir cuesta. Estos packs lo hacen fácil — por ocasión, por presupuesto, o para descubrir toda la cooperativa en una sola caja.",
  },
  "packs.bottles": { en: "bottles", es: "botellas" },
  "packs.includes": { en: "What's inside", es: "Qué incluye" },
  "packs.addAll": { en: "Add the pack to cart", es: "Agregar el pack al carrito" },
  "packs.viewPack": { en: "View pack", es: "Ver el pack" },
  "packs.valueAdd.producerCard": {
    en: "Includes a meet-the-producers card",
    es: "Incluye una tarjeta para conocer a los productores",
  },
  "packs.valueAdd.giftPackaging": { en: "Gift presentation included", es: "Incluye presentación de regalo" },
  "packs.valueAdd.freeShippingIncluded": {
    en: "Free shipping to Santiago included",
    es: "Incluye envío gratis a Santiago",
  },
  "packs.feriaRotates": {
    en: "This selection rotates with every feria.",
    es: "Esta selección rota con cada feria.",
  },
  "packs.featuredTitle": { en: "Featured wine packs", es: "Packs destacados" },
  "packs.viewAll": { en: "View all packs", es: "Ver todos los packs" },

  // Quiz
  "quiz.eyebrow": { en: "Guided choice", es: "Elección guiada" },
  "quiz.title": { en: "Find your wine", es: "Encuentra tu vino" },
  "quiz.intro": {
    en: "Four quick questions — no wine vocabulary needed.",
    es: "Cuatro preguntas rápidas — sin vocabulario de vino.",
  },
  "quiz.q1": { en: "What's the occasion?", es: "¿Cuál es la ocasión?" },
  "quiz.q1.solo": { en: "Just for me", es: "Para tomar solo/a" },
  "quiz.q1.meal": { en: "With a meal", es: "Para una comida" },
  "quiz.q1.asado": { en: "For an asado", es: "Para un asado" },
  "quiz.q1.gift": { en: "As a gift", es: "Para regalar" },
  "quiz.q2": { en: "Red, white or rosé?", es: "¿Tinto, blanco o rosado?" },
  "quiz.q2.red": { en: "Red", es: "Tinto" },
  "quiz.q2.white": { en: "White", es: "Blanco" },
  "quiz.q2.rose": { en: "Rosé", es: "Rosado" },
  "quiz.q2.any": { en: "No preference", es: "No tengo preferencia" },
  "quiz.q3": { en: "How intense?", es: "¿Qué tan intenso?" },
  "quiz.q3.light": { en: "Light and fresh", es: "Ligero y fresco" },
  "quiz.q3.medium": { en: "Somewhere in the middle", es: "Medio" },
  "quiz.q3.bold": { en: "Bold and full-bodied", es: "Intenso y con cuerpo" },
  "quiz.q4": { en: "What's your budget per bottle?", es: "¿Cuál es tu presupuesto por botella?" },
  "quiz.q4.low": { en: "Up to CLP 8,000", es: "Hasta CLP 8,000" },
  "quiz.q4.mid": { en: "CLP 8,000–14,000", es: "CLP 8,000–14,000" },
  "quiz.q4.high": { en: "Over CLP 14,000", es: "Más de CLP 14,000" },
  "quiz.back": { en: "Back", es: "Volver" },
  "quiz.results.title": { en: "Your matches", es: "Tus vinos" },
  "quiz.results.close": {
    en: "These are the closest matches to what you're looking for.",
    es: "Estos son los que más se acercan a lo que buscas.",
  },
  "quiz.results.bundle": { en: "Or take the easy route", es: "O toma el camino fácil" },
  "quiz.results.restart": { en: "Start over", es: "Empezar de nuevo" },
  "quiz.results.giftLead": {
    en: "For a gift, we'd point you straight to our gift pack:",
    es: "Para un regalo, te recomendamos directamente nuestro pack de regalo:",
  },

  // Cart extras
  "cart.freeShipRemaining": {
    en: "bottles to go for free shipping to Santiago",
    es: "botellas para el envío gratis a Santiago",
  },
  "cart.freeShipEarned": {
    en: "Free shipping to Santiago unlocked",
    es: "¡Envío gratis a Santiago!",
  },
  "cart.gift": { en: "This is a gift", es: "Es un regalo" },
  "cart.addToCart": { en: "Add to Cart", es: "Añadir al carrito" },
  "packs.save": { en: "Save", es: "Ahorra" },
  "packs.vsSeparately": { en: "vs. buying separately", es: "vs. comprar por separado" },
  "cart.giftNote": {
    en: "We'll include gift presentation and the producers' story.",
    es: "Incluiremos presentación de regalo y la historia de los productores.",
  },

  // Wine detail upsell
  "wine.idealFor": { en: "Ideal for", es: "Ideal para" },
  "wine.inBundles": { en: "This wine is in", es: "Este vino está en" },
  "wine.related": { en: "You might also like", es: "También te puede interesar" },
  "occasion.beginner": { en: "Wines for beginners", es: "Vinos para empezar" },
  "occasion.asado": { en: "Wines for an asado", es: "Vinos para un asado" },
  "occasion.light": { en: "Light and fresh", es: "Ligeros y frescos" },
  "occasion.medium": { en: "Medium-bodied", es: "De cuerpo medio" },
  "occasion.rich": { en: "Rich and intense", es: "Intensos y con cuerpo" },
  "wine.notifyMe": { en: "Notify me when available", es: "Avísame cuando esté disponible" },

  // Trade / B2B
  "trade.eyebrow": { en: "Trade & Wholesale", es: "Ventas Mayoristas" },
  "trade.title": { en: "Bring fair-trade Colchagua to your list", es: "Lleva el Colchagua de comercio justo a tu carta" },
  "trade.intro": {
    en: "Restaurants, shops and distributors: work directly with a Fairtrade-certified cooperative of small family producers.",
    es: "Restaurantes, tiendas y distribuidores: trabaja directamente con una cooperativa certificada Fairtrade de pequeños productores familiares.",
  },
  "trade.cta": { en: "Request wholesale pricing", es: "Solicitar precios mayoristas" },
  "trade.businessType": { en: "Type of business", es: "Tipo de negocio" },
  "trade.location": { en: "City / location", es: "Ciudad / ubicación" },
  "trade.volume": { en: "Expected monthly volume", es: "Volumen mensual estimado" },
  "trade.interest": { en: "Wines of interest", es: "Vinos de interés" },

  // Feria / visita landings
  "feria.eyebrow": { en: "From the feria", es: "Desde la feria" },
  "feria.title": { en: "Take the feria home", es: "Llévate la feria a casa" },
  "feria.intro": {
    en: "Tasted something you liked at our stand? These are the wines we're pouring — order the same bottles online.",
    es: "¿Probaste algo que te gustó en nuestro stand? Estos son los vinos que estamos sirviendo — pide las mismas botellas online.",
  },
  "feria.which": { en: "Which feria did you visit?", es: "¿Qué feria visitaste?" },
  "visita.eyebrow": { en: "After your visit", es: "Después de tu visita" },
  "visita.title": { en: "Wines from your visit", es: "Los vinos de tu visita" },
  "visita.intro": {
    en: "Pick the wines you tasted on your tour and add them to your cart in one go.",
    es: "Marca los vinos que probaste en tu tour y agrégalos al carrito de una sola vez.",
  },
  "visita.addSelected": { en: "Add selected to cart", es: "Agregar seleccionados al carrito" },

  // Inquiry / reservation form
  "form.name": { en: "Name", es: "Nombre" },
  "form.email": { en: "Email", es: "Correo electrónico" },
  "form.phone": { en: "Phone", es: "Teléfono" },
  "form.date": { en: "Preferred date", es: "Fecha preferida" },
  "form.group": { en: "Group size", es: "Número de personas" },
  "form.message": { en: "Message", es: "Mensaje" },
  "form.sending": { en: "Sending…", es: "Enviando…" },
  "form.thankYou": { en: "Thank you.", es: "Gracias." },
  "form.thankYouBody": {
    en: "We've received your request and will reply within one business day.",
    es: "Hemos recibido tu solicitud y te responderemos dentro de un día hábil.",
  },
  "form.error": {
    en: "Something went wrong. Please email us directly.",
    es: "Algo salió mal. Por favor, escríbenos directamente por correo.",
  },
  "form.cta.reservation": { en: "Request a Tasting", es: "Solicitar reserva" },
  "form.cta.event": { en: "Request Your Event", es: "Solicitar evento" },
  "form.cta.contact": { en: "Send Message", es: "Enviar mensaje" },

  // Producer detail
  "producer.allProducers": { en: "All producers", es: "Todos los productores" },
  "producer.relatedWines": { en: "Wines from these grapes", es: "Vinos de estas uvas" },
  "producer.nextProducer": { en: "Next producer", es: "Siguiente productor" },
  "producer.inactiveNotice": {
    en: "This producer is no longer an active part of Red del Vino.",
    es: "Este productor ya no forma parte activa de Red del Vino.",
  },
};

/** Map a footer/link href to its translation key. */
export const HREF_LABEL_KEY: Record<string, string> = {
  "/wines": "link.wines",
  "/packs": "link.packs",
  "/producers": "link.producers",
  "/story": "link.story",
  "/sustainability": "link.sustainability",
  "/social-responsibility": "link.socialResponsibility",
  "/trade": "link.trade",
  "/tourism": "link.tastings",
  "/event-center": "link.eventCenter",
  "/reservation-policy": "link.reservationPolicy",
  "/contact": "link.contact",
};

export function t(key: string, locale: Locale): string {
  const entry = UI[key];
  if (!entry) return key;
  return entry[locale] ?? entry.en;
}
