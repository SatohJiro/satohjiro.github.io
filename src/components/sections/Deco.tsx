"use client";
import React from "react";

export function DecoHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-14 text-center">
      <p className="deco-label">{kicker}</p>
      <div className="deco-divider mt-5"><span>◆</span></div>
      <h2 className="deco-title mt-6 text-[clamp(2rem,5vw,3.4rem)] uppercase">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#f3ecdc]/60">{sub}</p>}
    </div>
  );
}

/** Diamond ornament used as list bullet */
export function DecoDiamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`h-2 w-2 shrink-0 ${className}`} aria-hidden>
      <rect x="2.5" y="2.5" width="7" height="7" transform="rotate(45 6 6)" fill="#c9a227" />
    </svg>
  );
}
