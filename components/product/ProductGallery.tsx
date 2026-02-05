import Image from "next/image";
import type { Product, StoreImage } from "@/lib/commerce/types";

interface ProductGalleryProps {
  packshots: [StoreImage, StoreImage];
  lifestyle: NonNullable<Product["gallery"]>;
}

/**
 * Two packshots for the selected colour followed by lifestyle photography.
 * On mobile the grid becomes a horizontal, snap-scrolling carousel (CSS only).
 */
export function ProductGallery({ packshots, lifestyle }: ProductGalleryProps) {
  return (
    <div className="gal">
      {packshots.map((image, index) => (
        <figure key={`${image.url}-${index}`}>
          <Image
            src={image.url}
            alt={image.altText}
            width={image.width}
            height={image.height}
            sizes="(max-width: 860px) 86vw, 28vw"
            priority
          />
        </figure>
      ))}
      {lifestyle.map((image) => (
        <figure key={image.url} className={image.wide ? "wide cover" : "cover"}>
          <Image
            src={image.url}
            alt={image.altText}
            width={image.width}
            height={image.height}
            sizes={image.wide ? "(max-width: 860px) 86vw, 56vw" : "(max-width: 860px) 86vw, 28vw"}
            style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
          />
          <figcaption>{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
