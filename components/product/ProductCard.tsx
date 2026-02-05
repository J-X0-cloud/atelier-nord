import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { cardSwatches, productUrl, variantImages } from "@/lib/commerce/catalog";
import { formatPrice } from "@/lib/commerce/money";
import type { ProductCardItem } from "@/lib/commerce/types";

interface ProductCardProps {
  item: ProductCardItem;
  priority?: boolean;
}

/**
 * Grid tile for one colourway. Hovering swaps to the alternate view; the
 * swatch row shows the rest of the family so shoppers can see the range
 * without leaving the grid.
 */
export function ProductCard({ item, priority = false }: ProductCardProps) {
  const { product, variant } = item;
  const { image, hoverImage } = variantImages(product, variant);
  const { swatches, overflow } = cardSwatches(item);

  return (
    <Link className="pc" href={productUrl(product, variant)}>
      <div className="ph">
        {variant.badge ? (
          <span className={clsx("badge", variant.badge.tone === "dark" && "dk")}>
            {variant.badge.label}
          </span>
        ) : null}
        <Image
          className="main"
          src={image.url}
          alt={image.altText}
          width={image.width}
          height={image.height}
          sizes="(max-width: 860px) 50vw, 25vw"
          priority={priority}
        />
        <Image
          className="alt"
          src={hoverImage.url}
          alt=""
          width={hoverImage.width}
          height={hoverImage.height}
          sizes="(max-width: 860px) 50vw, 25vw"
        />
        <span className="quick">Quick add</span>
      </div>
      <div className="info">
        <div>
          <div className="nm">{product.title}</div>
          <div className="cl">{variant.colour.name}</div>
        </div>
        <div className="pr">{formatPrice(variant.price)}</div>
      </div>
      <div className="sw">
        {swatches.map((swatch) => (
          <i
            key={swatch.id}
            className={swatch.active ? "on" : undefined}
            style={{ background: swatch.hex }}
            title={swatch.name}
          />
        ))}
        {overflow > 0 ? <em>+{overflow}</em> : null}
      </div>
    </Link>
  );
}
