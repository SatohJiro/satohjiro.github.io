"use client";

import React, { ReactNode, useEffect } from "react";
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

/** Editorial modal — paper panel, hairline border, sharp corners. */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "xl",
  className,
  closeLabel = "Close",
}: ModalProps) {
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
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className={cn(
            "ed-palette-pop relative z-10 my-6 flex max-h-[88vh] w-full flex-col overflow-hidden",
            "border border-[var(--ed-hairline)] bg-[var(--ed-paper)] shadow-2xl",
            maxWidthStyles[maxWidth],
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--ed-hairline)] px-6 py-5 sm:px-8">
            <div className="min-w-0">{title}</div>
            <button
              onClick={onClose}
              aria-label={closeLabel}
              className="shrink-0 rounded-lg border border-[var(--ed-hairline)] p-2 text-[var(--ed-muted)] transition-colors hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="overflow-y-auto px-6 py-6 sm:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
