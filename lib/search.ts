import type { Product, ProductCardItem } from "@/lib/commerce/types";

const normalise = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Simple colourway search across title, colour, type and materials, so
 * "mane cognac" finds the Måne Hobo in Cognac. Every term must match.
 */
export function searchCatalog(products: Product[], query: string): ProductCardItem[] {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return products.flatMap((product) =>
    product.variants
      .filter((variant) => {
        const haystack = normalise(
          [
            product.title,
            product.subtitle,
            variant.colour.name,
            product.productType,
            ...product.materials,
          ].join(" "),
        );
        return terms.every((term) => haystack.includes(term));
      })
      .map((variant) => ({ product, variant })),
  );
}
