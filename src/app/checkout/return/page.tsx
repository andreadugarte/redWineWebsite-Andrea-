import Link from "next/link";
import { getFlowStatus } from "@/lib/flow";
import { formatPrice } from "@/components/cart/CartProvider";

/** Flow's `urlReturn` target — the customer's browser lands here after paying. */
export default async function CheckoutReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  let status: Awaited<ReturnType<typeof getFlowStatus>> | null = null;
  let lookupFailed = false;
  if (token) {
    try {
      status = await getFlowStatus(token);
    } catch {
      lookupFailed = true;
    }
  }

  const paid = status?.status === 2;
  const rejected = status?.status === 3 || status?.status === 4;

  const heading = !token || lookupFailed ? "We couldn't confirm this order" : paid ? "Thank you." : rejected ? "Payment not completed" : "Payment pending";

  const body = !token
    ? "No payment reference was provided."
    : lookupFailed
      ? "We couldn't reach Flow to confirm the status right now. If you were charged, you'll still receive confirmation."
      : paid
        ? `Your order ${status!.commerceOrder} has been received.`
        : rejected
          ? `Order ${status!.commerceOrder} was not completed — no charge was made.`
          : `Order ${status!.commerceOrder} is still processing.`;

  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow">{paid ? "Order Confirmed" : "Checkout"}</p>
      <h1 className="mt-4 font-serif text-display-md font-light">{heading}</h1>
      <p className="mt-4 font-sans text-sm text-charcoal-soft">{body}</p>
      {status && (
        <p className="mt-2 font-sans text-sm text-charcoal-soft">{formatPrice(status.amount, status.currency)}</p>
      )}
      <Link href="/wines" className="btn-primary mt-10">
        Continue Exploring
      </Link>
    </div>
  );
}
