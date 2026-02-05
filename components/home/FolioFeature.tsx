import Image from "next/image";
import Link from "next/link";
import { productUrl } from "@/lib/commerce/catalog";
import type { Product } from "@/lib/commerce/types";
import { folioFeature } from "@/lib/data/home";

/** Editorial split that shows every Folio colourway in one row. */
export function FolioFeature({ product }: { product: Product }) {
  return (
    <section className="split">
      <div className="img">
        <Image
          src={folioFeature.image.url}
          alt={folioFeature.image.altText}
          width={folioFeature.image.width}
          height={folioFeature.image.height}
          sizes="(max-width: 860px) 100vw, 50vw"
        />
      </div>
      <div className="copy">
        <div className="eyebrow">{folioFeature.eyebrow}</div>
        <h2 className="h-display">{folioFeature.title}</h2>
        <p>{folioFeature.body}</p>
        <div className="colorrow">
          {product.variants.map((variant) =>
            variant.image ? (
              <Link key={variant.id} href={productUrl(product, variant)}>
                <div className="ci">
                  <Image
                    src={variant.image.url}
                    alt={`Folio in ${variant.colour.name}`}
                    width={variant.image.width}
                    height={variant.image.height}
                    sizes="80px"
                  />
                </div>
                <span>{variant.colour.name}</span>
              </Link>
            ) : null,
          )}
        </div>
        <div>
          <Link className="btn" href={productUrl(product)}>
            Shop the Folio
          </Link>
        </div>
      </div>
    </section>
  );
}
