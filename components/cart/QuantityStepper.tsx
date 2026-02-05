"use client";

interface QuantityStepperProps {
  value: number;
  max?: number;
  label: string;
  onChange(quantity: number): void;
}

export function QuantityStepper({ value, max = 10, label, onChange }: QuantityStepperProps) {
  return (
    <div className="qty" role="group" aria-label={`Quantity for ${label}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
