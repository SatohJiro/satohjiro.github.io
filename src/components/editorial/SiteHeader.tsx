"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Search, Sun, Moon, Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { editorialContent, chapters } from "@/data/editorial-content";
import { siteConfig } from "@/config/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { telemetry } from "@/lib/telemetry";

interface SiteHeaderProps {
  onOpenPalette: () => void;
}

export function SiteHeader({ onOpenPalette }: SiteHeaderProps) {
  const { isVi, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  // Avoid hydration mismatch for the theme icon without setState-in-effect.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const activeId = useScrollSpy(
    chapters.map((c) => c.id),
    "home"
  );
  const t = editorialContent.header;

  useEffect(() => {
    // html is the viewport scroller (see globals.css), so lock both.
    document.documentElement.style.overflowY = menuOpen ? "hidden" : "";
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflowY = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLabel = (id: string): string => {
    const label = siteConfig.navItems.find((n) => n.id === id)?.label;
    if (!label) return id;
    return typeof label === "string" ? label : isVi ? label.vi : label.en;
  };

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
    telemetry.track("click", `nav_${id}`);
  };

  const dark = mounted && resolvedTheme === "dark";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--ed-hairline)] bg-[var(--ed-paper)]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-baseline gap-2"
            aria-label="Back to top"
          >
            <span className="font-display text-xl font-bold tracking-tight text-[var(--ed-ink)]">
              {t.wordmark}
              <span className="text-blue-600 dark:text-blue-400">®</span>
            </span>
            <span className="hidden font-mono text-xs text-[var(--ed-muted)] sm:inline">
              {t.alias}
            </span>
          </button>

          {/* Chapter index — desktop */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {chapters.map((c) => {
              const active = activeId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => goTo(c.id)}
                  className={`group flex items-baseline gap-1.5 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer ${
                    active
                      ? "text-[var(--ed-ink)]"
                      : "text-[var(--ed-muted)] hover:text-[var(--ed-ink)]"
                  }`}
                  aria-current={active ? "true" : undefined}
                >
                  <span
                    className={`font-mono text-[10px] ${
                      active ? "text-blue-600 dark:text-blue-400" : "text-[var(--ed-muted)]/70"
                    }`}
                  >
                    {c.index}
                  </span>
                  <span className="font-medium">{navLabel(c.id)}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="mr-1 hidden items-center gap-1.5 font-mono text-[11px] text-[var(--ed-muted)] xl:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {isVi ? t.status.vi : t.status.en}
            </span>
            <button
              onClick={onOpenPalette}
              className="flex items-center gap-2 rounded-lg border border-[var(--ed-hairline)] px-2.5 py-1.5 font-mono text-xs text-[var(--ed-muted)] transition-colors hover:border-blue-500/50 hover:text-[var(--ed-ink)] cursor-pointer"
              title={isVi ? t.openPalette.vi : t.openPalette.en}
              aria-label={isVi ? t.openPalette.vi : t.openPalette.en}
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="hidden rounded border border-[var(--ed-hairline)] px-1 text-[10px] sm:inline">
                ⌘K
              </kbd>
            </button>
            <button
              onClick={() => {
                toggleLanguage();
                telemetry.track("click", "toggle_language");
              }}
              className="rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold text-[var(--ed-muted)] transition-colors hover:text-[var(--ed-ink)] cursor-pointer"
              title={isVi ? t.toggleLanguage.vi : t.toggleLanguage.en}
              aria-label={isVi ? t.toggleLanguage.vi : t.toggleLanguage.en}
            >
              {isVi ? "VI" : "EN"}
            </button>
            <button
              onClick={() => {
                setTheme(dark ? "light" : "dark");
                telemetry.track("click", "toggle_theme");
              }}
              className="rounded-lg p-2 text-[var(--ed-muted)] transition-colors hover:text-[var(--ed-ink)] cursor-pointer"
              title={isVi ? t.toggleTheme.vi : t.toggleTheme.en}
              aria-label={isVi ? t.toggleTheme.vi : t.toggleTheme.en}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 text-[var(--ed-ink)] lg:hidden cursor-pointer"
              aria-label={isVi ? t.menu.vi : t.menu.en}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile chapter menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--ed-paper)] lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-[var(--ed-hairline)] px-4 sm:px-6">
            <span className="font-display text-xl font-bold tracking-tight text-[var(--ed-ink)]">
              {t.wordmark}
              <span className="text-blue-600 dark:text-blue-400">®</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="rounded-lg p-2 text-[var(--ed-ink)] cursor-pointer"
              aria-label={isVi ? t.close.vi : t.close.en}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Sections">
            <ul className="space-y-1">
              {chapters.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => goTo(c.id)}
                    className="flex w-full items-baseline gap-4 border-b border-[var(--ed-hairline)] py-4 text-left cursor-pointer"
                  >
                    <span className="font-mono text-sm text-blue-600 dark:text-blue-400">
                      {c.index}
                    </span>
                    <span className="font-display text-3xl font-bold tracking-tight text-[var(--ed-ink)]">
                      {navLabel(c.id)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-[var(--ed-hairline)] px-6 py-5">
            <p className="font-mono text-xs text-[var(--ed-muted)]">
              {isVi ? t.status.vi : t.status.en} — {t.alias}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
