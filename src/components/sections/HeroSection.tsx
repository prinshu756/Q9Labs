"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

const stats = [
  { label: "Components", value: "10,000+" },
  { label: "Engineers Served", value: "50,000+" },
  { label: "Countries", value: "120+" },
  { label: "Same-Day Shipping", value: "99.9%" },
];

const featuredCategories = [
  { name: "Microcontrollers", icon: "▦" },
  { name: "Sensors", icon: "◎" },
  { name: "Motors", icon: "⚙" },
  { name: "Displays", icon: "◉" },
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Animated background - always works, no external dependencies */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pulsing glow orbs */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(74,158,107,0.08) 0%, transparent 70%)",
              animationDuration: "4s",
            }}
          />
          <div
            className="absolute bottom-1/3 -right-1/4 w-1/2 h-1/2 rounded-full animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(74,158,107,0.06) 0%, transparent 70%)",
              animationDuration: "6s",
              animationDelay: "1s",
            }}
          />
        </div>

        {/* Circuit grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74,158,107,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74,158,107,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(74,158,107,0.08) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Video (enhancement, not required) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-100"
          }`}
          style={{ filter: "saturate(0.8) contrast(1.1)" }}
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>

        {/* Soft gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 0%, transparent 50%, var(--bg) 100%)",
          }}
        />
  </div>

      <motion.div
        style={{ y: contentY }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 z-20"
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "var(--accent-light)",
                color: "var(--accent)",
                border: "1px solid var(--accent-glow)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
              50,000+ engineers trust Q9 Labs
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] tracking-tight font-heading text-white"
            style={{ color: "var(--fg)" }}
          >
            Premium Electronics
            <br />
            <span style={{ color: "var(--accent)"  , font : "Cuprum" }}>
              Components & Parts
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg lg:text-xl max-w-2xl leading-relaxed"
            style={{ color: "#fff" }}
          >
            From microcontrollers to sensors, displays to power management — source the highest quality components for your next breakthrough project.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-200 active:scale-[0.98] shadow-lg"
              style={{ background: "var(--accent)" }}
            >
              Explore Components
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "var(--card)",
                color: "var(--fg)",
                border: "1px solid var(--border)",
                backdropFilter: "blur(12px)",
              }}
            >
              View Deals
            </Link>
          </motion.div>
        </div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-wrap gap-3"
        >
          {featuredCategories.map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${cat.name.toLowerCase()}`}
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl transition-all duration-300"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--fg)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--card-hover)";
                e.currentTarget.style.borderColor = "var(--accent-glow)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--card)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--fg)";
              }}
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="text-sm font-medium transition-colors">{cat.name}</span>
              <svg className="w-4 h-4 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl lg:text-4xl font-bold font-heading" style={{ color: "var(--accent)" }}>
                {stat.value}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-6 rounded-full flex justify-center pt-1.5"
          style={{ border: "1px solid var(--border-hover)" }}
        >
          <div className="w-1 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
