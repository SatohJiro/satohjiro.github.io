"use client";

/**
 * beat-sync.ts — beat detection engine for music-reactive visuals.
 *
 * Technique: spectral energy flux on low-frequency FFT bins.
 * Each animation frame we compare the current magnitude spectrum against the
 * previous one and sum only the *positive* differences (onsets). A sudden
 * rise in low-frequency energy = a kick/drum hit = a beat.
 *
 * The adaptive detector keeps a rolling history of flux values; a beat fires
 * when the current flux exceeds `average * sensitivity`. Intensity is the
 * normalized overshoot, so visuals can scale with hit strength.
 *
 * Pure functions + AdaptiveBeatDetector are DOM-free and unit-tested.
 * The `useBeatSync` hook wires them to the Web Audio API (AnalyserNode).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { MUSIC_SYNC_CONFIG, type SongSectionId } from "@/config/music-sync";

/* ------------------------------------------------------------------ */
/* Pure DSP helpers (unit-tested)                                      */
/* ------------------------------------------------------------------ */

/** Sum of positive spectral differences over the first `bins` low-freq bins. */
export function spectralFlux(
  prev: Float32Array | number[],
  curr: Float32Array | number[],
  bins = 12,
): number {
  const n = Math.min(bins, prev.length, curr.length);
  let flux = 0;
  for (let i = 0; i < n; i++) {
    const diff = curr[i] - prev[i];
    if (diff > 0) flux += diff;
  }
  return flux;
}

export interface BeatResult {
  isBeat: boolean;
  /** 0..1 — how hard the beat hit relative to recent history */
  intensity: number;
}

/**
 * Adaptive threshold beat detector.
 * Warmup: the first `historySize` samples only fill the buffer (no beats).
 */
export class AdaptiveBeatDetector {
  private history: number[] = [];
  private sum = 0;

  constructor(
    private readonly historySize = 43,
    private readonly sensitivity = 1.35,
  ) {}

  process(energy: number): BeatResult {
    if (this.history.length < this.historySize) {
      this.history.push(energy);
      this.sum += energy;
      return { isBeat: false, intensity: 0 };
    }
    const avg = this.sum / this.history.length;
    const threshold = Math.max(avg * this.sensitivity, 1e-6);
    const isBeat = energy > threshold;
    // normalized overshoot, clamped to 0..1
    const intensity = isBeat
      ? Math.min(1, (energy - threshold) / (threshold * 2 + 1e-6))
      : 0;
    // slide window
    this.sum -= this.history.shift()!;
    this.history.push(energy);
    this.sum += energy;
    return { isBeat, intensity };
  }

  reset(): void {
    this.history = [];
    this.sum = 0;
  }
}

export interface SectionMarker {
  id: SongSectionId;
  start: number;
}

/** Resolve which song section is active at `timeSec`. */
export function getSectionAt(
  timeSec: number,
  markers: SectionMarker[],
): SongSectionId {
  if (markers.length === 0) return "intro";
  let active = markers[0].id;
  for (const m of markers) {
    if (timeSec >= m.start) active = m.id;
    else break;
  }
  return active;
}

/* ------------------------------------------------------------------ */
/* Live engine state shared with canvas via ref (no re-render churn)   */
/* ------------------------------------------------------------------ */

export interface BeatEngineFrame {
  /** smoothed 0..1 energy level driving glow/twinkle */
  energy: number;
  /** beat pulse 0..1, spikes on beat then decays — drives bounce/comet */
  pulse: number;
  /** active song section id ("ambient" when no audio) */
  section: SongSectionId | "ambient";
}

export interface BeatSyncApi {
  frameRef: React.MutableRefObject<BeatEngineFrame>;
  /** increments on every detected beat — re-triggers CSS animations */
  beatCount: number;
  isPlaying: boolean;
  /** false when sparkle.mp3 is missing → ambient mode */
  hasAudio: boolean;
  toggle: () => void;
}

/**
 * useBeatSync — drives music-reactive visuals.
 *
 * - Starts ONLY on user gesture (play button) per autoplay policy.
 * - Tries to load `/audio/sparkle.mp3`; on 404/error it silently falls back
 *   to ambient mode: a slow breathing pulse, no errors, no broken UI.
 * - Canvas components read `frameRef.current` inside their own rAF loop
 *   (no React re-render per frame). `beatCount` state bumps on beats for
 *   CSS animation re-triggers.
 */
