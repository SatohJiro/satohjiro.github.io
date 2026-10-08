"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactData } from "@/data/portfolio-content";
import { siteConfig } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { Chapter } from "./Chapter";
import { Copy, Check } from "lucide-react";
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
    <section id="contact">
      <Chapter no={isVi ? "Lời bạt" : "Colophon"}
        title={isVi ? "Thư từ" : "Correspondence"}>
        <p className="mx-auto max-w-xl text-center text-[17px] leading-relaxed text-[#1c1a16]/75">
          {isVi
            ? "Mọi câu chuyện hay đều cần người đọc. Nếu bạn đang tìm một kỹ sư frontend, hãy viết cho tôi."
            : "Every good book needs readers. If you're looking for a frontend engineer, write to me."}
        </p>

        <a href={siteConfig.links.email}
          onClick={() => telemetry.track("click", "contact_direct_email")}
          className="mono-plate group mx-auto mt-10 block max-w-2xl text-center transition-colors hover:!border-[#1e4d3b]">
          <p className="mono-caption">EPISTOLA — {isVi ? "Gửi thư" : "Write"}</p>
          <p className="mono-title mt-3 break-all text-[clamp(1.3rem,4vw,2rem)] group-hover:text-[#1e4d3b]">
            {contactData.email}
          </p>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); copy(contactData.email, "email"); }}
            className="mono-caption mx-auto mt-4 flex items-center gap-2 border border-[#e3ddd0] px-4 py-2 cursor-pointer hover:border-[#1e4d3b]">
            {copied === "email" ? <Check className="h-3.5 w-3.5 text-[#1e4d3b]" /> : <Copy className="h-3.5 w-3.5" />}
            {copied === "email" ? (isVi ? "Đã chép" : "Copied") : (isVi ? "Chép địa chỉ" : "Copy address")}
          </button>
        </a>

        <div className="mx-auto mt-8 grid max-w-2xl gap-px bg-[#e3ddd0] sm:grid-cols-3">
          {[
            { l: "Phone / Zalo", v: contactData.phone, k: "phone", copyable: true },
            { l: "GitHub", v: "/SatohJiro", href: siteConfig.links.github, icon: true },
            { l: "LinkedIn", v: "/in/satohjiro", href: siteConfig.links.linkedin, icon: true },
          ].map((x) => (
            <div key={x.l} className="bg-[#faf7f0] p-6 text-center">
              <p className="mono-caption">{x.l}</p>
              {x.copyable ? (
                <button onClick={() => copy(x.v, x.k!)} className="mt-2 flex w-full items-center justify-center gap-2 font-medium hover:text-[#1e4d3b] cursor-pointer">
                  {x.v} {copied === x.k ? <Check className="h-3.5 w-3.5 text-[#1e4d3b]" /> : <Copy className="h-3.5 w-3.5 opacity-50" />}
                </button>
              ) : (
                <a href={x.href} target="_blank" rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-2 font-medium hover:text-[#1e4d3b]">
                  {x.icon && x.l === "GitHub" ? <GithubIcon className="h-4 w-4" /> : x.icon ? <LinkedinIcon className="h-4 w-4" /> : null}
                  {x.v}
                </a>
              )}
            </div>
          ))}
        </div>

        <p className="mono-caption mt-10 text-center">
          {resolveLocale(contactData.location, isVi)} · {isVi ? "Sẵn sàng — On-site / Hybrid / Remote" : "Available — On-site / Hybrid / Remote"}
        </p>
      </Chapter>
    </section>
  );
}
