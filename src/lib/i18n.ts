/**
 * Internationalisation for Red del Vino.
 *
 * Locale is path-based (`/` = English, `/es` = Spanish, `/pt` = Portuguese,
 * `/zh` = Mandarin) for SEO/GEO: each language gets its own indexable URL
 * with correct <html lang> and hreflang.
 *
 * UI (chrome) strings live here in `t`; long-form content (producer bios,
 * wine notes, editorial pages) is translated in the content layer.
 */

export const LOCALES = ["en", "es", "pt", "zh"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABEL: Record<Locale, string> = { en: "EN", es: "ES", pt: "PT", zh: "中文" };

export function isLocale(v: string | undefined): v is Locale {
  return v === "en" || v === "es" || v === "pt" || v === "zh";
}

/** Prefix a path with the locale segment (English stays at root). */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

/** Detect the locale from a pathname (`/es`, `/pt`, `/zh`, or their sub-paths). */
export function localeFromPath(pathname: string): Locale {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return l;
  }
  return DEFAULT_LOCALE;
}

/** Strip any locale prefix, returning the language-neutral base path. */
export function basePathOf(pathname: string): string {
  const locale = localeFromPath(pathname);
  if (locale === DEFAULT_LOCALE) return pathname;
  const rest = pathname.slice(1 + locale.length); // drop "/es" etc.
  return rest === "" ? "/" : rest;
}

/** The same page in the other language (for a 2-way toggle). Kept for callers
 *  that only ever alternate between English and Spanish. */
export function otherLocalePath(pathname: string): string {
  if (localeFromPath(pathname) === "es") return basePathOf(pathname);
  return localizedPath(basePathOf(pathname), "es");
}

/** The same page's URL in every supported locale, for a language switcher. */
export function localizedPathsForAllLocales(pathname: string): Record<Locale, string> {
  const base = basePathOf(pathname);
  return Object.fromEntries(LOCALES.map((l) => [l, localizedPath(base, l)])) as Record<Locale, string>;
}

type Dict = Record<string, { en: string; es: string; pt: string; zh: string }>;

