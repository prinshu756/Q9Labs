"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ZoomOnScrollProps {
  children: ReactNode;
  className?: string;
  zoomStart?: number;
  zoomEnd?: number;
  opacityStart?: number;
  opacityEnd?: number;
  speed?: number;
}

export function ZoomOnScroll({
  children,
  className = "",
  zoomStart = 1,
  zoomEnd = 1.15,
  opacityStart = 0.95,
  opacityEnd = 1,
  speed = 0.3,
}: ZoomOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, speed, 1 - speed, 1],
    [1, zoomStart, zoomEnd, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, speed, 1 - speed, 1],
    [0.6, opacityStart, opacityEnd, 0.6]
  );

  const springScale = useSpring(scale, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });

  const springOpacity = useSpring(opacity, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      style={{ scale: springScale, opacity: springOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ZoomInImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function ZoomInImage({
  src,
  alt,
  className = "",
  containerClassName = "",
}: ZoomInImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1.4]);
  const springScale = useSpring(scale, {
    stiffness: 40,
    damping: 15,
    mass: 0.3,
  });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ scale: springScale }}
        className={`w-full h-full object-cover ${className}`}
        draggable={false}
      />
    </div>
  );
}

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function RevealOnScroll({
  children,
  className = "",
  direction = "up",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const offsets = {
    up: { y: [60, 0, 0], x: [0, 0, 0] },
    down: { y: [-60, 0, 0], x: [0, 0, 0] },
    left: { y: [0, 0, 0], x: [60, 0, 0] },
    right: { y: [0, 0, 0], x: [-60, 0, 0] },
  };

  const off = offsets[direction];
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6], off.y);
  const x = useTransform(scrollYProgress, [0, 0.3, 0.6], off.x);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 1]);

  const springY = useSpring(y, { stiffness: 80, damping: 20 });
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: springOpacity,
        y: springY,
        x: springX,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
