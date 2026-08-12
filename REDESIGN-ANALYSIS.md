# Smart AI Agency — Full Codebase Analysis & 3D Redesign Brief

Repo: `khubaibcodes/smart-ai-agency` · single commit `a967f58` (2026-08-01) · ~3,771 LOC (app + components + lib + hooks)
Analyzed: 2026-08-12. Clone location: scratchpad (temporary — see "Open decisions").

---

## 1. What this project is

Marketing site + lead-capture funnel for **Smart AI Solutions** (brand name in code) / domain **genzai.agency**.
Boutique AI automation agency, owner Khubab, Palmerston North NZ, serving international clients + local SMBs.

Sells 8 services: RAG Agents · Voice AI · Claude AI Agents · n8n Workflows · SharePoint Integration · Workflow Automation · Custom AI Agents · AI Consulting.

Business goal of the site: get a visitor to book a *free 30-minute discovery call* → contact form → Supabase row.
**That is the only conversion path.** Everything else is persuasion surface.

---

## 2. Architecture map

```
app/
  layout.tsx              root: Inter font, 3× JSON-LD schemas, PageLoader, skip-link
  globals.css             284 lines — the entire design system
  (marketing)/            route group; Navbar + Footer wrapper
    page.tsx              HOME  → Hero · TechBar · ServicesPreview · Claude · Pricing · Testimonials · CTA · Resources
    services/ about/ pricing/ contact/ privacy/ terms/
  api/contact/route.ts    POST → Zod re-validate → Supabase insert → JSON
  sitemap.ts robots.ts    generated from lib/seo.ts SITEMAP_ROUTES

components/
  layout/      Navbar (scroll-spy + mobile sheet), Footer, LegalDocument
  sections/    15 files, one default export each — pure presentational
  ui/          17 shadcn primitives + brand helpers (button, card, accordion, select…)
  common/      ContactDetails, StatsGrid
  forms/       ContactForm (186 LOC, the most complex client component)

lib/
  constants/   agency.ts · content.ts · services.ts · legal.ts   ← ALL copy lives here
  seo.ts       rootMetadata + createPageMetadata() + sitemap routes
  types.ts     14 content interfaces (ServiceDetail, PricingTier, Stat…)
  validation/  contact.ts — one Zod schema shared by client form AND API route

hooks/  useScrolled · useScrollSpy · useBodyScrollLock
legacy/ original static HTML site, archived, not built
```

### What's genuinely good here (keep it)
- **Content/presentation separation is clean.** Every string lives in `lib/constants/`. A full visual rebuild can happen without touching a single word of copy.
- **Typed content model.** `lib/types.ts` gives 14 interfaces — new sections get compile-time safety for free.
- **One Zod schema, two consumers** (form + API). No drift possible.
- **Derived constants** — `FOOTER_SERVICE_LINKS` and `HOME_SERVICE_HIGHLIGHTS` are computed from `SERVICES`, so the catalog has one source of truth.
- **SEO is real, not decorative** — canonical URLs, OG/Twitter, dynamic sitemap, robots, Organization + WebSite + ProfessionalService + FAQ JSON-LD.
- **Server Components by default.** Only 5 files are `"use client"` (Navbar, HeroSection, ContactForm, AnimateOnScroll, AnimatedStat, PageLoader). Bundle is small.
- **A11y basics present** — skip-link, `aria-label`s, `aria-expanded`, `aria-hidden` on decorative icons.

---

## 3. Design system audit — `app/globals.css`

**Theme:** warm charcoal + amber/bronze. Dark-only (no light mode, no `data-theme` switch).

