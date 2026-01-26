import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/components/cart/CartProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Newsletter } from "@/components/layout/Newsletter";
import { getCurrentCart } from "@/lib/cart-session";
import { site } from "@/lib/data/site";
import "./globals.css";

/** Newsreader, self-hosted: light cuts for display type, regular for quotes. */
const display = localFont({
  src: [
    { path: "./fonts/newsreader-200.woff2", weight: "200" },
    { path: "./fonts/newsreader-300.woff2", weight: "300" },
  ],
  variable: "--font-display",
  display: "swap",
});

const serif = localFont({
  src: "./fonts/newsreader-400.woff2",
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const sans = localFont({
  src: "./fonts/nord-sans.woff2",
  weight: "300 600",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Atelier Nord — Leather bags & small goods, made to be carried daily",
    template: "%s — Atelier Nord",
  },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cart = await getCurrentCart();

  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body>
        <CartProvider initialCart={cart ?? null}>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Newsletter />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
