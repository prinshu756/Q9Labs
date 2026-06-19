"use client";

import { forwardRef, useState, useCallback, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
  ripple?: boolean;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      ripple = true,
      className,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ripple) {
          onClick?.(e);
          return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
        onClick?.(e);
      },
      [onClick, ripple]
    );

    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";

    const variants = {
      primary:
        "text-white hover:brightness-110 focus-visible:ring-[var(--accent)] shadow-lg active:scale-[0.98]",
      secondary:
        "hover:brightness-95 focus-visible:ring-[var(--accent)] active:scale-[0.98]",
      outline:
        "border-2 border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/10 focus-visible:ring-[var(--accent)] active:scale-[0.98]",
      ghost:
        "text-[var(--fg-muted)] hover:bg-black/5 focus-visible:ring-[var(--accent)] active:scale-[0.98]",
      destructive:
        "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 shadow-lg active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-3 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-2.5",
      xl: "px-10 py-5 text-xl gap-3",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          variant === "primary" && "var(--accent)",
          variant === "secondary" ? "bg-black/5 text-[var(--fg)] border border-black/10" : "",
          fullWidth && "w-full",
          className
        )}
        style={variant === "primary" ? { background: "var(--accent)" } : undefined}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
            style={{
              left: r.x - 10,
              top: r.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
