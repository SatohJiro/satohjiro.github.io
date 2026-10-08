"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  closeLabel?: string;
}

/**
 * Editorial modal — paper panel, hairline border, sharp corners.
 * Rendered via portal into document.body so no ancestor layout
 * (transforms, filters, containers) can break its fixed positioning.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "xl",
  className,
  closeLabel = "Close",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Note: globals.css sets `html { overflow-y: scroll }`, which makes
    // <html> (not <body>) the viewport scroller — so we must lock both.
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
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div
          className={cn(
            "ed-palette-pop relative z-10 my-8 flex max-h-[90vh] w-full flex-col overflow-hidden text-left",
            "border border-[var(--ed-hairline)] bg-[var(--ed-paper)] shadow-2xl",
            maxWidthStyles[maxWidth],
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--ed-hairline)] px-6 py-5 text-left sm:px-8">
            <div className="min-w-0">{title}</div>
            <button
              onClick={onClose}
              aria-label={closeLabel}
              className="shrink-0 rounded-lg border border-[var(--ed-hairline)] p-2 text-[var(--ed-muted)] transition-colors hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 text-left sm:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
