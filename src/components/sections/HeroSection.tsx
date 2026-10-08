"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { statsData } from "@/data/portfolio-content";
import { FileDown, ArrowDown } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function HeroSection({ onOpenResumeModal }: { onOpenResumeModal: () => void }) {
  const { isVi } = useLanguage();

  return (
    <section id="home" className="relative pt-14">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="bp-panel bp-corners p-8 sm:p-12">
          <div className="flex flex-wrap justify-between gap-3">
            <span className="bp-label">{isVi ? "Bản vẽ kỹ thuật — Hồ sơ năng lực" : "Technical drawing — Portfolio"}</span>
            <span className="bp-label bp-label-accent">SCALE 1:1 · SHEET A-001</span>
          </div>

          <div className="bp-rule my-8" />

          <h1 className="bp-title text-[clamp(2.8rem,9vw,7.5rem)] uppercase">
            Nguyen<br />Tran Anh<span className="text-[#ffb000]">.</span>
          </h1>
          <p className="bp-spec mt-4">FIG.01 — SOFTWARE ENGINEER, FRONTEND SYSTEMS</p>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="max-w-lg text-lg leading-relaxed text-white/85">
                {isVi
                  ? "Kỹ sư Phần mềm, 3+ năm kinh nghiệm. Thiết kế và chế tạo web app chính xác như bản vẽ kỹ thuật — nhanh, sạch, đúng spec."
                  : "Software Engineer, 3+ years. I design and build web apps with blueprint precision — fast, clean, to spec."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => { telemetry.track("download_cv", "hero"); onOpenResumeModal(); }} className="bp-btn bp-btn-solid">
                  <FileDown className="h-4 w-4" /> {isVi ? "Xem bản vẽ CV" : "View CV sheet"}
                </button>
                <Link href="#projects" className="bp-btn">{isVi ? "Công trình" : "Works"}</Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <table className="bp-table">
                <thead><tr>
                  <th>{isVi ? "Thông số" : "Spec"}</th>
                  <th className="text-right">{isVi ? "Giá trị" : "Value"}</th>
                </tr></thead>
                <tbody>
                  {[
                    [isVi ? "Kinh nghiệm" : "Experience", statsData.yearsExperience],
                    ["GPA · Valedictorian", statsData.gpa],
                    [isVi ? "Giải thưởng" : "Awards", statsData.awardsCount],
                    [isVi ? "Tối ưu hiệu năng" : "Perf. gain", statsData.performanceGain],
                  ].map(([k, v]) => (
                    <tr key={k as string}>
                      <td className="bp-spec">{k}</td>
                      <td className="text-right text-2xl font-extrabold">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bp-rule my-8" />
          <div className="flex items-center justify-between">
            <span className="bp-spec">TOLERANCE ±0.01 · MATERIAL: TYPESCRIPT</span>
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="bp-label flex items-center gap-2 hover:text-white cursor-pointer">
              {isVi ? "Xem tiếp" : "Continue"} <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
