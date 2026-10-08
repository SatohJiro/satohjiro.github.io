"use client";

import React from "react";

/** Shared SVG wrapper: bottom-anchored, full-bleed. */
function Scene({
  children,
  opacity,
}: {
  children: React.ReactNode;
  opacity: number;
}) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ---------------- Countryside: rice paddies, palms, stilt house, dawn sun ---------------- */

export function CountrysideScene({ opacity }: { opacity: number }) {
  return (
    <Scene opacity={opacity}>
      {/* Sun with glow */}
      <circle cx="1080" cy="240" r="150" fill="#FFD98A" opacity="0.35" />
      <circle cx="1080" cy="240" r="90" fill="#FFCE6B" opacity="0.9" />
      {/* Birds */}
      <g stroke="#3A4A5A" strokeWidth="5" fill="none" opacity="0.55" strokeLinecap="round">
        <path d="M 250 180 q 14 -12 28 0 q 14 -12 28 0" />
        <path d="M 340 230 q 11 -10 22 0 q 11 -10 22 0" />
        <path d="M 180 260 q 10 -9 20 0 q 10 -9 20 0" />
      </g>
      {/* Far mountains */}
      <path
        d="M0 620 L180 420 L340 580 L520 380 L700 600 L880 440 L1060 610 L1240 460 L1440 600 L1440 900 L0 900 Z"
        fill="#7A8BA0"
        opacity="0.45"
      />
      {/* Near hills */}
      <path
        d="M0 700 L220 560 L460 700 L720 540 L980 710 L1220 580 L1440 700 L1440 900 L0 900 Z"
        fill="#5C7A5E"
        opacity="0.6"
      />
      {/* Palm trees */}
      <g opacity="0.85">
        <g transform="translate(180, 640)">
          <rect x="-7" y="0" width="14" height="120" rx="7" fill="#4A3B2A" />
          {[-50, -20, 10, 40].map((r, i) => (
            <ellipse
              key={i}
              cx={i % 2 === 0 ? -42 : 42}
              cy={-14 - i * 6}
              rx="52"
              ry="15"
              fill="#3E6B3A"
              transform={`rotate(${r} ${i % 2 === 0 ? -42 : 42} ${-14 - i * 6})`}
            />
          ))}
          <circle cx="0" cy="-8" r="16" fill="#5C8A4A" />
        </g>
        <g transform="translate(1290, 660) scale(0.8)">
          <rect x="-7" y="0" width="14" height="120" rx="7" fill="#4A3B2A" />
          {[200, 230, 260, 290].map((r, i) => (
            <ellipse
              key={i}
              cx={i % 2 === 0 ? -42 : 42}
              cy={-14 - i * 6}
              rx="52"
              ry="15"
              fill="#3E6B3A"
              transform={`rotate(${r} ${i % 2 === 0 ? -42 : 42} ${-14 - i * 6})`}
            />
          ))}
          <circle cx="0" cy="-8" r="16" fill="#5C8A4A" />
        </g>
      </g>
      {/* Stilt house */}
      <g transform="translate(1050, 620)" opacity="0.9">
        <rect x="-70" y="0" width="140" height="70" fill="#6B4F35" />
        <path d="M-90 -6 L0 -70 L90 -6 Z" fill="#4A3524" />
        {[-50, -17, 17, 50].map((x) => (
          <rect key={x} x={x - 5} y="70" width="10" height="50" fill="#4A3524" />
        ))}
        <rect x="-30" y="18" width="26" height="34" fill="#2E2117" />
        <rect x="14" y="18" width="26" height="34" fill="#2E2117" />
      </g>
      {/* Rice paddy rows */}
      <g stroke="#4E7A45" strokeWidth="7" fill="none" opacity="0.5" strokeLinecap="round">
        <path d="M-20 780 Q 360 740 720 780 T 1460 780" />
        <path d="M-20 830 Q 360 790 720 830 T 1460 830" />
        <path d="M-20 880 Q 360 840 720 880 T 1460 880" />
      </g>
      {/* Water buffalo silhouette */}
      <g transform="translate(420, 760)" fill="#3A3230" opacity="0.8">
        <ellipse cx="0" cy="0" rx="46" ry="26" />
        <circle cx="44" cy="-14" r="16" />
        <path d="M30 -24 Q 10 -44 -14 -30" stroke="none" strokeWidth="6" />
        <path d="M58 -24 Q 78 -44 102 -30" stroke="none" strokeWidth="6" />
        {[-28, 28].map((x) => (
          <rect key={x} x={x - 5} y="18" width="10" height="30" rx="5" />
        ))}
      </g>
    </Scene>
  );
}

