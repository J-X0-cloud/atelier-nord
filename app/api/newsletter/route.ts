import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.email() });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: parsed.data.email, list: "nord-letter", source: "footer" }),
    });
    if (!response.ok) {
      return NextResponse.json({ error: "We couldn’t subscribe you just now." }, { status: 502 });
    }
  } else {
    console.info("[newsletter] subscribe", parsed.data.email);
  }

  return NextResponse.json({ subscribed: true }, { status: 201 });
}
