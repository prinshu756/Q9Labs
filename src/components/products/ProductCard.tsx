"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui";
import { TiltCard } from "@/components/ui/TiltCard";
import { getImageSrc, getBlurDataUrl } from "@/lib/images";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const imageSrc = getImageSrc(product.images[0], { w: 300, q: 60 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard tiltDegree={6} glare className="group">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[rgba(128,128,128,0.08)] mb-4">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={getBlurDataUrl()}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {product.isNew && <Badge variant="premium" size="sm">New</Badge>}
              {product.isOnSale && <Badge variant="danger" size="sm">Sale</Badge>}
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="px-6 py-3 rounded-xl bg-white text-[#111] text-sm font-medium backdrop-blur-sm translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                Quick View
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-(--fg-muted) uppercase tracking-wider">{product.category}</p>
            <h3 className="font-medium text-(--fg) group-hover:text-(--accent) transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-(--fg-muted) line-clamp-2">{product.shortDescription}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-(--fg)">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-[var(--fg-muted)] line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            {product.rating > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-[var(--accent)]" : "text-[var(--scrollbar)]"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-[var(--fg-muted)]">({product.reviewCount})</span>
              </div>
            )}
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
