import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Vinos de Comercio Justo del Valle de Colchagua, Chile", template: "%s · Red del Vino" },
  description: "Vinos de comercio justo de los pequeños productores del Valle de Colchagua, Chile. Compra online con envío gratis a Santiago desde 6 botellas.",
  openGraph: { title: "Vinos de Comercio Justo del Valle de Colchagua, Chile", description: "Vinos de comercio justo de los pequeños productores del Valle de Colchagua, Chile. Compra online con envío gratis a Santiago desde 6 botellas.", locale: "es", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
