import type { StoreImage } from "@/lib/commerce/types";

export const hero = {
  eyebrow: "Autumn edit · 2026",
  image: {
    url: "/images/editorial/folio-stone-still-life.jpg",
    altText: "The Folio Shoulder Bag in Stone, still life",
    width: 1088,
    height: 1296,
  } satisfies StoreImage,
  tag: { label: "Folio Shoulder Bag, Stone", href: "/products/folio-shoulder-bag?color=stone" },
  meta: [
    { value: "Full-grain", text: "Vegetable-retanned calfskin from certified tanneries" },
    { value: "For life", text: "Free repairs on every bag, for as long as you own it" },
    { value: "$250+", text: "Free US shipping, carbon-neutral delivery" },
  ],
};

export const folioFeature = {
  eyebrow: "The Folio · $440",
  title: "One pattern, folded like paper. Seven colors.",
  body: "Three accordion gussets let the Folio open flat on your desk and close slim on your shoulder. Two straps come in the box: a short drop for the city, a long one for everything else.",
  image: {
    url: "/images/editorial/folio-moss-carried.jpg",
    altText: "The Folio Shoulder Bag in Moss, carried by hand",
    width: 832,
    height: 1165,
  } satisfies StoreImage,
};

export type PromiseIcon = "repair" | "leaf" | "truck" | "return" | "lock";

export interface PromiseItem {
  icon: PromiseIcon;
  title: string;
  text: string;
}

export const homePromises: PromiseItem[] = [
  {
    icon: "repair",
    title: "Repaired for life",
    text: "Loose stitch, worn edge, broken hardware: send it back and our workshop fixes it free.",
  },
  {
    icon: "leaf",
    title: "Traceable leather",
    text: "Every hide comes from a tannery we've visited, with the batch printed inside the bag.",
  },
  {
    icon: "truck",
    title: "Ships in 1–2 days",
    text: "Free US shipping over $250, dispatched from our Minneapolis studio.",
  },
  {
    icon: "return",
    title: "30-day returns",
    text: "Carry it for a month. If it isn't right, returns are free and prepaid.",
  },
];

export const collectionPromises: PromiseItem[] = [
  {
    icon: "repair",
    title: "Repaired for life",
    text: "Free workshop repairs on every bag, for as long as you own it.",
  },
  { icon: "truck", title: "Ships in 1–2 days", text: "Free US shipping on orders over $250." },
  { icon: "return", title: "30-day returns", text: "Prepaid return label in every box." },
  { icon: "lock", title: "Pay in 4", text: "Split any order into four interest-free payments." },
];

export const storeReviews = {
  eyebrow: "4.8 out of 5 · from 1,900+ reviews",
  items: [
    {
      quote:
        "I've carried the Folio every day for a year. The cognac has darkened into something I couldn't have bought new.",
      author: "Maya R. · Portland, OR",
      product: "Folio, Cognac",
    },
    {
      quote:
        "Fits a 14-inch laptop, a lunch and a paperback, and still looks like it belongs at dinner afterwards.",
      author: "Daniel K. · Chicago, IL",
      product: "Havn Tote, Black",
    },
    {
      quote:
        "The strap stitching came loose after two years. They repaired it free and had it back to me in nine days.",
      author: "Priya S. · Austin, TX",
      product: "Sova Bag, Taupe",
    },
  ],
};

export interface JournalStory {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: StoreImage & { objectPosition?: string };
}

export const journal: JournalStory[] = [
  {
    slug: "back-of-the-hide",
    category: "Materials",
    readTime: "6 min",
    title: "Why we only cut from the back of the hide",
    excerpt:
      "The strongest, tightest grain is also the most wasteful to use. Here's why we do it anyway.",
    image: {
      url: "/images/editorial/folio-cognac-linen.webp",
      altText: "Cognac Folio bag held against linen",
      width: 1080,
      height: 1350,
    },
  },
  {
    slug: "calfskin-care-ritual",
    category: "Care",
    readTime: "4 min",
    title: "A five-minute ritual for smooth calfskin",
    excerpt: "Balm, soft cloth, patience. How to keep leather supple through a Minnesota winter.",
    image: {
      url: "/images/editorial/folio-taupe-carried.jpg",
      altText: "Taupe Folio carried behind the back",
      width: 832,
      height: 1165,
    },
  },
  {
    slug: "designing-for-grey-light",
    category: "Studio",
    readTime: "5 min",
    title: "Designing for grey light",
    excerpt: "Our palette starts outdoors: lichen, wet stone, peat and birch bark.",
    image: {
      url: "/images/editorial/northern-landscape.jpg",
      altText: "Open northern landscape under a grey sky",
      width: 1200,
      height: 542,
      objectPosition: "62% 50%",
    },
  },
];

export const newsletter = {
  eyebrow: "The Nord letter",
  title: "New colors, restocks and workshop notes. Once a month, never more.",
  note: "You'll get early access to limited runs. Unsubscribe any time.",
};
