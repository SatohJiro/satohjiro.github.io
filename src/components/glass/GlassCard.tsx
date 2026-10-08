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

/** Sleek dark card (Linear-style). API kept for drop-in compatibility. */
export function GlassCard({
  children,
  className,
  enableTilt = false,
  interactive = true,
  glowColor = "none",
  ...props
}: GlassCardProps) {
  void enableTilt;
  const glowStyles: Record<string, string> = {
    cyan: "hover:border-cyan-400/25",
    indigo: "hover:border-[#5e6ad2]/40",
    blue: "hover:border-[#5e6ad2]/40",
    emerald: "hover:border-emerald-400/25",
    amber: "hover:border-amber-400/25",
    rose: "hover:border-rose-400/25",
    none: "",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        interactive ? "sleek-card-interactive" : "sleek-card",
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
