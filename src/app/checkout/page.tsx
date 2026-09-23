import { flowConfigured } from "@/lib/flow";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return <CheckoutForm flowConfigured={flowConfigured()} />;
}
