# CODING STYLE RULES

> **Repository:** SatohJiro Portfolio  
> **Languages:** TypeScript 5.x, TSX, CSS (Tailwind v4)  
> **Principle:** Infer conventions from existing code. Maintain strict consistency with established idioms.

---

## 1. FILE & COMPONENT NAMING CONVENTIONS

- **React Components:** PascalCase file names and function names (e.g., `HeroSection.tsx`, `GlassButton.tsx`, `InteractiveTerminal.tsx`).
- **Hooks:** camelCase prefixed with `use` (e.g., `useLanguage.tsx`, `useScrollSpy.ts`, `useTelemetry.ts`).
- **Utilities & Config:** camelCase or kebab-case (e.g., `utils.ts`, `telemetry.ts`, `portfolio-content.ts`, `site.ts`).
- **Types:** Centralized in `src/types/index.ts` or scoped to the component with the naming convention `[ComponentName]Props` (e.g., `interface NavbarProps`).

---

## 2. IMPORT STRUCTURE & ALIASING

Always use the `@/` path alias pointing to `src/`. Do not use long relative traversals (e.g., `../../components`).

Organize imports into 4 distinct blocks separated by a single newline:
```typescript
// 1. React & Next.js core
import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// 2. Third-party packages
import { LucideIcon, Github, Linkedin, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

// 3. Internal modules via @/ alias
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { GlassCard } from "@/components/glass/GlassCard";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types";

// 4. Stylesheets (if applicable)
import "./custom.css";
```

---

## 3. REACT 19 & TYPESCRIPT CONVENTIONS

1. **Explicit Props Interfaces:**
   Always define an explicit interface for component props immediately above the component:
   ```typescript
   interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: "primary" | "secondary" | "ghost";
     size?: "sm" | "md" | "lg";
     icon?: React.ReactNode;
   }

   export function GlassButton({
     variant = "primary",
     size = "md",
     icon,
     children,
     className,
     ...props
   }: GlassButtonProps) {
     // ...
   }
   ```

2. **Strict Typing:**
   - Never use `any`. Use `unknown` with type guards or define explicit interfaces in `src/types/index.ts`.
   - Prefer discriminated unions for component state variants.

3. **Hooks & Effect Discipline:**
   - Always declare dependency arrays exhaustively.
   - Always return a cleanup function when subscribing to window events, intervals, or animation frames:
   ```typescript
   useEffect(() => {
     const handleResize = () => { /* ... */ };
     window.addEventListener("resize", handleResize, { passive: true });
     return () => window.removeEventListener("resize", handleResize);
   }, []);
   ```

4. **Class Merging:**
   Use the `cn()` helper from `@/lib/utils` for all dynamic or merged Tailwind class declarations:
   ```typescript
   className={cn(
     "glass-panel rounded-2xl p-6 transition-all duration-300",
     isActive && "border-blue-500/50 shadow-lg shadow-blue-500/10",
     className
   )}
   ```

---

## 4. UI TEXT & ACCENTS CONVENTIONS

1. **No Raw Emojis in Professional UI:**
   Strictly avoid raw emojis in terminal outputs, badge labels, or section titles. Use technical bracketed tags instead:
   - Bad: `🏆 Top Valedictorian`
   - Good: `[Honor] Top Valedictorian`
   - Bad: `🚀 Tech Stack`
   - Good: `[Priority] Tech Stack`

2. **Icon Usage:**
   Use SVG icons from `lucide-react` exclusively. Ensure every icon has appropriate dimensions (`w-4 h-4`, `w-5 h-5`) and accessible labeling when used inside icon-only buttons.

3. **Bilingual Copy Consistency:**
   Every user-facing string must be managed through `useLanguage()` and defined in `src/data/portfolio-content.ts` in both `vi` and `en`. Never hardcode raw strings in leaf components.
