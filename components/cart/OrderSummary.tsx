"use client";

import { Icon } from "@/components/ui/Icon";
import { formatAmount } from "@/lib/commerce/money";
import { orderSummary } from "@/lib/commerce/shipping";
import type { Cart } from "@/lib/commerce/types";
import { PromoCodeForm } from "./PromoCodeForm";

const assurances = [
  { icon: "lock", text: "Encrypted, secure checkout" },
  { icon: "return", text: "Free returns within 30 days" },
  { icon: "repair", text: "Free lifetime repairs included" },
] as const;

export function OrderSummary({ cart }: { cart: Cart }) {
  const summary = orderSummary(cart);

  return (
    <aside className="summary">
      <h2>Order summary</h2>
      <div className="r">
        <span>Subtotal</span>
        <span>{formatAmount(summary.subtotal)}</span>
      </div>
      {summary.discount.amount > 0 ? (
        <div className="r">
          <span>Discount</span>
          <span>−{formatAmount(summary.discount)}</span>
        </div>
      ) : null}
      <div className="r">
        <span>Shipping</span>
        <span>{summary.shipping.amount === 0 ? "Free" : formatAmount(summary.shipping)}</span>
      </div>
      <div className="r muted">
        <span>Estimated tax</span>
        <span>At checkout</span>
      </div>
      <div className="r tot">
        <span>Total</span>
        <span>{formatAmount(summary.total)} USD</span>
      </div>
      <p className="instalments">
        Or 4 interest-free payments of {formatAmount(summary.instalment)}
      </p>
      <a className="btn" href={cart.checkoutUrl}>
        Secure checkout
      </a>
      <div className="express">
        <span>Express pay</span>
        <span>Pay in 4</span>
      </div>
      <PromoCodeForm />
      <div className="assure">
        {assurances.map((item) => (
          <div key={item.text}>
            <Icon name={item.icon} />
            {item.text}
          </div>
        ))}
      </div>
    </aside>
  );
}
