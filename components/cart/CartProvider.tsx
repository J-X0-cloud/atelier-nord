"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import type { Cart, CartLineAttribute } from "@/lib/commerce/types";

interface AddItemInput {
  variantId: string;
  quantity?: number;
  attributes?: CartLineAttribute[];
}

interface CartContextValue {
  cart: Cart | null;
  totalQuantity: number;
  pending: boolean;
  error: string | null;
  addItem(input: AddItemInput): Promise<boolean>;
  updateQuantity(lineId: string, quantity: number): Promise<boolean>;
  removeLine(lineId: string): Promise<boolean>;
  setGiftWrap(giftWrap: boolean): Promise<boolean>;
  applyDiscount(code: string): Promise<boolean>;
}

const CartContext = createContext<CartContextValue | null>(null);

type Method = "POST" | "PATCH" | "DELETE";

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null;
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const mutate = useCallback(async (method: Method, body: unknown): Promise<boolean> => {
    setError(null);
    try {
      const response = await fetch("/api/cart", {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as { cart?: Cart | null; error?: string };
      if (!response.ok) {
        setError(data.error ?? "Something went wrong with your bag");
        return false;
      }
      startTransition(() => setCart(data.cart ?? null));
      return true;
    } catch {
      setError("We couldn’t reach the store. Check your connection and try again.");
      return false;
    }
  }, []);

  const updateQuantity = useCallback(
    (lineId: string, quantity: number) => {
      // Optimistic: reflect the new quantity immediately, reconcile with the server response.
      setCart((current) =>
        current
          ? {
              ...current,
              lines: current.lines.map((line) =>
                line.id === lineId ? { ...line, quantity } : line,
              ),
            }
          : current,
      );
      return mutate("PATCH", { updates: [{ lineId, quantity }] });
    },
    [mutate],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      totalQuantity: cart?.totalQuantity ?? 0,
      pending,
      error,
      addItem: ({ variantId, quantity = 1, attributes }) =>
        mutate("POST", { lines: [{ variantId, quantity, attributes }] }),
      updateQuantity,
      removeLine: (lineId) => mutate("DELETE", { lineIds: [lineId] }),
      setGiftWrap: (giftWrap) => mutate("PATCH", { giftWrap }),
      applyDiscount: (discountCode) => mutate("PATCH", { discountCode }),
    }),
    [cart, pending, error, mutate, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
