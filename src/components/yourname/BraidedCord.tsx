"use client";

/**
 * BraidedCord — the red braided-cord motif as a decorative divider.
 * Three interlaced sine strands (the classic kumihimo read) with a soft
 * drop shadow for depth and a rounded bead knot at the center.
 * Used between sections and as small section markers.
 */

import React from "react";

export function BraidedCord({ className = "" }: { className?: string }) {
  // three sine strands interlaced — long, flowing waves, slim cluster
  const PERIODS = 3.5;
  const AMPLITUDE = 5.5;
  const CENTER_Y = 12;
  const strands = [0, 1, 2].map((s) => {
    const pts: string[] = [];
    for (let x = 0; x <= 600; x += 10) {
      const y = CENTER_Y + Math.sin((x / 600) * Math.PI * 2 * PERIODS + (s * Math.PI * 2) / 3) * AMPLITUDE;
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  });
  const shadowPts = strands.map((pts) =>
    pts
      .split(" ")
      .map((p) => {
        const [x, y] = p.split(",");
        return `${x},${(parseFloat(y) + 1.2).toFixed(1)}`;
      })
      .join(" "),
  );
  // delicate highlight riding the lightest strand
  const highlightPts = strands[2]
    .split(" ")
    .map((p) => {
      const [x, y] = p.split(",");
      return `${x},${(parseFloat(y) - 1.1).toFixed(1)}`;
    })
    .join(" ");
  const shades = ["#8f1f36", "#d8364f", "#f2698a"];
  const widths = [2.6, 2.2, 1.8];
  return (
    <div className={`yn-cord flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 24" className="h-5 w-full max-w-xl" preserveAspectRatio="xMidYMid meet">
        {/* soft shadows under each strand */}
        {shadowPts.map((pts, i) => (
          <polyline
            key={`sh-${i}`}
            points={pts}
            fill="none"
            stroke="#2a0812"
            strokeWidth={widths[i] + 0.6}
            strokeLinecap="round"
            opacity={0.28}
          />
        ))}
        {strands.map((pts, i) => (
          <polyline
            key={i}
            points={pts}
            fill="none"
            stroke={shades[i]}
            strokeWidth={widths[i]}
            strokeLinecap="round"
            opacity={0.95 - i * 0.14}
          />
        ))}
        {/* fine highlight on the top strand */}
        <polyline
          points={highlightPts}
          fill="none"
          stroke="#ffd9e2"
          strokeWidth={0.9}
          strokeLinecap="round"
          opacity={0.5}
        />
      </svg>
    </div>
  );
}

/** Small knot marker used inline before headings / list items. */
export function CordKnot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`inline-block h-4 w-4 ${className}`} aria-hidden="true">
      <defs>
        <radialGradient id="yn-knot-bead" cx="0.38" cy="0.32" r="0.9">
          <stop offset="0" stopColor="#f2768a" />
          <stop offset="0.6" stopColor="#d8364f" />
          <stop offset="1" stopColor="#7d1a2e" />
        </radialGradient>
      </defs>
      <circle cx={10} cy={10} r={7.2} fill="url(#yn-knot-bead)" />
      <circle cx={10} cy={10} r={7.2} fill="none" stroke="#8f1f36" strokeWidth={1.4} opacity={0.7} />
      <ellipse cx={7.6} cy={7.4} rx={2.2} ry={1.5} fill="#ffd9e2" opacity={0.55} />
    </svg>
  );
}
