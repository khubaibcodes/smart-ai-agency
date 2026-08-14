# Smart AI Agency

Marketing website for **Smart AI Solutions** — AI automation agency serving international clients.

- **Live domain:** https://genzai.agency ⚠️ *does not currently resolve — see Known issues*
- **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · Zod · Framer Motion · GSAP
- **Legacy static site:** `legacy/` (original HTML/CSS/JS — archived)

---

## Project structure

```
smart-ai-agency/
├── app/
│   ├── layout.tsx                 # Root layout, 3 fonts, global SEO, JSON-LD
│   ├── globals.css                # Brand design system (warm charcoal + amber)
│   ├── opengraph-image.tsx        # Generated share card (build-time)
│   ├── twitter-image.tsx          # Re-export of the OG card
│   ├── sitemap.ts                 # Dynamic sitemap
│   ├── robots.ts                  # Dynamic robots.txt
│   ├── api/contact/route.ts       # Contact API (honeypot + rate limit + Supabase)
│   └── (marketing)/               # Public pages + shared Navbar/Footer
│       ├── layout.tsx
│       ├── page.tsx               # Home
│       ├── about/page.tsx
│       ├── services/page.tsx
│       ├── contact/page.tsx
│       ├── privacy/page.tsx
│       └── terms/page.tsx
├── components/
│   ├── common/                    # Shared composites (ContactDetails, StatsGrid)
│   ├── layout/                    # Navbar, Footer, LegalDocument
│   ├── sections/                  # One section per file
│   ├── forms/                     # ContactForm (shadcn)
│   └── ui/                        # shadcn primitives + brand helpers (kebab-case)
├── hooks/
│   ├── useScrollSpy.ts            # Homepage section highlighting
│   ├── useScrolled.ts             # Navbar scroll state
│   └── useBodyScrollLock.ts       # Mobile menu scroll lock
├── lib/
│   ├── constants/                 # Single source of truth for all content
│   │   ├── agency.ts              # Contact, nav, stats, tech stack, footer links
│   │   ├── content.ts             # Hero, Claude section, testimonials, team, FAQ
│   │   ├── services.ts            # Full service catalog
│   │   ├── demo.ts                # Agent console traces + workflow graph
│   │   ├── media.ts               # Optional imagery registry
│   │   └── legal.ts               # Privacy & Terms
│   ├── validation/contact.ts      # Shared Zod schema (form + API)
│   ├── assets.ts                  # Favicon paths
│   ├── navigation.ts              # Active nav link resolver
│   ├── seo.ts                     # Metadata helpers, sitemap routes
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
| **Nav links** | All navbar links go to **pages** (`/services`, `/about`, etc.) |
| **Home scroll-spy** | On `/`, navbar highlights sections `#home`, `#services`, `#contact` |
| **Section files** | One default export per file in `components/sections/` |
| **UI naming** | kebab-case for shadcn/ui; PascalCase for sections |
| **Validation** | Use `lib/validation/contact.ts` for form + API |
| **Motion** | Every decorative animation must collapse under `prefers-reduced-motion`; pointer effects gated on `(hover:hover) and (pointer:fine)` |
| **Touch targets** | Interactive elements at least 44px on the shortest side |

---

## Design system

Warm charcoal + amber/bronze, dark only. Tokens live in `app/globals.css` and are
exposed to Tailwind via `@theme inline`.

**Typography:** Bricolage Grotesque (display/headings) · Inter (body/UI) ·
JetBrains Mono (instrumentation, console, micro-labels).

**Depth language:** `.panel` — hairline border, inner top highlight, backdrop
blur, **no drop shadows**. `Card` builds on `.panel`, so section cards inherit it.
`.spotlight` adds a cursor-tracked rim light; `.conic-ring` a rotating border
(one element per view).

**Motion primitives:** `ShaderField` (WebGL aurora, no 3D engine), `Tilt`
(pointer 3D tilt), `KineticText` (word-mask reveal), `AnimateOnScroll`,
marquee, `glow-dot`, `caret`, `flow-dash`.