| Token | Value | Role |
|---|---|---|
| `--brand-primary` | `#d9a15b` | the single accent — amber/bronze |
| `--brand-primary-dark` | `#a8763c` | gradient end |
| `--brand-accent` | `#e8c89a` | light sand highlight |
| `--brand-bg` / `--brand-bg-2` | `#0b0b0d` / `#0f0f11` | page / alternating band |
| `--brand-card` / `--brand-elevated` | `#151517` / `#18181b` | surfaces |
| `--brand-text` / `-muted` / `-dim` | `#e8e4dc` / `#a19c92` / `#8a8680` | type scale |
| `--border` / `--input` | `rgba(232,228,220,.09 / .12)` | translucent cream hairlines |
| `--ring` | `rgba(217,161,91,.45)` | focus |
| `--radius` | `0.75rem` | + sm/md/lg/xl derived |

Wired into Tailwind v4 via `@theme inline` → `bg-brand-card`, `text-brand-primary` etc.

**Existing depth/motion vocabulary** (already there, currently under-used):
- `.gradient-text` — `#f0dcc0 → #d9a15b → #b8823f` at 100°
- `.hero-shell` / `.hero-spotlight` / `.hero-vignette` — layered radial gradients
- `.hero-grid` / `.hero-grid-mask` — 48px/72px grid with radial mask
- `.glass-card` — border + `bg-brand-card/80` + `backdrop-blur-sm`
- `.hero-stats-bar` — pill, blur(12px), translucent
- `.hero-particle-1/2/3` + `@keyframes particle-float` — **defined in CSS, never rendered in JSX (dead code)**
- `animate-float`, `animate-pulse-glow`, page-loader keyframes

**Verdict on visual depth today: 2D + blur.** Everything is flat cards on a dark background with radial glows. There is **zero real 3D** — no canvas, no WebGL, no perspective transforms, no parallax. `gsap` + `@gsap/react` are installed but used in exactly one file (`animated-stat.tsx`, a count-up). That's a heavyweight dependency paying for a number counter.

**Section rhythm is monotonous:** every section is `section-padding` → `SectionHeader` → `grid` of `Card`s, alternating `bg-brand-bg` / `bg-brand-bg-2`. Six sections in a row use the identical shape. This is the single biggest reason the site reads "template" rather than "studio."

---

## 4. Content & credibility audit ⚠️

These are **factual problems**, not style ones, and they matter more than the redesign:

1. **Outdated model claims.** `ClaudeSection.tsx` and `services.ts` advertise *"Claude Sonnet 4.6 & Opus 4.6 — latest models"* and *"200,000 token context"*. As of now the current family is **Claude 5 (Opus 5 / Sonnet 5 / Fable 5)** plus Haiku 4.5. An AI agency whose site names a superseded model generation is self-defeating — it's the first thing a technical buyer checks.
2. **`"never hallucinating"`** (services.ts, Claude section). This is a false absolute claim. For an AI consultancy this is a trust liability, and it contradicts your own `.claude/rules/ai-services.md` which sensibly mandates citations and human escalation. Replace with "citation-backed, with grounded-answer guardrails."
3. **`TECH_STACK` lists "OpenAI GPT-4"** — two generations stale. Reads as a stack frozen in 2024.
4. **Unverifiable stats** — `30+ Projects`, `5+ International Clients`, `80% Average Time Saved`, plus 3 named testimonials. If these aren't real, they're a legal/reputational risk in NZ (Fair Trading Act) and are the kind of thing enterprise buyers probe. Decide: substantiate or soften.
5. **Missing OG image.** `lib/assets.ts` points at `/og-image.png`; `public/` contains only `favicon.svg` and `apple-icon.svg`. **Every social/Slack/WhatsApp share of this site is currently broken.** Highest ROI 10-minute fix on the whole list.
6. **`AGENCY.phone` is empty string** — `ContactDetails` renders around it, but there's no phone anywhere. For an agency selling *Voice AI*, having no phone number is an ironic conversion leak.
7. **Brand name collision.** Code says "Smart AI Solutions", repo says smart-ai-agency, domain is genzai.agency, and there's a separate `GenZai` repo. Three identities. Pick one before the redesign or the new design bakes in the confusion.
8. **Resources section links** point at pages that may not exist — worth verifying (`RESOURCE_CARDS[].href`).

---

## 5. Technical gaps & risks

