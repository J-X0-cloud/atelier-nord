"use client";

interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  count?: number;
  onChange(checked: boolean): void;
}

export function FilterCheckbox({ label, checked, count, onChange }: FilterCheckboxProps) {
  return (
    <label>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className={checked ? "box on" : "box"} aria-hidden="true" />
      {label}
      {count !== undefined ? <em>{count}</em> : null}
    </label>
  );
}
