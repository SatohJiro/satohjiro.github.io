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
        <div className="text-slate-900 dark:text-white">
          <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider font-semibold">
            {isVi ? "Kiến Trúc & Chi Tiết Kỹ Thuật" : "Architecture & Technical Deep-Dive"}
          </div>
          <div className="text-base sm:text-lg font-bold mt-0.5">
            {resolveLocale(project.name, isVi)}
          </div>
        </div>
      }
    >
      <div className="space-y-6 text-slate-800 dark:text-slate-100">
        {/* Organization & Year */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? "Đơn vị / Bối cảnh" : "Organization / Context"}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
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
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {isVi ? "Mô Tả & Mục Tiêu Dự Án" : "Project Summary & Mission"}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {resolveLocale(project.description, isVi)}
          </p>
        </div>

        {/* Architecture Blueprint if available */}
        {project.architecture && (
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              {isVi ? "[Kiến Trúc Triển Khai]" : "[System Architecture]"}
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-blue-500/30 font-mono text-xs text-blue-300 leading-relaxed shadow-xs">
              {resolveLocale(project.architecture, isVi)}
            </div>
          </div>
        )}

        {/* Challenges & Solutions */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
            {isVi ? "[Vấn Đề Kỹ Thuật & Giải Pháp]" : "[Technical Challenges & Solutions]"}
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {resolveLocaleArray(project.challengesSolved, isVi).map((c: string, idx: number) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
              >
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* All Technologies */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
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
