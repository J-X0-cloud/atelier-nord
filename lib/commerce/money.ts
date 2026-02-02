import type { Money } from "./types";

const whole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const cents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

/** "$440" — used on product cards and buttons. */
export function formatPrice(money: Money | number): string {
  return whole.format(typeof money === "number" ? money : money.amount);
}

/** "$730.00" — used in the order summary. */
export function formatAmount(money: Money | number): string {
  return cents.format(typeof money === "number" ? money : money.amount);
}

export function money(amount: number): Money {
  return { amount: Math.round(amount * 100) / 100, currencyCode: "USD" };
}
