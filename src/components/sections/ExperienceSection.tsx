"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { DecoHeading, DecoDiamond } from "./Deco";
import { telemetry } from "@/lib/telemetry";

export function ExperienceSection() {
  const { isVi } = useLanguage();
  const [id, setId] = useState(experienceData[0].id);
  const exp = experienceData.find((e) => e.id === id) || experienceData[0];

  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <DecoHeading kicker={isVi ? "Hồi hai" : "Act Two"} title={isVi ? "Sự nghiệp" : "Career"}
        sub={isVi ? "Những chương đã qua — Nhật Bản, SaaS CRM, AI." : "Chapters past — Japan, SaaS CRM, AI."} />

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {experienceData.map((e) => (
          <button key={e.id}
            onClick={() => { setId(e.id); telemetry.track("click", `select_experience_${e.id}`); }}
            className={`cursor-pointer border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
              id === e.id ? "border-[#c9a227] bg-[#c9a227] text-[#0e0d0b]" : "border-[#c9a227]/30 text-[#f3ecdc]/60 hover:border-[#c9a227]"
            }`}>
            {e.company}
          </button>
        ))}
      </div>

      <div className="deco-card deco-corner p-8 sm:p-12">
        <div className="text-center">
          <h3 className="deco-title text-3xl uppercase">{resolveLocale(exp.title, isVi)}</h3>
          <p className="deco-label mt-3 !text-[10px]">{exp.company} — {resolveLocale(exp.location, isVi)}</p>
          <p className="mt-2 font-mono text-[12px] text-[#f3ecdc]/50">{resolveLocale(exp.duration, isVi)}</p>
        </div>
        <div className="deco-divider my-10"><span>◆</span></div>
        <div className="space-y-12">
          {exp.projectHighlights.map((proj, pi) => (
            <article key={pi}>
              <h4 className="deco-title text-center text-xl uppercase">{proj.name}</h4>
              {proj.client && <p className="mt-1 text-center text-[12px] uppercase tracking-[0.18em] text-[#f3ecdc]/50">{resolveLocale(proj.client, isVi)}</p>}
              <p className="mx-auto mt-4 max-w-2xl text-center font-light leading-relaxed text-[#f3ecdc]/65">{resolveLocale(proj.description, isVi)}</p>
              <div className="mx-auto mt-6 grid max-w-3xl gap-8 sm:grid-cols-2">
                <ul className="space-y-2.5">
                  {proj.responsibilities[isVi ? "vi" : "en"].map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] font-light text-[#f3ecdc]/75">
                      <DecoDiamond className="mt-1.5" /> {r}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2.5">
                  {proj.impacts[isVi ? "vi" : "en"].map((m, i) => (
                    <li key={i} className="text-[14px] font-medium text-[#e8c96a]">✦ {m}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 text-center font-mono text-[11px] tracking-[0.1em] text-[#f3ecdc]/40">
                {proj.technologies.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
