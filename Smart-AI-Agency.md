# Smart AI Agency

Marketing website for **Smart AI Solutions** — AI automation agency serving international clients.

- **Live domain:** set `NEXT_PUBLIC_SITE_URL` in Vercel. Falls back to the Vercel production URL, then `smart-ai-agency.vercel.app` (see `lib/site-url.ts`)
- **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · Zod · Framer Motion · GSAP
- **Legacy static site:** `legacy/` (original HTML/CSS/JS — archived)

---

## Project structure

```
smart-ai-agency/
├── app/
│   ├── layout.tsx                 # Root layout, 3 fonts, global SEO, JSON-LD
│   ├── globals.css                # Brand design system (near-black + violet)
│   ├── opengraph-image.tsx        # Generated share card (build-time)
│   ├── twitter-image.tsx          # Re-export of the OG card
│   ├── sitemap.ts                 # Dynamic sitemap
│   ├── robots.ts                  # Dynamic robots.txt (AI crawlers named explicitly)
│   ├── llms.txt/route.ts          # Plain-language brief for AI answer engines
│   ├── api/contact/route.ts       # Contact API (honeypot + rate limit + Supabase)
│   └── (marketing)/               # Public pages + shared Navbar/Footer
│       ├── layout.tsx
│       ├── page.tsx               # Home
│       ├── voice-agents/page.tsx
│       ├── about/page.tsx
│       ├── services/page.tsx
│       ├── contact/page.tsx
│       ├── privacy/page.tsx
│       └── terms/page.tsx
├── components/
│   ├── common/                    # Shared composites (ContactDetails, StatsGrid)
│   ├── layout/                    # Navbar, Footer, LegalDocument
│   ├── sections/                  # One section per file (incl. VoiceDemo)
│   ├── forms/                     # ContactForm (shadcn)
│   └── ui/                        # shadcn primitives + brand helpers (kebab-case)
├── hooks/
│   ├── useScrollSpy.ts            # Homepage section highlighting
│   ├── useScrolled.ts             # Navbar scroll state
│   └── useBodyScrollLock.ts       # Mobile menu scroll lock
├── lib/
│   ├── constants/                 # Single source of truth for all content
│   │   ├── agency.ts              # Contact, nav, stats, tech stack, footer links
│   │   ├── content.ts             # Hero, Claude section, resources, team, FAQ
│   │   ├── services.ts            # Full service catalog
│   │   ├── demo.ts                # Agent console traces + workflow graph
│   │   ├── voice.ts               # Voice page, call scripts, voice FAQ
│   │   ├── media.ts               # Optional imagery registry
│   │   └── legal.ts               # Privacy & Terms
│   ├── validation/contact.ts      # Shared Zod schema (form + API)
│   ├── assets.ts                  # Favicon paths
│   ├── navigation.ts              # Active nav link resolver
│   ├── seo.ts                     # Metadata helpers, sitemap routes
│   ├── site-url.ts                # Canonical origin, resolved from the environment
│   ├── voice-call.ts              # Optional live-call bridge (Vapi), lazily loaded
│   └── types.ts
├── public/
│   ├── favicon.svg
│   └── images/                    # Optional media (see lib/constants/media.ts)
└── legacy/                        # Original static HTML site (reference only)
```

---

## Conventions

| Rule | Detail |
|------|--------|
| **Content** | Edit `lib/constants/` only — never hardcode agency info or copy in components |
| **Copy voice** | Outcome first, mechanism second. Lead with what the business owner saves, not the technique |
| **Model names** | Never hardcode a model version string anywhere. Use "Anthropic's most advanced models" or similar |
| **Domain** | Never hardcode it. `lib/site-url.ts` resolves the origin from `NEXT_PUBLIC_SITE_URL`, and everything canonical flows from there |
| **Nav links** | All navbar links go to **pages** (`/services`, `/about`, etc.) |
| **Home scroll-spy** | On `/`, navbar highlights sections `#home`, `#services`, `#contact` |
| **Section files** | One default export per file in `components/sections/` |
| **UI naming** | kebab-case for shadcn/ui; PascalCase for sections |
| **Validation** | Use `lib/validation/contact.ts` for form + API |
| **Motion** | Every decorative animation must collapse under `prefers-reduced-motion`; pointer effects gated on `(hover:hover) and (pointer:fine)` |
| **Animated values** | An animation never owns the only copy of a value. Render the real number server-side and animate on top of it (see `AnimatedStat`) |
| **Touch targets** | Interactive elements at least 44px on the shortest side |

---

## Design system

Near-black ground + a single violet accent, dark only. Tokens live in
`app/globals.css` and are exposed to Tailwind via `@theme inline`.

**Typography:** Bricolage Grotesque (display/headings) · Inter (body/UI) ·
JetBrains Mono (instrumentation, console, micro-labels).

**Depth language:** `.panel` — hairline border, inner top highlight, backdrop
blur, **no drop shadows**. `Card` builds on `.panel`, so section cards inherit it.
`.spotlight` adds a cursor-tracked rim light; `.conic-ring` a rotating border
(one element per view).

