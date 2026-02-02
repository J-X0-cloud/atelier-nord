import { cookies } from "next/headers";
import { storefront } from "@/lib/commerce";
import type { Cart } from "@/lib/commerce/types";

export const CART_COOKIE = "an_cart";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

export async function getCartId(): Promise<string | undefined> {
  return (await cookies()).get(CART_COOKIE)?.value;
}

export async function setCartId(cartId: string): Promise<void> {
  (await cookies()).set(CART_COOKIE, cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: THIRTY_DAYS,
  });
}

/** The visitor's cart, if they have one that still exists. */
export async function getCurrentCart(): Promise<Cart | undefined> {
  const cartId = await getCartId();
  return cartId ? storefront.getCart(cartId) : undefined;
}

/** Returns the visitor's cart, creating (and remembering) one if needed. */
export async function getOrCreateCart(): Promise<Cart> {
  const existing = await getCurrentCart();
  if (existing) return existing;
  const cart = await storefront.createCart();
  await setCartId(cart.id);
  return cart;
}
