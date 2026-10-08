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

/** Playful chunky modal, portaled to document.body. */
export function GlassModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "xl",
  className,
}: GlassModalProps) {
  const [mounted] = useState(() => typeof document !== "undefined");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

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
        className="fixed inset-0 bg-[#1e1e2a]/45 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div
          className={cn(
            "relative z-10 my-8 flex max-h-[90vh] w-full flex-col overflow-hidden text-left",
            "rounded-[28px] border-[3px] border-[#1e1e2a] bg-[#fffdf8] shadow-[10px_10px_0_0_rgba(30,30,42,0.9)]",
            maxWidthStyles[maxWidth],
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b-2 border-[#1e1e2a]/10 bg-[#ffb627]/15 px-6 py-4">
            <div className="min-w-0 font-display text-lg font-bold tracking-tight text-[#1e1e2a]">
              {title}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 rounded-full border-2 border-[#1e1e2a] bg-white p-1.5 text-[#1e1e2a] shadow-[2px_2px_0_0_#1e1e2a] transition-transform hover:rotate-90 cursor-pointer"
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
