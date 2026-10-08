"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { statsData } from "@/data/portfolio-content";
import { FileDown, ArrowDown, Sparkles } from "lucide-react";
import { telemetry } from "@/lib/telemetry";
import { Y2kBubbles } from "./Y2k";

export function HeroSection({ onOpenResumeModal }: { onOpenResumeModal: () => void }) {
  const { isVi } = useLanguage();
  return (
    <section id="home" className="relative overflow-hidden pt-24">
      <Y2kBubbles />
      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-14 text-center sm:px-6 sm:pt-20">
        <span className="y2k-chip">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" /> {isVi ? "Phiên bản 2026 — mới & bóng bẩy" : "v2026 — fresh & glossy"}
        </span>
        <h1 className="y2k-title mt-7 text-[clamp(3rem,10vw,7rem)]">
          Nguyen<br />
          <span className="bg-gradient-to-b from-white via-[#d8f9ff] to-[#3fd2ec] bg-clip-text text-transparent">
            Tran Anh
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
          {isVi
            ? "Kỹ sư Phần mềm — biến ý tưởng thành web app mượt mà, nhanh và đẹp như mơ."
            : "Software Engineer — turning ideas into web apps smooth, fast, and dreamy."}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <button onClick={() => { telemetry.track("download_cv", "hero"); onOpenResumeModal(); }} className="y2k-btn">
            <FileDown className="h-4 w-4" /> {isVi ? "Xem CV" : "View résumé"}
          </button>
          <Link href="#projects" className="y2k-btn y2k-btn-ghost">{isVi ? "Khám phá" : "Explore"}</Link>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            [statsData.yearsExperience, isVi ? "Năm KN" : "Yrs exp"],
            [statsData.gpa, isVi ? "Thủ khoa" : "Top grad"],
            [statsData.awardsCount, isVi ? "Giải thưởng" : "Awards"],
            [statsData.performanceGain, isVi ? "Tăng tốc" : "Speed up"],
          ].map(([v, l]) => (
            <div key={l as string} className="y2k-glass px-4 py-6">
              <div className="text-3xl font-extrabold text-white">{v}</div>
              <div className="y2k-label mt-2 !text-[10px]">{l}</div>
            </div>
          ))}
        </div>

        {/* Tech marquee */}
        <div className="y2k-glass mt-12 overflow-hidden !rounded-full py-3">
          <div className="y2k-marquee-track gap-8 text-[13px] font-bold uppercase tracking-[0.2em] text-[#7ce7f4]">
            {["React", "TypeScript", "Next.js", "Vue", "Node.js", "Python", "AI", "GraphQL"].concat(["React", "TypeScript", "Next.js", "Vue", "Node.js", "Python", "AI", "GraphQL"]).map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap">{t} <span className="text-[#b8f135]">✦</span></span>
            ))}
          </div>
        </div>

        <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="y2k-label mx-auto mt-10 flex items-center gap-2 hover:text-white cursor-pointer">
          {isVi ? "Lặn xuống" : "Dive in"} <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
