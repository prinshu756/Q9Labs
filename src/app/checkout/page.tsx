"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cart-store";
import { Button, Input } from "@/components/ui";
import { PageTransition } from "@/components/ui/PageTransition";
import { formatPrice } from "@/lib/utils";
import { getImageSrc, getBlurDataUrl } from "@/lib/images";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Order placed successfully!");
    clearCart();
    setSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <PageTransition className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <svg className="w-20 h-20 mx-auto mb-6" style={{ color: "var(--scrollbar)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--fg)" }}>Order Placed!</h2>
          <p className="mb-8" style={{ color: "var(--fg-muted)" }}>Thank you for your purchase. You&apos;ll receive a confirmation email shortly.</p>
          <Link href="/products">
            <Button variant="primary" size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="pt-24 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "var(--fg)" }}>Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl p-6 lg:p-8" style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}>
                <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--fg)" }}>Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name" required placeholder="John" />
                  <Input label="Last Name" required placeholder="Doe" />
                  <div className="sm:col-span-2">
                    <Input label="Email" type="email" required placeholder="john@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <Input label="Address" required placeholder="123 Main St" />
                  </div>
                  <Input label="City" required placeholder="San Francisco" />
                  <Input label="State" required placeholder="CA" />
                  <Input label="ZIP Code" required placeholder="94105" />
                  <Input label="Phone" type="tel" required placeholder="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="rounded-2xl p-6 lg:p-8" style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}>
                <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--fg)" }}>Payment Method</h2>
                <div className="space-y-4">
                  {["visa", "mastercard", "paypal"].map((method) => (
                    <label
                      key={method}
                      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors"
                      style={{
                        border: "1px solid var(--border)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(128,128,128,0.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={method === "visa"}
                        className="w-4 h-4 text-[var(--accent)] focus:ring-[var(--accent)]"
                      />
                      <span className="text-base capitalize font-medium" style={{ color: "var(--fg)" }}>{method}</span>
                      <span className="text-sm capitalize" style={{ color: "var(--fg-muted)" }}>**** **** **** {method === "paypal" ? "email" : "4242"}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-2xl p-6 lg:p-8 sticky top-24" style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--fg)" }}>Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 py-2">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0" style={{ background: "rgba(128,128,128,0.08)" }}>
                        <Image src={getImageSrc(item.image, { w: 200, q: 60 })} alt={item.name} fill className="object-cover" sizes="48px" placeholder="blur" blurDataURL={getBlurDataUrl()} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--fg)" }}>{item.name}</p>
                        <p className="text-xs" style={{ color: "var(--fg-muted)" }}>Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 space-y-2 text-sm" style={{ borderTop: "1px solid var(--border)" }}>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--fg-muted)" }}>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--fg-muted)" }}>Shipping</span>
                    <span className="font-medium">{subtotal > 100 ? "Free" : "$9.99"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--fg-muted)" }}>Tax</span>
                    <span className="font-medium">{formatPrice(subtotal * 0.08)}</span>
                  </div>
                  <div className="flex justify-between pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                    <span className="font-semibold" style={{ color: "var(--fg)" }}>Total</span>
                    <span className="font-bold text-lg">{formatPrice(subtotal + (subtotal > 100 ? 0 : 9.99) + subtotal * 0.08)}</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={submitting}
                  className="mt-6"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
