"use client";

import React from "react";
import { Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { osContent } from "@/data/os-content";
import { resolveOsIcon } from "./os-icons";
import { telemetry } from "@/lib/telemetry";

function scrollToHref(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function DesktopDock({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { t } = useLanguage();
  const activeSection = useScrollSpy(
    siteConfig.navItems.map((item) => item.id),
    "home",
  );

  return (
    <nav
      aria-label={t(osContent.dock.label)}
      className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 lg:block"
    >
      <div className="os-dock flex items-end gap-1 px-3 py-2">
        {siteConfig.navItems.map((item) => {
          const Icon = resolveOsIcon(item.icon);
          const isActive = activeSection === item.id;
          const label = t(item.label);
          return (
            <div key={item.id} className="group relative flex flex-col items-center">
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg border border-slate-200/70 bg-white/95 px-2 py-1 text-[11px] font-medium text-slate-700 opacity-0 shadow-lg transition-all duration-150 group-hover:-top-10 group-hover:opacity-100 dark:border-white/10 dark:bg-slate-900/95 dark:text-slate-200"
              >
                {label}
              </span>
              <button
                onClick={() => {
                  telemetry.track("click", `dock_${item.id}`);
                  scrollToHref(item.href);
                }}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl transition-all duration-150 group-hover:-translate-y-1 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
              </button>
              <span
                className={`mt-1 h-1 w-1 rounded-full transition-opacity ${
                  isActive ? "bg-blue-600 opacity-100 dark:bg-blue-400" : "opacity-0"
                }`}
                aria-hidden="true"
              />
            </div>
          );
        })}

        <div className="mx-1 h-8 w-px self-center bg-slate-300/60 dark:bg-white/15" aria-hidden="true" />

        <div className="group relative flex flex-col items-center">
          <span
            role="tooltip"
            className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg border border-slate-200/70 bg-white/95 px-2 py-1 text-[11px] font-medium text-slate-700 opacity-0 shadow-lg transition-all duration-150 group-hover:-top-10 group-hover:opacity-100 dark:border-white/10 dark:bg-slate-900/95 dark:text-slate-200"
          >
            {t(osContent.dock.openPalette)} (⌘K)
          </span>
          <button
            onClick={() => {
              telemetry.track("click", "dock_palette");
              onOpenPalette();
            }}
            aria-label={t(osContent.dock.openPalette)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-slate-600 transition-all duration-150 group-hover:-translate-y-1 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Search className="h-5 w-5" />
          </button>
          <span className="mt-1 h-1 w-1 rounded-full opacity-0" aria-hidden="true" />
        </div>
      </div>
    </nav>
  );
}
