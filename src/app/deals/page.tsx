"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { PageTransition } from "@/components/ui/PageTransition";
import { products } from "@/lib/data";

export default function DealsPage() {
  const onSale = products.filter((p) => p.isOnSale);

  return (
    <PageTransition className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold" style={{ color: "var(--fg)" }}>Deals & Discounts</h1>
          <p className="mt-3 text-lg" style={{ color: "var(--fg-muted)" }}>
            Save big on premium electronics components
          </p>
        </div>
        {onSale.length === 0 ? (
          <div className="text-center py-16">
            <p style={{ color: "var(--fg-muted)" }}>No deals available right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {onSale.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
