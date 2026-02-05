import Image from "next/image";
import Link from "next/link";
import { hero } from "@/lib/data/home";

export function Hero({ price }: { price: string }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div>
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1 className="h-display">
            Leather goods, <em>pared back</em> to what you carry.
          </h1>
          <p>
            Full-grain bags cut from a single hide, finished by hand and built around the way you
            actually move through a day. No logos, no seasons, no noise.
          </p>
          <div className="hero-ctas">
            <Link className="btn" href="/collections/all-bags">
              Shop all bags
            </Link>
            <Link className="btn ghost" href="/products/folio-shoulder-bag">
              Meet the Folio
            </Link>
          </div>
        </div>
        <div className="hero-meta">
          {hero.meta.map((item) => (
            <div key={item.value}>
              <b>{item.value}</b>
              {item.text}
            </div>
          ))}
        </div>
      </div>
      <div className="hero-img">
        <Image
          src={hero.image.url}
          alt={hero.image.altText}
          width={hero.image.width}
          height={hero.image.height}
          sizes="(max-width: 860px) 100vw, 50vw"
          priority
        />
        <Link className="hero-tag" href={hero.tag.href}>
          <div>
            <small>Shown</small>
            {hero.tag.label}
          </div>
          <div>{price} →</div>
        </Link>
      </div>
    </section>
  );
}
