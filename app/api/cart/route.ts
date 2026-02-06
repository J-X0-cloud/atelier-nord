import { NextResponse } from "next/server";
import { z } from "zod";
import { CartError, storefront } from "@/lib/commerce";
import type { Cart } from "@/lib/commerce/types";
import { getCurrentCart, getOrCreateCart } from "@/lib/cart-session";

const attributeSchema = z.object({ key: z.string().max(40), value: z.string().max(120) });

const addSchema = z.object({
  lines: z
    .array(
      z.object({
        variantId: z.string().min(1),
        quantity: z.number().int().min(1).max(10),
        attributes: z.array(attributeSchema).max(5).optional(),
      }),
    )
    .min(1),
});

const updateSchema = z.union([
  z.object({
    updates: z
      .array(z.object({ lineId: z.string().min(1), quantity: z.number().int().min(0).max(10) }))
      .min(1),
  }),
  z.object({
    giftWrap: z.boolean().optional(),
    discountCode: z.string().trim().min(1).max(40).optional(),
  }),
]);

const removeSchema = z.object({ lineIds: z.array(z.string().min(1)).min(1) });

function ok(cart: Cart | undefined) {
  return NextResponse.json({ cart: cart ?? null });
}

function fail(error: unknown) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Invalid cart request", issues: error.issues },
      { status: 400 },
    );
  }
  if (error instanceof CartError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("[cart]", error);
  return NextResponse.json({ error: "Something went wrong with your bag" }, { status: 500 });
}

export async function GET() {
  return ok(await getCurrentCart());
}

export async function POST(request: Request) {
  try {
    const { lines } = addSchema.parse(await request.json());
    const cart = await getOrCreateCart();
    return ok(await storefront.addCartLines(cart.id, lines));
  } catch (error) {
    return fail(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = updateSchema.parse(await request.json());
    const cart = await getCurrentCart();
    if (!cart) throw new CartError("Your bag has expired. Please add your items again.", 404);

    if ("updates" in body) {
      return ok(await storefront.updateCartLines(cart.id, body.updates));
    }
    return ok(await storefront.updateCartOptions(cart.id, body));
  } catch (error) {
    return fail(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { lineIds } = removeSchema.parse(await request.json());
    const cart = await getCurrentCart();
    if (!cart) return ok(undefined);
    return ok(await storefront.removeCartLines(cart.id, lineIds));
  } catch (error) {
    return fail(error);
  }
}
