"use client";

import React from "react";

/**
 * Playful floating background shapes: soft colorful blobs
 * drifting over the cream dotted background.
 */
export function GlowSpotlight() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="play-float absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-[#ffd9ea] blur-3xl opacity-70" />
      <div className="play-float-delayed absolute top-[22%] right-[6%] h-80 w-80 rounded-full bg-[#ffedb8] blur-3xl opacity-70" />
      <div className="play-float absolute top-[48%] left-[4%] h-64 w-64 rounded-full bg-[#d8e4ff] blur-3xl opacity-60" />
      <div className="play-float-delayed absolute bottom-[8%] right-[12%] h-72 w-72 rounded-full bg-[#e6dcff] blur-3xl opacity-60" />
      <div className="play-float absolute bottom-[24%] left-[38%] h-56 w-56 rounded-full bg-[#cdf5dd] blur-3xl opacity-50" />
    </div>
  );
}
