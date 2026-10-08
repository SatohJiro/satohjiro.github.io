"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { statsData } from "@/data/portfolio-content";
import { GlassButton } from "../glass/GlassButton";
import { GlassBadge } from "../glass/GlassBadge";
import { FileDown, ArrowRight, Sparkles } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

const highlights = [
  {
    eyebrow: "Enterprise Platform",
    title: "ahamo Web Platform (NTT Docomo)",
    descEn: "Micro-frontends with Vue.js, ReactJS, and CMS Webrelease for the Japanese market.",
    descVi: "Micro-frontend với Vue.js, ReactJS và CMS Webrelease cho thị trường Nhật Bản.",
    badge: "Active",
    badgeVariant: "blue" as const,
  },
  {
    eyebrow: "Academic Distinction",
    title: "Class Valedictorian (NLU 2019)",
    descEn: "IT Engineer degree, Excellent rating (GPA 3.6/4.0). University President's Certificate of Merit.",
    descVi: "Bằng Kỹ sư CNTT loại Xuất sắc (GPA 3.6/4.0). Giấy khen của Hiệu trưởng.",
    badge: "Top 1",
    badgeVariant: "amber" as const,
  },
  {
    eyebrow: "AI Engineering",
    title: "GPT Code Generator & Pipeline",
    descEn: "Natural language to web code with GPT-4, FastAPI, RabbitMQ & Next.js.",
    descVi: "Sinh mã nguồn web từ ngôn ngữ tự nhiên với GPT-4, FastAPI, RabbitMQ & Next.js.",
    badge: "3rd Prize",
    badgeVariant: "emerald" as const,
  },
];

const stats = [
  { value: () => statsData.yearsExperience, labelEn: "Years Experience", labelVi: "Năm kinh nghiệm" },
  { value: () => statsData.gpa, labelEn: "Valedictorian GPA", labelVi: "GPA Thủ khoa" },
  { value: () => statsData.awardsCount, labelEn: "Honors & Awards", labelVi: "Giải thưởng" },
  { value: () => statsData.performanceGain, labelEn: "Render Perf. Gain", labelVi: "Tối ưu render" },
];

export function HeroSection({ onOpenResumeModal }: HeroSectionProps) {
  const { isVi } = useLanguage();

  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-[#b6b9c0]">
              {isVi ? "Sẵn sàng cho cơ hội mới" : "Open to new opportunities"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
            <span className="sleek-gradient-text">
              {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
            </span>
          </h1>
          <p className="mt-4 font-mono text-[13px] tracking-wide text-[#8f99e8]">
            {"//"} {isVi ? "Kỹ sư Phần mềm · Full-Stack & Frontend" : "Software Engineer · Full-Stack & Frontend"} {"//"} @SatohJiro
          </p>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#8a8f98] sm:text-base">
            {isVi
              ? "3+ năm kinh nghiệm xây dựng web app hiệu năng cao, micro-frontend tại NTT Docomo và các công cụ AI production-ready."
              : "3+ years building high-performance web apps, micro-frontends at NTT Docomo, and production-ready AI tools."}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <GlassButton
              onClick={() => {
                telemetry.track("download_cv", "hero_main_button");
                onOpenResumeModal();
              }}
              variant="primary"
              size="lg"
              icon={<FileDown className="h-4 w-4" />}
            >
              {isVi ? "Tải CV / Resume" : "Download CV"}
            </GlassButton>
            <Link href="#projects">
              <GlassButton
                onClick={() => telemetry.track("click", "hero_explore_projects")}
                variant="glass"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                {isVi ? "Xem dự án" : "View projects"}
              </GlassButton>
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.labelEn} className="bg-[#0b0c0e] px-4 py-5">
                <div className="text-2xl font-semibold tracking-tight text-white">{s.value()}</div>
                <div className="mt-1 text-[11px] font-medium tracking-wide text-[#8a8f98] uppercase">
                  {isVi ? s.labelVi : s.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight cards */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="sleek-card-interactive group p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="sleek-eyebrow sleek-eyebrow-accent">{h.eyebrow}</div>
                <GlassBadge variant={h.badgeVariant} size="sm">
                  {h.badge}
                </GlassBadge>
              </div>
              <div className="mt-2.5 text-[15px] font-semibold tracking-tight text-white">
                {h.title}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8a8f98]">
                {isVi ? h.descVi : h.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* AI tagline */}
        <div className="mt-10 flex items-center justify-center gap-2 text-[13px] text-[#5a5f68]">
          <Sparkles className="h-3.5 w-3.5 text-[#8f99e8]" />
          <span>
            {isVi
              ? "Xây dựng sản phẩm nhanh, tinh gọn và đáng tin cậy."
              : "Shipping fast, lean, and reliable products."}
          </span>
        </div>
      </div>
    </section>
  );
}
