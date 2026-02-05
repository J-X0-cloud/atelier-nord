import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { shapeTiles } from "@/lib/data/collections";

interface ShapeTilesProps {
  totalStyles: number;
  /** Number of colourways in each shape collection, keyed by handle. */
  counts: Record<string, number>;
}

export function ShapeTiles({ totalStyles, counts }: ShapeTilesProps) {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeader
          eyebrow="Shop by shape"
          title="Find the one you'll reach for."
          link={{ href: "/collections/all-bags", label: `View all ${totalStyles}` }}
        />
        <div className="cats">
          {shapeTiles.map((tile) => (
            <Link className="cat" href={`/collections/${tile.handle}`} key={tile.handle}>
              <Image
                src={tile.image.url}
                alt={tile.image.altText}
                width={tile.image.width}
                height={tile.image.height}
                sizes="(max-width: 860px) 40vw, 20vw"
              />
              <div className="lbl">
                {tile.label} <i>{counts[tile.handle] ?? 0}</i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
