"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { GlassCard } from "../glass/GlassCard";
import { telemetry } from "@/lib/telemetry";

export function SkillsSection() {
 const { isVi } = useLanguage();
 const [selectedCategory, setSelectedCategory] = useState<string>("all");

 const handleCategorySelect = (id: string) => {
 setSelectedCategory(id);
 telemetry.track("click", `filter_skills_${id}`);
 };

 const displayedCategories = skillsData.filter((cat) => {
 if (selectedCategory === "all") return true;
 return cat.id === selectedCategory;
 });

 return (
 <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8">
 <div className="max-w-7xl mx-auto space-y-12">
 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto space-y-3">
 <span className="play-eyebrow play-eyebrow-green">{isVi ? "Kỹ năng" : "Skills"}</span>
 <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e1e2a] tracking-tight">
 {isVi ? (
 <>
 Kỹ Năng Kỹ Thuật & <span className="play-underline">Kinh Nghiệm Thực Tế</span>
 </>
 ) : (
 <>
 Technical Stack & <span className="play-underline">Applied Experience</span>
 </>
 )}
 </h2>
 <p className="text-sm sm:text-base text-[#55555f]">
 {isVi
 ? "Thế mạnh nòng cốt về Frontend & tối ưu hiệu năng, kết hợp kinh nghiệm thực tế với các kiến trúc Micro-frontend, Backend APIs và tích hợp AI."
 : "Core expertise in frontend engineering and performance optimization, supported by applied experience in micro-frontends, backend APIs, and AI integrations."}
 </p>
 </div>

 {/* Filter Tabs */}
 <div className="flex flex-wrap items-center justify-center gap-2">
 <button
 onClick={() => handleCategorySelect("all")}
 className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
 selectedCategory === "all"
 ? "bg-[#1e1e2a] text-white border-2 border-[#1e1e2a] shadow-[3px_3px_0_0_rgba(30,30,42,0.2)]"
 : "bg-white border-2 border-[#1e1e2a]/12 text-[#6e6e7e] hover:border-[#1e1e2a]/30 hover:text-[#1e1e2a]"
 }`}
 >
 {isVi ? "Tất Cả" : "All Categories"}
 </button>
 {skillsData.map((cat) => {
 const isSelected = selectedCategory === cat.id;
 return (
 <button
 key={cat.id}
 onClick={() => handleCategorySelect(cat.id)}
 className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
 isSelected
 ? "bg-[#1e1e2a] text-white border-2 border-[#1e1e2a] shadow-[3px_3px_0_0_rgba(30,30,42,0.2)]"
 : "bg-white border-2 border-[#1e1e2a]/12 text-[#6e6e7e] hover:border-[#1e1e2a]/30 hover:text-[#1e1e2a]"
 }`}
 >
 <span>{resolveLocale(cat.label, isVi).split("(")[0].trim()}</span>
 </button>
 );
 })}
 </div>

 {/* Categorized Skills Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {displayedCategories.map((category) => (
 <GlassCard key={category.id} className="p-6 space-y-5 border-[#1e1e2a]/10 bg-white" glowColor="none">
 {/* Category Header */}
 <div className="flex items-center justify-between pb-3 border-b border-[#1e1e2a]/10">
 <div className="space-y-1">
 <div className="font-bold text-base text-[#1e1e2a]">
 <span>{resolveLocale(category.label, isVi)}</span>
 </div>
 {category.description && (
 <div className="text-[11px] text-[#6e6e7e]">
 {resolveLocale(category.description, isVi)}
 </div>
 )}
 </div>
 </div>

 {/* Skills Items in Category */}
 <div className="grid grid-cols-1 gap-3">
 {category.skills.map((skill, sIdx) => (
 <div
 key={sIdx}
 className="p-3 rounded-xl bg-[#fffdf8]/80 border border-[#1e1e2a]/10 space-y-1.5 hover:border-[#1e1e2a]/25 transition-colors"
 >
 <div className="flex items-center justify-between">
 <span className="font-semibold text-xs text-[#1e1e2a]">
 {skill.name}
 </span>
 {skill.tag && (
 <span
 className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${
 skill.highlight
 ? "bg-blue-50 text-[#2b4fc4] border-blue-200"
 : "bg-[#1e1e2a]/[.04] text-[#55555f] border-[#1e1e2a]/10"
 }`}
 >
 {resolveLocale(skill.tag, isVi)}
 </span>
 )}
 </div>

 {skill.description && (
 <p className="text-[11px] text-[#55555f] leading-relaxed">
 {resolveLocale(skill.description, isVi)}
 </p>
 )}
 </div>
 ))}
 </div>
 </GlassCard>
 ))}
 </div>
 </div>
 </section>
 );
}


