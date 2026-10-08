"use client";
import React from "react";

/** Section heading: glossy pill kicker + big rounded title */
export function Y2kHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 text-center">
      <span className="y2k-chip !text-[11px] !uppercase !tracking-[0.2em]">{kicker}</span>
      <h2 className="y2k-title mt-5 text-[clamp(2rem,5.5vw,3.6rem)]">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-xl text-white/65">{sub}</p>}
    </div>
  );
}

/** Floating decorative bubbles */
export function Y2kBubbles() {
  return (
    <>
      <div className="y2k-bubble y2k-float left-[6%] top-[12%] h-20 w-20" style={{ animationDelay: "0s" }} />
      <div className="y2k-bubble y2k-float right-[8%] top-[30%] h-12 w-12" style={{ animationDelay: "1.5s" }} />
      <div className="y2k-bubble y2k-float bottom-[18%] left-[12%] h-14 w-14" style={{ animationDelay: "3s" }} />
      <div className="y2k-bubble y2k-float right-[14%] top-[8%] h-8 w-8" style={{ animationDelay: "4.2s" }} />
    </>
  );
}
