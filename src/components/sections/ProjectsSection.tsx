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
  const [f, setF] = useState("all");
  const [active, setActive] = useState<ProjectItem | null>(null);
  const cats = [{ id: "all", en: "All", vi: "Tất cả" }, { id: "web", en: "Web", vi: "Web" }, { id: "ai", en: "AI", vi: "AI" }, { id: "academic", en: "Academic", vi: "Học thuật" }];
  const list = projectsData.filter((p) => f === "all" || p.category === f);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader index="03" label={isVi ? "Dự án" : "Projects"}
        title={isVi ? "Công trình" : "Works"}
        desc={isVi ? "AI · Web production · Thuật toán." : "AI · Production web · Algorithms."} />

      <div className="mb-8 flex gap-2">
        {cats.map((c) => (
          <button key={c.id} onClick={() => { setF(c.id); telemetry.track("click", `filter_projects_${c.id}`); }}
            className={`bp-tag cursor-pointer !px-4 !py-2 ${f === c.id ? "!border-[#ffb000] !text-[#ffb000]" : "hover:text-white"}`}>
            {isVi ? c.vi : c.en}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <article key={p.id} className="bp-panel bp-corners flex cursor-pointer flex-col p-6 transition-colors hover:!border-[#ffb000]"
            onClick={() => { setActive(p); telemetry.track("click", `view_project_modal_${p.id}`); }}>
            <div className="flex justify-between">
              <span className="bp-label bp-label-accent">PRJ.{String(i+1).padStart(3,"0")}</span>
              <span className="bp-spec">{resolveLocale(p.year, isVi)}</span>
            </div>
            <h3 className="mt-3 text-xl font-extrabold leading-tight">{resolveLocale(p.name, isVi)}</h3>
            <p className="bp-spec mt-1">{resolveLocale(p.organization, isVi)}</p>
            <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-white/70">{resolveLocale(p.description, isVi)}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.technologies.slice(0, 4).map((t, j) => <span key={j} className="bp-tag">{t}</span>)}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
              <span className="bp-label flex items-center gap-1 hover:text-[#ffb000]">{isVi ? "Xem chi tiết" : "Details"} <ArrowUpRight className="h-3.5 w-3.5" /></span>
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  onClick={(e) => e.stopPropagation()} className="text-white/60 hover:text-[#ffb000]">
                  <GithubIcon className="h-4 w-4" />
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
