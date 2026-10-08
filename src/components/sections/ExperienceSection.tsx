"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";
import { telemetry } from "@/lib/telemetry";

export function ExperienceSection() {
  const { isVi } = useLanguage();
  const [id, setId] = useState(experienceData[0].id);
  const exp = experienceData.find((e) => e.id === id) || experienceData[0];

  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader index="02" label={isVi ? "Kinh nghiệm" : "Experience"}
        title={isVi ? "Quá trình thi công" : "Build History"}
        desc={isVi ? "Nhật Bản · SaaS CRM · AI." : "Japan · SaaS CRM · AI."} />

      <div className="mb-6 flex flex-wrap gap-2">
        {experienceData.map((e, i) => (
          <button key={e.id} onClick={() => { setId(e.id); telemetry.track("click", `select_experience_${e.id}`); }}
            className={`bp-tag cursor-pointer !py-2 !px-4 ${id === e.id ? "!border-[#ffb000] !text-[#ffb000]" : "hover:!border-white/70 hover:text-white"}`}>
            {String(i+1).padStart(2,"0")}.{e.company}{e.current && " ●"}
          </button>
        ))}
      </div>

      <div className="bp-panel bp-corners p-7 sm:p-10">
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <h3 className="bp-title text-2xl sm:text-3xl uppercase">{resolveLocale(exp.title, isVi)}</h3>
            <p className="bp-spec mt-2">{exp.company} — {resolveLocale(exp.location, isVi)}</p>
          </div>
          <span className="bp-tag !border-[#ffb000] !text-[#ffb000] h-fit">{resolveLocale(exp.duration, isVi)}</span>
        </div>
        <div className="bp-rule my-8" />
        <div className="space-y-10">
          {exp.projectHighlights.map((proj, pi) => (
            <div key={pi}>
              <div className="flex flex-wrap justify-between gap-2">
                <h4 className="text-lg font-extrabold">{proj.name}</h4>
                {proj.client && <span className="bp-spec">{resolveLocale(proj.client, isVi)}</span>}
              </div>
              <p className="mt-2 max-w-3xl text-white/70 leading-relaxed">{resolveLocale(proj.description, isVi)}</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="bp-label mb-2">{isVi ? "Thi công" : "Built"}</div>
                  <ul className="space-y-1.5 text-[14px] text-white/80">
                    {proj.responsibilities[isVi ? "vi" : "en"].map((r, i) => <li key={i}>— {r}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="bp-label bp-label-accent mb-2">{isVi ? "Kết quả đo được" : "Measured"}</div>
                  <ul className="space-y-1.5 text-[14px] font-semibold">
                    {proj.impacts[isVi ? "vi" : "en"].map((m, i) => <li key={i} className="text-[#ffb000]">▸ {m}</li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {proj.technologies.map((t, i) => <span key={i} className="bp-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
