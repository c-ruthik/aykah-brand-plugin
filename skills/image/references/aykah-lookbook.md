# Aykah Lookbook — canonical brand examples

This file is the brand's visual north star. As approved generations accumulate in `~/.aykah/image-state.json`, the strongest 8–12 are summarized here as canonical references.

When the interior designer agent runs, it reads this file to anchor every new scene to the established Aykah look.

---

## Status: empty (v1)

The lookbook is **empty on first install**. It populates as the team approves generations.

The skill works without canonical examples — it falls back on `aykah-style-anchors.md` and the catalog product images. But once the lookbook has 5+ entries, consistency improves significantly because the designer agent has real Aykah references, not just abstract anchors.

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
