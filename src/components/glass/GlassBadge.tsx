"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassBadgeProps {
  children: ReactNode;
  variant?: "default" | "cyan" | "indigo" | "blue" | "emerald" | "amber" | "rose" | "purple";
  size?: "sm" | "md";
  className?: string;
}

/** Playful sticker badge. API kept for drop-in compatibility. */
export function GlassBadge({
  children,
  variant = "default",
  size = "sm",
  className,
}: GlassBadgeProps) {
  const variantStyles: Record<string, string> = {
    default: "play-badge play-badge-neutral",
    cyan: "play-badge play-badge-blue",
    indigo: "play-badge play-badge-purple",
    blue: "play-badge play-badge-blue",
    purple: "play-badge play-badge-purple",
    emerald: "play-badge play-badge-green",
    amber: "play-badge play-badge-yellow",
    rose: "play-badge play-badge-pink",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3.5 py-1 text-xs",
  };

  return (
    <span className={cn(variantStyles[variant], sizeStyles[size], className)}>
      {children}
    </span>
  );
}
