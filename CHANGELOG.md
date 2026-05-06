# Aykah Brand Plugin — Changelog

Version-bump rule: **every change to skill files, agents, or data references = new version**. Patch bump for tweaks, minor bump for new rules / register changes / new features, major bump for breaking changes.

## v0.15.0 — 2026-05-06 (v10 Collected Lived-In register)

**Image skill** — major register evolution from v9 (monotone cream) to v10 (collected lived-in).

### Added
- **Deep-muted accent color palette** — olive / sage / forest / chocolate / burgundy / mustard / rust / deep greige. Up to 2 accents per scene.
- **Mixed-texture pillow matrix** — every scene must include velvet (smooth sheen) + knit/boucle + linen-weave. Knit-only stacks banned.
- **Patterned pillow rule** — exactly ONE subtle-pattern lumbar pillow per scene (faded kilim / vintage tapestry / thin pinstripe / earthy block-print).
- **Dark anchor 4-option system** — A) wall art (50%) / B) furniture: walnut credenza or black coffee table (30%) / C) architectural: black sconces or chandelier (15%) / D) matched 3-piece gallery (5%).
- **Modern florals** — fresh white tulips / fresh airy branches / dried rust-red berries / dried fennel / cherry blossom.
- **Plain-cover books** allowed in living rooms (2–3 stacked, NO visible text/titles, slight off-angle).
- **Furniture contrast rule** — at least one piece must be darker than the sofa.
- **AI-realism cues** — explicit no-symmetry / no-perfect-folds / single-light-origin exclusions baked into every prompt.

### Changed
- Pillow count: was 4 fixed → 4–6 with slot system.
- Wall art count: was implicit one → explicit EXACTLY ONE (matched 3-piece gallery exempt).
- Throws: was default chunky cable-knit → rotated across cable-knit / sage knit / brown fringe / waffle / linen-mohair / brushed wool.
- Register: was "bright airy spacious" → "bright airy spacious + collected, layered, not monotone."

### Removed (overridden)
- Strict ivory→oatmeal→deep-greige-only pillow spectrum.
- "No chocolate-vs-olive contrast" rule.
- "Books almost never" rule (still applies to dining + bedroom; living room now allows plain-cover books).
- "No vintage faded oriental rugs" rule from 2026-05-05 (re-allowed in v10).

### Files modified
- `skills/image/references/aykah-style-anchors.md` — added v10 register section
- `skills/image/references/aykah-anti-patterns.md` — added 9 new banned patterns
- `skills/image/references/aykah-lookbook.md` — added v9-vs-v10 comparison table
- `agents/aykah-interior-designer.md` — Living Room DNA fully rewritten (13 → 17 elements)
- `skills/image/data/prompt-pattern.json` — version v1 → v10, new `v10_living_room_dna` block, expanded exclusions

---

## v0.14.6 — pre-v10 (final v9 master pattern)

Last release of the v9 monotone-cream-anchor pattern. See git history for prior changelog if needed.

---

## Version-bump workflow

When making any change to the plugin:

1. **Decide the bump level**
   - **Patch (0.15.0 → 0.15.1):** typo fixes, single-rule tweaks, vocabulary additions
   - **Minor (0.15.0 → 0.16.0):** new rules / new feature sections / register evolution / new sub-skill additions
   - **Major (0.15.0 → 1.0.0):** breaking changes that invalidate prior approved gens

2. **Copy the current version dir** to the new version number:
   ```
   cp -R ~/.claude/plugins/cache/aykah-marketplace/aykah/0.15.0 \
         ~/.claude/plugins/cache/aykah-marketplace/aykah/0.X.Y
   ```

3. **Update `.claude-plugin/plugin.json`** — bump `"version"` field
4. **Update `README.md`** — bump "Current version" line
5. **Add CHANGELOG.md entry** under a new `## v0.X.Y — YYYY-MM-DD (title)` heading with Added / Changed / Removed / Files modified sections
6. **Make the actual edits** to the new version dir
7. **Reload plugins** with `/reload-plugins` to pick up the new version
