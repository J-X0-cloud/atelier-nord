"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/lib/data/site";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {primaryNav.map((item) => {
        const active = !item.href.includes("#") && pathname.startsWith(item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={active ? "on" : undefined}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
