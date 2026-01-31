import type {
  Availability,
  Badge,
  ColourId,
  Product,
  ProductVariant,
  StoreImage,
} from "@/lib/commerce/types";
import { colours } from "./colours";

const PACKSHOT = { width: 352, height: 403 } as const;

const usd = (amount: number) => ({ amount, currencyCode: "USD" as const });

function packshots(slug: string, title: string, colour: string) {
  return {
    image: {
      url: `/images/products/${slug}.png`,
      altText: `${title} in ${colour}`,
      ...PACKSHOT,
    },
    hoverImage: {
      url: `/images/products/${slug}-alt.png`,
      altText: "",
      ...PACKSHOT,
    },
  } satisfies { image: StoreImage; hoverImage: StoreImage };
}

interface VariantSeed {
  colour: ColourId;
  photographed?: boolean;
  badge?: Badge;
  availability?: Availability;
  quantityAvailable?: number;
}

function variants(
  handle: string,
  imageSlug: string,
  title: string,
  price: number,
  seeds: VariantSeed[],
): ProductVariant[] {
  return seeds.map((seed) => {
    const colour = colours[seed.colour];
    return {
      id: `${handle}--${seed.colour}`,
      sku: `AN-${handle.split("-")[0]!.toUpperCase()}-${seed.colour.slice(0, 3).toUpperCase()}`,
      colour,
      price: usd(price),
      availability: seed.availability ?? "in-stock",
      quantityAvailable: seed.quantityAvailable,
      badge: seed.badge,
      ...(seed.photographed ? packshots(`${imageSlug}-${seed.colour}`, title, colour.name) : {}),
    };
  });
}

const bestseller: Badge = { label: "Bestseller", tone: "dark" };
const isNew: Badge = { label: "New", tone: "light" };

const CARE_SMOOTH =
  "Smooth calfskin darkens and softens with use. Wipe with a dry cloth, condition twice a year and store in the cotton dust bag it arrives in. Keep away from prolonged direct sun.";
const CARE_TEXTURED =
  "Textured calfskin hides scuffs and needs very little attention. Brush off dust, condition once a year and store stuffed with the tissue it arrives in.";
const CARE_WOVEN =
  "Each strip is hand-woven, so keep sharp objects away from the weave. Wipe with a barely damp cloth and let it dry away from heat.";

