export const SITE = {
  name: "Red del Vino",
  tagline: "Fair-trade wines from the small producers of Colchagua Valley, Chile.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://reddelvino.com",
  founded: 2004,
  producerCount: 19,
  address: {
    street: "957 Avenida Diego Portales",
    city: "Santa Cruz",
    region: "O'Higgins",
    country: "Chile",
  },
  email: "info@reddelvino.com",
  reservationsEmail: "reservas@reddelvino.com",
  facebook: "https://www.facebook.com/reddelvino.colchagua",
  instagram: "https://www.instagram.com/reddelvino",
};

// Commercial-path-first primary nav (CRO restructure): selling paths up front,
// institutional pages move to the footer.
export const NAV: { label: string; href: string }[] = [
  { label: "Wines", href: "/wines" },
  { label: "Wine Packs", href: "/packs" },
  { label: "Find Your Wine", href: "/find-your-wine" },
  { label: "Producers", href: "/producers" },
  { label: "Wine Tourism", href: "/tourism" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  Explore: [
    { label: "Wines", href: "/wines" },
    { label: "Wine Packs", href: "/packs" },
    { label: "Producers", href: "/producers" },
    { label: "Our Story", href: "/story" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Social Responsibility", href: "/social-responsibility" },
    { label: "Trade / B2B", href: "/trade" },
  ],
  Visit: [
    { label: "Wine Tastings & Tours", href: "/tourism" },
    { label: "Event Center", href: "/event-center" },
    { label: "Reservation Policy", href: "/reservation-policy" },
    { label: "Contact", href: "/contact" },
  ],
};
