"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { getImageSrc, getBlurDataUrl } from "@/lib/images";
import { formatPrice } from "@/lib/utils";

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const handleSelect = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-80"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg z-90 px-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-[var(--border)] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(128,128,128,0.06)]">
                  <svg className="w-5 h-5 text-[var(--fg-muted)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search components..."
                    className="flex-1 bg-transparent text-[var(--fg)] placeholder-[var(--fg-muted)] text-base focus:outline-none"
                  />
                  <kbd className="hidden sm:inline-flex px-2 py-1 rounded-lg bg-[rgba(128,128,128,0.08)] text-[var(--fg-muted)] text-xs font-mono">
                    ESC
                  </kbd>
                </div>

                <div className="max-h-80 overflow-y-auto p-2">
                  {query && results.length === 0 && (
                    <div className="text-center py-8 text-[var(--fg-muted)]">
                      <p>No results found for &ldquo;{query}&rdquo;</p>
                    </div>
                  )}
                  {results.slice(0, 8).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={handleSelect}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[rgba(128,128,128,0.06)] transition-colors group"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[rgba(128,128,128,0.08)] shrink-0">
                        <Image
                          src={getImageSrc(product.images[0], { w: 100, q: 60 })}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                          placeholder="blur"
                          blurDataURL={getBlurDataUrl()}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-[var(--fg-muted)] truncate">{product.category}</p>
                      </div>
                      <span className="text-sm font-semibold text-[var(--fg)] shrink-0">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  ))}
                  {!query && (
                    <div className="text-center py-8 text-[var(--fg-muted)] text-sm">
                      Start typing to search components
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
