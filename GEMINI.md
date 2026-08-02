# GEMINI.md — Enterprise Architecture & Development Guidelines

## 1. Architectural Overview & Design System Philosophy
This codebase represents an enterprise-grade, award-winning agency template built for local plumbing and home-service enterprises.

### Design Aesthetics & Visual Identity
- **Hybrid Aesthetic:** Merges **Apple** (clean spatial hierarchy, refined typography, pristine media framing), **Stripe/Linear** (glowing accents, crisp 1px borders, subtle dark mode gradients, micro-components), and **Vercel** (monochromatic precision, ultra-fast UI feedback).
- **Color Token System:** All colors use CSS variables mapped through Tailwind CSS v4. Never hardcode hex values inside components.
- **Glassmorphism:** Use subtle backdrop-blur utility combinations with semi-transparent border overlays (`border-white/10 dark:border-white/5`).

### Zero Hardcoding Policy
- **Central Data Source:** Absolutely all business information (branding, telephone numbers, address, service offerings, testimonials, gallery items, pricing models) MUST be sourced exclusively from `@/config/client.config.ts`.
- **Typing Integrity:** Any modification to business fields must be declared within the strict TypeScript interface `ClientConfig` defined in `@/types/config.ts`.

---

## 2. Coding & TypeScript Standards
- **Strict TypeScript:** Set `"strict": true` in `tsconfig.json`. Explicitly ban the use of `any`. Utilize `unknown` with narrowing or custom type guards where flexibility is necessary.
- **Component Patterns:**
  - Functional components with explicit prop interface declarations (`interface ButtonProps { ... }`).
  - Prefer named exports over default exports for components (excluding Next.js page route entry points).
  - Use modular sub-components for complex features (e.g., `<CostEstimator />` divided into `<StepSelection />`, `<UrgencyPicker />`, and `<EstimateSummary />`).
- **File Naming Conventions:**
  - React Components: `kebab-case.tsx` (e.g., `cost-estimator.tsx`)
  - Utilities/Hooks/Types: `kebab-case.ts` (e.g., `use-smooth-scroll.ts`, `schema-generator.ts`)
  - Server Actions/APIs: `route.ts` or `action.ts`

---

## 3. Animation Performance & Accessibility Rules

### Performance Guidelines
- **Lenis Smooth Scroll:** Initialize smooth scrolling globally via `@/components/providers/smooth-scroll-provider.tsx`. Ensure Lenis syncs frame rates with GSAP via `gsap.ticker`.
- **GSAP Context Cleanup:** Always wrap GSAP animations in a `gsap.context()` inside a `useLayoutEffect` or `useEffect` hook, executing `.revert()` upon component unmount to prevent memory leaks.
- **Framer Motion Optimization:** 
  - Prefer `transform` and `opacity` animations (`x`, `y`, `scale`, `opacity`) over height/width reflow triggers.
  - Utilize `layoutId` for shared element transitions.
  - Set `will-change: transform` sparingly on heavily animated nodes.

### Accessibility (a11y) & Reduced Motion
- **Accessibility Fallbacks:** Every animated element MUST respect user preferences for reduced motion using Tailwind's `motion-reduce:` modifiers or Framer Motion's `useReducedMotion()` hook.
- **Keyboard Navigation:** Custom controls (e.g., the Before/After slider and dynamic cost estimator inputs) must be fully accessible via keyboard (`Tab`, `Enter`, `Space`, `Arrow` keys) and carry appropriate ARIA roles (`role="slider"`, `aria-valuenow`, `aria-label`).

---

## 4. SEO & Schema Architecture

### Structured Data (JSON-LD)
Every route must automatically inject valid Schema.org JSON-LD scripts via `@/lib/seo/schema-generator.ts`.
- **Global Schema:** `Plumber` / `LocalBusiness` schema attached to root layout.
- **Service Pages:** `Service` and `OfferCatalog` schemas detailing specific service pricing and service areas.
- **FAQ Page & Accordions:** `FAQPage` schema automatically populated from `client.config.ts`.
- **Reviews & Testimonials:** `AggregateRating` schema attached to local business root data.

