import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
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
    images: ["/images/original/Vinos-Campesino-Slider-2.jpg"],
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: "/",
    languages: { "en": "/", "es": "/es" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="grain font-sans antialiased">
        <OrganizationJsonLd />
        <LocaleProvider>
          <CartProvider>
            <AgeGate />
            <ScrollProgress />
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
