"use client";

/**
 * ContactSection (Your Name theme) — 絆 bonds.
 * The two characters wave here — a farewell under the comet.
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check, Send } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactData } from "@/data/portfolio-content";
import { siteConfig } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { SectionHeading } from "@/components/yourname/SectionHeading";
import { Reveal } from "@/components/yourname/Reveal";
import { PixelCharacter } from "@/components/yourname/PixelCharacter";

export function ContactSection() {
  const { isVi, t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const rows = [
    {
      key: "email",
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      label: "Email",
      value: contactData.email,
      href: siteConfig.links.email,
    },
    {
      key: "phone",
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      label: t({ en: "Phone", vi: "Điện thoại" }),
      value: contactData.phone,
      href: siteConfig.links.phone,
    },
    {
      key: "location",
      icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
      label: t({ en: "Location", vi: "Địa điểm" }),
      value: resolveLocale(contactData.location, isVi),
      href: null,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            accent="絆"
            accentReading="kizuna — bonds"
            eyebrow={t({ en: "final chapter", vi: "chương cuối" })}
            title={t({ en: "Contact", vi: "Liên hệ" })}
            description={t({
              en: "No matter how far apart, a single message can cross the sky.",
              vi: "Dù xa cách đến đâu, một tin nhắn cũng có thể vượt qua bầu trời.",
            })}
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="yn-card p-8">
            <div className="space-y-4">
              {rows.map((r) => (
                <div key={r.key} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#f7b267]/30 bg-[#f7b267]/10 text-[#f7b267]">
                    {r.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#e8dcc8]/60">
                      {r.label}
                    </p>
                    {r.href ? (
                      <a href={r.href} className="truncate text-[#fdf6ec] transition-colors hover:text-[#f7b267]">
                        {r.value}
                      </a>
                    ) : (
                      <p className="truncate text-[#fdf6ec]">{r.value}</p>
                    )}
                  </div>
                  {r.key !== "location" && (
                    <button
                      type="button"
                      onClick={() => copy(r.value, r.key)}
                      aria-label={t({ en: `Copy ${r.label}`, vi: `Sao chép ${r.label}` })}
                      className="cursor-pointer rounded-full border border-[#fdf6ec]/20 p-2.5 text-[#e8dcc8]/70 transition-colors hover:border-[#f7b267]/60 hover:text-[#f7b267]"
                    >
                      {copied === r.key ? (
                        <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="yn-btn-ghost"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="yn-btn-ghost"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a href={siteConfig.links.email} className="yn-btn-primary">
                <Send className="h-4 w-4" aria-hidden="true" />
                {t({ en: "Send a message", vi: "Gửi tin nhắn" })}
              </a>
            </div>
          </div>
        </Reveal>

        {/* farewell: both characters wave */}
        <div className="mt-12 flex items-end justify-center gap-10 sm:gap-16">
          <div className="yn-idle-float w-20 sm:w-24">
            <div className="-scale-x-100">
              <PixelCharacter
                id="boy"
                pose="wave"
                label={t({ en: "Boy waving goodbye", vi: "Cậu bé vẫy tay chào" })}
              />
            </div>
          </div>
          <p className="yn-jp-accent pb-6 text-xl" lang="ja">またね</p>
          <div className="yn-idle-float w-20 sm:w-24" style={{ animationDelay: "-2.2s" }}>
            <PixelCharacter
              id="girl"
              pose="wave"
              label={t({ en: "Girl waving goodbye", vi: "Cô bé vẫy tay chào" })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
