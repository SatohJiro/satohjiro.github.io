"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { WorkExperience } from "@/types";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";
import { TrendingUp } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function ExperienceSection() {
 const { isVi } = useLanguage();
 const [activeExpId, setActiveExpId] = useState<string>(experienceData[0].id);

 const activeExp =
 experienceData.find((exp) => exp.id === activeExpId) || experienceData[0];

 const handleSelectExp = (exp: WorkExperience) => {
 setActiveExpId(exp.id);
 telemetry.track("click", `select_experience_${exp.id}`, { company: exp.company });
 };

 return (
 <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8">
 <div className="max-w-7xl mx-auto space-y-12">
 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto space-y-3">
 <span className="play-eyebrow play-eyebrow-blue">{isVi ? "Kinh nghiệm" : "Experience"}</span>
 <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e1e2a] tracking-tight">
 {isVi ? (
 <>
 Kinh Nghiệm & <span className="play-underline">Dấu Ấn Kỹ Thuật</span>
 </>
 ) : (
 <>
 Work Experience & <span className="play-underline">Engineering Track Record</span>
 </>
 )}
 </h2>
 <p className="text-sm sm:text-base text-[#55555f]">
 {isVi
 ? "Hơn 3 năm kinh nghiệm lập trình thực tế qua các môi trường doanh nghiệp Nhật Bản, SaaS CRM và dự án AI."
 : "Over 3 years of software development experience across enterprise Japanese clients, SaaS platforms, and AI tools."}
 </p>
 </div>

 {/* Layout: Sidebar Tabs (Company list) + Active Detail Panel */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
 {/* Left: Company Tabs */}
 <div className="lg:col-span-4 space-y-3">
 {experienceData.map((exp) => {
 const isSelected = exp.id === activeExpId;
 const locationStr = resolveLocale(exp.location, isVi);
 return (
 <button
 key={exp.id}
 onClick={() => handleSelectExp(exp)}
 className={`w-full text-left p-4 rounded-3xl transition-all duration-200 border-2 cursor-pointer ${
 isSelected
 ? "bg-[#1e1e2a] border-[#1e1e2a] shadow-[5px_5px_0_0_rgba(30,30,42,0.18)] -rotate-[0.5deg]"
 : "bg-white border-[#1e1e2a]/10 hover:border-[#1e1e2a]/25 hover:-translate-y-0.5"
 }`}
 >
 <div className="flex items-center justify-between gap-2">
 <div className={`font-display font-bold text-[15px] ${isSelected ? "text-white" : "text-[#1e1e2a]"}`}>
 {exp.company}
 </div>
 {exp.current && (
 <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#cdf5dd] text-[#157a3d] border-2 border-[#157a3d]/50 font-mono">
 {isVi ? "Hiện tại" : "Current"}
 </span>
 )}
 </div>

 <div className={`text-xs font-bold mt-1 ${isSelected ? "text-[#ffb627]" : "text-[#2b4fc4]"}`}>
 {resolveLocale(exp.title, isVi)}
 </div>

 <div className={`flex items-center gap-2 text-[11px] font-mono mt-2.5 pt-2 border-t-2 ${isSelected ? "text-white/60 border-white/15" : "text-[#6e6e7e] border-[#1e1e2a]/10"}`}>
 <span>{resolveLocale(exp.duration, isVi)}</span>
 <span>·</span>
 <span>{locationStr.split(",")[0]}</span>
 </div>
 </button>
 );
 })}
 </div>

 {/* Right: Detailed Experience View */}
 <div className="lg:col-span-8">
 <GlassCard className="p-6 sm:p-8 space-y-6 border-[#1e1e2a]/10 bg-white" glowColor="none">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1e1e2a]/10">
 <div>
 <h3 className="text-xl sm:text-2xl font-bold text-[#1e1e2a]">
 {resolveLocale(activeExp.title, isVi)}
 </h3>
 <div className="text-xs sm:text-sm font-semibold text-[#2b4fc4] mt-1">
 {activeExp.company} • {resolveLocale(activeExp.location, isVi)}
 </div>
 </div>
 <div className="flex items-center gap-2">
 <span className="text-xs px-3 py-1 rounded-xl border border-[#1e1e2a]/10 bg-[#1e1e2a]/[.04] text-[#3f3f4c] font-mono">
 {resolveLocale(activeExp.duration, isVi)}
 </span>
 </div>
 </div>

 {/* Project Highlights inside this Experience */}
 <div className="space-y-5">
 {activeExp.projectHighlights.map((proj, pIdx) => (
 <div key={pIdx} className="space-y-3.5 p-4 sm:p-5 rounded-2xl bg-[#fffdf8] border border-[#1e1e2a]/10">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
 <h4 className="text-base font-bold text-[#1e1e2a]">
 {proj.name}
 </h4>
 {proj.client && (
 <span className="text-xs text-[#6e6e7e] font-mono">
 {resolveLocale(proj.client, isVi)}
 </span>
 )}
 </div>

 <p className="text-xs sm:text-sm text-[#55555f] leading-relaxed">
 {resolveLocale(proj.description, isVi)}
 </p>

 {/* Key Responsibilities */}
 <div className="space-y-1.5">
 <div className="text-xs font-semibold text-[#6e6e7e]">
 {isVi ? "Trách nhiệm chính:" : "Responsibilities:"}
 </div>
 <ul className="space-y-1 text-xs text-[#3f3f4c]">
 {proj.responsibilities[isVi ? "vi" : "en"].map((r, rIdx) => (
 <li key={rIdx} className="flex items-start gap-2">
 <span className="w-1 h-1 rounded-full bg-blue-600 mt-1.5 shrink-0" />
 <span className="leading-relaxed">{r}</span>
 </li>
 ))}
 </ul>
 </div>

 {/* Measurable Impacts */}
 <div className="p-3 rounded-xl bg-[#cdf5dd]/60 border-2 border-[#157a3d]/25 space-y-1">
 <div className="text-[11px] font-bold text-[#157a3d] flex items-center gap-1.5">
 <TrendingUp className="w-3 h-3" />
 <span>{isVi ? "Kết quả đạt được:" : "Impact & Result:"}</span>
 </div>
 <ul className="text-xs text-[#3f3f4c] space-y-0.5 pl-4 list-disc">
 {proj.impacts[isVi ? "vi" : "en"].map((imp, impIdx) => (
 <li key={impIdx}>{imp}</li>
 ))}
 </ul>
 </div>

 {/* Tech Stack Badges */}
 <div className="pt-1 flex flex-wrap gap-1.5">
 {proj.technologies.map((t, tIdx) => (
 <GlassBadge key={tIdx} variant="blue" size="sm">
 {t}
 </GlassBadge>
 ))}
 </div>
 </div>
 ))}
 </div>
 </GlassCard>
 </div>
 </div>
 </div>
 </section>
 );
}
