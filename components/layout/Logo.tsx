import Link from "next/link";

export function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth={1.1} />
      <path d="M12 4.6 15.1 15.6 12 13.5 8.9 15.6Z" fill="currentColor" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Atelier Nord home">
      <LogoMark />
      <span>Atelier Nord</span>
    </Link>
  );
}