/** UI string table. Spanish, Portuguese and Mandarin are written natively, not translated word-for-word. */
export const UI: Dict = {
  // Header / nav
  "nav.wines": { en: "Wines", es: "Vinos", pt: "Vinhos", zh: "葡萄酒" },
  "nav.producers": { en: "Producers", es: "Productores", pt: "Produtores", zh: "生产者" },
  "nav.story": { en: "Our Story", es: "Nuestra Historia", pt: "Nossa História", zh: "我们的故事" },
  "nav.sustainability": { en: "Sustainability", es: "Sostenibilidad", pt: "Sustentabilidade", zh: "可持续发展" },
  "nav.tourism": { en: "Wine Tourism", es: "Enoturismo", pt: "Enoturismo", zh: "葡萄酒旅游" },
  "nav.events": { en: "Events", es: "Eventos", pt: "Eventos", zh: "活动" },
  "nav.contact": { en: "Contact", es: "Contacto", pt: "Contato", zh: "联系我们" },
  "header.openCart": { en: "Open cart", es: "Abrir carrito", pt: "Abrir carrinho", zh: "打开购物车" },
  "header.menu": { en: "Menu", es: "Menú", pt: "Menu", zh: "菜单" },
  "header.closeMenu": { en: "Close menu", es: "Cerrar menú", pt: "Fechar menu", zh: "关闭菜单" },

  // Hero
  "hero.eyebrow": {
    en: "Colchagua Valley · Chile · Since 2004",
    es: "Valle de Colchagua · Chile · Desde 2004",
    pt: "Vale de Colchagua · Chile · Desde 2004",
    zh: "科尔查瓜山谷 · 智利 · 始于2004年",
  },
  "hero.exploreWines": { en: "Explore the Wines", es: "Descubre los Vinos", pt: "Explore os Vinhos", zh: "探索美酒" },
  "hero.ourStory": {
    en: "Our Fair-Trade Story",
    es: "Nuestra Historia de Comercio Justo",
    pt: "Nossa História de Comércio Justo",
    zh: "我们的公平贸易故事",
  },
  "hero.scroll": { en: "Scroll", es: "Desliza", pt: "Deslize", zh: "向下滑动" },

  // Story intro
  "story.eyebrow": {
    en: "Welcome to Red del Vino",
    es: "Bienvenido a Red del Vino",
    pt: "Bem-vindo à Red del Vino",
    zh: "欢迎来到Red del Vino",
  },
  "story.title": {
    en: "Maintaining the traditions and identity of rural wine farmers.",
    es: "Preservando las tradiciones y la identidad de los viñateros campesinos.",
    pt: "Preservando as tradições e a identidade dos viticultores camponeses.",
    zh: "传承乡村葡萄种植者的传统与身份。",
  },
  "story.readMore": { en: "Read our story", es: "Lee nuestra historia", pt: "Leia nossa história", zh: "阅读我们的故事" },
  "story.fairtradeCaption": {
    en: "Fairtrade certified — the first certified peasant association in the region.",
    es: "Certificación Fairtrade — la primera asociación campesina certificada de la región.",
    pt: "Certificação Fairtrade — a primeira associação camponesa certificada da região.",
    zh: "获Fairtrade公平贸易认证——该地区首个获认证的农民合作社。",
  },
  "story.stat.founded": { en: "Founded", es: "Fundada", pt: "Fundada", zh: "成立于" },
  "story.stat.families": { en: "Founding families", es: "Familias fundadoras", pt: "Famílias fundadoras", zh: "创始家庭" },
  "story.stat.valley": { en: "Valley · Colchagua", es: "Valle · Colchagua", pt: "Vale · Colchagua", zh: "山谷 · 科尔查瓜" },

  // Featured wines
  "wines.eyebrow": { en: "The Campesino Line", es: "La Línea Campesino", pt: "A Linha Campesino", zh: "Campesino系列" },
  "wines.featuredTitle": {
    en: "One shared label, born of the cooperative's founding families.",
    es: "Una etiqueta compartida, nacida de las familias fundadoras de la cooperativa.",
    pt: "Um rótulo compartilhado, nascido das famílias fundadoras da cooperativa.",
    zh: "一个共享的品牌,诞生于合作社的创始家庭。",
  },
  "wines.viewAll": { en: "View all wines", es: "Ver todos los vinos", pt: "Ver todos os vinhos", zh: "查看所有葡萄酒" },

  // Producers strip / grid
  "producers.eyebrow": { en: "The People", es: "La Gente", pt: "As Pessoas", zh: "我们的团队" },
  "producers.stripTitle": {
    en: "Founded by nineteen families — one shared devotion to the land.",
    es: "Fundada por diecinueve familias — una misma devoción por la tierra.",
    pt: "Fundada por dezenove famílias — uma mesma devoção pela terra.",
    zh: "由十九个家庭创立——对这片土地共同的热爱。",
  },
  "producers.meet": { en: "Meet the producers", es: "Conoce a los productores", pt: "Conheça os produtores", zh: "认识我们的生产者" },
  "producers.grower": { en: "Grape-growing member", es: "Socio productor de uva", pt: "Sócio produtor de uva", zh: "葡萄种植合伙人" },
  "producers.growerNote": {
    en: "This founding member grows grapes for the cooperative's winemaking families rather than bottling wine under an own label.",
    es: "Este socio fundador cultiva uva para las familias vinificadoras de la cooperativa, y no embotella vino con etiqueta propia.",
    pt: "Este sócio fundador cultiva uvas para as famílias vinícolas da cooperativa, e não engarrafa vinho com rótulo próprio.",
    zh: "这位创始成员为合作社的酿酒家庭种植葡萄,本身并不以自有品牌装瓶葡萄酒。",
  },
  "producers.allProducers": { en: "All producers", es: "Todos los productores", pt: "Todos os produtores", zh: "所有生产者" },
  "producers.detailEyebrow": {
    en: "Producer · Colchagua Valley",
    es: "Productor · Valle de Colchagua",
    pt: "Produtor · Vale de Colchagua",
    zh: "生产者 · 科尔查瓜山谷",
  },
  "producers.theirWines": { en: "Wines from these grapes", es: "Vinos de estas uvas", pt: "Vinhos destas uvas", zh: "这些葡萄酿造的酒" },
  "producers.next": { en: "Next producer", es: "Siguiente productor", pt: "Próximo produtor", zh: "下一位生产者" },
  "producers.inactiveNotice": {
    en: "This producer is no longer an active part of Red del Vino.",
    es: "Este productor ya no forma parte activa de Red del Vino.",
    pt: "Este produtor não faz mais parte ativa da Red del Vino.",
    zh: "该生产者目前已不再是Red del Vino的活跃成员。",
  },

  // Filters (shared)
  "filter.varietal": { en: "Varietal", es: "Cepa", pt: "Casta", zh: "葡萄品种" },
  "filter.style": { en: "Style", es: "Estilo", pt: "Estilo", zh: "风格" },
  "filter.brand": { en: "Brand", es: "Marca", pt: "Marca", zh: "品牌" },
  "filter.occasion": { en: "Occasion", es: "Ocasión", pt: "Ocasião", zh: "场合" },
  "filter.clear": { en: "Clear filters", es: "Limpiar filtros", pt: "Limpar filtros", zh: "清除筛选" },
  "filter.all": { en: "All", es: "Todos", pt: "Todos", zh: "全部" },
  "filter.red": { en: "Red", es: "Tinto", pt: "Tinto", zh: "红葡萄酒" },
  "filter.white": { en: "White", es: "Blanco", pt: "Branco", zh: "白葡萄酒" },
  "filter.rose": { en: "Rosé", es: "Rosado", pt: "Rosé", zh: "桃红葡萄酒" },
  "common.view": { en: "View", es: "Ver", pt: "Ver", zh: "查看" },
  "wines.soldOut": { en: "Sold out", es: "Sin stock", pt: "Esgotado", zh: "已售罄" },
  "wines.noMatch": {
    en: "No wines match that selection.",
    es: "No hay vinos que coincidan con esa selección.",
    pt: "Nenhum vinho corresponde a essa seleção.",
    zh: "没有符合该筛选条件的葡萄酒。",
  },

  // Footer
  "footer.wineClub": { en: "Wine Club", es: "Club del Vino", pt: "Clube do Vinho", zh: "葡萄酒俱乐部" },
  "footer.wineClubBody": {
    en: "Join our list for harvest news, allocations, and tastings in Colchagua.",
    es: "Únete a nuestra lista para novedades de la vendimia, asignaciones y catas en Colchagua.",
    pt: "Junte-se à nossa lista para novidades da colheita, alocações e degustações em Colchagua.",
    zh: "加入我们的邮件列表,获取收获季资讯、限量分配和科尔查瓜品鉴活动信息。",
  },
  "footer.explore": { en: "Explore", es: "Explorar", pt: "Explorar", zh: "探索" },
  "footer.visit": { en: "Visit", es: "Visítanos", pt: "Visite-nos", zh: "参观我们" },
  "footer.privacy": { en: "Privacy", es: "Privacidad", pt: "Privacidade", zh: "隐私政策" },
  "footer.join": { en: "Join", es: "Únete", pt: "Inscrever-se", zh: "订阅" },
  "footer.emailPlaceholder": { en: "Your email", es: "Tu correo", pt: "Seu e-mail", zh: "您的邮箱" },
  "footer.tagline": {
    en: "Fair-trade wines from the small producers of Colchagua Valley, Chile.",
    es: "Vinos de comercio justo de los pequeños productores del Valle de Colchagua, Chile.",
    pt: "Vinhos de comércio justo dos pequenos produtores do Vale de Colchagua, Chile.",
    zh: "来自智利科尔查瓜山谷小生产者的公平贸易葡萄酒。",
  },
  // Footer link labels
  "link.wines": { en: "Wines", es: "Vinos", pt: "Vinhos", zh: "葡萄酒" },
  "link.packs": { en: "Wine Packs", es: "Packs de Vino", pt: "Kits de Vinho", zh: "葡萄酒套装" },
  "link.producers": { en: "Producers", es: "Productores", pt: "Produtores", zh: "生产者" },
  "link.story": { en: "Our Story", es: "Nuestra Historia", pt: "Nossa História", zh: "我们的故事" },
  "link.sustainability": { en: "Sustainability", es: "Sostenibilidad", pt: "Sustentabilidade", zh: "可持续发展" },
  "link.trade": { en: "Trade / B2B", es: "Ventas Mayoristas", pt: "Venda por Atacado", zh: "批发业务" },
  "link.socialResponsibility": {
    en: "Social Responsibility",
    es: "Responsabilidad Social",
    pt: "Responsabilidade Social",
    zh: "社会责任",
  },
  "link.tastings": { en: "Wine Tastings & Tours", es: "Catas y Tours", pt: "Degustações e Passeios", zh: "品鉴与游览" },
  "link.eventCenter": { en: "Event Center", es: "Centro de Eventos", pt: "Centro de Eventos", zh: "活动中心" },
  "link.reservationPolicy": {
    en: "Reservation Policy",
    es: "Política de Reservas",
    pt: "Política de Reservas",
    zh: "预订政策",
  },
  "link.contact": { en: "Contact", es: "Contacto", pt: "Contato", zh: "联系我们" },

  // Wine detail
  "wine.allWines": { en: "All wines", es: "Todos los vinos", pt: "Todos os vinhos", zh: "所有葡萄酒" },
  "wine.indicativePrice": {
    en: "Indicative pricing · 750ml",
    es: "Precio indicativo · 750ml",
    pt: "Preço indicativo · 750ml",
    zh: "参考价格 · 750毫升",
  },
  "wine.note": { en: "Note", es: "Nota", pt: "Nota", zh: "备注" },
  "wine.grownBy": { en: "Grown by", es: "Cultivado por", pt: "Cultivado por", zh: "种植者" },
  "wine.continueTasting": { en: "Continue tasting", es: "Continúa probando", pt: "Continue provando", zh: "继续品鉴" },
  "wine.moreFromCellar": { en: "More from the cellar", es: "Más de la bodega", pt: "Mais da adega", zh: "更多精选" },

  // Nav additions (commercial-path-first)
  "nav.packs": { en: "Wine Packs", es: "Packs de Vino", pt: "Kits de Vinho", zh: "葡萄酒套装" },
  "nav.findWine": { en: "Find Your Wine", es: "Encuentra tu Vino", pt: "Encontre seu Vinho", zh: "为您推荐" },
  "nav.trade": { en: "Trade / B2B", es: "Ventas Mayoristas", pt: "Venda por Atacado", zh: "批发业务" },

  // Packs / bundles
  "packs.eyebrow": { en: "Curated Packs", es: "Packs Seleccionados", pt: "Kits Selecionados", zh: "精选套装" },
  "packs.title": {
    en: "Wine packs, chosen for you",
    es: "Packs de vino, elegidos para ti",
    pt: "Kits de vinho, escolhidos para você",
    zh: "为您精心挑选的葡萄酒套装",
  },
  "packs.intro": {
    en: "Nine producer families make choosing hard. These packs make it easy — by occasion, by budget, or to discover the whole cooperative in one case.",
    es: "Con nueve familias productoras, elegir cuesta. Estos packs lo hacen fácil — por ocasión, por presupuesto, o para descubrir toda la cooperativa en una sola caja.",
    pt: "Nove famílias produtoras tornam a escolha difícil. Estes kits facilitam — por ocasião, por orçamento, ou para descobrir toda a cooperativa em uma única caixa.",
    zh: "九个生产家庭,选择实属不易。这些套装让选择变得简单——按场合、按预算,或一箱囊括整个合作社的风味。",
  },
  "packs.bottles": { en: "bottles", es: "botellas", pt: "garrafas", zh: "瓶" },
  "packs.includes": { en: "What's inside", es: "Qué incluye", pt: "O que está incluído", zh: "套装内容" },
  "packs.addAll": {
    en: "Add the pack to cart",
    es: "Agregar el pack al carrito",
    pt: "Adicionar o kit ao carrinho",
    zh: "将套装加入购物车",
  },
  "packs.viewPack": { en: "View pack", es: "Ver el pack", pt: "Ver kit", zh: "查看套装" },
  "packs.valueAdd.producerCard": {
    en: "Includes a meet-the-producers card",
    es: "Incluye una tarjeta para conocer a los productores",
    pt: "Inclui um cartão para conhecer os produtores",
    zh: "附赠生产者介绍卡",
  },
  "packs.valueAdd.giftPackaging": {
    en: "Gift presentation included",
    es: "Incluye presentación de regalo",
    pt: "Embalagem de presente incluída",
    zh: "含礼品包装",
  },
  "packs.valueAdd.freeShippingIncluded": {
    en: "Free shipping to Santiago included",
    es: "Incluye envío gratis a Santiago",
    pt: "Frete grátis para Santiago incluído",
    zh: "含圣地亚哥免费配送",
  },
  "packs.feriaRotates": {
    en: "This selection rotates with every feria.",
    es: "Esta selección rota con cada feria.",
    pt: "Esta seleção muda a cada feira.",
    zh: "该精选组合随每场展会更新。",
  },
  "packs.featuredTitle": { en: "Featured wine packs", es: "Packs destacados", pt: "Kits de vinho em destaque", zh: "精选套装推荐" },
  "packs.viewAll": { en: "View all packs", es: "Ver todos los packs", pt: "Ver todos os kits", zh: "查看所有套装" },

  // Quiz
  "quiz.eyebrow": { en: "Guided choice", es: "Elección guiada", pt: "Escolha guiada", zh: "智能选酒" },
  "quiz.notSure": {
    en: "Not sure what to choose?",
    es: "¿No sabes qué elegir?",
    pt: "Não sabe o que escolher?",
    zh: "不知道如何选择?",
  },
  "quiz.title": { en: "Find your wine", es: "Encuentra tu vino", pt: "Encontre seu vinho", zh: "为您推荐美酒" },
  "quiz.intro": {
    en: "Four quick questions — no wine vocabulary needed.",
    es: "Cuatro preguntas rápidas — sin vocabulario de vino.",
    pt: "Quatro perguntas rápidas — sem necessidade de vocabulário de vinho.",
    zh: "四个简单问题——无需任何葡萄酒专业知识。",
  },
  "quiz.q1": { en: "What's the occasion?", es: "¿Cuál es la ocasión?", pt: "Qual é a ocasião?", zh: "是什么场合?" },
  "quiz.q1.solo": { en: "Just for me", es: "Para tomar solo/a", pt: "Só para mim", zh: "自己独酌" },
  "quiz.q1.meal": { en: "With a meal", es: "Para una comida", pt: "Para uma refeição", zh: "搭配一餐" },
  "quiz.q1.asado": { en: "For an asado", es: "Para un asado", pt: "Para um churrasco", zh: "搭配烤肉" },
  "quiz.q1.gift": { en: "As a gift", es: "Para regalar", pt: "Para presentear", zh: "作为礼物" },
  "quiz.q2": { en: "Red, white or rosé?", es: "¿Tinto, blanco o rosado?", pt: "Tinto, branco ou rosé?", zh: "红葡萄酒、白葡萄酒还是桃红?" },
  "quiz.q2.red": { en: "Red", es: "Tinto", pt: "Tinto", zh: "红葡萄酒" },
  "quiz.q2.white": { en: "White", es: "Blanco", pt: "Branco", zh: "白葡萄酒" },
  "quiz.q2.rose": { en: "Rosé", es: "Rosado", pt: "Rosé", zh: "桃红葡萄酒" },
  "quiz.q2.any": { en: "No preference", es: "No tengo preferencia", pt: "Sem preferência", zh: "没有偏好" },
  "quiz.q3": { en: "How intense?", es: "¿Qué tan intenso?", pt: "Quão intenso?", zh: "口感浓郁度如何?" },
  "quiz.q3.light": { en: "Light and fresh", es: "Ligero y fresco", pt: "Leve e fresco", zh: "清爽轻盈" },
  "quiz.q3.medium": { en: "Somewhere in the middle", es: "Medio", pt: "Equilibrado", zh: "适中" },
  "quiz.q3.bold": { en: "Bold and full-bodied", es: "Intenso y con cuerpo", pt: "Intenso e encorpado", zh: "浓郁饱满" },
  "quiz.q4": {
    en: "What's your budget per bottle?",
    es: "¿Cuál es tu presupuesto por botella?",
    pt: "Qual é o seu orçamento por garrafa?",
    zh: "您每瓶的预算是多少?",
  },
  "quiz.q4.low": { en: "Up to CLP 8,000", es: "Hasta CLP 8,000", pt: "Até CLP 8.000", zh: "最高CLP 8,000" },
  "quiz.q4.mid": { en: "CLP 8,000–14,000", es: "CLP 8,000–14,000", pt: "CLP 8.000–14.000", zh: "CLP 8,000–14,000" },
  "quiz.q4.high": { en: "Over CLP 14,000", es: "Más de CLP 14,000", pt: "Mais de CLP 14.000", zh: "超过CLP 14,000" },
  "quiz.back": { en: "Back", es: "Volver", pt: "Voltar", zh: "返回" },
  "quiz.results.title": { en: "Your matches", es: "Tus vinos", pt: "Suas combinações", zh: "为您推荐" },
  "quiz.results.close": {
    en: "These are the closest matches to what you're looking for.",
    es: "Estos son los que más se acercan a lo que buscas.",
    pt: "Estas são as combinações mais próximas do que você procura.",
    zh: "以下是最符合您需求的推荐。",
  },
  "quiz.results.bundle": { en: "Or take the easy route", es: "O toma el camino fácil", pt: "Ou pegue o caminho fácil", zh: "或者选择更省心的方式" },
  "quiz.results.restart": { en: "Start over", es: "Empezar de nuevo", pt: "Recomeçar", zh: "重新开始" },
  "quiz.results.giftLead": {
    en: "For a gift, we'd point you straight to our gift pack:",
    es: "Para un regalo, te recomendamos directamente nuestro pack de regalo:",
    pt: "Para um presente, recomendamos diretamente nosso kit de presente:",
    zh: "如果是送礼,我们直接推荐我们的礼品套装:",
  },
  "quiz.results.emailMe": {
    en: "Email me my results",
    es: "Envíame mis resultados",
    pt: "Envie-me meus resultados",
    zh: "将结果发送到我的邮箱",
  },

  // Cart extras
  "cart.freeShipRemaining": {
    en: "bottles to go for free shipping to Santiago",
    es: "botellas para el envío gratis a Santiago",
    pt: "garrafas para o frete grátis para Santiago",
    zh: "瓶即可享圣地亚哥免费配送",
  },
  "cart.freeShipEarned": {
    en: "Free shipping to Santiago unlocked",
    es: "¡Envío gratis a Santiago!",
    pt: "Frete grátis para Santiago desbloqueado",
    zh: "已解锁圣地亚哥免费配送!",
  },
  "cart.gift": { en: "This is a gift", es: "Es un regalo", pt: "Isto é um presente", zh: "这是一份礼物" },
  "cart.addToCart": { en: "Add to Cart", es: "Añadir al carrito", pt: "Adicionar ao Carrinho", zh: "加入购物车" },
  "packs.save": { en: "Save", es: "Ahorra", pt: "Economize", zh: "节省" },
  "packs.vsSeparately": { en: "vs. buying separately", es: "vs. comprar por separado", pt: "vs. comprar separadamente", zh: "相比单独购买" },
  "cart.giftNote": {
    en: "We'll include gift presentation and the producers' story.",
    es: "Incluiremos presentación de regalo y la historia de los productores.",
    pt: "Incluiremos embalagem de presente e a história dos produtores.",
    zh: "我们将附上礼品包装及生产者的故事。",
  },

  // Wine detail upsell
  "wine.idealFor": { en: "Ideal for", es: "Ideal para", pt: "Ideal para", zh: "适合场合" },
  "wine.inBundles": { en: "This wine is in", es: "Este vino está en", pt: "Este vinho está em", zh: "该酒款收录于" },
  "wine.related": { en: "You might also like", es: "También te puede interesar", pt: "Você também pode gostar", zh: "您可能还喜欢" },
  "occasion.beginner": { en: "Wines for beginners", es: "Vinos para empezar", pt: "Vinhos para iniciantes", zh: "入门首选" },
  "occasion.asado": { en: "Wines for an asado", es: "Vinos para un asado", pt: "Vinhos para um churrasco", zh: "烤肉搭配" },
  "occasion.light": { en: "Light and fresh", es: "Ligeros y frescos", pt: "Leves e frescos", zh: "清爽轻盈" },
  "occasion.medium": { en: "Medium-bodied", es: "De cuerpo medio", pt: "De corpo médio", zh: "中等酒体" },
  "occasion.rich": { en: "Rich and intense", es: "Intensos y con cuerpo", pt: "Ricos e intensos", zh: "浓郁饱满" },
  "wine.notifyMe": { en: "Notify me when available", es: "Avísame cuando esté disponible", pt: "Avise-me quando disponível", zh: "到货时通知我" },

  // Trade / B2B
  "trade.eyebrow": { en: "Trade & Wholesale", es: "Ventas Mayoristas", pt: "Comércio e Atacado", zh: "批发合作" },
  "trade.title": {
    en: "Bring fair-trade Colchagua to your list",
    es: "Lleva el Colchagua de comercio justo a tu carta",
    pt: "Leve o Colchagua de comércio justo para o seu cardápio",
    zh: "将科尔查瓜的公平贸易美酒带入您的酒单",
  },
  "trade.intro": {
    en: "Restaurants, shops and distributors: work directly with a Fairtrade-certified cooperative of small family producers.",
    es: "Restaurantes, tiendas y distribuidores: trabaja directamente con una cooperativa certificada Fairtrade de pequeños productores familiares.",
    pt: "Restaurantes, lojas e distribuidores: trabalhe diretamente com uma cooperativa certificada Fairtrade de pequenos produtores familiares.",
    zh: "餐厅、商店与经销商:直接与获Fairtrade认证的小型家庭生产者合作社合作。",
  },
  "trade.cta": { en: "Request wholesale pricing", es: "Solicitar precios mayoristas", pt: "Solicitar preços de atacado", zh: "申请批发价格" },
  "trade.businessType": { en: "Type of business", es: "Tipo de negocio", pt: "Tipo de negócio", zh: "业务类型" },
  "trade.location": { en: "City / location", es: "Ciudad / ubicación", pt: "Cidade / localização", zh: "城市/地点" },
  "trade.volume": { en: "Expected monthly volume", es: "Volumen mensual estimado", pt: "Volume mensal esperado", zh: "预计月采购量" },
  "trade.interest": { en: "Wines of interest", es: "Vinos de interés", pt: "Vinhos de interesse", zh: "感兴趣的酒款" },
  "trade.portfolioIntro": {
    en: "Our portfolio brings together nine small-producer brands from the Colchagua Valley, all under Fairtrade certification. Browse the full catalogue and tell us which wines interest you.",
    es: "Nuestra cartera reúne nueve marcas de pequeños productores del Valle de Colchagua, todas bajo certificación de comercio justo. Explora el catálogo completo y cuéntanos qué vinos te interesan.",
    pt: "Nosso portfólio reúne nove marcas de pequenos produtores do Vale de Colchagua, todas com certificação Fairtrade. Explore o catálogo completo e conte-nos quais vinhos lhe interessam.",
    zh: "我们的产品组合汇集了科尔查瓜山谷九个小型生产者品牌，均获得Fairtrade公平贸易认证。浏览完整目录，告诉我们您对哪些葡萄酒感兴趣。",
  },

  // Feria / visita landings
  "feria.eyebrow": { en: "From the feria", es: "Desde la feria", pt: "Da feira", zh: "来自展会" },
  "feria.title": { en: "Take the feria home", es: "Llévate la feria a casa", pt: "Leve a feira para casa", zh: "把展会好酒带回家" },
  "feria.intro": {
    en: "Tasted something you liked at our stand? These are the wines we're pouring — order the same bottles online.",
    es: "¿Probaste algo que te gustó en nuestro stand? Estos son los vinos que estamos sirviendo — pide las mismas botellas online.",
    pt: "Provou algo que gostou em nosso estande? Estes são os vinhos que estamos servindo — peça as mesmas garrafas online.",
    zh: "在我们的展位品尝到心仪的美酒了吗?以下就是我们正在提供的酒款——线上即可订购同款。",
  },
  "feria.which": { en: "Which feria did you visit?", es: "¿Qué feria visitaste?", pt: "Qual feira você visitou?", zh: "您参观了哪场展会?" },
  "feria.namePlaceholder": { en: "Feria name", es: "Nombre de la feria", pt: "Nome da feira", zh: "展会名称" },
  "feria.keepPosted": { en: "Keep me posted", es: "Quiero recibir novedades", pt: "Quero receber novidades", zh: "请及时通知我" },
  "visita.eyebrow": { en: "After your visit", es: "Después de tu visita", pt: "Após sua visita", zh: "游览之后" },
  "visita.title": { en: "Wines from your visit", es: "Los vinos de tu visita", pt: "Vinhos da sua visita", zh: "您游览中品尝的美酒" },
  "visita.intro": {
    en: "Pick the wines you tasted on your tour and add them to your cart in one go.",
    es: "Marca los vinos que probaste en tu tour y agrégalos al carrito de una sola vez.",
    pt: "Selecione os vinhos que provou no seu passeio e adicione-os ao carrinho de uma só vez.",
    zh: "选择您在游览中品尝过的葡萄酒,一键加入购物车。",
  },
  "visita.addSelected": {
    en: "Add selected to cart",
    es: "Agregar seleccionados al carrito",
    pt: "Adicionar selecionados ao carrinho",
    zh: "将所选加入购物车",
  },

  // Inquiry / reservation form
  "form.name": { en: "Name", es: "Nombre", pt: "Nome", zh: "姓名" },
  "form.email": { en: "Email", es: "Correo electrónico", pt: "E-mail", zh: "电子邮箱" },
  "form.phone": { en: "Phone", es: "Teléfono", pt: "Telefone", zh: "电话" },
  "form.date": { en: "Preferred date", es: "Fecha preferida", pt: "Data preferida", zh: "首选日期" },
  "form.group": { en: "Group size", es: "Número de personas", pt: "Tamanho do grupo", zh: "人数" },
  "form.message": { en: "Message", es: "Mensaje", pt: "Mensagem", zh: "留言" },
  "form.sending": { en: "Sending…", es: "Enviando…", pt: "Enviando…", zh: "发送中…" },
  "form.thankYou": { en: "Thank you.", es: "Gracias.", pt: "Obrigado.", zh: "谢谢。" },
  "form.thankYouBody": {
    en: "We've received your request and will reply within one business day.",
    es: "Hemos recibido tu solicitud y te responderemos dentro de un día hábil.",
    pt: "Recebemos sua solicitação e responderemos dentro de um dia útil.",
    zh: "我们已收到您的申请,将在一个工作日内回复。",
  },
  "form.error": {
    en: "Something went wrong. Please email us directly.",
    es: "Algo salió mal. Por favor, escríbenos directamente por correo.",
    pt: "Algo deu errado. Por favor, envie-nos um e-mail diretamente.",
    zh: "出现了一些问题,请直接给我们发送邮件。",
  },
  "form.cta.reservation": { en: "Request a Tasting", es: "Solicitar reserva", pt: "Solicitar uma Degustação", zh: "预约品鉴" },
  "form.cta.event": { en: "Request Your Event", es: "Solicitar evento", pt: "Solicite seu Evento", zh: "申请举办活动" },
  "form.cta.contact": { en: "Send Message", es: "Enviar mensaje", pt: "Enviar Mensagem", zh: "发送消息" },

  // Producer detail
  "producer.allProducers": { en: "All producers", es: "Todos los productores", pt: "Todos os produtores", zh: "所有生产者" },
  "producer.relatedWines": { en: "Wines from these grapes", es: "Vinos de estas uvas", pt: "Vinhos destas uvas", zh: "这些葡萄酿造的酒" },
  "producer.nextProducer": { en: "Next producer", es: "Siguiente productor", pt: "Próximo produtor", zh: "下一位生产者" },
  "producer.inactiveNotice": {
    en: "This producer is no longer an active part of Red del Vino.",
    es: "Este productor ya no forma parte activa de Red del Vino.",
    pt: "Este produtor não faz mais parte ativa da Red del Vino.",
    zh: "该生产者目前已不再是Red del Vino的活跃成员。",
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
