"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "premium";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { children, variant = "default", size = "md", dot = false, className, ...props },
    ref
  ) => {
    const variants = {
      default:
        "bg-[rgba(128,128,128,0.06)] text-[var(--fg-muted)] border-[rgba(44,24,16,0.1)]",
      success:
        "bg-green-100 text-green-700 border-green-200",
      warning:
        "bg-amber-100 text-amber-700 border-amber-200",
      danger:
        "bg-red-100 text-red-700 border-red-200",
      info:
        "bg-[rgba(74,158,107,0.1)] text-[var(--accent)] border-[rgba(74,158,107,0.2)]",
      premium:
        "text-white border-transparent shadow-lg",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs gap-1",
      md: "px-2.5 py-1 text-sm gap-1.5",
      lg: "px-3 py-1.5 text-base gap-2",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full border",
          variants[variant],
          sizes[size],
          variant === "premium" ? "bg-gradient-to-r from-[var(--accent)] to-[#e6815c]" : "",
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              variant === "premium" ? "bg-white/80" : "bg-current"
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
