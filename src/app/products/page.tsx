import type { Metadata } from "next";
import { ProductsPageClient } from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete catalog of electronics components and parts.",
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
