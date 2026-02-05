"use client";

import Link from "next/link";
import { CartLineItem } from "./CartLineItem";
import { GiftWrapToggle } from "./GiftWrapToggle";
import { OrderSummary } from "./OrderSummary";
import { ShippingProgress } from "./ShippingProgress";
import { useCart } from "./CartProvider";

export function CartView() {
  const { cart, totalQuantity, error } = useCart();

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="cart-empty">
        <h1 className="h-display">Your bag is empty</h1>
        <p>Every bag ships free over $250 and comes with free lifetime repairs.</p>
        <Link className="btn" href="/collections/all-bags">
          Shop all bags
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div>
        <h1 className="h-display">Your bag</h1>
        <p className="cart-sub">
          {totalQuantity} {totalQuantity === 1 ? "item" : "items"} · reserved for 30 minutes
        </p>
        <ShippingProgress subtotal={cart.cost.subtotal.amount} />
        {error ? (
          <p className="cart-error" role="alert">
            {error}
          </p>
        ) : null}
        {cart.lines.map((line) => (
          <CartLineItem key={line.id} line={line} />
        ))}
        <GiftWrapToggle />
      </div>
      <OrderSummary cart={cart} />
    </div>
  );
}
