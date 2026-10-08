"use client";

import { useEffect, useState } from "react";

/** Returns scroll progress 0..1 across the whole document, rAF-throttled. */
export function useJourneyProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

/** Phase index 0..3 from progress. */
export function phaseFromProgress(p: number): number {
  if (p < 0.28) return 0;
  if (p < 0.55) return 1;
  if (p < 0.8) return 2;
  return 3;
}

/** Smooth opacity of a phase given progress (cross-fade). */
export function phaseOpacity(p: number, phase: number): number {
  const centers = [0.14, 0.415, 0.675, 0.9];
  const width = 0.22;
  const d = Math.abs(p - centers[phase]);
  return Math.max(0, 1 - d / width);
}
