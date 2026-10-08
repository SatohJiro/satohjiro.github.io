"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
  interactive?: boolean;
  glowColor?: "cyan" | "indigo" | "blue" | "emerald" | "amber" | "rose" | "none";
}

/** Playful chunky card. API kept for drop-in compatibility. */
export function GlassCard({
  children,
  className,
  enableTilt = false,
  interactive = true,
  glowColor = "none",
  ...props
}: GlassCardProps) {
  void enableTilt;
  void glowColor;
  return (
    <div
      className={cn(
        "relative",
        interactive ? "play-card-interactive" : "play-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