### Meta & OpenGraph Integration
- Implement Next.js Dynamic Metadata generation routines on all dynamic routes (`/services/[slug]`, `/blog/[slug]`).
- Metadata fields must reactively scale based on dynamic fields in `@/config/client.config.ts`.

---

## 5. Directory Structure Map

├── src/
│   ├── app/                         # Next.js App Router Routes
│   │   ├── (legal)/                 # Privacy & Terms routes
│   │   ├── about/                   # About page
│   │   ├── api/                     # Serverless endpoints (quote, contact)
│   │   ├── blog/                    # Blog grid & dynamic detail
│   │   ├── careers/                 # Careers listing page
│   │   ├── contact/                 # Contact page
│   │   ├── faq/                     # Searchable FAQ page
│   │   ├── gallery/                 # Project showcase page
│   │   ├── quote/                   # Dedicated Quote Estimator page
│   │   ├── services/                # Services index & dynamic detail
│   │   ├── testimonials/            # Reviews showcase page
│   │   ├── layout.tsx               # Root layout (Lenis, JSON-LD, ThemeProvider)
│   │   ├── page.tsx                 # Home page
│   │   ├── robots.ts                # Dynamic robots.txt
│   │   └── sitemap.ts               # Dynamic sitemap.xml generator
│   ├── components/
│   │   ├── features/                # Domain-specific interactive widgets
│   │   │   ├── before-after-slider.tsx
│   │   │   ├── cost-estimator.tsx
│   │   │   ├── coverage-map.tsx
│   │   │   ├── financing-calculator.tsx
│   │   │   └── whatsapp-widget.tsx
│   │   ├── layout/                  # Structural components (Navbar, Footer, Emergency Banner)
│   │   ├── providers/               # Lenis, Theme, and Motion providers
│   │   └── ui/                      # Design system primitives (Button, Card, Modal, Input)
│   ├── config/
│   │   └── client.config.ts         # SINGLE SOURCE OF TRUTH (Client data JSON/TS)
│   ├── hooks/                       # Custom hooks (use-scroll, use-estimator, use-media-query)
│   ├── lib/                         # Core utilities, GSAP setup, SEO schema builders
│   └── types/                       # Strictly typed Interfaces (Config, Services, Schema)
├── public/                          # Static fallback graphics, SVGs, and favicon assets
├── GEMINI.md                        # Master AI System Guidelines
├── next.config.js                   # Next.js engine configuration
├── tailwind.config.ts               # Theme tokens, custom animations, keyframes
└── tsconfig.json                    # Compiler flags and strict path aliases (@/*)

## 6. Git Commit Conventions & Code Quality Checklist

### Commit Message Syntax
Follow standard Conventional Commits rules:
- `feat(estimator): add property type multiplier to dynamic quote engine`
- `fix(seo): correct schema aggregate rating payload structure`
- `style(ui): update glow border parameters to match stripe component style`
- `perf(motion): apply reduced motion hook to hero gsap trigger timeline`

### Generation & Code Quality Checklist
Before finalizing any component or page generation cycle, verify:
1. [ ] **No Hardcoded Values:** Zero business phone numbers, strings, or image paths written directly in UI files.
2. [ ] **TypeScript Compliance:** Project compiles cleanly with zero `any` flags or missing properties.
3. [ ] **Responsiveness:** Validated visual integrity across Mobile (375px), Tablet (768px), Laptop (1024px), and Desktop (1440px+).
4. [ ] **Reduced Motion Support:** All framer-motion variants and GSAP scroll triggers feature fallbacks for `prefers-reduced-motion`.
5. [ ] **Interactive Accessibility:** All input controls and modals support keyboard trapping, escape handling, and appropriate ARIA roles.