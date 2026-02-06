import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductJsonLd } from "@/components/product/ProductJsonLd";
import { ProductRail } from "@/components/product/ProductRail";
import { ProductView } from "@/components/product/ProductView";
import { ReviewSection } from "@/components/product/ReviewSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { storefront } from "@/lib/commerce";
import { findVariantByColour, getDefaultVariant } from "@/lib/commerce/catalog";
import type { ProductType } from "@/lib/commerce/types";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ color?: string | string[] }>;
}

const typeCollection: Record<ProductType, { handle: string; label: string }> = {
  shoulder: { handle: "shoulder", label: "Shoulder" },
  tote: { handle: "totes", label: "Totes" },
  crossbody: { handle: "crossbody", label: "Crossbody" },
  "top-handle": { handle: "top-handle", label: "Top handle" },
  baguette: { handle: "baguettes", label: "Baguettes" },
  woven: { handle: "woven", label: "Woven" },
  hobo: { handle: "hobo", label: "Hobo" },
};

export async function generateStaticParams() {
  const products = await storefront.getProducts();
  return products.map((product) => ({ handle: product.handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await storefront.getProduct((await params).handle);
  if (!product) return {};
  const image = getDefaultVariant(product).image;
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: image
      ? { images: [{ url: image.url, width: image.width, height: image.height }] }
      : undefined,
  };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const [{ handle }, { color }] = await Promise.all([params, searchParams]);
  const product = await storefront.getProduct(handle);
  if (!product) notFound();

  const requested = findVariantByColour(product, Array.isArray(color) ? color[0] : color);
  const variant = requested ?? getDefaultVariant(product);
  const category = typeCollection[product.productType];
  const recommendations = await storefront.getRecommendations(product.handle, 4);

  return (
    <>
      <ProductJsonLd product={product} />
      <div className="wrap">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Bags", href: "/collections/all-bags" },
            { label: category.label, href: `/collections/${category.handle}` },
            { label: product.title },
          ]}
        />
        <ProductView
          key={product.handle}
          product={product}
          initialVariantId={variant.id}
          details={<ProductDetails product={product} />}
        />
      </div>

      <ProductRail
        eyebrow="Pairs well with"
        title="Complete the set"
        link={{ href: "/collections/all-bags", label: "Shop all" }}
        items={recommendations}
      />
      <ReviewSection product={product} />
    </>
  );
}
