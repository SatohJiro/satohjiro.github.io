"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { osContent } from "@/data/os-content";
import { useLanguage } from "@/hooks/useLanguage";
import { telemetry } from "@/lib/telemetry";

const STORAGE_KEY = "satohos_booted";
const LINE_INTERVAL_MS = 240;

export function BootSequence({ onDone }: { onDone: () => void }) {
  const { isVi } = useLanguage();
  const [visibleLines, setVisibleLines] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const finishedRef = useRef(false);
  const lines = osContent.boot.lines;

  // Stable finish callable from events and effects.
  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // private mode — boot every visit, acceptable
    }
    setLeaving(true);
    window.setTimeout(onDone, 380);
  }, [onDone]);

  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      skip = false;
    }
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skip || reducedMotion) {
      finish();
      return;
    }

    telemetry.track("page_view", "boot_sequence");
    const timers: number[] = [];
    lines.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => setVisibleLines(i + 1), LINE_INTERVAL_MS * (i + 1)),
      );
    });
    timers.push(
      window.setTimeout(finish, LINE_INTERVAL_MS * (lines.length + 1) + 600),
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", onKey);
    };
  }, [finish, lines]);

  return (
    <div
      role="status"
      aria-label={`${osContent.boot.osName} ${osContent.boot.version}`}
      onClick={finish}
      className={`fixed inset-0 z-[100] flex flex-col justify-center bg-[#05070d] px-6 transition-opacity duration-300 sm:px-12 cursor-pointer ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="mx-auto w-full max-w-2xl font-mono text-[13px] leading-7 sm:text-sm">
        <div className="mb-6 text-slate-500">
          {osContent.boot.osName} {osContent.boot.version} ({osContent.boot.arch})
        </div>
        {lines.slice(0, visibleLines).map((line) => (
          <div key={line} className="text-slate-300">
            <span className="text-emerald-400 font-bold">[&nbsp;ok&nbsp;]</span>
            <span className="text-slate-500"> {line.slice(8)}</span>
          </div>
        ))}
        <div className="mt-2 flex items-center gap-2 text-slate-300">
          <span className="text-blue-400">satohjiro@satohos</span>
          <span className="text-slate-500">:~$</span>
          <span className="os-caret" aria-hidden="true" />
        </div>
        <div className="mt-8 text-xs text-slate-600">
          {isVi ? osContent.boot.skip.vi : osContent.boot.skip.en}
        </div>
      </div>
    </div>
  );
}
