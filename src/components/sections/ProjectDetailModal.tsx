"use client";

import React from "react";
import { ProjectItem } from "@/types";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { GlassBadge } from "../glass/GlassBadge";
import { GlassModal } from "../glass/GlassModal";

interface ProjectDetailModalProps {
 project: ProjectItem | null;
 isOpen: boolean;
 onClose: () => void;
 isVi: boolean;
}

export function ProjectDetailModal({
 project,
 isOpen,
 onClose,
 isVi,
}: ProjectDetailModalProps) {
 if (!project) return null;

 return (
 <GlassModal
 isOpen={isOpen}
 onClose={onClose}
 maxWidth="xl"
 title={
 <div className="text-[#1e1e2a]">
 <div className="text-[10px] font-mono text-[#2b4fc4] uppercase tracking-wider font-semibold">
 {isVi ? "Kiến Trúc & Chi Tiết Kỹ Thuật" : "Architecture & Technical Deep-Dive"}
 </div>
 <div className="text-base sm:text-lg font-bold mt-0.5">
 {resolveLocale(project.name, isVi)}
 </div>
 </div>
 }
 >
 <div className="space-y-6 text-[#1e1e2a]">
 {/* Organization & Year */}
 <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-[#fffdf8] border border-[#1e1e2a]/10">
 <div>
 <div className="text-xs text-[#6e6e7e]">
 {isVi ? "Đơn vị / Bối cảnh" : "Organization / Context"}
 </div>
 <div className="text-sm font-bold text-[#1e1e2a]">
 {resolveLocale(project.organization, isVi)}
 </div>
 </div>
 {project.badge && (
 <GlassBadge variant="blue" size="md">
 {resolveLocale(project.badge, isVi)}
 </GlassBadge>
 )}
 </div>

 {/* Description */}
 <div className="space-y-2">
 <div className="text-xs font-mono font-bold text-[#1e1e2a] uppercase tracking-wider">
 {isVi ? "Mô Tả & Mục Tiêu Dự Án" : "Project Summary & Mission"}
 </div>
 <p className="text-xs sm:text-sm text-[#3f3f4c] leading-relaxed">
 {resolveLocale(project.description, isVi)}
 </p>
 </div>

 {/* Architecture Blueprint if available */}
 {project.architecture && (
 <div className="space-y-2">
 <div className="text-xs font-mono font-bold text-[#2b4fc4] uppercase tracking-wider">
 {isVi ? "Kiến trúc triển khai" : "System Architecture"}
 </div>
 <div className="p-3.5 rounded-2xl bg-[#d8e4ff]/50 border-2 border-[#2b4fc4]/25 font-mono text-xs text-[#1e1e2a] leading-relaxed">
 {resolveLocale(project.architecture, isVi)}
 </div>
 </div>
 )}

 {/* Challenges & Solutions */}
 <div className="space-y-2">
 <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
 {isVi ? "[Vấn Đề Kỹ Thuật & Giải Pháp]" : "[Technical Challenges & Solutions]"}
 </div>
 <ul className="space-y-2 text-xs text-[#3f3f4c]">
 {resolveLocaleArray(project.challengesSolved, isVi).map((c: string, idx: number) => (
 <li
 key={idx}
 className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#fffdf8] border border-[#1e1e2a]/10"
 >
 <span className="font-mono text-amber-600 font-bold mt-0.5">•</span>
 <span className="leading-relaxed">{c}</span>
 </li>
 ))}
 </ul>
 </div>

 {/* All Technologies */}
 <div className="space-y-2">
 <div className="text-xs font-mono font-bold text-[#1e1e2a] uppercase tracking-wider">
 {isVi ? "Công Nghệ Sử Dụng" : "Technologies Used"}
 </div>
 <div className="flex flex-wrap gap-1.5">
 {project.technologies.map((t, idx) => (
 <GlassBadge key={idx} variant="blue" size="sm">
 {t}
 </GlassBadge>
 ))}
 </div>
 </div>
 </div>
 </GlassModal>
 );
}
