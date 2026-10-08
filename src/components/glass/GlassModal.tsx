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
        className="fixed inset-0 bg-[#1c1a16]/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        {/* Modal Card */}
        <div
          className={cn(
            "mono-plate relative w-full !p-8 sm:!p-12 my-6 z-10 text-left",
            "max-h-[88vh] flex flex-col animate-in zoom-in-95 duration-200",
            maxWidthStyles[maxWidth],
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          {/* Fixed Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#e3ddd0] shrink-0">
            <div className="mono-title text-2xl pr-4">
              {title}
            </div>
            <button
              onClick={onClose}
              className="mono-caption hover:text-[#1e4d3b] cursor-pointer shrink-0 px-2 py-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto py-6 pr-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
