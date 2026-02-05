"use client";

import { useState, type FormEvent } from "react";
import { useCart } from "./CartProvider";

export function PromoCodeForm() {
  const { cart, applyDiscount, error } = useCart();
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!code.trim()) return;
    setSubmitted(true);
    if (await applyDiscount(code)) setCode("");
  }

  const applied = cart?.discountCodes[0];

  return (
    <>
      <form className="promo" onSubmit={submit}>
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Gift card or promo code"
          aria-label="Promo code"
          autoCapitalize="characters"
        />
        <button type="submit">Apply</button>
      </form>
      {submitted && error ? (
        <p className="promo-msg err" role="alert">
          {error}
        </p>
      ) : applied ? (
        <p className="promo-msg">Code {applied} applied</p>
      ) : null}
    </>
  );
}
