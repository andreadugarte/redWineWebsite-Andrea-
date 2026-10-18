import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { flowConfigured, createFlowPayment } from "@/lib/flow";

const clip = (v: unknown, n: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);

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
      const email = String((customer as Record<string, unknown>).email || "").trim();
      const payment = await createFlowPayment({
        commerceOrder: orderId,
        subject: `Red del Vino — pedido ${orderId}`,
        amount: total,
        email,
        urlConfirmation: `${SITE.url}/api/checkout/confirm`,
        urlReturn: `${SITE.url}/api/checkout/return?lang=${lang}`,
        optional: {
          nombre: clip((customer as Record<string, unknown>).name, 80),
          direccion: clip((customer as Record<string, unknown>).address, 120),
          ciudad: clip((customer as Record<string, unknown>).city, 60),
          region: clip((customer as Record<string, unknown>).region, 60),
          pais: clip((customer as Record<string, unknown>).country, 40),
          pedido: clip(
            (items as { slug?: string; qty: number }[]).map((i) => `${i.slug ?? "?"} x${i.qty}`).join("; "),
            350
          ),
        },
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
