/**
 * Customer-facing shipping & returns copy (Spanish + English; pt/zh fall back
 * to English). Wording is conservative: only the free-shipping threshold and
 * carrier are confirmed Red del Vino policy — see DEPENDENCIES.md for the
 * items Rodrigo still needs to confirm (delivery times, paid-shipping rates).
 */
export type PolicySection = { h: string; p: string[] };
export type Policy = { eyebrow: string; title: string; intro: string; sections: PolicySection[] };
type PolicyKey = "shipping" | "returns";

const WA = "+56 9 9818 6442";

export const POLICIES: Record<PolicyKey, { en: Policy; es: Policy }> = {
  shipping: {
    es: {
      eyebrow: "Ayuda",
      title: "Envíos",
      intro: "Despachamos desde Santa Cruz, Valle de Colchagua. Así funciona.",
      sections: [
        {
          h: "Envío gratis a Santiago",
          p: ["Los pedidos de 6 botellas o más con destino a Santiago tienen envío gratis. En el carrito verás cuántas botellas te faltan para llegar."],
        },
        {
          h: "Otros pedidos y destinos",
          p: [
            "Despachamos con Blue Express. Para pedidos de menos de 6 botellas, o con destino fuera de Santiago, te confirmamos el valor y el plazo del envío por correo o WhatsApp antes de despachar, para que no haya sorpresas.",
            `¿Quieres saberlo antes de comprar? Escríbenos al WhatsApp ${WA} o a info@reddelvino.com con tu comuna y las botellas que te interesan.`,
          ],
        },
        {
          h: "Seguimiento",
          p: ["Cuando tu pedido sale de la bodega te avisamos por correo o WhatsApp. Si tienes cualquier duda sobre dónde está, escríbenos con tu número de pedido."],
        },
        {
          h: "Retiro en Santa Cruz",
          p: ["También puedes retirar tu pedido en nuestra tienda: Av. Diego Portales 957, Santa Cruz. Avísanos antes para tenerlo listo."],
        },
        {
          h: "Entrega a mayores de 18 años",
          p: ["Por tratarse de bebidas alcohólicas, la entrega es solo a personas mayores de 18 años, que podrían ser requeridas de mostrar su cédula al recibir."],
        },
        {
          h: "Envíos fuera de Chile",
          p: ["Por ahora no hacemos envíos internacionales de forma regular. Si te interesa, escríbenos y evaluamos tu caso."],
        },
      ],
    },
    en: {
      eyebrow: "Help",
      title: "Shipping",
      intro: "We ship from Santa Cruz, in the Colchagua Valley. Here's how it works.",
      sections: [
        { h: "Free shipping to Santiago", p: ["Orders of 6 or more bottles delivered in Santiago ship free. Your cart shows how many bottles you have left to reach it."] },
        {
          h: "Other orders and destinations",
          p: [
            "We ship with Blue Express. For orders under 6 bottles, or delivered outside Santiago, we confirm the shipping cost and timing by email or WhatsApp before dispatch, so there are no surprises.",
            `Want to know before you buy? Message us on WhatsApp ${WA} or at info@reddelvino.com with your area and the bottles you're considering.`,
          ],
        },
        { h: "Tracking", p: ["When your order leaves the winery we let you know by email or WhatsApp. If you wonder where it is, write to us with your order number."] },
        { h: "Pick up in Santa Cruz", p: ["You can also collect your order at our shop: 957 Av. Diego Portales, Santa Cruz. Let us know beforehand so it's ready."] },
        { h: "Delivery to adults 18+", p: ["Because these are alcoholic beverages, delivery is only to people aged 18 or over, who may be asked for ID on receipt."] },
        { h: "Shipping outside Chile", p: ["We don't regularly ship internationally yet. If you're interested, write to us and we'll look at your case."] },
      ],
    },
  },
  returns: {
    es: {
      eyebrow: "Ayuda",
      title: "Cambios y devoluciones",
      intro: "Si algo no llega como debe, lo resolvemos.",
      sections: [
        {
          h: "Botella dañada o equivocada",
          p: [
            `Si tu pedido llega con una botella rota, dañada o distinta a la que pediste, escríbenos lo antes posible al WhatsApp ${WA} o a info@reddelvino.com con tu número de pedido y una foto. Te ofreceremos la reposición o la devolución de tu dinero.`,
          ],
        },
        {
          h: "Derecho a retracto",
          p: [
            "Como en toda compra a distancia en Chile, rige la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores: puedes retractarte de tu compra dentro de los 10 días siguientes a recibir el pedido, escribiéndonos a info@reddelvino.com. Los productos deben estar sin abrir y en su embalaje original.",
          ],
        },
        {
          h: "Cómo funciona un reembolso",
          p: ["Los reembolsos se hacen por el mismo medio de pago que usaste en Flow. El plazo en que se refleja depende de tu banco o tarjeta."],
        },
        {
          h: "¿Dudas?",
          p: ["Escríbenos y te respondemos personalmente: somos una cooperativa pequeña y queremos que quedes conforme."],
        },
      ],
    },
    en: {
      eyebrow: "Help",
      title: "Returns & Exchanges",
      intro: "If something doesn't arrive the way it should, we'll make it right.",
      sections: [
        {
          h: "Damaged or wrong bottle",
          p: [
            `If your order arrives with a broken or damaged bottle, or one different from what you ordered, message us as soon as possible on WhatsApp ${WA} or at info@reddelvino.com with your order number and a photo. We'll offer a replacement or a refund.`,
          ],
        },
        {
          h: "Right of withdrawal",
          p: [
            "As with any distance purchase in Chile, Law No. 19.496 on Consumer Rights applies: you may withdraw from your purchase within 10 days of receiving the order by writing to info@reddelvino.com. Products must be unopened and in their original packaging.",
          ],
        },
        { h: "How refunds work", p: ["Refunds go back through the same payment method you used on Flow. How soon it shows up depends on your bank or card."] },
        { h: "Questions?", p: ["Write to us and we'll answer personally — we're a small cooperative and want you to be happy."] },
      ],
    },
  },
};
