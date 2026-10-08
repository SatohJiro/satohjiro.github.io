"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactData } from "@/data/portfolio-content";
import { siteConfig } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { SectionHeader } from "./SectionHeader";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

export function ContactSection() {
  const { isVi } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    telemetry.track("click", `copy_${key}`);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeader
        index="06"
        label={isVi ? "Liên hệ" : "Contact"}
        title={isVi ? "Bắt đầu\ndự án" : "Start a\nproject"}
        desc={
          isVi
            ? "Đang tuyển Frontend Engineer? Email tôi — phản hồi trong 24 giờ."
            : "Hiring a frontend engineer? Email me — replies within 24 hours."
        }
      />

      <a
        href={siteConfig.links.email}
        onClick={() => telemetry.track("click", "contact_direct_email")}
        className="group block border-t-2 border-[#0a0a0a] py-10"
      >
        <div className="swiss-label mb-3">Email</div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-[clamp(1.5rem,4.5vw,3rem)] font-extrabold tracking-tight group-hover:text-[#e30613]">
            {contactData.email}
          </span>
          <ArrowUpRight className="h-8 w-8 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 text-[#e30613]" />
        </div>
      </a>

      <div className="grid border-t border-[#e2e2e2] sm:grid-cols-3">
        <div className="border-b border-r border-[#e2e2e2] p-6 max-sm:border-r-0">
          <div className="swiss-label mb-3">Phone / Zalo</div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-lg font-extrabold tracking-tight">{contactData.phone}</span>
            <button
              onClick={() => copy(contactData.phone, "phone")}
              className="swiss-tag cursor-pointer hover:!border-[#0a0a0a]"
              aria-label="Copy phone"
            >
              {copied === "phone" ? <Check className="h-3.5 w-3.5 text-[#e30613]" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between border-b border-r border-[#e2e2e2] p-6 max-sm:border-r-0 hover:bg-white"
        >
          <div>
            <div className="swiss-label mb-2">GitHub</div>
            <span className="font-mono text-[14px] font-semibold group-hover:text-[#e30613]">/SatohJiro</span>
          </div>
          <GithubIcon className="h-6 w-6" />
        </a>
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between border-b border-[#e2e2e2] p-6 hover:bg-white"
        >
          <div>
            <div className="swiss-label mb-2">LinkedIn</div>
            <span className="font-mono text-[14px] font-semibold group-hover:text-[#e30613]">/in/satohjiro</span>
          </div>
          <LinkedinIcon className="h-6 w-6" />
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#0a0a0a] py-6">
        <span className="swiss-label">{resolveLocale(contactData.location, isVi)}</span>
        <span className="swiss-label flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse bg-[#e30613]" />
          {isVi ? "On-site / Hybrid / Remote" : "On-site / Hybrid / Remote"}
        </span>
      </div>
    </section>
  );
}
