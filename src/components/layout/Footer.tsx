"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { ArrowUp } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function Footer() {
  const { isVi } = useLanguage();

  return (
    <footer className="border-t-2 border-[#0a0a0a] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="text-3xl font-extrabold tracking-tight">
              N.Tran Anh<span className="text-[#e30613]">.</span>
            </div>
            <p className="swiss-label mt-3">
              {isVi ? "Kỹ sư phần mềm — TP.HCM" : "Software Engineer — HCMC"}
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="swiss-label mb-4">{isVi ? "Mục lục" : "Index"}</div>
            <ul className="space-y-2">
              {siteConfig.navItems.map((item, i) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => telemetry.track("click", `footer_nav_${item.id}`)}
                    className="swiss-label hover:text-[#e30613]"
                  >
                    <span className="mr-2 text-[#e30613]">{String(i + 1).padStart(2, "0")}</span>
                    {item.label[isVi ? "vi" : "en"]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="swiss-label mb-4">{isVi ? "Khác" : "Elsewhere"}</div>
            <div className="flex gap-4">
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#e30613]">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#e30613]">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="hover:text-[#e30613] cursor-pointer"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-[#e2e2e2] pt-6">
          <span className="swiss-label">© {new Date().getFullYear()} Nguyen Tran Anh</span>
          <span className="swiss-label">Set in Inter — Grid 12 col.</span>
        </div>
      </div>
    </footer>
  );
}
