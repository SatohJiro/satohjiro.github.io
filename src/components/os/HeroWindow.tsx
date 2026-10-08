"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FileDown, ArrowRight, Terminal } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { osContent } from "@/data/os-content";
import { statsData } from "@/data/portfolio-content";
import { GlassButton } from "../glass/GlassButton";
import { DesktopWindow } from "./DesktopWindow";
import { telemetry } from "@/lib/telemetry";

/** Types the whoami output; instant full text for reduced-motion users. */
function useTypewriter(lines: string[]): string {
  const full = lines.join("\n");
  const [text, setText] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? full
      : "",
  );
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setText(full.slice(0, i));
      if (i >= full.length) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [full]);
  return text;
}

export function HeroWindow({ onOpenResumeModal }: { onOpenResumeModal: () => void }) {
  const { isVi } = useLanguage();
  const hero = osContent.hero;
  const typed = useTypewriter([...hero.terminalOutput]);

  const stats: { value: string; label: string }[] = [
    { value: statsData.yearsExperience, label: isVi ? hero.stats.years.vi : hero.stats.years.en },
    { value: statsData.gpa, label: isVi ? hero.stats.gpa.vi : hero.stats.gpa.en },
    { value: statsData.awardsCount, label: isVi ? hero.stats.awards.vi : hero.stats.awards.en },
    { value: statsData.performanceGain, label: isVi ? hero.stats.perf.vi : hero.stats.perf.en },
  ];

  return (
    <DesktopWindow title={hero.windowTitle}>
      <div className="space-y-5">
        {/* Identity */}
        <div className="space-y-2.5">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {isVi ? hero.eyebrow.vi : hero.eyebrow.en}
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {hero.name}
          </h1>
          <div>
            <span className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 font-mono text-sm text-blue-700 dark:text-blue-400">
              {hero.alias}
            </span>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {isVi ? hero.description.vi : hero.description.en}
          </p>
        </div>

        {/* Typed terminal strip */}
        <div
          aria-label="whoami"
          className="rounded-xl border border-slate-200/80 bg-slate-950/[0.04] p-3.5 font-mono text-xs leading-6 dark:border-white/10 dark:bg-black/40"
        >
          <div className="text-slate-500 dark:text-slate-400">
            <span className="text-blue-600 dark:text-blue-400">satohjiro@satohos</span>
            <span className="text-slate-400 dark:text-slate-500">:~$</span> whoami
          </div>
          <pre className="min-h-[6rem] whitespace-pre-wrap text-slate-700 dark:text-slate-200">
            {typed}
            <span className="os-caret" aria-hidden="true" />
          </pre>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <GlassButton
            onClick={() => {
              telemetry.track("download_cv", "hero_window_main");
              onOpenResumeModal();
            }}
            variant="primary"
            size="md"
            icon={<FileDown className="h-4 w-4" />}
            className="whitespace-nowrap"
          >
            {isVi ? hero.ctaResume.vi : hero.ctaResume.en}
          </GlassButton>
          <Link href="#projects">
            <GlassButton
              onClick={() => telemetry.track("click", "hero_window_projects")}
              variant="glass"
              size="md"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              className="whitespace-nowrap"
            >
              {isVi ? hero.ctaProjects.vi : hero.ctaProjects.en}
            </GlassButton>
          </Link>
          <Link href="#terminal">
            <GlassButton
              onClick={() => telemetry.track("click", "hero_window_terminal")}
              variant="ghost"
              size="md"
              icon={<Terminal className="h-4 w-4" />}
              className="whitespace-nowrap font-mono"
            >
              {isVi ? hero.ctaTerminal.vi : hero.ctaTerminal.en}
            </GlassButton>
          </Link>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-2.5 border-t border-slate-200/70 pt-5 dark:border-white/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="font-display text-xl font-bold text-slate-900 dark:text-white">
                {s.value}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </DesktopWindow>
  );
}
