"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { editorialContent } from "@/data/editorial-content";
import { Reveal } from "./Reveal";
import { telemetry } from "@/lib/telemetry";

function Marquee({ items }: { items: readonly string[] }) {
  const row = [...items, ...items];
  return (
    <div className="ed-marquee overflow-hidden border-y border-[var(--ed-hairline)]" aria-hidden="true">
      <div className="ed-marquee-track">
        {row.map((item, i) => (
          <span key={i} className="ed-marquee-item">
            <span className="font-mono text-sm tracking-wide text-[var(--ed-muted)]">{item}</span>
            <span className="ed-marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function EditorialHero({ onOpenResume }: { onOpenResume: () => void }) {
  const { isVi } = useLanguage();
  const h = editorialContent.hero;

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    telemetry.track("click", `hero_cta_${id}`);
  };

  const metaEntries = [h.meta.location, h.meta.experience, h.meta.focus, h.meta.education];

  return (
    <section id="home" className="relative">
      <div className="mx-auto max-w-[92rem] px-4 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        {/* Volume + status eyebrow */}
        <Reveal>
          <div className="flex items-center justify-between font-mono text-xs text-[var(--ed-muted)]">
            <span className="tracking-widest uppercase">
              {isVi ? h.volume.vi : h.volume.en}
            </span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {isVi ? editorialContent.header.status.vi : editorialContent.header.status.en}
            </span>
          </div>
        </Reveal>

        {/* Display name */}
        <Reveal delay={80}>
          <h1 className="mt-6 font-display font-bold leading-[0.88] tracking-[-0.03em] text-[var(--ed-ink)] text-[clamp(3.8rem,12vw,11rem)]">
            {h.nameLine1}
            <br />
            {h.nameLine2}
            <span className="text-blue-600 dark:text-blue-400">.</span>
          </h1>
        </Reveal>

        {/* Role + description + CTAs */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={140} className="lg:col-span-7">
            <p className="font-mono text-sm text-blue-600 dark:text-blue-400">
              {isVi ? h.role.vi : h.role.en}{" "}
              <span className="text-[var(--ed-muted)]">{h.alias}</span>
            </p>
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-[var(--ed-muted)]">
              {isVi ? h.description.vi : h.description.en}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onOpenResume();
                  telemetry.track("click", "hero_cta_resume");
                }}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--ed-ink)] px-6 py-3 text-sm font-semibold text-[var(--ed-paper)] transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                {isVi ? h.ctaResume.vi : h.ctaResume.en}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={() => goTo("projects")}
                className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-[var(--ed-ink)] underline decoration-blue-500 decoration-2 underline-offset-8 hover:decoration-blue-400 cursor-pointer"
              >
                {isVi ? h.ctaProjects.vi : h.ctaProjects.en}
              </button>
            </div>
          </Reveal>

          {/* Meta index */}
          <Reveal delay={200} className="lg:col-span-5">
            <dl className="grid grid-cols-2 border-t border-l border-[var(--ed-hairline)]">
              {metaEntries.map((m, i) => (
                <div
                  key={i}
                  className="border-b border-r border-[var(--ed-hairline)] px-5 py-4"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-[var(--ed-muted)]">
                    {isVi ? m.label.vi : m.label.en}
                  </dt>
                  <dd className="mt-1.5 font-display text-base font-semibold text-[var(--ed-ink)]">
                    {isVi ? m.value.vi : m.value.en}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Scroll cue */}
        <Reveal delay={260}>
          <div className="mt-14 flex items-center gap-3 font-mono text-xs text-[var(--ed-muted)]">
            <ArrowDown className="h-4 w-4 animate-bounce" />
            <span className="tracking-widest uppercase">
              {isVi ? h.scroll.vi : h.scroll.en}
            </span>
            <span className="h-px flex-1 bg-[var(--ed-hairline)]" />
          </div>
        </Reveal>
      </div>

      {/* Capability marquee */}
      <div className="mt-14">
        <Marquee items={h.marquee} />
      </div>
    </section>
  );
}
