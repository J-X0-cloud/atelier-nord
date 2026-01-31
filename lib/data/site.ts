export const site = {
  name: "Atelier Nord",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ateliernord.com",
  email: "hello@ateliernord.com",
  accountUrl: "https://account.ateliernord.com",
  themeColor: "#2e4b45",
  description:
    "Quiet, full-grain leather bags and small goods designed in Minneapolis and made in small family workshops. Free US shipping over $250 and free lifetime repairs.",
  footerAbout:
    "Leather bags and small goods designed in Minneapolis and made in small family workshops. Fewer pieces, better leather, repaired for life.",
} as const;

export const announcement = [
  "Free US shipping over $250",
  "30-day returns",
  "Free lifetime repairs",
];

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Bags", href: "/collections/all-bags" },
  { label: "Small goods", href: "/collections/small-goods" },
  { label: "New in", href: "/collections/new-in" },
  { label: "Journal", href: "/#journal" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All bags", href: "/collections/all-bags" },
      { label: "Shoulder bags", href: "/collections/shoulder" },
      { label: "Totes", href: "/collections/totes" },
      { label: "Small goods", href: "/collections/small-goods" },
      { label: "The Folio", href: "/products/folio-shoulder-bag" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & delivery", href: "/pages/shipping" },
      { label: "Returns & exchanges", href: "/pages/returns" },
      { label: "Repairs", href: "/pages/repairs" },
      { label: "Leather care", href: "/pages/leather-care" },
      { label: "hello@ateliernord.com", href: "mailto:hello@ateliernord.com" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Journal", href: "/#journal" },
      { label: "Our workshops", href: "/pages/workshops" },
      { label: "Gift cards", href: "/pages/gift-cards" },
      { label: "Instagram", href: "https://www.instagram.com/ateliernord" },
      { label: "Pinterest", href: "https://www.pinterest.com/ateliernord" },
    ],
  },
];

export const paymentMethods = ["Card", "Wallet", "Pay in 4", "Gift card"];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/pages/privacy" },
  { label: "Terms", href: "/pages/terms" },
  { label: "Accessibility", href: "/pages/accessibility" },
];
