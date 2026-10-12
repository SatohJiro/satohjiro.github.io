"use client";

/**
 * PixelCharacter — the two Your Name-inspired chibi characters as
 * AI-illustrated artwork (public/yourname/characters/*.png, transparent
 * background), brought to life:
 *
 * - periodic happy blinks (idle pose),
 * - gentle "breathing" idle motion,
 * - squash-and-stretch bounce on every detected beat,
 * - tap/click: happy hop + temporary wave + floating hearts burst.
 *
 * Same props API as before: call sites (HeroSection, ContactSection) only
 * needed pointer-events re-enabled to let clicks through.
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
  const [blinking, setBlinking] = useState(false);
  const [excited, setExcited] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const timers = useRef<number[]>([]);

  // Periodic happy blink (idle pose only): every ~3–6s, eyes close ~170ms.
  useEffect(() => {
    if (pose !== "idle") return;
    let alive = true;
    const later = (fn: () => void, ms: number) => {
      const t = window.setTimeout(() => {
        if (alive) fn();
      }, ms);
      timers.current.push(t);
    };
    const schedule = (): void => {
      later(() => {
        setBlinking(true);
        later(() => {
          setBlinking(false);
          schedule();
        }, 170);
      }, 2600 + Math.random() * 3400);
    };
    schedule();
    return () => {
      alive = false;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [pose]);

  // Tap / click: happy hop, brief wave, hearts burst.
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

  const shownPose: CharacterPose = excited ? "wave" : pose;

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
      <div className="yn-breathe">
        {/* key change re-triggers the bounce animation */}
        <div
          key={String(bounceKey ?? pose)}
          className={`yn-bounce${excited ? " yn-hop" : ""}`}
        >
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
