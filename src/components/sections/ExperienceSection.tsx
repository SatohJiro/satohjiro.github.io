"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { Y2kHeading } from "./Y2k";
import { telemetry } from "@/lib/telemetry";
import { Zap, CheckCircle2 } from "lucide-react";

export function ExperienceSection() {
  const { isVi } = useLanguage();
  const [id, setId] = useState(experienceData[0].id);
  const exp = experienceData.find((e) => e.id === id) || experienceData[0];

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Y2kHeading kicker={isVi ? "Chương 02" : "Level 02"} title={isVi ? "Hành trình" : "Quest log"}
        sub={isVi ? "Chọn một chapter để xem chi tiết nhiệm vụ." : "Pick a chapter to view the quest details."} />

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {experienceData.map((e) => (
          <button key={e.id}
            onClick={() => { setId(e.id); telemetry.track("click", `select_experience_${e.id}`); }}
            className={`cursor-pointer rounded-full px-6 py-3 text-[13px] font-extrabold uppercase tracking-[0.1em] transition-all ${
              id === e.id
                ? "bg-gradient-to-b from-[#d8f9ff] to-[#3fd2ec] text-[#041c30] shadow-[0_10px_28px_-8px_rgba(63,210,236,0.7)]"
                : "y2k-glass !rounded-full text-white/70 hover:text-white"
            }`}>
            {e.company} {e.current && "●"}
          </button>
        ))}
      </div>

      <div className="y2k-glass p-8 sm:p-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="y2k-title text-3xl">{resolveLocale(exp.title, isVi)}</h3>
            <p className="mt-2 font-bold text-[#7ce7f4]">{exp.company}</p>
            <p className="text-sm text-white/55">{resolveLocale(exp.location, isVi)}</p>
          </div>
          <span className="y2k-chip">{resolveLocale(exp.duration, isVi)}</span>
        </div>

        <div className="mt-10 space-y-8">
          {exp.projectHighlights.map((proj, pi) => (
            <div key={pi} className="rounded-3xl bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-xl font-extrabold">{proj.name}</h4>
                {proj.client && <span className="y2k-label !text-[10px]">{resolveLocale(proj.client, isVi)}</span>}
              </div>
              <p className="mt-3 text-white/70">{resolveLocale(proj.description, isVi)}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="y2k-label mb-3 flex items-center gap-1.5 !text-[10px]"><Zap className="h-3.5 w-3.5" /> {isVi ? "Nhiệm vụ" : "Quests"}</p>
                  <ul className="space-y-2 text-[14px] text-white/75">
                    {proj.responsibilities[isVi ? "vi" : "en"].map((r, i) => <li key={i}>▸ {r}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="y2k-label mb-3 flex items-center gap-1.5 !text-[10px] !text-[#b8f135]"><CheckCircle2 className="h-3.5 w-3.5" /> {isVi ? "Loot" : "Loot"}</p>
                  <ul className="space-y-2 text-[14px] font-bold text-[#b8f135]">
                    {proj.impacts[isVi ? "vi" : "en"].map((m, i) => <li key={i}>✦ {m}</li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {proj.technologies.map((t, i) => <span key={i} className="y2k-chip">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