export function useBeatSync(): BeatSyncApi {
  const frameRef = useRef<BeatEngineFrame>({
    energy: MUSIC_SYNC_CONFIG.ambient.baseEnergy,
    pulse: 0,
    section: "ambient",
  });
  const [beatCount, setBeatCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);

  const engineRef = useRef<{
    ctx: AudioContext | null;
    analyser: AnalyserNode | null;
    source: MediaElementAudioSourceNode | null;
    audio: HTMLAudioElement | null;
    raf: number;
    prevSpectrum: Float32Array | null;
    detector: AdaptiveBeatDetector;
    smoothed: number;
    startStamp: number;
    audioOk: boolean;
  }>({
    ctx: null,
    analyser: null,
    source: null,
    audio: null,
    raf: 0,
    prevSpectrum: null,
    detector: new AdaptiveBeatDetector(
      MUSIC_SYNC_CONFIG.detector.historySize,
      MUSIC_SYNC_CONFIG.detector.sensitivity,
    ),
    smoothed: MUSIC_SYNC_CONFIG.ambient.baseEnergy,
    startStamp: 0,
    audioOk: false,
  });

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(engineRef.current.raf);
  }, []);

  const startAmbient = useCallback(() => {
    const eng = engineRef.current;
    eng.audioOk = false;
    eng.startStamp = performance.now();
    const period = MUSIC_SYNC_CONFIG.ambient.breathPeriodSec * 1000;
    const base = MUSIC_SYNC_CONFIG.ambient.baseEnergy;
    const loop = (now: number) => {
      const t = (now - eng.startStamp) / period;
      // gentle breathing + a soft swell every 4 breaths (a "ghost beat")
      const breath = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
      const swell = Math.pow(0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 0.25), 3);
      const f = frameRef.current;
      f.energy = base + breath * 0.25;
      f.pulse = Math.max(0, f.pulse - 0.04) + swell * 0.012;
      if (f.pulse > 1) f.pulse = 1;
      f.section = "ambient";
      // soft periodic pulse → occasional CSS bounce
      if (swell > 0.985 && f.pulse > 0.9) {
        setBeatCount((c) => c + 1);
        f.pulse = 0.55;
      }
      eng.raf = requestAnimationFrame(loop);
    };
    eng.raf = requestAnimationFrame(loop);
  }, []);

  const startAnalyser = useCallback(() => {
    const eng = engineRef.current;
    if (!eng.ctx || !eng.analyser || !eng.audio) return;
    const analyser = eng.analyser;
    const bins = MUSIC_SYNC_CONFIG.detector.lowBinCount;
    const spectrum = new Float32Array(
      new ArrayBuffer(analyser.frequencyBinCount * Float32Array.BYTES_PER_ELEMENT),
    );
    eng.detector.reset();
    eng.smoothed = 0.3;

    const loop = () => {
      analyser.getFloatFrequencyData(spectrum);
      // convert dB (-100..0) to 0..1 magnitude for the low bins
      const n = Math.min(bins, spectrum.length);
      const curr = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        curr[i] = Math.max(0, (spectrum[i] + 100) / 100);
      }
      let isBeat = false;
      let intensity = 0;
      if (eng.prevSpectrum) {
        const flux = spectralFlux(eng.prevSpectrum, curr, n);
        const r = eng.detector.process(flux);
        isBeat = r.isBeat;
        intensity = r.intensity;
      }
      eng.prevSpectrum = curr;

      // smooth energy toward latest bass level
      let bass = 0;
      for (let i = 0; i < n; i++) bass += curr[i];
      bass /= n;
      eng.smoothed += (bass - eng.smoothed) * 0.25;

      const f = frameRef.current;
      f.energy = Math.min(1, 0.15 + eng.smoothed * 1.4);
      f.pulse = Math.max(0, f.pulse - 0.06);
      if (isBeat) {
        f.pulse = Math.min(1, 0.45 + intensity * 0.55);
        setBeatCount((c) => c + 1);
      }
      if (eng.audio) {
        f.section = getSectionAt(eng.audio.currentTime, MUSIC_SYNC_CONFIG.markers);
      }
      eng.raf = requestAnimationFrame(loop);
    };
    eng.raf = requestAnimationFrame(loop);
  }, []);

  const toggle = useCallback(() => {
    const eng = engineRef.current;
    if (isPlaying) {
      // pause
      eng.audio?.pause();
      stopLoop();
      setIsPlaying(false);
      return;
    }
    // play — first gesture creates everything lazily
    if (!eng.ctx) {
      const AC: typeof AudioContext | undefined =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) {
        // Web Audio unavailable → ambient mode
        setHasAudio(false);
        setIsPlaying(true);
        startAmbient();
        return;
      }
      eng.ctx = new AC();
      eng.audio = new Audio();
      eng.audio.src = MUSIC_SYNC_CONFIG.audioSrc;
      eng.audio.loop = true;
      eng.audio.preload = "auto";
      eng.audio.crossOrigin = "anonymous";

      eng.audio.addEventListener(
        "canplay",
        () => {
          if (!eng.ctx || !eng.audio || eng.audioOk) return;
          eng.audioOk = true;
          setHasAudio(true);
          try {
            eng.source = eng.ctx.createMediaElementSource(eng.audio);
            eng.analyser = eng.ctx.createAnalyser();
            eng.analyser.fftSize = 256;
            eng.analyser.smoothingTimeConstant = 0.75;
            eng.source.connect(eng.analyser);
            eng.analyser.connect(eng.ctx.destination);
          } catch {
            // source already connected on re-toggle — reuse analyser
          }
          void eng.ctx.resume();
          startAnalyser();
        },
        { once: true },
      );
      eng.audio.addEventListener(
        "error",
        () => {
          // sparkle.mp3 missing → graceful ambient fallback, no errors surfaced
          setHasAudio(false);
          setIsPlaying(true);
          startAmbient();
        },
        { once: true },
      );
      // If the file 404s, `error` fires; if it loads, `canplay` fires.
      // Fallback timer: if neither fired in 4s, assume missing.
      window.setTimeout(() => {
        if (!eng.audioOk && !isPlaying) {
          setHasAudio(false);
          setIsPlaying(true);
          startAmbient();
        }
      }, 4000);
      eng.audio.play().catch(() => {
        setHasAudio(false);
        setIsPlaying(true);
        startAmbient();
      });
      setIsPlaying(true);
      return;
    }
    // resume existing engine
    if (eng.audioOk && eng.audio) {
      void eng.ctx.resume();
      void eng.audio.play().catch(() => undefined);
      startAnalyser();
    } else {
      startAmbient();
    }
    setIsPlaying(true);
  }, [isPlaying, startAmbient, startAnalyser, stopLoop]);

  useEffect(() => {
    const eng = engineRef.current;
    return () => {
      cancelAnimationFrame(eng.raf);
      eng.audio?.pause();
      void eng.ctx?.close().catch(() => undefined);
    };
  }, []);

  return { frameRef, beatCount, isPlaying, hasAudio, toggle };
}
