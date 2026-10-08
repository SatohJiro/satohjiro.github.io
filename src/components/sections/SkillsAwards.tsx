"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData, awardsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { DecoHeading, DecoDiamond } from "./Deco";

export function SkillsSection() {
  const { isVi } = useLanguage();
  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <DecoHeading kicker={isVi ? "Chương đệm" : "Interlude"} title={isVi ? "Nghệ thuật" : "The Craft"} />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillsData.map((c) => (
          <div key={c.id} className="deco-card p-7">
            <h3 className="deco-title text-center text-lg uppercase">{resolveLocale(c.label, isVi)}</h3>
            <div className="deco-divider my-5"><span>◆</span></div>
            <ul className="space-y-2.5">
              {c.skills.map((s, i) => (
                <li key={i} className="flex items-baseline justify-between gap-2 text-[14px]">
                  <span className="flex items-center gap-2 font-light text-[#f3ecdc]/80">
                    <DecoDiamond /> {s.name}
                  </span>
                  {s.tag && <span className="deco-tag !text-[9px]">{resolveLocale(s.tag, isVi)}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AwardsSection() {
  const { isVi } = useLanguage();
  return (
    <section id="awards" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <DecoHeading kicker={isVi ? "Vinh dự" : "Laurels"} title={isVi ? "Vinh danh" : "Honors"} />
      <div className="deco-frame divide-y divide-[#c9a227]/15">
        {awardsData.map((a, i) => (
          <div key={a.id} className="grid gap-3 p-7 sm:grid-cols-12 sm:gap-6">
            <span className="deco-num text-xl sm:col-span-1">{String(i+1).padStart(2,"0")}</span>
            <div className="sm:col-span-8">
              <h3 className="deco-title text-lg uppercase">{resolveLocale(a.title, isVi)}</h3>
              <p className="mt-1 text-[13px] font-light text-[#f3ecdc]/55">{resolveLocale(a.description, isVi)}</p>
            </div>
            <div className="sm:col-span-3 sm:text-right">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#f3ecdc]/45">{resolveLocale(a.organization, isVi)}</p>
              <p className="deco-num mt-1">{a.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
