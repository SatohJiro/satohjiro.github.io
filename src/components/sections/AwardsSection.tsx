"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { awardsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";
import { GlassButton } from "../glass/GlassButton";
import {
 Trophy,
 Medal,
 Award,
 PartyPopper,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function AwardsSection() {
 const { isVi } = useLanguage();

 const awardIcons: Record<string, React.ReactNode> = {
 Trophy: <Trophy className="w-6 h-6 text-amber-500" />,
 Sparkles: <Award className="w-6 h-6 text-blue-500" />,
 Medal: <Medal className="w-6 h-6 text-blue-500" />,
 };

 const handleCelebrate = (awardName: string) => {
 telemetry.track("click", `celebrate_award_${awardName}`);
 import("canvas-confetti")
 .then((mod) => {
 mod.default({
 particleCount: 60,
 spread: 60,
 origin: { y: 0.7 },
 });
 })
 .catch(() => {});
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
 {awardsData.map((award) => (
 <GlassCard
 key={award.id}
 className="flex flex-col justify-between p-6 sm:p-7 space-y-6 border-[#1e1e2a]/10 bg-white"
 glowColor="none"
 >
 <div className="space-y-4">
 {/* Header Icon & Year */}
 <div className="flex items-center justify-between">
 <div className="w-12 h-12 rounded-2xl bg-[#1e1e2a]/[.04] border border-[#1e1e2a]/10 flex items-center justify-center shadow-xs">
 {awardIcons[award.iconName] || <Award className="w-6 h-6 text-amber-500" />}
 </div>
 <GlassBadge variant={award.id === "valedictorian" ? "amber" : "blue"} size="sm">
 {award.year}
 </GlassBadge>
 </div>

 {/* Title */}
 <div>
 <h3 className="text-lg font-bold text-[#1e1e2a]">
 {resolveLocale(award.title, isVi)}
 </h3>
 <div className="text-xs font-mono font-semibold text-amber-700 mt-1">
 {resolveLocale(award.badgeText, isVi)}
 </div>
 </div>

 {/* Organization */}
 <div className="text-xs text-[#55555f] font-medium pt-1">
 <span>{resolveLocale(award.organization, isVi)}</span>
 </div>

 {/* Description */}
 <p className="text-xs text-[#55555f] leading-relaxed pt-1">
 {resolveLocale(award.description, isVi)}
 </p>
 </div>

 {/* Celebrate Button */}
 <div className="pt-4 border-t border-[#1e1e2a]/10">
 <GlassButton
 onClick={() => handleCelebrate(award.title.en)}
 variant="outline"
 size="sm"
 icon={<PartyPopper className="w-3.5 h-3.5 text-amber-600" />}
 className="w-full text-xs text-slate-800"
 >
 {isVi ? "Chúc Mừng Thành Tích" : "Celebrate Honor"}
 </GlassButton>
 </div>
 </GlassCard>
 ))}
 </div>
 </div>
 </section>
 );
}

