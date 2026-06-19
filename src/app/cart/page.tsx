"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui";
import { PageTransition } from "@/components/ui/PageTransition";
import { getImageSrc, getBlurDataUrl } from "@/lib/images";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <PageTransition className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "var(--fg)" }}>Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto mb-6" style={{ color: "var(--scrollbar)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--fg)" }}>Your cart is empty</h2>
            <p className="mb-8" style={{ color: "var(--fg-muted)" }}>Looks like you haven&apos;t added anything yet</p>
            <Link href="/products">
              <Button variant="primary" size="lg">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 p-4 rounded-2xl"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0" style={{ background: "rgba(128,128,128,0.08)" }}>
                    <Image src={getImageSrc(item.image, { w: 200, q: 60 })} alt={item.name} fill className="object-cover" sizes="96px" placeholder="blur" blurDataURL={getBlurDataUrl()} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.productId}`} className="text-base font-medium hover:text-[var(--accent)] transition-colors line-clamp-1" style={{ color: "var(--fg)" }}>
                      {item.name}
                    </Link>
                    <p className="text-lg font-semibold mt-1" style={{ color: "var(--accent)" }}>{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center rounded-lg" style={{ border: "1px solid rgba(128,128,128, 0.1)" }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-[rgba(128,128,128,0.06)] transition-colors rounded-l-lg"
                        >
                          <svg className="w-4 h-4" style={{ color: "var(--fg-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-[rgba(128,128,128,0.06)] transition-colors rounded-r-lg"
                        >
                          <svg className="w-4 h-4" style={{ color: "var(--fg-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:text-red-500 transition-colors"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-2xl p-6 sticky top-24" style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--fg)" }}>Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "var(--fg-muted)" }}>Subtotal</span>
                    <span className="font-medium" style={{ color: "var(--fg)" }}>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--fg-muted)" }}>Shipping</span>
                    <span className="font-medium" style={{ color: "var(--fg)" }}>{subtotal > 100 ? "Free" : "$9.99"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--fg-muted)" }}>Tax (8%)</span>
                    <span className="font-medium" style={{ color: "var(--fg)" }}>{formatPrice(subtotal * 0.08)}</span>
                  </div>
                  <div className="flex justify-between pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                    <span className="font-semibold" style={{ color: "var(--fg)" }}>Total</span>
                    <span className="font-bold text-xl" style={{ color: "var(--fg)" }}>
                      {formatPrice(subtotal + (subtotal > 100 ? 0 : 9.99) + subtotal * 0.08)}
                    </span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button variant="primary" size="lg" fullWidth className="mt-6">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/products" className="block text-center text-sm mt-4 transition-colors hover:text-[var(--fg)]" style={{ color: "var(--fg-muted)" }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
