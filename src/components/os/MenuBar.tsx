"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Search, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { osContent } from "@/data/os-content";
import { telemetry } from "@/lib/telemetry";

export function MenuBar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { isVi, toggleLanguage, language } = useLanguage();
  const { theme, setTheme } = useTheme();
  // Lazy init renders server-safe "--:--" only when window is unavailable.
  const [now, setNow] = useState<Date | null>(() =>
    typeof window === "undefined" ? null : new Date(),
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const timeStr = now
    ? now.toLocaleTimeString(isVi ? "vi-VN" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "--:--";

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    telemetry.track("theme_change", theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed top-0 inset-x-0 z-40 hidden lg:block">
      <div className="os-menubar flex h-10 items-center justify-between px-4">
        {/* Left: brand + status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 font-mono text-[10px] font-extrabold text-white">
              NTA
            </div>
            <span className="text-[13px] font-bold tracking-tight text-slate-900 dark:text-white">
              {osContent.menuBar.osName}
            </span>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 xl:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
              {isVi ? osContent.menuBar.status.vi : osContent.menuBar.status.en}
            </span>
          </div>
        </div>

        {/* Right: palette, language, theme, clock */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              telemetry.track("click", "menubar_palette");
              onOpenPalette();
            }}
            aria-label={isVi ? osContent.menuBar.openPalette.vi : osContent.menuBar.openPalette.en}
            className="os-menubar-btn"
          >
            <Search className="h-3.5 w-3.5" />
            <kbd className="rounded border border-slate-300/60 px-1 font-mono text-[10px] text-slate-500 dark:border-white/15 dark:text-slate-400">
              ⌘K
            </kbd>
          </button>
          <button
            onClick={() => toggleLanguage()}
            aria-label={isVi ? osContent.menuBar.toggleLanguage.vi : osContent.menuBar.toggleLanguage.en}
            className="os-menubar-btn font-mono text-[11px] font-bold"
          >
            {language === "en" ? "EN" : "VI"}
          </button>
          <button
            onClick={handleToggleTheme}
            aria-label={isVi ? osContent.menuBar.toggleTheme.vi : osContent.menuBar.toggleTheme.en}
            className="os-menubar-btn"
          >
            {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <span className="ml-1 font-mono text-xs text-slate-600 dark:text-slate-300 tabular-nums">
            {timeStr}
          </span>
        </div>
      </div>
    </div>
  );
}
