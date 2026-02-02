import type {
  ColourId,
  Feature,
  Material,
  ProductCardItem,
  SizeClass,
  SortKey,
} from "@/lib/commerce/types";
import { type AvailabilityFilter, type PriceBand, priceOptions } from "@/lib/data/filters";

export interface FilterState {
  colours: ColourId[];
  materials: Material[];
  sizes: SizeClass[];
  prices: PriceBand[];
  features: Feature[];
  availability: AvailabilityFilter[];
}

export type FilterKey = keyof FilterState;

export const emptyFilters: FilterState = {
  colours: [],
  materials: [],
  sizes: [],
  prices: [],
  features: [],
  availability: [],
};

function priceBand(amount: number): PriceBand | undefined {
  return priceOptions.find((band) => amount >= band.min && amount <= band.max)?.value;
}

function matches(item: ProductCardItem, filters: FilterState, skip?: FilterKey): boolean {
  const { product, variant } = item;
  const any = <T>(selected: T[], test: (value: T) => boolean) =>
    selected.length === 0 || selected.some(test);

  return (
    (skip === "colours" || any(filters.colours, (c) => variant.colour.id === c)) &&
    (skip === "materials" || any(filters.materials, (m) => product.materials.includes(m))) &&
    (skip === "sizes" || any(filters.sizes, (s) => product.size === s)) &&
    (skip === "prices" || any(filters.prices, (p) => priceBand(variant.price.amount) === p)) &&
    // Features narrow the list: every ticked feature must be present.
    (skip === "features" || filters.features.every((f) => product.features.includes(f))) &&
    (skip === "availability" || matchesAvailability(item, filters.availability))
  );
}

function matchesAvailability(item: ProductCardItem, selected: AvailabilityFilter[]): boolean {
  if (selected.length === 0) return item.variant.availability !== "sold-out";
  return selected.includes(item.variant.availability as AvailabilityFilter);
}

export function applyFilters(items: ProductCardItem[], filters: FilterState): ProductCardItem[] {
  return items.filter((item) => matches(item, filters));
}

/**
 * How many results each option would return, given every *other* active
 * facet. This keeps counts honest without collapsing a facet to zero the
 * moment one of its own values is ticked.
 */
export function facetCount<K extends Exclude<FilterKey, "availability">>(
  items: ProductCardItem[],
  filters: FilterState,
  key: K,
  value: FilterState[K][number],
): number {
  const probe = { ...filters, [key]: [value] } as FilterState;
  return items.filter((item) => matches(item, probe)).length;
}

export function sortItems(items: ProductCardItem[], sort: SortKey): ProductCardItem[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.variant.price.amount - b.variant.price.amount);
    case "price-desc":
      return sorted.sort((a, b) => b.variant.price.amount - a.variant.price.amount);
    case "newest":
      return sorted.sort((a, b) => b.product.createdAt.localeCompare(a.product.createdAt));
    default:
      return sorted;
  }
}

export function activeFilterCount(filters: FilterState): number {
  return Object.values(filters).reduce((sum, values) => sum + values.length, 0);
}