export const products: Product[] = [
  {
    id: "prod_folio",
    handle: "folio-shoulder-bag",
    title: "Folio Shoulder Bag",
    productType: "shoulder",
    subtitle: "Shoulder bag · Smooth calfskin",
    description:
      "A structured shoulder bag with three accordion gussets that open flat for easy packing and fold slim when you're on the move. Magnetic closure, one interior slip pocket, raw-edge finish hand-painted in our workshop.",
    highlights: [
      "Full-grain vegetable-retanned calfskin",
      "Unlined interior, nubuck reverse",
      "Brushed brass hardware",
      "Two straps included",
    ],
    dimensions: [
      { label: "Width", value: "11.4 in" },
      { label: "Height", value: "8.3 in" },
      { label: "Depth (gussets open)", value: "4.7 in" },
      { label: "Weight", value: "1.6 lb" },
      { label: "Fits", value: "iPad mini, wallet, phone, sunglasses" },
    ],
    care: CARE_SMOOTH,
    materials: ["smooth-calfskin"],
    size: "everyday",
    features: ["two-straps"],
    cartNote: "Straps: Long & short",
    strapOptions: [
      { id: "long", label: "Long strap", detail: 'Crossbody · 47–53" drop' },
      { id: "short", label: "Short strap", detail: 'Shoulder · 21" drop' },
    ],
    variants: variants("folio-shoulder-bag", "folio", "Folio Shoulder Bag", 440, [
      { colour: "cognac", photographed: true, badge: bestseller },
      { colour: "moss", photographed: true },
      { colour: "oxblood", photographed: true },
      { colour: "stone", photographed: true, badge: { label: "New color", tone: "light" } },
      { colour: "taupe", photographed: true },
      { colour: "espresso", photographed: true },
      { colour: "black", photographed: true },
    ]),
    defaultVariantId: "folio-shoulder-bag--cognac",
    reviews: {
      average: 4.9,
      count: 412,
      distribution: [375, 29, 6, 2, 0],
      fit: [
        { label: "Size", value: "True to photos" },
        { label: "Capacity", value: "Holds more than it looks" },
        { label: "Straps", value: "Most use the long one" },
      ],
    },
    featuredReviews: [
      {
        author: "Hannah L.",
        rating: 5,
        variant: "Cognac",
        body: "The gussets are genius. It swallows my whole day and still looks like a slim little bag.",
      },
      {
        author: "Chris T.",
        rating: 5,
        variant: "Moss",
        body: "Bought Moss as a gift and ended up ordering Black for myself a week later.",
      },
      {
        author: "Sofia M.",
        rating: 4,
        variant: "Stone",
        body: "Beautiful leather, a little stiff for the first week. By month two it had fully relaxed.",
      },
      {
        author: "Jordan P.",
        rating: 5,
        variant: "Espresso",
        body: "Swapping the straps takes seconds. Shoulder to work, crossbody on the weekend.",
      },
    ],
    gallery: [
      {
        url: "/images/editorial/folio-cognac-linen.webp",
        altText: "Folio in Cognac held at the hip, showing the folded gussets",
        width: 1080,
        height: 1350,
        caption: "Shown in Cognac",
        wide: true,
        objectPosition: "50% 40%",
      },
      {
        url: "/images/editorial/folio-stone-still-life.jpg",
        altText: "Folio in Stone, side view with gussets open",
        width: 1088,
        height: 1296,
        caption: "Gussets open · Stone",
      },
      {
        url: "/images/editorial/folio-moss-carried.jpg",
        altText: "Folio in Moss carried by hand",
        width: 832,
        height: 1165,
        caption: "Shown in Moss",
      },
    ],
    createdAt: "2023-09-12",
    seo: {
      title: "Folio Shoulder Bag in Cognac",
      description:
        "The Folio Shoulder Bag: full-grain calfskin with three accordion gussets and two interchangeable straps. $440, free US shipping and free lifetime repairs.",
    },
  },
  {
    id: "prod_havn_tote",
    handle: "havn-tote",
    title: "Havn Tote",
    productType: "tote",
    subtitle: "Tote · Smooth calfskin",
    description:
      "An open, flat-bottomed tote cut from a single hide, with a padded sleeve for a 14-inch laptop and a zipped inner pocket for the things that shouldn't roll around.",
    highlights: [
      "Full-grain vegetable-retanned calfskin",
      "Padded laptop sleeve",
      "Zipped interior pocket",
      "Reinforced, hand-stitched handles",
    ],
    dimensions: [
      { label: "Width", value: "15.7 in" },
      { label: "Height", value: "12.2 in" },
      { label: "Depth", value: "5.5 in" },
      { label: "Weight", value: "2.1 lb" },
      { label: "Fits", value: '14" laptop, lunch, paperback' },
    ],
    care: CARE_SMOOTH,
    materials: ["smooth-calfskin"],
    size: "large",
    features: ["laptop-sleeve"],
    cartNote: "Shoulder handles",
    variants: variants("havn-tote", "havn-tote", "Havn Tote", 520, [
      { colour: "black", photographed: true },
      { colour: "cognac", photographed: true, badge: bestseller },
      { colour: "taupe" },
      { colour: "oxblood" },
    ]),
    defaultVariantId: "havn-tote--black",
    reviews: { average: 4.8, count: 318 },
    createdAt: "2022-03-01",
    seo: {
      title: "Havn Tote",
      description:
        "The Havn Tote: a full-grain leather work tote with a padded 14-inch laptop sleeve. $520, free US shipping and free lifetime repairs.",
    },
  },
  {
    id: "prod_sova",
    handle: "sova-bag",
    title: "Sova Bag",
    productType: "shoulder",
    subtitle: "Shoulder bag · Textured calfskin",
    description:
      "A soft, slouched shoulder bag with a single wide gusset and an adjustable strap. The pebbled grain hides the knocks of everyday use.",
    highlights: [
      "Textured full-grain calfskin",
      "Adjustable strap",
      "Magnetic snap closure",
      "Two interior slip pockets",
    ],
    dimensions: [
      { label: "Width", value: "12.6 in" },
      { label: "Height", value: "9.1 in" },
      { label: "Depth", value: "3.9 in" },
      { label: "Weight", value: "1.3 lb" },
      { label: "Fits", value: "Tablet, wallet, phone, water bottle" },
    ],
    care: CARE_TEXTURED,
    materials: ["textured-calfskin"],
    size: "everyday",
    features: [],
    cartNote: "Adjustable strap",
    variants: variants("sova-bag", "sova", "Sova Bag", 380, [
      { colour: "cognac", photographed: true },
      { colour: "taupe", photographed: true },
      { colour: "black", photographed: true },
      { colour: "oxblood" },
      { colour: "espresso" },
    ]),
    defaultVariantId: "sova-bag--cognac",
    reviews: { average: 4.8, count: 256 },
    createdAt: "2022-10-04",
    seo: {
      title: "Sova Bag",
      description:
        "The Sova Bag: a soft, textured-calfskin shoulder bag with an adjustable strap. $380, free US shipping over $250 and free lifetime repairs.",
    },
  },
  {
    id: "prod_arc",
    handle: "arc-sling",
    title: "Arc Sling",
    productType: "crossbody",
    subtitle: "Crossbody sling · Smooth calfskin",
    description:
      "A curved sling that sits close to the body, worn across the chest or at the hip. Just enough room for a phone, cards, keys and sunglasses.",
    highlights: [
      "Full-grain vegetable-retanned calfskin",
      "Adjustable strap with brass slider",
      "Two-way zip closure",
      "Card slot on the back panel",
    ],
    dimensions: [
      { label: "Width", value: "10.2 in" },
      { label: "Height", value: "5.9 in" },
      { label: "Depth", value: "2.4 in" },
      { label: "Weight", value: "0.7 lb" },
      { label: "Fits", value: "Phone, cardholder, keys, sunglasses" },
    ],
    care: CARE_SMOOTH,
    materials: ["smooth-calfskin"],
    size: "mini",
    features: ["zip-closure"],
    cartNote: "Adjustable strap",
    variants: variants("arc-sling", "arc-sling", "Arc Sling", 290, [
      { colour: "sand", photographed: true, badge: isNew },
      { colour: "cognac" },
      { colour: "black", photographed: true },
      { colour: "taupe" },
      { colour: "chalk" },
    ]),
    defaultVariantId: "arc-sling--sand",
    reviews: { average: 4.7, count: 141 },
    createdAt: "2026-08-18",
    seo: {
      title: "Arc Sling",
      description:
        "The Arc Sling: a curved full-grain leather crossbody with a two-way zip. $290, free US shipping over $250 and free lifetime repairs.",
    },
  },
  {
    id: "prod_lina",
    handle: "lina-baguette",
    title: "Lina Baguette",
    productType: "baguette",
    subtitle: "Baguette · Smooth calfskin, suede lined",
    description:
      "A slim, elongated baguette with a short shoulder strap that tucks neatly under the arm. Lined in soft suede so nothing inside scratches.",
    highlights: [
      "Full-grain calfskin, suede lining",
      "Short shoulder strap",
      "Top zip closure",
      "Interior slip pocket",
    ],
    dimensions: [
      { label: "Width", value: "11.0 in" },
      { label: "Height", value: "5.5 in" },
      { label: "Depth", value: "2.8 in" },
      { label: "Weight", value: "0.8 lb" },
      { label: "Fits", value: "Phone, wallet, keys, small pouch" },
    ],
    care: CARE_SMOOTH,
    materials: ["smooth-calfskin", "suede-lined"],
    size: "mini",
    features: ["zip-closure"],
    cartNote: "Short shoulder strap",
    variants: variants("lina-baguette", "lina-baguette", "Lina Baguette", 360, [
      { colour: "chalk", photographed: true },
      { colour: "sand" },
      { colour: "cognac", photographed: true },
      { colour: "black", photographed: true },
      { colour: "oxblood" },
    ]),
    defaultVariantId: "lina-baguette--chalk",
    reviews: { average: 4.8, count: 197 },
    createdAt: "2025-04-22",
    seo: {
      title: "Lina Baguette",
      description:
        "The Lina Baguette: a slim, suede-lined calfskin shoulder bag. $360, free US shipping over $250 and free lifetime repairs.",
    },
  },
  {
    id: "prod_vev",
    handle: "vev-woven-bag",
    title: "Vev Woven Bag",
    productType: "woven",
    subtitle: "Shoulder bag · Hand-woven calfskin",
    description:
      "Strips of calfskin hand-woven over a structured frame, finished with a smooth leather top band. Each one takes a full day at the loom, so they're made in limited runs.",
    highlights: [
      "Hand-woven full-grain calfskin",
      "Suede-lined interior",
      "Magnetic closure",
      "Made in limited runs",
    ],
    dimensions: [
      { label: "Width", value: "12.2 in" },
      { label: "Height", value: "9.4 in" },
      { label: "Depth", value: "4.3 in" },
      { label: "Weight", value: "1.5 lb" },
      { label: "Fits", value: "Tablet, wallet, phone, sunglasses" },
    ],
    care: CARE_WOVEN,
    materials: ["hand-woven", "suede-lined"],
    size: "everyday",
    features: [],
    cartNote: "Shoulder strap",
    variants: variants("vev-woven-bag", "vev-woven", "Vev Woven Bag", 450, [
      { colour: "cognac", photographed: true, badge: { label: "Limited run", tone: "dark" } },
      { colour: "black" },
      { colour: "ecru", availability: "pre-order" },
      { colour: "sage", availability: "pre-order" },
    ]),
    defaultVariantId: "vev-woven-bag--cognac",
    reviews: { average: 4.9, count: 88 },
    createdAt: "2026-05-06",
    seo: {
      title: "Vev Woven Bag",
      description:
        "The Vev Woven Bag: hand-woven full-grain calfskin, made in limited runs. $450, free US shipping and free lifetime repairs.",
    },
  },
  {
    id: "prod_havn_mini",
    handle: "havn-mini",
    title: "Havn Mini",
    productType: "tote",
    subtitle: "Mini tote · Smooth calfskin",
    description:
      "The Havn, scaled down. Short handles, a detachable crossbody strap and a zipped top, sized for the essentials.",
    highlights: [
      "Full-grain vegetable-retanned calfskin",
      "Detachable crossbody strap",
      "Zip-top closure",
      "Interior slip pocket",
    ],
    dimensions: [
      { label: "Width", value: "9.4 in" },
      { label: "Height", value: "7.5 in" },
      { label: "Depth", value: "3.9 in" },
      { label: "Weight", value: "1.0 lb" },
      { label: "Fits", value: "Phone, wallet, keys, small notebook" },
    ],
    care: CARE_SMOOTH,
    materials: ["smooth-calfskin"],
    size: "mini",
    features: ["zip-closure"],
    cartNote: "Detachable strap",
    variants: variants("havn-mini", "havn-mini", "Havn Mini", 390, [
      { colour: "taupe", photographed: true },
      { colour: "cognac" },
      {
        colour: "oxblood",
        photographed: true,
        badge: { label: "Low stock", tone: "light" },
        quantityAvailable: 3,
      },
      { colour: "black" },
    ]),
    defaultVariantId: "havn-mini--taupe",
    reviews: { average: 4.8, count: 164 },
    createdAt: "2024-02-14",
    seo: {
      title: "Havn Mini",
      description:
        "The Havn Mini: a small full-grain leather tote with a detachable crossbody strap. $390, free US shipping and free lifetime repairs.",
    },
  },
  {
    id: "prod_kontor",
    handle: "kontor-top-handle",
    title: "Kontor Top Handle",
    productType: "top-handle",
    subtitle: "Top handle · Textured calfskin",
    description:
      "A structured top-handle bag for the working week, with a padded laptop compartment, a zipped centre divider and a detachable shoulder strap.",
    highlights: [
      "Textured full-grain calfskin, suede lined",
      'Padded 14" laptop compartment',
      "Zipped centre divider",
      "Detachable shoulder strap",
    ],
    dimensions: [
      { label: "Width", value: "15.0 in" },
      { label: "Height", value: "11.0 in" },
      { label: "Depth", value: "5.1 in" },
      { label: "Weight", value: "2.4 lb" },
      { label: "Fits", value: '14" laptop, documents, charger' },
    ],
    care: CARE_TEXTURED,
    materials: ["textured-calfskin", "suede-lined"],
    size: "large",
    features: ["laptop-sleeve", "zip-closure"],
    cartNote: "Detachable shoulder strap",
    variants: variants("kontor-top-handle", "kontor-top-handle", "Kontor Top Handle", 560, [
      { colour: "cognac", photographed: true },
      { colour: "black" },
    ]),
    defaultVariantId: "kontor-top-handle--cognac",
    reviews: { average: 4.9, count: 73 },
    createdAt: "2024-09-09",
    seo: {
      title: "Kontor Top Handle",
      description:
        "The Kontor Top Handle: a structured work bag with a padded laptop compartment. $560, free US shipping and free lifetime repairs.",
    },
  },
  {
    id: "prod_bue",
    handle: "bue-shoulder-bag",
    title: "Bue Shoulder Bag",
    productType: "shoulder",
    subtitle: "Shoulder bag · Smooth calfskin",
    description:
      "A crescent-shaped shoulder bag with a curved top line and two straps in the box: a short one for the shoulder and a long one to wear crossbody.",
    highlights: [
      "Full-grain vegetable-retanned calfskin",
      "Two straps included",
      "Magnetic tab closure",
      "Interior zip pocket",
    ],
    dimensions: [
      { label: "Width", value: "12.2 in" },
      { label: "Height", value: "7.1 in" },
      { label: "Depth", value: "3.1 in" },
      { label: "Weight", value: "1.1 lb" },
      { label: "Fits", value: "Tablet, wallet, phone" },
    ],
    care: CARE_SMOOTH,
    materials: ["smooth-calfskin"],
    size: "everyday",
    features: ["two-straps"],
    cartNote: "Straps: Long & short",
    variants: variants("bue-shoulder-bag", "bue-shoulder", "Bue Shoulder Bag", 410, [
      { colour: "cognac", photographed: true, badge: isNew },
      { colour: "black" },
    ]),
    defaultVariantId: "bue-shoulder-bag--cognac",
    reviews: { average: 4.7, count: 36 },
    createdAt: "2026-09-01",
    seo: {
      title: "Bue Shoulder Bag",
      description:
        "The Bue Shoulder Bag: a crescent-shaped calfskin bag with two straps included. $410, free US shipping and free lifetime repairs.",
    },
  },
  {
    id: "prod_mane",
    handle: "mane-hobo",
    title: "Måne Hobo",
    productType: "hobo",
    subtitle: "Hobo · Smooth calfskin, suede lined",
    description:
      "A soft, moon-shaped hobo that drapes against the body. Unstructured, suede lined and easy to carry all day.",
    highlights: [
      "Full-grain calfskin, suede lining",
      "Knotted shoulder strap",
      "Magnetic closure",
      "Interior zip pocket",
    ],
    dimensions: [
      { label: "Width", value: "14.2 in" },
      { label: "Height", value: "9.8 in" },
      { label: "Depth", value: "3.5 in" },
      { label: "Weight", value: "1.2 lb" },
      { label: "Fits", value: "Tablet, wallet, phone, scarf" },
    ],
    care: CARE_SMOOTH,
    materials: ["smooth-calfskin", "suede-lined"],
    size: "everyday",
    features: [],
    cartNote: "Knotted shoulder strap",
    variants: variants("mane-hobo", "mane-hobo", "Måne Hobo", 420, [
      { colour: "cognac", photographed: true },
      { colour: "espresso" },
    ]),
    defaultVariantId: "mane-hobo--cognac",
    reviews: { average: 4.8, count: 52 },
    createdAt: "2025-10-20",
    seo: {
      title: "Måne Hobo",
      description:
        "The Måne Hobo: a soft, suede-lined calfskin hobo bag. $420, free US shipping and free lifetime repairs.",
    },
  },
];