| Area | Finding |
|---|---|
| **Contact form** | No rate limiting, no CAPTCHA/honeypot on a public POST → spam-bot target. No email notification — leads sit in Supabase unseen. `.claude/rules` even asks for lead notification; it's on the roadmap, unbuilt. |
| **Error handling** | API returns 503 "not configured" if env vars missing — the form silently fails in any environment without Supabase set up. |
| **`PageLoader`** | 140 LOC of manual `document.body.style` scroll-locking and route-change interception. Fragile, fights the browser, duplicates `useBodyScrollLock`, and adds a fake loading screen to a static site that's already fast. **Strong candidate for deletion** — it *hurts* perceived performance. |
| **Duplicate scroll-lock** | `useBodyScrollLock` hook AND PageLoader's own lock can both run. Conflict risk. |
| **GSAP cost** | ~50kb+ for one count-up. Either use it properly in the 3D redesign or drop it for a Framer Motion `useSpring`. |
| **Dead CSS** | `.hero-particle-*` classes + keyframes never rendered. |
| **No light mode** | Fine as a deliberate choice, but the token structure doesn't support adding one later without a rewrite. |
| **No tests, no CI** | Zero. Acceptable for a marketing site; worth a `npm run build` GitHub Action at minimum. |
| **Next.js 16** | `next@16.2.4` / React 19.2.4. Per `AGENTS.md`: **read `node_modules/next/dist/docs/` before writing any code** — this generation has breaking changes vs. training data (async APIs, caching semantics, `ssr:false` dynamic import rules in RSC). Must `npm install` and read before we touch routing/data code. |
| **Images** | `next.config.ts` sets avif/webp formats but there are **no images in the project at all**. Every "visual" is a Lucide icon. `ServiceDetailSection` renders a 96px icon in a 288px box as its "image" — that's the weakest visual moment on the site. |

---

## 6. "Latest AI website 3D style" — the 2026 technology landscape

This is the part you asked me to describe. Here's the honest state of the art, and what each option actually costs.

### 6.1 The rendering layer

| Tech | What it is | Bundle | When it's right |
|---|---|---|---|
| **Three.js + React Three Fiber v9** (`@react-three/fiber`, `@react-three/drei`) | Declarative React wrapper over Three.js. Full scene graph, GLTF models, physics, post-processing. | ~150–400kb gz | Real geometry: a rotating agent-network mesh, a scroll-scrubbed 3D product, GLTF assets. |
| **WebGPU + TSL (Three Shading Language)** | Three.js `WebGPURenderer` with node-based shaders that compile to WGSL *and* GLSL fallback. Compute shaders → 100k+ GPU particles at 60fps. | ~200kb+ | The genuinely "2026" look — GPU particle fields, fluid/flow simulations. Chrome/Edge good, Safari 18+ partial → **always needs a WebGL fallback path**. |
| **Raw fullscreen fragment shader** (OGL, or three.js minimal) | One `<canvas>`, one quad, one shader. Noise/flow-field/iridescent gradient mesh. | ~15–45kb gz | **Best effort:reward ratio.** 90% of the "AI site" aesthetic (living gradient, neural noise, aurora) with a fraction of the weight. |
| **Spline / Rive** | Designer tools; embed a runtime. Spline = 3D scenes, Rive = interactive vector motion. | 300kb–1.5MB (Spline) | Fast to ship if you *design* rather than code. Spline's weight is real and hurts LCP. Rive is lighter and excellent for a logo/voice-orb. |
| **CSS 3D + scroll-driven animations** | `transform-style: preserve-3d`, `perspective`, `@property`, native `animation-timeline: view()` / `scroll()`, `@scope`. Zero JS. | 0kb | Card tilt, layered parallax, depth on scroll. Now baseline in all evergreen browsers. Massively underrated — pairs perfectly with your existing token system. |

### 6.2 The motion layer

