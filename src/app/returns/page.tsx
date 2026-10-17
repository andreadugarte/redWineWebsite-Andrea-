import type { Metadata } from "next";
import { PolicyPage } from "@/components/pages/PolicyPage";

export const metadata: Metadata = {
  title: "Returns & Exchanges · Cambios y devoluciones",
  description: "What to do if a bottle arrives damaged, and your right of withdrawal. Qué hacer si una botella llega dañada y tu derecho a retracto.",
};

export default function ReturnsPage() {
  return <PolicyPage kind="returns" />;
}
