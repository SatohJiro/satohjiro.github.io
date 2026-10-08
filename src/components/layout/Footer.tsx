"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { resolveLocale } from "@/lib/locale";
import { Mail, Phone, ShieldCheck, PartyPopper } from "lucide-react";
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
    <footer className="relative z-10 mt-24">
      {/* Wavy top divider */}
      <svg viewBox="0 0 1440 48" className="block w-full text-[#1e1e2a]" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,32 C240,48 480,0 720,16 C960,32 1200,48 1440,24 L1440,48 L0,48 Z"
          fill="currentColor"
        />
      </svg>
      <div className="bg-[#1e1e2a] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-4">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="play-sticker items-center justify-center rounded-2xl bg-[#ffb627] px-2.5 py-1.5 font-display text-sm font-extrabold text-[#1e1e2a]">
                  NTA
                </div>
                <div>
                  <div className="font-display text-[15px] font-bold tracking-tight">
                    {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
                  </div>
                  <div className="text-xs text-white/60">
                    {isVi ? "Kỹ sư Phần mềm · Thủ khoa ĐH Nông Lâm" : "Software Engineer · Valedictorian"}
                  </div>
                </div>
              </div>
              <p className="max-w-md text-[13px] leading-relaxed font-medium text-white/60">
                {isVi
                  ? "Xây dựng web app vui vẻ, nhanh và chất lượng với Next.js, React, Vue.js, Spring Boot, FastAPI và AI."
                  : "Building fun, fast, high-quality web apps with Next.js, React, Vue.js, Spring Boot, FastAPI, and AI."}
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
                    className="rounded-full border-2 border-white/15 bg-white/5 p-2.5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-[#ffb627] hover:text-[#ffb627] cursor-pointer"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="play-eyebrow play-eyebrow-yellow !border-white/20 !shadow-none">
                {isVi ? "Điều hướng" : "Navigate"}
              </div>
              <ul className="space-y-2 text-[13px] font-medium">
                {siteConfig.navItems.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="text-white/60 transition-colors hover:text-[#ffb627]">
                      {resolveLocale(item.label, isVi)}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={onOpenResumeModal}
                    className="font-bold text-[#ffb627] hover:underline cursor-pointer"
                  >
                    {isVi ? "Xem CV Online" : "Online Resume"}
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="play-eyebrow play-eyebrow-green !border-white/20 !shadow-none flex items-center gap-1.5 w-fit">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isVi ? "Riêng tư" : "Privacy"}</span>
              </div>
              <p className="text-[13px] leading-relaxed font-medium text-white/60">
                {isVi
                  ? "Không cookie bên thứ 3, không log IP, không lưu dữ liệu cá nhân."
                  : "No third-party cookies, no IP logging, zero personal data stored."}
              </p>
              <GlassButton onClick={onOpenPrivacyDrawer} size="sm" variant="glass" className="text-xs !border-white/20 !bg-white/10 !text-white !shadow-none">
                {isVi ? "Xem Telemetry" : "View Telemetry"}
              </GlassButton>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs font-medium text-white/40 sm:flex-row">
            <div className="flex items-center gap-2">
              <PartyPopper className="h-3.5 w-3.5 text-[#ff5ca8]" />
              © {currentYear} Nguyen Tran Anh (SatohJiro). Made with fun.
            </div>
            <div className="font-mono">v3.0 — playful</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
