"use client";

import { useRef, useEffect, useState } from "react";

interface VideoBackgroundProps {
  videoSrc?: string;
  posterSrc?: string;
  overlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function VideoBackground({
  videoSrc = "https://cdn.coverr.co/videos/coverr-circuit-board-with-glowing-lines-5765/1080p.mp4",
  posterSrc,
  overlay = true,
  className = "",
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setLoaded(true);
      video.play().catch(() => {});
    };

    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Loading placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-surface-950 animate-pulse" />
      )}

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950/80 via-surface-950/60 to-surface-950/90" />
      )}

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        <div className="absolute left-0 right-0 h-[2px] bg-neon-cyan animate-scan" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function CircuitPatternBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full opacity-[0.04]" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 200 H150 V150 H300 V100 H450 V50 H600 V100 H750 V150 H900 V200 H1050 V250 H1200 V300 H1440" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="3" fill="var(--accent)" />
        <circle cx="450" cy="50" r="3" fill="var(--accent)" />
        <circle cx="750" cy="150" r="3" fill="var(--accent)" />
        <circle cx="1050" cy="250" r="3" fill="var(--accent)" />
        <path d="M0 500 H200 V450 H400 V400 H600 V350 H800 V400 H1000 V450 H1200 V500 H1440" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
        <circle cx="200" cy="450" r="2" fill="var(--accent)" />
        <circle cx="600" cy="350" r="2" fill="var(--accent)" />
        <circle cx="1000" cy="450" r="2" fill="var(--accent)" />
        <path d="M0 750 H250 V700 H500 V650 H750 V700 H1000 V750 H1250 V800 H1440" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4" />
        <circle cx="250" cy="700" r="1.5" fill="var(--accent)" />
        <circle cx="750" cy="700" r="1.5" fill="var(--accent)" />
        <circle cx="1250" cy="800" r="1.5" fill="var(--accent)" />
      </svg>
    </div>
  );
}
