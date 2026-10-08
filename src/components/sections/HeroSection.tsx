"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { statsData } from "@/data/portfolio-content";
import { FileDown, ArrowDown, MapPin } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

export function HeroSection({ onOpenResumeModal }: HeroSectionProps) {
  const { isVi } = useLanguage();

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center justify-center px-4 pt-24 pb-16 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Chapter marker */}
        <div className="journey-eyebrow mb-6 inline-flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" />
          {isVi ? "Chặng 01 — Đồng quê Việt Nam" : "Chapter 01 — Vietnamese Countryside"}
        </div>

        <h1 className="journey-text font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
          {isVi ? (
            <>
              Từ đồng quê,
              <br />
              <span className="journey-accent">vươn ra vũ trụ.</span>
            </>
          ) : (
            <>
              From the countryside,
              <br />
              <span className="journey-accent">to the universe.</span>
            </>
          )}
        </h1>

        <p className="journey-muted mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
          {isVi
            ? "Tôi là Nguyễn Trần Anh — Kỹ sư Phần mềm. Cuộn xuống để đi cùng tôi: từ cánh đồng quê hương, lên Sài Gòn hoa lệ, vươn ra thế giới, rồi bay vào không gian."
            : "I'm Nguyen Tran Anh — Software Engineer. Scroll to ride with me: from homeland rice fields, up to vibrant Saigon, out to the world, then into space."}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              telemetry.track("download_cv", "hero_main_button");
              onOpenResumeModal();
            }}
            className="journey-btn-primary"
          >
            <FileDown className="h-4 w-4" />
            {isVi ? "Xem CV của tôi" : "View my resume"}
          </button>
          <Link href="#projects" className="journey-btn-secondary">
            {isVi ? "Xem dự án" : "See projects"}
          </Link>
        </div>

        {/* Stats strip */}
        <div className="journey-card mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden !p-0 sm:grid-cols-4">
          {[
            { v: statsData.yearsExperience, en: "Years Experience", vi: "Năm kinh nghiệm" },
            { v: statsData.gpa, en: "Valedictorian GPA", vi: "GPA Thủ khoa" },
            { v: statsData.awardsCount, en: "Honors & Awards", vi: "Giải thưởng" },
            { v: statsData.performanceGain, en: "Perf. Gain", vi: "Tối ưu" },
          ].map((s) => (
            <div key={s.en} className="px-4 py-5">
              <div className="journey-text font-display text-2xl font-extrabold">{s.v}</div>
              <div className="journey-faint mt-1 text-[10px] font-bold tracking-widest uppercase">
                {isVi ? s.vi : s.en}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <button
          onClick={scrollToAbout}
          className="journey-muted mx-auto mt-12 flex flex-col items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-70 cursor-pointer"
        >
          {isVi ? "Bắt đầu hành trình" : "Start the journey"}
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
