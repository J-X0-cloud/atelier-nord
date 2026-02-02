import { randomUUID } from "node:crypto";
import {
  collectionDefinitions,
  merchandisedRails,
  type CollectionDefinition,
  type VariantRef,
} from "@/lib/data/collections";
import { products } from "@/lib/data/products";
import { promotions } from "@/lib/data/promotions";
import { findVariantByColour, getVariant } from "./catalog";
import { money } from "./money";
import type {
  Cart,
  CartLine,
  CartLineAttribute,
  CartLineInput,
  CartLineUpdate,
  Collection,
  CollectionWithItems,
  Product,
  ProductCardItem,
  Storefront,
} from "./types";

const MAX_LINE_QUANTITY = 10;

interface StoredLine {
  id: string;
  variantId: string;
  quantity: number;
  attributes: CartLineAttribute[];
}

interface StoredCart {
  id: string;
  lines: StoredLine[];
  giftWrap: boolean;
  discountCodes: string[];
}

/**
 * Carts live in process memory. The cache is pinned to globalThis so dev-server
 * hot reloads don't wipe everyone's bag.
 */
const globalCarts = globalThis as typeof globalThis & { __nordCarts?: Map<string, StoredCart> };
const carts = (globalCarts.__nordCarts ??= new Map<string, StoredCart>());

export class CartError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 404 | 409 = 400,
  ) {
    super(message);
    this.name = "CartError";
  }
}

function findProductByVariant(variantId: string): Product | undefined {
  return products.find((product) => product.variants.some((variant) => variant.id === variantId));
}

function resolveRefs(refs: readonly VariantRef[]): ProductCardItem[] {
  return refs.flatMap(([handle, colour]) => {
    const product = products.find((p) => p.handle === handle);
    const variant = product && findVariantByColour(product, colour);
    return product && variant ? [{ product, variant }] : [];
  });
}

function toCollection(definition: CollectionDefinition): Collection {
  const { handle, title, shortTitle, description, image, seo } = definition;
  return { handle, title, shortTitle, description, image, seo };
}

function lineKey(variantId: string, attributes: CartLineAttribute[]): string {
  const attrs = attributes.map((a) => `${a.key}=${a.value}`).join("&");
  return `gid_line_${variantId}${attrs ? `_${Buffer.from(attrs).toString("base64url")}` : ""}`;
}

function checkoutUrl(cartId: string): string {
  const base = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://checkout.ateliernord.com/c";
  return `${base}?cart=${encodeURIComponent(cartId)}`;
}

function hydrate(stored: StoredCart): Cart {
  const lines: CartLine[] = stored.lines.flatMap((line) => {
    const product = findProductByVariant(line.variantId);
    const variant = product && getVariant(product, line.variantId);
    if (!product || !variant) return [];
    return [
      {
        id: line.id,
        quantity: line.quantity,
        attributes: line.attributes,
        merchandise: {
          variant,
          product: {
            id: product.id,
            handle: product.handle,
            title: product.title,
            cartNote: product.cartNote,
          },
        },
        cost: { total: money(variant.price.amount * line.quantity) },
      },
    ];
  });

  const subtotal = lines.reduce((sum, line) => sum + line.cost.total.amount, 0);
  const rate = stored.discountCodes.reduce(
    (best, code) => Math.max(best, promotions[code] ?? 0),
    0,
  );
  const discount = Math.round(subtotal * rate * 100) / 100;

  return {
    id: stored.id,
    lines,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    giftWrap: stored.giftWrap,
    discountCodes: stored.discountCodes,
    cost: {
      subtotal: money(subtotal),
      discount: money(discount),
      total: money(subtotal - discount),
    },
    checkoutUrl: checkoutUrl(stored.id),
  };
}

function requireCart(cartId: string): StoredCart {
  const cart = carts.get(cartId);
  if (!cart) throw new CartError("Cart not found", 404);
  return cart;
}

