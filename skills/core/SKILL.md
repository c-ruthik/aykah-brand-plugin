---
name: core
description: Use when starting any work involving the Aykah brand (aykah.ca, Canadian furniture retailer) — writing copy, designing assets, generating images, planning social content, organizing files, analyzing performance data, or answering brand questions. Also use when verifying brand facts, checking voice/tone, or applying design tokens. Triggers on mentions of Aykah, aykah.ca, or work inside Brand_guidelines/. Loads the source-of-truth brand references that every other Aykah skill depends on.
---

# Aykah Brand — Core (Kernel + Router)

## Overview

This is the entry point for every Aykah brand task. It loads the verified brand kernel (facts, voice, design tokens, asset map) and routes to specialized sub-skills.

**Core rule:** never produce Aykah-facing output without first checking the relevant reference file. The brand has had real claims invented in the past (e.g., "100-night trial", "Designed in Canada") — reference files exist specifically to prevent that.

## When to use

- Any prompt mentioning "Aykah", "aykah.ca", or working inside the Brand_guidelines/ folder
- Writing copy that will be seen by customers (web, email, social, ads)
- Designing assets (colors, type, logo lockups)
- Answering brand questions (founders, locations, policies, warranty)
- Reviewing existing work for brand compliance
- Before invoking any other `/aykah:*` sub-skill

## Quick brand snapshot

| Fact | Value |
|---|---|
| Brand | Aykah (always capitalized) |
| Co-founders | Sanya Salehani & Salman Saleem |
| Tagline | **Quietly better.** |
| Sub-line | *Made of what matters.* |
| Model | Canadian-owned, internationally sourced, Canada-only sales |
| HQ | Burnaby, BC |
| Showrooms | Burnaby BC, Port Coquitlam BC, Mississauga ON |
| Reference set | Quince · Cuyana · Maiden Home · Brooklinen · Parachute · Sundays |
| We are NOT | Structube |
| Reviews | 4.8/5, 322+ on Birdeye |
| Banned (top 3) | "free" → "complimentary" · "premium" (until Fall 2026 tier) · "100-night trial" (doesn't exist) |

For the full set, load `references/brand-facts.md`.

## Reference files (load on-demand, not at startup)

Only load the file relevant to the task to keep context lean.

### Structured markdown (load first)

- **`references/brand-facts.md`** — founders, locations, shipping/returns/warranty, mission, tagline, anti-positioning. Load for any factual question.
- **`references/brand-voice.md`** — full v2 voice rules: 4 attributes, hook system, banned/approved vocabulary, language swaps, premium spec language, product description template, channel guide. Load before writing or auditing any copy.
- **`references/brand-design.md`** — color hex values, locked typography (Libre Baskerville + Manrope) with weights and tracking, logo rules, clearspace, minimum sizes. Load before any design or type decision.
- **`references/asset-map.md`** — paths to bundled docs and Ruthik's source folder. Load when locating an asset.

### Source-of-truth documents (load when you need the canonical PDF/HTML)

- `references/docs/voice-and-language-guide-v2.pdf` (+ `.html`) — the canonical voice doc. Read when you need exact wording or examples.
- `references/docs/design-system-v1.html` · `design-system-v2.pdf` — full design system.
- `references/docs/color-palette.html` (+ `.pdf`) — palette specimens.
- `references/docs/premium-language-guide.html` — earlier premium-language examples.
- `references/docs/premium-repositioning.html` — strategy memo on the upmarket shift.
- `references/docs/logo/` — logo files (`Full_logo_final.svg`/`.png`/`.ai` + breakdowns).

### Feedback-logging protocol (REQUIRED for every sub-skill)

- `references/feedback-protocol.md` — defines the centralized feedback-logging contract that every Aykah sub-skill follows. Outputs land in `~/Desktop/aykah-feedback/` with per-skill history and feedback files plus a cross-skill `summary.json`. The plugin maintainer collects these to upgrade the skills. **Every sub-skill must implement the logging hook described in the protocol.**

## Routing — which sub-skill to invoke

| Task | Sub-skill (when shipped) |
|---|---|
| Write a caption, post, or content calendar | `/aykah:social` |
| Write product descriptions, emails, web copy | `/aykah:copy` |
| Plan UGC briefs, video scripts, shot lists | `/aykah:creator` |
| Brainstorm campaigns, hooks, themes | `/aykah:ideate` |
| Generate images (Higgsfield-style consistency) | `/aykah:image` |
| Build branded design assets (Canva + Claude) | `/aykah:design` |
| Organize files, naming, folder structure | `/aykah:organize` |
| Analyze SEO, ads, Birdeye, performance data | `/aykah:analyze` |
| SEO work tied to Aykah context | `/aykah:seo` |

If a task spans multiple sub-skills (e.g., a social campaign needs copy + image), the orchestrator agent should compose them rather than running one at a time.

## Hard rules (apply to all Aykah output)

1. **Never invent claims.** If a fact isn't in `references/brand-facts.md`, ask before writing it.
2. **Never use "free".** Use "complimentary" everywhere.
3. **Never use "premium" as a brand-wide adjective.** Reserved for the Fall 2026 tier launch.
4. **Never say "designed in Canada"** or "made in Canada" — Aykah is Canadian-owned, internationally sourced.
5. **Never reference a "100-night trial"** — it does not exist.
6. **Returns:** 14 days, customer pays return shipping, 20% restocking if not in original packaging. Never imply otherwise.
7. **Voice:** four attributes — natural & conversational · confident but understated · warm but not emotional · design-aware but not pretentious. Never sales-y, never cliché ("timeless elegance", "elevated living"), never urgency-driven ("hurry", "don't miss out").
8. **Anti-positioning:** we are NOT Structube. Not disposable, not transactional, not cheap. Reference set: Quince, Cuyana, Maiden Home, Brooklinen, Parachute, Sundays.

## Bun preference

Project uses Bun (not Node) per `~/CLAUDE.md`. When running scripts: `bun scripts/voice-lint.ts <file>`, never `node` or `npx`.

## Voice-lint tool

Quick brand-voice check on any text file:

```bash
bun scripts/voice-lint.ts path/to/copy.md
```

Flags banned words and suggests the on-brand replacement.

## Common mistakes to avoid

| Mistake | Fix |
|---|---|
| Writing copy without loading `brand-voice.md` | Always load it first when copy is involved. |
| Using "free shipping" / "free returns" | "Complimentary shipping over $199 CAD". Returns are NOT free. |
| Using old colors (Moon Mist, Mount Sterling) | Retired. Use Navy/Ivory/Gold from `brand-design.md`. |
| Using old fonts (Lora, Plus Jakarta Sans) | Retired 2026-04-21. Use Libre Baskerville + Manrope. |
| Claiming "designed in Canada" | Use "Canadian-owned, internationally sourced". |
| Skipping brand-facts.md when answering policy questions | Always load it for policy/founders/locations questions. |