---

## Content data model

All content is static TypeScript — no CMS.

| Module | Key exports | Used by |
|--------|-------------|---------|
| `agency.ts` | `AGENCY`, `NAV_LINKS`, `HERO_STATS`, `TECH_STACK`, `FOOTER_*` | Layout, Footer, Contact, Hero |
| `content.ts` | `HOME_HERO`, `CLAUDE_SECTION`, `CLAUDE_OFFERINGS`, `HOME_SERVICE_HIGHLIGHTS`, `TESTIMONIALS`, `FAQ_ITEMS` | Home, About, Contact |
| `services.ts` | `SERVICES` | Services page, footer links, home highlights |
| `demo.ts` | `AGENT_TRACES`, `WORKFLOW_NODES`, `WORKFLOW_EDGES` | AgentConsole, WorkflowGraph |
| `media.ts` | `HERO_MEDIA`, `ABOUT_MEDIA`, `SERVICE_MEDIA` | Optional imagery; absent keys fall back to icons |
| `legal.ts` | `PRIVACY_SECTIONS`, `TERMS_SECTIONS` | Legal pages |

**Derived data (DRY):**
- `FOOTER_SERVICE_LINKS` — built from `SERVICES`
- `HOME_SERVICE_HIGHLIGHTS` — built from a `SERVICES` subset (keep at six; the bento grid sizes tiles by position)

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
| `/` | Home — hero + live agent console, tech marquee, bento services, pipeline, Claude, testimonials, CTA, resources |
| `/services` | Full service catalog |
| `/about` | Story, mission, team |
| `/contact` | Contact form + FAQ |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

**No pricing page.** Every engagement is scoped individually; fixed tiers
undersold custom work and invited comparison shopping. The cost question is
answered in the contact FAQ instead.

---

## Contact flow

1. User submits form on `/contact`
2. Client validates via `validateContactPayload()` (Zod)
3. POST to `/api/contact` with a honeypot field
4. Server drops honeypot hits, rate-limits by IP, re-validates, inserts into Supabase `contact_submissions`
5. Success/error shown in UI

Requires server env vars (see below). No credentials in client bundle.

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | Yes (for form) | Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes (for form) | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Recommended | Server-side inserts (falls back to anon) |
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
| **`genzai.agency` does not resolve** | NXDOMAIN — not registered or no DNS. `AGENCY.domain` feeds `metadataBase`, every canonical URL and the sitemap, so all of them currently point at a dead host |
| **Four Vercel projects, one repo** | `smart-ai-agency`, `-c4le`, `-2lqh`, `1` are all wired to this repo, so every push builds four times. Only `smart-ai-agency-2lqh.vercel.app` is public and current; `-c4le` has SSO protection on and no alias |
| **`npm run lint` fails to start** | `TypeError: Converting circular structure to JSON` in `@eslint/eslintrc` while resolving `eslint-config-next`. Fails during config resolution, before any file is read. TypeScript checking still runs via `next build` |
| **Brand name collision** | Code says "Smart AI Solutions", repo is `smart-ai-agency`, domain is `genzai.agency`, and a separate `GenZai` repo exists |
| **Unverified marketing claims** | `HERO_STATS` (30+ projects, 5+ clients, 80% time saved) and the three named testimonials are unsubstantiated in-repo |
| **No phone number** | `AGENCY.phone` is empty. For an agency selling Voice AI this is a conversion leak |
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

---

## Roadmap

- [ ] Register/connect the real domain and update `AGENCY.domain`
- [ ] Consolidate to one Vercel project
- [ ] Fix the ESLint config so `npm run lint` runs
- [ ] Add hero / about / RAG imagery via `lib/constants/media.ts`
- [ ] Email notification on new lead
- [ ] Substantiate or soften stats and testimonials
- [ ] Google Search Console verification
- [ ] Rebuild admin panel as a protected Next.js route
