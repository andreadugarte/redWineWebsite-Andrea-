import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial/EditorialPage";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Organic agriculture, biodiversity, renewable energy and recycling — how the small producers of Red del Vino care for the Colchagua Valley.",
};

export default function SustainabilityPage() {
  return (
    <EditorialPage
      slug="sustainability"
      eyebrow="Caring for the Land"
      heroImage={IMG.sustainability}
      galleryImages={[IMG.organic, IMG.renewable, IMG.sunflower, IMG.vineyard]}
    />
  );
}
