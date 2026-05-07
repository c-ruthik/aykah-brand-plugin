# Aykah Brand Plugin — Changelog

Version-bump rule: **every change to skill files, agents, or data references = new version**. Patch bump for tweaks, minor bump for new rules / register changes / new features, major bump for breaking changes.

**Trial rule:** significant skill changes ship as TRIAL with explicit `**TRIAL — pending verification**` tag. Ruthik tests, then says "keep" (remove tag, lock) or "revert" (`git revert <commit>` + version bump-down). See `~/.claude/projects/-Users-ruthik-Downloads-Brand-guidelines/memory/feedback_skill_trial_first.md`.

## v0.17.0 — 2026-05-07 (preview combo step + 5 hardenings) — **TRIAL — pending verification**

**TRIAL STATUS:** Ruthik to test, then say "keep" or "revert."

Bundled response to user feedback after testing v0.16.1 trial: angle wasn't enforcing (front → 3/4), rug was missing in some gens, designer always defaulted to wood coffee tables, room palette was monotoning with hero color, and there was no preview step before generation.

### Added

**1. PREVIEW COMBO step (NEW workflow feature)**
- Before sending prompt to engine, the skill now displays a structured preview block to the user showing: room variant + hero (catalog handle/title/material/color + reference image URL) + supporting catalog products + wall art + pillows + plant + rug + light fixture + coffee-table decor + contrast check + angle lock + camera specs + key exclusions
- User responds with "yes" / "no" / "tweak <X>" before generation proceeds
- Catches wrong variant choices, wrong angle, missing rug, monotone clashes BEFORE burning a 2–3min generation

**2. Hero-Room Contrast Rule (prevents monotone match)**
- 5 hero color buckets: LIGHT / LIGHT-MID / MID / MID-DARK / DARK
- Each bucket has required contrast count: ≥ 2 contrast elements (e.g., LIGHT hero requires 2+ DARK contrast points: dark walnut table / matte black frame / etc.)
- Hard-fail if room contrast count < 2
- Solves the "cream sofa + cream room + cream rug" monotone failure mode

**3. Coffee Table Catalog Rotation**
- Designer must pick coffee table from `available_secondary_products[]` (catalog), filtered by variant's coffee-table type
- Use exact catalog handle/title — never generic "wooden coffee table"
- Rotation rule: read state file for last 3 gens of same variant, pick DIFFERENT catalog table
- 4 hard-fail conditions added

### Hardened

**4. Angle hard-lock — triple-mention required**
- Angle must appear in prompt at LEAST 3 places: opening sentence, camera section, exclusions block
- Generic "flattering angle" = HARD FAIL
- Per-angle exclusion lists locked: front excludes "3/4, side, back, angled, rotated"; side excludes "front face visible, 3/4, back, perspective"; etc.
- Photographer agent's 24-item check is now 28-item — 4 new v0.17.0 checks for angle, reference-match, variant-coffee-table, reference-match opening clause

**5. Rug MANDATORY in every situation**
- Was: soft self-check item — agent could skip
- Now: HARD FAIL if missing. Applies to all lifestyle/hero/portrait/social-media gens. Only studio + cutout exempt.
- Photographer prompt MUST explicitly state: "MANDATORY: deep-pile cozy plain rug visible under hero, hero feet grounded, extends 12-18in beyond sofa edges"
- 5 hard-fail conditions enumerated

**6. Reference-image match strengthened**
- For ALL hero gens (lifestyle/hero/portrait/social-media), `primary_image` URL is mandatory `medias[0]` to engine — not just for img2img edits
- Photographer 24-item check #17 now: "REFERENCE-IMAGE MATCH (v0.17.0 — strengthened) — does prompt explicitly say MATCH ATTACHED REFERENCE IMAGE PIXEL-FOR-PIXEL? Is primary_image passed as medias[0]? If hero gen and no primary_image attached = HARD FAIL"
- Opening clause check: "first sentence after ANGLE LOCKED must say REFERENCE-MATCH MODE: hero visually matches attached primary reference image, no invented variations"

