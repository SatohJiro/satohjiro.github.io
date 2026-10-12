"use client";

/**
 * PixelCharacter — the two Your Name-inspired chibi characters as
 * AI-illustrated artwork (public/yourname/characters/*.png, transparent
 * background), brought to life with calm, scene-fitting motion:
 *
 * - gentle sway, like standing in the evening breeze,
 * - periodic happy blinks (idle pose),
 * - every ~10–16s the character waves hello on its own,
 * - tap/click: happy hop + wave + floating hearts burst.
 *
 * Deliberately NOT synced to the music beat — the sky dances to the music,
 * the characters just enjoy the evening.
 *
 * Asset note: all poses of a character share one identical canvas (padded
 * and position-aligned), so blinks and pose swaps never jump or shift.
 */

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

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

/** Closed-eyes variants used for the periodic blink (idle pose only). */
const BLINK: Record<CharacterId, string> = {
  boy: "/yourname/characters/boy-blink.png",
  girl: "/yourname/characters/girl-blink.png",
};

const HEART_SPOTS = [8, 30, 52, 74, 92]; // % left positions for the burst

export interface PixelCharacterProps {
  id: CharacterId;
  pose?: CharacterPose;
  className?: string;
  label: string;
}

/**
 * Random pulse: turns `true` for `holdMs` every `minDelay–maxDelay` ms.
 * Used for blinks and autonomous waves.
 */
function useRandomPulse(
  active: boolean,
  minDelay: number,
  maxDelay: number,
  holdMs: number,
): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!active) return;
    let alive = true;
    let t1 = 0;
    let t2 = 0;
    const schedule = () => {
      t1 = window.setTimeout(
        () => {
          if (!alive) return;
          setOn(true);
          t2 = window.setTimeout(() => {
            if (!alive) return;
            setOn(false);
            schedule();
          }, holdMs);
        },
        minDelay + Math.random() * (maxDelay - minDelay),
      );
    };
    schedule();
    return () => {
      alive = false;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active, minDelay, maxDelay, holdMs]);
  return on;
}

export function PixelCharacter({
  id,
  pose = "idle",
  className = "",
  label,
}: PixelCharacterProps) {
  const idle = pose === "idle";
  const blinking = useRandomPulse(idle, 2600, 6000, 170);
  const autoWaving = useRandomPulse(idle, 10000, 16000, 1600);
  const [excited, setExcited] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);

  // End the tap excitement after the hop + hearts finish.
  useEffect(() => {
    if (!excited) return;
    const t = window.setTimeout(() => {
      setExcited(false);
      setHearts([]);
    }, 1250);
    return () => clearTimeout(t);
  }, [excited]);

  const handleInteract = () => {
    if (excited) return;
    setExcited(true);
    setHearts(HEART_SPOTS.map((_, i) => Date.now() + i));
  };

  const waving = excited || autoWaving;
  const shownPose: CharacterPose = waving ? "wave" : pose;

  return (
    <div
      className={`yn-pixel-character ${className}`}
      title={label}
      aria-label={label}
      role="button"
      tabIndex={0}
      onClick={handleInteract}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleInteract();
        }
      }}
    >
      <div className="yn-sway">
        <div className={excited ? "yn-hop" : ""}>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ARTWORK[id][shownPose]}
              alt={label}
              draggable={false}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            {shownPose === "idle" && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={BLINK[id]}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 transition-opacity duration-100"
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: blinking ? 1 : 0,
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* hearts burst */}
      {hearts.map((key, i) => (
        <Heart
          key={key}
          aria-hidden="true"
          className="yn-heart h-4 w-4 fill-rose-400 text-rose-300"
          style={{ left: `${HEART_SPOTS[i % HEART_SPOTS.length]}%`, animationDelay: `${i * 70}ms` }}
        />
      ))}
    </div>
  );
}
