"use client";

/**
 * ScenesSection (Your Name theme) — 名場面 meibamen, the famous scenes.
 *
 * A cinematic interlude: full-viewport panels of original anime film
 * background art inspired by the movie's most iconic frames — the dusk
 * staircase, the kataware-doki panorama, the comet tearing the night sky,
 * the daylight meeting under a vast blue sky. Slow Ken Burns drift,
 * quiet captions, no chrome.
 */

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Reveal } from "@/components/yourname/Reveal";
import { SectionHeading } from "@/components/yourname/SectionHeading";

interface Scene {
  id: string;
  src: string;
  alt: string;
  jp: string;
  reading: string;
  title: { en: string; vi: string };
  line: { en: string; vi: string };
}

const SCENES: Scene[] = [
  {
    id: "stairs",
    src: "/yourname/scenes/scene-stairs.jpg",
    alt: "Two silhouettes passing on a stone staircase at dusk",
    jp: "階段",
    reading: "kaidan — the staircase",
    title: { en: "Where two lines cross", vi: "Nơi hai đường thẳng giao nhau" },
    line: {
      en: "On stairs dyed by dusk, strangers pass — and the world tilts.",
      vi: "Trên bậc thang nhuộm hoàng hôn, hai người lạ lướt qua — và thế giới chao nghiêng.",
    },
  },
  {
    id: "kataware",
    src: "/yourname/scenes/scene-kataware.jpg",
    alt: "Comet splitting over a mountain lake town at twilight",
    jp: "カタワレ時",
    reading: "kataware-doki — twilight",
    title: { en: "The hour between worlds", vi: "Giờ khắc giữa hai thế giới" },
    line: {
      en: "When the border between two worlds blurs, the comet returns.",
      vi: "Khi ranh giới hai thế giới mờ nhòe, sao chổi trở lại.",
    },
  },
  {
    id: "comet-night",
    src: "/yourname/scenes/scene-comet-night.jpg",
    alt: "A giant comet splitting apart in the night sky",
    jp: "彗星",
    reading: "suisei — the comet",
    title: { en: "The sky, torn open", vi: "Bầu trời bị xé toạc" },
    line: {
      en: "A thousand-year visitor, breaking apart in fire and light.",
      vi: "Vị khách nghìn năm, vỡ tan trong lửa và ánh sáng.",
    },
  },
  {
    id: "daylight",
    src: "/yourname/scenes/scene-daylight.jpg",
    alt: "Two figures under a vast blue sky with comet trails",
    jp: "空",
    reading: "sora — the sky",
    title: { en: "Look up", vi: "Ngẩng đầu lên" },
    line: {
      en: "The blue sky is still there — vast, bright, waiting.",
      vi: "Bầu trời xanh vẫn ở đó — bao la, rực rỡ, chờ đợi.",
    },
  },
];

export function ScenesSection() {
  const { t } = useLanguage();

  return (
    <section id="scenes" className="relative">
      <div className="mx-auto max-w-4xl px-4 pt-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            accent="名場面"
            accentReading="meibamen — the famous scenes"
            eyebrow={t({ en: "interlude", vi: "khúc dạo" })}
            title={t({ en: "Iconic frames", vi: "Những khung hình" })}
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#e8dcc8]/70">
            {t({
              en: "A love letter to the film — the frames that made its name, reimagined as original paintings for this page.",
              vi: "Một bức thư tình gửi đến bộ phim — những khung hình làm nên tên tuổi của nó, được vẽ lại thành tranh gốc cho trang này.",
            })}
          </p>
        </Reveal>
      </div>

      <div className="mt-12">
        {SCENES.map((s, i) => (
          <figure key={s.id} className="relative h-[100svh] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              draggable={false}
              className="yn-scene-img absolute inset-0 h-full w-full object-cover"
            />
            {/* cinematic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
            <figcaption className="absolute inset-x-0 bottom-0 pb-14 sm:pb-20">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Reveal>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                    {t({ en: "Scene", vi: "Cảnh" })} {String(i + 1).padStart(2, "0")} — {s.jp}{" "}
                    <span className="normal-case tracking-normal text-white/40">{s.reading}</span>
                  </p>
                  <h3 className="yn-display mt-3 text-4xl text-white sm:text-5xl">
                    {t(s.title)}
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
                    {t(s.line)}
                  </p>
                </Reveal>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
