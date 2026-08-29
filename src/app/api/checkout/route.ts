import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { flowConfigured, createFlowPayment } from "@/lib/flow";

/**
 * Checkout endpoint.
 * - With FLOW_API_KEY / FLOW_SECRET_KEY set, creates a real Flow payment
 *   order and returns `redirectUrl` for the browser to follow.
 * - Without them, returns a SIMULATED order confirmation so the full
 *   purchase flow works end-to-end for demos and staging.
 */
export async function POST(req: Request) {
  const { items = [], customer = {} } = await req.json().catch(() => ({}));
  const total = (items as { price: number; qty: number }[]).reduce((n, i) => n + i.price * i.qty, 0);
  const orderId = "RDV-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  if (flowConfigured() && total > 0) {
    try {
      const email = String((customer as Record<string, unknown>).email || "");
      const payment = await createFlowPayment({
        commerceOrder: orderId,
        subject: `Red del Vino — pedido ${orderId}`,
        amount: total,
        email,
        urlConfirmation: `${SITE.url}/api/checkout/confirm`,
        urlReturn: `${SITE.url}/checkout/return`,
      });
      return NextResponse.json({
        ok: true,
        simulated: false,
        orderId,
        total,
        customer,
        redirectUrl: `${payment.url}?token=${payment.token}`,
      });
    } catch (err) {
      // Fail safe into simulated mode rather than breaking checkout for the customer.
      console.error("Flow payment/create failed, falling back to simulated checkout:", err);
    }
  }

  return NextResponse.json({
    ok: true,
    simulated: true,
    orderId,
    total,
    customer,
    message: flowConfigured()
      ? "Flow payment could not be created — see server logs."
      : "Simulated order placed. No payment was processed.",
  });
}
