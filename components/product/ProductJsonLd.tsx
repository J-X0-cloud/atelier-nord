import { site } from "@/lib/data/site";
import type { Product } from "@/lib/commerce/types";

const availabilitySchema = {
  "in-stock": "https://schema.org/InStock",
  "pre-order": "https://schema.org/PreOrder",
  "sold-out": "https://schema.org/OutOfStock",
} as const;

export function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: product.title,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    productGroupID: product.id,
    variesBy: ["https://schema.org/color"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.reviews.average,
      reviewCount: product.reviews.count,
    },
    hasVariant: product.variants.map((variant) => ({
      "@type": "Product",
      sku: variant.sku,
      color: variant.colour.name,
      image: variant.image ? new URL(variant.image.url, site.url).toString() : undefined,
      offers: {
        "@type": "Offer",
        price: variant.price.amount,
        priceCurrency: variant.price.currencyCode,
        availability: availabilitySchema[variant.availability],
        url: `${site.url}/products/${product.handle}?color=${variant.colour.id}`,
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
