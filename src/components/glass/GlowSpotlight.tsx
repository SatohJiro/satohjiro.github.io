"use client";

import React, { useEffect, useRef } from "react";

export function GlowSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    // Only enable mouse spotlight on devices with fine pointer (mouse/trackpad)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const updatePosition = () => {
      if (spotlight) {
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          spotlight.style.opacity = "1";
        }
        // Direct GPU-accelerated translate3d transform - 0 layout reflow & 0 React re-renders
        spotlight.style.transform = `translate3d(${mousePosRef.current.x - 300}px, ${mousePosRef.current.y - 300}px, 0)`;
      }
      rafIdRef.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      if (spotlight) {
        spotlight.style.opacity = "0";
        isVisibleRef.current = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Anti-Slop Ambient Lighting: High-end Neutral Slate / Zinc with single Electric Blue (#2563eb) Accent */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/[0.05] dark:bg-blue-600/[0.07] blur-[100px] animate-float-slow transform-gpu will-change-transform"
      />
      <div
        className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-slate-400/[0.05] dark:bg-blue-500/[0.05] blur-[120px] animate-float-reverse transform-gpu will-change-transform"
      />
      <div
        className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] rounded-full bg-blue-700/[0.04] dark:bg-blue-600/[0.06] blur-[110px] animate-float-slow transform-gpu will-change-transform"
      />

      {/* GPU-Moved Interactive Mouse Spotlight (Electric Blue #2563eb, Direct Translate3D, zero re-renders) */}
      <div
        ref={spotlightRef}
        className="hidden md:block pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] rounded-full opacity-0 transition-opacity duration-300 transform-gpu will-change-transform"
        style={{
          background: "radial-gradient(circle 300px at center, rgba(37, 99, 235, 0.08), rgba(37, 99, 235, 0.02) 45%, transparent 70%)",
        }}
      />

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />
    </div>
  );
}

