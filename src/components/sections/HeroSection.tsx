"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { statsData } from "@/data/portfolio-content";
import { FileDown, ChevronDown } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function HeroSection({ onOpenResumeModal }: { onOpenResumeModal: () => void }) {
  const { isVi } = useLanguage();
  return (
    <section id="home" className="deco-sunburst relative pt-16">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-20 text-center sm:px-6 sm:pt-28">
        <div className="deco-frame mx-auto max-w-3xl px-8 py-12 sm:px-14">
          <p className="deco-label">{isVi ? "Tập hồ sơ quý ông" : "The Portfolio of"}</p>
          <h1 className="deco-title mt-6 text-[clamp(2.6rem,8vw,5.2rem)] uppercase">
            Nguyen<br />Tran Anh
          </h1>
          <div className="deco-divider mt-8"><span>◆ ◆ ◆</span></div>
          <p className="mt-8 text-[13px] uppercase tracking-[0.3em] text-[#f3ecdc]/70">
            {isVi ? "Kỹ sư phần mềm" : "Software Engineer"}
          </p>
          <p className="mx-auto mt-6 max-w-md font-light leading-relaxed text-[#f3ecdc]/60">
            {isVi
              ? "Ba năm rèn giũa qua doanh nghiệp Nhật, SaaS và AI. Thủ khoa CNTT — nay kiến tạo những sản phẩm xứng tầm."
              : "Three years forged across Japanese enterprise, SaaS, and AI. An IT valedictorian — now crafting products of distinction."}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button onClick={() => { telemetry.track("download_cv", "hero"); onOpenResumeModal(); }} className="deco-btn deco-btn-solid">
              <FileDown className="h-4 w-4" /> {isVi ? "Xem hồ sơ" : "View dossier"}
            </button>
            <Link href="#projects" className="deco-btn">{isVi ? "Tác phẩm" : "The Works"}</Link>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-px bg-[#c9a227]/20 sm:grid-cols-4">
          {[
            [statsData.yearsExperience, isVi ? "Năm" : "Years"],
            [statsData.gpa, isVi ? "Thủ khoa" : "Honors"],
            [statsData.awardsCount, isVi ? "Vinh danh" : "Awards"],
            [statsData.performanceGain, isVi ? "Hiệu năng" : "Perf."],
          ].map(([v, l]) => (
            <div key={l as string} className="bg-[#0e0d0b] px-4 py-6">
              <div className="deco-title text-3xl text-[#c9a227]">{v}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[#f3ecdc]/50">{l}</div>
            </div>
          ))}
        </div>

        <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="mx-auto mt-12 flex flex-col items-center gap-2 text-[#c9a227] cursor-pointer">
          <span className="text-[10px] uppercase tracking-[0.3em]">{isVi ? "Mở màn" : "Begin"}</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
