---
name: image
description: Use to generate brand-consistent Aykah imagery — product photography, lifestyle scenes, hero shots, portraits — via the Higgsfield CLI. Triggers on phrases like "generate an image", "lifestyle shot", "render the [product]", "make a hero image", "Aykah image", "lifestyle photo", "product photography", or any prompt asking for visual content of an Aykah product. The skill detects the installed CLI, asks the user for generation options, dispatches an interior designer agent (which trains on user feedback) and a photographer agent (technical layer), assembles the prompt, generates directly, saves to a user-named folder, and stores feedback for future consistency.
---

# Aykah Image

Brand-consistent image generation. The skill orchestrates two specialist sub-agents — an **interior designer** (room, palette, staging, narrative) and a **photographer** (lens, light, composition, anti-AI-tells) — and shells out to the Higgsfield CLI to render. Approved generations train the interior designer's preferences over time so visual consistency builds with use.

**Core rule:** never generate without confirmed user inputs. Never invent product details. Never assume a save folder.

## Scene Set mode (multi-angle, single-room consistency)

When the user asks for **multiple scenes of the same product** (e.g., "5 scenes of Aires" or "front, three-quarter, side, and detail of Mellow"), the skill activates **Scene Set mode**:

- Designer produces ONE scene plan + N camera variations (different angle, lens, framing)
- All N gens share the room, lighting, palette, supporting furniture, materials
- Only the camera position changes between renders
- Result: a coherent set that looks like the same shoot, not 5 disconnected images

This solves the "different room every time" inconsistency. Use when the user wants a PDP carousel, multi-angle product set, or hero + variations.

To opt out and get N independent scene plans (different rooms), the user can pass `--no-scene-set` or ask for "different rooms" / "different scenes" explicitly.

## When to use

- Lifestyle shots of Aykah products in a room context
- Product-only hero/render shots (clean background)
- Portrait shots with Aykah furniture in the scene
- Marketing imagery, ad creative, social-feed visuals, Pinterest pins

For social copy → `/aykah:social`. For long-form copy → `/aykah:copy`. For brainstorming visual concepts → `/aykah:buddy`.

## REQUIRED PRE-LOAD

Before any generation:

1. **`~/.aykah/prompt-pattern.json`** — **HIGHEST PRIORITY.** The Aykah Image Prompt Pattern (Benetha-derived). Contains 9-block skeleton, vocabulary, exclusions, scene formula, templates by product type. If this file doesn't exist, copy it from the bundled template at `data/prompt-pattern.json` (one-time bootstrap on first run).
2. `../core/references/brand-facts.md` — positioning, reference brand set (Quince, Cuyana, Maiden Home, Brooklinen, Parachute, Sundays), anti-positioning (NOT Structube)
3. `../core/references/brand-design.md` — design tokens. **NOTE: brand colors here are graphic-design-only. Do NOT auto-inject Navy / Ivory / Gold into image prompts. Image gen uses Benetha's earthy-neutrals palette by default. Only apply brand colors when the user explicitly names them.**
4. `references/aykah-style-anchors.md` — visual phrases (Benetha vocabulary folded in)
5. `references/aykah-anti-patterns.md` — banned visual cues + AI-tells + Benetha's full anti-AI/anti-staged/anti-symmetry set (must be baked into positive prompt — Higgsfield doesn't support negative prompts)
6. `data/catalog.json` — 123 active Aykah products with material/color/texture/style metadata + Shopify image URL. **The catalog is the ONLY source of truth for product names — never invent.**
7. `references/local-image-resolver.md` — folder validation, supported file types, batch upload sequence
8. `references/catalog-validator.md` — catalog discipline rules (filter inline + validate after pattern)
7. `data/prompt-pattern.json` — bundled template (canonical pattern; copied to `~/.aykah/prompt-pattern.json` on first run)
8. `references/naming-guide.md` — canonical Aykah AI image naming convention
9. `~/.aykah/image-state.json` — training data: approved gens, feedback, preferences, soul_ids, default engine (auto-created on first save)
10. `~/.aykah/engine-capabilities.json` — cached detection of installed Higgsfield engines (auto-detected)

