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
/aykah:home
```

You should see the brand kernel respond.

---

## What's inside

### Sub-skills (commands)

| Command | What it does |
|---|---|
| `/aykah:home` | Brand kernel + router. Loads brand facts, voice rules, design tokens. Always run first when starting Aykah work. |

More sub-skills (`/aykah:social`, `/aykah:copy`, `/aykah:image`, `/aykah:design`, `/aykah:creator`, `/aykah:ideate`, `/aykah:organize`, `/aykah:analyze`, `/aykah:seo`) ship in subsequent versions.

### Brand kernel (loaded on-demand by `/aykah:home`)

- `skills/home/references/brand-facts.md` — verified facts (founders, locations, policies). The no-hallucination file.
- `skills/home/references/brand-voice.md` — tone, banned words, premium language.
- `skills/home/references/brand-design.md` — colors, fonts, logo, WCAG pairs.
- `skills/home/references/asset-map.md` — paths to every brand asset.

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
