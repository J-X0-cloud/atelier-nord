import type { Collection, ColourId, ProductType, StoreImage } from "@/lib/commerce/types";

export type VariantRef = readonly [handle: string, colour: ColourId];

const packshot = (slug: string, altText: string): StoreImage => ({
  url: `/images/products/${slug}.png`,
  altText,
  width: 352,
  height: 403,
});

export interface CollectionDefinition extends Collection {
  /** Merchandised order of colourways. Category collections are derived from this list. */
  items?: VariantRef[];
  productType?: ProductType;
}

/** Master grid order for "All bags"; category collections filter it by product type. */
const allBagsOrder: VariantRef[] = [
  ["folio-shoulder-bag", "cognac"],
  ["havn-tote", "cognac"],
  ["sova-bag", "taupe"],
  ["arc-sling", "sand"],
  ["lina-baguette", "cognac"],
  ["folio-shoulder-bag", "moss"],
  ["vev-woven-bag", "cognac"],
  ["havn-mini", "oxblood"],
  ["kontor-top-handle", "cognac"],
  ["havn-tote", "black"],
  ["bue-shoulder-bag", "cognac"],
  ["folio-shoulder-bag", "stone"],
  ["arc-sling", "black"],
  ["sova-bag", "black"],
  ["mane-hobo", "cognac"],
  ["lina-baguette", "black"],
];

const bagsSeo = (title: string, what: string) => ({
  title,
  description: `Shop Atelier Nord ${what}: full-grain leather in quiet, natural colors. Free US shipping over $250.`,
});

export const collectionDefinitions: CollectionDefinition[] = [
  {
    handle: "all-bags",
    title: "All bags",
    shortTitle: "All bags",
    description:
      "Every shape we make, in full-grain leather that softens and darkens with use. Filter by the way you carry, or by the color you already live in.",
    image: packshot("havn-tote-cognac", "All bags"),
    items: allBagsOrder,
    seo: {
      title: "All bags",
      description:
        "Shop every Atelier Nord bag: full-grain leather shoulder bags, totes, crossbody slings and top-handle bags in quiet, natural colors. Free US shipping over $250.",
    },
  },
  {
    handle: "shoulder",
    title: "Shoulder bags",
    shortTitle: "Shoulder",
    description:
      "Structured and slouched shapes that sit comfortably on the shoulder, most with a second strap for crossbody days.",
    image: packshot("folio-cognac", "Shoulder bags"),
    productType: "shoulder",
    seo: bagsSeo("Shoulder bags", "shoulder bags"),
  },
  {
    handle: "totes",
    title: "Totes",
    shortTitle: "Totes",
    description:
      "Open, generous carryalls cut from a single hide, with room for a laptop, a lunch and a paperback.",
    image: packshot("havn-tote-black", "Totes"),
    productType: "tote",
    seo: bagsSeo("Totes", "leather totes"),
  },
  {
    handle: "crossbody",
    title: "Crossbody & slings",
    shortTitle: "Crossbody",
    description: "Hands-free shapes that sit close to the body, sized for the essentials.",
    image: packshot("arc-sling-sand", "Crossbody and slings"),
    productType: "crossbody",
    seo: bagsSeo("Crossbody & slings", "crossbody bags and slings"),
  },
  {
    handle: "top-handle",
    title: "Top handle",
    shortTitle: "Top handle",
    description: "Structured bags for the working week, with padded laptop compartments.",
    image: packshot("kontor-top-handle-cognac", "Top handle bags"),
    productType: "top-handle",
    seo: bagsSeo("Top handle bags", "top-handle bags"),
  },
  {
    handle: "baguettes",
    title: "Baguettes",
    shortTitle: "Baguettes",
    description: "Slim, elongated shapes that tuck neatly under the arm.",
    image: packshot("lina-baguette-chalk", "Baguettes"),
    productType: "baguette",
    seo: bagsSeo("Baguettes", "baguette bags"),
  },
  {
    handle: "woven",
    title: "Woven",
    shortTitle: "Woven",
    description: "Hand-woven calfskin, made in limited runs.",
    image: packshot("vev-woven-cognac", "Woven bags"),
    productType: "woven",
    seo: bagsSeo("Woven bags", "hand-woven bags"),
  },
  {
    handle: "hobo",
    title: "Hobo",
    shortTitle: "Hobo",
    description: "Soft, unstructured shapes that drape against the body.",
    image: packshot("mane-hobo-cognac", "Hobo bags"),
    productType: "hobo",
    seo: bagsSeo("Hobo bags", "hobo bags"),
  },
  {
    handle: "new-in",
    title: "New in",
    shortTitle: "New in",
    description: "The latest shapes and colors from the workshop, including limited first runs.",
    image: packshot("bue-shoulder-cognac", "New in"),
    items: [
      ["bue-shoulder-bag", "cognac"],
      ["arc-sling", "sand"],
      ["folio-shoulder-bag", "stone"],
      ["vev-woven-bag", "cognac"],
      ["arc-sling", "black"],
      ["mane-hobo", "cognac"],
    ],
    seo: bagsSeo("New in", "new arrivals"),
  },
  {
    handle: "small-goods",
    title: "Small goods",
    shortTitle: "Small goods",
    description:
      "Card holders, wallets and key rings cut from the offcuts of our bag hides, in the same full-grain leather.",
    image: packshot("lina-baguette-cognac", "Small goods"),
    items: [],
    seo: {
      title: "Small goods",
      description:
        "Atelier Nord small goods: card holders, wallets and key rings in full-grain leather. Free US shipping over $250.",
    },
  },
  {
    handle: "bestsellers",
    title: "Bestsellers",
    shortTitle: "Bestsellers",
    description: "The bags our customers carry most.",
    image: packshot("folio-cognac", "Bestsellers"),
    items: [
      ["folio-shoulder-bag", "cognac"],
      ["havn-tote", "black"],
      ["sova-bag", "cognac"],
      ["arc-sling", "sand"],
      ["lina-baguette", "chalk"],
      ["vev-woven-bag", "cognac"],
      ["havn-mini", "taupe"],
      ["kontor-top-handle", "cognac"],
    ],
    seo: bagsSeo("Bestsellers", "bestselling bags"),
  },
];

/** Chip rail on collection pages, in display order. */
export const categoryRail = [
  "all-bags",
  "shoulder",
  "totes",
  "crossbody",
  "top-handle",
  "baguettes",
  "woven",
  "hobo",
] as const;

/** "Shop by shape" tiles on the homepage, with the photo each tile uses. */
export const shapeTiles: { handle: string; label: string; image: StoreImage }[] = [
  { handle: "shoulder", label: "Shoulder", image: packshot("folio-cognac", "Shoulder bags") },
  { handle: "totes", label: "Totes", image: packshot("havn-tote-cognac", "Totes") },
  {
    handle: "crossbody",
    label: "Crossbody & slings",
    image: packshot("arc-sling-sand", "Crossbody and slings"),
  },
  {
    handle: "top-handle",
    label: "Top handle",
    image: packshot("kontor-top-handle-cognac", "Top handle bags"),
  },
];

/** Cross-sell rails that are merchandised by hand rather than computed. */
export const merchandisedRails: Record<string, VariantRef[]> = {
  "folio-shoulder-bag": [
    ["arc-sling", "sand"],
    ["lina-baguette", "chalk"],
    ["havn-mini", "taupe"],
    ["sova-bag", "taupe"],
  ],
  cart: [
    ["lina-baguette", "cognac"],
    ["sova-bag", "black"],
    ["havn-mini", "oxblood"],
    ["bue-shoulder-bag", "cognac"],
  ],
};
