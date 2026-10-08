"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassBadgeProps {
  children: ReactNode;
  variant?: "default" | "cyan" | "indigo" | "blue" | "emerald" | "amber" | "rose" | "purple";
  size?: "sm" | "md";
  className?: string;
}

/** Sleek dark badge (Linear-style). API kept for drop-in compatibility. */
export function GlassBadge({
  children,
  variant = "default",
  size = "sm",
  className,
}: GlassBadgeProps) {
  const variantStyles: Record<string, string> = {
    default: "sleek-badge text-[#b6b9c0]",
    cyan: "sleek-badge text-cyan-300/90 border-cyan-400/20 bg-cyan-400/[0.07]",
    indigo: "sleek-badge-accent",
    blue: "sleek-badge-accent",
    purple: "sleek-badge-accent",
    emerald: "sleek-badge-success",
    amber: "sleek-badge-warn",
    rose: "sleek-badge text-rose-300/90 border-rose-400/20 bg-rose-400/[0.07]",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span className={cn(variantStyles[variant], sizeStyles[size], className)}>
      {children}
    </span>
  );
}
