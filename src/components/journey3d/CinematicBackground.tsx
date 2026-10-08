"use client";

import React, { useEffect, useRef } from "react";
import { phaseFromProgress, phaseOpacity } from "./useJourney";

const PHASE_NAMES = ["countryside", "saigon", "world", "space"] as const;

const IMAGES = [
  "/journey/countryside.jpg",
  "/journey/saigon.jpg",
  "/journey/earth.jpg",
  "/journey/space.jpg",
];

/** Syncs body[data-journey-phase] for adaptive text theming (DOM-only, no re-renders). */
function JourneyPhaseSync() {
  useEffect(() => {
    let raf = 0;
    let lastPhase = -1;
    const tick = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const phase = phaseFromProgress(p);
      if (phase !== lastPhase) {
        lastPhase = phase;
        document.body.dataset.journeyPhase = String(phase);
        document.body.dataset.journeyName = PHASE_NAMES[phase];
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}

/**
 * Cinematic scroll-driven background: photorealistic scenes cross-fading
 * with slow Ken Burns drift, film grain, and a readability grade.
 */
export function CinematicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Direct DOM updates for 60fps parallax without re-renders
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    let lastP = -1;
    let lastPhase = -1;
    const tick = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (Math.abs(p - lastP) > 0.0005) {
        lastP = p;
        const layers = el.querySelectorAll<HTMLElement>("[data-scene]");
        layers.forEach((layer, i) => {
          const op = phaseOpacity(p, i);
          // Ken Burns: slow zoom + drift, offset per scene so motion feels continuous
          const zoom = 1.08 + p * 0.1 + i * 0.015;
          const driftX = (p * 30 - i * 12) % 40;
          const driftY = p * -24 + i * 6;
          layer.style.opacity = op.toFixed(3);
          layer.style.transform = `scale(${zoom.toFixed(4)}) translate(${driftX.toFixed(2)}px, ${driftY.toFixed(2)}px)`;
        });
        if (barRef.current) {
          barRef.current.style.width = `${(p * 100).toFixed(1)}%`;
        }
        const phase = phaseFromProgress(p);
        if (phase !== lastPhase && captionRef.current) {
          lastPhase = phase;
          captionRef.current.textContent = (
            ["01 — Countryside", "02 — Saigon", "03 — The World", "04 — Universe"] as const
          )[phase];
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <JourneyPhaseSync />
      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0c14]"
        aria-hidden="true"
      >
        {IMAGES.map((src, i) => (
          <div
            key={src}
            data-scene={i}
            className="absolute -inset-[6%] will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
              fetchPriority={i === 0 ? "high" : "low"}
            />
          </div>
        ))}

        {/* Cinematic grade: vignette + top/bottom readability gradients */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 130% 100% at 50% 45%, transparent 52%, rgba(5,7,14,0.42) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{ background: "linear-gradient(180deg, rgba(5,7,14,0.35), transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-56"
          style={{ background: "linear-gradient(0deg, rgba(5,7,14,0.5), transparent)" }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "240px 240px",
          }}
        />

        {/* Phase label: subtle chapter caption bottom-left */}
        <div className="absolute bottom-6 left-6 hidden md:block">
          <div
            ref={captionRef}
            className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/50"
          >
            01 — Countryside
          </div>
          <div className="mt-2 h-px w-24 bg-white/25">
            <div ref={barRef} className="h-px bg-white/80" style={{ width: "0%" }} />
          </div>
        </div>
      </div>
    </>
  );
}
