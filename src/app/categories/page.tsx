"use client";

import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold" style={{ color: "var(--fg)" }}>Categories</h1>
          <p className="mt-3 text-lg" style={{ color: "var(--fg-muted)" }}>
            Browse our complete range of electronics categories
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative p-8 rounded-3xl transition-all duration-300"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(74, 158, 107, 0.3)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(74,158,107,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 className="text-xl font-semibold group-hover:text-[var(--accent)] transition-colors" style={{ color: "var(--fg)" }}>
                {cat.name}
              </h3>
              <p className="mt-2 text-sm line-clamp-2" style={{ color: "var(--fg-muted)" }}>{cat.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium" style={{ color: "var(--accent)" }}>
                {cat.productCount} products
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
