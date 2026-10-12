"use client";

/**
 * TwilightSky — full-viewport cinematic canvas for the Your Name theme.
 *
 * Layers (back → front):
 *  1. Kataware-doki twilight gradient (indigo → violet → rose → amber horizon)
 *  2. Twinkling starfield (twinkle amplitude follows beat energy)
 *  3. Periodic comet with glowing tail (pulse-reactive)
 *  4. Drifting clouds tinted by the sunset
 *  5. Floating light particles / lens-dust
 *  6. Distant hill + town-light silhouettes along the bottom
 *
 * Reads the shared beat engine via ref every frame — no React re-renders.
 * Honors prefers-reduced-motion by painting one static frame.
 */

import React, { useEffect, useRef } from "react";
import { useBeatSyncContext } from "./BeatSyncProvider";

interface Star { x: number; y: number; r: number; phase: number; speed: number; bright: boolean }
interface Mote { x: number; y: number; r: number; vy: number; phase: number }
interface Cloud { x: number; y: number; w: number; h: number; v: number; a: number }
interface Comet { active: boolean; x: number; y: number; vx: number; vy: number; life: number }
interface TownLight { x: number; y: number; r: number; phase: number }

function mulberry(seed: number) {
  let s = seed >>> 0;
  return () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function TwilightSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { frameRef } = useBeatSyncContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = mulberry(20261012);
    let w = 0, h = 0, dpr = 1;

    let stars: Star[] = [];
    let motes: Mote[] = [];
    let clouds: Cloud[] = [];
    let lights: TownLight[] = [];
    const comet: Comet = { active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0 };
    let cometTimer = 5; // seconds until next comet
    let raf = 0;
    let last = performance.now();

    const resize = () => {
      dpr = Math.min(1.5, window.devicePixelRatio || 1);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      stars = Array.from({ length: 190 }, () => ({
        x: rand() * w,
        y: rand() * h * 0.72,
        r: 0.4 + rand() * 1.3,
        phase: rand() * Math.PI * 2,
        speed: 0.6 + rand() * 2.2,
        bright: rand() < 0.08,
      }));
      motes = Array.from({ length: 42 }, () => ({
        x: rand() * w,
        y: rand() * h,
        r: 0.8 + rand() * 2.2,
        vy: 6 + rand() * 14,
        phase: rand() * Math.PI * 2,
      }));
      clouds = Array.from({ length: 6 }, (_, i) => ({
        x: rand() * w,
        y: h * (0.18 + rand() * 0.5),
        w: 180 + rand() * 260,
        h: 26 + rand() * 40,
        v: (4 + rand() * 8) * (i % 2 === 0 ? 1 : -1),
        a: 0.10 + rand() * 0.12,
      }));
      // town lights sit along the hill silhouette near the bottom
      lights = Array.from({ length: 46 }, () => ({
        x: rand() * w,
        y: h * (0.86 + rand() * 0.1),
        r: 0.8 + rand() * 1.6,
        phase: rand() * Math.PI * 2,
      }));
    };

    const hillY = (x: number, ridge: number) =>
      h * 0.88 -
      Math.sin(x * 0.004 + ridge) * h * 0.03 -
      Math.sin(x * 0.011 + ridge * 2.3) * h * 0.015;

    const spawnComet = (energy: number) => {
      const fromLeft = rand() < 0.5;
      comet.active = true;
      comet.life = 1;
      comet.x = fromLeft ? -60 : w * (0.3 + rand() * 0.6);
      comet.y = h * (0.05 + rand() * 0.2);
      const speed = 420 + rand() * 260 + energy * 200;
      comet.vx = fromLeft ? speed : -speed * 0.7;
      comet.vy = speed * (0.28 + rand() * 0.15);
    };

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;
      const frame = frameRef.current;
      const energy = frame.energy;
      const pulse = frame.pulse;
      const chorusBoost = frame.section === "chorus" ? 1.6 : 1;

      /* 1 — twilight gradient (subtle breathing with energy) */
      const breathe = energy * 0.05;
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#070b26");
      g.addColorStop(0.34, "#1c1a4d");
      g.addColorStop(0.55, "#4a2a6b");
      g.addColorStop(0.7, "#a34a6e");
      g.addColorStop(0.82, "#e0705a");
      g.addColorStop(0.92, "#f7b267");
      g.addColorStop(1, "#0a0a18");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // warm horizon glow that swells with the music
      const glowR = Math.max(w, h) * (0.5 + breathe * 2);
      const glow = ctx.createRadialGradient(w * 0.5, h * 0.86, 0, w * 0.5, h * 0.86, glowR);
      glow.addColorStop(0, `rgba(255,150,90,${0.20 + energy * 0.22})`);
      glow.addColorStop(1, "rgba(255,150,90,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      /* 2 — stars */
      for (const s of stars) {
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        const a = Math.min(1, tw * (0.45 + energy * 0.75));
        ctx.fillStyle = `rgba(235,240,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.bright) {
          ctx.strokeStyle = `rgba(235,240,255,${(a * 0.5).toFixed(3)})`;
          ctx.lineWidth = 1;
          const L = s.r * 4;
          ctx.beginPath();
          ctx.moveTo(s.x - L, s.y); ctx.lineTo(s.x + L, s.y);
          ctx.moveTo(s.x, s.y - L); ctx.lineTo(s.x, s.y + L);
          ctx.stroke();
        }
      }

      /* 3 — comet */
      cometTimer -= dt * chorusBoost;
      if (!comet.active && cometTimer <= 0) {
        spawnComet(energy);
        cometTimer = 11 + rand() * 9;
      }
      if (comet.active) {
        comet.x += comet.vx * dt;
        comet.y += comet.vy * dt;
        comet.life -= dt * 0.45;
        const headR = 3 + pulse * 5;
        // tail
        const tailLen = 130 + pulse * 90;
        const ang = Math.atan2(comet.vy, comet.vx);
        const tail = ctx.createLinearGradient(
          comet.x, comet.y,
          comet.x - Math.cos(ang) * tailLen, comet.y - Math.sin(ang) * tailLen,
        );
        tail.addColorStop(0, `rgba(255,240,220,${0.85 * Math.max(0, comet.life)})`);
        tail.addColorStop(0.4, `rgba(255,180,150,${0.35 * Math.max(0, comet.life)})`);
        tail.addColorStop(1, "rgba(255,180,150,0)");
        ctx.strokeStyle = tail;
        ctx.lineWidth = 2.5 + pulse * 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - Math.cos(ang) * tailLen, comet.y - Math.sin(ang) * tailLen);
        ctx.stroke();
        // head glow
        const hg = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, headR * 4);
        hg.addColorStop(0, `rgba(255,250,240,${0.9 * Math.max(0, comet.life)})`);
        hg.addColorStop(1, "rgba(255,250,240,0)");
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, headR * 4, 0, Math.PI * 2);
        ctx.fill();
        if (comet.life <= 0 || comet.x > w + 200 || comet.x < -200 || comet.y > h * 0.9) {
          comet.active = false;
        }
      }

      /* 4 — clouds */
      for (const c of clouds) {
        c.x += c.v * dt;
        if (c.x - c.w > w) c.x = -c.w;
        if (c.x + c.w < 0) c.x = w + c.w;
        const cg = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.w / 2);
        const tint = c.y > h * 0.55 ? "255,150,120" : "120,110,190";
        cg.addColorStop(0, `rgba(${tint},${c.a})`);
        cg.addColorStop(1, `rgba(${tint},0)`);
        ctx.fillStyle = cg;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.scale(1, c.h / (c.w / 2));
        ctx.beginPath();
        ctx.arc(0, 0, c.w / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      /* 5 — floating light motes */
      for (const m of motes) {
        m.y -= m.vy * dt;
        if (m.y < -10) { m.y = h + 10; m.x = rand() * w; }
        const a = (0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.4 + m.phase))) * (0.5 + energy * 0.7);
        const mg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 3);
        mg.addColorStop(0, `rgba(255,220,170,${a.toFixed(3)})`);
        mg.addColorStop(1, "rgba(255,220,170,0)");
        ctx.fillStyle = mg;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      /* 6 — hill silhouettes + town lights */
      ctx.fillStyle = "#0b0b1c";
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 8) ctx.lineTo(x, hillY(x, 1.7));
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#060614";
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 8) ctx.lineTo(x, hillY(x, 4.2) + h * 0.035);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
      for (const L of lights) {
        const a = 0.35 + 0.4 * (0.5 + 0.5 * Math.sin(t * 2 + L.phase)) + energy * 0.25;
        ctx.fillStyle = `rgba(255,190,110,${Math.min(1, a).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(L.x, L.y, L.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      draw(performance.now()); // single static frame
    } else {
      raf = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [frameRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
