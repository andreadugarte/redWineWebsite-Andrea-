import Link from "next/link";
import { getFlowStatus } from "@/lib/flow";
import { formatPrice } from "@/components/cart/CartProvider";
import { PaymentBadges } from "@/components/trust/PaymentBadges";
import { t, localizedPath, isLocale, type Locale } from "@/lib/i18n";

/** Flow's `urlReturn` target — the customer's browser lands here after paying. */
export default async function CheckoutReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; lang?: string }>;
}) {
  const { token, lang } = await searchParams;
  const locale: Locale = isLocale(lang) ? lang : "es";
  const tr = (k: string) => t(k, locale);

  let status: Awaited<ReturnType<typeof getFlowStatus>> | null = null;
  let lookupFailed = false;
  if (token) {
    try {
      status = await getFlowStatus(token);
    } catch {
      lookupFailed = true;
    }
  }

  const paid = status?.status === 2;
  const rejected = status?.status === 3 || status?.status === 4;

  const heading =
    !token || lookupFailed ? tr("checkout.r.cant") : paid ? tr("checkout.thanks") : rejected ? tr("checkout.r.notDone") : tr("checkout.r.pending");

  const body = !token
    ? tr("checkout.r.noRef")
    : lookupFailed
      ? tr("checkout.r.lookup")
      : paid
        ? `${tr("checkout.order")} ${status!.commerceOrder} ${tr("checkout.r.paidBody")}`
        : rejected
          ? `${tr("checkout.order")} ${status!.commerceOrder} ${tr("checkout.r.notDoneBody")}`
          : `${tr("checkout.order")} ${status!.commerceOrder} ${tr("checkout.r.pendingBody")}`;

  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow">{paid ? tr("checkout.confirmed") : tr("checkout.eyebrow")}</p>
      <h1 className="mt-4 font-serif text-display-md font-light">{heading}</h1>
      <p className="mt-4 font-sans text-sm text-charcoal-soft">{body}</p>
      {status && <p className="mt-2 font-sans text-sm text-charcoal-soft">{formatPrice(status.amount, status.currency)}</p>}
      <p className="mt-6 max-w-md font-sans text-xs text-charcoal/60">{tr("checkout.help")}</p>
      <Link href={localizedPath("/wines", locale)} className="btn-primary mt-10">
        {tr("checkout.continue")}
      </Link>
      <PaymentBadges className="mt-8 justify-center" />
    </div>
  );
}
