import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { getFeaturedProducts, categories } from "@/lib/data";

export default function Home() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <CategoriesSection categories={categories} />
      <FeaturesSection />

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--accent)" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Ready to Build Something Amazing?
          </h2>
          <p className="mt-4 text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
            Join 50,000+ engineers who trust Q9 Labs for their components. Get same-day shipping and expert support.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-[var(--fg)] font-semibold hover:bg-gray-100 transition-all duration-200 active:scale-[0.98] shadow-xl"
            >
              Start Shopping
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all duration-200 active:scale-[0.98] border border-white/20"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative py-24" style={{ background: "var(--card)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: "var(--fg)" }}>
              Stay in the Loop
            </h2>
            <p className="mt-3" style={{ color: "var(--fg-muted)" }}>
              Get the latest components, tutorials, and deals delivered to your inbox.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-xl focus:outline-none transition-all"
                style={{
                  background: "rgba(128,128,128,0.08)",
                  color: "var(--fg)",
                  border: "1px solid rgba(128,128,128, 0.1)",
                }}
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl text-white font-semibold transition-all active:scale-[0.98] shadow-lg"
                style={{ background: "var(--accent)" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
