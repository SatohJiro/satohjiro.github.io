"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { projectsData } from "@/data/portfolio-content";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { ProjectItem } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

export function ProjectsSection() {
  const { isVi } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: "all", label: { en: "All", vi: "Tất cả" } },
    { id: "web", label: { en: "Web", vi: "Web" } },
    { id: "ai", label: { en: "AI", vi: "AI" } },
    { id: "academic", label: { en: "Academic", vi: "Học thuật" } },
  ];

  const filteredProjects = projectsData.filter(
    (proj) => filter === "all" || proj.category === filter
  );

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader
        num="03"
        eyebrow={isVi ? "Dự án" : "Projects"}
        title={isVi ? "Việc đã làm" : "Selected Work"}
        desc={
          isVi
            ? "Từ sản phẩm AI đến nền tảng web production và nghiên cứu thuật toán."
            : "From AI products to production web platforms and algorithm research."
        }
      />

      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => {
          const isActive = filter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                telemetry.track("click", `filter_projects_${cat.id}`);
              }}
              className={`border-[3px] border-[#111] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.1em] cursor-pointer ${
                isActive ? "bg-[#111] text-white" : "bg-white hover:bg-[#ff3d00] hover:text-white"
              }`}
            >
              {cat.label[isVi ? "vi" : "en"]}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, i) => (
          <article key={project.id} className="brut-card brut-card-hover flex flex-col">
            <div className="flex items-center justify-between border-b-[3px] border-[#111] px-5 py-3">
              <span className="font-mono text-xs font-bold">
                {String(i + 1).padStart(2, "0")} / {resolveLocale(project.year, isVi)}
              </span>
              {project.badge && (
                <span className="brut-tag brut-tag-accent !text-[10px]">
                  {resolveLocale(project.badge, isVi)}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="font-display text-xl font-black uppercase leading-tight">
                {resolveLocale(project.name, isVi)}
              </h3>
              <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#111]/55">
                {resolveLocale(project.organization, isVi)}
              </div>
              <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-[#111]/75">
                {resolveLocale(project.description, isVi)}
              </p>

              <ul className="mt-4 space-y-1.5">
                {resolveLocaleArray(project.highlights, isVi)
                  .slice(0, 2)
                  .map((h: string, hi: number) => (
                    <li key={hi} className="flex gap-2 text-[13px] font-bold">
                      <span className="text-[#ff3d00]">▸</span>
                      <span className="line-clamp-1">{h}</span>
                    </li>
                  ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((t, ti) => (
                  <span key={ti} className="brut-tag !text-[10px] !py-1">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 border-t-[3px] border-[#111] pt-4">
                <button
                  onClick={() => {
                    setActiveModalProject(project);
                    telemetry.track("click", `view_project_modal_${project.id}`);
                  }}
                  className="flex flex-1 items-center justify-center gap-1 border-[3px] border-[#111] bg-[#111] px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-white cursor-pointer hover:bg-[#ff3d00]"
                >
                  {isVi ? "Chi tiết" : "Details"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="border-[3px] border-[#111] bg-white p-2 cursor-pointer hover:bg-[#ff3d00] hover:text-white"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live demo"
                    className="border-[3px] border-[#111] bg-white p-2 cursor-pointer hover:bg-[#ff3d00] hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <ProjectDetailModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
        isVi={isVi}
      />
    </section>
  );
}
