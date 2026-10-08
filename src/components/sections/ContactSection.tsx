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
  const copy = (t: string, k: string) => {
    navigator.clipboard.writeText(t); setCopied(k);
    telemetry.track("click", `copy_${k}`); setTimeout(() => setCopied(null), 2500);
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeader index="06" label={isVi ? "Liên hệ" : "Contact"}
        title={isVi ? "Gửi yêu cầu" : "Submit Request"}
        desc={isVi ? "Tuyển Frontend Engineer? Phản hồi trong 24h." : "Hiring? Replies within 24h."} />

      <a href={siteConfig.links.email} onClick={() => telemetry.track("click", "contact_direct_email")}
        className="bp-panel bp-corners group block p-8 sm:p-12">
        <div className="bp-label bp-label-accent">TO — {isVi ? "Gửi đến" : "Recipient"}</div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <span className="break-all text-[clamp(1.4rem,4vw,2.6rem)] font-extrabold tracking-tight group-hover:text-[#ffb000]">
            {contactData.email}
          </span>
          <ArrowUpRight className="h-8 w-8 text-[#ffb000] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
        <div className="bp-rule my-6" />
        <div className="flex flex-wrap justify-between gap-4">
          <span className="bp-spec">{isVi ? "Kênh chính — việc làm, phỏng vấn" : "Primary — jobs, interviews"}</span>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); copy(contactData.email, "email"); }}
            className="bp-tag cursor-pointer hover:!border-[#ffb000] hover:!text-[#ffb000]">
            {copied === "email" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="ml-1.5">{copied === "email" ? (isVi ? "Đã sao chép" : "Copied") : "COPY"}</span>
          </button>
        </div>
      </a>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div className="bp-panel flex items-center justify-between p-6">
          <div><div className="bp-label mb-2">Phone / Zalo</div><div className="font-extrabold">{contactData.phone}</div></div>
          <button onClick={() => copy(contactData.phone, "phone")} className="bp-tag cursor-pointer hover:!border-[#ffb000]" aria-label="Copy">
            {copied === "phone" ? <Check className="h-3.5 w-3.5 text-[#ffb000]" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        {[
          { href: siteConfig.links.github, icon: <GithubIcon className="h-6 w-6" />, l: "GitHub", s: "/SatohJiro" },
          { href: siteConfig.links.linkedin, icon: <LinkedinIcon className="h-6 w-6" />, l: "LinkedIn", s: "/in/satohjiro" },
        ].map((x) => (
          <a key={x.l} href={x.href} target="_blank" rel="noopener noreferrer" className="bp-panel group flex items-center justify-between p-6 hover:!border-[#ffb000]">
            <div><div className="bp-label mb-2">{x.l}</div><div className="font-mono text-[14px] font-semibold group-hover:text-[#ffb000]">{x.s}</div></div>
            {x.icon}
          </a>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="bp-spec">{resolveLocale(contactData.location, isVi)}</span>
        <span className="bp-label bp-label-accent">● {isVi ? "Sẵn sàng — On-site / Hybrid / Remote" : "Available — On-site / Hybrid / Remote"}</span>
      </div>
    </section>
  );
}
