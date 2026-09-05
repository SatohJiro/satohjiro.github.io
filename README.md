# Nguyen Tran Anh (SatohJiro) — Personal Portfolio & Engineering Showcase

[![Deploy to GitHub Pages](https://github.com/SatohJiro/satohjiro.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/SatohJiro/satohjiro.github.io/actions/workflows/deploy.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tests-11%20Passed-brightgreen?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Privacy: Zero Tracking](https://img.shields.io/badge/Privacy-Zero%20Tracking-emerald?style=flat-square)](https://satohjiro.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-slate?style=flat-square)](LICENSE)

> Production-grade personal portfolio and engineering showcase designed for **Nguyen Tran Anh (SatohJiro)** — Software Engineer & Class Valedictorian of Nong Lam University (GPA 3.6/4.0). Built with strict performance, accessibility (WCAG AA), anti-slop design discipline, and zero-compromise information security.

🌐 **Production Deployment:** [https://satohjiro.github.io/](https://satohjiro.github.io/)  
🎮 **Alternative 8-Bit Pixel Edition:** [https://pixel-portfolio-swart.vercel.app/](https://pixel-portfolio-swart.vercel.app/)

---

## 1. Architectural & Engineering Highlights

| Feature | Technical Implementation |
| :--- | :--- |
| **Glass Design Primitives** | Custom design tokens (`GlassCard`, `GlassBadge`, `GlassButton`, `GlassModal`) running on Tailwind CSS v4 without legacy config bloat. |
| **Anti-Slop Design Discipline** | Adheres to the **Lila Rule**: Slate neutral backdrop (`#090d16` / `#f8fafc`) paired with a single Electric Blue accent (`#2563eb`), strictly avoiding AI purple/cyan gradient slop. |
| **ATS-Standard Resume Engine** | Dedicated standalone route (`/resume`) with CSS print-media queries, exact standard typography, and clean one-click PDF generation. |
| **Interactive Terminal Sandbox** | In-browser command runner (`whoami`, `skills`, `experience`, `projects`, `awards`, `contact`, `hire`) using semantic text tags (`[Honor]`, `[Award]`, `[Priority]`) without emoji clutter. |
| **Bilingual Data Synchronization** | Seamless EN/VI localized state transitions backed by Vitest unit tests verifying bilingual schema symmetry. |
| **Zero-Cookie Privacy Telemetry** | 100% client-side in-memory interaction inspector. Zero third-party trackers, no analytics pixels, no IP persistence, and no cookies. |
| **Static-First Performance** | App Router with Turbopack static export (`output: 'export'`) resulting in zero cold starts and instant CDN delivery. |

---

## 2. Technology Stack

```
Frontend Architecture
├── Core Framework: Next.js 16.3 (App Router, Static HTML Export)
├── UI Runtime: React 19.2 (Server & Client Components)
├── Language: TypeScript 5 (Strict Mode enabled)
├── Styling Engine: Tailwind CSS v4 + PostCSS
├── Icons & FX: Lucide React, Canvas Confetti
├── Quality & Testing: Vitest 3 + ESLint 9
└── CI/CD & Hosting: GitHub Actions → GitHub Pages CDN
```

---

## 3. Repository Structure

```
satohjiro.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD deployment pipeline for GitHub Pages
├── public/                       # Optimized static assets, manifest, and icons
├── src/
│   ├── app/
│   │   ├── globals.css           # Tailwind v4 theme bindings & typography tokens
│   │   ├── layout.tsx            # Root layout with Schema.org JSON-LD & meta
│   │   ├── manifest.ts           # Dynamic PWA Web App Manifest (force-static)
│   │   ├── page.tsx              # Main single-page portfolio layout
│   │   ├── resume/
│   │   │   └── page.tsx          # Standalone ATS print-optimized resume route
│   │   ├── robots.ts             # Search engine crawling policies
│   │   └── sitemap.ts            # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── analytics/            # In-memory client-side telemetry inspector
│   │   ├── glass/                # Reusable glassmorphic UI tokens
│   │   ├── layout/               # Header, Footer, Theme & Language toggles
│   │   ├── resume/               # ATS interactive resume modal
│   │   └── sections/             # Domain sections (Hero, About, Projects, Experience, CLI)
│   ├── config/
│   │   ├── seo.ts                # JSON-LD Schema definitions (Person & WebSite)
│   │   └── site.ts               # Site metadata, routes, and navigation items
│   ├── data/
│   │   └── portfolio-content.ts  # Single source of truth for EN/VI portfolio data
│   ├── hooks/                    # Custom hooks (Language, Telemetry, Responsive)
│   ├── lib/                      # Core utilities and telemetry handlers
│   └── types/                    # TypeScript interfaces and domain schemas
├── CONTEXT.md                    # Project context & Architectural Decision Records (ADR)
├── vitest.config.ts              # Unit test runner configuration
├── next.config.ts                # Next.js export & basePath configurations
└── package.json                  # Dependencies and execution scripts
```

---

## 4. Local Development & Verification

### Prerequisites
- Node.js 20.x LTS or higher
- npm 10+ (or pnpm / yarn)

### Quickstart

```bash
# 1. Clone repository
git clone https://github.com/SatohJiro/satohjiro.github.io.git
cd satohjiro.github.io

# 2. Install dependencies with verified lockfile
npm ci

# 3. Launch local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to inspect the site.

### Verification Suite

```bash
# Run unit test suite
npm run test

# Run static linting
npm run lint

# Compile production static export
npm run build
```

---

## 5. Information Security & Privacy (InfoSec / OPSEC)

This repository enforces strict security and data protection standards:

1. **Anti-Scraping & PII Protection**:
   - Personal phone numbers and home addresses are intentionally omitted from public git trees and Markdown documentation to prevent automated web crawlers, spam bots, telemarketing harvesters, and SIM-swapping threats.
   - Contact requests are routed through verified professional endpoints (LinkedIn, professional email, or interactive portfolio form).
2. **Secret Hygiene**:
   - No production credentials, API secrets, private keys, or internal webhook URLs are stored in source code.
   - Repository builds are fully static and do not require runtime secrets.
3. **Telemetry & Privacy Standard**:
   - Operates with **Zero Third-Party Trackers** (no Google Analytics, no Meta Pixel, no Fingerprinting).
   - In-memory event dispatching only collects client interaction metrics locally within the browser session for interactive demonstration. No user data is transmitted to external servers.
4. **Dependency & Supply Chain Security**:
   - Dependencies are tracked with exact lockfile pinning (`package-lock.json`).
   - GitHub Actions workflow runs with minimal read-only token permissions, elevating only the `pages: write` and `id-token: write` scopes during verified deployment jobs.

---

## 6. Vulnerability Disclosure

If you identify any security issues, vulnerabilities, or unintentional credential exposure within this repository, please report it responsibly:

- **Security Contact**: Open a private advisory on GitHub via **Security** → **Advisories** → **Report a vulnerability**, or email `trananhq2345@gmail.com` with the subject `[SECURITY ISSUE] satohjiro.github.io`.
- Please include reproduction steps and avoid opening public issues for sensitive security reports until remediation is completed.

---

## 7. Verified Channels

- **Website**: [https://satohjiro.github.io/](https://satohjiro.github.io/)
- **LinkedIn**: [linkedin.com/in/satohjiro](https://www.linkedin.com/in/satohjiro/)
- **GitHub**: [github.com/SatohJiro](https://github.com/SatohJiro)
- **Email**: [trananhq2345@gmail.com](mailto:trananhq2345@gmail.com)

---

## 8. License

This project is licensed under the [MIT License](LICENSE).
