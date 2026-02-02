/**
 * Storefront domain types.
 *
 * Shapes follow the conventions of headless commerce APIs (handles, variants,
 * money objects, cart lines) so the UI never depends on a specific backend.
 */

export type CurrencyCode = "USD";

export interface Money {
  amount: number;
  currencyCode: CurrencyCode;
}

export interface StoreImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export type ColourId =
  | "cognac"
  | "moss"
  | "oxblood"
  | "stone"
  | "taupe"
  | "espresso"
  | "black"
  | "sand"
  | "chalk"
  | "sage"
  | "ecru";

export interface Colour {
  id: ColourId;
  name: string;
  hex: string;
}

export type BadgeTone = "light" | "dark";

export interface Badge {
  label: string;
  tone: BadgeTone;
}

export type Availability = "in-stock" | "pre-order" | "sold-out";

export interface ProductVariant {
  id: string;
  sku: string;
  colour: Colour;
  price: Money;
  availability: Availability;
  /** Only reported when stock is low enough to be worth showing. */
  quantityAvailable?: number;
  /** Packshot and on-hover alternate view. Colourways without photography fall back to the product default. */
  image?: StoreImage;
  hoverImage?: StoreImage;
  badge?: Badge;
}

export type ProductType =
  | "shoulder"
  | "tote"
  | "crossbody"
  | "top-handle"
  | "baguette"
  | "woven"
  | "hobo";
export type Material = "smooth-calfskin" | "textured-calfskin" | "hand-woven" | "suede-lined";
export type SizeClass = "mini" | "everyday" | "large";
export type Feature = "two-straps" | "zip-closure" | "laptop-sleeve";

export interface Dimension {
  label: string;
  value: string;
}

export interface StrapOption {
  id: string;
  label: string;
  detail: string;
}

export interface ReviewSummary {
  average: number;
  count: number;
  /** Count of reviews per star rating, 5 down to 1. */
  distribution?: [number, number, number, number, number];
  fit?: Dimension[];
}

export interface ProductReview {
  author: string;
  rating: number;
  body: string;
  variant: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  productType: ProductType;
  /** Eyebrow shown above the title on the product page, e.g. "Shoulder bag · Smooth calfskin". */
  subtitle: string;
  description: string;
  highlights: string[];
  dimensions: Dimension[];
  care: string;
  materials: Material[];
  size: SizeClass;
  features: Feature[];
  /** Short line shown on cart lines, e.g. "Straps: Long & short". */
  cartNote: string;
  strapOptions?: StrapOption[];
  variants: ProductVariant[];
  defaultVariantId: string;
  reviews: ReviewSummary;
  featuredReviews?: ProductReview[];
  /** Lifestyle photography shown after the packshots in the gallery. */
  gallery?: (StoreImage & { caption: string; wide?: boolean; objectPosition?: string })[];
  createdAt: string;
  seo: { title: string; description: string };
}

/** A product shown in one specific colourway, which is how grids are merchandised. */
export interface ProductCardItem {
  product: Product;
  variant: ProductVariant;
}

export interface Collection {
  handle: string;
  title: string;
  /** Short label used in chip rails and category tiles. */
  shortTitle: string;
  description: string;
  image: StoreImage;
  seo: { title: string; description: string };
}

export interface CollectionWithItems extends Collection {
  items: ProductCardItem[];
}

export interface CartLineAttribute {
  key: string;
  value: string;
}

export interface CartLine {
  id: string;
  quantity: number;
  attributes: CartLineAttribute[];
  merchandise: {
    variant: ProductVariant;
    product: Pick<Product, "id" | "handle" | "title" | "cartNote">;
  };
  cost: { total: Money };
}

export interface Cart {
  id: string;
  lines: CartLine[];
  totalQuantity: number;
  giftWrap: boolean;
  discountCodes: string[];
  cost: {
    subtotal: Money;
    discount: Money;
    total: Money;
  };
  checkoutUrl: string;
}

export interface CartLineInput {
  variantId: string;
  quantity: number;
  attributes?: CartLineAttribute[];
}

export interface CartLineUpdate {
  lineId: string;
  quantity: number;
}

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

/** Everything the storefront UI needs from a commerce backend. */
export interface Storefront {
  getProduct(handle: string): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
  getCollection(handle: string): Promise<CollectionWithItems | undefined>;
  getCollections(): Promise<Collection[]>;
  getRecommendations(handle: string, limit?: number): Promise<ProductCardItem[]>;

  createCart(lines?: CartLineInput[]): Promise<Cart>;
  getCart(cartId: string): Promise<Cart | undefined>;
  addCartLines(cartId: string, lines: CartLineInput[]): Promise<Cart>;
  updateCartLines(cartId: string, updates: CartLineUpdate[]): Promise<Cart>;
  removeCartLines(cartId: string, lineIds: string[]): Promise<Cart>;
  updateCartOptions(
    cartId: string,
    options: { giftWrap?: boolean; discountCode?: string },
  ): Promise<Cart>;
}
