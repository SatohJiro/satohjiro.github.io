"use client";
import React from "react";
import { ProjectItem } from "@/types";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { GlassModal } from "../glass/GlassModal";
import { DecoDiamond } from "./Deco";

export function ProjectDetailModal({ project, isOpen, onClose, isVi }: {
  project: ProjectItem | null; isOpen: boolean; onClose: () => void; isVi: boolean;
}) {
  if (!project) return null;
  return (
    <GlassModal isOpen={isOpen} onClose={onClose} maxWidth="xl"
      title={<div><p className="deco-label !text-[10px]">{isVi ? "Hồ sơ tác phẩm" : "Work dossier"}</p>
        <div className="mt-2">{resolveLocale(project.name, isVi)}</div></div>}>
      <p className="text-center text-[12px] uppercase tracking-[0.2em] text-[#f3ecdc]/50">
        {resolveLocale(project.organization, isVi)} — {resolveLocale(project.year, isVi)}
      </p>
      <div className="deco-divider my-6"><span>◆</span></div>
      <p className="text-center font-light leading-[1.9] text-[#f3ecdc]/75">{resolveLocale(project.description, isVi)}</p>
      {project.architecture && (
        <p className="mx-auto mt-8 max-w-2xl border border-[#c9a227]/30 p-5 font-mono text-[12px] leading-relaxed text-[#f3ecdc]/60">
          {resolveLocale(project.architecture, isVi)}
        </p>
      )}
      <div className="mt-8">
        <p className="deco-label mb-5 text-center !text-[10px]">{isVi ? "Thử thách" : "Trials"}</p>
        <ul className="mx-auto max-w-2xl space-y-3">
          {resolveLocaleArray(project.challengesSolved, isVi).map((c: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-[14px] font-light text-[#f3ecdc]/75">
              <DecoDiamond className="mt-1.5" /> {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {project.technologies.map((t, i) => <span key={i} className="deco-tag">{t}</span>)}
      </div>
    </GlassModal>
  );
}