### Files modified
- `agents/aykah-photographer.md` — quality verification expanded from 24 to 28 items (4 new v0.17.0 checks: angle triple-mention, angle exclusion specificity, variant-locked catalog coffee table, reference-match opening clause)
- `agents/aykah-interior-designer.md` — added Hero-Room Contrast Rule section (5 buckets + contrast budget), Mandatory Rug section (hard-fail conditions), Coffee Table Catalog Rotation section (catalog filter + rotation + naming rules)
- `skills/image/SKILL.md` — added Step 3.5 PREVIEW COMBO with full preview block format + user response handling; Step 4 reinforced with reference-image-as-medias[0] mandate
- `skills/image/data/prompt-pattern.json` — 5 new blocks: `angle_lock_hardened_v0_17_0`, `rug_mandatory_v0_17_0`, `coffee_table_catalog_rotation_v0_17_0`, `hero_room_contrast_rule_v0_17_0`, `preview_combo_step_v0_17_0`

### To revert if it doesn't work
```
cd /Users/ruthik/Downloads/Brand_guidelines/aykah_claude_skill
git revert HEAD
git push origin main
git tag -d v0.17.0 && git push origin :refs/tags/v0.17.0
# Bump back to 0.16.1 in plugin.json + marketplace.json + README.md
```

---

## v0.16.1 — 2026-05-07 (per-variant decor + chandelier decision tree) — **TRIAL — pending verification**

**TRIAL STATUS:** Ruthik to test, then say "keep" or "revert."

Two upgrades to fix the "every scene's coffee table looks the same" + "chandelier shows up in wrong rooms" problems.

### Added

**1. Per-variant decor palettes (TRIAL)**
- Each variant (A–G) now defines its OWN coffee-table decor specification (3–4 objects). Replaces the global stoneware-vessel + travertine-dish + books default that made every scene look identical.
- Per-variant decor palettes:
  - **A — Bright Coastal:** small cream stoneware vase + 2 plain cream/oat books + travertine catch dish
  - **B — Warm Walnut Classic:** dark stoneware vessel with dried-stem + 2 chocolate-spine books + brass-tipped candlesticks (unlit) + brass tray
  - **C — Editorial Paneled:** cream + black ceramic catch dish + antique brass tray with 1 cream-spine book + small handheld stoneware
  - **D — Coffered Open:** cream stoneware low bowl + small matte black candle on travertine tray (unlit) + 1 cream book
  - **E — Intimate Corner:** ceramic incense burner + 1 chocolate-spine book + cream earthenware bowl + small brass dish
  - **F — Editorial Classic:** travertine catch dish + 2 cream/chocolate books stacked + handheld stoneware vessel + ceramic acorn / organic object
  - **G — Moody Cinematic Cozy:** **LIT** warm copper / brass candle (visible glow) + deep-burgundy-spine book + dark stoneware bowl with dried stem + brass tray with amber-glass vessel
- Global "Other decor" section now defers to per-variant decor with global caps (max 4 objects, texture triangulation, books plain spines, lit candles only in G).

**2. Chandelier decision tree (TRIAL)**
- 4-step decision tree for when/how to use chandeliers:
  - **D1 — When chandelier:** B = always (mandatory), D = conditional on ceiling height, G = always (lit), A/C/E/F = never
  - **D2 — Scale rule:** diameter (in) ≈ (room width + length in ft) ÷ 2 — industry rule
  - **D3 — Ceiling height:** > 11ft = proportional taller chandelier OK; 9–11ft = standard; < 9ft = NEVER chandelier (use sconce / floor lamp)
  - **D4 — Lit vs unlit:** 5400K daylight variants (A–F) UNLIT; variant G LIT mandatory; lit candles ONLY in G coffee-table decor
