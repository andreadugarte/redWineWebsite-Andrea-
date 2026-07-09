import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial/EditorialPage";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Red del Vino handles your information.",
};

export default function PrivacyPage() {
  return <EditorialPage slug="privacy-policy" eyebrow="Legal" heroImage={IMG.office} />;
}
