"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { DecoHeading, DecoDiamond } from "./Deco";

export function AboutSection() {
  const { isVi } = useLanguage();
  return (
    <section id="about" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <DecoHeading kicker={isVi ? "Hồi một" : "Act One"} title={isVi ? "Tiểu sử" : "Biography"} />

      <div className="space-y-6 text-center text-[17px] font-light leading-[1.9] text-[#f3ecdc]/75">
        {(isVi ? summaryData.vi : summaryData.en).map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="deco-divider my-12"><span>◆</span></div>

      <div className="deco-frame p-8 text-center sm:p-10">
        <p className="deco-label">{isVi ? "Học vị" : "Education"}</p>
        <h3 className="deco-title mt-4 text-2xl uppercase">{resolveLocale(educationData.school, isVi)}</h3>
        <p className="mt-2 text-[13px] uppercase tracking-[0.18em] text-[#f3ecdc]/55">
          {resolveLocale(educationData.major, isVi)} · {resolveLocale(educationData.duration, isVi)}
        </p>
        <p className="deco-title mt-5 inline-block border border-[#c9a227] px-5 py-2 text-lg text-[#c9a227]">
          GPA 3.6/4.0 — {resolveLocale(educationData.honors, isVi)}
        </p>
        <ul className="mx-auto mt-8 max-w-lg space-y-3 text-left">
          {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] font-light text-[#f3ecdc]/75">
              <DecoDiamond className="mt-1.5" /> {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
