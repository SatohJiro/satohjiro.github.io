"use client";

import React from "react";
import { ProjectItem } from "@/types";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { GlassModal } from "../glass/GlassModal";

interface Props {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  isVi: boolean;
}

export function ProjectDetailModal({ project, isOpen, onClose, isVi }: Props) {
  if (!project) return null;

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title={
        <div>
          <div className="swiss-label swiss-label-red">{isVi ? "Dự án" : "Project"}</div>
          <div className="mt-1">{resolveLocale(project.name, isVi)}</div>
        </div>
      }
    >
      <div className="swiss-label mb-6">
        {resolveLocale(project.organization, isVi)} — {resolveLocale(project.year, isVi)}
      </div>

      <p className="max-w-3xl text-[16px] leading-relaxed">
        {resolveLocale(project.description, isVi)}
      </p>

      {project.architecture && (
        <div className="mt-8 border-t-2 border-[#0a0a0a] pt-6">
          <div className="swiss-label mb-3">{isVi ? "Kiến trúc" : "Architecture"}</div>
          <p className="font-mono text-[13px] leading-relaxed text-[#3d3d3d]">
            {resolveLocale(project.architecture, isVi)}
          </p>
        </div>
      )}

      <div className="mt-8 border-t-2 border-[#0a0a0a] pt-6">
        <div className="swiss-label mb-4">{isVi ? "Vấn đề & Giải pháp" : "Challenges & Solutions"}</div>
        <ul className="space-y-3">
          {resolveLocaleArray(project.challengesSolved, isVi).map((c: string, i: number) => (
            <li key={i} className="flex gap-3 text-[14px] font-medium leading-relaxed">
              <span className="swiss-index text-sm">{String(i + 1).padStart(2, "0")}</span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t-2 border-[#0a0a0a] pt-6">
        <div className="swiss-label mb-4">{isVi ? "Công nghệ" : "Stack"}</div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t, i) => (
            <span key={i} className="swiss-tag">{t}</span>
          ))}
        </div>
      </div>
    </GlassModal>
  );
}
