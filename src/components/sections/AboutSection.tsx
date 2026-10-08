"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { Y2kHeading, Y2kBubbles } from "./Y2k";
import { GraduationCap } from "lucide-react";

export function AboutSection() {
  const { isVi } = useLanguage();
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Y2kHeading kicker={isVi ? "Chương 01" : "Level 01"} title={isVi ? "Về mình" : "About me"}
        sub={isVi ? "Player profile — mở khóa thành tựu." : "Player profile — achievements unlocked."} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="y2k-glass p-8 sm:p-10">
          <p className="y2k-label mb-5">{isVi ? "Tiểu sử" : "Bio"}</p>
          <div className="space-y-4 leading-relaxed text-white/80">
            {(isVi ? summaryData.vi : summaryData.en).map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg font-bold text-white" : ""}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {(isVi ? ["Hiệu năng", "Clean code", "Học nhanh"] : ["Performance", "Clean code", "Fast learner"]).map((t) => (
              <span key={t} className="y2k-chip">{t}</span>
            ))}
          </div>
        </div>

        <div className="y2k-glass p-8 sm:p-10">
          <p className="y2k-label mb-5 flex items-center gap-2">
            <GraduationCap className="h-4 w-4" /> {isVi ? "Học vấn" : "Education"}
          </p>
          <h3 className="text-2xl font-extrabold">{resolveLocale(educationData.school, isVi)}</h3>
          <p className="mt-2 text-sm text-white/60">
            {resolveLocale(educationData.major, isVi)} · {resolveLocale(educationData.duration, isVi)}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#b8f135] px-5 py-2.5 text-sm font-extrabold text-[#041c30] shadow-[0_8px_20px_-6px_rgba(184,241,53,0.7)]">
            ★ GPA 3.6/4.0 — {resolveLocale(educationData.honors, isVi)}
          </div>
          <ul className="mt-6 space-y-3">
            {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((h, i) => (
              <li key={i} className="flex gap-3 rounded-2xl bg-white/5 p-3.5 text-[14px] text-white/75 backdrop-blur-sm">
                <span className="y2k-chip !px-2.5 !py-1 shrink-0">{i + 1}</span> {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Y2kBubbles />
    </section>
  );
}
