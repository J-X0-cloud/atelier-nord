import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/commerce/types";

export function CategoryChips({
  collections,
  active,
}: {
  collections: Collection[];
  active: string;
}) {
  return (
    <nav className="chips" aria-label="Categories">
      {collections.map((collection) => (
        <Link
          key={collection.handle}
          href={`/collections/${collection.handle}`}
          className={clsx("chip", collection.handle === active && "on")}
          aria-current={collection.handle === active ? "page" : undefined}
        >
          <Image src={collection.image.url} alt="" width={38} height={44} sizes="38px" />
          {collection.shortTitle}
        </Link>
      ))}
    </nav>
  );
}
