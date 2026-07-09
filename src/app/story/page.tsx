import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial/EditorialPage";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The fair-trade story of Red del Vino — a private association of nineteen small wine producers in Colchagua Valley, Chile, founded in 2004.",
};

export default function StoryPage() {
  return (
    <EditorialPage
      slug="about-us"
      eyebrow="Our Story · Since 2004"
      heroImage={IMG.heroValley}
      galleryImages={[IMG.harvest, IMG.grower, IMG.barrels, IMG.producers]}
    />
  );
}
