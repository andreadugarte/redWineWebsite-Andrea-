import type { Metadata } from "next";
import { PolicyPage } from "@/components/pages/PolicyPage";

export const metadata: Metadata = {
  title: "Shipping · Envíos",
  description: "Free shipping to Santiago from 6 bottles. Envío gratis a Santiago desde 6 botellas. Blue Express, pickup in Santa Cruz.",
};

export default function ShippingPage() {
  return <PolicyPage kind="shipping" />;
}
