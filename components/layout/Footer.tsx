import Link from "next/link";
import { footerNav, legalNav, paymentMethods, site } from "@/lib/data/site";
import { Logo } from "./Logo";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (/^(https?:|mailto:)/.test(href)) {
    return (
      <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
        {label}
      </a>
    );
  }
  return <Link href={href}>{label}</Link>;
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap top">
        <div>
          <Logo />
          <p className="about">{site.footerAbout}</p>
        </div>
        {footerNav.map((column) => (
          <div key={column.title}>
            <h4>{column.title}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="wrap bot">
        <span>© {new Date().getFullYear()} Atelier Nord. All prices in USD.</span>
        <div className="pay">
          {paymentMethods.map((method) => (
            <span key={method}>{method}</span>
          ))}
        </div>
        <span className="legal">
          {legalNav.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}
