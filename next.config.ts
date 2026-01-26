import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/collection.html", destination: "/collections/all-bags", permanent: true },
      { source: "/product.html", destination: "/products/folio-shoulder-bag", permanent: true },
      { source: "/cart.html", destination: "/cart", permanent: true },
      { source: "/collections", destination: "/collections/all-bags", permanent: false },
    ];
  },
};

export default nextConfig;
