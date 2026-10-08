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

export function HeroSection({ onOpenResumeModal }: HeroSectionProps) {
  const { isVi } = useLanguage();

  return (
    <section id="home" className="relative pt-14">
      <div className="swiss-grid-lines">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          {/* Top meta row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#0a0a0a] pb-5">
            <span className="swiss-label">
              {isVi ? "Hồ sơ năng lực — 2026" : "Portfolio — 2026"}
            </span>
            <span className="swiss-label swiss-label-red flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse bg-[#e30613]" />
              {isVi ? "Sẵn sàng nhận việc" : "Available for work"}
            </span>
            <span className="swiss-label hidden md:inline">
              {isVi ? "TP.HCM, Việt Nam" : "HCMC, Vietnam"}
            </span>
          </div>

          {/* Massive name */}
          <h1 className="swiss-h-display mt-10 text-[clamp(3.2rem,11vw,10rem)]">
            Nguyen
            <br />
            Tran Anh<span className="text-[#e30613]">.</span>
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="swiss-rule-red mb-5 w-16" />
              <p className="text-xl font-medium leading-snug tracking-tight sm:text-2xl">
                {isVi
                  ? "Kỹ sư Phần mềm. Tôi xây dựng web app nhanh, sạch và mở rộng được."
                  : "Software Engineer. I build fast, clean, scalable web apps."}
              </p>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6b6b6b]">
                {isVi
                  ? "Hơn 3 năm kinh nghiệm qua SaaS CRM, doanh nghiệp Nhật Bản và sản phẩm AI. Thủ khoa CNTT ĐH Nông Lâm TP.HCM."
                  : "3+ years across SaaS CRM, Japanese enterprise, and AI products. IT valedictorian, Nong Lam University."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    telemetry.track("download_cv", "hero_main_button");
                    onOpenResumeModal();
                  }}
                  className="swiss-btn"
                >
                  <FileDown className="h-4 w-4" />
                  {isVi ? "Xem CV" : "View résumé"}
                </button>
                <Link href="#projects" className="swiss-btn swiss-btn-outline">
                  {isVi ? "Dự án đã làm" : "Selected work"}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <dl className="grid grid-cols-2 border-t-2 border-[#0a0a0a] sm:grid-cols-4">
                {[
                  { v: statsData.yearsExperience, en: "Years experience", vi: "Năm kinh nghiệm" },
                  { v: statsData.gpa, en: "GPA · Valedictorian", vi: "GPA · Thủ khoa" },
                  { v: statsData.awardsCount, en: "Awards", vi: "Giải thưởng" },
                  { v: statsData.performanceGain, en: "Perf. improvement", vi: "Cải thiện hiệu năng" },
                ].map((s) => (
                  <div key={s.en} className="border-b border-r border-[#e2e2e2] px-4 py-6 last:border-r-0 max-sm:[&:nth-child(2)]:border-r-0">
                    <dt className="swiss-label">{isVi ? s.vi : s.en}</dt>
                    <dd className="mt-2 text-4xl font-extrabold tracking-tight">{s.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex items-center justify-between">
                <span className="swiss-label">React / TypeScript / Next.js</span>
                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="swiss-label flex items-center gap-2 hover:text-[#e30613] cursor-pointer"
                >
                  {isVi ? "Cuộn" : "Scroll"} <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
