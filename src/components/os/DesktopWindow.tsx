"use client";

import React from "react";

/** macOS-style window chrome for SatohOS apps. */
export function DesktopWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`os-window ${className}`}>
      <div className="flex items-center gap-2 border-b border-slate-200/70 px-4 py-3 dark:border-white/10">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 truncate text-center font-mono text-xs text-slate-500 dark:text-slate-400">
          {title}
        </div>
        <div className="w-14" aria-hidden="true" />
      </div>
      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
}
