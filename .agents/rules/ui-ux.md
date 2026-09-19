# UI/UX RULES & DESIGN INTELLIGENCE

> **Repository:** SatohJiro Portfolio  
> **Framework:** The APEX Master Framework & Anti-Slop Design Intelligence  
> **Styling:** Tailwind CSS v4 + High-Performance Glassmorphism Primitives  
> **Typography:** Plus Jakarta Sans (`--font-sans`) & JetBrains Mono (`--font-mono`)

---

## 1. THE 3 DESIGN DIALS (RECALIBRATED)

Every user-facing modification must conform to the established dials for this senior software engineer portfolio:

- **`DESIGN_VARIANCE: 4/10` (Disciplined Precision):** Clean, deliberate structure. Avoid whimsical decorative layouts. Ensure information hierarchy is immediately clear to technical recruiters, senior architects, and engineering managers.
- **`MOTION_INTENSITY: 5/10` (Smooth Micro-Interactions):** Fast, buttery transitions (150ms - 250ms). Subtle 3D card tilt on hover (`useTilt.ts`). Strictly respect `prefers-reduced-motion` media queries.
- **`VISUAL_DENSITY: 6/10` (Compact Technical Elegance):** Balanced information density. No oversized, wasteful empty space, but sufficient breathing room for scanning technical achievements.

---

## 2. THE LILA RULE & COLOR PALETTE

Strictly prohibit generic AI neon gradients (purple/magenta/cyan clashes). The repository is anchored on a sophisticated neutral slate palette with a singular high-contrast electric blue accent:

| Token | Light Mode (`:root`) | Dark Mode (`.dark`) | Usage |
| :--- | :--- | :--- | :--- |
| `--background` | `#f8fafc` (Slate 50) | `#090d16` (Deep Midnight Slate) | Full viewport body background |
| `--foreground` | `#0f172a` (Slate 900) | `#f8fafc` (Slate 50) | Primary headlines and high-contrast text |
| `--card-bg` | `rgba(255, 255, 255, 0.96)` | `rgba(15, 23, 42, 0.78)` | Glassmorphism cards and drawers |
| `--card-border` | `rgba(15, 23, 42, 0.10)` | `rgba(255, 255, 255, 0.08)` | Subtle translucent card borders |
| `--text-muted` | `#475569` (Slate 600) | `#94a3b8` (Slate 400) | Secondary body copy and captions |
| `--accent-indigo` | `#2563eb` (Blue 600) | `#3b82f6` (Blue 500) | **Primary Brand Accent (Electric Blue)** |
| `--accent-emerald`| `#059669` (Emerald 600) | `#10b981` (Emerald 500) | Live status indicators, success states |
| `--accent-amber`  | `#d97706` (Amber 600) | `#f59e0b` (Amber 500) | Awards, honors, and priority tags |

---

## 3. HERO VIEWPORT & EYEBROW DISCIPLINE

1. **Hero Viewport Containment:**
   - The hero section MUST fit completely within the initial screen view without forcing the user to scroll (`min-h-[100dvh]`, never `h-screen` due to mobile browser URL bar bugs).
   - Headline: Maximum 2 lines.
   - Lead description: Strictly under 20 words.
   - Hero stack: Maximum 4 visual items (Title, Tagline, Call-to-Action buttons, Social links).

2. **Eyebrow Badge Discipline:**
   - Maximum 1 uppercase pill badge / eyebrow per 3 consecutive sections.
   - Eliminate visual badge fatigue; let section headings speak for themselves.

---

## 4. SHARED DESIGN PRIMITIVES (`src/components/glass/`)

Never create bespoke ad-hoc card styles. Always reuse established primitives:

- **`GlassCard`:** Translucent container utilizing `.glass-panel` with subtle backdrop blur and border.
- **`GlassButton`:** Button supporting `primary`, `secondary`, and `ghost` variants with tactile active states and focus rings.
- **`GlassBadge`:** Compact metadata tag with subtle background tint and technical bracketed labels (`[Honor]`, `[Priority]`).
- **`GlowSpotlight`:** Ambient background radial spotlight giving life to the dark slate canvas without layout interference.

---

## 5. RESPONSIVE BREAKPOINTS & VIEWPORTS

| Viewport | Tailwind Prefix | Expected Layout Behavior |
| :--- | :--- | :--- |
| Mobile (<640px) | Default | 1-column layout, touch target >=44px, hamburger slide-out menu, zero horizontal overflow |
| Tablet (640px - 1023px) | `sm:`, `md:` | 2-column bento grids, balanced padding, adaptive font sizes |
| Desktop (>=1024px) | `lg:`, `xl:` | Multi-column layouts, floating pill navbar, 3D tilt effects active |

---

## 6. ACCESSIBILITY (WCAG AA) & BILINGUAL RESILIENCE

1. **Focus Rings:** All interactive elements must show a distinct focus ring on keyboard navigation:
   `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`
2. **Accessible Names:** Icon-only buttons (theme toggle, language switch, GitHub/LinkedIn icons) MUST have explicit `aria-label` attributes.
3. **Bilingual Parity:** All UI text must accommodate length expansion between English and Vietnamese without clipping or overflowing container bounds.
