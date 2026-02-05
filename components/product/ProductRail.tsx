import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProductCardItem } from "@/lib/commerce/types";
import { ProductGrid } from "./ProductGrid";

interface ProductRailProps {
  eyebrow: string;
  title: string;
  link: { href: string; label: string };
  items: ProductCardItem[];
  className?: string;
  id?: string;
}

export function ProductRail({
  eyebrow,
  title,
  link,
  items,
  className = "sec",
  id,
}: ProductRailProps) {
  return (
    <section className={className} id={id}>
      <div className="wrap">
        <SectionHeader eyebrow={eyebrow} title={title} link={link} />
        <ProductGrid items={items} />
      </div>
    </section>
  );
}
