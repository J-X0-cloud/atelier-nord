import type { MetadataRoute } from "next";
import { storefront } from "@/lib/commerce";
import { infoPages } from "@/lib/data/pages";
import { site } from "@/lib/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([
    storefront.getProducts(),
    storefront.getCollections(),
  ]);

  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...collections.map((collection) => ({
      url: `${site.url}/collections/${collection.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${site.url}/products/${product.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...infoPages.map((page) => ({
      url: `${site.url}/pages/${page.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
