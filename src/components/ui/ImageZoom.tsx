"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { getImageSrc, getBlurDataUrl } from "@/lib/images";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ImageZoom({ src, alt, className, priority }: ImageZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageSrc = getImageSrc(src);
  const [magnifierStyle, setMagnifierStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMagnifierStyle({
        opacity: 1,
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: `${x}% ${y}%`,
        backgroundSize: "250%",
        left: `${e.clientX - rect.left}px`,
        top: `${e.clientY - rect.top}px`,
      });
    },
    [imageSrc]
  );

  const handleMouseLeave = useCallback(() => {
    setMagnifierStyle((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-crosshair ${className || ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover select-none pointer-events-none"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={priority}
        draggable={false}
        placeholder="blur"
        blurDataURL={getBlurDataUrl()}
      />

      {/* Magnifier Ring */}
      <div
        className="absolute pointer-events-none w-40 h-40 rounded-full border-4 border-white/80 shadow-2xl -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          ...magnifierStyle,
          backgroundRepeat: "no-repeat",
          backdropFilter: "brightness(1.05)",
        }}
      />
    </div>
  );
}
