"use client";

/**
 * EntryOverlay — cinematic entry gate that solves the autoplay problem
 * elegantly.
 *
 * Browsers only allow audio after a user gesture, so instead of fighting
 * that, the site opens with a "movie title card": tap anywhere and the
 * music starts as part of the same gesture that lets you in. A quiet
 * "enter silently" option respects visitors who prefer no sound.
 *
 * Shows once per session (sessionStorage `yn-entered`).
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useBeatSyncContext } from "./BeatSyncProvider";
import { BraidedCord } from "./BraidedCord";
import { useLanguage } from "@/hooks/useLanguage";

const STAR_COUNT = 70;

export function EntryOverlay() {
  const { toggle } = useBeatSyncContext();
  const { t } = useLanguage();
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return !sessionStorage.getItem("yn-entered");
    } catch {
      return true;
    }
  });
  const [leaving, setLeaving] = useState(false);
  const enterBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!visible) return;
    // focus the primary action so keyboard users can press Enter immediately
    const t = window.setTimeout(() => enterBtnRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, [visible]);

  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        left: `${(i * 37.7 + 11) % 100}%`,
        top: `${(i * 53.3 + 7) % 62}%`,
        delay: `${-((i * 0.37) % 3)}s`,
        size: 2 + ((i * 7) % 3),
      })),
    [],
  );

  if (!visible) return null;

  const dismiss = (withMusic: boolean) => {
    if (leaving) return;
    try {
      sessionStorage.setItem("yn-entered", "1");
    } catch {
      /* private mode — overlay simply shows again next load */
    }
    if (withMusic) toggle();
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 750);
  };

  return (
    <div
      className={`yn-entry${leaving ? " yn-entry-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={t({ en: "Welcome", vi: "Chào mừng" })}
      onClick={() => dismiss(true)}
    >
      {/*
        Kataware-doki panorama — the film's most famous vista, reimagined as
        an original painting, dimmed into the twilight grade. The doorway in.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/yourname/scenes/scene-kataware.jpg"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#12122e]/80 via-[#12122e]/25 to-[#12122e]/90"
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="yn-entry-star"
          aria-hidden="true"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}

      <div className="yn-entry-card" onClick={(e) => e.stopPropagation()}>
        <p className="yn-eyebrow mb-6">
          {t({ en: "a portfolio in twilight", vi: "một portfolio trong hoàng hôn" })}
        </p>
        <h1 className="yn-display text-6xl text-[#fdf6ec] sm:text-7xl" lang="ja">
          星空
        </h1>
        <p className="mt-4 text-base tracking-wide text-[#e8dcc8]/85 md:text-lg">
          {t({ en: "under the same starry sky", vi: "dưới cùng một bầu trời sao" })}
        </p>

        <BraidedCord className="my-8 opacity-90" />

        <button
          ref={enterBtnRef}
          type="button"
          onClick={() => dismiss(true)}
          className="yn-entry-btn"
        >
          {t({ en: "Tap to step into the twilight", vi: "Chạm để bước vào hoàng hôn" })}
        </button>
        <button
          type="button"
          onClick={() => dismiss(false)}
          className="mt-5 text-xs tracking-[0.2em] text-[#e8dcc8]/60 underline-offset-4 transition-colors hover:text-[#e8dcc8] hover:underline"
        >
          {t({ en: "enter silently", vi: "vào im lặng" })}
        </button>
      </div>
    </div>
  );
}
