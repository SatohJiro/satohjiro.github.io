"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";

export function AboutSection() {
 const { isVi } = useLanguage();

 const engineeringPillars = [
 {
 index: "01",
 title: {
 en: "Frontend Engineering",
 vi: "Kỹ Thuật Frontend",
 },
 desc: {
 en: "Modular component architecture with ReactJS, Next.js, and Vue.js.",
 vi: "Kiến trúc component module hóa với ReactJS, Next.js và Vue.js.",
 },
 color: "play-eyebrow-blue",
 bg: "bg-[#d8e4ff]/50",
 rotate: "0.6deg",
 },
 {
 index: "02",
 title: {
 en: "State & Performance",
 vi: "Quản Lý State & Hiệu Năng",
 },
 desc: {
 en: "Scalable store management with Redux Toolkit and Zustand, +30% boost.",
 vi: "Tối ưu hóa state với Redux Toolkit và Zustand, tăng hơn 30% tốc độ.",
 },
 color: "play-eyebrow-green",
 bg: "bg-[#cdf5dd]/50",
 rotate: "-0.7deg",
 },
 {
 index: "03",
 title: {
 en: "Micro-Frontend & APIs",
 vi: "Micro-Frontend & APIs",
 },
 desc: {
 en: "Experience with micro-frontends (ahamo NTT Docomo) and backend APIs.",
 vi: "Kinh nghiệm thực tế với Micro-frontend (ahamo NTT Docomo) và API backend.",
 },
 color: "play-eyebrow-yellow",
 bg: "bg-[#ffedb8]/50",
 rotate: "0.5deg",
 },
 {
 index: "04",
 title: {
 en: "AI & Modern Tools",
 vi: "Ứng Dụng AI & Tự Động Hóa",
 },
 desc: {
 en: "Integrated OpenAI GPT-4 with Python FastAPI and RabbitMQ queues.",
 vi: "Tích hợp OpenAI GPT-4 với FastAPI và hàng đợi RabbitMQ.",
 },
 color: "play-eyebrow-pink",
 bg: "bg-[#ffd9ea]/50",
 rotate: "-0.5deg",
 },
 ];

 return (
 <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
 <div className="max-w-7xl mx-auto space-y-12">
 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto space-y-3">
 <span className="play-eyebrow play-eyebrow-pink">{isVi ? "Giới thiệu" : "About"}</span>
 <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e1e2a] tracking-tight">
 {isVi ? (
 <>
 Hành Trình Kỹ Thuật & <span className="play-underline">Nền Tảng Vững Chắc</span>
 </>
 ) : (
 <>
 Engineering Journey & <span className="play-underline">Core Background</span>
 </>
 )}
 </h2>
 <p className="text-sm sm:text-base text-[#55555f]">
 {isVi
 ? "Tốt nghiệp Thủ khoa ngành CNTT ĐH Nông Lâm TP.HCM kết hợp hơn 3 năm kinh nghiệm thực chiến phát triển ứng dụng Web."
 : "Nong Lam University IT Valedictorian combined with 3+ years of hands-on web software engineering experience."}
 </p>
 </div>

 {/* Story & Education Card */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 {/* Main Story Narrative */}
 <GlassCard className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-[#1e1e2a]/10 bg-white" glowColor="none">
 <div className="border-b border-[#1e1e2a]/10 pb-4">
 <div className="text-[11px] font-mono uppercase tracking-wider text-[#2b4fc4] font-semibold">
 {isVi ? "Hồ Sơ Năng Lực" : "Engineering Profile"}
 </div>
 <h3 className="text-xl font-bold text-[#1e1e2a] mt-1">
 {isVi ? "Tổng Quan Bản Thân" : "Professional Background"}
 </h3>
 </div>

 <div className="space-y-4 text-sm text-[#55555f] leading-relaxed">
 {(isVi ? summaryData.vi : summaryData.en).map((para, pIdx) => (
 <p key={pIdx}>{para}</p>
 ))}
 </div>

 {/* Quick Principles */}
 <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#3f3f4c]">
 <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#fffdf8] border border-[#1e1e2a]/10">
 <span className="font-mono text-[#2b4fc4] font-bold">—</span>
 <span>{isVi ? "Ưu tiên Performance & Clean Code" : "Performance & Clean Code first"}</span>
 </div>
 <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#fffdf8] border border-[#1e1e2a]/10">
 <span className="font-mono text-[#157a3d] font-bold">—</span>
 <span>{isVi ? "Khả năng tự học & thích ứng nhanh" : "Rapid self-learning & adaptation"}</span>
 </div>
 </div>
 </GlassCard>

 {/* Education Highlight Card */}
 <GlassCard className="lg:col-span-5 p-6 sm:p-8 space-y-6 border-[#1e1e2a]/10 bg-white" glowColor="none">
 <div className="border-b border-[#1e1e2a]/10 pb-4">
 <div className="text-xs font-mono text-amber-600 uppercase font-semibold tracking-wider">
 {isVi ? "Học Vấn Chính Quy" : "Academic Background"}
 </div>
 <h3 className="text-lg font-bold text-[#1e1e2a] mt-1">
 {resolveLocale(educationData.school, isVi)}
 </h3>
 </div>

 <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
 <div className="flex items-center justify-between">
 <span className="text-xs font-bold text-amber-800">
 {isVi ? "Bằng Kỹ Sư Công Nghệ Thông Tin" : "Degree of Engineer in IT"}
 </span>
 <GlassBadge variant="amber" size="sm">GPA 3.6 / 4.0</GlassBadge>
 </div>
 <div className="text-xs text-[#3f3f4c] font-medium">
 {resolveLocale(educationData.major, isVi)} • {resolveLocale(educationData.duration, isVi)}
 </div>
 <div className="text-xs font-semibold text-[#157a3d] pt-1">
 {resolveLocale(educationData.honors, isVi)}
 </div>
 </div>

 <div className="space-y-2.5">
 <div className="text-xs font-semibold uppercase tracking-wider text-[#6e6e7e] font-mono">
 {isVi ? "Dấu Ấn Nổi Bật" : "Academic Highlights"}
 </div>
 <ul className="space-y-2 text-xs text-[#3f3f4c]">
 {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((item, idx) => (
 <li key={idx} className="flex items-start gap-2">
 <span className="font-mono text-amber-600 font-bold shrink-0 mt-0.5">•</span>
 <span className="leading-relaxed">{item}</span>
 </li>
 ))}
 </ul>
 </div>
 </GlassCard>
 </div>

 {/* 4 Pillars — each with its own color */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {engineeringPillars.map((pillar, idx) => (
 <GlassCard
 key={idx}
 className={`p-5 space-y-3 ${pillar.bg} !border-2 !border-[#1e1e2a]/15`}
 glowColor="none"
 >
 <div style={{ transform: `rotate(${pillar.rotate})` }} className="space-y-3">
 <span className={`play-eyebrow ${pillar.color} !text-[10px] !px-2 !py-0.5`}>
 {pillar.index}
 </span>
 <h4 className="font-display text-[15px] font-extrabold text-[#1e1e2a] tracking-tight">
 {resolveLocale(pillar.title, isVi)}
 </h4>
 <p className="text-xs text-[#1e1e2a]/70 leading-relaxed font-medium">
 {resolveLocale(pillar.desc, isVi)}
 </p>
 </div>
 </GlassCard>
 ))}
 </div>
 </div>
 </section>
 );
}
