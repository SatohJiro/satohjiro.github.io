"use client";
import React from "react";

export function Chapter({ no, title, children, wide }: {
  no: string; title: string; children: React.ReactNode; wide?: boolean;
}) {
  return (
    <section className={`mx-auto px-4 py-20 sm:px-6 ${wide ? "max-w-6xl" : "max-w-4xl"}`}>
      <p className="mono-chapter text-center">{no}</p>
      <h2 className="mono-title mt-4 text-center text-[clamp(2rem,5vw,3.2rem)]">{title}</h2>
      <div className="mono-rule mx-auto mt-6 max-w-xs" />
      <div className="mt-12">{children}</div>
    </section>
  );
}
