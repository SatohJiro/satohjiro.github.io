"use client";

/**
 * TwilightSky — full-viewport cinematic canvas for the Your Name theme.
 *
 * A "living painting": an original kataware-doki panorama painting forms
 * the world, and the canvas breathes life over it —
 *
 * Layers (back → front):
 *  1. Painted panorama (ultra-slow drift zoom; gradient fallback while loading)
 *  2. Readability veil so text always stays legible
 *  3. Warm horizon glow that swells with the music's energy
 *  4. God rays fanning up from below the horizon
 *  5. Twinkling starfield (amplitude follows beat energy)
 *  6. Quick shooting stars
 *  7. Periodic comet with glowing tail — grand ones split Tiamat-style
 *  8. Floating light motes / lens-dust
 *
 * Reads the shared beat engine via ref every frame — no React re-renders.
 * Honors prefers-reduced-motion by painting one static frame.
 */

import React, { useEffect, useRef } from "react";
import { useBeatSyncContext } from "./BeatSyncProvider";

interface Star { x: number; y: number; r: number; phase: number; speed: number; bright: boolean }
interface Mote { x: number; y: number; r: number; vy: number; phase: number }
interface Comet {
  active: boolean; x: number; y: number; vx: number; vy: number; life: number; grand: boolean;
  // Tiamat split — a fragment that breaks off mid-flight
  fsplit: boolean; fx: number; fy: number; fvx: number; fvy: number; flife: number;
}
interface Meteor { active: boolean; x: number; y: number; vx: number; vy: number; life: number }

function mulberry(seed: number) {
  let s = seed >>> 0;
  return () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BG_SRC = "/yourname/scenes/scene-kataware.jpg";

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

    // the painted world
    const bgImg = new Image();
    let bgReady = false;
    bgImg.onload = () => { bgReady = true; };
    bgImg.src = BG_SRC;

    let stars: Star[] = [];
    let motes: Mote[] = [];
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
    };

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

      /* 1 — the painted world (ultra-slow drift; gradient fallback first) */
      if (bgReady && bgImg.naturalWidth > 0) {
        const zoom = reduced ? 1 : 1 + 0.035 * (0.5 + 0.5 * Math.sin((t * Math.PI * 2) / 75));
        const s = Math.max(w / bgImg.naturalWidth, h / bgImg.naturalHeight) * zoom;
        const dw = bgImg.naturalWidth * s;
        const dh = bgImg.naturalHeight * s;
        ctx.drawImage(bgImg, (w - dw) / 2, (h - dh) / 2, dw, dh);
      } else {
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
      }

      /* 2 — readability veil */
      {
        const v = ctx.createLinearGradient(0, 0, 0, h);
        v.addColorStop(0, "rgba(7,11,38,0.38)");
        v.addColorStop(0.35, "rgba(7,11,38,0.12)");
        v.addColorStop(0.62, "rgba(7,11,38,0.10)");
        v.addColorStop(1, "rgba(7,11,38,0.42)");
        ctx.fillStyle = v;
        ctx.fillRect(0, 0, w, h);
      }

      /* 3 — warm horizon glow that swells with the music */
      {
        const glowR = Math.max(w, h) * (0.5 + energy * 0.1);
        const glow = ctx.createRadialGradient(w * 0.5, h * 0.86, 0, w * 0.5, h * 0.86, glowR);
        glow.addColorStop(0, `rgba(255,150,90,${0.12 + energy * 0.16})`);
        glow.addColorStop(1, "rgba(255,150,90,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      /* 4 — god rays fanning up from below the horizon */
      {
        const x0 = w * 0.5;
        const y0 = h * 0.95;
        for (let i = 0; i < 7; i++) {
          const spread = (i / 6 - 0.5) * 1.15;
          const sway = reduced ? 0 : Math.sin(t * 0.07 + i * 1.7) * 0.035;
          const ang = -Math.PI / 2 + spread + sway;
          const len = h * 0.9;
          const x1 = x0 + Math.cos(ang) * len;
          const y1 = y0 + Math.sin(ang) * len;
          const perp = ang + Math.PI / 2;
          const half = 16 + i * 7;
          const aMax = 0.04 + energy * 0.045;
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

      /* 5 — stars */
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

      /* 6 — quick shooting stars */
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

      /* 7 — comet (occasionally a grand Tiamat-class one) */
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

      /* 8 — floating light motes */
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
