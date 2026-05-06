# Aykah Lookbook — canonical brand examples

This file is the brand's visual north star. As approved generations accumulate in `~/.aykah/image-state.json`, the strongest 8–12 are summarized here as canonical references.

When the interior designer agent runs, it reads this file to anchor every new scene to the established Aykah look.

---

## Status: v10 Collected Lived-In register (LOCKED 2026-05-06)

**v10 supersedes v9 monotone-cream as the master register.** The interior designer agent MUST follow the v10 rules in `aykah-interior-designer.md` Living Room DNA (sections 1–17). The 6 canonical reference images below remain valid as DNA anchors — v10 evolves the register without invalidating them.

### What v10 changes vs v9

| Element | v9 (monotone) | v10 (collected lived-in) |
|---|---|---|
| Pillows | 4 knit-heavy in ivory→oatmeal→greige | 4–6 pillows with mixed textures (velvet + knit + linen minimum) + 1–2 deep-muted accent colors + exactly 1 patterned lumbar |
| Accent colors | Only ivory→greige neutrals | Deep muted earth tones IN: olive / chocolate / burgundy / mustard / rust / sage. Clean pastels OUT: navy / powder blue / blush / lemon / mint / jewel tones |
| Patterned pillow | Banned | EXACTLY ONE per scene (faded kilim / vintage tapestry / thin pinstripe) |
| Dark anchor | Only matte black art frame | 4 options: A) wall art (50%) / B) furniture — walnut credenza or black coffee table (30%) / C) architectural — black sconces or chandelier (15%) / D) matched 3-piece gallery (5%) |
| Wall art count | 1 piece always | EXACTLY 1 piece (3-piece matched gallery counts as 1 unit) — never 2+ separate pieces |
| Throws | Default cream chunky knit | Rotate: cream chunky / sage chunky / brown fringe / waffle / linen-mohair / brushed wool |
| Florals | Olive sprigs only | Modern: white tulips / fresh airy branches / rust-red dried berries / dried fennel. Banned: pampas, wheat, lavender, fake. |
| Books | Almost never | 2–3 plain solid-cover hardcovers, NO TEXT, stacked at slight off-angle |
| Furniture contrast | All cream-on-cream | At least ONE piece darker than sofa (walnut / black / dark fluted) |
| AI-realism cues | Implicit | Explicit — no symmetry, no perfect folds, single believable light origin, surfaces show real wear |

### Status: 6 living-room canonical references (v0.14.5 — still valid as DNA anchors)

The plugin ships with 6 approved canonical reference images in `references/lookbook-living-room/`. These define the visual register. The interior designer agent MUST match this register for any living-room scene, applying v10 layering rules on top.

### Canonical living-room references

| File | Vibe | Key DNA elements |
|---|---|---|
| `01-warm-cozy-corner-tile-feature-wall.jpg` | Warm cozy corner | Tile-paneled feature wall, single dark abstract art frame, mixed-texture pillows (boucle + linen + sheepskin + rust velvet), light wood drum coffee table, cream berber rug, warm-grey curtain |
| `02-bright-airy-vintage-classic-with-credenza.jpg` | Bright + airy + classic | Plain warm-cream wall, vintage landscape art on dark walnut credenza, brass-and-black chandelier, dark walnut coffee table, forest green accent chair, vintage faded rug, ~1.5m olive tree, white tulips |
| `03-gallery-wall-fluted-tables-vintage-rug.jpg` | Editorial-considered | White wainscot + picture rail + gallery of 3 black-frame photos with picture lights, dark fluted nesting coffee tables, mixed earth-tone pillows (forest green/brown/boucle/patterned), stoneware vase with branches, vintage faded medallion rug |
| `04-bright-spacious-coffered-ceiling-open-concept.jpg` | Bright + spacious + open | Coffered ceiling architectural feature, bright-white limewashed walls, black round coffee table, sage-green throw, jute rug, white tulips in stoneware, open to kitchen + dining nook beyond |
| `05-intimate-corner-cozy-textured-pillows.jpg` | Intimate cozy | Plain warm-cream wall, ONE large dark moody bison painting, ivory boucle sofa, 3 muted earth-tone textured pillows, light wood drum coffee table, chunky cable-knit throw, rust-red branches in cream stoneware, vintage faded rug |
| `06-bright-airy-light-wood-natural-jute.jpg` | Bright + airy + light-wood | Bright white limewashed walls, ONE matte-black-framed art piece + black-and-white sconce, light-oak live-edge coffee table, blonde wooden sideboard, jute rug, tall stoneware with branches, all-cream textured pillow stack |

