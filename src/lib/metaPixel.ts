// Helpers to send Meta standard events from anywhere in the shop.
// All values in CLP. `id` = the product's SKU/slug as used in the shop.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type PixelItem = { id: string; name?: string; price: number; quantity?: number };

const CURRENCY = "CLP";

function newEventId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function send(event: string, params: Record<string, unknown>, eventId?: string) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params, { eventID: eventId ?? newEventId() });
}

function toParams(items: PixelItem[]) {
  return {
    content_ids: items.map((i) => i.id),
    content_type: "product",
    contents: items.map((i) => ({ id: i.id, quantity: i.quantity ?? 1, item_price: i.price })),
    num_items: items.reduce((n, i) => n + (i.quantity ?? 1), 0),
    value: items.reduce((s, i) => s + i.price * (i.quantity ?? 1), 0),
    currency: CURRENCY,
  };
}

/** Product or pack page opened. */
export function trackViewContent(item: PixelItem) {
  send("ViewContent", { ...toParams([item]), content_name: item.name });
}

/** "Añadir al carrito" clicked (shop, packs, quiz result). */
export function trackAddToCart(item: PixelItem) {
  send("AddToCart", { ...toParams([item]), content_name: item.name });
}

/** Checkout started (right before redirecting to Flow). */
export function trackInitiateCheckout(items: PixelItem[]) {
  send("InitiateCheckout", toParams(items));
}

/**
 * Order paid (Flow success / order confirmation page).
 * Pass the order number as `orderId` so a page refresh doesn't count twice.
 */
export function trackPurchase(value: number, orderId: string) {
  const key = `rdv_purchase_${orderId}`;
  try {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
  } catch {}
  send("Purchase", { value, currency: CURRENCY, order_id: orderId }, `purchase-${orderId}`);
}

