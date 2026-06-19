"use client";

import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/lib/data";
import type { Category } from "@/types";

interface Props {
  category: Category;
}

export function CategoryPageClient({ category }: Props) {
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === category.name.toLowerCase()
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm" style={{ color: "var(--fg-muted)" }}>
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/products" className="hover:text-[var(--accent)] transition-colors">Products</Link></li>
            <li>/</li>
            <li className="font-medium" style={{ color: "var(--fg)" }}>{category.name}</li>
          </ol>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold" style={{ color: "var(--fg)" }}>{category.name}</h1>
          <p className="mt-3 text-lg max-w-2xl" style={{ color: "var(--fg-muted)" }}>{category.description}</p>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{categoryProducts.length} products</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {category.subCategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/products?sub=${sub.slug}`}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: "rgba(128,128,128,0.08)",
                color: "var(--fg-muted)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(74,158,107,0.08)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(128,128,128,0.08)";
                e.currentTarget.style.color = "var(--fg-muted)";
              }}
            >
              {sub.name}
              <span className="ml-2" style={{ color: "var(--fg-muted)" }}>({sub.productCount})</span>
            </Link>
          ))}
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-16">
            <p style={{ color: "var(--fg-muted)" }}>No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
