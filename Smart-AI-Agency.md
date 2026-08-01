# Smart AI Agency

Marketing website for **Smart AI Solutions** — AI automation agency serving international clients.

- **Live domain:** https://genzai.agency
- **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · Zod · GSAP
- **Legacy static site:** `legacy/` (original HTML/CSS/JS — archived)

---

## Project structure

```
smart-ai-agency/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, global SEO, JSON-LD
│   ├── globals.css                # Brand design system (warm charcoal + amber)
│   ├── sitemap.ts                 # Dynamic sitemap
│   ├── robots.ts                  # Dynamic robots.txt
│   ├── api/contact/route.ts       # Contact form API (Supabase)
│   └── (marketing)/               # Public pages + shared Navbar/Footer
│       ├── layout.tsx
│       ├── page.tsx               # Home
│       ├── about/page.tsx
│       ├── services/page.tsx
│       ├── pricing/page.tsx
│       ├── contact/page.tsx
│       ├── privacy/page.tsx
│       └── terms/page.tsx
├── components/
│   ├── common/                    # Shared composites (ContactDetails, StatsGrid)
│   ├── layout/                    # Navbar, Footer, LegalDocument
│   ├── sections/                  # One section per file (Hero, Pricing, etc.)
│   ├── forms/                     # ContactForm (shadcn)
│   └── ui/                        # shadcn primitives + brand helpers (kebab-case)
├── hooks/
│   ├── useScrollSpy.ts            # Homepage section highlighting
│   ├── useScrolled.ts             # Navbar scroll state
│   └── useBodyScrollLock.ts       # Mobile menu scroll lock
├── lib/
│   ├── constants/                 # Single source of truth for all content
│   │   ├── agency.ts              # Contact, nav, stats, footer links
│   │   ├── content.ts             # Pricing, testimonials, team, FAQ
│   │   ├── services.ts            # Full service catalog
│   │   └── legal.ts               # Privacy & Terms
│   ├── validation/contact.ts      # Shared Zod schema (form + API)
│   ├── assets.ts                  # Favicon, OG image paths
│   ├── navigation.ts              # Active nav link resolver
│   ├── seo.ts                     # Metadata helpers, sitemap routes
│   └── types.ts
├── public/
│   └── favicon.svg
└── legacy/                        # Original static HTML site (reference only)
```

---

## Conventions

| Rule | Detail |
|------|--------|
| **Content** | Edit `lib/constants/` only — never hardcode agency info in components |
| **Nav links** | All navbar links go to **pages** (`/services`, `/pricing`, etc.) |
| **Home scroll-spy** | On `/`, navbar highlights sections `#home`, `#services`, `#pricing`, `#contact` |
| **Section files** | One default export per file in `components/sections/` |
| **UI naming** | kebab-case for shadcn/ui; PascalCase for sections |
| **Validation** | Use `lib/validation/contact.ts` for form + API |

---

## Content data model

All content is static TypeScript — no CMS.

| Module | Key exports | Used by |
|--------|-------------|---------|
| `agency.ts` | `AGENCY`, `NAV_LINKS`, `HERO_STATS`, `ABOUT_STATS`, `FOOTER_*` | Layout, Footer, Contact, Hero |
| `content.ts` | `HOME_SERVICE_HIGHLIGHTS` (derived), `PRICING_TIERS`, `TESTIMONIALS` | Home, Pricing |
| `services.ts` | `SERVICES` | Services page, footer links, home highlights |
| `legal.ts` | `PRIVACY_SECTIONS`, `TERMS_SECTIONS` | Legal pages |

**Derived data (DRY):**
- `FOOTER_SERVICE_LINKS` — built from `SERVICES`
- `HOME_SERVICE_HIGHLIGHTS` — built from `SERVICES` subset

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, services, Claude, pricing, testimonials, resources |
| `/services` | Full service catalog |
| `/pricing` | Pricing plans + testimonials |
| `/about` | Story, mission, team |
| `/contact` | Contact form + FAQ |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

---

## Contact flow

1. User submits form on `/contact`
2. Client validates via `validateContactPayload()` (Zod)
3. POST to `/api/contact`
4. Server re-validates and inserts into Supabase `contact_submissions`
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
npm run lint     # ESLint
```

---

## Milestone history

| Date | Milestone |
|------|-----------|
| Jul 2026 | Static HTML site — services, contact form, admin panel |
| Aug 2026 | **Next.js migration** — Tailwind v4, shadcn/ui, centralized constants, API route, legal pages, SEO |
| Aug 2026 | **Architecture refactor** — hooks, shared validation, ContactDetails, derived constants, split sections |

---

## Roadmap

- [ ] Add `public/og-image.png` for social previews
- [ ] Google Search Console verification
- [ ] Rebuild admin panel as protected Next.js route
- [ ] Email notification on new lead (optional)
