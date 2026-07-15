import type { Metadata } from "next";
import { VisitaView } from "@/components/pages/VisitaView";

export const metadata: Metadata = {
  title: "Wines from your visit",
  description: "Pick the wines you tasted on your Colchagua tour and order them online.",
};

export default function Page() {
  return <VisitaView locale="en" />;
}
