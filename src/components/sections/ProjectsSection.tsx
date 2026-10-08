"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { projectsData } from "@/data/portfolio-content";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { ProjectItem } from "@/types";
import { Chapter } from "./Chapter";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ArrowRight } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function ProjectsSection() {
  const { isVi } = useLanguage();
  const [active, setActive] = useState<ProjectItem | null>(null);

  return (
    <section id="projects">
      <Chapter no={isVi ? "Chương ba — Tác phẩm" : "Chapter Three — Works"}
        title={isVi ? "Tuyển tập" : "Selected Works"} wide>
        <div className="grid gap-px bg-[#e3ddd0] sm:grid-cols-2">
          {projectsData.map((p, i) => (
            <article key={p.id}
              onClick={() => { setActive(p); telemetry.track("click", `view_project_modal_${p.id}`); }}
              className="group cursor-pointer bg-[#faf7f0] p-8 transition-colors hover:bg-white">
              <div className="flex items-baseline justify-between">
                <span className="mono-caption">№ {String(i+1).padStart(2,"0")}</span>
                <span className="mono-caption">{resolveLocale(p.year, isVi)}</span>
              </div>
              <h3 className="mono-title mt-4 text-[1.7rem] leading-tight group-hover:text-[#1e4d3b]">
                {resolveLocale(p.name, isVi)}
              </h3>
              <p className="mono-caption mt-2">{resolveLocale(p.organization, isVi)}</p>
              <p className="mt-4 line-clamp-3 text-[14px] leading-relaxed text-[#1c1a16]/70">
                {resolveLocale(p.description, isVi)}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-[#e3ddd0] pt-4">
                <span className="mono-caption">{p.technologies.slice(0, 3).join(" · ")}</span>
                <ArrowRight className="h-4 w-4 text-[#1e4d3b] transition-transform group-hover:translate-x-1" />
              </div>
              <div className="mono-caption mt-4 opacity-0 transition-opacity group-hover:opacity-100">
                {resolveLocaleArray(p.highlights, isVi)[0]}
              </div>
            </article>
          ))}
        </div>
      </Chapter>
      <ProjectDetailModal project={active} isOpen={!!active} onClose={() => setActive(null)} isVi={isVi} />
    </section>
  );
}
