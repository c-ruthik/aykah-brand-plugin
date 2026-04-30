# Aykah Brand Plugin

Internal Claude Code plugin for the Aykah team. Loads verified brand facts, voice rules, design tokens, and asset paths — and ships specialized sub-skills for copy, social, image generation, design, organization, and analysis.

The goal: **every team member, working with Claude, produces on-brand work without thinking about it.**

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
| `/aykah:core` | Brand kernel. Loads brand facts, voice rules, design tokens, asset map — the source-of-truth references every other Aykah skill depends on. Always run first when starting Aykah work. |
| `/aykah:buddy` | Brand-aware thinking partner. Auto-routes any brainstorm / pressure-test / decision question to the right structured method (Frame, Diverge, Lotus Blossom, TRIZ, Pressure-Test, Scenario Wind-Tunnel, Red Team, Converge). Output passes through the brand-voice gate before delivery. |
| `/aykah:social` | Channel-aware social copywriting. Writes Instagram captions, Reels/TikTok scripts (with shot lists + ASMR cues), and Pinterest pin descriptions using the Voice Guide v2 formula. Every output runs through three reviewer personas (Sanya filter, reference-set customer, Channel Guide check) plus the voice gate before delivery. |
| `/aykah:copy` | Adaptive long-form website copywriting. The user names the section they're working on (PDP, returns, shipping, warranty, FAQ, about, founder letter, category) and the skill applies the locked Voice Guide v2 foundation, adapts to that section, runs a 3-pass self-review (Voice match · Specificity · So-what), and gates output through the voice-gate before delivery. Asks for material specs and certifications instead of inventing them. |
| `/aykah:image` | Brand-consistent image generation via the Higgsfield CLI. Detects the CLI on first use (or shows install instructions if missing). Asks the user for mode, product, vibe, room, people, model, aspect ratio, quality, and reference image before any generation. Dispatches an interior designer agent (room/palette/staging/narrative — trains on user feedback) and a photographer agent (lens/light/composition/anti-AI-tells), assembles a 5-block prompt, generates directly, saves to a user-named folder, and stores feedback in `~/.aykah/image-state.json` for consistency across future generations. |

More sub-skills (`/aykah:social`, `/aykah:copy`, `/aykah:image`, `/aykah:design`, `/aykah:creator`, `/aykah:organize`, `/aykah:analyze`, `/aykah:seo`) ship in subsequent versions.

### Agents (dispatched by sub-skills)

| Agent | What it does |
|---|---|
| `aykah-researcher` | Searches Reddit, design publications, marketing/trend sites, and competitor pages for current external signal. If you name a specific site, only searches that site. |
| `aykah-voice-gate` | Final reviewer. Runs every Aykah-facing output through banned-words check, fact verification, voice-attribute scoring, and anti-positioning audit before delivery. HARD-GATE pattern. |
| `aykah-interior-designer` | Builds brand-aligned scene briefs (room, palette, materials, staging, narrative) for image generation. Reads training data from `~/.aykah/image-state.json` so its briefs converge on user taste over time. |
| `aykah-photographer` | Adds the technical photography layer (lens, aperture, light direction, composition, anti-AI-tells) on top of the interior designer's scene brief. Bakes exclusion phrases into the positive prompt because Higgsfield CLI does not support negative prompts. |

### Brand kernel (loaded on-demand by `/aykah:core`)

- `skills/core/references/brand-facts.md` — verified facts (founders, locations, policies). The no-hallucination file.
- `skills/core/references/brand-voice.md` — tone, banned words, premium language.
- `skills/core/references/brand-design.md` — colors, fonts, logo, WCAG pairs.
- `skills/core/references/asset-map.md` — paths to every brand asset.

### Tools

- `scripts/voice-lint.ts` — Bun CLI that flags banned words in any text file. Run: `bun scripts/voice-lint.ts <file>`.

---

## Updating

When the plugin is updated upstream, refresh:

```
/plugin marketplace update aykah-marketplace
/reload-plugins
```

---

## For maintainers

Source repo: `Brand_guidelines/aykah_claude_skill/` (Ruthik's machine).
Bump `version` in `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` together when publishing changes. Tag releases.

```
git add -A && git commit -m "v0.x.0: <change>"
git tag v0.x.0
git push && git push --tags
```
