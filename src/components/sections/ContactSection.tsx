"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactData } from "@/data/portfolio-content";
import { siteConfig } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import {
  ArrowUpRight,
  Copy,
  Check,
  Mail,
  Phone,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";
import { ChapterHeader } from "../editorial/ChapterHeader";
import { Reveal } from "../editorial/Reveal";

export function ContactSection() {
  const { isVi } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    telemetry.track("click", `copy_${key}`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const copyLabel = (key: string) =>
    copiedKey === key ? (isVi ? "Đã sao chép" : "Copied") : isVi ? "Sao chép" : "Copy";

  const networks = [
    {
      name: "LinkedIn",
      handle: "/in/satohjiro",
      href: siteConfig.links.linkedin,
      Icon: LinkedinIcon,
      track: "contact_card_linkedin",
    },
    {
      name: "GitHub",
      handle: "/SatohJiro",
      href: siteConfig.links.github,
      Icon: GithubIcon,
      track: "contact_card_github",
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[92rem]">
        <Reveal>
          <ChapterHeader id="contact" />
        </Reveal>

        {/* Contact index — hairline grid */}
        <div className="mt-10 grid grid-cols-1 gap-px border border-[var(--ed-hairline)] bg-[var(--ed-hairline)] md:grid-cols-2">
          {/* Email */}
          <Reveal className="bg-[var(--ed-paper)]">
            <div className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  {isVi ? "Email chính" : "Primary email"}
                </span>
                <button
                  onClick={() => handleCopy(contactData.email, "email")}
                  className="flex items-center gap-1.5 font-mono text-xs text-[var(--ed-muted)] underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:hover:text-blue-400 cursor-pointer"
                >
                  {copiedKey === "email" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copyLabel("email")}
                </button>
              </div>
              <a
                href={siteConfig.links.email}
                onClick={() => telemetry.track("click", "contact_direct_email")}
                className="mt-4 block font-display text-xl font-bold tracking-tight text-[var(--ed-ink)] break-all transition-colors hover:text-blue-600 dark:hover:text-blue-400 sm:text-2xl"
              >
                {contactData.email}
              </a>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ed-muted)]">
                {isVi
                  ? "Kênh liên hệ chính cho các cơ hội việc làm, phỏng vấn và trao đổi chuyên môn."
                  : "Primary contact channel for recruitment, interview invitations, and project discussions."}
              </p>
              <a
                href={siteConfig.links.email}
                onClick={() => telemetry.track("click", "contact_cta_email")}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--ed-ink)] px-6 py-3 text-sm font-semibold text-[var(--ed-paper)] transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                {isVi ? "Gửi Email Trực Tiếp" : "Send Direct Email"}
              </a>
            </div>
          </Reveal>

          {/* Phone */}
          <Reveal delay={60} className="bg-[var(--ed-paper)]">
            <div className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  {isVi ? "Điện thoại" : "Direct line"}
                </span>
                <button
                  onClick={() => handleCopy(contactData.phone, "phone")}
                  className="flex items-center gap-1.5 font-mono text-xs text-[var(--ed-muted)] underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:hover:text-blue-400 cursor-pointer"
                >
                  {copiedKey === "phone" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copyLabel("phone")}
                </button>
              </div>
              <a
                href={siteConfig.links.phone}
                onClick={() => telemetry.track("click", "contact_direct_phone")}
                className="mt-4 block font-display text-xl font-bold tracking-tight text-[var(--ed-ink)] transition-colors hover:text-blue-600 dark:hover:text-blue-400 sm:text-2xl"
              >
                {contactData.phone}
              </a>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ed-muted)]">
                {isVi
                  ? "Sẵn sàng nhận cuộc gọi, tin nhắn SMS hoặc trao đổi qua Zalo trong giờ hành chính."
                  : "Available for phone calls, SMS, or quick messaging during business hours."}
              </p>
              <a
                href={siteConfig.links.phone}
                onClick={() => telemetry.track("click", "contact_cta_phone")}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--ed-hairline)] px-6 py-3 text-sm font-semibold text-[var(--ed-ink)] transition-colors hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Phone className="h-4 w-4" />
                {isVi ? "Gọi Điện Thoại" : "Make a Phone Call"}
              </a>
            </div>
          </Reveal>

          {/* Networks */}
          <Reveal delay={80} className="bg-[var(--ed-paper)]">
            <div className="flex h-full flex-col p-6 sm:p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                {isVi ? "Mạng xã hội nghề nghiệp" : "Professional profiles"}
              </span>
              <div className="mt-4 flex-1 border-t border-[var(--ed-hairline)]">
                {networks.map((n) => (
                  <a
                    key={n.name}
                    href={n.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => telemetry.track("click", n.track)}
                    className="group flex items-center justify-between gap-4 border-b border-[var(--ed-hairline)] py-4"
                  >
                    <span className="flex items-center gap-3">
                      <n.Icon className="h-5 w-5 text-[var(--ed-muted)] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      <span>
                        <span className="block text-sm font-bold text-[var(--ed-ink)] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {n.name}
                        </span>
                        <span className="block font-mono text-xs text-[var(--ed-muted)]">{n.handle}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--ed-muted)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600" />
                  </a>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ed-muted)]">
                {isVi
                  ? "Xem lịch sử nghề nghiệp chi tiết và các đóng góp mã nguồn mở."
                  : "Explore career timeline and open-source software contributions."}
              </p>
            </div>
          </Reveal>

          {/* Location */}
          <Reveal delay={120} className="bg-[var(--ed-paper)]">
            <div className="flex h-full flex-col p-6 sm:p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                {isVi ? "Khu vực làm việc" : "Location & availability"}
              </span>
              <div className="mt-4 font-display text-xl font-bold tracking-tight text-[var(--ed-ink)] sm:text-2xl">
                {resolveLocale(contactData.location, isVi)}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ed-muted)]">
                {isVi
                  ? "Sẵn sàng làm việc theo hình thức On-site tại TP. Hồ Chí Minh, Hybrid hoặc Remote cho các công ty trong và ngoài nước."
                  : "Available for On-site roles in Ho Chi Minh City, Hybrid setups, or Remote positions."}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--ed-hairline)] pt-5 font-mono text-xs text-[var(--ed-muted)]">
                <span className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {isVi ? "Sẵn sàng nhận việc" : "Available to join"}
                </span>
                <span>On-site / Hybrid / Remote</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
