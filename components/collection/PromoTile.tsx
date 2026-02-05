import Image from "next/image";
import Link from "next/link";

export function PromoTile() {
  return (
    <Link className="promo-tile" href="/products/folio-shoulder-bag?color=stone">
      <div className="t">
        <div>
          <div className="eyebrow">Two straps, one bag</div>
          <h3>The Folio, now in Stone.</h3>
          <p>Our most carried shape in a pale, lichen-grey calfskin. Limited first run.</p>
        </div>
        <span className="link-u">Shop the Folio</span>
      </div>
      <Image
        src="/images/editorial/folio-stone-still-life.jpg"
        alt="Folio in Stone still life"
        width={1088}
        height={1296}
        sizes="(max-width: 860px) 100vw, 33vw"
      />
    </Link>
  );
}
