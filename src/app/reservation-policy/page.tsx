import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial/EditorialPage";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Reservation Policy",
  description: "Booking rules, hours, deposits and cancellation terms for tastings and tours at Red del Vino.",
};

export default function ReservationPolicyPage() {
  return <EditorialPage slug="reservation-policy" eyebrow="Before You Visit" heroImage={IMG.tasting} />;
}
