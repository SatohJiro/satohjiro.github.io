"use client";

/**
 * ProjectsSection (Your Name theme) — 夢 dream.
 * Featured project spread + card grid. No modal — highlights inline.
 */

import React, { useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { projectsData } from "@/data/portfolio-content";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { GithubIcon } from "../icons/BrandIcons";
import { SectionHeading } from "@/components/yourname/SectionHeading";
import { Reveal } from "@/components/yourname/Reveal";
import { BraidedCord } from "@/components/yourname/BraidedCord";

const FILTERS = [
  { id: "all", label: { en: "All", vi: "Tất cả" } },
  { id: "web", label: { en: "Web", vi: "Web" } },
  { id: "ai", label: { en: "AI", vi: "AI" } },
  { id: "academic", label: { en: "Academic", vi: "Học thuật" } },
] as const;

export function ProjectsSection() {
  const { isVi, t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const visible = projectsData.filter((p) => filter === "all" || p.category === filter);
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => p !== featured);

  const renderCard = (p: (typeof projectsData)[number], large = false) => (
    <article
      key={p.id}
      className={`yn-card yn-card-interactive flex h-full flex-col p-6 sm:p-7 ${large ? "lg:p-10" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#f7b267]/80">
            {resolveLocale(p.organization, isVi)} · {resolveLocale(p.year, isVi)}
          </p>
          <h3 className={`yn-display mt-2 text-[#fdf6ec] ${large ? "text-3xl sm:text-4xl" : "text-xl"}`}>
            {resolveLocale(p.name, isVi)}
          </h3>
        </div>
        {p.featured && (
          <span className="yn-tag inline-flex shrink-0 items-center gap-1">
            <Star className="h-3 w-3" aria-hidden="true" />
            {t({ en: "Featured", vi: "Nổi bật" })}
          </span>
        )}
      </div>
      {p.badge && (
        <p className="yn-tag mt-3 self-start">{resolveLocale(p.badge, isVi)}</p>
      )}
      <p className={`mt-4 leading-relaxed text-[#e8dcc8]/85 ${large ? "text-base" : "text-sm"}`}>
        {resolveLocale(p.description, isVi)}
      </p>
      <ul className="mt-4 space-y-2">
        {resolveLocaleArray(p.highlights, isVi).slice(0, large ? 6 : 3).map((hl, i) => (
          <li key={i} className="flex gap-2 text-sm text-[#e8dcc8]/80">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8364f]" aria-hidden="true" />
            <span>{hl}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.technologies.slice(0, large ? 8 : 5).map((tech) => (
          <span key={tech} className="yn-tag">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-4 pt-6">
        {p.githubUrl && (
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t({ en: "Open GitHub repository", vi: "Mở kho GitHub" })}
            className="text-[#e8dcc8]/70 transition-colors hover:text-[#f7b267]"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        )}
        {p.liveUrl && (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t({ en: "Open live demo", vi: "Mở bản demo" })}
            className="text-[#e8dcc8]/70 transition-colors hover:text-[#f7b267]"
          >
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            accent="夢"
            accentReading="yume — dream"
            eyebrow={t({ en: "chapter three", vi: "chương ba" })}
            title={t({ en: "Projects", vi: "Dự án" })}
            description={t({
              en: "Things I built while chasing the light — from AI tools to web platforms.",
              vi: "Những thứ tôi đã tạo ra khi đuổi theo ánh sáng — từ công cụ AI đến nền tảng web.",
            })}
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`cursor-pointer rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-all ${
                  filter === f.id
                    ? "bg-gradient-to-r from-[#d8364f] to-[#e0705a] text-white shadow-[0_8px_24px_-8px_rgba(216,54,79,0.7)]"
                    : "border border-[#fdf6ec]/20 text-[#e8dcc8]/70 hover:border-[#f7b267]/60 hover:text-[#f7b267]"
                }`}
              >
                {t(f.label)}
              </button>
            ))}
          </div>
        </Reveal>

        {featured && (
          <Reveal delay={80}>
            <div className="mb-6">{renderCard(featured, true)}</div>
          </Reveal>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80}>
              {renderCard(p)}
            </Reveal>
          ))}
        </div>

        <BraidedCord className="mt-16" />
      </div>
    </section>
  );
}
