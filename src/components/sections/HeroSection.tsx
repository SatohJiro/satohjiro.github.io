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
    <section id="home" className="pt-16">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-20 text-center sm:px-6 sm:pt-28">
        <p className="mono-chapter">{isVi ? "Tập hồ sơ · № 1" : "A monograph · № 1"}</p>
        <div className="mono-rule-double mx-auto mt-6 max-w-xs" />
        <h1 className="mono-title mt-10 text-[clamp(3rem,9vw,6.5rem)]">
          {isVi ? <>Nguyễn <em>Trần Anh</em></> : <>Nguyen <em>Tran Anh</em></>}
        </h1>
        <p className="mono-caption mt-6 !text-[12px]">
          {isVi ? "Kỹ sư phần mềm — Thành phố Hồ Chí Minh" : "Software Engineer — Ho Chi Minh City"}
        </p>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#1c1a16]/75">
          {isVi
            ? "Tôi viết phần mềm như người ta viết sách — cẩn trọng, rõ ràng, và để lại điều gì đó đáng đọc."
            : "I write software the way one writes books — carefully, clearly, and leaving something worth reading."}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button onClick={() => { telemetry.track("download_cv", "hero"); onOpenResumeModal(); }} className="mono-btn mono-btn-solid">
            <FileDown className="h-4 w-4" /> {isVi ? "Đọc lý lịch" : "Read the vitæ"}
          </button>
          <Link href="#projects" className="mono-btn">{isVi ? "Xem tác phẩm" : "View works"}</Link>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-px bg-[#e3ddd0] sm:grid-cols-4">
          {[
            [statsData.yearsExperience, isVi ? "Năm kinh nghiệm" : "Years of practice"],
            [statsData.gpa, isVi ? "Thủ khoa" : "Valedictorian"],
            [statsData.awardsCount, isVi ? "Vinh danh" : "Honors"],
            [statsData.performanceGain, isVi ? "Hiệu năng" : "Perf. gain"],
          ].map(([v, l]) => (
            <div key={l as string} className="bg-[#faf7f0] px-4 py-6">
              <div className="mono-title text-3xl">{v}</div>
              <div className="mono-caption mt-2">{l}</div>
            </div>
          ))}
        </div>

        <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="mono-caption mx-auto mt-14 flex items-center gap-2 hover:text-[#1e4d3b] cursor-pointer">
          {isVi ? "Mở chương một" : "Open chapter one"} <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
