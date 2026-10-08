"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { editorialContent, type ChapterId } from "@/data/editorial-content";
import { chapters } from "@/data/editorial-content";

export function ChapterHeader({ id }: { id: ChapterId }) {
  const { isVi } = useLanguage();
  const chapter = editorialContent.chapters[id];
  const index = chapters.find((c) => c.id === id)?.index ?? "";

  return (
    <div className="ed-chapter">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-[var(--ed-hairline)] pb-5">
        <div className="flex items-baseline gap-4 sm:gap-5">
          <span className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
            {index}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ed-ink)]">
            {isVi ? chapter.title.vi : chapter.title.en}
          </h2>
        </div>
        <p className="hidden md:block max-w-sm text-right text-sm leading-relaxed text-[var(--ed-muted)]">
          {isVi ? chapter.description.vi : chapter.description.en}
        </p>
      </div>
      <p className="md:hidden pt-4 text-sm leading-relaxed text-[var(--ed-muted)]">
        {isVi ? chapter.description.vi : chapter.description.en}
      </p>
    </div>
  );
}