- 5 hard-fail conditions added (replace variant's locked fixture / chandelier in A/C/E/F / chandelier < 9ft ceiling / 2+ chandeliers / lit chandelier in daylight scene).
- Secondary fixture rule for variants A/C/E that default to "daylight only" — ONE small modern pendant OR low-profile flush-mount allowed if ceiling reads visually empty.

### Files modified
- `agents/aykah-interior-designer.md` — 7 variant tables now have a Decor row; new Chandelier decision tree section before self-check; global "Other decor" section now defers to per-variant
- `skills/image/data/prompt-pattern.json` — new `decor_per_variant_v0_16_1_TRIAL` and `chandelier_decision_tree_v0_16_1_TRIAL` blocks (both tagged TRIAL)

### To revert if it doesn't work
```
cd /Users/ruthik/Downloads/Brand_guidelines/aykah_claude_skill
git revert HEAD
git push origin main
git tag -d v0.16.1 && git push origin :refs/tags/v0.16.1
# Bump back to 0.16.0 in plugin.json + marketplace.json + README.md
```

---

## v0.16.0 — 2026-05-07 (room variants + product-driven selection + new Variant G)

Solves the "every gen looks like the same room" problem. The agent now picks ONE of 7 living-room variants based on the hero product's catalog `style_tags` + `materials`. Variant G is a NEW boss-approved moody-cinematic register that deliberately reverses several global v0.15.x rules.

### Added
- **7 Living Room Variants** with locked DNA per variant (walls, floor, coffee-table style, light fixture, wall-art subject, pillow accents, throw, greenery, color-temp K, time of day, composition bias, reference brands):
  - **A — Bright Coastal** (default for modern curved boucle pieces)
  - **B — Warm Walnut Classic** (walnut wood-frame pieces)
  - **C — Editorial Paneled** (vintage-classic upholstered + bookshelves)
  - **D — Coffered Open** (spacious open-concept lifestyle)
  - **E — Intimate Corner** (moody / smaller / MCM)
  - **F — Editorial Classic** (slim classic linen + travertine — board-and-batten + herringbone + arc lamp + olive throw)
  - **G — Moody Cinematic Cozy** *(NEW boss-approved)* — taupe-brown moody walls + dark walnut floor + black slatted drum coffee table + 3000–3500K warm tungsten + multi-source lit floor lamp + warm-amber hero cast + olive/burgundy/chocolate velvet pillow stack + dark chocolate mohair throw. Soho House / RH Modern register.

- **Product → Variant mapping table** (12 product types pre-mapped) so each hero product picks its correct room variant automatically.
- **Selection rule + self-check** — agent must print `Room variant: <letter — name>` as the first line of CREATIVE DIRECTION; apply variant DNA; verify overrides ARE applied; never blend two variants.
- **Variant G global-rule overrides explicitly declared** — 8 global rules that variant G deliberately reverses (5400K → 3000–3500K, single window → multi-source, warm-amber banned → warm-amber hero cast, navy banned → navy allowed as deep velvet, etc.).
- **`match_product_reference_image_v0_16_0`** rule — hero must match catalog primary_image EXACTLY (material, color, silhouette, leg style, proportions). Pass primary_image as engine reference image. Never imagine variations.

### Changed (hardened)
- **Angle hard-lock** — strengthened with literal interpretation (front = front only, no 3/4 substitution, no "angled-front"). Each angle now has explicit "hard fail if generated" criteria. Self-check question added.
- **Catalog discipline** — split into Rule A (use catalog products only) + Rule B (match primary_image exactly). Two non-negotiable rules at HIGHEST PRIORITY.

### Files modified
- `agents/aykah-interior-designer.md` — new ROOM VARIANT SELECTOR section (7 variants + mapping + self-check), Angle hard-lock section hardened with hard-fail criteria, Catalog discipline expanded with Rule A + Rule B
- `skills/image/data/prompt-pattern.json` — new `room_variants_v0_16_0` block (7 variants + mapping + selection rule), new `angle_lock_v0_16_0` block, new `match_product_reference_image_v0_16_0` block

### Why
v0.15.x rules were so prescriptive that every product converged on the same default room (cream walls + light oak + matte black art + olive tree). Different products need different rooms. Variant G specifically adds a moody/cinematic register the brand wanted but couldn't access under the "bright airy" global rules.

---

## v0.15.5 — 2026-05-06 (deep-pile cozy rugs only — flat rugs banned)

User clarified "best cozy rugs possible — no flat rugs." v0.15.4 had hand-woven wool flatweave + jute as approved options; both retired in v0.15.5. The bar is now plush deep-pile only.

### Changed
- Approved rug list narrowed from 4 to 4 cozy-only options:
  - Plush cut-pile wool rug (1.5–2.5cm pile, dense, plain solid cream/oatmeal/warm-greige) — DEFAULT
  - Hand-tufted wool rug with subtle slub variation (~2cm pile, plain)
  - Hand-knotted wool rug with high cut pile (~2.5cm pile, plain cream/oatmeal)
  - Mohair / cashmere wool blend rug (~2cm pile, plain solid cream — premium)
- Banned added: hand-woven wool flatweave, jute, sisal-cotton blend, plain low-pile rugs.

### Texture target
"You'd want to walk on this barefoot." Deep cut-pile, dense, plush, soft. Cream-on-cream subtle tonal variation OK; never patterned, never knit-loops, never flat.

### Files modified
- `agents/aykah-interior-designer.md` — Section 7 rewritten v0.15.5 + self-check + hard-fail updated
- `skills/image/references/aykah-anti-patterns.md` — rug rules rewritten
- `skills/image/data/prompt-pattern.json` — `rugs_approved_deep_pile_cozy_plain_only` field renamed and narrowed; new `rug_texture_target` field; v10_register description updated; new exclusion line for flat/jute/low-pile

---

## v0.15.4 — 2026-05-06 (cozy plain rugs only + one plant total + no cramped spaces)

Three feedback-driven rule tightenings.

### Changed
- **Rugs — cozy plain only.** v0.15.2 allowed vintage faded oriental / persian medallion / moroccan motif. All retired in v0.15.4 — traditional patterns BANNED. Approved list narrowed to 4 cozy plain options: hand-woven wool flatweave (cream / oatmeal solid), tufted wool cut-pile (plain), plain cream wool, jute / sisal-cotton blend (neutral plain). Room contrast comes from FURNITURE + WALL ART, not from rug pattern.
- **Plant count — exactly ONE plant TOTAL per scene.** Was: 1 floor greenery + fresh florals on coffee table allowed (= 2 plants). Now: pick ONE slot — floor option (substantial olive tree / tall floor branches / dried floor urn) OR table option (small single-stem arrangement). Never both. Never multiple potted plants / herb pots / succulents / mixed-flower bouquets.
- **Furnishing density renamed "Spaciousness" — explicit no-cramped-spaces rule.** Coffee table 18–24 inches from sofa, walls 70%+ empty above the dado line, floor 50–70% visible, ceiling reads tall, hero owns its zone with 2–3 feet of breathing room. 7 cramped-space failure modes explicitly banned.

### Added
- New `rugs_approved_cozy_plain_only` + `rugs_banned_v0_15_4` fields in prompt-pattern.json.
- New `plant_count_per_scene: 1` + `plant_count_rule` + `spaciousness_rule` + `cramped_space_failures_banned` fields.
- 7 new exclusion lines in prompt-pattern.json `exclusions.objects`: traditional-pattern rugs, 2+ plants, mixed bouquets, cramped spaces, wide-angle compression.
- 3 new hard-fail conditions in interior-designer self-check: traditional-pattern rug, 2+ plants, cramped spaces.

### Files modified
- `agents/aykah-interior-designer.md` — Sections 7 (rugs rewritten cozy-plain only), 8 (greenery now ONE plant total), 9 (florals + decor reconciled with plant cap), 14 (renamed to Spaciousness with explicit cramped bans). Self-check + hard-fail updated.
- `skills/image/references/aykah-anti-patterns.md` — rug rules rewritten v0.15.4 + new Plant count cap section + new Cramped-space ban section.
- `skills/image/data/prompt-pattern.json` — v10_register description updated, new rug/plant/spaciousness fields, expanded exclusions.

---

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
