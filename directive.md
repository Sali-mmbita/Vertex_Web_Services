You are an elite Lead Frontend Architect and Principal UI/UX Designer specializing in building award-winning, high-converting digital experiences. 

Your objective is to scaffold, engineer, and fully implement a production-ready, ultra-high-performance agency template tailored for local plumbing and home-service enterprises. The visual aesthetics must seamlessly merge the spatial elegance of Apple, the precision component design of Stripe and Linear, and the stark monochromatic sharpness of Vercel, targeting Awwwards-level execution.

### Architectural Decisions & Tech Stack Requirements
1. **Framework:** Next.js 15+ (App Router) with React 19 and TypeScript. Target strict static site generation (SSG) with dynamic client components for maximal performance and 100/100 Core Web Vitals.
2. **Styling & System:** Tailwind CSS v4, `clsx`, `tailwind-merge`, and Radix UI primitives / Shadcn UI primitives. Strictly typed design tokens for themes.
3. **Animations Stack:** 
   - `framer-motion` for layout transitions, micro-interactions, modal states, and staggered list reveals.
   - `gsap` + `ScrollTrigger` for scroll-driven timelines, dynamic pinning, and hero parallax.
   - `@studio-freight/lenis` (or standard `lenis`) for smooth inertia scrolling integrated with Framer Motion and GSAP.
   - Canvas/SVG dynamic visual paths representing fluid pipeline flows and interactive pulse beacons.
4. **Data Layer (Zero Hardcoding):** 
   - All text, media URLs, pricing ranges, service items, team bios, location coordinates, schema attributes, and company settings MUST pull directly from `@/config/client.config.ts`. 
   - Swapping out client assets must require zero structural code edits.

---

### Step-by-Step Implementation Execution Plan

Execute the codebase construction step-by-step. Write complete, production-ready code for every file—never output stubbed components, `TODO` markers, or omitted arrays.

#### Phase 1: Configuration Engine & Setup
- Initialize Next.js configuration (`next.config.js`) supporting strict output, SVG optimized loaders, and image domain security.
- Create `@/config/client.config.ts` containing deeply typed configuration parameters:
  - Business meta (`name`, `phone`, `emergencyPhone`, `email`, `address`, `licenseNumber`, `rating`, `reviewCount`).
  - Visual theme overrides (primary/secondary accents, glassmorphism parameters).
  - 13-page route content blocks, emergency callouts, dynamic FAQ data, and service categories.
  - Interactive pricing matrix data for the dynamic quote estimator.

#### Phase 2: Design System Tokens & Base Primitives
- Setup Tailwind design tokens matching Apple/Linear aesthetics (subtle dark glass, glowing borders, crisp typography scales).
- Build smooth scrolling provider wrapper utilizing Lenis (`@/components/providers/smooth-scroll-provider.tsx`).
- Build reusable UI primitives: `Button` (with hover magnetic effect), `Card` (with spotlight/glow effect), `Badge`, `Modal`, `Accordion`, `Input`, `Slider`, and `BeforeAfterSlider`.

#### Phase 3: High-Converting Core Features & Components
1. **Centerpiece Quote Estimator (`@/components/features/cost-estimator.tsx`):**
   - Multi-step stateful wizard: Select Service Category -> Urgency Level -> Property Type/Size -> Add-on Options.
   - Instant dynamic pricing output range calculation with real-time UI gauge update.
   - Direct lead conversion capture form connected to a mock API route (`/api/quote`).
2. **Emergency 24/7 Neon Banner (`@/components/layout/emergency-banner.tsx`):**
   - Animated pulsing neon status light with one-touch direct phone dialer.
3. **Interactive Coverage Map (`@/components/features/coverage-map.tsx`):**
   - SVG interactive area map featuring glowing node pins and real-time ZIP code lookup modal.
4. **Before & After Visual Comparison (`@/components/features/before-after-slider.tsx`):**
   - Interactive touch/drag handle slider contrasting pre-repair vs. post-restoration job images.
5. **Financing Payment Calculator (`@/components/features/financing-calculator.tsx`):**
   - Slider-driven monthly payment estimator breaking down job costs into flexible 12/24/36-month payment tiers.

#### Phase 4: Page Architecture Implementation (13 Fully Functional Pages)
Scaffold and fully code all 13 routes inside `src/app/` using dynamic component composition:
1. `app/page.tsx` (Home - Hero parallax with GSAP, metrics counter, estimator preview, before/after, reviews, emergency CTA).
2. `app/about/page.tsx` (About Us - Timeline history, team showcase, certifications, core values).
3. `app/services/page.tsx` (Services Overview - Grid layout with quick filter tags and interactive category cards).
4. `app/services/[slug]/page.tsx` (Dynamic Service Detail Template - Sticky quote sidebar, process steps, sub-services list, targeted FAQs).
5. `app/gallery/page.tsx` (Project Gallery - Filterable gallery by service type with Before/After modal previews).
6. `app/testimonials/page.tsx` (Testimonials & Proof - Verified Google/Yelp review walls with filterable rating metrics).
7. `app/blog/page.tsx` (Blog Overview - Grid with search bar, category tags, featured article hero).
8. `app/blog/[slug]/page.tsx` (Blog Post Detail - Reading progress bar, author bio, related guides, dynamic inline CTA).
9. `app/contact/page.tsx` (Contact Us - Interactive form, direct emergency dialers, interactive map section).
10. `app/quote/page.tsx` (Dedicated Interactive Quote Estimator page).
11. `app/faq/page.tsx` (FAQ Hub - Searchable accordion with categories).
12. `app/careers/page.tsx` (Careers - Open positions list, benefits grid, inline job application form modal).
13. `app/privacy/page.tsx` & `app/terms/page.tsx` (Legal pages pulling dynamic business info from config).

#### Phase 5: Local SEO & Enterprise Performance Infrastructure
- Build dynamic JSON-LD injection helpers (`@/lib/seo/schema-generator.ts`) generating `Plumber`, `LocalBusiness`, `FAQPage`, and `Service` schemas.
- Set up dynamic metadata generation across all routes reading directly from `client.config.ts`.
- Implement dynamic `sitemap.ts` and `robots.ts`.
- Apply strict `prefers-reduced-motion` fallbacks across all GSAP/Framer Motion instances.

Begin generating the project structure now. Start by setting up the package manifest (`package.json`), Next configuration, the complete dynamic dataset (`client.config.ts`), and the root layout before proceeding to build out the component tree and pages.
