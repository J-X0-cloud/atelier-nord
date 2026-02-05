"use client";

import Image from "next/image";
import type { ProductVariant } from "@/lib/commerce/types";

interface ColourPickerProps {
  variants: ProductVariant[];
  selectedId: string;
  onSelect(variant: ProductVariant): void;
}

export function ColourPicker({ variants, selectedId, onSelect }: ColourPickerProps) {
  return (
    <div className="cswatch" role="radiogroup" aria-label="Color">
      {variants.map((variant) => {
        const selected = variant.id === selectedId;
        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={variant.colour.name}
            title={variant.colour.name}
            className={selected ? "on" : undefined}
            onClick={() => onSelect(variant)}
          >
            {variant.image ? (
              <Image src={variant.image.url} alt="" width={58} height={66} sizes="58px" />
            ) : (
              <span className="chip-colour" style={{ background: variant.colour.hex }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
