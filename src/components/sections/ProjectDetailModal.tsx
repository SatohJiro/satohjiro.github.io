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
      title={<div><span className="y2k-chip !text-[10px]">{isVi ? "Hồ sơ" : "Dossier"}</span>
        <div className="mt-2">{resolveLocale(project.name, isVi)}</div></div>}>
      <p className="y2k-label text-center !text-[10px]">
        {resolveLocale(project.organization, isVi)} · {resolveLocale(project.year, isVi)}
      </p>
      <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-white/75">
        {resolveLocale(project.description, isVi)}
      </p>
      {project.architecture && (
        <p className="mx-auto mt-7 max-w-2xl rounded-3xl bg-white/5 p-5 font-mono text-[12px] leading-relaxed text-white/65 backdrop-blur-sm">
          {resolveLocale(project.architecture, isVi)}
        </p>
      )}
      <div className="mt-8">
        <p className="y2k-label mb-4 text-center !text-[10px]">{isVi ? "Thử thách đã vượt" : "Bosses beaten"}</p>
        <ul className="mx-auto max-w-2xl space-y-2.5">
          {resolveLocaleArray(project.challengesSolved, isVi).map((c: string, i: number) => (
            <li key={i} className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3 text-[14px] text-white/80">
              <span className="y2k-chip !px-2 !py-0.5 shrink-0 !text-[10px]">{i + 1}</span> {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {project.technologies.map((t, i) => <span key={i} className="y2k-chip !text-[10px]">{t}</span>)}
      </div>
    </GlassModal>
  );
}
