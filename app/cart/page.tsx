import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { ProductRail } from "@/components/product/ProductRail";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { storefront } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Your bag",
  description:
    "Review your Atelier Nord bag. Free US shipping over $250, 30-day returns and free lifetime repairs.",
  robots: { index: false },
};

export default async function CartPage() {
  const recommendations = await storefront.getRecommendations("cart", 4);

  return (
    <>
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Your bag" }]} />
        <CartView />
      </div>
      <ProductRail
        className="sec sec-tight"
        eyebrow="Small goods & companions"
        title="You might also like"
        link={{ href: "/collections/all-bags", label: "Keep shopping" }}
        items={recommendations}
      />
    </>
  );
}
