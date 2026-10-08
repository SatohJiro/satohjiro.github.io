"use client";

import React from "react";

/**
 * Subtle Linear-style ambient background: faint indigo/blue radial glows
 * over near-black, plus a fading grid. Restrained by design.
 */
export function GlowSpotlight() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Primary indigo glow, top center */}
      <div
        className="absolute left-1/2 top-[-320px] h-[640px] w-[900px] -translate-x-1/2 rounded-full opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(94,106,210,0.14) 0%, rgba(94,106,210,0.05) 45%, transparent 70%)",
        }}
      />
      {/* Secondary cool blue glow, left */}
      <div
        className="absolute left-[-200px] top-[30%] h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(56,120,255,0.06) 0%, transparent 65%)",
        }}
      />
      {/* Faint violet glow, right */}
      <div
        className="absolute right-[-180px] top-[55%] h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%)",
        }}
      />
      {/* Fading grid overlay */}
      <div className="sleek-grid-bg absolute inset-0" />
    </div>
  );
}
