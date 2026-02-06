import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap cart-empty">
      <div className="eyebrow">404</div>
      <h1 className="h-display">This page has wandered off.</h1>
      <p>The link may be old, or the piece may have sold out for good.</p>
      <Link className="btn" href="/collections/all-bags">
        Shop all bags
      </Link>
    </div>
  );
}
