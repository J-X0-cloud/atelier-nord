import Link from "next/link";
import { CartLink } from "@/components/cart/CartLink";
import { site } from "@/lib/data/site";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="hdr">
      <div className="wrap">
        <nav className="nav" aria-label="Primary">
          <NavLinks />
        </nav>
        <MenuButton />
        <Logo />
        <div className="tools">
          <Link className="t-hide" href="/search">
            Search
          </Link>
          <a className="t-hide" href={site.accountUrl}>
            Account
          </a>
          <CartLink />
        </div>
      </div>
      <nav className="mnav" id="mobile-nav" aria-label="Mobile">
        <NavLinks />
      </nav>
    </header>
  );
}