- **GSAP + ScrollTrigger** (already installed) — the standard for scroll-scrubbed timelines and pinned 3D sequences. Free for commercial use since the Webflow acquisition.
- **Lenis** — smooth/inertial scroll, ~3kb, the de-facto pairing with ScrollTrigger for premium-feeling scroll.
- **Framer Motion 12** (already installed) — `useScroll`, `useTransform`, `useSpring`, layout animations, `<AnimatePresence>`. Handles everything DOM-side.
- **View Transitions API** — native cross-route morphing, now usable in Next.js App Router. Would replace `PageLoader` with something that's actually modern *and* faster.

### 6.3 The visual language of AI-era sites right now

What the top-tier AI/agency sites (Anthropic, Vercel, Linear, Runway, ElevenLabs, Cursor, Perplexity tier) are actually doing in 2026:

- **Living gradient mesh backgrounds** — slow, organic, shader-driven color fields instead of static radial blurs. Your `.hero-spotlight` is the static ancestor of this.
- **Particle / neural constellation fields** — GPU points connected by proximity lines, drifting, mouse-reactive. The literal "AI" signifier.
- **Depth through layered translucency** — not drop-shadows. Stacked glass planes at different z, subtle parallax on mouse + scroll.
- **Scroll-scrubbed 3D hero** — an object or scene whose rotation/assembly is bound to scroll progress, pinned for 100–200vh.
- **Bento grids** — asymmetric, varied-size feature tiles. The direct antidote to your current uniform 3-column card walls.
- **Animated gradient borders + spotlight-follows-cursor cards** — cheap, high-perceived-polish, pure CSS/`@property`.
- **Live product proof, not screenshots** — a working streaming-text agent demo, an audio-reactive voice orb, an animated n8n-style node graph that runs. For *your* business this is the killer move: you sell RAG/Voice/workflows — **show them running in the hero.**
- **Chromatic aberration / iridescence** — thin-film shader tints on edges and text. Signals "rendered, not designed."
- **Kinetic typography** — per-character reveals, variable-font weight animation on scroll.
- **Trust markers as first-class UI** — model badges, latency numbers, "SOC2/GDPR" chips, architecture diagrams. AI buyers in 2026 are skeptical; specificity converts.

### 6.4 The non-negotiable constraints

Anything we build has to survive these, or it's a downgrade:

- **`prefers-reduced-motion`** → full static fallback. Not optional; it's an a11y requirement and NZ public-sector buyers check.
- **Mobile** → detect low-power/small viewport, serve a static poster image or CSS-only version. A WebGL hero on a mid-range Android is a bounce.
- **LCP/INP budget** → the canvas must never be the LCP element. Text renders first, canvas fades in after. Lazy-init on `IntersectionObserver`, `dynamic(() => …, { ssr: false })`.
- **RSC boundary** → every 3D component is a client island. Keep the page shell server-rendered so SEO and first paint stay intact.
- **WebGL context loss** → handle it; a black rectangle where the hero was is worse than no hero.
- **SEO must not regress.** The current SEO setup is the site's strongest asset. All copy stays in DOM text, never baked into a canvas.

---

## 7. Three redesign directions

### A. "Shader Studio" — recommended
Fullscreen shader hero (flow-field/aurora in your amber-bronze palette) + CSS-3D depth + GSAP/Lenis scroll choreography + bento grids + one live agent demo. R3F used **nowhere** unless a specific section earns it.
- Weight: **+40–70kb**. LCP safe. Ships in days, not weeks.
- Gets ~85% of the "wow" for ~20% of the cost and risk.

### B. "Full R3F" — maximum impact
React Three Fiber scene: a persistent 3D neural/agent-network object, scroll-scrubbed and pinned, GLTF nodes for each service, post-processing bloom.
- Weight: **+250–400kb**, needs a real mobile fallback, real perf tuning, and 2–3× the build time.
- Justified only if the 3D object *is* the brand.

### C. "Spline embed" — fastest visually
Design the 3D scene in Spline, embed it.
- Fastest to a striking result, **worst** performance profile, least control, ongoing vendor dependency.

**My recommendation: A, with one R3F/WebGPU set-piece** (e.g. a GPU particle "knowledge graph" on the RAG service section) once A is shipped and measured.

