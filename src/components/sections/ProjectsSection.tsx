"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { projectsData } from "@/data/portfolio-content";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { ProjectItem } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

export function ProjectsSection() {
  const { isVi } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<ProjectItem | null>(null);

  const cats = [
    { id: "all", en: "All", vi: "Tất cả" },
    { id: "web", en: "Web", vi: "Web" },
    { id: "ai", en: "AI", vi: "AI" },
    { id: "academic", en: "Academic", vi: "Học thuật" },
  ];
  const list = projectsData.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeader
        index="03"
        label={isVi ? "Dự án" : "Projects"}
        title={isVi ? "Việc đã làm" : "Selected Work"}
        desc={
          isVi
            ? "Sản phẩm AI, nền tảng web production, nghiên cứu thuật toán."
            : "AI products, production web platforms, algorithm research."
        }
      />

      <div className="mb-10 flex gap-6 border-b-2 border-[#0a0a0a]">
        {cats.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setFilter(c.id);
              telemetry.track("click", `filter_projects_${c.id}`);
            }}
            className={`swiss-label border-b-2 pb-3 -mb-[2px] cursor-pointer transition-colors ${
              filter === c.id
                ? "border-[#e30613] text-[#e30613]"
                : "border-transparent hover:text-[#0a0a0a]"
            }`}
          >
            {isVi ? c.vi : c.en}
          </button>
        ))}
      </div>

      <div className="border-t-2 border-[#0a0a0a]">
        {list.map((project, i) => (
          <article
            key={project.id}
            className="group grid cursor-pointer gap-6 border-b border-[#e2e2e2] py-8 transition-colors hover:bg-white lg:grid-cols-12"
            onClick={() => {
              setActive(project);
              telemetry.track("click", `view_project_modal_${project.id}`);
            }}
          >
            <div className="lg:col-span-1">
              <span className="swiss-index text-xl">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-extrabold tracking-tight group-hover:text-[#e30613] sm:text-3xl">
                  {resolveLocale(project.name, isVi)}
                </h3>
                <ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100 text-[#e30613]" />
              </div>
              <p className="swiss-label mt-2">
                {resolveLocale(project.organization, isVi)} — {resolveLocale(project.year, isVi)}
              </p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#3d3d3d]">
                {resolveLocale(project.description, isVi)}
              </p>
            </div>
            <div className="lg:col-span-4">
              <ul className="space-y-1.5">
                {resolveLocaleArray(project.highlights, isVi).slice(0, 2).map((h: string, hi: number) => (
                  <li key={hi} className="text-[13px] font-semibold">→ {h}</li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((t, ti) => (
                  <span key={ti} className="swiss-tag">{t}</span>
                ))}
              </div>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    telemetry.track("click", `project_github_${project.id}`);
                  }}
                  aria-label="GitHub"
                  className="swiss-label mt-4 inline-flex items-center gap-1.5 hover:text-[#e30613]"
                >
                  <GithubIcon className="h-3.5 w-3.5" /> GitHub
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <ProjectDetailModal project={active} isOpen={!!active} onClose={() => setActive(null)} isVi={isVi} />
    </section>
  );
}
