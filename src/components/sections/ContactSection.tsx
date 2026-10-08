"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactData } from "@/data/portfolio-content";
import { siteConfig } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { DecoHeading } from "./Deco";
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
    <section id="contact" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <DecoHeading kicker={isVi ? "Hồi kết" : "Finale"} title={isVi ? "Lời mời" : "An Invitation"}
        sub={isVi ? "Mọi kiệt tác đều cần khán giả. Hãy cùng tạo nên chương tiếp theo." : "Every masterpiece needs an audience. Let us write the next chapter together."} />

      <div className="deco-frame p-10 text-center sm:p-14">
        <p className="deco-label">{isVi ? "Thư tín" : "Correspondence"}</p>
        <a href={siteConfig.links.email}
          onClick={() => telemetry.track("click", "contact_direct_email")}
          className="deco-title mt-4 block break-all text-[clamp(1.3rem,4vw,2.2rem)] hover:text-[#e8c96a]">
          {contactData.email}
        </a>
        <button onClick={() => copy(contactData.email, "email")}
          className="mx-auto mt-6 flex cursor-pointer items-center gap-2 border border-[#c9a227]/40 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0e0d0b]">
          {copied === "email" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied === "email" ? (isVi ? "Đã chép" : "Copied") : (isVi ? "Chép" : "Copy")}
        </button>

        <div className="deco-divider my-10"><span>◆</span></div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <button onClick={() => copy(contactData.phone, "phone")}
            className="flex cursor-pointer items-center gap-2 text-[13px] uppercase tracking-[0.18em] text-[#f3ecdc]/70 hover:text-[#c9a227]">
            {contactData.phone} {copied === "phone" ? <Check className="h-3.5 w-3.5 text-[#c9a227]" /> : <Copy className="h-3.5 w-3.5 opacity-50" />}
          </button>
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center gap-2 text-[#f3ecdc]/70 hover:text-[#c9a227]">
            <GithubIcon className="h-5 w-5" />
          </a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center gap-2 text-[#f3ecdc]/70 hover:text-[#c9a227]">
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </div>
        <p className="mt-8 text-[12px] uppercase tracking-[0.2em] text-[#f3ecdc]/45">
          {resolveLocale(contactData.location, isVi)}
        </p>
      </div>
    </section>
  );
}
