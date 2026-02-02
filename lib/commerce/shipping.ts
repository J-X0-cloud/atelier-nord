import type { Cart } from "./types";
import { money } from "./money";

export const FREE_SHIPPING_THRESHOLD = 250;
export const STANDARD_SHIPPING_RATE = 12;
export const PAY_IN_FOUR_INSTALMENTS = 4;
export const DISPATCH_CUTOFF = "2pm CT";

export interface ShippingProgress {
  unlocked: boolean;
  remaining: number;
  /** 0–1, for the progress bar. */
  progress: number;
}

export function shippingProgress(subtotal: number): ShippingProgress {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  return {
    unlocked: remaining === 0 && subtotal > 0,
    remaining,
    progress: Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD),
  };
}

export function shippingCost(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_RATE;
}

/** Instalment amount for interest-free pay-in-4. */
export function payInFour(amount: number): number {
  return Math.round((amount / PAY_IN_FOUR_INSTALMENTS) * 100) / 100;
}

export function orderSummary(cart: Cart) {
  const subtotal = cart.cost.subtotal.amount;
  const discount = cart.cost.discount.amount;
  const shipping = shippingCost(subtotal - discount);
  const total = subtotal - discount + shipping;
  return {
    subtotal: money(subtotal),
    discount: money(discount),
    shipping: money(shipping),
    total: money(total),
    instalment: money(payInFour(total)),
  };
}
