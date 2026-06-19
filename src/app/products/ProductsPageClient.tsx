"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/lib/data";
import type { FilterOptions, SortOption } from "@/types";

const brands = [...new Set(products.map((p) => p.brand))];
const categories = [...new Set(products.map((p) => p.category))];

export function ProductsPageClient() {
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    ratings: [],
    inStockOnly: false,
    sortBy: "featured",
  });

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings);
      result = result.filter((p) => p.rating >= minRating);
    }
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, _b) => _b.price - a.price);
        break;
      case "rating":
        result.sort((a, _b) => _b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        result.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
    }

    return result;
  }, [filters]);

  const toggleFilter = (
    key: keyof FilterOptions,
    value: string | number | boolean
  ) => {
    setFilters((prev) => {
      const current = prev[key];
      if (Array.isArray(current)) {
        const idx = current.indexOf(value as never);
        if (idx >= 0) {
          return { ...prev, [key]: current.filter((v) => v !== value) };
        }
        return { ...prev, [key]: [...current, value as never] };
      }
      return { ...prev, [key]: typeof current === "boolean" ? !current : value };
    });
  };

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Featured", value: "featured" },
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Top Rated", value: "rating" },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold" style={{ color: "var(--fg)" }}>All Products</h1>
          <p className="mt-2" style={{ color: "var(--fg-muted)" }}>
            {filtered.length} components available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--fg)" }}>
                  Sort By
                </h3>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as SortOption,
                    }))
                  }
                  className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  style={{
                    background: "rgba(128,128,128,0.06)",
                    color: "var(--fg)",
                    border: "1px solid rgba(128,128,128, 0.1)",
                  }}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--fg)" }}>
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(cat)}
                        onChange={() => toggleFilter("categories", cat)}
                        className="w-4 h-4 rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                      />
                      <span className="text-sm transition-colors group-hover:text-[var(--fg)]" style={{ color: "var(--fg-muted)" }}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--fg)" }}>
                  Brand
                </h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => toggleFilter("brands", brand)}
                        className="w-4 h-4 rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                      />
                      <span className="text-sm transition-colors group-hover:text-[var(--fg)]" style={{ color: "var(--fg-muted)" }}>
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={() => toggleFilter("inStockOnly", true)}
                  className="w-4 h-4 rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                />
                <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                  In Stock Only
                </span>
              </label>
            </div>
          </aside>

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--scrollbar)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium" style={{ color: "var(--fg)" }}>No products found</h3>
                <p className="mt-1" style={{ color: "var(--fg-muted)" }}>Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
