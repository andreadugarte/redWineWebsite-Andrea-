import type { Metadata } from "next";
import { TradeView } from "@/components/pages/TradeView";

export const metadata: Metadata = {
  title: "Trade & Wholesale",
  description:
    "Restaurants, shops and distributors: work directly with a Fairtrade-certified cooperative of small family producers in Colchagua Valley, Chile.",
};

export default function Page() {
  return <TradeView locale="en" />;
}
