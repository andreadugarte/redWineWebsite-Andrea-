import type { Metadata } from "next";
import { TourismView } from "@/components/pages/TourismView";

export const metadata: Metadata = {
  title: "Wine Tourism",
  description: "Tastings, viticultural tours, bike and kayak rentals in the Colchagua Valley with Red del Vino.",
};

export default function Page() {
  return <TourismView locale="en" />;
}
