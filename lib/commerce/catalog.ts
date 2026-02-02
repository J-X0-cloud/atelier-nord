import type { Colour, Product, ProductCardItem, ProductVariant, StoreImage } from "./types";

export function getVariant(product: Product, variantId: string): ProductVariant | undefined {
  return product.variants.find((variant) => variant.id === variantId);
}

export function getDefaultVariant(product: Product): ProductVariant {
  return getVariant(product, product.defaultVariantId) ?? product.variants[0]!;
}

export function findVariantByColour(product: Product, colourId: string | undefined) {
  return product.variants.find((variant) => variant.colour.id === colourId);
}

/** Colourways without their own photography borrow the default packshots. */
export function variantImages(
  product: Product,
  variant: ProductVariant,
): {
  image: StoreImage;
  hoverImage: StoreImage;
} {
  const fallback = getDefaultVariant(product);
  const image = variant.image ?? fallback.image!;
  const hoverImage = variant.hoverImage ?? fallback.hoverImage ?? image;
  return {
    image: variant.image
      ? image
      : { ...image, altText: `${product.title} in ${variant.colour.name}` },
    hoverImage,
  };
}

/**
 * Swatches for a grid card: the card's own colour first, then the rest of the
 * family, capped so the row never wraps. Returns how many were left out.
 */
export function cardSwatches(
  item: ProductCardItem,
  max = 4,
): { swatches: (Colour & { active: boolean })[]; overflow: number } {
  const ordered = [
    item.variant,
    ...item.product.variants.filter((variant) => variant.id !== item.variant.id),
  ];
  return {
    swatches: ordered
      .slice(0, max)
      .map((variant) => ({ ...variant.colour, active: variant.id === item.variant.id })),
    overflow: Math.max(0, ordered.length - max),
  };
}

export function productUrl(product: Pick<Product, "handle">, variant?: ProductVariant): string {
  return variant
    ? `/products/${product.handle}?color=${variant.colour.id}`
    : `/products/${product.handle}`;
}

export function availabilityLabel(variant: ProductVariant): string {
  switch (variant.availability) {
    case "pre-order":
      return "Pre-order · ships in 4–6 weeks";
    case "sold-out":
      return "Sold out";
    default:
      return variant.quantityAvailable !== undefined && variant.quantityAvailable <= 5
        ? `Only ${variant.quantityAvailable} left · ships today`
        : "In stock · ships today";
  }
}
