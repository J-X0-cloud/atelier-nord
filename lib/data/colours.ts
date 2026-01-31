import type { Colour, ColourId } from "@/lib/commerce/types";

export const colours: Record<ColourId, Colour> = {
  cognac: { id: "cognac", name: "Cognac", hex: "#9a5634" },
  espresso: { id: "espresso", name: "Espresso", hex: "#3b2622" },
  oxblood: { id: "oxblood", name: "Oxblood", hex: "#5b1f24" },
  moss: { id: "moss", name: "Moss", hex: "#5f6650" },
  stone: { id: "stone", name: "Stone", hex: "#bcb096" },
  taupe: { id: "taupe", name: "Taupe", hex: "#9a8c80" },
  black: { id: "black", name: "Black", hex: "#1d1c1c" },
  sand: { id: "sand", name: "Sand", hex: "#d4bb93" },
  chalk: { id: "chalk", name: "Chalk", hex: "#e6e0d4" },
  sage: { id: "sage", name: "Sage", hex: "#a9b89a" },
  ecru: { id: "ecru", name: "Ecru", hex: "#e3d6bd" },
};

/** Order of the colour facet on collection pages. */
export const colourFacetOrder: ColourId[] = [
  "cognac",
  "espresso",
  "oxblood",
  "moss",
  "stone",
  "taupe",
  "black",
  "sand",
  "chalk",
  "sage",
];
