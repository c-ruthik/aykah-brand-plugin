---
name: image
description: Use to generate brand-consistent Aykah imagery — product photography, lifestyle scenes, hero shots, portraits — via the Higgsfield CLI. Triggers on phrases like "generate an image", "lifestyle shot", "render the [product]", "make a hero image", "Aykah image", "lifestyle photo", "product photography", or any prompt asking for visual content of an Aykah product. The skill detects the installed CLI, asks the user for generation options, dispatches an interior designer agent (which trains on user feedback) and a photographer agent (technical layer), assembles the prompt, generates directly, saves to a user-named folder, and stores feedback for future consistency.
---

# Aykah Image

Brand-consistent image generation. The skill orchestrates two specialist sub-agents — an **interior designer** (room, palette, staging, narrative) and a **photographer** (lens, light, composition, anti-AI-tells) — and shells out to the Higgsfield CLI to render. Approved generations train the interior designer's preferences over time so visual consistency builds with use.

**Core rule:** never generate without confirmed user inputs. Never invent product details. Never assume a save folder.

## When to use

- Lifestyle shots of Aykah products in a room context
- Product-only hero/render shots (clean background)
- Portrait shots with Aykah furniture in the scene
- Marketing imagery, ad creative, social-feed visuals, Pinterest pins

For social copy → `/aykah:social`. For long-form copy → `/aykah:copy`. For brainstorming visual concepts → `/aykah:buddy`.

## REQUIRED PRE-LOAD

Before any generation:

