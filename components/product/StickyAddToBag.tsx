"use client";

import clsx from "clsx";

interface StickyAddToBagProps {
  visible: boolean;
  title: string;
  colour: string;
  price: string;
  disabled: boolean;
  onAdd(): void;
}

/** Mobile-only bar that takes over once the main add-to-bag row scrolls away. */
export function StickyAddToBag({
  visible,
  title,
  colour,
  price,
  disabled,
  onAdd,
}: StickyAddToBagProps) {
  return (
    <div className={clsx("sticky-buy", visible && "show")} aria-hidden={!visible}>
      <div>
        <b>{title}</b>
        {colour} · {price}
      </div>
      <button
        type="button"
        className="btn"
        onClick={onAdd}
        disabled={disabled}
        tabIndex={visible ? 0 : -1}
      >
        Add to bag
      </button>
    </div>
  );
}
