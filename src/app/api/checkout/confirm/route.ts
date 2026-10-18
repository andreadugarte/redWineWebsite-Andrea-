import { NextResponse } from "next/server";
import { getFlowStatus } from "@/lib/flow";
import { sendMail } from "@/lib/mail";
import { SITE } from "@/lib/site";
import { decodeOrder } from "@/lib/order";

/**
 * Flow's `urlConfirmation` callback. Flow POSTs a `token` here once the
 * payment reaches a final state; we look up the real status via
 * payment/getStatus (never trust the callback body alone). When the payment
 * is PAID we email Red del Vino the full order (who, what, where to ship),
 * because Flow only stores what we send in `optional`.
 * Flow only requires a 200 response — it does not parse the body.
 */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const token = form?.get("token")?.toString();
  if (!token) return new NextResponse("missing token", { status: 400 });

  try {
    const status = await getFlowStatus(token);
    let optional: Record<string, string> = {};
    if (typeof status.optional === "string") {
      try {
        optional = JSON.parse(status.optional);
      } catch {}
    } else if (status.optional) {
      optional = status.optional;
    }
    console.log(`Flow payment ${status.commerceOrder}: status=${status.status} amount=${status.amount} payer=${status.payer}`, optional);

    if (status.status === 2) {
      const d = decodeOrder(optional);
      const body = [
        `PEDIDO PAGADO ${status.commerceOrder}`,
        `Monto: CLP ${status.amount}`,
        `Cliente: ${d.nombre || "(sin nombre)"} <${status.payer}>`,
        `Despacho: ${d.direccion || "(sin dirección)"}`,
        "",
        "Productos:",
        ...(d.lines.length ? d.lines : ["(detalle no disponible — revisar monto en Flow)"]),
        "",
        `Flow orden Nº ${status.flowOrder}`,
      ].join("\n");
      await sendMail({
        to: process.env.ORDER_NOTIFY_EMAIL || SITE.email,
        subject: `Pedido pagado ${status.commerceOrder} — CLP ${status.amount}`,
        body,
      });
    }
  } catch (err) {
    console.error("Flow confirmation webhook failed:", err);
    // Still 200: Flow retries, and /checkout/return re-checks status.
  }

  return new NextResponse("OK", { status: 200 });
}
