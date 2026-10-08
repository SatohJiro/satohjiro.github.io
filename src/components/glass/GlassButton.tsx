"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "glass" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  glow?: boolean;
}

/** Sleek dark button (Linear-style). API kept for drop-in compatibility. */
export function GlassButton({
  children,
  className,
  variant = "glass",
  size = "md",
  icon,
  iconPosition = "left",
  glow = false,
  ...props
}: GlassButtonProps) {
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-[15px] gap-2.5",
  };

  const variantStyles = {
    primary: "sleek-btn-primary font-medium",
    glass: "sleek-btn-secondary",
    outline: "sleek-btn-secondary",
    ghost: "sleek-btn-ghost",
  };

  return (
    <button
      className={cn(
        "sleek-btn select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5e6ad2]/60 disabled:cursor-not-allowed disabled:opacity-50",
        sizeStyles[size],
        variantStyles[variant],
        glow && "shadow-[0_0_24px_rgba(94,106,210,0.45)]",
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
