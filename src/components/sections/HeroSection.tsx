"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { statsData } from "@/data/portfolio-content";
import { FileDown, ArrowDown } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

const MARQUEE_ITEMS = [
  "Software Engineer",
  "React",
  "TypeScript",
  "Next.js",
  "Open to Work",
  "SaaS",
  "AI Integration",
  "Micro-Frontend",
];

export function Marquee({ items = MARQUEE_ITEMS }: { items?: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y-[3px] border-[#111] bg-[#111] py-3">
      <div className="brut-marquee-track gap-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-lg font-black uppercase tracking-tight text-white">
              {item}
            </span>
            <span className="inline-block h-3 w-3 bg-[#ff3d00]" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroSection({ onOpenResumeModal }: HeroSectionProps) {
  const { isVi } = useLanguage();

  return (
    <section id="home" className="relative pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="border-x-[3px] border-[#111] bg-white px-6 py-16 sm:px-12 sm:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="brut-tag brut-tag-accent">
              {isVi ? "Sẵn sàng nhận việc" : "Open to work"}
            </span>
            <span className="brut-eyebrow text-[#111]/60">
              {isVi ? "TP. Hồ Chí Minh, Việt Nam" : "Ho Chi Minh City, Vietnam"}
            </span>
          </div>

          <h1 className="mt-8 font-display font-black uppercase leading-[0.92] tracking-tight">
            <span className="block text-[clamp(3rem,10vw,8.5rem)]">Nguyen</span>
            <span className="block text-[clamp(3rem,10vw,8.5rem)]">
              Tran <span className="text-[#ff3d00]">Anh</span>
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl border-l-[4px] border-[#ff3d00] pl-5 text-lg font-medium leading-relaxed">
              {isVi
                ? "Kỹ sư Phần mềm với hơn 3 năm kinh nghiệm. Tôi xây dựng web app nhanh, sạch và mở rộng được — từ SaaS CRM đến tích hợp AI."
                : "Software Engineer with 3+ years of experience. I build fast, clean, scalable web apps — from SaaS CRM to AI integrations."}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  telemetry.track("download_cv", "hero_main_button");
                  onOpenResumeModal();
                }}
                className="brut-btn"
              >
                <FileDown className="h-4 w-4" />
                {isVi ? "Xem CV" : "View Resume"}
              </button>
              <Link href="#projects" className="brut-btn brut-btn-outline">
                {isVi ? "Dự án" : "Projects"}
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 border-[3px] border-[#111] bg-white sm:grid-cols-4">
            {[
              { v: statsData.yearsExperience, en: "Years exp.", vi: "Năm KN" },
              { v: statsData.gpa, en: "GPA Valedictorian", vi: "GPA Thủ khoa" },
              { v: statsData.awardsCount, en: "Awards", vi: "Giải thưởng" },
              { v: statsData.performanceGain, en: "Perf. gain", vi: "Tối ưu" },
            ].map((s, i) => (
              <div
                key={s.en}
                className={`px-5 py-6 ${i > 0 ? "border-l-[3px] border-[#111]" : ""} ${
                  i >= 2 ? "max-sm:border-t-[3px] max-sm:border-[#111]" : ""
                } ${i === 2 ? "max-sm:border-l-0" : ""}`}
              >
                <div className="font-display text-3xl font-black sm:text-4xl">{s.v}</div>
                <div className="brut-eyebrow mt-2 text-[#111]/55">{isVi ? s.vi : s.en}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-0">
        <Marquee />
      </div>

      <div className="mx-auto flex max-w-7xl justify-center px-4 py-10">
        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] cursor-pointer hover:text-[#ff3d00]"
        >
          {isVi ? "Cuộn xuống" : "Scroll"}
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
