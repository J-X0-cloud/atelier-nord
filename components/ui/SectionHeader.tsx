import Link from "next/link";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  link?: { href: string; label: string };
}

export function SectionHeader({ eyebrow, title, link }: SectionHeaderProps) {
  return (
    <div className="sec-head">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="h-display">{title}</h2>
      </div>
      {link ? (
        <Link className="link-u" href={link.href}>
          {link.label}
        </Link>
      ) : null}
    </div>
  );
}
