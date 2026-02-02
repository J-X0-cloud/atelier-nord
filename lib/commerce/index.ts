import { createMockStorefront } from "./mock-storefront";
import type { Storefront } from "./types";

/**
 * The storefront the app talks to. Everything above this line depends only on
 * the `Storefront` interface, so swapping the catalog backend is a one-line change.
 */
export const storefront: Storefront = createMockStorefront();

export { CartError } from "./mock-storefront";
export type * from "./types";
