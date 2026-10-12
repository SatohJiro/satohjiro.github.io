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
interface Comet {
  active: boolean; x: number; y: number; vx: number; vy: number; life: number; grand: boolean;
  // Tiamat split — a fragment that breaks off mid-flight
  fsplit: boolean; fx: number; fy: number; fvx: number; fvy: number; flife: number;
}
interface Meteor { active: boolean; x: number; y: number; vx: number; vy: number; life: number }
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
    const comet: Comet = {
      active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, grand: false,
      fsplit: false, fx: 0, fy: 0, fvx: 0, fvy: 0, flife: 0,
    };
    const meteors: Meteor[] = Array.from({ length: 3 }, () => ({ active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0 }));
    let cometTimer = 5; // seconds until next comet
    let meteorTimer = 2;
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
      clouds = Array.from({ length: 9 }, (_, i) => ({
        x: rand() * w,
        y: h * (0.14 + rand() * 0.52),
        w: 220 + rand() * 340,
        h: 30 + rand() * 52,
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
      comet.grand = rand() < 0.22; // the Tiamat moment — a huge, slow comet
      comet.x = fromLeft ? -80 : w * (0.3 + rand() * 0.6);
      comet.y = h * (0.04 + rand() * 0.18);
      const speed = (420 + rand() * 260 + energy * 200) * (comet.grand ? 0.55 : 1);
      comet.vx = fromLeft ? speed : -speed * 0.7;
      comet.vy = speed * (0.28 + rand() * 0.15);
      comet.fsplit = false;
      comet.flife = 0;
    };

    const spawnMeteor = () => {
      const m = meteors.find((k) => !k.active);
      if (!m) return;
      m.active = true;
      m.life = 1;
      const dir = rand() < 0.5 ? 1 : -1;
      m.x = dir > 0 ? -40 : w + 40;
      m.y = h * (0.03 + rand() * 0.25);
      const speed = 700 + rand() * 500;
      m.vx = dir * speed;
      m.vy = speed * (0.22 + rand() * 0.18); // gentle downward streak
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

      /* 1b — faint milky-way band, diagonal across the upper sky */
      ctx.save();
      ctx.translate(w * 0.5, h * 0.28);
      ctx.rotate(-0.42);
      const mw = ctx.createLinearGradient(0, -h * 0.22, 0, h * 0.22);
      mw.addColorStop(0, "rgba(205,210,255,0)");
      mw.addColorStop(0.5, `rgba(205,210,255,${0.055 + energy * 0.035})`);
      mw.addColorStop(1, "rgba(205,210,255,0)");
      ctx.fillStyle = mw;
      ctx.fillRect(-w, -h * 0.22, w * 2, h * 0.44);
      ctx.restore();

      /* 1c — god rays fanning up from below the horizon */
      {
        const x0 = w * 0.5;
        const y0 = h * 0.95;
        for (let i = 0; i < 7; i++) {
          const spread = (i / 6 - 0.5) * 1.15;
          const sway = Math.sin(t * 0.07 + i * 1.7) * 0.035;
          const ang = -Math.PI / 2 + spread + sway;
          const len = h * 0.9;
          const x1 = x0 + Math.cos(ang) * len;
          const y1 = y0 + Math.sin(ang) * len;
          const perp = ang + Math.PI / 2;
          const half = 16 + i * 7;
          const aMax = 0.045 + energy * 0.05;
          const rg = ctx.createLinearGradient(x0, y0, x1, y1);
          rg.addColorStop(0, `rgba(255,196,138,${aMax.toFixed(3)})`);
          rg.addColorStop(1, "rgba(255,196,138,0)");
          ctx.fillStyle = rg;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1 + Math.cos(perp) * half, y1 + Math.sin(perp) * half);
          ctx.lineTo(x1 - Math.cos(perp) * half, y1 - Math.sin(perp) * half);
          ctx.closePath();
          ctx.fill();
        }
      }

      /* 1d — anamorphic lens flare along the horizon */
      {
        const flareA = 0.08 + energy * 0.1;
        const fl = ctx.createLinearGradient(0, 0, w, 0);
        fl.addColorStop(0, "rgba(255,170,120,0)");
        fl.addColorStop(0.5, `rgba(255,196,150,${flareA.toFixed(3)})`);
        fl.addColorStop(1, "rgba(255,170,120,0)");
        ctx.fillStyle = fl;
        ctx.fillRect(0, h * 0.815, w, 2.5);
        const orb = ctx.createRadialGradient(w * 0.72, h * 0.7, 0, w * 0.72, h * 0.7, 26);
        orb.addColorStop(0, `rgba(255,200,160,${(flareA * 0.8).toFixed(3)})`);
        orb.addColorStop(1, "rgba(255,200,160,0)");
        ctx.fillStyle = orb;
        ctx.beginPath();
        ctx.arc(w * 0.72, h * 0.7, 26, 0, Math.PI * 2);
        ctx.fill();
      }

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

      /* 2b — quick shooting stars */
      meteorTimer -= dt;
      if (meteorTimer <= 0) {
        spawnMeteor();
        meteorTimer = 4 + rand() * 6;
      }
      for (const m of meteors) {
        if (!m.active) continue;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.life -= dt * 1.4;
        if (m.life <= 0 || m.x < -100 || m.x > w + 100) {
          m.active = false;
          continue;
        }
        const ang = Math.atan2(m.vy, m.vx);
        const len = 90 * m.life;
        const mg = ctx.createLinearGradient(
          m.x, m.y,
          m.x - Math.cos(ang) * len, m.y - Math.sin(ang) * len,
        );
        mg.addColorStop(0, `rgba(255,245,235,${0.9 * m.life})`);
        mg.addColorStop(1, "rgba(255,245,235,0)");
        ctx.strokeStyle = mg;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - Math.cos(ang) * len, m.y - Math.sin(ang) * len);
        ctx.stroke();
      }

      /* 3 — comet (occasionally a grand Tiamat-class one) */
      cometTimer -= dt * chorusBoost;
      if (!comet.active && cometTimer <= 0) {
        spawnComet(energy);
        cometTimer = 11 + rand() * 9;
      }
      const drawCometBody = (
        x: number, y: number, vx: number, vy: number,
        life: number, gs: number, pink: boolean,
      ) => {
        const headR = (3 + pulse * 5) * gs;
        // volumetric tail: three layered strokes (core → mid → outer)
        const tailLen = (150 + pulse * 110) * gs;
        const ang = Math.atan2(vy, vx);
        const tx = x - Math.cos(ang) * tailLen;
        const ty = y - Math.sin(ang) * tailLen;
        const core = pink ? "255,196,224" : "255,242,224";
        const mid = pink ? "255,138,205" : "255,186,155";
        const layers = [
          { w: (7 + pulse * 5) * gs, a0: 0.28, a1: 0.1 },
          { w: (3.6 + pulse * 2.6) * gs, a0: 0.55, a1: 0.2 },
          { w: (1.6 + pulse * 1.2) * gs, a0: 0.95, a1: 0.4 },
        ];
        for (const L of layers) {
          const tail = ctx.createLinearGradient(x, y, tx, ty);
          tail.addColorStop(0, `rgba(${core},${(L.a0 * life).toFixed(3)})`);
          tail.addColorStop(0.45, `rgba(${mid},${(L.a1 * life).toFixed(3)})`);
          tail.addColorStop(1, `rgba(${mid},0)`);
          ctx.strokeStyle = tail;
          ctx.lineWidth = L.w;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        }
        // head glow
        const hg = ctx.createRadialGradient(x, y, 0, x, y, headR * 5);
        hg.addColorStop(0, `rgba(255,250,240,${(0.95 * life).toFixed(3)})`);
        hg.addColorStop(0.35, `rgba(${mid},${(0.45 * life).toFixed(3)})`);
        hg.addColorStop(1, `rgba(${mid},0)`);
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(x, y, headR * 5, 0, Math.PI * 2);
        ctx.fill();
      };
      if (comet.active) {
        comet.x += comet.vx * dt;
        comet.y += comet.vy * dt;
        comet.life -= dt * (comet.grand ? 0.28 : 0.45);
        drawCometBody(comet.x, comet.y, comet.vx, comet.vy, Math.max(0, comet.life), comet.grand ? 2.4 : 1, false);
        // Tiamat split — the grand comet breaks apart mid-flight
        if (comet.grand && !comet.fsplit && comet.life < 0.55) {
          comet.fsplit = true;
          const base = Math.atan2(comet.vy, comet.vx);
          const fa = base + 0.5;
          const fs = Math.hypot(comet.vx, comet.vy) * 0.85;
          comet.fx = comet.x;
          comet.fy = comet.y;
          comet.fvx = Math.cos(fa) * fs;
          comet.fvy = Math.sin(fa) * fs;
          comet.flife = 1;
        }
        if (comet.fsplit && comet.flife > 0) {
          comet.fx += comet.fvx * dt;
          comet.fy += comet.fvy * dt;
          comet.flife -= dt * 0.5;
          drawCometBody(comet.fx, comet.fy, comet.fvx, comet.fvy, Math.max(0, comet.flife), 1.15, true);
        }
        if (comet.life <= 0 || comet.x > w + 240 || comet.x < -240 || comet.y > h * 0.9) {
          comet.active = false;
        }
      }

      /* 4 — clouds: puffy clusters with sunset-lit top edges */
      for (const c of clouds) {
        c.x += c.v * dt;
        if (c.x - c.w > w) c.x = -c.w;
        if (c.x + c.w < 0) c.x = w + c.w;
        const tint = c.y > h * 0.55 ? "255,150,120" : "120,110,190";
        const puffs = 5;
        for (let p = 0; p < puffs; p++) {
          const px = c.x + (p / (puffs - 1) - 0.5) * c.w * 0.8;
          const py = c.y + Math.sin(p * 2.1 + c.x * 0.01) * c.h * 0.18;
          const pr = c.w * (0.22 + 0.06 * Math.sin(p * 3.7));
          const pg = ctx.createRadialGradient(px, py, 0, px, py, pr);
          pg.addColorStop(0, `rgba(${tint},${(c.a * 1.7).toFixed(3)})`);
          pg.addColorStop(1, `rgba(${tint},0)`);
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.fill();
        }
        // sunset-lit rim along the top — the anime silver lining
        ctx.strokeStyle = `rgba(255,178,150,${Math.min(0.45, c.a * 2.2).toFixed(3)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(c.x, c.y - c.h * 0.08, c.w * 0.42, c.h * 0.4, 0, Math.PI * 1.12, Math.PI * 1.88);
        ctx.stroke();
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
