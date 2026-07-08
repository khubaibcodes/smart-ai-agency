# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Smart AI Agency** — A professional AI agency website and service delivery platform. The owner provides AI automation services to international clients and local businesses, including:

- **RAG Agents** — document Q&A systems using LangChain and vector stores
- **Voice AI** — speech-to-text/TTS pipelines for hands-free workflows
- **n8n Automation** — no-code/low-code workflow pipelines
- **Chat Agents for Local Business** — customer-facing chatbots for SMBs
- **SharePoint Integration** — Microsoft 365 AI automation

The codebase is a **static HTML/CSS/JS website** (no build step, no framework) that markets and presents these services.

---

## Stack & Languages

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML5, CSS3 (custom properties), ES6+ JavaScript |
| Fonts | Google Fonts (Inter) |
| Icons | Font Awesome 6 |
| Deployment | Vercel / Netlify (static) |
| AI Backend (client projects) | LangChain, OpenAI/Claude API, Whisper, n8n |
| Automation | n8n (self-hosted or cloud), Make (Integromat) |
| Microsoft Stack | SharePoint, Microsoft 365, Power Platform |

**No build tools, no bundlers, no package.json.** Every file is directly served as-is.

---

## File Structure

```
/
├── index.html          # Homepage
├── services.html       # Services detail page
├── about.html          # About / team page
├── contact.html        # Contact form + FAQ
├── styles.css          # Single global stylesheet
├── main.js             # Single global JS file
├── .env                # Environment variable template (not committed)
├── CLAUDE.md           # This file
└── .claude/
    ├── settings.json   # Claude Code permissions
    ├── rules/
    │   ├── code-style.md     # HTML/CSS/JS standards
    │   └── ai-services.md    # AI integration patterns
    ├── agents/         # Project-specific subagents
    └── skills/         # Custom slash commands
```

---

## Development Standards

### General Rules
- **No frameworks.** Keep everything in plain HTML/CSS/JS. Do not introduce React, Vue, or any bundler.
- **No new files** unless strictly necessary. Prefer editing existing files.
- **Production-ready by default** — every piece of code should have proper error handling, input validation at boundaries, and graceful fallbacks.
- **Single stylesheet** (`styles.css`). All styles go here, organized by section with clear comments.
- **Single JS file** (`main.js`). No inline `<script>` blocks in HTML except for third-party embeds.

### CSS Rules
- Use CSS custom properties (`--variable`) for all colors, spacing, and transitions.
- Mobile-first responsive design using `clamp()`, `min()`, and CSS Grid/Flexbox.
- Dark theme is the default. Background base: `#0a0a0f`.
- Animations use `cubic-bezier(0.4,0,0.2,1)` timing.

### JavaScript Rules
- Vanilla ES6+ only — no jQuery, no lodash.
- Always check element existence before attaching listeners (`if (el) { ... }`).
- Form submissions must include: validation, loading state, success state, error recovery.
- Use `IntersectionObserver` for scroll animations (no scroll event polling).

### HTML Rules
- Semantic elements (`<section>`, `<nav>`, `<footer>`, `<article>`).
- Every interactive element needs `aria-label` or visible text for accessibility.
- All pages share the same navbar and footer structure — keep them in sync.

---

## Agentic Workflow Instructions

When working on this project as an agent:

1. **Read before editing** — always read the current file state before making changes.
2. **Modular rules** — check `.claude/rules/` for domain-specific guidance before writing code in that area.
3. **Scope discipline** — only change what was asked. Do not refactor surrounding code, add comments to untouched sections, or introduce new abstractions.
4. **Contact form** — the form in `contact.html` uses a simulated submit. When wiring to a real backend, use EmailJS keys from `.env`. Never hardcode credentials.
5. **Sub-agents** — for AI service integrations (RAG pipelines, n8n workflows, voice agents), refer to `.claude/agents/` for specialized behavior.

---

## Key Business Context

- Target clients: international companies + local SMBs wanting AI automation
- Primary value proposition: **save time and effort** through RAG, voice, and workflow automation
- Owner's name: **Khubab**
-- Contact email: `hello@genzai.agency` (placeholder — update before launch)
- All pricing, timelines, and team details on the site are placeholders to be updated
