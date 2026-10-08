"use client";

import React, { ReactNode, useEffect } from "react";
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

export function GlassModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "xl",
  className,
}: GlassModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
    "2xl": "max-w-4xl",
    "4xl": "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        {/* Modal Card */}
        <div
          className={cn(
            "relative w-full p-5 sm:p-7 my-6 z-10 text-left",
            "bg-white border-[3px] border-[#111] shadow-[8px_8px_0_#111]",
            "max-h-[88vh] flex flex-col animate-in zoom-in-95 duration-200",
            maxWidthStyles[maxWidth],
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          {/* Fixed Header */}
          <div className="flex items-center justify-between pb-4 border-b-[3px] border-[#111] shrink-0">
            <div className="font-display text-lg sm:text-xl font-black uppercase pr-4">
              {title}
            </div>
            <button
              onClick={onClose}
              className="border-[3px] border-[#111] bg-white p-1.5 hover:bg-[#ff3d00] hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto py-4 pr-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
