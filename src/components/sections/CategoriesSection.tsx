"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getBlurDataUrl } from "@/lib/images";
import type { Category } from "@/types";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Categories
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold" style={{ color: "var(--fg)" }}>
            Browse by Category
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--fg-muted)" }}>
            Find exactly what you need across our extensive catalog
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group block rounded-2xl p-6 text-center transition-all duration-300"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--card-hover)";
                  e.currentTarget.style.borderColor = "var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--card)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 16vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataUrl()}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold text-sm transition-colors group-hover:text-(--accent)" style={{ color: "var(--fg)" }}>
                  {category.name}
                </h3>
                <p className="text-xs mt-1" style={{ color: "var(--fg-muted)" }}>
                  {category.productCount} components
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
