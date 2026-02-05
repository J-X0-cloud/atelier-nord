"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { ProductCardItem, SortKey } from "@/lib/commerce/types";
import { PAGE_SIZE, sortOptions } from "@/lib/data/filters";
import {
  activeFilterCount,
  applyFilters,
  emptyFilters,
  sortItems,
  type FilterKey,
  type FilterState,
} from "@/lib/filters";
import { AppliedFilters } from "./AppliedFilters";
import { FilterPanel } from "./FilterPanel";
import { PromoTile } from "./PromoTile";

interface CollectionBrowserProps {
  items: ProductCardItem[];
  /** Show the Folio promo tile inside the grid (on the main bags collection). */
  showPromo?: boolean;
}

const PROMO_POSITION = 6;

export function CollectionBrowser({ items, showPromo = false }: CollectionBrowserProps) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<SortKey>("featured");
  const [columns, setColumns] = useState<3 | 4>(3);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(
    () => sortItems(applyFilters(items, filters), sort),
    [items, filters, sort],
  );
  const shown = results.slice(0, visible);
  const isFiltered = activeFilterCount(filters) > 0;

  function toggle<K extends FilterKey>(key: K, value: FilterState[K][number]) {
    setVisible(PAGE_SIZE);
    setFilters((current) => {
      const values = current[key] as string[];
      const next = values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
      return { ...current, [key]: next };
    });
  }

  function remove(key: FilterKey, value: string) {
    setVisible(PAGE_SIZE);
    setFilters((current) => ({
      ...current,
      [key]: (current[key] as string[]).filter((v) => v !== value),
    }));
  }

  function clear() {
    setVisible(PAGE_SIZE);
    setFilters(emptyFilters);
  }

  return (
    <>
      <div className="toolbar">
        <div className="l">
          <button
            type="button"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((o) => !o)}
          >
            Filter &amp; sort
          </button>
          <b className="hide-m">
            {results.length} of {items.length} styles
          </b>
        </div>
        <div className="l">
          <label className="hide-m sort">
            Sort:
            <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <b className="view">
            View:{" "}
            {([3, 4] as const).map((count) => (
              <button
                key={count}
                type="button"
                aria-pressed={columns === count}
                className={columns === count ? "on" : undefined}
                onClick={() => setColumns(count)}
              >
                {count}
              </button>
            ))}
          </b>
        </div>
      </div>

      <div className="col-body">
        <div className={clsx("filters-wrap", filtersOpen && "open")}>
          <FilterPanel items={items} filters={filters} onToggle={toggle} />
        </div>
        <div>
          <AppliedFilters filters={filters} onRemove={remove} onClear={clear} />
          {shown.length > 0 ? (
            <ProductGrid
              items={shown}
              columns={columns}
              insert={
                showPromo && !isFiltered && sort === "featured" && shown.length > PROMO_POSITION
                  ? { index: PROMO_POSITION, node: <PromoTile /> }
                  : undefined
              }
            />
          ) : (
            <div className="no-results">
              <p>No bags match those filters yet.</p>
              <button type="button" className="btn ghost" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
          {results.length > 0 ? (
            <div className="more">
              <small>
                You&apos;ve seen {shown.length} of {results.length} styles
              </small>
              <div className="bar">
                <i style={{ width: `${(shown.length / results.length) * 100}%` }} />
              </div>
              {shown.length < results.length ? (
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                >
                  Load more
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
