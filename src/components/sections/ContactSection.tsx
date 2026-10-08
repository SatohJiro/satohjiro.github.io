"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactData } from "@/data/portfolio-content";
import { siteConfig } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { GlassCard } from "../glass/GlassCard";
import { GlassButton } from "../glass/GlassButton";
import {
 Mail,
 Phone,
 MapPin,
 Copy,
 Check,
 ExternalLink,
} from "lucide-react";
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
 <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
 <div className="max-w-5xl mx-auto space-y-12">
 {/* Section Header */}
 <div className="text-center max-w-2xl mx-auto space-y-3">
 <span className="play-eyebrow play-eyebrow-orange">{isVi ? "Liên hệ" : "Contact"}</span>
 <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e1e2a] tracking-tight">
 {isVi ? (
 <>
 Kết Nối & <span className="play-underline">Trao Đổi Cơ Hội Nghề Nghiệp</span>
 </>
 ) : (
 <>
 Let&apos;s Connect & <span className="play-underline">Explore Opportunities</span>
 </>
 )}
 </h2>
 <p className="text-sm sm:text-base text-[#55555f]">
 {isVi
 ? "Bạn có thể liên hệ trực tiếp với tôi qua email, số điện thoại hoặc các mạng xã hội nghề nghiệp bên dưới."
 : "Feel free to reach out directly via email, phone, or professional networks below."}
 </p>
 </div>

 {/* Contact Cards Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Card 1: Email */}
 <GlassCard className="p-6 sm:p-7 space-y-5 border-[#1e1e2a]/10 bg-white flex flex-col justify-between" glowColor="none">
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
 <Mail className="w-4 h-4" />
 <span>[Primary Email]</span>
 </div>
 <button
 onClick={() => handleCopy(contactData.email, "email")}
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1e1e2a]/10 hover:border-blue-400 hover:bg-blue-50:bg-blue-500/10 text-xs font-semibold text-[#3f3f4c] hover:text-slate-950:text-white transition-all cursor-pointer shadow-xs"
 title="Copy Email Address"
 >
 {copiedKey === "email" ? (
 <>
 <Check className="w-3.5 h-3.5 text-emerald-600" />
 <span className="text-emerald-700 font-bold">{isVi ? "Đã sao chép" : "Copied"}</span>
 </>
 ) : (
 <>
 <Copy className="w-3.5 h-3.5" />
 <span>{isVi ? "Sao chép" : "Copy"}</span>
 </>
 )}
 </button>
 </div>

 <div>
 <div className="text-xs font-mono font-medium text-[#6e6e7e]">Direct Inbox</div>
 <div className="text-base sm:text-lg font-bold text-[#1e1e2a] mt-0.5 select-all">
 {contactData.email}
 </div>
 </div>

 <p className="text-xs text-[#55555f] leading-relaxed">
 {isVi
 ? "Kênh liên hệ chính cho các cơ hội việc làm, phỏng vấn và trao đổi chuyên môn."
 : "Primary contact channel for recruitment, interview invitations, and project discussions."}
 </p>
 </div>

 <div className="pt-2">
 <a
 href={siteConfig.links.email}
 onClick={() => telemetry.track("click", "contact_direct_email")}
 className="w-full"
 >
 <GlassButton
 variant="primary"
 size="md"
 icon={<Mail className="w-4 h-4" />}
 className="w-full text-xs font-semibold"
 >
 {isVi ? "Gửi Email Trực Tiếp" : "Send Direct Email"}
 </GlassButton>
 </a>
 </div>
 </GlassCard>

 {/* Card 2: Phone */}
 <GlassCard className="p-6 sm:p-7 space-y-5 border-[#1e1e2a]/10 bg-white flex flex-col justify-between" glowColor="none">
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600">
 <Phone className="w-4 h-4" />
 <span>[Direct Line]</span>
 </div>
 <button
 onClick={() => handleCopy(contactData.phone, "phone")}
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1e1e2a]/10 hover:border-blue-400 hover:bg-blue-50:bg-blue-500/10 text-xs font-semibold text-[#3f3f4c] hover:text-slate-950:text-white transition-all cursor-pointer shadow-xs"
 title="Copy Phone Number"
 >
 {copiedKey === "phone" ? (
 <>
 <Check className="w-3.5 h-3.5 text-emerald-600" />
 <span className="text-emerald-700 font-bold">{isVi ? "Đã sao chép" : "Copied"}</span>
 </>
 ) : (
 <>
 <Copy className="w-3.5 h-3.5" />
 <span>{isVi ? "Sao chép" : "Copy"}</span>
 </>
 )}
 </button>
 </div>

 <div>
 <div className="text-xs font-mono font-medium text-[#6e6e7e]">Phone / Zalo</div>
 <div className="text-base sm:text-lg font-bold text-[#1e1e2a] mt-0.5 select-all">
 {contactData.phone}
 </div>
 </div>

 <p className="text-xs text-[#55555f] leading-relaxed">
 {isVi
 ? "Sẵn sàng nhận cuộc gọi, tin nhắn SMS hoặc trao đổi qua Zalo trong giờ hành chính."
 : "Available for phone calls, SMS, or quick messaging during business hours."}
 </p>
 </div>

 <div className="pt-2">
 <a
 href={siteConfig.links.phone}
 onClick={() => telemetry.track("click", "contact_direct_phone")}
 className="w-full"
 >
 <GlassButton
 variant="outline"
 size="md"
 icon={<Phone className="w-4 h-4 text-blue-600" />}
 className="w-full text-xs font-semibold text-slate-800"
 >
 {isVi ? "Gọi Điện Thoại" : "Make a Phone Call"}
 </GlassButton>
 </a>
 </div>
 </GlassCard>

 {/* Card 3: Professional Networks (LinkedIn & GitHub) */}
 <GlassCard className="p-6 sm:p-7 space-y-5 border-[#1e1e2a]/10 bg-white" glowColor="none">
 <div className="space-y-2">
 <div className="text-xs font-mono font-medium text-[#6e6e7e] uppercase tracking-wide">
 {isVi ? "Mạng Xã Hội Nghề Nghiệp" : "Professional Profiles"}
 </div>
 <h3 className="text-lg font-bold text-[#1e1e2a]">
 LinkedIn & GitHub
 </h3>
 <p className="text-xs text-[#55555f]">
 {isVi
 ? "Xem lịch sử nghề nghiệp chi tiết và các mã nguồn dự án mã nguồn mở."
 : "Explore career timeline and open-source software contributions."}
 </p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
 <a
 href={siteConfig.links.linkedin}
 target="_blank"
 rel="noopener noreferrer"
 onClick={() => telemetry.track("click", "contact_card_linkedin")}
 className="flex items-center justify-between p-3.5 rounded-xl border border-[#1e1e2a]/10 bg-slate-50 hover:border-blue-500/50 hover:bg-blue-50/50:bg-blue-500/10 transition-all group shadow-xs"
 >
 <div className="flex items-center gap-3">
 <LinkedinIcon className="w-5 h-5 text-blue-600" />
 <div>
 <div className="text-xs font-bold text-[#1e1e2a]">LinkedIn</div>
 <div className="text-[11px] text-[#6e6e7e] font-mono">/in/satohjiro</div>
 </div>
 </div>
 <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600:text-blue-400 transition-colors" />
 </a>

 <a
 href={siteConfig.links.github}
 target="_blank"
 rel="noopener noreferrer"
 onClick={() => telemetry.track("click", "contact_card_github")}
 className="flex items-center justify-between p-3.5 rounded-xl border border-[#1e1e2a]/10 bg-slate-50 hover:border-blue-500/50 hover:bg-blue-50/50:bg-blue-500/10 transition-all group shadow-xs"
 >
 <div className="flex items-center gap-3">
 <GithubIcon className="w-5 h-5 text-blue-600" />
 <div>
 <div className="text-xs font-bold text-[#1e1e2a]">GitHub</div>
 <div className="text-[11px] text-[#6e6e7e] font-mono">/SatohJiro</div>
 </div>
 </div>
 <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600:text-blue-400 transition-colors" />
 </a>
 </div>
 </GlassCard>

 {/* Card 4: Location & Work Mode */}
 <GlassCard className="p-6 sm:p-7 space-y-5 border-[#1e1e2a]/10 bg-white" glowColor="none">
 <div className="space-y-2">
 <div className="text-xs font-mono font-medium text-[#6e6e7e] uppercase tracking-wide">
 {isVi ? "Khu Vực Làm Việc" : "Location & Availability"}
 </div>
 <h3 className="text-lg font-bold text-[#1e1e2a] flex items-center gap-2">
 <MapPin className="w-4 h-4 text-slate-400" />
 <span>{resolveLocale(contactData.location, isVi)}</span>
 </h3>
 <p className="text-xs text-[#55555f] leading-relaxed">
 {isVi
 ? "Sẵn sàng làm việc theo hình thức On-site tại TP. Hồ Chí Minh, Hybrid hoặc Remote cho các công ty trong và ngoài nước."
 : "Available for On-site roles in Ho Chi Minh City, Hybrid setups, or Remote positions."}
 </p>
 </div>

 <div className="flex flex-wrap gap-2 pt-1">
 <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
 {isVi ? "Sẵn sàng nhận việc" : "Available to Join"}
 </span>
 <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#1e1e2a]/[.04] border border-[#1e1e2a]/10 text-slate-800">
 On-site / Hybrid / Remote
 </span>
 </div>
 </GlassCard>
 </div>
 </div>
 </section>
 );
}
