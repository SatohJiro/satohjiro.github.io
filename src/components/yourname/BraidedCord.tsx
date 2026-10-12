"use client";

/**
 * BraidedCord — the red braided-cord motif as a decorative divider.
 * Pure SVG: three interlaced strands + a musubi-style knot in the center.
 * Used between sections and as small section markers.
 */

import React from "react";

export function BraidedCord({ className = "" }: { className?: string }) {
  // three sine strands interlaced
  const strands = [0, 1, 2].map((s) => {
    const pts: string[] = [];
    for (let x = 0; x <= 600; x += 12) {
      const y = 14 + Math.sin((x / 600) * Math.PI * 10 + (s * Math.PI * 2) / 3) * 7;
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  });
  const shades = ["#8f1f36", "#d8364f", "#f2698a"];
  return (
    <div className={`yn-cord flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 28" className="h-7 w-full max-w-xl" preserveAspectRatio="xMidYMid meet">
        {strands.map((pts, i) => (
          <polyline
            key={i}
            points={pts}
            fill="none"
            stroke={shades[i]}
            strokeWidth={4.5 - i * 0.7}
            strokeLinecap="round"
            opacity={0.95 - i * 0.18}
          />
        ))}
        {/* center knot */}
        <circle cx={300} cy={14} r={9} fill="#d8364f" />
        <circle cx={300} cy={14} r={9} fill="none" stroke="#8f1f36" strokeWidth={2.5} />
        <circle cx={300} cy={14} r={3.2} fill="#ffd9e2" />
      </svg>
    </div>
  );
}

/** Small knot marker used inline before headings / list items. */
export function CordKnot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`inline-block h-4 w-4 ${className}`} aria-hidden="true">
      <circle cx={10} cy={10} r={7} fill="#d8364f" />
      <circle cx={10} cy={10} r={7} fill="none" stroke="#8f1f36" strokeWidth={2} />
      <circle cx={10} cy={10} r={2.4} fill="#ffd9e2" />
    </svg>
  );
}
