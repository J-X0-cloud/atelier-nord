import clsx from "clsx";
import { Fragment, type ReactNode } from "react";
import type { ProductCardItem } from "@/lib/commerce/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  items: ProductCardItem[];
  columns?: 3 | 4;
  /** Editorial tile placed before the card at `index` (it spans two columns). */
  insert?: { index: number; node: ReactNode };
}

export function ProductGrid({ items, columns = 4, insert }: ProductGridProps) {
  return (
    <div className={clsx("grid", columns === 3 && "g3")}>
      {items.map((item, index) => (
        <Fragment key={item.variant.id}>
          {insert && insert.index === index ? insert.node : null}
          <ProductCard item={item} priority={index < 4} />
        </Fragment>
      ))}
    </div>
  );
}
