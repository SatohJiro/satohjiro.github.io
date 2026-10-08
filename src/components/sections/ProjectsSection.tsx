"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { projectsData } from "@/data/portfolio-content";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { ProjectItem } from "@/types";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ChapterHeader } from "../editorial/ChapterHeader";
import { Reveal } from "../editorial/Reveal";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

/* ---------- Generative covers for the academic projects (honest SVG art) ---------- */

function SudokuCover() {
  const cells: Array<[number, number, string]> = [
    [0, 0, "5"], [3, 1, "8"], [6, 0, "2"],
    [1, 3, "7"], [4, 4, "3"], [7, 3, "9"],
    [2, 6, "1"], [5, 7, "6"], [8, 8, "4"],
  ];
  const filled = new Set(["3,1", "4,4", "7,3", "1,3"]);
  return (
    <svg viewBox="0 0 400 225" className="h-full w-full" role="img" aria-label="Sudoku grid artwork">
      <rect width="400" height="225" fill="#0b0f1a" />
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => {
          const key = `${c},${r}`;
          const num = cells.find(([x, y]) => x === c && y === r)?.[2];
          const x = 62 + c * 30;
          const y = 8 + r * 23.4;
          return (
            <g key={key}>
              {filled.has(key) && <rect x={x} y={y} width="30" height="23.4" fill="#1d4ed8" opacity="0.55" />}
              <rect x={x} y={y} width="30" height="23.4" fill="none" stroke="#334155" strokeWidth={c % 3 === 0 || r % 3 === 0 ? 1.6 : 0.7} opacity="0.9" />
              {num && (
                <text x={x + 15} y={y + 17} textAnchor="middle" fontSize="13" fill={filled.has(key) ? "#fff" : "#7dd3fc"} fontFamily="monospace">
                  {num}
                </text>
              )}
            </g>
          );
        })
      )}
      <circle cx="352" cy="190" r="26" fill="#10b981" opacity="0.14" />
      <circle cx="40" cy="200" r="16" fill="#3b82f6" opacity="0.2" />
    </svg>
  );
}

function GraphCover() {
  const nodes: Array<[number, number]> = [
    [60, 60], [150, 40], [250, 55], [340, 45],
    [100, 130], [200, 120], [300, 135],
    [80, 190], [190, 185], [290, 190],
  ];
  const edges: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 6],
    [4, 5], [5, 6], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9], [7, 8], [8, 9],
  ];
  return (
    <svg viewBox="0 0 400 225" className="h-full w-full" role="img" aria-label="Graph theory artwork">
      <rect width="400" height="225" fill="#0b0f1a" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#3b82f6" strokeWidth="1.4" opacity="0.55"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="#0b0f1a" stroke="#60a5fa" strokeWidth="2" />
          <circle cx={x} cy={y} r="3" fill={i % 3 === 0 ? "#10b981" : "#60a5fa"} />
          <text x={x} y={y - 14} textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">
            {`v${i}`}
          </text>
        </g>
      ))}
      <path d="M60 60 L150 40 L250 55 L340 45" fill="none" stroke="#10b981" strokeWidth="2.5" opacity="0.8" strokeDasharray="6 4" />
    </svg>
  );
}

function ProjectCover({ project }: { project: ProjectItem }) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    );
  }
  return project.id === "genetic-sudoku-solver" ? <SudokuCover /> : <GraphCover />;
}

function CoverMeta({ project, isVi }: { project: ProjectItem; isVi: boolean }) {
  return (
    <>
      <span className="absolute left-4 top-4 rounded-md bg-black/55 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
        {resolveLocale(project.year, isVi)}
      </span>
      <span className="absolute right-4 top-4 rounded-md bg-black/55 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-blue-300 backdrop-blur-sm">
        {project.category}
      </span>
    </>
  );
}

function TechPills({ techs, max = 5 }: { techs: string[]; max?: number }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {techs.slice(0, max).map((t) => (
        <span
          key={t}
          className="rounded-md border border-[var(--ed-hairline)] px-2 py-0.5 font-mono text-[11px] text-[var(--ed-muted)]"
        >
          {t}
        </span>
      ))}
      {techs.length > max && (
        <span className="rounded-md border border-[var(--ed-hairline)] px-2 py-0.5 font-mono text-[11px] text-[var(--ed-muted)]">
          +{techs.length - max}
        </span>
      )}
    </div>
  );
}

