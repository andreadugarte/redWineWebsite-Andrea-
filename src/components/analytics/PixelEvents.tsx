"use client";

import { useEffect } from "react";
import { trackViewContent, trackPurchase } from "@/lib/metaPixel";

/** Fires a Meta ViewContent once when a wine or pack page is shown. */
export function ViewContentPixel({ id, name, price }: { id: string; name: string; price: number }) {
  useEffect(() => {
    trackViewContent({ id, name, price });
  }, [id, name, price]);
  return null;
}

/** Fires a Meta Purchase once when Flow confirms the order as paid. */
export function PurchasePixel({ orderId, value }: { orderId: string; value: number }) {
  useEffect(() => {
    trackPurchase(value, orderId);
  }, [orderId, value]);
  return null;
}