1. `../core/references/brand-facts.md` — positioning, reference brand set (Quince, Cuyana, Maiden Home, Brooklinen, Parachute, Sundays), anti-positioning (NOT Structube)
2. `../core/references/brand-design.md` — locked palette (Navy #363B57, Ivory #FAF8F4, Gold #B8956A) and materials vocabulary
3. `references/aykah-style-anchors.md` — locked visual phrases that go in every prompt
4. `references/aykah-anti-patterns.md` — banned visual cues + AI-tells (must be baked into positive prompt — Higgsfield doesn't support negative prompts)
5. `data/catalog.json` — 123 active Aykah products with material/color/texture/style metadata + Shopify image URL
6. `~/.aykah/image-state.json` — training data: approved gens, feedback, preferences, soul_ids (auto-created on first save)
7. `~/.aykah/cli-capabilities.json` — cached `higgsfield --help` output (auto-detected)

**No `brand-voice.md`. No `aykah-voice-gate` agent.** Image generation does not need banned-words checking on text — the output is an image, not customer-facing copy.

## Step 1 — Detect CLI

On first use (or if cache is empty / older than 30 days):

```bash
which higgsfield                                      # is the CLI on PATH?
higgsfield --help                                     # top-level commands
higgsfield generate --help                            # generate group
higgsfield generate create --help                     # main generate command
higgsfield soul --help                                # character training
higgsfield workspace --help                           # balance + history
```

Parse the output, write the discovered flags + values to `~/.aykah/cli-capabilities.json`. The skill reads this cache on every invocation to know what flags to ask about.

### If CLI is NOT installed

Show this and STOP — do not proceed:

```
Higgsfield CLI is not installed. To use /aykah:image, install it first:

  Mac/Linux:
    curl -fsSL https://raw.githubusercontent.com/higgsfield-ai/cli/main/install.sh | sh

  Or via Homebrew:
    brew install higgsfield-ai/tap/higgsfield

Then authenticate:
  higgsfield auth login

Then run /aykah:image again.
```

Do not try to fall back to other tools without explicit user direction.

## Step 2 — Ask the user (one batch)

Ask the question set in a single message, listing only the options that the CLI capabilities cache confirms exist. Defaults pulled from `~/.aykah/image-state.json` if previously set.

```
Before I generate, I need a few things:

  1. Mode? [product / lifestyle / portrait / hero]
  2. Product? [pick from catalog by handle, e.g. "aires-dining-chair", or describe]
  3. Vibe / time of day? [calm morning / golden hour / overcast / candid evening / styled]
  4. Room? [from product's room_suggestions, or describe]
  5. People? [0 / 1 / 2-4]   (if 1+, ask: Soul ID OR generic description)
  6. Model? [list from CLI capabilities, e.g. nano_banana_2 / soul_2 / flux / ...]
  7. Aspect ratio? [list from CLI capabilities]
  8. Quality? [4K if available, else highest]
  9. Reference image? [URL OR product's primary_image OR a previously approved gen OR none]
```

If the user names a product handle, look it up in `data/catalog.json` and silently use the materials, colors, textures, style_tags, room_suggestions, and primary_image — don't re-ask the user for those.

If a question's value is already in their state JSON as a saved default (e.g., they always shoot 4K, or always use the same Soul ID), don't re-ask. Just confirm the default in one line and move on.

## Step 3 — Dispatch agents (in this order)

### 3a. Interior Designer agent

Send: catalog product details + user inputs (vibe, room, people, palette mood) + read-access to `~/.aykah/image-state.json` (so the agent learns from approved gens).

The designer reads:
- `aykah-style-anchors.md` for the locked palette/materials vocabulary
- `~/.aykah/image-state.json` for: previously-approved generations, user-stated preferences, disliked patterns

Returns a **scene brief**: room description, palette, materials, staging, narrative. Brand-aligned, reference-set-aligned, anti-Structube. No technical photography terms.

### 3b. Photographer agent

Receives the scene brief.

Reads:
- `aykah-style-anchors.md` for the locked camera/light/composition phrases
- `aykah-anti-patterns.md` for AI-tells to bake into the positive prompt (since Higgsfield has no negative prompt field)

Returns the **technical layer**: lens, aperture, light direction + quality, composition, anti-AI-tell language.

## Step 4 — Assemble the full prompt

Combine the designer's scene brief + the photographer's technical layer into one 5-block prompt:

```
[Subject + product] + [Environment] + [Light] + [Camera] + [Composition + anti-AI-tells]
```

Build the CLI command:

```bash
higgsfield generate create <MODEL> \
  --prompt "<full assembled prompt>" \
  [--reference <product primary_image URL or user-supplied>] \
  [--quality 4k OR highest CLI exposes] \
  [--aspect-ratio <user choice>] \
  [<any other flags the CLI supports>]
```

**Use exactly the flags the CLI capabilities cache confirms exist.** Do not invent flags.

## Step 5 — Generate directly

By default, do NOT show the prompt or command before running. Generate immediately.

**Exception:** if the user explicitly asks ("show me the prompt first", "let me see the command before you run it"), display the assembled prompt + command and wait for approval.

Run the CLI. Wait for output (the CLI may be sync or return a job ID — both handled).

If it returns a job ID, poll until status is `completed`, `failed`, or `nsfw`. Surface the URL or local path of the result.

## Step 6 — Save to user's folder

Ask the user where to save:

> Where should I save the image? Provide the full folder path. I'll create the folder if it doesn't exist (with your confirmation).

If the user provides a path:
- If folder exists → save the image there as `aykah-<topic>-YYYYMMDD-HHMMSS.png`
- If folder does NOT exist → ask once: *"Folder doesn't exist. Create it?"*. On yes, create and save. On no, ask for a different path.

Never assume a default folder.

## Step 7 — Show + ask for feedback

Show the image (display path, open in viewer if possible).

Then ask:

```
How does this look?

  1. Approve & save as reference    (becomes a training anchor for future gens)
  2. Approve only                    (this image is fine, don't make it a reference)
  3. Refine                          (tell me what to change — palette, light, staging, etc.)
  4. Discard with reason             (what was wrong — added to disliked patterns)
```

## Step 8 — Train the agents (write feedback to state)

Based on the user's response, write to `~/.aykah/image-state.json`:

```json
{
  "approved_generations": [
    {
      "handle": "aires-dining-chair",
      "mode": "lifestyle",
      "prompt": "...",
      "model": "nano_banana_2",
      "params": { ... },
      "reference_image_used": "...",
      "image_path": "/Users/.../aykah-aires-20260430-1430.png",
      "user_tags": ["kitchen", "morning", "approved"],
      "saved_as_reference": true,
      "timestamp": "2026-04-30T14:30:00Z"
    }
  ],
  "user_preferences": {
    "default_model": "nano_banana_2",
    "default_aspect": "4:5",
    "always_4k": true,
    "preferred_vibes": ["calm morning", "overcast"]
  },
  "disliked_patterns": [
    "overhead lighting",
    "magazine-symmetry staging",
    "stock-smile portraits"
  ],
  "user_feedback_log": [
    {
      "timestamp": "...",
      "context": "lifestyle/aires-dining-chair",
      "feedback": "the linen looked too saturated — pull warmth out next time"
    }
  ],
  "soul_ids": {
    "vancouver-woman-30s": "uuid-from-higgsfield",
    "salman": "uuid-from-higgsfield"
  }
}
```

The interior designer agent reads this state on every run. Approved generations become anchors. Feedback patterns become rules. Disliked patterns become anti-patterns the designer avoids.

This is the training loop. Real ML training is not possible from a Claude skill, but persistent preference memory + reference-image conditioning gets ~80% of the consistency benefit.

## Hard rules

1. **Never generate without confirmed user inputs.** If anything is missing, ask.
2. **Never invent product details.** Always look up the product handle in `catalog.json`.
3. **Never assume a save folder.** Always ask. Confirm folder creation if it doesn't exist.
4. **Never auto-fall-back to a different tool** if the CLI isn't installed. Show install instructions and stop.
5. **Never show the prompt or command unless the user explicitly asks** — generate directly.
6. **Never skip the feedback step.** That's the training data; the skill gets worse without it.
7. **Always pass the product's primary_image as the reference image** for img2img-capable models when the user hasn't supplied a different reference. This is the strongest consistency anchor.

## Common mistakes to avoid

| Mistake | Fix |
|---|---|
| Generating before all required inputs are confirmed | Ask the question batch every time. Skip only the questions whose defaults are already in state. |
| Assuming a save path | Always ask for the full folder path. |
| Showing the prompt by default | Don't. Only show if user explicitly asks to see it before generation. |
| Skipping feedback collection | Ask after every generation. Even one-line feedback is training data. |
| Inventing product material details | Read `catalog.json` for the named handle. Never make up textures or colors. |
| Hardcoding CLI flags from the README | The README is thin. Use cached `higgsfield --help` output to know what flags exist. |
| Negative-prompt syntax in the prompt | Higgsfield CLI doesn't support negative prompts. Bake "shot without X" / "no X" into the positive prompt instead. |
