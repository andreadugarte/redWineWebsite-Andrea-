import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Vinhos Fair Trade do Vale de Colchagua, Chile", template: "%s · Red del Vino" },
  description: "Vinhos de comércio justo dos pequenos produtores do Vale de Colchagua, Chile. Compre online com frete grátis para Santiago a partir de 6 garrafas.",
  openGraph: { title: "Vinhos Fair Trade do Vale de Colchagua, Chile", description: "Vinhos de comércio justo dos pequenos produtores do Vale de Colchagua, Chile. Compre online com frete grátis para Santiago a partir de 6 garrafas.", locale: "pt", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
