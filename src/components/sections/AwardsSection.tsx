"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { awardsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";
import {
 Trophy,
 Medal,
 Award,
} from "lucide-react";

const cardStyles = [
  { bg: "bg-[#ffedb8]", border: "border-[#d99400]", iconBg: "bg-[#ffb627]", rotate: "-1deg" },
  { bg: "bg-[#d8e4ff]", border: "border-[#2b4fc4]", iconBg: "bg-[#4d7cfe]", rotate: "0.8deg" },
  { bg: "bg-[#ffd9ea]", border: "border-[#c22a72]", iconBg: "bg-[#ff5ca8]", rotate: "-0.6deg" },
];

export function AwardsSection() {
 const { isVi } = useLanguage();

 const awardIcons: Record<string, React.ReactNode> = {
 Trophy: <Trophy className="w-6 h-6 text-white" />,
 Sparkles: <Award className="w-6 h-6 text-white" />,
 Medal: <Medal className="w-6 h-6 text-white" />,
 };

 return (
 <section id="awards" className="relative py-20 px-4 sm:px-6 lg:px-8">
 <div className="max-w-7xl mx-auto space-y-12">
 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto space-y-3">
 <span className="play-eyebrow play-eyebrow-purple">{isVi ? "Vinh danh" : "Honors"}</span>
 <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e1e2a] tracking-tight">
 {isVi ? (
 <>
 Giải Thưởng & <span className="play-underline">Ghi Nhận Đóng Góp</span>
 </>
 ) : (
 <>
 Honors & <span className="play-underline">Key Recognitions</span>
 </>
 )}
 </h2>
 <p className="text-sm sm:text-base text-[#55555f]">
 {isVi
 ? "Sự ghi nhận từ nhà trường và công ty cho thành tích học tập xuất sắc và đóng góp phát triển sản phẩm."
 : "Recognitions from university leadership and company teams for academic performance and project contributions."}
 </p>
 </div>

 {/* Awards Grid */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {awardsData.map((award, idx) => {
 const style = cardStyles[idx % cardStyles.length];
 return (
 <GlassCard
 key={award.id}
 className={`flex flex-col justify-between p-6 sm:p-7 space-y-5 ${style.bg} !border-2 ${style.border}`}
 glowColor="none"
 >
 <div className="space-y-4" style={{ transform: `rotate(${style.rotate})` }}>
 {/* Header Icon & Year */}
 <div className="flex items-center justify-between">
 <div className={`w-12 h-12 rounded-2xl ${style.iconBg} border-2 border-[#1e1e2a] flex items-center justify-center shadow-[3px_3px_0_0_#1e1e2a]`}>
 {awardIcons[award.iconName] || <Award className="w-6 h-6 text-white" />}
 </div>
 <GlassBadge variant={award.id === "valedictorian" ? "amber" : "blue"} size="sm">
 {award.year}
 </GlassBadge>
 </div>

 {/* Title */}
 <div>
 <h3 className="font-display text-lg font-extrabold text-[#1e1e2a] tracking-tight">
 {resolveLocale(award.title, isVi)}
 </h3>
 <div className="text-xs font-mono font-bold text-[#1e1e2a]/70 mt-1">
 {resolveLocale(award.badgeText, isVi)}
 </div>
 </div>

 {/* Organization */}
 <div className="text-xs text-[#1e1e2a]/70 font-bold">
 {resolveLocale(award.organization, isVi)}
 </div>

 {/* Description */}
 <p className="text-[13px] text-[#1e1e2a]/80 leading-relaxed font-medium">
 {resolveLocale(award.description, isVi)}
 </p>
 </div>
 </GlassCard>
 );
 })}
 </div>
 </div>
 </section>
 );
}