### What these 6 share (the canonical living-room DNA)

- **Brightness:** all bright daylight, never moody or dim
- **Walls:** warm-natural cream OR bright-white lime-washed, ONE architectural feature per scene (wainscot OR paneling OR coffered ceiling OR feature wall — never stacked)
- **Wall art:** ONE substantial framed piece OR coordinated gallery — provides the dark anchor
- **Pillows:** 3–5 in tonal harmony (warm neutrals + earth accents, NEVER cool-blue or saturated)
- **Coffee table:** always characterful (drum, fluted, live-edge, dark walnut)
- **Wood tone:** ONE dominates per scene (light blonde OR dark walnut, not both stacked)
- **Rug:** vintage-faded warm OR cream loop-pile OR jute — textured, never plain
- **Greenery:** substantial single element (olive tree ~1.5m or tall branches in stoneware)
- **Decor:** stoneware vessel + book + considered objects (always present, never bare)
- **Light:** 5400K natural daylight, single window source, sheer linen filter
- **Lighting fixture:** ONE visible fixture (sconce, chandelier, floor lamp, pendant)

The designer agent applies these constraints organically — building a real interior-designed room, not picking from menus.

### Status

The lookbook also accepts approved AI generations over time. As the team approves gens via Step 7 of the skill, summaries get appended below.

---

## How entries are added

When a user marks a generation as **"Approve & save as reference"** (Step 7 of the skill), the skill:

1. Writes the full record to `~/.aykah/image-state.json` under `approved_generations[]`
2. If that record's `saved_as_reference` is `true`, the skill summarizes it here in lookbook format

A lookbook entry looks like this:

```
### Lookbook Entry — <date> — <topic>

**Mode:** lifestyle
**Product:** Aires Dining Chair (handle: aires-dining-chair)
**Vibe:** calm morning, north-facing kitchen
**Palette anchor:** warm ivory dominant, navy secondary, brass accent on a brushed pendant
**Materials surfaced:** boucle weave, warm wax-oiled white oak, plaster wall
**Light:** north-facing window from camera-left, overcast, gradual falloff
**Camera:** 50mm prime, f/2.8, eye-level
**Composition:** rule-of-thirds, single mug on table, throw casual on chair back, asymmetric
**Image path:** /Users/.../aykah-aires-20260430-1430.png
**Image URL:** <if hosted>
**Why this works:** ivory plaster + warm oak + brass pendant lock the brand palette without being on-the-nose. Light is unmistakably Canadian-domestic.

**Designer brief verbatim:**
<the designer agent's scene brief that produced this gen>

**Photographer technical layer verbatim:**
<the photographer agent's output>

**Final assembled prompt:**
<the prompt actually sent to the CLI>
```

---

## How the agents use this file

**Interior designer agent** reads every entry on every run. When constructing a new scene brief:

1. Find the entry closest in mode + room + vibe to the current request
2. Use its palette anchor, materials surfaced, and staging cues as the starting point
3. Vary only the elements the user has explicitly changed
4. If the lookbook is empty, fall back to `aykah-style-anchors.md` defaults

**Photographer agent** reads the technical layer + final prompt sections. When adding the technical layer to a new brief:

1. Match the lighting + camera setup of the closest lookbook entry by vibe
2. Carry forward any anti-pattern exclusions that worked

---

## Curation rule

Cap the lookbook at **12 entries.** When entry 13 is added:

- The skill compares the new entry to the existing 12
- The oldest entry that has the same mode + vibe as the new entry gets retired
- Lookbook stays at 12 max — no bloat, no overload of conflicting references

Retired entries stay in `~/.aykah/image-state.json` (full history) but drop out of the lookbook summary.

---

## Manual override

You can curate the lookbook directly. If a teammate edits this file manually:

- The skill respects manual edits and does not auto-overwrite them
- The auto-add behavior pauses until the manual edit is reviewed in the next run
- Running `/aykah:image lookbook reset` (or asking the skill to "reset the lookbook") restarts auto-population from current state JSON
