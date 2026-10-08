"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { projectsData } from "@/data/portfolio-content";
import { resolveLocale, resolveLocaleArray } from "@/lib/locale";
import { ProjectItem } from "@/types";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";
import { GlassButton } from "../glass/GlassButton";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

export function ProjectsSection() {
 const { isVi } = useLanguage();
 const [filter, setFilter] = useState<string>("all");
 const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

 const categories = [
 { id: "all", label: { en: "All Projects", vi: "Tất Cả Dự Án" } },
 { id: "web", label: { en: "Web Platforms", vi: "Dự Án Web" } },
 { id: "ai", label: { en: "AI Tools", vi: "Ứng Dụng AI" } },
 { id: "academic", label: { en: "Academic & Algorithms", vi: "Học Thuật & Thuật Toán" } },
 ];

 const filteredProjects = projectsData.filter((proj) => {
 if (filter === "all") return true;
 return proj.category === filter;
 });

 const handleFilterChange = (id: string) => {
 setFilter(id);
 telemetry.track("click", `filter_projects_${id}`);
 };

 const handleOpenProjectModal = (project: ProjectItem) => {
 setActiveModalProject(project);
 telemetry.track("click", `view_project_modal_${project.id}`, { name: project.name.en });
 };

 return (
 <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
 <div className="max-w-7xl mx-auto space-y-12">
 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto space-y-3">
 <span className="play-eyebrow play-eyebrow-yellow">{isVi ? "Dự án" : "Projects"}</span>
 <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e1e2a] tracking-tight">
 {isVi ? (
 <>
 Dự Án Tiêu Biểu & <span className="play-underline">Sản Phẩm Đã Làm</span>
 </>
 ) : (
 <>
 Featured Works & <span className="play-underline">Projects Delivered</span>
 </>
 )}
 </h2>
 <p className="text-sm sm:text-base text-[#55555f]">
 {isVi
 ? "Tổng hợp các dự án thực tế từ sản phẩm ứng dụng AI đến các nền tảng web và phần mềm học thuật."
 : "Curated collection of production web platforms, AI tools, and algorithm research projects."}
 </p>
 </div>

 {/* Filter Tabs */}
 <div className="flex flex-wrap items-center justify-center gap-2">
 {categories.map((cat) => {
 const isSelected = filter === cat.id;
 return (
 <button
 key={cat.id}
 onClick={() => handleFilterChange(cat.id)}
 className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
 isSelected
 ? "bg-[#1e1e2a] text-white border-2 border-[#1e1e2a] shadow-[3px_3px_0_0_rgba(30,30,42,0.2)]"
 : "bg-white border-2 border-[#1e1e2a]/12 text-[#6e6e7e] hover:border-[#1e1e2a]/30 hover:text-[#1e1e2a]"
 }`}
 >
 {cat.label[isVi ? "vi" : "en"]}
 </button>
 );
 })}
 </div>

 {/* Projects Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {filteredProjects.map((project, pIdx) => {
 const accents = ["#ff5ca8", "#4d7cfe", "#ffb627", "#2ecc71", "#8b5cf6", "#ff7a45"];
 const accent = accents[pIdx % accents.length];
 return (
 <GlassCard
 key={project.id}
 className="flex flex-col justify-between p-6 space-y-5 border-[#1e1e2a]/10 bg-white"
 glowColor="none"
 >
 <div className="space-y-4">
 {/* Top: colored bar + year & badge */}
 <div className="flex items-center justify-between gap-2">
 <div className="flex items-center gap-2">
 <span className="h-2.5 w-8 rounded-full" style={{ backgroundColor: accent }} />
 <span className="text-xs font-mono font-bold text-[#6e6e7e]">
 {resolveLocale(project.year, isVi)}
 </span>
 </div>
 {project.badge && (
 <GlassBadge variant="blue" size="sm">
 {resolveLocale(project.badge, isVi)}
 </GlassBadge>
 )}
 </div>

 {/* Project Title */}
 <div>
 <h3 className="text-base sm:text-lg font-bold text-[#1e1e2a] hover:text-[#2b4fc4] transition-colors">
 {resolveLocale(project.name, isVi)}
 </h3>
 <div className="text-xs text-[#55555f] mt-1 font-medium">
 {resolveLocale(project.organization, isVi)}
 </div>
 </div>

 {/* Description */}
 <p className="text-xs text-[#3f3f4c] leading-relaxed line-clamp-3">
 {resolveLocale(project.description, isVi)}
 </p>

 {/* Highlights preview */}
 <div className="space-y-1.5 pt-1">
 {resolveLocaleArray(project.highlights, isVi).slice(0, 2).map((h: string, hIdx: number) => (
 <div key={hIdx} className="flex items-start gap-2 text-xs text-[#3f3f4c]">
 <span className="font-mono text-[#157a3d] font-bold shrink-0 mt-0.5">—</span>
 <span className="line-clamp-1">{h}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Footer: Tech Stack & Actions */}
 <div className="space-y-4 pt-4 border-t border-[#1e1e2a]/10">
 {/* Tech Pills */}
 <div className="flex flex-wrap gap-1">
 {project.technologies.slice(0, 4).map((tech, tIdx) => (
 <span
 key={tIdx}
 className="text-[10px] px-2 py-0.5 rounded-md bg-[#1e1e2a]/[.04] border border-[#1e1e2a]/10 text-[#1e1e2a] font-mono font-medium"
 >
 {tech}
 </span>
 ))}
 {project.technologies.length > 4 && (
 <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#1e1e2a]/[.04] border border-[#1e1e2a]/10 text-[#55555f] font-mono font-medium">
 +{project.technologies.length - 4}
 </span>
 )}
 </div>

 {/* Buttons */}
 <div className="flex items-center justify-between gap-2 pt-1">
 <GlassButton
 onClick={() => handleOpenProjectModal(project)}
 size="sm"
 variant="outline"
 className="w-full text-xs font-semibold text-[#1e1e2a]"
 >
 {isVi ? "Chi tiết Dự án" : "Details & Architecture"}
 </GlassButton>

 {project.githubUrl && (
 <a
 href={project.githubUrl}
 target="_blank"
 rel="noopener noreferrer"
 onClick={() => telemetry.track("click", `project_github_${project.id}`)}
 className="p-2 rounded-xl border border-[#1e1e2a]/10 bg-[#fffdf8] text-[#3f3f4c] hover:border-[#2b4fc4]/50 transition-all shrink-0 cursor-pointer shadow-xs"
 aria-label="GitHub Repository"
 >
 <GithubIcon className="w-4 h-4" />
 </a>
 )}

 {project.liveUrl && (
 <a
 href={project.liveUrl}
 target="_blank"
 rel="noopener noreferrer"
 onClick={() => telemetry.track("click", `project_live_${project.id}`)}
 className="p-2 rounded-xl border border-[#1e1e2a]/10 bg-[#fffdf8] text-[#3f3f4c] hover:border-[#157a3d]/50 transition-all shrink-0 cursor-pointer shadow-xs"
 aria-label="Live Demo Link"
 >
 <ExternalLink className="w-4 h-4" />
 </a>
 )}
 </div>
 </div>
 </GlassCard>
 );
 })}
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

