# Aykah Brand Plugin — Changelog

Version-bump rule: **every change to skill files, agents, or data references = new version**. Patch bump for tweaks, minor bump for new rules / register changes / new features, major bump for breaking changes.

## v0.15.3 — 2026-05-06 (wall art subject ban — no florals/botanicals)

The AI defaults to "framed floral painting" for any wall art slot because that's the most common framed-art pattern in its training data. v0.15.3 explicitly bans floral and botanical subject matter for wall art across all 4 dark-anchor options and adds explicit approved-subject enumeration so the model converges on the right register.

### Added
- **Approved wall art subject list** (must be explicitly named in every prompt):
  - Gestural abstract ink-wash (cream + black brushstrokes)
  - Minimal line drawing (single continuous line)
  - Moody charcoal landscape (cliff / mountain / dunes / horizon — NOT floral fields)
  - Brown-toned animal portrait (bison, horse, dog)
  - Sepia / vintage B&W photograph (architecture, portrait, landscape)
  - Tonal abstract color-field (cream + dark muted earth)
  - Stretched canvas with raw texture + minimal black mark-making

- **Banned wall art subject list** (12 categories, must be explicitly excluded):
  - Floral paintings (single bloom, bouquet, vase-of-flowers, still-life)
  - Botanical prints, pressed-flower frames, herbarium illustrations
  - Watercolor florals (the AI's default — explicitly out)
  - Vintage / Victorian floral oil paintings
  - Tropical / monstera / palm-frond prints
  - Sunset / sunrise paintings
  - Pop-art / bright-color modern abstract
  - Inspirational typography / quote prints
  - Family-photo / wedding-photo portraits
  - Religious iconography
  - Sports / vintage-poster prints
  - Animal-print / leopard / zebra patterned art

### Files modified
- `agents/aykah-interior-designer.md` — Section 2 (dark anchor) Option A rewritten with explicit approved + banned subjects; Option D 3-piece gallery clarified to never be floral
- `skills/image/references/aykah-style-anchors.md` — Dark anchor Option A enriched with subject list + ban list
- `skills/image/references/aykah-anti-patterns.md` — new "Wall art subject ban" section with rationale and full list
- `skills/image/data/prompt-pattern.json` — `A_wall_art_50pct` field expanded with subject specs; `exclusions.objects` array adds 12 new ban lines

---

## v0.15.2 — 2026-05-06 (knit family banned in decor)

Knit-family textures (waffle / cable / sherpa / chunky knit / shaggy / mongolian / loop-pile) are now BANNED across all decor — pillows, throws, AND rugs. Boucle is banned in pillow decor when the catalog product (sofa/chair) is boucle, allowed only as ONE pillow when the hero is non-boucle.

### Changed
- **Pillow texture matrix** — Slot 1 now slub linen / raw linen / textured woven cotton (was: ivory tight-loop boucle). Slot 2 now brushed wool herringbone / wool flat-weave / matte cotton (was: oatmeal slub linen). Slot 6 now boucle exception (allowed only when sofa is non-boucle) — replaces shaggy/fur slot which is fully banned.
- **Hard texture rule** — was "1 velvet + 1 knit/boucle + 1 linen-weave"; now "1 velvet + 1 linen-weave + 1 wool flat-weave or matte cotton."
- **Throws rotation** — chunky cable-knit, waffle-knit, fringe-knit, sage chunky knit, brown fringe knit all RETIRED. Rotation now: linen-mohair flat blend / brushed wool flat-weave / wool herringbone / cashmere flat / woven cotton / raw linen / suede.
- **Rugs** — cream loop-pile / berber chunky knit / cable-knit-style / cozy chunky knit / shaggy / sherpa all RETIRED. Approved: vintage faded oriental / hand-woven wool flatweave / tufted wool cut-pile / jute / low-pile vintage moroccan / faded persian medallion.

### Added
- Boucle-on-boucle ban (boucle pillow on boucle sofa = fail).
- New approved rug list: hand-woven wool flatweave, tufted wool cut-pile, low-pile vintage moroccan, faded persian medallion.
- New `pillow_textures_approved`, `pillow_textures_banned`, `boucle_pillow_rule`, `throws_approved_woven_only`, `throws_banned_knit_family`, `rugs_approved_woven_or_tufted`, `rugs_banned_knit_family` fields in prompt-pattern.json.

### Files modified
- `agents/aykah-interior-designer.md` — Living Room DNA sections 3 (pillows), 4 (throws), 7 (rugs) rewritten + self-check + hard-fail conditions updated
- `skills/image/references/aykah-style-anchors.md` — pillow texture matrix rewritten, hard rule updated
- `skills/image/references/aykah-anti-patterns.md` — knit-only ban replaced with knit-family ban (pillows + throws + rugs), rug rules expanded
- `skills/image/data/prompt-pattern.json` — v10_register description updated, new texture/rug fields added, exclusions expanded

---

## v0.15.1 — 2026-05-06 (v10 contradiction cleanup)

Patch fix for contradictions left over from v9 in the v0.15.0 release. The new v10 rule is **EXACTLY ONE wall art piece per scene** but several legacy sections still said "wall art on every visible wall." Resolved.

### Fixed
- `agents/aykah-interior-designer.md` line 454 — combo-count table now says "EXACTLY ONE wall art piece (v10 rule)" instead of "wall art on every visible wall"
- `agents/aykah-interior-designer.md` line 465 — dining-table hero rule now says "ONE substantial piece on the main wall" instead of "Wall art on every visible wall"
- `agents/aykah-interior-designer.md` line 523 — LIFESTYLE block now reflects v10 single-piece rule
- `agents/aykah-interior-designer.md` line 720 — output template WALL ART block now describes v10 single-piece rule with matched-3-piece-gallery exception
- `agents/aykah-interior-designer.md` line 753 — self-check question now asks for EXACTLY ONE wall art piece
- `agents/aykah-interior-designer.md` line 768 — Hard Rule 8 now reflects v10 single-piece rule + clarifies multi-art-walls = INSTANT FAIL
- `skills/image/SKILL.md` line 376 — photographer 24-item checklist now reflects v10 single-piece rule + updates rug check to allow vintage faded oriental / berber / jute (was: "no jute / sisal / flatweave")
- `.claude-plugin/marketplace.json` + `.claude-plugin/plugin.json` + `README.md` — version bumped to 0.15.1

### Why this matters
v0.15.0 had the v10 rules in the new sections but legacy sections still said "wall art on every visible wall" — agents would obey whichever rule appeared most recently in their context, causing inconsistent behavior. v0.15.1 makes the v10 single-piece rule consistent across every section that mentions wall art.

---

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
