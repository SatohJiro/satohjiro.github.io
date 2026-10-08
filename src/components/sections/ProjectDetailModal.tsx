"use client";
import React from "react";
import { ProjectItem } from "@/types";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { GlassModal } from "../glass/GlassModal";

export function ProjectDetailModal({ project, isOpen, onClose, isVi }: {
  project: ProjectItem | null; isOpen: boolean; onClose: () => void; isVi: boolean;
}) {
  if (!project) return null;
  return (
    <GlassModal isOpen={isOpen} onClose={onClose} maxWidth="xl"
      title={<div><div className="bp-label bp-label-accent">{isVi ? "Hồ sơ dự án" : "Project file"}</div>
        <div className="mt-1">{resolveLocale(project.name, isVi)}</div></div>}>
      <div className="bp-spec mb-6">{resolveLocale(project.organization, isVi)} — {resolveLocale(project.year, isVi)}</div>
      <p className="leading-relaxed text-white/80">{resolveLocale(project.description, isVi)}</p>
      {project.architecture && (
        <div className="mt-8 border-t border-white/25 pt-6">
          <div className="bp-label mb-3">{isVi ? "Kiến trúc" : "Architecture"}</div>
          <p className="font-mono text-[13px] leading-relaxed text-white/70">{resolveLocale(project.architecture, isVi)}</p>
        </div>
      )}
      <div className="mt-8 border-t border-white/25 pt-6">
        <div className="bp-label mb-4">{isVi ? "Vấn đề & Giải pháp" : "Challenges"}</div>
        <ul className="space-y-3">
          {resolveLocaleArray(project.challengesSolved, isVi).map((c: string, i: number) => (
            <li key={i} className="flex gap-3 text-[14px] text-white/80">
              <span className="font-mono text-[#ffb000]">{String(i+1).padStart(2,"0")}</span>{c}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 border-t border-white/25 pt-6">
        <div className="bp-label mb-4">{isVi ? "Vật liệu" : "Stack"}</div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t, i) => <span key={i} className="bp-tag">{t}</span>)}
        </div>
      </div>
    </GlassModal>
  );
}