/* ---------------- Saigon: skyline + Bitexco, golden light ---------------- */

export function SaigonScene({ opacity }: { opacity: number }) {
  const buildings: { x: number; w: number; h: number }[] = [
    { x: 20, w: 90, h: 260 },
    { x: 130, w: 70, h: 340 },
    { x: 220, w: 100, h: 220 },
    { x: 340, w: 80, h: 400 },
    { x: 700, w: 90, h: 300 },
    { x: 810, w: 70, h: 380 },
    { x: 900, w: 110, h: 240 },
    { x: 1030, w: 80, h: 350 },
    { x: 1130, w: 95, h: 280 },
    { x: 1245, w: 75, h: 420 },
    { x: 1340, w: 80, h: 300 },
  ];
  return (
    <Scene opacity={opacity}>
      {/* Sun */}
      <circle cx="720" cy="330" r="120" fill="#FFB35C" opacity="0.5" />
      <circle cx="720" cy="330" r="70" fill="#FFC878" opacity="0.95" />
      {/* Skyline */}
      <g fill="#2E3550" opacity="0.75">
        {buildings.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={900 - 180 - b.h} width={b.w} height={b.h + 180} />
            {/* windows */}
            {Array.from({ length: Math.floor(b.h / 46) }).map((_, r) =>
              Array.from({ length: Math.floor(b.w / 26) }).map((_, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={b.x + 10 + c * 26}
                  y={900 - 180 - b.h + 14 + r * 46}
                  width="12"
                  height="18"
                  fill="#FFD98A"
                  opacity={(r * 7 + c * 3 + i) % 3 === 0 ? 0.85 : 0.12}
                />
              ))
            )}
          </g>
        ))}
        {/* Bitexco Tower — iconic tapered top with helipad */}
        <g>
          <path d="M470 900 L470 320 L500 200 L560 200 L590 900 Z" />
          <path d="M500 200 L560 200 L620 140 L560 140 Z" fill="#2E3550" />
          <ellipse cx="590" cy="140" rx="34" ry="8" fill="#2E3550" />
        </g>
      </g>
      {/* Street */}
      <rect x="0" y="820" width="1440" height="80" fill="#232838" opacity="0.9" />
      <g stroke="#FFD98A" strokeWidth="6" strokeDasharray="40 30" opacity="0.7">
        <line x1="0" y1="860" x2="1440" y2="860" />
      </g>
      {/* Motorbikes */}
      <g fill="#1A1E2E" opacity="0.95">
        {[260, 700, 1080].map((x, i) => (
          <g key={i} transform={`translate(${x}, 830) scale(${0.9 + i * 0.15})`}>
            <circle cx="-22" cy="18" r="12" fill="none" stroke="#1A1E2E" strokeWidth="6" />
            <circle cx="22" cy="18" r="12" fill="none" stroke="#1A1E2E" strokeWidth="6" />
            <path d="M-22 18 L-4 -8 L14 -8 L22 18 M-4 -8 L-12 -22" stroke="#1A1E2E" strokeWidth="7" fill="none" strokeLinecap="round" />
            <circle cx="-10" cy="-30" r="9" />
            <rect x="-16" y="-24" width="12" height="18" rx="4" />
          </g>
        ))}
      </g>
    </Scene>
  );
}

/* ---------------- World: globe arc + landmarks, night ---------------- */

