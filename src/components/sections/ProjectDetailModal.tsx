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
      title={<div><p className="mono-chapter">{isVi ? "Hồ sơ tác phẩm" : "Work dossier"}</p>
        <div className="mt-2">{resolveLocale(project.name, isVi)}</div></div>}>
      <p className="mono-caption mb-6">{resolveLocale(project.organization, isVi)} — {resolveLocale(project.year, isVi)}</p>
      <p className="leading-[1.8] text-[#1c1a16]/80">{resolveLocale(project.description, isVi)}</p>
      {project.architecture && (
        <div className="mt-8">
          <p className="mono-chapter mb-3">{isVi ? "Cấu trúc" : "Structure"}</p>
          <p className="border-l-2 border-[#1e4d3b] pl-4 font-mono text-[13px] leading-relaxed text-[#1c1a16]/70">
            {resolveLocale(project.architecture, isVi)}
          </p>
        </div>
      )}
      <div className="mt-8">
        <p className="mono-chapter mb-4">{isVi ? "Thử thách" : "Trials"}</p>
        <ul className="space-y-3">
          {resolveLocaleArray(project.challengesSolved, isVi).map((c: string, i: number) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
              <span className="mono-caption mt-1">§{i+1}</span>{c}
            </li>
          ))}
        </ul>
      </div>
      <p className="mono-caption mt-8 border-t border-[#e3ddd0] pt-4">
        {project.technologies.join(" · ")}
      </p>
    </GlassModal>
  );
}
