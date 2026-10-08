"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { Chapter } from "./Chapter";
import { telemetry } from "@/lib/telemetry";

export function ExperienceSection() {
  const { isVi } = useLanguage();
  const [id, setId] = useState(experienceData[0].id);
  const exp = experienceData.find((e) => e.id === id) || experienceData[0];

  return (
    <section id="experience">
      <Chapter no={isVi ? "Chương hai — Kinh nghiệm" : "Chapter Two — Experience"}
        title={isVi ? "Hành trình" : "The Journey"} wide>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {experienceData.map((e) => (
            <button key={e.id}
              onClick={() => { setId(e.id); telemetry.track("click", `select_experience_${e.id}`); }}
              className={`mono-caption cursor-pointer border px-4 py-2 transition-colors ${
                id === e.id ? "border-[#1e4d3b] bg-[#1e4d3b] !text-[#faf7f0]" : "border-[#e3ddd0] hover:border-[#1e4d3b]"
              }`}>
              {e.company}
            </button>
          ))}
        </div>

        <div className="mono-plate">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h3 className="mono-title text-3xl">{resolveLocale(exp.title, isVi)}</h3>
              <p className="mono-caption mt-2">{exp.company} — {resolveLocale(exp.location, isVi)}</p>
            </div>
            <span className="mono-caption border border-[#1e4d3b] px-3 py-1.5 !text-[#1e4d3b]">
              {resolveLocale(exp.duration, isVi)}
            </span>
          </div>
          <div className="mono-rule my-8" />
          <div className="space-y-10">
            {exp.projectHighlights.map((proj, pi) => (
              <article key={pi}>
                <h4 className="mono-title text-xl">{proj.name}</h4>
                {proj.client && <p className="mono-caption mt-1">{resolveLocale(proj.client, isVi)}</p>}
                <p className="mt-3 max-w-3xl leading-relaxed text-[#1c1a16]/75">{resolveLocale(proj.description, isVi)}</p>
                <div className="mt-5 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="mono-caption mb-3">{isVi ? "Đã làm" : "Work"}</p>
                    <ul className="space-y-2 text-[14px] leading-relaxed">
                      {proj.responsibilities[isVi ? "vi" : "en"].map((r, i) => <li key={i}>— {r}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="mono-caption mb-3 !text-[#1e4d3b]">{isVi ? "Kết quả" : "Outcome"}</p>
                    <ul className="space-y-2 text-[14px] font-medium leading-relaxed">
                      {proj.impacts[isVi ? "vi" : "en"].map((m, i) => <li key={i}><em className="text-[#1e4d3b]">{m}</em></li>)}
                    </ul>
                  </div>
                </div>
                <p className="mono-caption mt-4">{proj.technologies.join(" · ")}</p>
              </article>
            ))}
          </div>
        </div>
      </Chapter>
    </section>
  );
}
