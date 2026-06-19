"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { getImageSrc, getBlurDataUrl } from "@/lib/images";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  offset?: UseScrollOptions["offset"];
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className,
  offset = ["start end", "end start"],
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const springY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ""}`}>
      <motion.div style={{ y: springY }}>{children}</motion.div>
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, speed * -200]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const imageSrc = getImageSrc(src);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ""}`}>
      <motion.div
        style={{ y: springY, scale: springScale }}
        className="absolute inset-0"
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          draggable={false}
          placeholder="blur"
          blurDataURL={getBlurDataUrl()}
        />
      </motion.div>
    </div>
  );
}

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [distance, -distance]);
}
