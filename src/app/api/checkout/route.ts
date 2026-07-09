import { NextResponse } from "next/server";

/**
 * Checkout endpoint.
 * - With STRIPE_SECRET_KEY set, this is where you'd create a Stripe Checkout
 *   Session and return its `url` for redirect (see README for the exact call).
 * - Without it, we return a SIMULATED order confirmation so the full
 *   purchase flow works end-to-end for demos and staging.
 */
export async function POST(req: Request) {
  const { items = [], customer = {} } = await req.json().catch(() => ({}));
  const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY);

  const total = (items as { price: number; qty: number }[]).reduce((n, i) => n + i.price * i.qty, 0);
  const orderId = "RDV-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  // Simulated path (default). Wire the real Stripe session creation here.
  return NextResponse.json({
    ok: true,
    simulated: !hasStripe,
    orderId,
    total,
    customer,
    message: hasStripe
      ? "Stripe not yet wired — see README to enable live payments."
      : "Simulated order placed. No payment was processed.",
  });
}
