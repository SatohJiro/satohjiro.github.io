"use client";

import React, { useEffect, useState, useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => {
    ready: Promise<void>;
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

interface RippleState {
  id: number;
  x: number;
  y: number;
  size: number;
  targetTheme: "light" | "dark";
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [ripples, setRipples] = useState<RippleState | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";
    const doc = document as DocumentWithViewTransition;

    // Always calculate the exact center of the theme toggle button
    const rect = buttonRef.current?.getBoundingClientRect() || event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Trigger physical concentric water ripple waves overlay with target theme awareness
    setRipples({
      id: Date.now(),
      x,
      y,
      size: endRadius * 2,
      targetTheme: nextTheme,
    });

    // Clean up water ripple overlay after animation ends
    setTimeout(() => {
      setRipples(null);
    }, 2200);

    // Fallback if View Transitions API is not supported or user prefers reduced motion
    if (
      !doc.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      telemetry.track("theme_change", nextTheme, { from: resolvedTheme || "unknown", to: nextTheme });
      return;
    }

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      // 1500ms with fluid wave easing creates a deep, soothing, high-clarity water ripple wave across the entire page
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 1500,
          easing: "cubic-bezier(0.32, 0, 0.18, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    telemetry.track("theme_change", nextTheme, { from: resolvedTheme || "unknown", to: nextTheme });
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="relative p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 active:scale-90 transition-all duration-200 cursor-pointer group shadow-xs"
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </button>

      {/* Realistic Concentric Water Ripple Waves with Direction-Aware High Contrast */}
      {ripples && (
        <div key={ripples.id} aria-hidden="true" className="pointer-events-none">
          <div
            className={`water-ripple-layer ${ripples.targetTheme === "light" ? "water-ripple-to-light-1" : "water-ripple-to-dark-1"
              }`}
            style={{
              left: `${ripples.x}px`,
              top: `${ripples.y}px`,
              width: `${ripples.size}px`,
              height: `${ripples.size}px`,
            }}
          />
          <div
            className={`water-ripple-layer ${ripples.targetTheme === "light" ? "water-ripple-to-light-2" : "water-ripple-to-dark-2"
              }`}
            style={{
              left: `${ripples.x}px`,
              top: `${ripples.y}px`,
              width: `${ripples.size}px`,
              height: `${ripples.size}px`,
            }}
          />
          <div
            className={`water-ripple-layer ${ripples.targetTheme === "light" ? "water-ripple-to-light-3" : "water-ripple-to-dark-3"
              }`}
            style={{
              left: `${ripples.x}px`,
              top: `${ripples.y}px`,
              width: `${ripples.size}px`,
              height: `${ripples.size}px`,
            }}
          />
        </div>
      )}
    </>
  );
}


