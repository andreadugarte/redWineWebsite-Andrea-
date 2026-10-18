import { SITE } from "@/lib/site";

type Item = { name: string; price: number; qty: number };
export type PaidOrder = {
  orderId: string;
  flowOrder: number | string;
  amount: number;
  payerEmail: string;
  name: string;
  address: string;
  lang: string;
  items: Item[];
};

const clp = (n: number) => `CLP ${Math.round(n).toLocaleString("es-CL")}`;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const WA = "+56 9 9818 6442";

const T = {
  es: {
    subject: (id: string) => `Recibimos tu pedido ${id} — Red del Vino`,
    hello: (n: string) => (n ? `Hola ${n},` : "Hola,"),
    thanks: "¡Gracias por tu compra! Tu pago fue recibido y ya estamos preparando tu pedido.",
    order: "Pedido",
    items: "Productos",
    paid: "Total pagado",
    ship: "Dirección de entrega",
    noAddr: "(no la recibimos — te la pediremos por correo)",
    next: `Qué sigue: te avisaremos por correo o WhatsApp cuando salga tu pedido, con el número de seguimiento. Si algún dato está mal o quieres cambiar algo, responde este correo o escríbenos al WhatsApp ${WA}. Si tu pedido incluye envío con costo, te confirmaremos el valor antes de despachar.`,
    bye: "Un abrazo,\nRed del Vino",
    flow: "N° de orden Flow",
  },
  en: {
    subject: (id: string) => `We received your order ${id} — Red del Vino`,
    hello: (n: string) => (n ? `Hello ${n},` : "Hello,"),
    thanks: "Thank you for your purchase! Your payment was received and we're already preparing your order.",
    order: "Order",
    items: "Items",
    paid: "Total paid",
    ship: "Delivery address",
    noAddr: "(not received — we'll ask you for it by email)",
    next: `What's next: we'll let you know by email or WhatsApp when your order ships, with the tracking number. If anything is wrong or you want to change something, reply to this email or message us on WhatsApp ${WA}. If your order carries a shipping cost, we'll confirm the amount before dispatch.`,
    bye: "Warm regards,\nRed del Vino",
    flow: "Flow order no.",
  },
} as const;

export function buildOrderEmails(o: PaidOrder) {
  const t = o.lang === "es" ? T.es : T.en;
  // Packs are charged at a discounted per-bottle price, so only show line prices when they add up to what was paid.
  const linesMatch = o.items.reduce((n, i) => n + i.price * i.qty, 0) === Math.round(o.amount);
  const priceOf = (i: Item) => (linesMatch && i.price ? ` — ${clp(i.price * i.qty)}` : "");
  const lines = o.items.map((i) => `- ${i.qty} × ${i.name || "?"}${priceOf(i)}`);
  const itemsText = lines.length ? lines.join("\n") : "-";

  const customerText = [
    t.hello(o.name),
    "",
    t.thanks,
    "",
    `${t.order}: ${o.orderId}`,
    `${t.items}:`,
    itemsText,
    `${t.paid}: ${clp(o.amount)}`,
    `${t.ship}: ${o.address || t.noAddr}`,
    "",
    t.next,
    "",
    t.bye,
  ].join("\n");

  const customerHtml = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#26221f;max-width:560px">
<p>${esc(t.hello(o.name))}</p><p>${esc(t.thanks)}</p>
<table style="border-collapse:collapse;width:100%;font-size:14px" cellpadding="6">
<tr><td style="color:#777">${t.order}</td><td><b>${esc(o.orderId)}</b></td></tr>
<tr><td style="color:#777;vertical-align:top">${t.items}</td><td>${o.items.map((i) => `${i.qty} × ${esc(i.name || "?")}${priceOf(i)}`).join("<br>") || "-"}</td></tr>
<tr><td style="color:#777">${t.paid}</td><td><b>${clp(o.amount)}</b></td></tr>
<tr><td style="color:#777;vertical-align:top">${t.ship}</td><td>${esc(o.address || t.noAddr)}</td></tr>
</table>
<p>${esc(t.next)}</p><p style="white-space:pre-line">${esc(t.bye)}</p></div>`;

  const internalText = [
    `PEDIDO PAGADO ${o.orderId}`,
    `Monto: ${clp(o.amount)} (Flow orden Nº ${o.flowOrder})`,
    `Cliente: ${o.name || "(sin nombre)"} <${o.payerEmail}>`,
    `Despacho: ${o.address || "(sin dirección — pedirla al cliente)"}`,
    "",
    "Productos:",
    itemsText,
    "",
    "Para escribirle al cliente, responde este correo. Se le envió también una confirmación automática.",
  ].join("\n");

  return {
    customer: { to: o.payerEmail, subject: t.subject(o.orderId), body: customerText, html: customerHtml, replyTo: SITE.email },
    internal: { to: process.env.ORDER_NOTIFY_EMAIL || SITE.email, subject: `Pedido pagado ${o.orderId} — ${clp(o.amount)}`, body: internalText, replyTo: o.payerEmail },
  };
}
