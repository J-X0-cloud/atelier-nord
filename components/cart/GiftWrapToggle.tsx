"use client";

import { useCart } from "./CartProvider";

export function GiftWrapToggle() {
  const { cart, setGiftWrap } = useCart();
  const checked = cart?.giftWrap ?? false;

  return (
    <label className="gift">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(event) => setGiftWrap(event.target.checked)}
      />
      <span className={checked ? "box on" : "box"} aria-hidden="true" />
      <div>
        Add gift wrapping and a handwritten note — free
        <p>Wrapped in undyed cotton and tied with a leather offcut from your bag&apos;s hide.</p>
      </div>
    </label>
  );
}
