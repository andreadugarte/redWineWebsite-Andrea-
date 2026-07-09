import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial/EditorialPage";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Social Responsibility",
  description: "Fair prices for grapes, community outreach and earthquake relief — Red del Vino's commitment to the families of Colchagua.",
};

export default function SocialPage() {
  return (
    <EditorialPage
      slug="social-responsibility"
      eyebrow="Community & Fair Trade"
      heroImage={IMG.community}
      galleryImages={[IMG.fairWages, IMG.culture, IMG.grower]}
    />
  );
}
