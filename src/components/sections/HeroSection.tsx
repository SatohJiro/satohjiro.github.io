"use client";

/**
 * HeroSection (Your Name theme) — kataware-doki hero.
 * The city boy and the small-town girl stand on opposite sides of the sky,
 * gazing up at the comet. They bounce softly on every detected beat.
 */

import React from "react";
import { ArrowDown, FolderOpen, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { siteConfig } from "@/config/site";
import { PixelCharacter } from "@/components/yourname/PixelCharacter";
import { useBeatSyncContext } from "@/components/yourname/BeatSyncProvider";

export function HeroSection() {
  const { t, isVi } = useLanguage();
  const { beatCount } = useBeatSyncContext();

  return (
    <section id="home" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* boy — city side (left) */}
      <div className="yn-idle-float absolute bottom-[16%] left-[4%] w-24 sm:left-[8%] md:w-36 lg:w-44">
        <span className="yn-sparkle" style={{ top: "4%", left: "12%" }} aria-hidden="true" />
        <span className="yn-sparkle" style={{ top: "38%", left: "-6%", animationDelay: "-0.9s" }} aria-hidden="true" />
        <span className="yn-sparkle" style={{ top: "22%", right: "-4%", animationDelay: "-1.7s" }} aria-hidden="true" />
        <div className="-scale-x-100">
          <PixelCharacter
            id="boy"
            pose="idle"
            bounceKey={beatCount}
            label={t({ en: "City schoolboy gazing at the comet", vi: "Cậu học sinh thành phố ngắm sao băng" })}
          />
        </div>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[#4a2438] drop-shadow-[0_1px_8px_rgba(255,240,220,0.9)]">
          {t({ en: "the city", vi: "thành phố" })}
        </p>
      </div>

      {/* girl — small-town side (right) */}
      <div className="yn-idle-float absolute bottom-[16%] right-[4%] w-24 sm:right-[8%] md:w-36 lg:w-44" style={{ animationDelay: "-2.2s" }}>
        <span className="yn-sparkle" style={{ top: "8%", right: "10%", animationDelay: "-0.4s" }} aria-hidden="true" />
        <span className="yn-sparkle" style={{ top: "42%", right: "-8%", animationDelay: "-1.3s" }} aria-hidden="true" />
        <span className="yn-sparkle" style={{ top: "26%", left: "-6%", animationDelay: "-2.1s" }} aria-hidden="true" />
        <PixelCharacter
          id="girl"
          pose="idle"
          bounceKey={beatCount}
          label={t({ en: "Small-town schoolgirl gazing at the comet", vi: "Cô học sinh thị trấn nhỏ ngắm sao băng" })}
        />
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[#4a2438] drop-shadow-[0_1px_8px_rgba(255,240,220,0.9)]">
          {t({ en: "the small town", vi: "thị trấn nhỏ" })}
        </p>
      </div>

      {/* center copy */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="yn-eyebrow mb-5">
          <span className="yn-jp-accent mr-3 text-base" lang="ja">星空</span>
          {t({ en: "under the same starry sky", vi: "dưới cùng một bầu trời sao" })}
        </p>
        <h1 className="yn-display text-5xl text-[#fdf6ec] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl">
          {isVi ? siteConfig.vietnameseName : "Nguyen Tran Anh"}
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.4em] text-[#f7b267] sm:text-sm">
          SatohJiro
        </p>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#e8dcc8]/90 md:text-lg">
          {t({
            en: "Software Engineer crafting cinematic web experiences — Full-Stack & Frontend.",
            vi: "Kỹ sư phần mềm kiến tạo trải nghiệm web đầy cảm xúc — Full-Stack & Frontend.",
          })}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="yn-btn-primary">
            <FolderOpen className="h-4 w-4" aria-hidden="true" />
            {t({ en: "View my work", vi: "Xem dự án" })}
          </a>
          <a href="#contact" className="yn-btn-ghost">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {t({ en: "Get in touch", vi: "Liên hệ" })}
          </a>
        </div>
      </div>

      {/* scroll hint */}
      <a
        href="#about"
        aria-label={t({ en: "Scroll to about", vi: "Cuộn xuống phần giới thiệu" })}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[#e8dcc8]/70 transition-colors hover:text-[#f7b267]"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