**No `brand-voice.md`. No `aykah-voice-gate` agent.** Image generation does not need banned-words checking on text — the output is an image, not customer-facing copy.

## Prompt-pattern bootstrap (first-run setup)

On the first invocation of `/aykah:image` (or whenever `~/.aykah/prompt-pattern.json` doesn't exist):

1. Check if `~/.aykah/prompt-pattern.json` exists.
2. If NOT, copy `data/prompt-pattern.json` (bundled in this plugin) to `~/.aykah/prompt-pattern.json`.
3. From now on, both agents read the durable copy at `~/.aykah/prompt-pattern.json` — plugin updates can't clobber learned local state.

When the plugin ships a pattern update (e.g., `v1` → `v2`):

1. Compare `version` field in bundled vs durable copy.
2. If bundled is newer, ask the user: *"Pattern update available: v1 → v2. Merge updates? [yes / no / show diff]"*. On `yes`, overwrite. On `no`, keep durable copy as-is. On `show diff`, display the changes and re-prompt.

## Step 1 — Detect engines (CLI or MCP)

The skill supports TWO ways of calling Higgsfield: the CLI binary or the Higgsfield MCP server. Detect both at startup, ask the user to pick if both are available, and use the chosen engine for the rest of the session.

On first use (or if `~/.aykah/engine-capabilities.json` is empty / older than 30 days):

### Detect the CLI

```bash
which higgsfield                                      # is the CLI on PATH?
higgsfield --help                                     # top-level commands
higgsfield generate --help                            # generate group
higgsfield generate create --help                     # main generate command
higgsfield soul --help                                # character training
higgsfield workspace --help                           # balance + history
```

Parse output and capture: cli_version, available models, available flags (--quality, --reference, --aspect-ratio, etc.), supports_4k boolean.

### Detect the MCP

Check the available tools list for any tool whose name starts with `mcp__higgsfield`. If present, the Higgsfield MCP is connected.

For each detected MCP tool (e.g. `mcp__higgsfield__generate_image`, `mcp__higgsfield__create_character`, `mcp__higgsfield__list_characters`), record the tool's parameter schema.

Also check the MCP resources `higgsfield://styles`, `higgsfield://characters`, `higgsfield://motions` if accessible.

### Write capabilities cache

Write to `~/.aykah/engine-capabilities.json`:

```json
{
  "detected_at": "2026-04-30T15:00:00Z",
  "cli": {
    "installed": true | false,
    "version": "<from --version>",
    "path": "/usr/local/bin/higgsfield",
    "available_models": ["nano_banana_2", "soul_2", "flux", "..."],
    "supported_flags": ["--prompt", "--reference", "--quality", "--aspect-ratio", "..."],
    "supports_4k": true | false,
    "supports_reference_image": true | false
  },
  "mcp": {
    "installed": true | false,
    "tools": ["mcp__higgsfield__generate_image", "mcp__higgsfield__create_character", "..."],
    "available_models": ["soul_2", "nano_banana_pro", "..."],
    "supports_4k": true | false,
    "supports_reference_image": true | false,
    "supports_character_id": true
  }
}
```

### Engine selection

After detection, route based on what's available:

**Both installed** → ask the user once which to use this session:

> I see both Higgsfield CLI and Higgsfield MCP installed. Which do you want to use?
>
>   1. CLI (recommended) — supports 4K output and reference-image conditioning natively. 35+ models. Direct shell calls, fast, full feature parity with Higgsfield's web app.
>   2. MCP — async, Soul ID character consistency, integrates with Claude tool calls. 4K and reference-image support depend on the installed MCP variant (some don't expose them).
>
> Reply: `cli` / `mcp` / `save cli as default` / `save mcp as default`
>
> If you save as default, the choice is stored in `~/.aykah/image-state.json` and won't be asked again.

**Default recommendation: CLI** because the user has confirmed CLI supports 4K + reference images, while MCP variants don't always expose those parameters. Use MCP only when the user explicitly prefers it or CLI isn't installed.

If a default is already saved in state, skip this question and use it. The user can override per-generation by saying "use cli for this one" or "use mcp for this one."

**Only CLI installed** → use CLI silently.

**Only MCP installed** → use MCP silently.

**Neither installed** → show this and STOP:

```
Neither Higgsfield CLI nor Higgsfield MCP is installed. /aykah:image needs at least one. Install your preferred option:

  Option A — Higgsfield CLI (recommended for power users)
    Mac/Linux:
      curl -fsSL https://raw.githubusercontent.com/higgsfield-ai/cli/main/install.sh | sh
    Or via Homebrew:
      brew install higgsfield-ai/tap/higgsfield
    Then authenticate:
      higgsfield auth login

  Option B — Higgsfield MCP (recommended for Claude-Code-only workflows)
    In Claude Code, open Settings → Connectors → Add MCP server
    Server URL: https://mcp.higgsfield.ai/mcp
    Auth: OAuth via Higgsfield account (no API key needed)

After installing one (or both), run /aykah:image again.
```

Do not try to fall back to other tools without explicit user direction.

## Step 2 — Ask the user (one batch)

Ask the question set in a single message, listing only the options that the chosen engine's capability cache confirms exist. Defaults pulled from `~/.aykah/image-state.json` if previously set.

```
Before I generate (engine: <CLI or MCP>), I need a few things:

  1. Mode? [product / lifestyle / portrait / hero]
  2. Product? [pick from catalog by handle, e.g. "aires-dining-chair", or describe]
  3. Vibe / time of day? [calm morning / golden hour / overcast / candid evening / styled]
  4. Room? [from product's room_suggestions, or describe]
  5. People? [0 / 1 / 2-4]   (if 1+, ask: Soul ID OR generic description)
  6. Angle? [front / three-quarter / side / back / closeup / cutout / hero]
  7. Reference images folder?
     [paste the FULL path to a local folder — I'll upload every image in it
      as product references. More refs = more accurate match.]
  8. How many scenes? [1 / 2 / 3 / 4 ...]
     (if >1: triggers Scene Set mode — one room, N camera variations)
  9. Model? [list from chosen engine's available_models]
  10. Aspect ratio? [list from chosen engine's capabilities]
  11. Quality? [4K if engine.supports_4k is true, else highest]
```

### Smart parsing of the initial request (skip questions when possible)

Before asking, scan the user's initial prompt for:

- **Angle keywords** — `front`, `three-quarter` / `3/4` / `angle`, `side`, `back`, `closeup` / `detail`, `cutout`, `hero`. If found, skip Q6 and confirm in one line: *"Angle: three-quarter (parsed from your request)."*
- **Folder paths** — anything starting with `/`, `~/`, or matching `--refs <path>`. If found, skip Q7.
- **Scene count** — `5 scenes`, `3 angles`, `--count 4`. If found, skip Q8.
- **Product handle** — if the user names a handle that exists in `catalog.json`, skip Q2.

If the user names a product handle, look it up in `data/catalog.json` and silently use the materials, colors, textures, style_tags, room_suggestions, and primary_image — don't re-ask the user for those.

If a question's value is already in their state JSON as a saved default, don't re-ask. Confirm the default in one line and move on.

If a question doesn't apply to the chosen engine (e.g., reference images when `supports_reference_image` is false), skip it.

## Step 2.5 — Validate inputs and prepare references

Three sequential checks before any agent is dispatched:

### 2.5a — Catalog validation (pre-flight)

If the user named a product handle:
- Look it up in `data/catalog.json`. If not found, surface immediately: *"`<handle>` is not in the catalog. Did you mean `<closest-3-matches>`? Or describe the product manually."*
- Do NOT silently invent product metadata.

### 2.5b — Reference folder validation

The user provided a folder path. Run these checks:

1. Path exists and is a directory? If not, ask again.
2. Scan top-level for `.jpg`, `.jpeg`, `.png`, `.webp` files (case-insensitive).
3. If 0 images found at top level, ask if they want subfolder recursion.
4. Confirm count back to user in one line: *"Found 5 images in `<folder>`. Uploading all 5 as product references. Continue? [y/n]"*
5. If user says no, ask for a different folder.

Detailed logic in `references/local-image-resolver.md`.

### 2.5c — Multi-image upload to Higgsfield

If engine = MCP:

1. Call `mcp__higgsfield__media_upload` with `files[]` batch of all reference images:
   ```
   media_upload({
     files: [
       { filename: "aires-front.jpg", content_type: "image/jpeg" },
       { filename: "aires-side.jpg", content_type: "image/jpeg" },
       ...
     ]
   })
   ```
2. The response returns presigned upload URLs. PUT the bytes of each local file to its URL.
3. Call `mcp__higgsfield__media_confirm` to commit. Captures the UUIDs.
4. Store the UUIDs as `reference_uuids[]` for the photographer agent to use in `medias[]`.

If engine = CLI: pass the local file paths to the `--reference` flag (CLI behavior depends on installed version).

If upload of any single image fails, retry once. If retry fails, surface to user and skip that image.

## Step 3 — Dispatch agents (in this order)

### 3a. Interior Designer agent (Creative Director + Designer)

Send the agent:
- **The hero product's full catalog entry** (verbatim — title, materials, colors, textures, style_tags, dimensions, room_suggestions, key_features)
- **A FILTERED CATALOG SLICE** (CRITICAL — prevents hallucination): pre-load `data/catalog.json` and filter to products matching the scene's category. Include only handles where `pairing_category` matches the hero's pairing category, OR `room_suggestions` overlaps. Inject the filtered list (typically 10–20 products) inline in the agent prompt as a JSON array of `{handle, title, type, materials, colors, textures}`. **The agent picks ONLY from this list for secondary furniture. Cannot hallucinate what isn't in front of it.**
- **Scene Set mode flag** — if user requested >1 scene of the same product, set `scene_set: true` and `scene_count: N`. The designer then returns ONE room/lighting/palette plan plus N camera variation specs (different angles, framing, focal lengths) — NOT N independent rooms.
- **Angle hard input** — the angle the user picked (front / three-quarter / side / back / closeup / cutout / hero). Designer plans staging around it: front view = symmetric layout, side = profile-friendly placement, etc.
- User inputs (mode, photography style, vibe, room, people, palette mood, special instructions)
- Read-access to `~/.aykah/image-state.json` (so the agent learns from approved gens)

The designer reads:
- `../core/references/brand-facts.md` for positioning + reference set
- `../core/references/brand-design.md` for palette + materials vocabulary
- `references/aykah-style-anchors.md` for locked visual phrases
- `references/aykah-lookbook.md` for canonical brand examples (closest match anchors the new plan)
- `references/catalog-validator.md` for catalog discipline rules
- `~/.aykah/image-state.json` for previously-approved gens, user_preferences, disliked_patterns, learned_rules

Returns a complete **scene plan**: creative direction (mood, color story split into room backdrop vs furniture accents, material palette, lighting vision concept, aesthetic references, risk level), room layout (walls, floors, windows, architectural detail), palette (60/30/10 with backdrop/accent split), materials surfaced (specific names, no generic), staging (placement, supporting furniture by exact catalog name, wall art mandatory for lifestyle, lived-in touches, plush rug specs), lighting concept (quality + time-of-day feel — no technical specs), narrative (one sentence capturing the moment), people, reference-set anchor, training-loop context, and a self-check before returning.

If `scene_set: true`, the scene plan includes a `camera_variations[]` array — N entries, each describing a unique camera position, lens choice, and framing for that angle, while sharing all room/lighting/palette/staging.

Brand-aligned, reference-set-aligned, anti-Structube. No technical photography terms — that's the photographer's layer.

### 3a.1 — Catalog validation gate (post-designer)

Before passing the scene plan to the photographer:

1. Extract every product mention from the scene plan (hero + supporting furniture).
2. For each, look up the handle/title in `data/catalog.json`.
3. If ANY product mentioned is not in the catalog, BLOCK and re-dispatch the designer with: *"Catalog validation failed. Products not found: `<list>`. Use only products from the filtered catalog list provided. Re-do."*
4. After redo, validate again. Two failed attempts = surface to user.

Detailed logic in `references/catalog-validator.md`.

### 3b. Photographer agent (Photographer + Prompt Engineer)

Receives the scene plan from the designer + the engine context (CLI vs MCP, model, aspect ratio, quality, **reference image UUIDs[] from Step 2.5c**, **angle hard-lock**, **scene_set flag + camera_variations**, combo count).

The photographer reads:
- `references/aykah-style-anchors.md` for camera/light/composition anchors
- `references/aykah-anti-patterns.md` for AI-tells + brand-anti-patterns to bake into the positive prompt
- `~/.aykah/image-state.json` for user's preferred vibes, disliked patterns, learned rules

The photographer does TWO things:

1. **Adds the technical layer** — light direction + quality + Kelvin temperature, lens (35mm/50mm/85mm prime, never hedge), aperture, camera height (always real human eye-level unless explicitly art-directed), film stock (Kodak Portra 160/400 — adds film grain, prevents 3D-render look), composition (rule-of-thirds, leading lines, depth strategy), and the exclusions block (anti-AI-tells + disliked patterns from state).

2. **Assembles the final flowing-paragraph prompt** ready to send to the engine — 700–1000 words depending on combo count, single paragraph, ASCII only, command syntax, catalog material/color words VERBATIM (no paraphrasing), reference-image lock line, exclusions block, ending with a `HEX VALUES: [...]` color array (5–8 hex codes from the scene palette).

The photographer runs a 24-item quality verification checklist before returning — covers texture fidelity, camera specs, lighting direction, grounding contact shadows, composition technique, real-world scale cues (architectural cues like baseboards / ceiling height / doorways), photorealism cues (film grain, asymmetric placement, light falloff), wall art on every visible wall (for lifestyle), plush rug check (no jute / sisal / flatweave), fruit-bowl / plant / vase ban, and studio-mode override (no walls / floors / windows / props if studio).

Returns: technical layer breakdown + the FINAL PROMPT ready to send + word count + products_used list + a short negative_prompt_hint (for engines that support negative prompts as a fallback).

## Step 4 — Send the final prompt to the chosen engine

The photographer agent has already assembled the final 700–1000 word flowing-paragraph prompt with the reference-image lock line, exclusions block, and HEX VALUES array. The skill does not re-assemble.

Take the photographer's `FINAL PROMPT` field and send it directly.

### If engine = CLI

Build the shell command:

```bash
higgsfield generate create <MODEL> \
  --prompt "<full assembled prompt>" \
  [--reference <product primary_image URL or user-supplied>] \
  [--quality 4k OR highest CLI exposes] \
  [--aspect-ratio <user choice>] \
  [<any other flags the CLI supports>]
```

**Use exactly the flags the CLI capabilities cache confirms exist.** Do not invent flags.

### If engine = MCP

Call the MCP tool directly with the multi-image reference array:

```
mcp__higgsfield__generate_image({
  params: {
    model: "<model_id from models_explore>",
    prompt: "<full assembled prompt>",
    aspect_ratio: "<user choice>",
    count: <scene_count if scene_set, else 1>,
    medias: [
      { role: "reference", value: "<UUID-from-Step-2.5c-image-1>" },
      { role: "reference", value: "<UUID-from-Step-2.5c-image-2>" },
      { role: "reference", value: "<UUID-from-Step-2.5c-image-3>" },
      ...all UUIDs from the user's reference folder...
    ]
  }
})
```

**Pass ALL reference UUIDs** captured in Step 2.5c. More references = stronger product fidelity. The role string depends on the model — check `models_explore.medias[].roles` first; common values include `"reference"`, `"product_reference"`, `"style_reference"`. Use the model's documented role.

**Use exactly the parameters the MCP tool schema confirms exist.** If a parameter the user wants isn't supported by the installed MCP variant, tell them honestly: *"This MCP variant doesn't expose `<parameter>`. Switch to CLI or skip this option."*

## Step 5 — Generate (with background pipelining for batches)

By default, do NOT show the prompt or command before running. Generate immediately.

**Exception:** if the user explicitly asks ("show me the prompt first", "let me see the command before you run it"), display the assembled prompt + command and wait for approval.

### Single-scene generation (count = 1)

Run synchronously. Wait for the engine to return. Save and surface to user.

### Scene Set generation (count > 1) — pipelined

Don't render N scenes back-to-back. Pipeline them so render-time and assembly-time overlap. Approximate timeline for 3 scenes:

```
T+0:00  Scene 1: dispatch render in BACKGROUND (run_in_background: true if available)
T+0:01  Scene 2: assemble prompt (designer's camera_variations[1] + photographer)
T+0:02  Scene 2: dispatch render in background
T+0:03  Scene 3: assemble prompt
T+0:04  Scene 3: dispatch render
T+0:08  Scene 1 returns → save → notify user with image
T+0:10  Scene 2 returns → save → notify
T+0:12  Scene 3 returns → save → notify
        Total: ~12 min vs sequential 24+ min
```

Implementation:
1. Dispatch each scene's render with `run_in_background: true` if the engine supports it. Capture the `job_set_id` or background-job handle.
2. Move immediately to assembling the next scene's prompt while the previous render is in flight.
3. Maintain a `pending_scenes[]` array with `{scene_index, job_id, prompt_summary}`.
4. As each background job completes, save its output and surface to user **in the order they finish, not the order they started.**
5. If a scene fails, surface the error and continue with remaining scenes — don't abort the batch.

If the engine does NOT support background rendering (e.g., MCP variant returns synchronously), fall back to sequential generation and tell the user: *"This engine doesn't support background pipelining. Generating sequentially — expect <N × 8min>."*

### Polling fallback

If a generation returns a job ID rather than running synchronously, poll until status is `completed`, `failed`, or `nsfw`. Surface the URL or local path of each result.

## Step 6 — Save to user's folder (using the canonical naming convention)

Files MUST follow the Aykah AI image naming convention from `references/naming-guide.md`:

```
aykah-<product-handle>-<variant>-<shot-type>.png
```

### Build the filename

1. **`<product-handle>`** — the catalog `handle` field, lowercase kebab-case. Never invent. Match `catalog.json` exactly. Examples: `mellow-sofa`, `aires-dining-chair`, `aura-sectional`.

2. **`<variant>`** — the color or material variant the user picked or that the catalog specifies for this product. Lowercase kebab-case. Skip this segment entirely if only one variant exists. Examples: `silver-mist`, `oat-boucle`, `walnut`, `beige`.

3. **`<shot-type>`** — exactly ONE from this locked vocabulary, mapped from the user's mode + framing:

| User input pattern | Shot-type to use |
|---|---|
| Mode `product`, straight-on shot | `front` |
| Mode `product`, 30–40° angle | `three-quarter` |
| Mode `product`, pure profile | `side` |
| Mode `product`, rear view | `back` |
| Mode `product`, close crop on texture/seam/leg/hardware | `detail` |
| Mode `product`, white/transparent background (studio) | `cutout` |
| Mode `lifestyle` | `lifestyle` |
| Mode `hero` (wide editorial with full room) | `hero` |
| Mode `portrait` (person + product) | `portrait` |

Pick the dominant intent — never combine (no `front-detail`).

4. **Extension** — `.png` for 4K masters. `.webp` for web-optimized exports.

### Build the folder path

Per the naming guide, organize by **shoot or campaign**, not a single bucket. Default folder slug pattern:

```
<user-supplied root>/aykah-<campaign-or-product-slug>/
```

Where `<campaign-or-product-slug>` is either:
- The campaign name in kebab-case (e.g., `aykah-spring-2026-launch/`) if the user named a campaign
- The product handle (e.g., `aykah-mellow-sofa/`) if it's a single-product shoot

### Ask the user

> Where should I save the image?
>
> 1. Suggested folder name: `aykah-<product-handle>` or `aykah-<campaign-slug>` if you've got a campaign in mind
> 2. Suggested filename: `aykah-<product-handle>-<variant>-<shot-type>.png` (per Aykah AI image naming guide)
>
> Reply with the **parent folder path** where this should land (e.g., `~/Desktop`, `~/Drive/Aykah/2026-Q2`). I'll create `aykah-<slug>/` inside it if needed and save with the canonical filename.
>
> Or override the filename / folder if you want something different.

If the parent folder doesn't exist, ask once before creating it.

### Versioning re-rolls (collision handling)

If the canonical filename already exists in the target folder, append `-v2`, `-v3`, etc.:

```
aykah-mellow-sofa-silver-mist-front.png        # original
aykah-mellow-sofa-silver-mist-front-v2.png     # re-roll
aykah-mellow-sofa-silver-mist-front-v3.png     # second re-roll
```

NEVER use `-final`, `-FINAL-FINAL`, `-new`, `-latest`, or any date/time stamp like `-20260501`.

### Don'ts (from the canonical guide)

- No spaces, no underscores, no camelCase — kebab-case only
- No `IMG_` or `DSC_` prefixes
- No emojis, no parentheses, no brackets
- Never invent a product handle — match `catalog.json`
- Never use this format for real product photography (those have a separate guide in `Product_Images/`)
- No date/time stamps in filenames — versioning handles iteration

For full reference, the canonical guide is bundled at `references/naming-guide.md` (and `naming-guide.pdf` for human reading).

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

## Feedback Logging (required)

After every interaction (generation completed, verdict received), append a history entry to `~/Desktop/aykah-feedback/image-history.json` and rebuild `~/Desktop/aykah-feedback/image-feedback.json` per the parent protocol at `../core/references/feedback-protocol.md`. Also append a row to `~/Desktop/aykah-feedback/summary.json`.

Create `~/Desktop/aykah-feedback/` with one-time user confirmation on first run if it doesn't exist. Skip all logging if `~/.aykah/no-feedback-logging` exists.

This is a hard requirement — the plugin maintainer collects these files to improve the skill over time.

## Common mistakes to avoid

| Mistake | Fix |
|---|---|
| Generating before all required inputs are confirmed | Ask the question batch every time. Skip only the questions whose defaults are already in state. |
| Assuming a save path | Always ask for the full folder path. |
| Showing the prompt by default | Don't. Only show if user explicitly asks to see it before generation. |
| Skipping feedback collection | Ask after every generation. Even one-line feedback is training data. |
| Skipping the desktop logging step | The protocol is mandatory. See `../core/references/feedback-protocol.md`. |
| Inventing product material details | Read `catalog.json` for the named handle. Never make up textures or colors. |
| Hardcoding CLI flags from the README | The README is thin. Use cached `higgsfield --help` output (in `~/.aykah/engine-capabilities.json`) to know what flags exist. |
| Picking an engine that doesn't support 4K when user wants 4K | CLI supports 4K + reference images. MCP variants may not. Default to CLI unless user explicitly picks MCP. |
| Re-asking the engine question every session | If user said "save as default", read `~/.aykah/image-state.json` and use that. Only re-ask when both engines are present and no default is saved. |
| Negative-prompt syntax in the prompt | Higgsfield CLI doesn't support negative prompts. Bake "shot without X" / "no X" into the positive prompt instead. |
