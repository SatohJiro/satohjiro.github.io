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

/** Playful chunky button. API kept for drop-in compatibility. */
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
  void glow;
  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-[15px] gap-2.5",
  };

  const variantStyles = {
    primary: "play-btn-primary",
    glass: "play-btn-secondary",
    outline: "play-btn-secondary",
    ghost: "play-btn-ghost",
  };

  return (
    <button
      className={cn(
        "play-btn select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffb627]/50 disabled:cursor-not-allowed disabled:opacity-50",
        sizeStyles[size],
        variantStyles[variant],
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
