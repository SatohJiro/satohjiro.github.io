"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { resolveLocale } from "@/lib/locale";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { GlassButton } from "../glass/GlassButton";
import { telemetry } from "@/lib/telemetry";

interface FooterProps {
  onOpenPrivacyDrawer: () => void;
  onOpenResumeModal: () => void;
}

export function Footer({ onOpenPrivacyDrawer, onOpenResumeModal }: FooterProps) {
  const { isVi } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: siteConfig.links.github, label: "GitHub", icon: <GithubIcon className="h-4 w-4" />, track: "footer_github" },
    { href: siteConfig.links.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="h-4 w-4" />, track: "footer_linkedin" },
    { href: siteConfig.links.email, label: "Email", icon: <Mail className="h-4 w-4" />, track: "footer_email" },
    { href: siteConfig.links.phone, label: "Phone", icon: <Phone className="h-4 w-4" />, track: "footer_phone" },
  ];

  return (
    <footer className="relative z-10 mt-24 border-t border-white/[0.06] bg-[#08090a]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 border-b border-white/[0.06] pb-10 md:grid-cols-4">
          {/* Identity */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5e6ad2] font-mono text-[11px] font-bold tracking-wider text-white">
                NTA
              </div>
              <div>
                <div className="text-[15px] font-semibold tracking-tight text-white">
                  {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
                </div>
                <div className="text-xs text-[#8a8f98]">
                  {isVi ? "Kỹ sư Phần mềm · Thủ khoa ĐH Nông Lâm" : "Software Engineer · Valedictorian"}
                </div>
              </div>
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-[#8a8f98]">
              {isVi
                ? "Xây dựng web app chất lượng cao với Next.js, React, Vue.js, Spring Boot, FastAPI và AI."
                : "Building high-quality web applications with Next.js, React, Vue.js, Spring Boot, FastAPI, and AI."}
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => telemetry.track("click", s.track)}
                  aria-label={s.label}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5 text-[#8a8f98] transition-colors hover:border-white/[0.16] hover:text-white cursor-pointer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <div className="sleek-eyebrow">{isVi ? "Điều hướng" : "Navigate"}</div>
            <ul className="space-y-2 text-[13px]">
              {siteConfig.navItems.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-[#8a8f98] transition-colors hover:text-white"
                  >
                    {resolveLocale(item.label, isVi)}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenResumeModal}
                  className="font-medium text-[#8f99e8] transition-colors hover:text-white cursor-pointer"
                >
                  {isVi ? "Xem CV Online" : "Online Resume"}
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy */}
          <div className="space-y-3">
            <div className="sleek-eyebrow flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" />
              <span>{isVi ? "Riêng tư" : "Privacy"}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-[#8a8f98]">
              {isVi
                ? "Không cookie bên thứ 3, không log IP, không lưu dữ liệu cá nhân."
                : "No third-party cookies, no IP logging, zero personal data stored."}
            </p>
            <GlassButton onClick={onOpenPrivacyDrawer} size="sm" variant="glass" className="text-xs">
              {isVi ? "Xem Telemetry" : "View Telemetry"}
            </GlassButton>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-[#5a5f68] sm:flex-row">
          <div>© {currentYear} Nguyen Tran Anh (SatohJiro). All rights reserved.</div>
          <div className="font-mono">v2.0 — dark sleek</div>
        </div>
      </div>
    </footer>
  );
}
