"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData, awardsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { Chapter } from "./Chapter";

export function SkillsSection() {
  const { isVi } = useLanguage();
  return (
    <section id="skills">
      <Chapter no={isVi ? "Phụ lục A — Kỹ năng" : "Appendix A — Skills"}
        title={isVi ? "Chất liệu" : "Materials"}>
        <div className="columns-1 gap-10 sm:columns-2">
          {skillsData.map((c) => (
            <div key={c.id} className="mb-10 break-inside-avoid">
              <h3 className="mono-title text-xl">{resolveLocale(c.label, isVi)}</h3>
              <div className="mono-rule my-4" />
              <ul className="space-y-3">
                {c.skills.map((s, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-3 text-[15px]">
                    <span className="font-medium">{s.name}</span>
                    <span className="mono-caption shrink-0">
                      {s.tag ? resolveLocale(s.tag, isVi) : "—"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Chapter>
    </section>
  );
}

export function AwardsSection() {
  const { isVi } = useLanguage();
  return (
    <section id="awards">
      <Chapter no={isVi ? "Phụ lục B — Vinh danh" : "Appendix B — Honors"}
        title={isVi ? "Ghi nhận" : "Citations"}>
        <ol className="divide-y divide-[#e3ddd0] border-y border-[#e3ddd0]">
          {awardsData.map((a, i) => (
            <li key={a.id} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6">
              <span className="mono-caption sm:col-span-1">{String(i+1).padStart(2,"0")}</span>
              <div className="sm:col-span-8">
                <h3 className="mono-title text-xl">{resolveLocale(a.title, isVi)}</h3>
                <p className="mt-1 text-[14px] text-[#1c1a16]/65">{resolveLocale(a.description, isVi)}</p>
              </div>
              <div className="sm:col-span-3 sm:text-right">
                <p className="mono-caption">{resolveLocale(a.organization, isVi)}</p>
                <p className="mono-title mt-1 text-lg">{a.year}</p>
              </div>
            </li>
          ))}
        </ol>
      </Chapter>
    </section>
  );
}
