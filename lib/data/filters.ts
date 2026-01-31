import type { Availability, Feature, Material, SizeClass } from "@/lib/commerce/types";

export interface FacetOption<T extends string = string> {
  value: T;
  label: string;
}

export const materialOptions: FacetOption<Material>[] = [
  { value: "smooth-calfskin", label: "Smooth calfskin" },
  { value: "textured-calfskin", label: "Textured calfskin" },
  { value: "hand-woven", label: "Hand-woven" },
  { value: "suede-lined", label: "Suede lined" },
];

export const sizeOptions: FacetOption<SizeClass>[] = [
  { value: "mini", label: "Mini · phone & keys" },
  { value: "everyday", label: "Everyday · fits a tablet" },
  { value: "large", label: 'Large · fits a 14" laptop' },
];

export type PriceBand = "under-300" | "300-450" | "450-plus";

export const priceOptions: (FacetOption<PriceBand> & { min: number; max: number })[] = [
  { value: "under-300", label: "Under $300", min: 0, max: 299.99 },
  { value: "300-450", label: "$300 – $450", min: 300, max: 449.99 },
  { value: "450-plus", label: "$450 and up", min: 450, max: Number.POSITIVE_INFINITY },
];

export const featureOptions: FacetOption<Feature>[] = [
  { value: "two-straps", label: "Two straps included" },
  { value: "zip-closure", label: "Zip closure" },
  { value: "laptop-sleeve", label: "Laptop sleeve" },
];

export type AvailabilityFilter = Extract<Availability, "in-stock" | "pre-order">;

export const availabilityOptions: FacetOption<AvailabilityFilter>[] = [
  { value: "in-stock", label: "In stock, ships in 1–2 days" },
  { value: "pre-order", label: "Include pre-orders" },
];

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
] as const;

export const PAGE_SIZE = 12;
