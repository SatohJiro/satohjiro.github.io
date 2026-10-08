"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
  className?: string;
}

/** Sleek dark modal (Linear-style), portaled to document.body. */
export function GlassModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "xl",
  className,
}: GlassModalProps) {
  // Mounted flag for portal (avoids SSR mismatch); set via lazy initializer.
  const [mounted] = useState(() => typeof document !== "undefined");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // html { overflow-y: scroll } makes <html> the viewport scroller — lock both.
    const root = document.documentElement;
    if (isOpen) {
      root.style.overflowY = "hidden";
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      root.style.overflowY = "";
      document.body.style.overflow = "";
    }

    return () => {
      root.style.overflowY = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
    "2xl": "max-w-4xl",
    "4xl": "max-w-6xl",
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div
          className={cn(
            "relative z-10 my-8 flex max-h-[90vh] w-full flex-col overflow-hidden text-left",
            "rounded-2xl border border-white/10 bg-[#0d0e11] shadow-[0_24px_80px_-16px_rgba(0,0,0,0.8)]",
            maxWidthStyles[maxWidth],
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.06] px-6 py-4">
            <div className="min-w-0 text-[15px] font-semibold tracking-tight text-[#f7f8f8]">
              {title}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 rounded-lg p-1.5 text-[#8a8f98] transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
