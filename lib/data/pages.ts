export interface InfoPage {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export const infoPages: InfoPage[] = [
  {
    slug: "shipping",
    title: "Shipping & delivery",
    eyebrow: "Help",
    intro:
      "Every order is packed by hand and dispatched from our Minneapolis studio, usually within one to two business days.",
    sections: [
      {
        heading: "US shipping",
        body: "Free standard shipping on US orders over $250 (2–4 business days). Orders under $250 ship for a flat $12. Express delivery is available at checkout.",
      },
      {
        heading: "Same-day dispatch",
        body: "Order in-stock pieces by 2pm CT, Monday to Friday, and we ship the same day. Pre-orders ship on the date shown on the product page.",
      },
      {
        heading: "Carbon-neutral delivery",
        body: "We offset the emissions of every parcel we send and pack in recycled, plastic-free materials, including the cotton dust bag.",
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns & exchanges",
    eyebrow: "Help",
    intro: "Carry it for a month. If it isn't right, returns are free and prepaid.",
    sections: [
      {
        heading: "30-day returns",
        body: "Returns are free within 30 days of delivery, in unused condition. A prepaid return label is included in every box.",
      },
      {
        heading: "Exchanges",
        body: "Want a different color or shape? Note it on the return slip and we'll ship the new piece as soon as your return is scanned.",
      },
      {
        heading: "Refunds",
        body: "Refunds go back to the original payment method within five business days of the return reaching our studio.",
      },
    ],
  },
  {
    slug: "repairs",
    title: "Repairs",
    eyebrow: "Help",
    intro:
      "Loose stitch, worn edge, broken hardware: send it back and our workshop fixes it free, for as long as you own the bag.",
    sections: [
      {
        heading: "How it works",
        body: "Email hello@ateliernord.com with your order number and a photo. We send a prepaid label, repair the bag in our workshop and return it, usually within two weeks.",
      },
      {
        heading: "What's covered",
        body: "Stitching, edge paint, zips, magnets, strap hardware and handle reinforcement. If a panel can't be saved, we recut it from a matching hide.",
      },
    ],
  },
  {
    slug: "leather-care",
    title: "Leather care",
    eyebrow: "Help",
    intro: "Full-grain leather is meant to change. A little care keeps it supple as it darkens.",
    sections: [
      {
        heading: "Smooth calfskin",
        body: "Wipe with a dry cloth, condition twice a year and store in the cotton dust bag it arrives in. Keep away from prolonged direct sun.",
      },
      {
        heading: "Textured calfskin",
        body: "Brush off dust and condition once a year. The pebbled grain hides most scuffs on its own.",
      },
      {
        heading: "Hand-woven",
        body: "Keep sharp objects away from the weave and wipe with a barely damp cloth. Let it dry away from heat.",
      },
    ],
  },
  {
    slug: "workshops",
    title: "Our workshops",
    eyebrow: "Studio",
    intro:
      "Every bag is designed in Minneapolis and made in small family workshops we visit several times a year.",
    sections: [
      {
        heading: "Traceable leather",
        body: "Every hide comes from a tannery we've visited, with the batch printed inside the bag. We use vegetable-retanned calfskin from certified tanneries.",
      },
      {
        heading: "Made in small runs",
        body: "We cut from the back of the hide, where the grain is strongest, and make each style in small runs rather than seasonal collections.",
      },
    ],
  },
  {
    slug: "gift-cards",
    title: "Gift cards",
    eyebrow: "Studio",
    intro: "Digital gift cards from $50, delivered by email on the date you choose.",
    sections: [
      {
        heading: "Redeeming",
        body: "Enter the code in the promo field in your bag. Gift cards never expire and can be used across several orders.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    eyebrow: "Legal",
    intro: "We collect only what we need to make, ship and repair your order.",
    sections: [
      {
        heading: "What we keep",
        body: "Your name, shipping address, email and order history. Payment details are handled by our payment provider and never stored on our servers.",
      },
      {
        heading: "Email",
        body: "The Nord letter goes out once a month, never more. Every email has a one-click unsubscribe link.",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms",
    eyebrow: "Legal",
    intro: "The short version of how buying from Atelier Nord works.",
    sections: [
      {
        heading: "Prices",
        body: "All prices are in USD and include duties for US orders. Sales tax is calculated at checkout.",
      },
      {
        heading: "Lifetime repairs",
        body: "Free repairs apply to the original owner and cover normal wear. Damage from fire, water immersion or pets may be repaired at cost.",
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    eyebrow: "Legal",
    intro:
      "We want everyone to be able to shop comfortably. The storefront is built to WCAG 2.2 AA and tested with keyboard and screen readers.",
    sections: [
      {
        heading: "Tell us",
        body: "If something gets in your way, email hello@ateliernord.com and we'll help you complete your order and fix the issue.",
      },
    ],
  },
];

export function getInfoPage(slug: string): InfoPage | undefined {
  return infoPages.find((page) => page.slug === slug);
}
