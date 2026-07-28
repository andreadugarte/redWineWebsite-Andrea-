import type { Metadata } from "next";
import { Fraunces, Inter, Oswald } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";

// Brand pack calls for Bookmania (titles), Knockout Welterweight w/ tracking 209
// (subheadings), Coco Gothic (body) — all commercial, no licensed files available.
// Fraunces (artisanal serif) and Oswald (condensed, poster-style) are the closest
// free equivalents for the first two; Inter already fits the "clean, friendly" body brief.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Red del Vino — Fair-Trade Wines of Colchagua Valley, Chile",
    template: "%s · Red del Vino",
  },
  description: SITE.tagline,
  openGraph: {
    title: "Red del Vino — Fair-Trade Wines of Colchagua Valley",
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    images: ["/images/original/Vinos-Campesino-Slider-2-active-line.jpg"],
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/es", pt: "/pt", zh: "/zh" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${oswald.variable} ${inter.variable}`}>
      <body className="grain font-sans antialiased">
        <OrganizationJsonLd />
        <LocaleProvider>
          <CartProvider>
            <AgeGate />
            {/* Disabled: scroll performance */}
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
