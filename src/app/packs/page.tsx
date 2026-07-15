import type { Metadata } from "next";
import { PacksView } from "@/components/pages/PacksView";

export const metadata: Metadata = {
  title: "Wine Packs",
  description:
    "Curated wine packs from the fair-trade producer families of Colchagua Valley — by occasion, by budget, or to discover the whole cooperative.",
};

export default function Page() {
  return <PacksView locale="en" />;
}
