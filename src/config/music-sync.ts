/**
 * music-sync.ts — tunable music synchronization markers for the Your Name theme.
 *
 * HOW TO TUNE (for your own sparkle.mp3):
 *  Markers below are tuned to the "Sparkle (Movie Version)" file the site
 *  owner added (8:54, measured by energy analysis). If you swap in a
 *  different recording, re-measure and update the `start` values below.
 *
 * If no audio file is present, the site runs in "ambient mode" (see `ambient`
 * below): visuals keep breathing gracefully on a slow cycle instead of beats.
 */

export type SongSectionId =
  | "intro"
  | "verse"
  | "build"
  | "chorus"
  | "bridge"
  | "outro";

export interface SectionMarker {
  id: SongSectionId;
  /** seconds from the start of the track — TUNE TO YOUR FILE */
  start: number;
  /** one-word mood hint used to scale visual intensity */
  energy: number; // 0..1
}

export const MUSIC_SYNC_CONFIG = {
  /** relative URL of the audio file (public/audio/sparkle.mp3, supplied by site owner) */
  audioSrc: "/audio/sparkle.mp3",

  /** approximate tempo of the track — TUNE TO YOUR FILE (used for pulse feel) */
  bpm: 100,

  /**
   * Section markers — tuned to "Sparkle (Movie Version)" (8:54) via energy
   * analysis of the actual file. Keep sorted by `start` ascending.
   * The last marker runs to end of track.
   */
  markers: [
    { id: "intro", start: 0, energy: 0.25 },
    { id: "verse", start: 30, energy: 0.45 },
    { id: "build", start: 84, energy: 0.7 },
    { id: "chorus", start: 124, energy: 1.0 },
    { id: "verse", start: 214, energy: 0.5 },
    { id: "build", start: 262, energy: 0.75 },
    { id: "chorus", start: 302, energy: 1.0 },
    { id: "bridge", start: 408, energy: 0.3 },
    { id: "build", start: 425, energy: 0.55 },
    { id: "chorus", start: 471, energy: 1.0 },
    { id: "outro", start: 520, energy: 0.25 },
  ] as SectionMarker[],

  /** beat detector tuning */
  detector: {
    /** how many low-frequency FFT bins feed the energy-flux computation */
    lowBinCount: 12,
    /** frames of history for the adaptive threshold */
    historySize: 43,
    /** spike must exceed avg * sensitivity to count as a beat */
    sensitivity: 1.35,
  },

  /** graceful fallback when no audio file exists */
  ambient: {
    enabled: true,
    /** seconds per "breath" cycle of the ambient pulse */
    breathPeriodSec: 8,
    /** base glow level in ambient mode (0..1) */
    baseEnergy: 0.35,
  },
} as const;