**One layout idea per section.** The bento grid, the pipeline diagram, the
industries row-list, the call demo and the voice capability bands are each a
distinct shape on purpose. Adding a sixth card grid is how the page starts
reading as one template repeated — reach for a new layout before reaching for
another grid of tiles.

**Accent discipline.** The accent is reserved for primary CTAs, active states,
key data and glow. Body copy, labels and surfaces stay neutral so the colour
still means something when it appears. It has two steps and the split is
load-bearing: `--brand-primary` (#7C87E8) for text, icons and borders, where AA
needs 4.5:1, and `--brand-primary-dark` (#5E6AD2) for fills and glows, where
the bar is 3:1. Using the fill tone for small text fails contrast.

**Contrast:** all five text tokens verified WCAG AA against all four surfaces
(weakest is `--brand-text-dim` at 4.90:1 on `--brand-elevated`). Re-run the
check if any token changes. Text sitting *over* the shader field is not
statically verifiable — check those visually.

**Motion primitives:** `ShaderField` (WebGL aurora, no 3D engine), `Tilt`
(pointer 3D tilt), `KineticText` (word-mask reveal), `AnimateOnScroll`,
marquee, `glow-dot`, `caret`, `flow-dash`.

---

## Content data model

All content is static TypeScript — no CMS.

| Module | Key exports | Used by |
|--------|-------------|---------|
| `agency.ts` | `AGENCY`, `NAV_LINKS`, `HERO_STATS`, `TECH_STACK`, `FOOTER_*` | Layout, Footer, Contact, Hero |
| `content.ts` | `HOME_HERO`, `CLAUDE_SECTION`, `CLAUDE_OFFERINGS`, `HOME_SERVICE_HIGHLIGHTS`, `RESOURCE_CARDS`, `RESOURCE_REQUESTS`, `TEAM_MEMBERS`, `FAQ_ITEMS` | Home, About, Contact |
| `services.ts` | `SERVICES` | Services page, footer links, home highlights |
| `demo.ts` | `AGENT_TRACES`, `BOOKING_TRACE`, `WORKFLOW_NODES`, `WORKFLOW_EDGES` | AgentConsole, WorkflowGraph |
| `booking.ts` | `BOOKING_SECTION`, `ADOPTION_STATS`, `BOOKING_STATS`, `BOOKING_STEPS`, `BOOKING_COMPARISON` | BookingWebsites |
| `industries.ts` | `INDUSTRIES`, `INDUSTRIES_SECTION` | IndustriesSection |
| `examples.ts` | `ILLUSTRATIVE_EXAMPLES` | ExamplesSection — **read the labelling rule at the top of the file** |
| `voice.ts` | `VOICE_PAGE`, `VOICE_CAPABILITIES`, `VOICE_MOMENTS`, `VOICE_TRACE`, `VOICE_HANDOFF`, `CALL_SCRIPTS`, `VOICE_FAQ_ITEMS`, `DEMO_AGENT_NAME` | /voice-agents, VoiceDemo |
| `media.ts` | `HERO_MEDIA`, `ABOUT_MEDIA`, `SERVICE_MEDIA` | Optional imagery; absent keys fall back to icons |
| `legal.ts` | `PRIVACY_SECTIONS`, `TERMS_SECTIONS` | Legal pages |

**Derived data (DRY):**
- `FOOTER_SERVICE_LINKS` — built from `SERVICES`
- `HOME_SERVICE_HIGHLIGHTS` — built from a `SERVICES` subset (keep the count matched to the bento grid's SPANS list)

---

## Services

Ordered so the channels clients ask for by name come first.

| id | Title |
|----|-------|
| `voice` | Voice AI Agents |
| `whatsapp` | WhatsApp & Messaging Agents |
| `email` | Email Automation Agents |
| `rag` | Ask Your Documents Anything |
| `managed` | Fully-Managed Automation |
| `automation` | Workflow Automation |
| `sharepoint` | SharePoint Integration |
| `custom` | Custom AI Agents |
| `claude` | Claude AI Agents |
| `n8n` | n8n Workflows |
| `consulting` | AI Consulting |

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero + live agent console, tech marquee, interactive call demo, AI-websites/booking, bento services, industries, pipeline, examples, Claude, FAQ, CTA, resources |
| `/voice-agents` | Flagship voice page — missed-call moments, interactive call demo, live call trace, inbound/outbound/connected capabilities, handoff, voice FAQ |
| `/services` | Full service catalog |
| `/about` | Story, mission, team |
| `/contact` | Contact form + FAQ |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/llms.txt` | Plain-text brief for AI answer engines, generated from the same constants |

**No pricing page.** Every engagement is scoped individually; fixed tiers
undersold custom work and invited comparison shopping. The cost question is
answered in the contact FAQ instead.

---

## Structured data

Emitted as one linked graph so the parts describe a single business rather than
three unrelated blobs. All of it lives in `components/ui/json-ld.tsx`.

| Schema | Where | Notes |
|--------|-------|-------|
| `Organization` | Root layout | `@id` anchor the rest reference |
| `WebSite` | Root layout | |
| `ProfessionalService` (LocalBusiness) | Root layout | Palmerston North geo, area served, offer catalogue |
| `Service` | `/services` (all), `/voice-agents` (one) | One node per offering, provider linked back to the org |
| `BreadcrumbList` | Every inner page | Home is always the first crumb |
| `FAQPage` | `/` and `/voice-agents` | Emitted by `FaqSection` from the same array it renders, so markup can never describe an invisible question. One set of questions per URL — `/contact` shows the same list with `schema={false}` |

---

## Contact flow

1. User submits form on `/contact`
2. Client validates via `validateContactPayload()` (Zod)
3. POST to `/api/contact` with a honeypot field
4. Server drops honeypot hits, rate-limits by IP, re-validates, inserts into Supabase `contact_submissions`
5. Success/error shown in UI

Resource cards link in with `?topic=`, which the form reads to label the request
and pre-write the message (`RESOURCE_REQUESTS`).

Requires server env vars (see below). No credentials in client bundle.

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Canonical origin. Feeds metadataBase, canonicals, OG tags, sitemap, robots, llms.txt and JSON-LD. Set for Production **and** Preview, then redeploy — it is inlined at build time |
| `SUPABASE_URL` | Yes (for form) | Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes (for form) | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Recommended | Server-side inserts (falls back to anon) |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | No | Enables the "call for real" button on the voice demo |
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | No | Paired with the key above; without both, the demo stays scripted |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console |

Copy `.env.example` to `.env.local` for local dev.

---

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint  ⚠️ currently fails to start, see Known issues
```

---

## Known issues

| Issue | Detail |
|-------|--------|
| ~~**`genzai.agency` does not resolve**~~ | Fixed. The domain is no longer hardcoded: `lib/site-url.ts` resolves it from `NEXT_PUBLIC_SITE_URL`, so canonicals, OG tags, sitemap, robots and JSON-LD all follow whatever domain is configured. Set that variable when DNS is live |
| **Four Vercel projects, one repo** | `smart-ai-agency`, `-c4le`, `-2lqh`, `1` are all wired to this repo, so every push builds four times. Only `smart-ai-agency-2lqh.vercel.app` is public and current; `-c4le` has SSO protection on and no alias |
| **`npm run lint` fails to start** | `TypeError: Converting circular structure to JSON` in `@eslint/eslintrc` while resolving `eslint-config-next`. Fails during config resolution, before any file is read. TypeScript checking still runs via `next build` |
| **Brand name collision** | Code says "Smart AI Solutions", repo is `smart-ai-agency`, and a separate `GenZai` repo exists. Pick one identity before the next brand pass |
| **Unverified marketing claims** | `HERO_STATS` (30+ projects, 5+ clients, 80% time saved) are still unsubstantiated in-repo. They now *render* correctly — the count-up used to leave "0+ / 0+ / 0%" in the server HTML and for anyone with reduced motion — but rendering a number correctly is not the same as being able to evidence it. "80% average time saved" is the one to either substantiate or replace; the cited NZ research in `ADOPTION_STATS` shows the pattern to follow (`CitedStat` requires a source) |
| **Rate limiting is per-instance** | In-memory; resets on cold start. Needs Vercel KV or Upstash for a hard guarantee |

---

## Milestone history

| Date | Milestone |
|------|-----------|
| Jul 2026 | Static HTML site — services, contact form, admin panel |
| Aug 2026 | **Next.js migration** — Tailwind v4, shadcn/ui, centralized constants, API route, legal pages, SEO |
| Aug 2026 | **Architecture refactor** — hooks, shared validation, ContactDetails, derived constants, split sections |
| Aug 2026 | **AI-native visual rebuild** — shader hero, live agent console, bento services, pipeline graph, display/mono typography, `.panel` depth system; removed PageLoader |
| Aug 2026 | **Repositioning** — outcome-first copy, pricing page removed, voice/WhatsApp/email/managed services added, model version strings purged, generated OG card, contact hardening |
| Sep 2026 | **Technical SEO + interactive demo** — env-driven domain, title duplication fixed, linked JSON-LD graph (LocalBusiness/Service/Breadcrumb/FAQ), llms.txt, AI crawler rules, visible FAQs, zero-stat rendering bug fixed, honest resource CTAs, "Talk to Sara" call demo, near-black + violet palette |

---

## Roadmap

- [ ] Point `NEXT_PUBLIC_SITE_URL` at the real domain once DNS resolves
- [ ] Consolidate to one Vercel project
- [ ] Fix the ESLint config so `npm run lint` runs
- [ ] Add hero / about / RAG imagery via `lib/constants/media.ts`
- [ ] Email notification on new lead
- [ ] Substantiate or soften the hero stats
- [ ] Google Search Console verification
- [ ] Rebuild admin panel as a protected Next.js route
