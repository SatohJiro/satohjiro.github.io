"use client";

/**
 * BeatSyncProvider — shares the beat-sync engine with the whole page.
 * Canvas components read `frameRef.current` inside their own rAF loops
 * (no React re-render per frame); `beatCount` bumps on each beat so CSS
 * animations (character bounce, comet flash) can re-trigger.
 */

import React, { createContext, useContext } from "react";
import { useBeatSync, type BeatSyncApi } from "@/lib/beat-sync";

const BeatSyncContext = createContext<BeatSyncApi | null>(null);

export function BeatSyncProvider({ children }: { children: React.ReactNode }) {
  const api = useBeatSync();
  return (
    <BeatSyncContext.Provider value={api}>{children}</BeatSyncContext.Provider>
  );
}

export function useBeatSyncContext(): BeatSyncApi {
  const ctx = useContext(BeatSyncContext);
  if (!ctx) throw new Error("useBeatSyncContext must be used inside BeatSyncProvider");
  return ctx;
}
