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

export const NAV: { label: string; href: string }[] = [
  { label: "Wines", href: "/wines" },
  { label: "Producers", href: "/producers" },
  { label: "Our Story", href: "/story" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Wine Tourism", href: "/tourism" },
  { label: "Events", href: "/event-center" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  Explore: [
    { label: "Wines", href: "/wines" },
    { label: "Producers", href: "/producers" },
    { label: "Our Story", href: "/story" },
    { label: "Social Responsibility", href: "/social-responsibility" },
  ],
  Visit: [
    { label: "Wine Tastings & Tours", href: "/tourism" },
    { label: "Event Center", href: "/event-center" },
    { label: "Reservation Policy", href: "/reservation-policy" },
    { label: "Contact", href: "/contact" },
  ],
};
