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
 */

import React, { useEffect, useRef, useState } from "react";
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

/** Run `fn` after a random delay in [minMs, maxMs], tracked for cleanup. */
function useRandomLoop(
  active: boolean,
  minMs: number,
  maxMs: number,
  fn: () => void,
  holdMs = 0,
) {
  const timers = useRef<number[]>([]);
  useEffect(() => {
    if (!active) return;
    let alive = true;
    const later = (cb: () => void, ms: number) => {
      const t = window.setTimeout(() => {
        if (alive) cb();
      }, ms);
      timers.current.push(t);
    };
    const schedule = (): void => {
      later(() => {
        fn();
        if (holdMs > 0) later(schedule, holdMs);
        else schedule();
      }, minMs + Math.random() * (maxMs - minMs));
    };
    schedule();
    return () => {
      alive = false;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}

export function PixelCharacter({
  id,
  pose = "idle",
  className = "",
  label,
}: PixelCharacterProps) {
  const [blinking, setBlinking] = useState(false);
  const [autoWaving, setAutoWaving] = useState(false);
  const [excited, setExcited] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const timers = useRef<number[]>([]);
  const idle = pose === "idle";

  // Periodic happy blink: every ~3–6s, eyes close ~170ms.
  useRandomLoop(
    idle,
    2600,
    6000,
    () => {
      setBlinking(true);
      const t = window.setTimeout(() => setBlinking(false), 170);
      timers.current.push(t);
    },
  );

  // Every ~10–16s the character waves hello on its own for ~1.6s.
  useRandomLoop(idle, 10000, 16000, () => setAutoWaving(true), 1600);
  useEffect(() => {
    if (!autoWaving) return;
    const t = window.setTimeout(() => setAutoWaving(false), 1600);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [autoWaving]);

  // Tap / click: happy hop, wave, hearts burst.
  const handleInteract = () => {
    if (excited) return;
    setExcited(true);
    setHearts(HEART_SPOTS.map((_, i) => Date.now() + i));
    const t = window.setTimeout(() => {
      setExcited(false);
      setHearts([]);
    }, 1250);
    timers.current.push(t);
  };

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

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
