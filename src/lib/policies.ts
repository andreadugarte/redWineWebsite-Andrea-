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

export const POLICIES: Record<PolicyKey, { en: Policy; es: Policy; pt: Policy; zh: Policy }> = {
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
    pt: {
      eyebrow: "Ajuda",
      title: "Envios",
      intro: "Enviamos de Santa Cruz, no Vale de Colchagua. Veja como funciona.",
      sections: [
        { h: "Frete grátis para Santiago", p: ["Pedidos de 6 garrafas ou mais com destino a Santiago têm frete grátis. No carrinho você vê quantas garrafas faltam."] },
        {
          h: "Outros pedidos e destinos",
          p: [
            "Enviamos com a Blue Express. Para pedidos com menos de 6 garrafas, ou com destino fora de Santiago, confirmamos o valor e o prazo do frete por e-mail ou WhatsApp antes de despachar, para que não haja surpresas.",
            `Quer saber antes de comprar? Escreva no WhatsApp ${WA} ou para info@reddelvino.com com sua região e as garrafas que lhe interessam.`,
          ],
        },
        { h: "Acompanhamento", p: ["Quando seu pedido sai da vinícola, avisamos por e-mail ou WhatsApp. Se tiver dúvidas sobre onde ele está, escreva com seu número de pedido."] },
        { h: "Retirada em Santa Cruz", p: ["Você também pode retirar seu pedido em nossa loja: Av. Diego Portales 957, Santa Cruz. Avise-nos antes para deixarmos tudo pronto."] },
        { h: "Entrega a maiores de 18 anos", p: ["Por se tratar de bebidas alcoólicas, a entrega é apenas para pessoas com 18 anos ou mais, que podem ser solicitadas a mostrar documento na entrega."] },
        { h: "Envios para fora do Chile", p: ["Por enquanto não fazemos envios internacionais de forma regular. Se tiver interesse, escreva e avaliaremos seu caso."] },
      ],
    },
    zh: {
      eyebrow: "帮助",
      title: "配送",
      intro: "我们从科尔查瓜山谷的圣克鲁斯发货。流程如下。",
      sections: [
        { h: "圣地亚哥免费配送", p: ["订购6瓶或以上并送至圣地亚哥,即可享受免费配送。购物车会显示您还差几瓶。"] },
        {
          h: "其他订单与地区",
          p: [
            "我们使用 Blue Express 发货。不足6瓶或送往圣地亚哥以外的订单,我们会在发货前通过邮件或 WhatsApp 向您确认运费和时效,绝不让您意外多付。",
            `想在购买前了解?请通过 WhatsApp ${WA} 或 info@reddelvino.com 告知您所在地区和想购买的酒款。`,
          ],
        },
        { h: "物流跟踪", p: ["订单从酒庄发出时,我们会通过邮件或 WhatsApp 通知您。如想了解包裹位置,请提供订单号联系我们。"] },
        { h: "圣克鲁斯门店自提", p: ["您也可以到我们的门店自提:Av. Diego Portales 957, Santa Cruz。请提前告知,以便我们备好。"] },
        { h: "仅限年满18周岁者收货", p: ["由于属于酒精饮品,仅向年满18周岁的人员配送,收货时可能需要出示身份证件。"] },
        { h: "智利境外配送", p: ["目前我们尚未常规提供国际配送。如有需要,请联系我们,我们会评估您的情况。"] },
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
    pt: {
      eyebrow: "Ajuda",
      title: "Trocas e devoluções",
      intro: "Se algo não chegar como deveria, resolvemos.",
      sections: [
        {
          h: "Garrafa danificada ou errada",
          p: [`Se seu pedido chegar com uma garrafa quebrada, danificada ou diferente da que você pediu, escreva o quanto antes no WhatsApp ${WA} ou para info@reddelvino.com com seu número de pedido e uma foto. Ofereceremos a reposição ou o reembolso.`],
        },
        {
          h: "Direito de arrependimento",
          p: ["Como em toda compra a distância no Chile, aplica-se a Lei nº 19.496 de Proteção dos Direitos dos Consumidores: você pode desistir da compra em até 10 dias após receber o pedido, escrevendo para info@reddelvino.com. Os produtos devem estar lacrados e na embalagem original."],
        },
        { h: "Como funcionam os reembolsos", p: ["Os reembolsos são feitos pelo mesmo meio de pagamento usado no Flow. O prazo para aparecer depende do seu banco ou cartão."] },
        { h: "Dúvidas?", p: ["Escreva e responderemos pessoalmente: somos uma cooperativa pequena e queremos que você fique satisfeito."] },
      ],
    },
    zh: {
      eyebrow: "帮助",
      title: "退换货",
      intro: "如果收到的商品有问题,我们会妥善处理。",
      sections: [
        {
          h: "酒瓶破损或发错",
          p: [`如果您的订单中有酒瓶破裂、受损或与所订不符,请尽快通过 WhatsApp ${WA} 或 info@reddelvino.com 联系我们,并提供订单号和照片。我们将为您补发或退款。`],
        },
        {
          h: "撤销购买权",
          p: ["与智利所有远程购物一样,适用第19.496号《消费者权益保护法》:您可在收到订单后10天内,发送邮件至 info@reddelvino.com 撤销购买。商品须未开封且保留原包装。"],
        },
        { h: "退款方式", p: ["退款将原路退回您在 Flow 使用的支付方式。到账时间取决于您的银行或银行卡。"] },
        { h: "有疑问?", p: ["请联系我们,我们会亲自回复 — 我们是一家小型合作社,希望您满意。"] },
      ],
    },
  },
};
