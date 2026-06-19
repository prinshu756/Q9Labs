"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Badge, Button, Card } from "@/components/ui";
import { ImageZoom } from "@/components/ui/ImageZoom";
import { ProductCard } from "@/components/products/ProductCard";
import { getImageSrc, getBlurDataUrl } from "@/lib/images";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

interface Props {
  product: Product;
  related: Product[];
}

export function ProductDetailClient({ product, related }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const selectedImageSrc = getImageSrc(product.images[selectedImage], { w: 800, q: 80 });
  const cartImageSrc = getImageSrc(product.images[0], { w: 800, q: 80 });

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: cartImageSrc,
      quantity,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            <li><Link href="/" style={{ color: "var(--fg-muted)" }} className="hover:text-[var(--accent)] transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/products" style={{ color: "var(--fg-muted)" }} className="hover:text-[var(--accent)] transition-colors">Products</Link></li>
            <li>/</li>
            <li><Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`} style={{ color: "var(--fg-muted)" }} className="hover:text-[var(--accent)] transition-colors">{product.category}</Link></li>
            <li>/</li>
            <li className="font-medium truncate" style={{ color: "var(--fg)" }}>{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden mb-4" style={{ background: "rgba(128,128,128,0.08)" }}>
              <ImageZoom
                src={selectedImageSrc}
                alt={product.name}
                priority
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                {product.isNew && <Badge variant="premium" size="md">New</Badge>}
                {product.isOnSale && product.originalPrice && (
                  <Badge variant="danger" size="md">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  i === selectedImage
                    ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/30"
                    : "border-[var(--border)] hover:border-[var(--border-hover)]"
                }`}
              >
                <Image src={getImageSrc(img, { w: 100, q: 60 })} alt="" fill className="object-cover" sizes="80px" placeholder="blur" blurDataURL={getBlurDataUrl()} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="mb-2 flex items-center gap-3">
              <Badge variant="default" size="sm">{product.category}</Badge>
              <span className="text-sm" style={{ color: "var(--fg-muted)" }}>Brand: {product.brand}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: "var(--fg)" }}>
              {product.name}
            </h1>

            <p className="mt-4 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-[var(--accent)]"
                        : "text-[var(--scrollbar)]"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm" style={{ color: "var(--fg-muted)" }}>({product.reviewCount} reviews)</span>
            </div>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-4xl font-bold" style={{ color: "var(--fg)" }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-[var(--fg-muted)] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? `In Stock (${product.stockQuantity}+)` : "Out of Stock"}
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center rounded-xl" style={{ border: "1px solid rgba(128,128,128, 0.1)" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:bg-[rgba(128,128,128,0.06)] transition-colors rounded-l-xl"
                >
                  <svg className="w-5 h-5" style={{ color: "var(--fg-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-6 text-lg font-semibold min-w-12 text-center" style={{ color: "var(--fg)" }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:bg-[rgba(128,128,128,0.06)] transition-colors rounded-r-xl"
                >
                  <svg className="w-5 h-5" style={{ color: "var(--fg-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Add to Cart
              </Button>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--fg)" }}>Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: "var(--fg-muted)" }}>
                    <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <Card variant="outlined" padding="lg">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b last:border-0" style={{ borderColor: "rgba(128,128,128,0.06)" }}>
                  <span style={{ color: "var(--fg-muted)" }}>{key}</span>
                  <span className="font-medium text-right" style={{ color: "var(--fg)" }}>{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--fg)" }}>Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
