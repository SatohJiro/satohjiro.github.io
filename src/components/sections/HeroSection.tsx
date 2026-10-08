"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { statsData } from "@/data/portfolio-content";
import { GlassButton } from "../glass/GlassButton";
import { GlassBadge } from "../glass/GlassBadge";
import { FileDown, ArrowRight, Sparkles, Star, Zap, Heart } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

const highlights = [
  {
    eyebrow: "Enterprise Platform",
    eyebrowClass: "play-eyebrow-blue",
    title: "ahamo Web Platform (NTT Docomo)",
    descEn: "Micro-frontends with Vue.js, ReactJS, and CMS Webrelease for the Japanese market.",
    descVi: "Micro-frontend với Vue.js, ReactJS và CMS Webrelease cho thị trường Nhật Bản.",
    badge: "Active",
    badgeVariant: "blue" as const,
    icon: <Zap className="h-4 w-4" />,
  },
  {
    eyebrow: "Academic Distinction",
    eyebrowClass: "play-eyebrow-yellow",
    title: "Class Valedictorian (NLU 2019)",
    descEn: "IT Engineer degree, Excellent rating (GPA 3.6/4.0). University President's Merit.",
    descVi: "Bằng Kỹ sư CNTT loại Xuất sắc (GPA 3.6/4.0). Giấy khen của Hiệu trưởng.",
    badge: "Top 1",
    badgeVariant: "amber" as const,
    icon: <Star className="h-4 w-4" />,
  },
  {
    eyebrow: "AI Engineering",
    eyebrowClass: "play-eyebrow-pink",
    title: "GPT Code Generator & Pipeline",
    descEn: "Natural language to web code with GPT-4, FastAPI, RabbitMQ & Next.js.",
    descVi: "Sinh mã nguồn web từ ngôn ngữ tự nhiên với GPT-4, FastAPI, RabbitMQ & Next.js.",
    badge: "3rd Prize",
    badgeVariant: "emerald" as const,
    icon: <Heart className="h-4 w-4" />,
  },
];

const stats = [
  { value: () => statsData.yearsExperience, labelEn: "Years Experience", labelVi: "Năm kinh nghiệm", bg: "bg-[#d8e4ff]" },
  { value: () => statsData.gpa, labelEn: "Valedictorian GPA", labelVi: "GPA Thủ khoa", bg: "bg-[#ffedb8]" },
  { value: () => statsData.awardsCount, labelEn: "Honors & Awards", labelVi: "Giải thưởng", bg: "bg-[#ffd9ea]" },
  { value: () => statsData.performanceGain, labelEn: "Render Perf. Gain", labelVi: "Tối ưu render", bg: "bg-[#cdf5dd]" },
];

const marqueeItems = ["React", "Next.js", "Vue.js", "TypeScript", "Spring Boot", "FastAPI", "OpenAI", "Micro-frontend", "RabbitMQ", "Docker"];

export function HeroSection({ onOpenResumeModal }: HeroSectionProps) {
  const { isVi } = useLanguage();

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Status sticker */}
          <div className="play-sticker items-center gap-2 rounded-full bg-[#cdf5dd] px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#157a3d] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#157a3d]" />
            </span>
            <span className="text-xs font-bold text-[#157a3d]">
              {isVi ? "Sẵn sàng cho cơ hội mới!" : "Open to new opportunities!"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight text-[#1e1e2a] sm:text-6xl lg:text-7xl">
            {isVi ? "Xin chào, tôi là" : "Hi, I'm"}{" "}
            <span className="play-underline">Nguyễn Trần Anh</span>
          </h1>
          <p className="mt-5 font-mono text-[13px] font-bold tracking-wide text-[#c22a72]">
            {"<"} {isVi ? "Kỹ sư Phần mềm · Full-Stack & Frontend" : "Software Engineer · Full-Stack & Frontend"} {" />"}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed font-medium text-[#6e6e7e] sm:text-base">
            {isVi
              ? "3+ năm kinh nghiệm xây dựng web app siêu tốc, micro-frontend tại NTT Docomo và các công cụ AI xịn sò."
              : "3+ years building blazing-fast web apps, micro-frontends at NTT Docomo, and seriously cool AI tools."}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <GlassButton
              onClick={() => {
                telemetry.track("download_cv", "hero_main_button");
                onOpenResumeModal();
              }}
              variant="primary"
              size="lg"
              icon={<FileDown className="h-4 w-4" />}
            >
              {isVi ? "Tải CV ngay!" : "Grab my CV!"}
            </GlassButton>
            <Link href="#projects">
              <GlassButton
                onClick={() => telemetry.track("click", "hero_explore_projects")}
                variant="glass"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                {isVi ? "Xem dự án" : "See projects"}
              </GlassButton>
            </Link>
          </div>

          {/* Stats — colorful tiles */}
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.labelEn}
                className={`rounded-3xl border-2 border-[#1e1e2a] px-3 py-4 shadow-[4px_4px_0_0_#1e1e2a] ${s.bg}`}
              >
                <div className="font-display text-2xl font-extrabold text-[#1e1e2a]">{s.value()}</div>
                <div className="mt-1 text-[10px] font-bold tracking-wider text-[#1e1e2a]/70 uppercase">
                  {isVi ? s.labelVi : s.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className="play-card-interactive p-5"
              style={{ transform: `rotate(${i === 1 ? 0.8 : i === 2 ? -0.8 : 0.5}deg)` }}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`play-eyebrow ${h.eyebrowClass}`}>{h.eyebrow}</span>
                <GlassBadge variant={h.badgeVariant} size="sm">
                  {h.badge}
                </GlassBadge>
              </div>
              <div className="mt-3 flex items-center gap-2 font-display text-[16px] font-bold tracking-tight text-[#1e1e2a]">
                <span className="text-[#ff5ca8]">{h.icon}</span>
                {h.title}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed font-medium text-[#6e6e7e]">
                {isVi ? h.descVi : h.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech marquee */}
      <div className="mt-14 -rotate-1 border-y-[3px] border-[#1e1e2a] bg-[#1e1e2a] py-3 overflow-hidden">
        <div className="play-marquee-track flex w-max items-center gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-sm font-bold tracking-wide text-white">
              {t}
              <Sparkles className="h-4 w-4 text-[#ffb627]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
