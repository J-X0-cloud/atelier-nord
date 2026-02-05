"use client";

import { colours } from "@/lib/data/colours";
import {
  availabilityOptions,
  featureOptions,
  materialOptions,
  priceOptions,
  sizeOptions,
} from "@/lib/data/filters";
import type { FilterKey, FilterState } from "@/lib/filters";

const labelSources: Record<Exclude<FilterKey, "colours">, { value: string; label: string }[]> = {
  materials: materialOptions,
  sizes: sizeOptions.map((o) => ({ ...o, label: o.label.split(" · ")[0]! })),
  prices: priceOptions,
  features: featureOptions,
  availability: availabilityOptions.map((o) => ({
    ...o,
    label: o.value === "in-stock" ? "In stock" : "Pre-orders",
  })),
};

function labelFor(key: FilterKey, value: string): string {
  if (key === "colours") return colours[value as keyof typeof colours]?.name ?? value;
  return labelSources[key].find((option) => option.value === value)?.label ?? value;
}

interface AppliedFiltersProps {
  filters: FilterState;
  onRemove(key: FilterKey, value: string): void;
  onClear(): void;
}

export function AppliedFilters({ filters, onRemove, onClear }: AppliedFiltersProps) {
  const applied = (Object.keys(filters) as FilterKey[]).flatMap((key) =>
    (filters[key] as string[]).map((value) => ({ key, value })),
  );
  if (applied.length === 0) return null;

  return (
    <div className="applied">
      {applied.map(({ key, value }) => (
        <button key={`${key}-${value}`} type="button" onClick={() => onRemove(key, value)}>
          {labelFor(key, value)} ×
        </button>
      ))}
      <button type="button" className="clear" onClick={onClear}>
        Clear all
      </button>
    </div>
  );
}
