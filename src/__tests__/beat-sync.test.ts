import { describe, it, expect } from "vitest";
import {
  spectralFlux,
  AdaptiveBeatDetector,
  getSectionAt,
  type SectionMarker,
} from "../lib/beat-sync";
import { MUSIC_SYNC_CONFIG } from "../config/music-sync";

describe("spectralFlux", () => {
  it("returns 0 for identical spectra", () => {
    const a = new Float32Array([10, 20, 30, 40]);
    const b = new Float32Array([10, 20, 30, 40]);
    expect(spectralFlux(a, b)).toBe(0);
  });

  it("sums only positive differences (energy flux)", () => {
    const prev = new Float32Array([10, 20, 30, 40]);
    const curr = new Float32Array([15, 10, 45, 40]);
    // positive diffs: (15-10) + (45-30) = 5 + 15 = 20
    expect(spectralFlux(prev, curr)).toBe(20);
  });

  it("restricts analysis to the requested low-frequency bin count", () => {
    const prev = new Float32Array([10, 10, 10, 10, 10]);
    const curr = new Float32Array([50, 50, 50, 50, 50]);
    expect(spectralFlux(prev, curr, 2)).toBe(80);
    expect(spectralFlux(prev, curr, 5)).toBe(200);
  });

  it("handles plain number arrays", () => {
    expect(spectralFlux([1, 2], [3, 4])).toBe(4);
  });
});

describe("AdaptiveBeatDetector", () => {
  it("does not fire during the warmup window", () => {
    const d = new AdaptiveBeatDetector(8, 1.5);
    // feed a steady pulse; first `windowSize` samples only fill the history
    for (let i = 0; i < 8; i++) {
      const r = d.process(10);
      expect(r.isBeat).toBe(false);
    }
  });

  it("fires on a sudden energy spike above the adaptive threshold", () => {
    const d = new AdaptiveBeatDetector(8, 1.3);
    for (let i = 0; i < 8; i++) d.process(10);
    const spike = d.process(60);
    expect(spike.isBeat).toBe(true);
    expect(spike.intensity).toBeGreaterThan(0);
    expect(spike.intensity).toBeLessThanOrEqual(1);
  });

  it("does not fire on steady energy after warmup", () => {
    const d = new AdaptiveBeatDetector(8, 1.3);
    for (let i = 0; i < 8; i++) d.process(10);
    for (let i = 0; i < 20; i++) {
      expect(d.process(10).isBeat).toBe(false);
    }
  });

  it("intensity scales with spike size", () => {
    const mk = () => {
      const d = new AdaptiveBeatDetector(8, 1.3);
      for (let i = 0; i < 8; i++) d.process(10);
      return d;
    };
    const small = mk().process(30).intensity;
    const big = mk().process(90).intensity;
    expect(big).toBeGreaterThan(small);
  });

  it("reset clears history", () => {
    const d = new AdaptiveBeatDetector(4, 1.3);
    for (let i = 0; i < 4; i++) d.process(10);
    d.reset();
    // after reset we are back in warmup: no beat even on a spike
    expect(d.process(99).isBeat).toBe(false);
  });
});

describe("getSectionAt", () => {
  const markers: SectionMarker[] = [
    { id: "intro", start: 0 },
    { id: "verse", start: 30 },
    { id: "chorus", start: 90 },
  ];

  it("returns the first section before any marker", () => {
    expect(getSectionAt(0, markers)).toBe("intro");
    expect(getSectionAt(29.9, markers)).toBe("intro");
  });

  it("returns the active section for a given time", () => {
    expect(getSectionAt(30, markers)).toBe("verse");
    expect(getSectionAt(120, markers)).toBe("chorus");
  });

  it("falls back to the first marker for empty lists", () => {
    expect(getSectionAt(10, [])).toBe("intro");
  });
});

describe("MUSIC_SYNC_CONFIG", () => {
  it("declares an audio source and tunable markers", () => {
    expect(MUSIC_SYNC_CONFIG.audioSrc).toBe("/audio/sparkle.mp3");
    expect(MUSIC_SYNC_CONFIG.markers.length).toBeGreaterThan(0);
    // markers must be sorted by start time
    const starts = MUSIC_SYNC_CONFIG.markers.map((m) => m.start);
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
  });

  it("enables ambient fallback mode", () => {
    expect(MUSIC_SYNC_CONFIG.ambient.enabled).toBe(true);
    expect(MUSIC_SYNC_CONFIG.ambient.breathPeriodSec).toBeGreaterThan(0);
  });
});
