"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { availabilityLabel, variantImages } from "@/lib/commerce/catalog";
import { formatPrice } from "@/lib/commerce/money";
import { DISPATCH_CUTOFF, payInFour } from "@/lib/commerce/shipping";
import type { Product, ProductVariant } from "@/lib/commerce/types";
import { ColourPicker } from "./ColourPicker";
import { ProductGallery } from "./ProductGallery";
import { StickyAddToBag } from "./StickyAddToBag";
import { StrapSelector } from "./StrapSelector";

interface ProductViewProps {
  product: Product;
  initialVariantId: string;
  /** Server-rendered spec accordions. */
  details: ReactNode;
}

const perks = [
  { title: "Free shipping", text: "Arrives in 2–4 days" },
  { title: "30-day returns", text: "Prepaid label" },
  { title: "Lifetime repair", text: "Free, in our workshop" },
];

export function ProductView({ product, initialVariantId, details }: ProductViewProps) {
  const router = useRouter();
  const { addItem, pending } = useCart();
  const [variant, setVariant] = useState<ProductVariant>(
    () => product.variants.find((v) => v.id === initialVariantId) ?? product.variants[0]!,
  );
  const [strap, setStrap] = useState(product.strapOptions?.[0]?.id ?? "");
  const [adding, setAdding] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const addRowRef = useRef<HTMLDivElement>(null);

  const { image, hoverImage } = variantImages(product, variant);
  const price = formatPrice(variant.price);
  const soldOut = variant.availability === "sold-out";

  // Reveal the sticky bar once the main add-to-bag row has scrolled above the viewport.
  useEffect(() => {
    const row = addRowRef.current;
    if (!row) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setShowSticky(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    });
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  function selectVariant(next: ProductVariant) {
    setVariant(next);
    const url = new URL(window.location.href);
    url.searchParams.set("color", next.colour.id);
    window.history.replaceState(null, "", url);
  }

  async function addToBag() {
    setAdding(true);
    const strapLabel = product.strapOptions?.find((option) => option.id === strap)?.label;
    const added = await addItem({
      variantId: variant.id,
      attributes: strapLabel ? [{ key: "Fitted", value: strapLabel }] : undefined,
    });
    setAdding(false);
    if (added) router.push("/cart");
  }

  return (
    <div className="pdp">
      <ProductGallery
        packshots={[
          { ...image, altText: `${product.title} in ${variant.colour.name}, front` },
          { ...hoverImage, altText: `${product.title} in ${variant.colour.name}, alternate view` },
        ]}
        lifestyle={product.gallery ?? []}
      />

      <div className="buy">
        <div className="eyebrow">{product.subtitle}</div>
        <h1 className="h-display">{product.title}</h1>
        <div className="price">
          {price} <small>Duties &amp; US shipping included</small>
        </div>
        <div className="rating">
          <Stars rating={product.reviews.average} /> {product.reviews.average} ·{" "}
          <a href="#reviews">{product.reviews.count} reviews</a>
        </div>

        <div className="opt-l">
          Color <b>{variant.colour.name}</b>
        </div>
        <ColourPicker
          variants={product.variants}
          selectedId={variant.id}
          onSelect={selectVariant}
        />

        {product.strapOptions ? (
          <>
            <div className="opt-l">
              Strap <b>Both included</b>
            </div>
            <StrapSelector options={product.strapOptions} value={strap} onChange={setStrap} />
          </>
        ) : null}

        <div className="addrow" ref={addRowRef}>
          <button
            type="button"
            className="btn"
            onClick={addToBag}
            disabled={soldOut || adding || pending}
          >
            {soldOut ? "Sold out" : adding ? "Adding…" : `Add to bag — ${price}`}
          </button>
          <button className="wish" type="button" aria-label="Save to wishlist">
            <Icon name="heart" />
          </button>
        </div>
        <p className="split-pay">
          Or 4 interest-free payments of {formatPrice(payInFour(variant.price.amount))} at checkout.
        </p>
        <div className={variant.availability === "in-stock" ? "stock" : "stock pre"}>
          <i />
          {variant.availability === "in-stock"
            ? `In stock. Order by ${DISPATCH_CUTOFF} to ship today.`
            : availabilityLabel(variant)}
        </div>
        <div className="perks">
          {perks.map((perk) => (
            <div key={perk.title}>
              <b>{perk.title}</b>
              {perk.text}
            </div>
          ))}
        </div>
        {details}
      </div>

      <StickyAddToBag
        visible={showSticky}
        title={product.title}
        colour={variant.colour.name}
        price={price}
        disabled={soldOut || adding}
        onAdd={addToBag}
      />
    </div>
  );
}
