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

export function GlassCard({
  children,
  className,
  enableTilt = false,
  interactive = true,
  glowColor: _glowColor,
  ...props
}: GlassCardProps) {
  void enableTilt;
  void _glowColor;
  return (
    <div
      className={cn(
        "journey-card relative p-6 transition-all duration-200",
        interactive && "hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
