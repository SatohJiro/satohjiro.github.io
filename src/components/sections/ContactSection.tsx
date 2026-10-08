"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactData } from "@/data/portfolio-content";
import { siteConfig } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { Y2kHeading, Y2kBubbles } from "./Y2k";
import { Copy, Check, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

export function ContactSection() {
  const { isVi } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (t: string, k: string) => {
    navigator.clipboard.writeText(t); setCopied(k);
    telemetry.track("click", `copy_${k}`); setTimeout(() => setCopied(null), 2500);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <Y2kHeading kicker={isVi ? "Màn cuối" : "Final level"} title={isVi ? "Nhắn tin" : "Say hello"}
        sub={isVi ? "Boss cuối: một email. Phần thưởng: phản hồi trong 24h." : "Final boss: one email. Reward: reply within 24h."} />

      <div className="y2k-glass relative p-10 text-center sm:p-14">
        <Y2kBubbles />
        <span className="y2k-chip"><Mail className="mr-1.5 h-3.5 w-3.5" /> {isVi ? "Kênh chính" : "Main channel"}</span>
        <a href={siteConfig.links.email}
          onClick={() => telemetry.track("click", "contact_direct_email")}
          className="mt-5 block break-all text-[clamp(1.4rem,4.5vw,2.4rem)] font-extrabold tracking-tight hover:text-[#7ce7f4]">
          {contactData.email}
        </a>
        <button onClick={() => copy(contactData.email, "email")} className="y2k-btn mx-auto mt-7 !py-3">
          {copied === "email" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied === "email" ? (isVi ? "Đã sao chép!" : "Copied!") : (isVi ? "Sao chép" : "Copy")}
        </button>

        <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-6">
          <button onClick={() => copy(contactData.phone, "phone")}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-white/8 px-5 py-2.5 text-sm font-bold text-white/80 hover:text-white">
            {contactData.phone} {copied === "phone" ? <Check className="h-3.5 w-3.5 text-[#b8f135]" /> : <Copy className="h-3.5 w-3.5 opacity-60" />}
          </button>
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-white/80 hover:text-[#b8f135]">
            <GithubIcon className="h-5 w-5" />
          </a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-white/80 hover:text-[#b8f135]">
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </div>
        <p className="y2k-label mt-8 !text-[10px]">
          {resolveLocale(contactData.location, isVi)} · {isVi ? "Sẵn sàng" : "Available"}
        </p>
      </div>
    </section>
  );
}