function CardActions({ project }: { project: ProjectItem }) {
  return (
    <div className="flex items-center gap-2 border-t border-[var(--ed-hairline)] px-5 py-3">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            telemetry.track("click", `project_github_${project.id}`);
          }}
          className="rounded-lg p-2 text-[var(--ed-muted)] transition-colors hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          aria-label="GitHub repository"
        >
          <GithubIcon className="h-4 w-4" />
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            telemetry.track("click", `project_live_${project.id}`);
          }}
          className="rounded-lg p-2 text-[var(--ed-muted)] transition-colors hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          aria-label="Live demo"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
      <span className="ml-auto font-mono text-[11px] uppercase tracking-widest text-[var(--ed-muted)]">
        {project.id}
      </span>
    </div>
  );
}

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

  const filtered = projectsData.filter((p) => filter === "all" || p.category === filter);
  const [featured, ...rest] = filtered;

  const openModal = (project: ProjectItem) => {
    setActiveModalProject(project);
    telemetry.track("click", `view_project_modal_${project.id}`, { name: project.name.en });
  };

  const detailsLabel = isVi ? "Chi tiết" : "Details";

  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <ChapterHeader id="projects" />
        </Reveal>

        {/* Filter index */}
        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[var(--ed-hairline)] pb-4">
            {categories.map((cat) => {
              const active = filter === cat.id;
              const count =
                cat.id === "all"
                  ? projectsData.length
                  : projectsData.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilter(cat.id);
                    telemetry.track("click", `filter_projects_${cat.id}`);
                  }}
                  className={`flex items-baseline gap-1.5 font-mono text-sm transition-colors cursor-pointer ${
                    active
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-[var(--ed-muted)] hover:text-[var(--ed-ink)]"
                  }`}
                  aria-pressed={active}
                >
                  <span className={active ? "underline decoration-2 underline-offset-8" : ""}>
                    {cat.label[isVi ? "vi" : "en"]}
                  </span>
                  <span className="text-[11px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Featured project — full-bleed editorial spread */}
        {featured && (
          <Reveal delay={100}>
            <article
              onClick={() => openModal(featured)}
              className="group mt-10 grid cursor-pointer border border-[var(--ed-hairline)] bg-[var(--ed-paper)] transition-colors hover:border-blue-500/40 lg:grid-cols-12"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[320px]">
                <ProjectCover project={featured} />
                <CoverMeta project={featured} isVi={isVi} />
              </div>
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
                <div>
                  <div className="font-mono text-xs text-[var(--ed-muted)]">
                    {resolveLocale(featured.organization, isVi)}
                  </div>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ed-ink)] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {resolveLocale(featured.name, isVi)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ed-muted)]">
                    {resolveLocale(featured.description, isVi)}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {resolveLocaleArray(featured.highlights, isVi)
                      .slice(0, 3)
                      .map((h: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--ed-ink)]/85">
                          <span className="font-mono text-blue-600 dark:text-blue-400">▸</span>
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="mt-6 space-y-4">
                  <TechPills techs={featured.technologies} />
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {detailsLabel}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* Standard cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i, 3) * 60}>
              <article
                onClick={() => openModal(project)}
                className="group flex h-full cursor-pointer flex-col border border-[var(--ed-hairline)] bg-[var(--ed-paper)] transition-colors hover:border-blue-500/40"
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--ed-hairline)]">
                  <ProjectCover project={project} />
                  <CoverMeta project={project} isVi={isVi} />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="font-mono text-xs text-[var(--ed-muted)]">
                    {resolveLocale(project.organization, isVi)}
                  </div>
                  <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-[var(--ed-ink)] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {resolveLocale(project.name, isVi)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ed-muted)] line-clamp-3">
                    {resolveLocale(project.description, isVi)}
                  </p>
                  <div className="mt-4">
                    <TechPills techs={project.technologies} max={4} />
                  </div>
                </div>
                <CardActions project={project} />
              </article>
            </Reveal>
          ))}
        </div>

        {/* Decoupled Project Detail Modal */}
        <ProjectDetailModal
          project={activeModalProject}
          isOpen={!!activeModalProject}
          onClose={() => setActiveModalProject(null)}
          isVi={isVi}
        />
      </div>
    </section>
  );
}