---

## 8. Proposed work order

1. **Fix credibility first** (half a day, zero design risk): model names → Claude 5 family, kill "never hallucinating", refresh `TECH_STACK`, ship `og-image.png`, resolve brand name, decide on stats/testimonials.
2. **Foundation**: `npm install`, **read `node_modules/next/dist/docs/`**, verify build, add motion tokens + `prefers-reduced-motion` scaffolding to `globals.css`, delete `PageLoader` + dead particle CSS.
3. **Hero**: shader canvas + kinetic headline + live demo widget.
4. **Section rhythm**: break the card-wall monotony — bento services grid, spotlight cards, node-graph for n8n, waveform for Voice AI, pinned scroll sequence for one section.
5. **Depth pass**: layered parallax, animated gradient borders, cursor spotlight, View Transitions between routes.
6. **Real imagery**: the icon-in-a-box placeholders in `ServiceDetailSection` must become actual visuals.
7. **Hardening**: honeypot + rate limit on `/api/contact`, lead email notification, `npm run build` CI check.
8. **Measure**: Lighthouse/Core Web Vitals before vs. after. Non-negotiable gate.

---

## 9. Environment status — READY ✅

| Item | State |
|---|---|
| Repo path | `D:\smart-ai-agency` |
| Branch | `main` (was on `master` = the old static site; `origin/master` has been **deleted on GitHub**) |
| Branch safety | `main` = `master` + 1 commit. Nothing unique existed on `master`; `claude-seo/` and `wifimanager/` were empty dirs. Nothing lost. |
| Working tree | Clean, tracking `origin/main`, `origin/HEAD` repointed to `main` |
| Install | 420 packages. First attempt failed (`unrs-resolver` postinstall, `0xC0000142` DLL-init — sandbox blocking a native binary); succeeded unsandboxed. |
| Build | ✅ `next build` passes — 13 static routes + 1 dynamic (`/api/contact`), compile 67s, TS clean |
| Node / npm | v22.19.0 / 10.9.3 |
| `.env.local` | **Absent** — the contact form will return 503 locally until Supabase vars are set |

### Next.js 16 constraints confirmed from `node_modules/next/dist/docs/`

Read before writing 3D code — these differ from older Next.js knowledge:

- **`ssr: false` is NOT allowed in Server Components.** `next/dynamic(..., { ssr: false })` errors if called from an RSC. Every WebGL/canvas island therefore needs a thin `"use client"` wrapper that owns the dynamic import; the page itself stays a Server Component. This is *the* structural rule for the whole redesign.
- **When a Server Component dynamically imports a Client Component, automatic code splitting is not supported** — another reason to put the `dynamic()` call inside a client wrapper.
- `dynamic()` must be at module top level with a literal path — no template strings, no variables, not inside render.
- **Turbopack is the default builder.** Magic comments are `turbopackIgnore` / `turbopackOptional`; `webpackOptional` is unsupported. Relevant if a 3D lib needs runtime-only or optional imports.
- **`unstable_instant`** route export exists for instant client-side navigation (`02-guides/instant-navigation.md`). Suspense alone is not enough. This is the modern replacement for the hand-rolled `PageLoader` — worth reading properly before step 5 of the work order.
- App Router runs React canary internally, not the `package.json` React version.

---

## 10. Open decisions (for you, after your research)

1. **Brand:** "Smart AI Solutions" vs "GenZai" vs something else. Affects logo, copy, OG image, domain strategy.
2. **Direction A / B / C** above.
3. **Palette:** keep warm amber-bronze (distinctive — most AI sites are blue/violet, this is an advantage) or shift to the iridescent violet-cyan that reads more "AI"? I'd argue **keep the amber and lean into it** — differentiation beats convention here.
4. **Stats & testimonials:** real, or replace with something honest?
5. **Scope:** full redesign of all 7 pages, or home + services first?
6. **Supabase creds** — do you have them? Without `.env.local` the contact form returns 503 in local dev, so I can't test that path.
