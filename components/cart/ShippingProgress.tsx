import { formatPrice } from "@/lib/commerce/money";
import { DISPATCH_CUTOFF, shippingProgress } from "@/lib/commerce/shipping";

export function ShippingProgress({ subtotal }: { subtotal: number }) {
  const { unlocked, remaining, progress } = shippingProgress(subtotal);

  return (
    <div className="ship-bar">
      {unlocked ? (
        <>
          You&apos;ve unlocked <b>free US shipping</b>. Order by {DISPATCH_CUTOFF} to ship today.
        </>
      ) : (
        <>
          You&apos;re <b>{formatPrice(remaining)}</b> away from free US shipping.
        </>
      )}
      <div
        className="track"
        role="progressbar"
        aria-label="Progress to free shipping"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <i style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
