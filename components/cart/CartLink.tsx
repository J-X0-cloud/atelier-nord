"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function CartLink() {
  const { totalQuantity } = useCart();

  return (
    <Link className="bag" href="/cart" aria-label={`Bag, ${totalQuantity} items`}>
      Bag <b>{totalQuantity}</b>
    </Link>
  );
}
