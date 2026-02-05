"use client";

import { useState, type FormEvent } from "react";
import { newsletter } from "@/lib/data/home";

type Status = "idle" | "sending" | "done" | "error";

export function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>(newsletter.note);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    setStatus("sending");

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => undefined);

    if (response?.ok) {
      form.reset();
      setStatus("done");
      setMessage("You're on the list. The next letter lands at the start of the month.");
    } else {
      const data = (await response?.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setMessage(data?.error ?? "We couldn’t subscribe you just now. Please try again.");
    }
  }

  return (
    <section className="news">
      <div className="wrap">
        <div>
          <div className="eyebrow">{newsletter.eyebrow}</div>
          <h2 className="h-display">{newsletter.title}</h2>
        </div>
        <div>
          <form onSubmit={subscribe}>
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              aria-label="Email address"
              autoComplete="email"
            />
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending" : "Subscribe"}
            </button>
          </form>
          <small role={status === "error" ? "alert" : "status"}>{message}</small>
        </div>
      </div>
    </section>
  );
}
