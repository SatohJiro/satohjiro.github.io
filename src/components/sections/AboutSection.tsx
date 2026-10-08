"use client";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { Chapter } from "./Chapter";

export function AboutSection() {
  const { isVi } = useLanguage();
  return (
    <section id="about">
      <Chapter no={isVi ? "Chương một — Về tác giả" : "Chapter One — The Author"}
        title={isVi ? "Con người" : "The Person"}>
        <div className="mono-dropcap space-y-5 text-[17px] leading-[1.85] text-[#1c1a16]/85">
          {(isVi ? summaryData.vi : summaryData.en).map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <blockquote className="mono-pullquote my-12">
          {isVi
            ? "“Performance & clean code trước tiên. Tự học nhanh, thích ứng nhanh.”"
            : "“Performance & clean code first. Learn fast, adapt faster.”"}
        </blockquote>

        <div className="mono-plate">
          <p className="mono-caption">PLATE 1.1 — {isVi ? "Học vấn" : "Education"}</p>
          <h3 className="mono-title mt-3 text-2xl">{resolveLocale(educationData.school, isVi)}</h3>
          <p className="mono-caption mt-2">
            {resolveLocale(educationData.major, isVi)} · {resolveLocale(educationData.duration, isVi)}
          </p>
          <p className="mt-4 inline-block bg-[#1e4d3b] px-4 py-2 font-mono text-[13px] text-[#faf7f0]">
            GPA 3.6/4.0 — {resolveLocale(educationData.honors, isVi)}
          </p>
          <ul className="mt-6 space-y-3">
            {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((h, i) => (
              <li key={i} className="border-t border-[#e3ddd0] pt-3 text-[15px] leading-relaxed">
                <span className="mono-caption mr-3">{String(i+1).padStart(2,"0")}</span>{h}
              </li>
            ))}
          </ul>
        </div>
      </Chapter>
    </section>
  );
}
