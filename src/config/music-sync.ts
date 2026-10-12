/**
 * music-sync.ts — tunable music synchronization markers for the Your Name theme.
 *
 * HOW TO TUNE (for your own sparkle.mp3):
 *  1. Drop your audio file at `public/audio/sparkle.mp3` (see public/audio/README_VI.md).
 *  2. Play it and note the timestamps (in seconds) where the song changes mood:
 *     intro -> verse -> build -> chorus -> bridge -> outro.
 *  3. Update the `start` values below. They MUST stay sorted ascending.
 *  4. Optionally tweak `bpm` so the ambient pulse and beat detector feel right.
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
  /** relative URL of the user-supplied audio file (they add it themselves) */
  audioSrc: "/audio/sparkle.mp3",

  /** approximate tempo of the track — TUNE TO YOUR FILE (used for pulse feel) */
  bpm: 100,

  /**
   * Section markers — PLACEHOLDER timestamps, TUNE TO YOUR FILE.
   * Keep sorted by `start` ascending. The last marker runs to end of track.
   */
  markers: [
    { id: "intro", start: 0, energy: 0.25 },
    { id: "verse", start: 32, energy: 0.45 },
    { id: "build", start: 78, energy: 0.7 },
    { id: "chorus", start: 104, energy: 1.0 },
    { id: "bridge", start: 168, energy: 0.55 },
    { id: "chorus", start: 196, energy: 1.0 },
    { id: "outro", start: 252, energy: 0.3 },
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
