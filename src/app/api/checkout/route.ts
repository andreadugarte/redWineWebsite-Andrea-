import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { flowConfigured, createFlowPayment } from "@/lib/flow";
import { encodeOrder } from "@/lib/order";

/**
 * Checkout endpoint.
 * - With FLOW_API_KEY / FLOW_SECRET_KEY set, creates a real Flow payment
 *   order and returns `redirectUrl` for the browser to follow.
 * - Without them, returns a SIMULATED order confirmation so the full
 *   purchase flow works end-to-end for demos and staging.
 */
export async function POST(req: Request) {
  const { items = [], customer = {}, locale = "es" } = await req.json().catch(() => ({}));
  const lang = ["en", "es", "pt", "zh"].includes(locale) ? locale : "es";
  const total = (items as { price: number; qty: number }[]).reduce((n, i) => n + i.price * i.qty, 0);
  const orderId = "RDV-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String((customer as Record<string, unknown>).email || "").trim());
  if (flowConfigured() && total > 0 && !emailOk) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  if (flowConfigured() && total > 0) {
    try {
      console.log("[order]", orderId, JSON.stringify({ items, customer }));
      const email = String((customer as Record<string, unknown>).email || "").trim();
      const base = {
        commerceOrder: orderId,
        subject: `Red del Vino — pedido ${orderId}`,
        amount: total,
        email,
        urlConfirmation: `${SITE.url}/api/checkout/confirm`,
        urlReturn: `${SITE.url}/api/checkout/return?lang=${lang}`,
      };
      let payment;
      try {
        payment = await createFlowPayment({
          ...base,
          optional: encodeOrder(items as { slug?: string; qty: number }[], customer as Record<string, unknown>, lang),
        });
      } catch (first) {
        // Never lose a sale over the optional order details: retry once without them (the [order] log line still has them).
        if (/1620|e-?mail/i.test(first instanceof Error ? first.message : "")) throw first;
        console.error("Flow rejected order details, retrying without them:", first);
        payment = await createFlowPayment(base);
      }
      return NextResponse.json({
        ok: true,
        simulated: false,
        orderId,
        total,
        customer,
        redirectUrl: `${payment.url}?token=${payment.token}`,
      });
    } catch (err) {
      // With Flow live, never fall back to a fake order: the customer must know the payment did not start.
      console.error("Flow payment/create failed:", err);
      const msg = err instanceof Error ? err.message : "";
      const code = /1620|e-?mail/i.test(msg) ? "email" : "payment";
      return NextResponse.json({ ok: false, error: code }, { status: 502 });
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
