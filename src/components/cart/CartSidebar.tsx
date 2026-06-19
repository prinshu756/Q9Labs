"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { getImageSrc, getBlurDataUrl } from "@/lib/images";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui";

export function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-70 shadow-2xl flex flex-col"
            style={{ background: "var(--card)" }}
          >
            <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid var(--border)" }}>
              <div>
                <h2 className="text-xl font-semibold" style={{ color: "var(--fg)" }}>Cart</h2>
                <p className="text-sm" style={{ color: "var(--fg-muted)" }}>{items.length} items</p>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 rounded-xl hover:bg-[rgba(128,128,128,0.08)] transition-colors"
              >
                <svg className="w-5 h-5" style={{ color: "var(--fg-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg className="w-16 h-16 mb-4" style={{ color: "var(--scrollbar)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="font-medium" style={{ color: "var(--fg-muted)" }}>Your cart is empty</p>
                  <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>Add some products to get started</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="flex gap-4 p-4 rounded-2xl"
                    style={{ background: "rgba(128,128,128,0.06)" }}
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0" style={{ background: "rgba(128,128,128,0.08)" }}>
                      <Image
                        src={getImageSrc(item.image, { w: 200, q: 60 })}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        placeholder="blur"
                        blurDataURL={getBlurDataUrl()}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.productId}`} className="text-sm font-medium line-clamp-1 hover:text-[var(--accent)] transition-colors" style={{ color: "var(--fg)" }}>
                        {item.name}
                      </Link>
                      <p className="text-sm font-semibold mt-1" style={{ color: "var(--accent)" }}>{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center rounded-lg" style={{ border: "1px solid rgba(128,128,128, 0.1)" }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-[rgba(128,128,128,0.06)] transition-colors rounded-l-lg"
                          >
                            <svg className="w-3.5 h-3.5" style={{ color: "var(--fg-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-3 text-sm font-medium min-w-24px text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-[rgba(128,128,128,0.06)] transition-colors rounded-r-lg"
                          >
                            <svg className="w-3.5 h-3.5" style={{ color: "var(--fg-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 hover:text-red-500 transition-colors"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 space-y-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--fg-muted)" }}>Subtotal</span>
                  <span className="font-semibold" style={{ color: "var(--fg)" }}>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--fg-muted)" }}>Shipping</span>
                  <span style={{ color: "var(--fg-muted)" }}>{subtotal > 100 ? "Free" : "$9.99"}</span>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => {
                    toggleCart();
                    window.location.href = "/checkout";
                  }}
                >
                  Checkout
                </Button>
                <Link
                  href="/cart"
                  onClick={toggleCart}
                  className="block text-center text-sm transition-colors hover:text-[var(--fg)]"
                  style={{ color: "var(--fg-muted)" }}
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
