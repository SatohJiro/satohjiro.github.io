"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { projectsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { ProjectItem } from "@/types";
import { Y2kHeading } from "./Y2k";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

export function ProjectsSection() {
  const { isVi } = useLanguage();
  const [f, setF] = useState("all");
  const [active, setActive] = useState<ProjectItem | null>(null);
  const cats = [
    { id: "all", en: "All", vi: "Tất cả" },
    { id: "web", en: "Web", vi: "Web" },
    { id: "ai", en: "AI", vi: "AI" },
    { id: "academic", en: "Academic", vi: "Học thuật" },
  ];
  const list = projectsData.filter((p) => f === "all" || p.category === f);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Y2kHeading kicker={isVi ? "Chương 03" : "Level 03"} title={isVi ? "Bộ sưu tập" : "Gallery"}
        sub={isVi ? "Những viên ngọc lấp lánh nhất trong rương đồ." : "The shiniest gems in the inventory."} />

      <div className="mb-10 flex justify-center gap-2">
        {cats.map((c) => (
          <button key={c.id}
            onClick={() => { setF(c.id); telemetry.track("click", `filter_projects_${c.id}`); }}
            className={`y2k-chip cursor-pointer !px-5 !py-2.5 !text-[12px] !uppercase !tracking-[0.12em] transition-all ${
              f === c.id ? "!bg-[#b8f135] !text-[#041c30] !border-transparent" : "hover:!bg-white/20"
            }`}>
            {isVi ? c.vi : c.en}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <article key={p.id}
            onClick={() => { setActive(p); telemetry.track("click", `view_project_modal_${p.id}`); }}
            className="y2k-glass group cursor-pointer p-7 transition-transform hover:-translate-y-1.5">
            <div className="flex items-center justify-between">
              <span className="y2k-label !text-[10px]">{resolveLocale(p.year, isVi)}</span>
              <ArrowUpRight className="h-5 w-5 text-[#7ce7f4] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <h3 className="mt-4 text-xl font-extrabold leading-snug">{resolveLocale(p.name, isVi)}</h3>
            <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.14em] text-[#7ce7f4]/80">
              {resolveLocale(p.organization, isVi)}
            </p>
            <p className="mt-3 line-clamp-3 text-[14px] text-white/65">{resolveLocale(p.description, isVi)}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.technologies.slice(0, 4).map((t, i) => <span key={i} className="y2k-chip !text-[10px]">{t}</span>)}
            </div>
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                onClick={(e) => { e.stopPropagation(); telemetry.track("click", `project_github_${p.id}`); }}
                className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white/60 hover:text-[#b8f135]">
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
            )}
          </article>
        ))}
      </div>
      <ProjectDetailModal project={active} isOpen={!!active} onClose={() => setActive(null)} isVi={isVi} />
    </section>
  );
}
