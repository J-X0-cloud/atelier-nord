import { FolioFeature } from "@/components/home/FolioFeature";
import { Hero } from "@/components/home/Hero";
import { JournalGrid } from "@/components/home/JournalGrid";
import { ShapeTiles } from "@/components/home/ShapeTiles";
import { StoreReviews } from "@/components/home/StoreReviews";
import { ProductRail } from "@/components/product/ProductRail";
import { PromiseStrip } from "@/components/ui/PromiseStrip";
import { storefront } from "@/lib/commerce";
import { formatPrice } from "@/lib/commerce/money";
import { shapeTiles } from "@/lib/data/collections";
import { homePromises } from "@/lib/data/home";

export default async function HomePage() {
  const [allBags, bestsellers, folio, ...shapes] = await Promise.all([
    storefront.getCollection("all-bags"),
    storefront.getCollection("bestsellers"),
    storefront.getProduct("folio-shoulder-bag"),
    ...shapeTiles.map((tile) => storefront.getCollection(tile.handle)),
  ]);

  const counts = Object.fromEntries(
    shapes.flatMap((collection) =>
      collection ? [[collection.handle, collection.items.length]] : [],
    ),
  );

  return (
    <>
      <Hero price={folio ? formatPrice(folio.variants[0]!.price) : "$440"} />
      <ShapeTiles totalStyles={allBags?.items.length ?? 0} counts={counts} />
      <ProductRail
        className="sec sec-flush"
        eyebrow="Most carried"
        title="Bestsellers"
        link={{ href: "/collections/bestsellers", label: "Shop bestsellers" }}
        items={bestsellers?.items ?? []}
      />
      {folio ? <FolioFeature product={folio} /> : null}
      <PromiseStrip items={homePromises} />
      <StoreReviews />
      <JournalGrid />
    </>
  );
}
