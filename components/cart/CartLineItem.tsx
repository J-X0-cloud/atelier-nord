"use client";

import Image from "next/image";
import Link from "next/link";
import { availabilityLabel, productUrl } from "@/lib/commerce/catalog";
import { formatPrice } from "@/lib/commerce/money";
import type { CartLine } from "@/lib/commerce/types";
import { QuantityStepper } from "./QuantityStepper";
import { useCart } from "./CartProvider";

export function CartLineItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeLine } = useCart();
  const { product, variant } = line.merchandise;
  const href = productUrl(product, variant);
  const image = variant.image;

  return (
    <div className="line">
      <Link className="thumb" href={href}>
        {image ? (
          <Image
            src={image.url}
            alt={`${product.title} in ${variant.colour.name}`}
            width={image.width}
            height={image.height}
            sizes="132px"
          />
        ) : (
          <span className="thumb-swatch" style={{ background: variant.colour.hex }} />
        )}
      </Link>
      <div>
        <h3>
          <Link href={href}>{product.title}</Link>
        </h3>
        <div className="meta">
          <span>Color: {variant.colour.name}</span>
          <span>{product.cartNote}</span>
          {line.attributes.map((attribute) => (
            <span key={attribute.key}>
              {attribute.key}: {attribute.value}
            </span>
          ))}
          <span className={variant.availability === "in-stock" ? "ok" : undefined}>
            {availabilityLabel(variant)}
          </span>
        </div>
        <div className="acts">
          <QuantityStepper
            value={line.quantity}
            max={variant.quantityAvailable ?? 10}
            label={product.title}
            onChange={(quantity) => updateQuantity(line.id, quantity)}
          />
          <button type="button" className="text-btn" onClick={() => removeLine(line.id)}>
            Remove
          </button>
        </div>
      </div>
      <div className="lp">
        {formatPrice(line.cost.total)}
        {line.quantity > 1 ? <small>{formatPrice(variant.price)} each</small> : null}
      </div>
    </div>
  );
}