export function WorldScene({ opacity }: { opacity: number }) {
  return (
    <Scene opacity={opacity}>
      {/* Globe arc */}
      <circle cx="720" cy="1650" r="900" fill="#16224A" opacity="0.9" />
      <circle cx="720" cy="1650" r="900" fill="none" stroke="#3A5A9A" strokeWidth="6" opacity="0.8" />
      {/* Landmark silhouettes on the globe */}
      <g fill="#0C1330" opacity="0.95">
        {/* Eiffel Tower */}
        <g transform="translate(280, 690)">
          <path d="M-46 110 Q-20 40 -8 0 L8 0 Q20 40 46 110 L30 110 Q18 70 0 40 Q-18 70 -30 110 Z" />
          <rect x="-46" y="104" width="92" height="10" rx="3" />
        </g>
        {/* Pagoda */}
        <g transform="translate(720, 660)">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={-34 + i * 5} y={-i * 44} width={68 - i * 10} height="34" rx="4" />
              <path
                d={`M${-52 + i * 7} ${-i * 44} Q0 ${-22 - i * 44} ${52 - i * 7} ${-i * 44} L${40 - i * 6} ${-i * 44} Q0 ${-12 - i * 44} ${-40 + i * 6} ${-i * 44} Z`}
              />
            </g>
          ))}
          <rect x="-8" y="-140" width="16" height="30" />
        </g>
        {/* Torii gate */}
        <g transform="translate(1120, 700)" strokeLinecap="round">
          <rect x="-58" y="-110" width="116" height="14" rx="7" />
          <rect x="-44" y="-92" width="88" height="10" rx="5" />
          <rect x="-40" y="-96" width="12" height="96" />
          <rect x="28" y="-96" width="12" height="96" />
        </g>
      </g>
      {/* City lights on globe */}
      <g fill="#FFD98A" opacity="0.9">
        {[
          [420, 800], [520, 830], [640, 810], [880, 820], [990, 800], [1080, 835],
          [360, 850], [760, 845], [940, 855], [600, 860],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3.5 - (i % 3)} opacity={0.5 + (i % 3) * 0.2} />
        ))}
      </g>
    </Scene>
  );
}

/* ---------------- Space: stars, Earth, rocket, Saturn ---------------- */

function useStars(count: number) {
  return React.useMemo(() => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    return Array.from({ length: count }, (_, i) => ({
      x: rand() * 1440,
      y: rand() * 700,
      r: 1 + rand() * 2.2,
      o: 0.35 + rand() * 0.65,
      tw: 2 + rand() * 4,
      delay: rand() * 4,
      id: i,
    }));
  }, [count]);
}

export function SpaceScene({ opacity }: { opacity: number }) {
  const stars = useStars(130);
  return (
    <Scene opacity={opacity}>
      {/* Stars */}
      <g fill="#FFFFFF">
        {stars.map((s) => (
          <circle key={s.id} cx={s.x} cy={s.y} r={s.r} opacity={s.o}>
            <animate
              attributeName="opacity"
              values={`${s.o};${Math.min(1, s.o + 0.4)};${s.o}`}
              dur={`${s.tw}s`}
              begin={`${s.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
      {/* Saturn */}
      <g transform="translate(1150, 220)" opacity="0.95">
        <ellipse cx="0" cy="0" rx="110" ry="30" fill="none" stroke="#C8A86B" strokeWidth="14" opacity="0.85" transform="rotate(-18)" />
        <circle cx="0" cy="0" r="52" fill="#D8B878" />
        <circle cx="-14" cy="-12" r="52" fill="#B8945A" opacity="0.45" />
      </g>
      {/* Earth rising */}
      <g transform="translate(300, 780)">
        <circle cx="0" cy="0" r="190" fill="#2B6CB8" />
        <path d="M-150 -60 Q-90 -110 -30 -80 Q-60 -30 -110 -20 Q-160 -10 -150 -60 Z" fill="#3E9A5E" />
        <path d="M40 -100 Q110 -120 140 -60 Q100 -20 50 -40 Q20 -70 40 -100 Z" fill="#3E9A5E" />
        <path d="M-60 60 Q0 30 60 70 Q20 120 -40 100 Q-80 80 -60 60 Z" fill="#3E9A5E" />
        <path d="M-190 0 A190 190 0 0 1 190 0 L190 -40 A190 190 0 0 0 -190 -40 Z" fill="#FFFFFF" opacity="0.14" />
      </g>
      {/* Rocket */}
      <g transform="translate(880, 480) rotate(24)" opacity="0.95">
        <path d="M0 -70 Q26 -30 22 30 L-22 30 Q-26 -30 0 -70 Z" fill="#E8E8F0" />
        <circle cx="0" cy="-28" r="11" fill="#4D7CFE" stroke="#1E1E2A" strokeWidth="4" />
        <path d="M-22 30 L-40 58 L-20 48 Z" fill="#FF5CA8" />
        <path d="M22 30 L40 58 L20 48 Z" fill="#FF5CA8" />
        <path d="M-10 34 Q0 78 10 34 Q0 52 -10 34" fill="#FFB627">
          <animate attributeName="d" values="M-10 34 Q0 78 10 34 Q0 52 -10 34;M-10 34 Q0 96 10 34 Q0 52 -10 34;M-10 34 Q0 78 10 34 Q0 52 -10 34" dur="0.5s" repeatCount="indefinite" />
        </path>
      </g>
    </Scene>
  );
}
