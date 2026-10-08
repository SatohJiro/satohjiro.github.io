"use client";

import React, { useEffect } from "react";
import {
  useJourneyProgress,
  phaseFromProgress,
  phaseOpacity,
  skyGradient,
} from "./useJourney";
import {
  CountrysideScene,
  SaigonScene,
  WorldScene,
  SpaceScene,
} from "./scenes";

const PHASE_NAMES = ["countryside", "saigon", "world", "space"] as const;

/** Fixed scroll-driven background: countryside -> Saigon -> world -> space. */
export function JourneyBackground() {
  const progress = useJourneyProgress();
  const phase = phaseFromProgress(progress);

  // Expose phase for adaptive theming (text colors switch day/night).
  useEffect(() => {
    document.body.dataset.journeyPhase = String(phase);
    document.body.dataset.journeyName = PHASE_NAMES[phase];
  }, [phase ]);

  const travelerX = -120 + progress * 115; // vw, rides across then lifts off
  const rocketOpacity = Math.max(0, (progress - 0.78) / 0.12);
  const bikeOpacity = 1 - Math.min(1, Math.max(0, (progress - 0.72) / 0.14));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Sky */}
      <div
        className="absolute inset-0 transition-[background] duration-150"
        style={{ background: skyGradient(progress) }}
      />

      {/* Scenes cross-fade */}
      <div className="absolute inset-0">
        <CountrysideScene opacity={phaseOpacity(progress, 0)} />
        <SaigonScene opacity={phaseOpacity(progress, 1)} />
        <WorldScene opacity={phaseOpacity(progress, 2)} />
        <SpaceScene opacity={phaseOpacity(progress, 3)} />
      </div>

      {/* Ground shadow band for depth (day phases) */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(20,26,20,0.22))",
          opacity: 1 - phaseOpacity(progress, 2) - phaseOpacity(progress, 3),
        }}
      />

      {/* Traveler: motorbike riding through the journey, becomes rocket */}
      <div
        className="absolute bottom-[9vh] left-0 will-change-transform"
        style={{
          transform: `translateX(${travelerX}vw)`,
          opacity: bikeOpacity,
        }}
      >
        <svg width="120" height="80" viewBox="0 0 120 80" fill="#1E2430">
          <circle cx="28" cy="58" r="14" fill="none" stroke="#1E2430" strokeWidth="7" />
          <circle cx="92" cy="58" r="14" fill="none" stroke="#1E2430" strokeWidth="7" />
          <path
            d="M28 58 L48 30 L70 30 L92 58 M48 30 L40 14"
            stroke="#1E2430"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="8" r="9" />
          <rect x="37" y="12" width="14" height="20" rx="5" />
          {/* scarf fluttering */}
          <path d="M50 16 Q74 8 92 18 Q74 20 52 26 Z" fill="#FF5CA8" opacity="0.9">
            <animate
              attributeName="d"
              values="M50 16 Q74 8 92 18 Q74 20 52 26 Z;M50 16 Q76 14 94 22 Q74 24 52 26 Z;M50 16 Q74 8 92 18 Q74 20 52 26 Z"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      {/* Rocket lift-off in space phase */}
      <div
        className="absolute left-[62vw] top-[30vh] will-change-transform"
        style={{
          opacity: rocketOpacity,
          transform: `translateY(${(1 - rocketOpacity) * 120}px) rotate(18deg)`,
        }}
      >
        <svg width="72" height="110" viewBox="0 0 72 110">
          <path d="M36 6 Q58 40 52 78 L20 78 Q14 40 36 6 Z" fill="#F2F2F8" />
          <circle cx="36" cy="42" r="10" fill="#4D7CFE" stroke="#1E1E2A" strokeWidth="4" />
          <path d="M20 78 L6 104 L24 94 Z" fill="#FF5CA8" />
          <path d="M52 78 L66 104 L48 94 Z" fill="#FF5CA8" />
          <ellipse cx="36" cy="96" rx="8" ry="16" fill="#FFB627" opacity="0.9">
            <animate attributeName="ry" values="16;22;16" dur="0.4s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      </div>

      {/* Vignette for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 40%, transparent 55%, rgba(8,10,18,0.28) 100%)",
          opacity: phaseOpacity(progress, 2) * 0.7 + phaseOpacity(progress, 3),
        }}
      />
    </div>
  );
}
