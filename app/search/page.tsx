import type { Metadata } from "next";
import Form from "next/form";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { storefront } from "@/lib/commerce";
import { searchCatalog } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = ((await searchParams).q ?? "").trim();
  const results = query ? searchCatalog(await storefront.getProducts(), query) : [];

  return (
    <div className="wrap search-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <div className="col-hero">
        <h1 className="h-display">Search</h1>
        <Form action="/search" className="search-form">
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Try “folio”, “tote” or “cognac”"
            aria-label="Search the store"
          />
          <button type="submit">Search</button>
        </Form>
      </div>
      {query ? (
        <p className="search-count">
          {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
        </p>
      ) : null}
      {results.length > 0 ? <ProductGrid items={results} /> : null}
    </div>
  );
}
