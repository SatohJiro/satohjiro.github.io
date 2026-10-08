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

type RGB = [number, number, number];

const skyStops: { p: number; top: RGB; bottom: RGB }[] = [
  { p: 0.0, top: [255, 214, 170], bottom: [184, 214, 232] }, // countryside dawn
  { p: 0.28, top: [126, 200, 232], bottom: [232, 244, 248] }, // Saigon day
  { p: 0.55, top: [255, 154, 106], bottom: [74, 90, 138] }, // sunset
  { p: 0.72, top: [10, 16, 48], bottom: [26, 42, 90] }, // world night
  { p: 1.0, top: [2, 2, 10], bottom: [12, 12, 32] }, // space
];

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function mix(c1: RGB, c2: RGB, t: number): RGB {
  return [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
}

function css(c: RGB) {
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

/** Interpolated sky gradient for a progress value. */
export function skyGradient(p: number): string {
  let i = 0;
  while (i < skyStops.length - 2 && p > skyStops[i + 1].p) i++;
  const a = skyStops[i];
  const b = skyStops[i + 1];
  const t = Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p)));
  return `linear-gradient(180deg, ${css(mix(a.top, b.top, t))} 0%, ${css(
    mix(a.bottom, b.bottom, t)
  )} 100%)`;
}
