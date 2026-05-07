# Aykah Brand Plugin

Internal Claude Code plugin for the Aykah team. Loads verified brand facts, voice rules, design tokens, and asset paths — and ships specialized sub-skills for copywriting, social, image generation, and campaign ideation.

The goal: **every team member, working with Claude, produces on-brand work without thinking about it.**

Current version: **v0.15.4**

---

## Install (one-time, per teammate)

You need Claude Code installed and to be added as a collaborator on this private repo.

In any Claude Code session, run:

```
/plugin marketplace add https://github.com/c-ruthik/aykah-brand-plugin.git
/plugin install aykah@aykah-marketplace
/reload-plugins
```

Verify it loaded:

```
/aykah:core
```

You should see the brand kernel respond.

---

## What's inside

### Sub-skills (commands)

| Command | What it does |
|---|---|
| `/aykah:core` | Brand kernel. Loads brand facts, voice rules, design tokens, asset map. Source-of-truth for every other skill. Always run first when starting Aykah work. |
| `/aykah:buddy` | Brand-aware thinking partner. Auto-routes any brainstorm / pressure-test / decision question to the right structured method (Frame, Diverge, Lotus Blossom, TRIZ, Pressure-Test, Scenario Wind-Tunnel, Red Team, Converge). Output passes through the v2 voice gate before delivery. |
| `/aykah:social` | Channel-aware social copywriting. Instagram captions, Reels/TikTok scripts (with shot lists + ASMR cues), Pinterest pin descriptions. Every output runs through three reviewer personas (Sanya filter, reference-set customer, Channel Guide check) plus the voice gate. |
| `/aykah:copy` | Adaptive long-form website copywriting — PDP, returns, shipping, warranty, FAQ, About, founder letter, category pages. Locked Voice Guide v2 foundation, 3-pass self-review (Voice match · Specificity · So-what), voice-gate before delivery. |
| `/aykah:image` | Brand-consistent image generation via Higgsfield. **Auto-resolves product reference photos from the local ecom-images library by handle + variant.** Multi-image upload (5 refs typical) for visual lock. Hard angle lock (front / 3-quarter / side / back / closeup / cutout / hero). Catalog hallucination guards (filter inline + validate after). Scene Set mode for multi-angle consistency. Background pipelining for batches. |
| `/aykah:campaign` | Campaign ideation + naming. 6 output types (campaign brief, event title, event tagline, email subject, hook, mix), 3 modes (quick / standard / deep), grounded in JTBD + ICP + Dunford positioning + 5 Pillars. Standard + deep modes pull live cultural-trend signal via researcher agent. v2 voice gate on all output. |

### Agents (dispatched by sub-skills)