function addLines(cart: StoredCart, inputs: CartLineInput[]) {
  for (const input of inputs) {
    const product = findProductByVariant(input.variantId);
    const variant = product && getVariant(product, input.variantId);
    if (!variant) throw new CartError(`Unknown variant ${input.variantId}`, 404);
    if (variant.availability === "sold-out")
      throw new CartError(`${variant.colour.name} is sold out`, 409);

    const attributes = input.attributes ?? [];
    const id = lineKey(variant.id, attributes);
    const existing = cart.lines.find((line) => line.id === id);
    const limit = Math.min(MAX_LINE_QUANTITY, variant.quantityAvailable ?? MAX_LINE_QUANTITY);

    if (existing) {
      existing.quantity = Math.min(limit, existing.quantity + input.quantity);
    } else {
      cart.lines.push({
        id,
        variantId: variant.id,
        quantity: Math.min(limit, input.quantity),
        attributes,
      });
    }
  }
}

export function createMockStorefront(): Storefront {
  return {
    async getProducts() {
      return products;
    },

    async getProduct(handle) {
      return products.find((product) => product.handle === handle);
    },

    async getCollections(): Promise<Collection[]> {
      return collectionDefinitions.map(toCollection);
    },

    async getCollection(handle): Promise<CollectionWithItems | undefined> {
      const definition = collectionDefinitions.find((c) => c.handle === handle);
      if (!definition) return undefined;

      const master = collectionDefinitions.find((c) => c.handle === "all-bags")?.items ?? [];
      const items = definition.items
        ? resolveRefs(definition.items)
        : resolveRefs(master).filter((item) => item.product.productType === definition.productType);

      return { ...toCollection(definition), items };
    },

    async getRecommendations(handle, limit = 4) {
      const rail = merchandisedRails[handle];
      if (rail) return resolveRefs(rail).slice(0, limit);

      const source = products.find((p) => p.handle === handle);
      return products
        .filter((p) => p.handle !== handle)
        .sort(
          (a, b) =>
            Number(b.productType === source?.productType) -
            Number(a.productType === source?.productType),
        )
        .slice(0, limit)
        .map((product) => ({
          product,
          variant: getVariant(product, product.defaultVariantId) ?? product.variants[0]!,
        }));
    },

    async createCart(lines = []) {
      const cart: StoredCart = {
        id: `cart_${randomUUID()}`,
        lines: [],
        giftWrap: false,
        discountCodes: [],
      };
      addLines(cart, lines);
      carts.set(cart.id, cart);
      return hydrate(cart);
    },

    async getCart(cartId) {
      const cart = carts.get(cartId);
      return cart ? hydrate(cart) : undefined;
    },

    async addCartLines(cartId, lines) {
      const cart = requireCart(cartId);
      addLines(cart, lines);
      return hydrate(cart);
    },

    async updateCartLines(cartId, updates: CartLineUpdate[]) {
      const cart = requireCart(cartId);
      for (const update of updates) {
        const line = cart.lines.find((l) => l.id === update.lineId);
        if (!line) throw new CartError("Line not found", 404);
        line.quantity = Math.min(MAX_LINE_QUANTITY, update.quantity);
      }
      cart.lines = cart.lines.filter((line) => line.quantity > 0);
      return hydrate(cart);
    },

    async removeCartLines(cartId, lineIds) {
      const cart = requireCart(cartId);
      cart.lines = cart.lines.filter((line) => !lineIds.includes(line.id));
      return hydrate(cart);
    },

    async updateCartOptions(cartId, options) {
      const cart = requireCart(cartId);
      if (options.giftWrap !== undefined) cart.giftWrap = options.giftWrap;
      if (options.discountCode !== undefined) {
        const code = options.discountCode.trim().toUpperCase();
        if (!(code in promotions)) throw new CartError("That code isn’t valid or has expired.");
        cart.discountCodes = [code];
      }
      return hydrate(cart);
    },
  };
}
