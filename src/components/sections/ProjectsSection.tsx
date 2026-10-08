"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { projectsData } from "@/data/portfolio-content";
import { resolveLocale } from "@/lib/locale";
import { ProjectItem } from "@/types";
import { DecoHeading } from "./Deco";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { telemetry } from "@/lib/telemetry";

export function ProjectsSection() {
  const { isVi } = useLanguage();
  const [active, setActive] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <DecoHeading kicker={isVi ? "Hồi ba" : "Act Three"} title={isVi ? "Tác phẩm" : "The Works"}
        sub={isVi ? "Tuyển tập những công trình đáng tự hào nhất." : "A selection of works most worthy of pride."} />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((p, i) => (
          <article key={p.id}
            onClick={() => { setActive(p); telemetry.track("click", `view_project_modal_${p.id}`); }}
            className="deco-card group cursor-pointer p-8">
            <div className="flex items-center justify-between">
              <span className="deco-num text-sm">№ {String(i+1).padStart(2,"0")}</span>
              <span className="font-mono text-[11px] text-[#f3ecdc]/40">{resolveLocale(p.year, isVi)}</span>
            </div>
            <div className="my-5 h-px bg-gradient-to-r from-transparent via-[#c9a227]/60 to-transparent" />
            <h3 className="deco-title text-xl uppercase leading-snug group-hover:text-[#e8c96a]">
              {resolveLocale(p.name, isVi)}
            </h3>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#f3ecdc]/45">{resolveLocale(p.organization, isVi)}</p>
            <p className="mt-4 line-clamp-3 text-[14px] font-light leading-relaxed text-[#f3ecdc]/60">
              {resolveLocale(p.description, isVi)}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.technologies.slice(0, 3).map((t, j) => <span key={j} className="deco-tag">{t}</span>)}
            </div>
          </article>
        ))}
      </div>
      <ProjectDetailModal project={active} isOpen={!!active} onClose={() => setActive(null)} isVi={isVi} />
    </section>
  );
}