| Agent | What it does |
|---|---|
| `aykah-researcher` | Searches Reddit, design publications, trend sites, and competitor pages for current external signal. If you name a specific site, only searches that site. Active in `/aykah:campaign` standard + deep modes for culture-layer trend overlay. |
| `aykah-voice-gate` | Final reviewer. **v2 ruleset** — runs 8 passes per output: banned words, verified facts, voice attributes, anti-positioning, AI-tell pattern catcher, furniture/lifestyle cliché library, sentence-rhythm audit, voice register fingerprint. HARD-GATE pattern — output that fails doesn't ship. Backward-compatible v2 upgrade benefits all skills automatically. |
| `aykah-interior-designer` | Builds brand-aligned scene briefs (room, palette, materials, staging, narrative) for image generation. Receives a pre-filtered catalog slice — picks supporting furniture ONLY from that list, no hallucination. Trains on `~/.aykah/image-state.json` so briefs converge on user taste. |
| `aykah-photographer` | Adds the technical photography layer (lens, aperture, light direction, composition, anti-AI-tells) on top of the interior designer's scene brief. Hard-locks the user's chosen camera angle. Bakes exclusions into the positive prompt (Higgsfield doesn't support negatives). |

### Brand kernel (loaded on-demand by `/aykah:core`)

- `skills/core/references/brand-facts.md` — verified facts (founders, locations, policies). The no-hallucination file.
- `skills/core/references/brand-voice.md` — tone, banned words, premium language.
- `skills/core/references/brand-design.md` — colors, fonts, logo, WCAG pairs.
- `skills/core/references/anti-patterns-v2.md` — voice-gate v2 ruleset (AI-tells, clichés, rhythm, register).
- `skills/core/references/asset-map.md` — paths to every brand asset.
- `skills/core/references/feedback-protocol.md` — feedback logging + `--feedback` flag spec.

### Image library (used by `/aykah:image` auto-resolution)

The `/aykah:image` skill resolves product reference photos from your local ecom-images library at:

```
~/Downloads/Product_Images/ecom-images/<category>/<product-handle>/<variant>/
```

Variant folders contain 4–5 angle photos: `front`, `side`, `back`, `angle` (= three-quarter), `closeup`. The skill auto-detects them by handle + variant and uploads all of them as references for visual fidelity. Mapping from catalog `pairing_category` to folder names lives in `skills/image/data/category-mapping.json` (17 categories covered).

Manual override available via `--refs <path>` for edge cases.

### Tools

- `scripts/voice-lint.ts` — Bun CLI that flags banned words in any text file. Run: `bun scripts/voice-lint.ts <file>`.

---

## Feedback collection

Every Aykah sub-skill writes interaction logs to `~/Desktop/aykah-feedback/` on each teammate's machine. The folder contains per-skill history files, per-skill feedback files (distilled lessons), per-skill stats files (invocation counters), and a cross-skill `summary.json`. The plugin maintainer collects these files from teammates to upgrade the skills.

### `--feedback` flag (anytime, any skill)

Drop quick feedback on any skill at any time:

```
/aykah:campaign --feedback "the event-tagline mode is too formal, want warmer tone"
/aykah:image --feedback "the moonlight-boucle came out too saturated"
```

Feedback is timestamped and saved with the last 3 invocations of that skill as context, so the maintainer knows what you were working on.

### 20-invocation feedback prompt

After every 20 invocations of a given skill, it surfaces a one-line prompt asking if you want to give feedback. Skip it (resets after 5 more uses), reply with `--feedback` now, or send feedback in any future session. Per-skill counters — feedback on captions doesn't trigger after image gens.

Currently shipped in `/aykah:campaign`. Other skills retrofit queued.

### Folder creation + opt-out

The folder is created the first time any sub-skill runs, with one-time user confirmation. To opt out, answer "never ask again" when prompted, or create an empty file at `~/.aykah/no-feedback-logging`.

Privacy: only `$USER`, machine hostname, skill name, summary inputs, and verdicts are logged. No emails, full paths, API keys, customer data, or Soul ID UUIDs.

See `skills/core/references/feedback-protocol.md` for the full schema.

---

## Updating

When the plugin is updated upstream, refresh:

```
/plugin marketplace update aykah-marketplace
/reload-plugins
```

---

## Recent versions

- **v0.13.1** — `/aykah:image` auto-resolves product references from the local ecom-images library by handle + variant. No more "paste a folder path" question on every gen.
- **v0.13.0** — Major `/aykah:image` overhaul: angle hard-lock, multi-image reference upload (5 refs typical), Scene Set mode for multi-angle consistency, catalog hallucination guards (filter inline + validate after), background pipelining for batches.
- **v0.12.0** — New `/aykah:campaign` skill (6 output types, 3 modes, 7 marketing methods, researcher agent for trends). Voice-gate v2 (4 new layers: AI-tells, clichés, rhythm, register). 20-invocation feedback prompt + `--feedback` flag.

Full changelog in `git log`.

---

## For maintainers

Source repo: `Brand_guidelines/aykah_claude_skill/` (Ruthik's machine).
Bump `version` in `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` together when publishing changes. Tag releases.

```
git add -A && git commit -m "v0.x.0: <change>"
git tag v0.x.0
git push && git push --tags
```
