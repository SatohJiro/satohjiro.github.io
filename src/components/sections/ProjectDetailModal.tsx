"use client";

import React from "react";
import { ProjectItem } from "@/types";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { Modal } from "../editorial/Modal";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../icons/BrandIcons";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  isVi: boolean;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ed-muted)]">
      {children}
    </div>
  );
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  isVi,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      closeLabel={isVi ? "Đóng" : "Close"}
      title={
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {isVi ? "Kiến trúc & Chi tiết kỹ thuật" : "Architecture & Technical Deep-Dive"}
          </div>
          <div className="mt-1.5 font-display text-xl font-bold tracking-tight text-[var(--ed-ink)] sm:text-2xl">
            {resolveLocale(project.name, isVi)}
          </div>
        </div>
      }
    >
      <div className="space-y-7">
        {/* Organization & badge */}
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--ed-hairline)] pb-4">
          <div>
            <SectionLabel>{isVi ? "Đơn vị / Bối cảnh" : "Organization / Context"}</SectionLabel>
            <div className="mt-1 text-sm font-bold text-[var(--ed-ink)]">
              {resolveLocale(project.organization, isVi)}
              <span className="ml-2 font-mono text-xs font-normal text-[var(--ed-muted)]">
                {resolveLocale(project.year, isVi)}
              </span>
            </div>
          </div>
          {project.badge && (
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              {resolveLocale(project.badge, isVi)}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2.5">
          <SectionLabel>{isVi ? "Mô tả & Mục tiêu" : "Summary & Mission"}</SectionLabel>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--ed-muted)]">
            {resolveLocale(project.description, isVi)}
          </p>
        </div>

        {/* Architecture */}
        {project.architecture && (
          <div className="space-y-2.5">
            <SectionLabel>{isVi ? "Kiến trúc hệ thống" : "System Architecture"}</SectionLabel>
            <div className="border border-[var(--ed-hairline)] bg-blue-500/[0.04] px-4 py-3.5 font-mono text-xs leading-relaxed text-[var(--ed-ink)]">
              {resolveLocale(project.architecture, isVi)}
            </div>
          </div>
        )}

        {/* Challenges & solutions */}
        <div className="space-y-2.5">
          <SectionLabel>{isVi ? "Vấn đề & Giải pháp kỹ thuật" : "Technical Challenges & Solutions"}</SectionLabel>
          <ul className="max-w-3xl space-y-2">
            {resolveLocaleArray(project.challengesSolved, isVi).map((c: string, idx: number) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--ed-ink)]/85"
              >
                <span className="mt-0.5 font-mono text-xs text-blue-600 dark:text-blue-400">▸</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="space-y-2.5">
          <SectionLabel>{isVi ? "Công nghệ sử dụng" : "Technologies Used"}</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t, idx) => (
              <span
                key={idx}
                className="rounded-md border border-[var(--ed-hairline)] px-2 py-0.5 font-mono text-[11px] text-[var(--ed-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap gap-3 border-t border-[var(--ed-hairline)] pt-5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--ed-ink)] px-5 py-2.5 text-sm font-semibold text-[var(--ed-paper)] transition-transform hover:-translate-y-0.5"
              >
                <ExternalLink className="h-4 w-4" />
                {isVi ? "Xem trang thực tế" : "Visit live site"}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--ed-hairline)] px-5 py-2.5 text-sm font-semibold text-[var(--ed-ink)] transition-colors hover:border-blue-500/60"
              >
                <GithubIcon className="h-4 w-4" />
                {isVi ? "Mã nguồn" : "Source code"}
              </a>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
