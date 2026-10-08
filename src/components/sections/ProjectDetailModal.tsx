"use client";

import React from "react";
import { ProjectItem } from "@/types";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
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
        <div>
          <div className="brut-eyebrow text-[#ff3d00]">
            {isVi ? "Chi tiết dự án" : "Project dossier"}
          </div>
          <div className="mt-1">{resolveLocale(project.name, isVi)}</div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-[3px] border-[#111] bg-[#111] p-4 text-white">
          <div>
            <div className="brut-eyebrow text-white/50">
              {isVi ? "Đơn vị" : "Organization"}
            </div>
            <div className="mt-1 font-bold">
              {resolveLocale(project.organization, isVi)} · {resolveLocale(project.year, isVi)}
            </div>
          </div>
          {project.badge && (
            <span className="brut-tag brut-tag-accent">
              {resolveLocale(project.badge, isVi)}
            </span>
          )}
        </div>

        <div>
          <div className="brut-eyebrow mb-2">{isVi ? "Tóm tắt" : "Summary"}</div>
          <p className="text-[15px] font-medium leading-relaxed text-[#111]/80">
            {resolveLocale(project.description, isVi)}
          </p>
        </div>

        {project.architecture && (
          <div className="border-[3px] border-[#111] p-4">
            <div className="brut-eyebrow mb-2 text-[#ff3d00]">
              {isVi ? "Kiến trúc" : "Architecture"}
            </div>
            <p className="font-mono text-[13px] leading-relaxed">
              {resolveLocale(project.architecture, isVi)}
            </p>
          </div>
        )}

        <div>
          <div className="brut-eyebrow mb-3">
            {isVi ? "Vấn đề & Giải pháp" : "Challenges & Solutions"}
          </div>
          <ul className="space-y-2.5">
            {resolveLocaleArray(project.challengesSolved, isVi).map((c: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-sm font-medium">
                <span className="font-black text-[#ff3d00]">▸</span>
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="brut-eyebrow mb-3">{isVi ? "Công nghệ" : "Stack"}</div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t, idx) => (
              <span key={idx} className="brut-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassModal>
  );
}
