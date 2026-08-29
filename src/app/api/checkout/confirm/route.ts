import { NextResponse } from "next/server";
import { getFlowStatus } from "@/lib/flow";

/**
 * Flow's `urlConfirmation` callback. Flow POSTs a `token` here once the
 * payment reaches a final state; we look up the real status via
 * payment/getStatus (never trust the callback body alone) and log it.
 * Flow only requires a 200 response — it does not parse the body.
 */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const token = form?.get("token")?.toString();
  if (!token) return new NextResponse("missing token", { status: 400 });

  try {
    const status = await getFlowStatus(token);
    // No order database exists yet — this is the point to wire in persistence
    // and a Resend confirmation email once those are set up.
    console.log(`Flow payment ${status.commerceOrder}: status=${status.status} amount=${status.amount}`);
  } catch (err) {
    console.error("Flow getStatus failed in confirmation webhook:", err);
    // Still return 200 — Flow will retry, and getStatus can be re-checked from /checkout/return.
  }

  return new NextResponse("OK", { status: 200 });
}
