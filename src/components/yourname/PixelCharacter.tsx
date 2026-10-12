"use client";

/**
 * PixelCharacter — the two Your Name-inspired chibi characters, now rendered
 * as AI-illustrated artwork (public/yourname/characters/*.png, transparent
 * background) instead of hand-drawn pixel grids.
 *
 * Same props API as before: call sites (HeroSection, ContactSection) are
 * unchanged. The beat-sync bounce wrapper is preserved.
 */

import React from "react";

export type CharacterId = "boy" | "girl";
export type CharacterPose = "idle" | "wave";

const ARTWORK: Record<CharacterId, Record<CharacterPose, string>> = {
  boy: {
    idle: "/yourname/characters/boy-idle.png",
    wave: "/yourname/characters/boy-wave.png",
  },
  girl: {
    idle: "/yourname/characters/girl-idle.png",
    wave: "/yourname/characters/girl-wave.png",
  },
};

export interface PixelCharacterProps {
  id: CharacterId;
  pose?: CharacterPose;
  /** bounceKey: change to re-trigger the bounce animation (e.g. on beat) */
  bounceKey?: number | string;
  className?: string;
  label: string;
}

export function PixelCharacter({
  id,
  pose = "idle",
  bounceKey,
  className = "",
  label,
}: PixelCharacterProps) {
  return (
    <div
      className={`yn-pixel-character ${className}`}
      title={label}
      aria-label={label}
      role="img"
    >
      {/* key change re-triggers the bounce animation */}
      <div key={String(bounceKey ?? pose)} className="yn-bounce">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ARTWORK[id][pose]}
          alt={label}
          draggable={false}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}
