"use client";

import type { StrapOption } from "@/lib/commerce/types";

interface StrapSelectorProps {
  options: StrapOption[];
  value: string;
  onChange(id: string): void;
}

/** Both straps ship in the box; the choice decides which one we fit before dispatch. */
export function StrapSelector({ options, value, onChange }: StrapSelectorProps) {
  return (
    <div className="seg" role="radiogroup" aria-label="Strap">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={option.id === value}
          className={option.id === value ? "on" : undefined}
          onClick={() => onChange(option.id)}
        >
          {option.label}
          <small>{option.detail}</small>
        </button>
      ))}
    </div>
  );
}
