"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactData } from "@/data/portfolio-content";
import { siteConfig } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

export function ContactSection() {
  const { isVi } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    telemetry.track("click", `copy_${key}`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader
        num="06"
        eyebrow={isVi ? "Liên hệ" : "Contact"}
        title={isVi ? "Làm việc cùng nhau" : "Let's Talk"}
        desc={
          isVi
            ? "Đang tìm Frontend Engineer? Email tôi — trả lời trong 24h."
            : "Hiring a frontend engineer? Email me — replies within 24h."
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Email — the big one */}
        <a
          href={siteConfig.links.email}
          onClick={() => telemetry.track("click", "contact_direct_email")}
          className="brut-card brut-card-hover group block bg-[#111] !text-white p-8 sm:p-10"
        >
          <div className="flex items-start justify-between gap-4">
            <Mail className="h-8 w-8 text-[#ff3d00]" />
            <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
          <div className="brut-eyebrow mt-6 text-white/50">Email</div>
          <div className="mt-2 break-all font-display text-xl font-black sm:text-2xl">
            {contactData.email}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCopy(contactData.email, "email");
              }}
              className="brut-tag brut-tag-accent cursor-pointer !text-[11px]"
            >
              {copiedKey === "email" ? (
                <>
                  <Check className="mr-1 h-3 w-3" /> {isVi ? "Đã copy" : "Copied"}
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-3 w-3" /> {isVi ? "Copy" : "Copy"}
                </>
              )}
            </button>
          </div>
        </a>

        <div className="flex flex-col gap-6">
          {/* Phone */}
          <div className="brut-card flex flex-1 items-center justify-between gap-4 p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#ff3d00]" />
                <span className="brut-eyebrow text-[#111]/55">Phone / Zalo</span>
              </div>
              <div className="mt-2 font-display text-xl font-black sm:text-2xl">
                {contactData.phone}
              </div>
            </div>
            <button
              onClick={() => handleCopy(contactData.phone, "phone")}
              className="brut-tag cursor-pointer hover:bg-[#111] hover:text-white"
            >
              {copiedKey === "phone" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Socials */}
          <div className="grid flex-1 grid-cols-2 gap-6">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => telemetry.track("click", "contact_card_github")}
              className="brut-card brut-card-hover flex flex-col justify-between p-6"
            >
              <GithubIcon className="h-7 w-7" />
              <div className="mt-6">
                <div className="font-display text-lg font-black uppercase">GitHub</div>
                <div className="font-mono text-[11px] font-bold text-[#111]/55">/SatohJiro</div>
              </div>
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => telemetry.track("click", "contact_card_linkedin")}
              className="brut-card brut-card-hover flex flex-col justify-between p-6"
            >
              <LinkedinIcon className="h-7 w-7" />
              <div className="mt-6">
                <div className="font-display text-lg font-black uppercase">LinkedIn</div>
                <div className="font-mono text-[11px] font-bold text-[#111]/55">/in/satohjiro</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Location strip */}
      <div className="brut-card mt-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-[#ff3d00]" />
          <span className="font-bold">{resolveLocale(contactData.location, isVi)}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="brut-tag brut-tag-accent">
            <span className="mr-1.5 inline-block h-2 w-2 animate-pulse bg-white" />
            {isVi ? "Sẵn sàng nhận việc" : "Available"}
          </span>
          <span className="brut-tag">On-site</span>
          <span className="brut-tag">Hybrid</span>
          <span className="brut-tag">Remote</span>
        </div>
      </div>
    </section>
  );
}
