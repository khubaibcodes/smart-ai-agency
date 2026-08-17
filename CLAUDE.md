# CLAUDE.md

Guidance for Claude Code when working in this repository.

---

## Project Overview

**Smart AI Agency** — Professional AI agency marketing site and lead capture platform.

Services marketed: RAG Agents, Voice AI, n8n Automation, Claude AI, SharePoint Integration, Custom Agents, AI Consulting.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix)

The original static HTML site is archived in `legacy/` for reference.

---

## File Structure

See `Smart-AI-Agency.md` for full structure and content data model.

Key rules:
- All business content lives in `lib/constants/` — never duplicate in components
- Marketing pages under `app/(marketing)/`
- shadcn UI primitives in `components/ui/`
- Page sections in `components/sections/`
- Contact form submits to `/api/contact` (server-side Supabase)

---

## Development Standards

- Match existing Tailwind + shadcn patterns before adding new abstractions
- Dark warm-charcoal theme — brand colors in `app/globals.css`. Extend `.panel`
  rather than introducing a second surface style
- Use Lucide icons (brand icons like LinkedIn: inline SVG if not in Lucide)
- Per-page SEO via `createPageMetadata()` from `lib/seo.ts`
- Never hardcode Supabase keys in client code — use server env vars only
- Update `Smart-AI-Agency.md` after major milestones

**Copy rules**

- Write for a business owner, not an engineer. Outcome first, mechanism second:
  lead with what it saves them, then explain how it works as supporting proof
- **Never hardcode a model version string** (`claude-sonnet-x-y`, "200K context",
  "GPT-4"). They go stale within months. Say "Anthropic's most advanced models"
  and keep it in `lib/constants/`, not in JSX
- Avoid unqualified absolutes ("never hallucinates", "100% accurate")
- Don't reintroduce fixed pricing tiers — cost is answered in the contact FAQ
- **Never publish a client story we cannot evidence.** Stories use the `Story`
  type, where `verified` is required; unverified ones render an "awaiting
  sign-off" marker and must keep their `after` line qualitative. Numbers stay
  inside the client's quoted words, never asserted as our finding
- Positioning: one system doing several jobs, not a menu of separate products.
  Copy sounds like hiring help, not deploying software
- **Every market statistic carries its source on screen.** Use the `CitedStat`
  type, which makes `source` required and separates published `research` from
  industry `estimate` — the UI labels estimates so they can't pass as findings.
  Never present a third-party figure as our own research

**Motion rules**

- Every decorative animation collapses under `prefers-reduced-motion`
- Pointer-driven effects gated on `(hover: hover) and (pointer: fine)` so touch
  devices never arm them and `:hover` can't stick after a tap
- Canvas/WebGL work is gated on in-view + tab visibility, and always has a
  static fallback (see `ShaderField`)
- Interactive elements keep a 44px minimum touch target
- At most one attention-competing animation per viewport. Motion should explain
  something real (a call flow, a pipeline, a booking) — decorative movement that
  represents nothing gets cut
- Each new section needs its own layout idea, not another card grid

---

## Key Business Context

- Target clients: international companies + local SMBs wanting AI automation
- Owner: **Khubab**
- Contact email: `smrtaisolutions@gmail.com`
- Domain: `https://genzai.agency` — ⚠️ currently NXDOMAIN, see Known issues in
  `Smart-AI-Agency.md`
- Location: Palmerston North, New Zealand
- Lead services (what clients ask for by name): voice agents, WhatsApp/messaging
  agents, email agents, fully-managed automation

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```
