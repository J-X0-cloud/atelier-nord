"use client";

import type { ProductCardItem } from "@/lib/commerce/types";
import { colours, colourFacetOrder } from "@/lib/data/colours";
import {
  availabilityOptions,
  featureOptions,
  materialOptions,
  priceOptions,
  sizeOptions,
} from "@/lib/data/filters";
import { facetCount, type FilterKey, type FilterState } from "@/lib/filters";
import { FilterCheckbox } from "./FilterCheckbox";

interface FilterPanelProps {
  items: ProductCardItem[];
  filters: FilterState;
  onToggle<K extends FilterKey>(key: K, value: FilterState[K][number]): void;
}

export function FilterPanel({ items, filters, onToggle }: FilterPanelProps) {
  const has = <K extends FilterKey>(key: K, value: FilterState[K][number]) =>
    (filters[key] as string[]).includes(value);

  return (
    <aside className="filters" aria-label="Filters">
      <details open>
        <summary>Color</summary>
        <div className="dots">
          {colourFacetOrder.map((id) => {
            const colour = colours[id];
            const active = has("colours", id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => onToggle("colours", id)}
              >
                <i className={active ? "on" : undefined} style={{ background: colour.hex }} />
                {colour.name}
              </button>
            );
          })}
        </div>
      </details>

      <details open>
        <summary>Leather</summary>
        <div className="opts">
          {materialOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={has("materials", option.value)}
              count={facetCount(items, filters, "materials", option.value)}
              onChange={() => onToggle("materials", option.value)}
            />
          ))}
        </div>
      </details>

      <details open>
        <summary>Size</summary>
        <div className="opts">
          {sizeOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={has("sizes", option.value)}
              count={facetCount(items, filters, "sizes", option.value)}
              onChange={() => onToggle("sizes", option.value)}
            />
          ))}
        </div>
      </details>

      <details open>
        <summary>Price</summary>
        <div className="opts">
          {priceOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={has("prices", option.value)}
              count={facetCount(items, filters, "prices", option.value)}
              onChange={() => onToggle("prices", option.value)}
            />
          ))}
        </div>
      </details>

      <details>
        <summary>Features</summary>
        <div className="opts">
          {featureOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={has("features", option.value)}
              onChange={() => onToggle("features", option.value)}
            />
          ))}
        </div>
      </details>

      <details>
        <summary>Availability</summary>
        <div className="opts">
          {availabilityOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={has("availability", option.value)}
              onChange={() => onToggle("availability", option.value)}
            />
          ))}
        </div>
      </details>
    </aside>
  );
}
