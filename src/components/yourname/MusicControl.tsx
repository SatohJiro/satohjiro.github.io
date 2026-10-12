"use client";

/**
 * MusicControl — elegant floating play/pause control for the beat-synced
 * visuals. Playback starts ONLY on user gesture (autoplay policy).
 * When sparkle.mp3 is absent, the engine falls back to ambient mode —
 * the button then simply toggles the ambient pulse, never an error.
 */

import React from "react";
import { Pause, Play, AudioLines } from "lucide-react";
import { useBeatSyncContext } from "./BeatSyncProvider";
import { useLanguage } from "@/hooks/useLanguage";

export function MusicControl() {
  const { isPlaying, hasAudio, toggle } = useBeatSyncContext();
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <span
        className={`yn-music-hint hidden text-xs tracking-wide text-[#e8dcc8]/70 sm:block ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      >
        {t({
          en: hasAudio ? "play to sync the sky" : "ambient mode — add sparkle.mp3",
          vi: hasAudio ? "bật nhạc để đồng bộ bầu trời" : "chế độ ambient — thêm sparkle.mp3",
        })}
      </span>
      <button
        type="button"
        onClick={toggle}
        aria-label={t({ en: "Toggle music visuals", vi: "Bật/tắt nhạc nền" })}
        aria-pressed={isPlaying}
        className="yn-music-btn group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-[#fdf6ec]" aria-hidden="true" />
        ) : (
          <Play className="h-5 w-5 translate-x-[1px] text-[#fdf6ec]" aria-hidden="true" />
        )}
        <span className="sr-only">
          {t({ en: "Play or pause", vi: "Phát hoặc tạm dừng" })}
        </span>
        {!hasAudio && (
          <AudioLines
            className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#1c1a4d] p-0.5 text-[#f7b267]"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
