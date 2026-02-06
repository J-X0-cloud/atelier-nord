import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryChips } from "@/components/collection/CategoryChips";
import { CollectionBrowser } from "@/components/collection/CollectionBrowser";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PromiseStrip } from "@/components/ui/PromiseStrip";
import { storefront } from "@/lib/commerce";
import type { Collection } from "@/lib/commerce/types";
import { categoryRail } from "@/lib/data/collections";
import { collectionPromises } from "@/lib/data/home";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const collections = await storefront.getCollections();
  return collections.map((collection) => ({ handle: collection.handle }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const collection = await storefront.getCollection((await params).handle);
  if (!collection) return {};
  return {
    title: collection.seo.title,
    description: collection.seo.description,
    alternates: { canonical: `/collections/${collection.handle}` },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const [collection, collections] = await Promise.all([
    storefront.getCollection(handle),
    storefront.getCollections(),
  ]);
  if (!collection) notFound();

  const rail = categoryRail
    .map((railHandle) => collections.find((c) => c.handle === railHandle))
    .filter((c): c is Collection => c !== undefined);
  const isCategory = handle !== "all-bags" && rail.some((c) => c.handle === handle);

  return (
    <>
      <div className="wrap">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            ...(isCategory ? [{ label: "Bags", href: "/collections/all-bags" }] : []),
            { label: handle === "all-bags" ? "Bags" : collection.title },
          ]}
        />
        <div className="col-hero">
          <h1 className="h-display">{collection.title}</h1>
          <p>{collection.description}</p>
        </div>
        <CategoryChips collections={rail} active={handle} />
        {collection.items.length > 0 ? (
          <CollectionBrowser items={collection.items} showPromo={handle === "all-bags"} />
        ) : (
          <div className="no-results">
            <p>
              New small goods are on their way from the workshop. Join the Nord letter to hear
              first.
            </p>
          </div>
        )}
      </div>
      <PromiseStrip items={collectionPromises} style={{ marginTop: 64 }} />
    </>
  );
}
