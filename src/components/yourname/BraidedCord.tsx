"use client";

/**
 * BraidedCord — the red braided-cord motif as a decorative divider.
 *
 * Rendered like a real kumihimo round braid: a cylindrical cord body with
 * vertical shading, diagonal twist ribs, a top sheen highlight, and a
 * musubi bow knot tied at the center (loops + wrap + hanging tails).
 * Used between sections and as small section markers.
 */

import React from "react";

const CORD_X0 = 14;
const CORD_X1 = 586;
const CORD_Y = 17;
const CORD_H = 14;

function TwistRibs() {
  const ribs: React.ReactNode[] = [];
  let i = 0;
  for (let x = CORD_X0 + 8; x < CORD_X1 - 8; x += 13, i++) {
    const dark = i % 2 === 0;
    ribs.push(
      <polygon
        key={x}
        points={`${x},${CORD_Y} ${x + 8},${CORD_Y} ${x + 3},${CORD_Y + CORD_H} ${x - 5},${CORD_Y + CORD_H}`}
        fill={dark ? "rgba(40,4,12,0.28)" : "rgba(255,255,255,0.10)"}
      />,
    );
  }
  return <>{ribs}</>;
}

export function BraidedCord({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 52" className="h-9 w-full max-w-xl" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="yn-cord-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5e1224" />
            <stop offset="0.32" stopColor="#b02340" />
            <stop offset="0.5" stopColor="#f2768f" />
            <stop offset="0.68" stopColor="#b02340" />
            <stop offset="1" stopColor="#5e1224" />
          </linearGradient>
          <linearGradient id="yn-cord-knot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e8556e" />
            <stop offset="0.55" stopColor="#c22a44" />
            <stop offset="1" stopColor="#8f1f36" />
          </linearGradient>
          <filter id="yn-cord-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.6" />
          </filter>
        </defs>

        {/* ground shadow */}
        <ellipse cx="300" cy="44" rx="252" ry="4.5" fill="#1a0a18" opacity="0.35" filter="url(#yn-cord-soft)" />

        {/* tails (behind the knot) */}
        <path d="M293,30 C290,37 286,42 280,47" fill="none" stroke="#8f1f36" strokeWidth="7" strokeLinecap="round" />
        <path d="M293,30 C290,37 286,42 280,47" fill="none" stroke="#f2768f" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M307,30 C310,37 314,42 320,47" fill="none" stroke="#8f1f36" strokeWidth="7" strokeLinecap="round" />
        <path d="M307,30 C310,37 314,42 320,47" fill="none" stroke="#f2768f" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* cord body */}
        <rect x={CORD_X0} y={CORD_Y} width={CORD_X1 - CORD_X0} height={CORD_H} rx={CORD_H / 2} fill="url(#yn-cord-body)" />
        <TwistRibs />
        {/* sheen along the top */}
        <rect x={CORD_X0 + 10} y={CORD_Y + 1.8} width={CORD_X1 - CORD_X0 - 20} height={2.6} rx={1.3} fill="#ffd9e2" opacity="0.32" />
        {/* darker end caps */}
        <ellipse cx={CORD_X0 + 2} cy={CORD_Y + CORD_H / 2} rx={6} ry={CORD_H / 2} fill="#4a0e1e" opacity="0.55" />
        <ellipse cx={CORD_X1 - 2} cy={CORD_Y + CORD_H / 2} rx={6} ry={CORD_H / 2} fill="#4a0e1e" opacity="0.55" />

        {/* musubi bow loops */}
        <path
          d="M300,24 C284,8 264,6 256,16 C250,24 260,34 278,34 C290,34 298,30 300,24 Z"
          fill="url(#yn-cord-knot)"
          stroke="#6e1a2c"
          strokeWidth="1.2"
        />
        <path
          d="M300,24 C316,8 336,6 344,16 C350,24 340,34 322,34 C310,34 302,30 300,24 Z"
          fill="url(#yn-cord-knot)"
          stroke="#6e1a2c"
          strokeWidth="1.2"
        />
        {/* loop highlights */}
        <path d="M288,14 C278,10 268,10 262,15" fill="none" stroke="#f7a8bb" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M312,14 C322,10 332,10 338,15" fill="none" stroke="#f7a8bb" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* center wrap */}
        <rect x="289" y="13" width="22" height="22" rx="7" fill="url(#yn-cord-knot)" stroke="#5e1224" strokeWidth="1.6" />
        <line x1="296" y1="15" x2="296" y2="33" stroke="rgba(40,4,12,0.4)" strokeWidth="1.6" />
        <line x1="304" y1="15" x2="304" y2="33" stroke="rgba(40,4,12,0.4)" strokeWidth="1.6" />
        <rect x="291.5" y="15" width="4" height="18" rx="2" fill="#f7a8bb" opacity="0.45" />
      </svg>
    </div>
  );
}

/** Small knot marker used inline before headings / list items. */
export function CordKnot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`inline-block h-4 w-4 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="yn-knot-mini" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8364f" />
          <stop offset="1" stopColor="#7d1a2e" />
        </linearGradient>
      </defs>
      <path d="M12,12 C8,6 3,6 2.4,10.2 C1.9,14 7,16.4 12,12 Z" fill="url(#yn-knot-mini)" stroke="#5e1224" strokeWidth="1.2" />
      <path d="M12,12 C16,6 21,6 21.6,10.2 C22.1,14 17,16.4 12,12 Z" fill="url(#yn-knot-mini)" stroke="#5e1224" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3.6" fill="#d8364f" stroke="#5e1224" strokeWidth="1.2" />
      <circle cx="10.8" cy="10.8" r="1.1" fill="#f7a8bb" opacity="0.8" />
    </svg>
  );
}
