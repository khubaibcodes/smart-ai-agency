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
- Dark warm-charcoal theme — brand colors in `app/globals.css`
- Use Lucide icons (brand icons like LinkedIn: inline SVG if not in Lucide)
- Per-page SEO via `createPageMetadata()` from `lib/seo.ts`
- Never hardcode Supabase keys in client code — use server env vars only
- Update `Smart-AI-Agency.md` after major milestones

---

## Key Business Context

- Target clients: international companies + local SMBs wanting AI automation
- Owner: **Khubab**
- Contact email: `smrtaisolutions@gmail.com`
- Domain: `https://genzai.agency`
- Location: Palmerston North, New Zealand

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```
