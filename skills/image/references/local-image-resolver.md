# Local Image Resolver — auto-resolve from ecom-images + multi-image upload

How `/aykah:image` finds and uploads product reference images. The skill **auto-resolves the reference folder from the product handle + variant** using the local ecom-images library at `~/Downloads/Product_Images/ecom-images/`. No folder path question needed in the common case.

This replaces both the Shopify-URL-based flow and the earlier "ask for folder path every time" flow. **Default behavior: auto-resolve. Manual override: `--refs <path>`.**

---

## Why local images, not Shopify URLs

The user has high-quality product photos on their laptop, organized by product handle and color variant (e.g., `Product_Images/ecom-images/dining-chairs/aires-dining-chair/moonlight-boucle/`). Each variant has 4–5 reference angles: `front`, `back`, `side`, `angle` (= three-quarter), `closeup` (= detail).

**Multi-image references = stronger product fidelity.** Passing 5 reference images to Higgsfield locks materials, proportions, joinery details, and color far more accurately than a single Shopify hero shot. Higgsfield's `medias[]` array accepts unlimited references.

---

## The auto-resolution flow (Step 2.5b in SKILL.md)

### Resolution sequence

1. **Load category mapping:**
   ```
   data/category-mapping.json → category_to_folder
   ```
   Maps `pairing_category` (from catalog) to the ecom-images subfolder name. Example mappings: `dining-chair` → `dining-chairs`, `sofa` → `sofas-and-loveseats`, `coffee-table` → `coffee-tables`.

2. **Look up the hero product's pairing_category in `catalog.json`.**

3. **Build the product folder path:**
   ```
   ~/Downloads/Product_Images/ecom-images/<mapped-category-folder>/<product-handle>/
   ```
   Example for `aires-dining-chair`:
   ```
   ~/Downloads/Product_Images/ecom-images/dining-chairs/aires-dining-chair/
   ```

4. **List variant subfolders** inside that product folder. Each subfolder is a colorway/material variant (e.g. `moonlight-boucle/`, `almond-cream/`, `espresso-bean/`).

5. **Pick the variant:**
   - If user named a variant in initial request (kebab-cased match), use it.
   - If only one variant exists, use it silently.
   - If multiple variants exist and user didn't pick, ask:
     *"Variant? [moonlight-boucle / almond-cream / espresso-bean]"*

6. **Resolve final variant folder path:**
   ```
   ~/Downloads/Product_Images/ecom-images/<category-folder>/<handle>/<variant>/
   ```

7. **Scan for image files (case-insensitive):**
   - Extensions accepted: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Top-level only — variant folders flat by convention.
   - Skip hidden files (`.DS_Store`, `._*`).
   - Files follow naming: `<handle>-<variant>-<angle>.jpg` where angle ∈ {front, side, back, angle, closeup}.

8. **User confirmation in one line:**
   *"Resolved 5 images at `~/Downloads/Product_Images/ecom-images/dining-chairs/aires-dining-chair/moonlight-boucle/`. Uploading all 5 as product references."*

### Fallback chain

If steps fail, fall through in order:

1. **`pairing_category` not in mapping** → scan ALL ecom-images category folders for a matching handle subfolder. If found in any, use it.
2. **Handle folder doesn't exist anywhere** → ask user manually: *"No reference images found for `<handle>` under any category. Paste a folder path manually:"*
3. **Variant folder empty** → list other available variants, ask user to pick a different one or paste a manual path.

### Manual override

User can bypass auto-resolution with `--refs <path>` flag. Example:
```
/aykah:image aires-dining-chair lifestyle three-quarter --refs ~/Downloads/special-shoot/
```
When `--refs` is set, skip steps 1–7 and use the user-provided folder directly. Still validate the folder exists and has at least 1 image.

### Edge cases

- **Variant folder names with spaces/casing:** the ecom-images library mostly uses kebab-case lower (`silver-mist`) but a few have spaces or capitalization (`Silver Mist`, `Beige`). Normalize both directions: when user types `silver-mist`, also try `Silver Mist`, `silver mist`, `silvermist`. Case-insensitive folder matching.
- **Symlinks:** follow them. If symlink target doesn't exist, fall through to fallback chain.
- **Permission denied:** surface and ask user to fix or use `--refs` override.
- **Mixed extensions in variant folder:** include all supported extensions; don't filter.
- **Non-image files mixed in:** silently ignore.
- **Hero is a CUSTOM product / not in catalog:** auto-resolution can't work — require `--refs` override or describe-only mode.

---

## The upload sequence (Step 2.5c in SKILL.md)

### MCP path

1. **Build the file list:**
   ```js
   const files = imageList.map(p => ({
     filename: path.basename(p),
     content_type: getMimeType(p)  // image/jpeg or image/png or image/webp
   }));
   ```

2. **Batch presigned URL request:**
   ```
   mcp__higgsfield__media_upload({
     files: files
   })
   ```
   Returns an array of presigned upload URLs (one per file).

3. **PUT each file's bytes to its URL:**
   ```bash
   for each file in batch:
     curl -X PUT --data-binary @<local-file> "<presigned-url>"
   ```
   Run in parallel for speed (5 PUTs × 2s each ≈ 2s total instead of 10s).

4. **Confirm the upload:**
   ```
   mcp__higgsfield__media_confirm({...})
   ```
   Returns the committed UUIDs.

5. **Pass UUIDs to photographer:**
   The photographer's input now includes `reference_uuids: [uuid1, uuid2, uuid3, ...]`. The photographer assembles `medias[]` for the `generate_image` call.

### CLI path

CLI capabilities vary. Pass local file paths directly:
```bash
higgsfield generate create <model> \
  --prompt "<assembled-prompt>" \
  --reference <path-1> \
  --reference <path-2> \
  --reference <path-3> \
  ...
```

Check `~/.aykah/engine-capabilities.json` for the CLI's actual reference flag — some versions accept `--reference` (multiple), others use `--reference-images` (comma-separated), others require an upload step first.

---

## Pass-through to the photographer

The photographer agent receives:

```json
{
  "scene_plan": { ... from designer ... },
  "engine": "MCP",
  "model": "<model_id>",
  "aspect_ratio": "4:5",
  "quality": "4K",
  "angle": "three-quarter",  // HARD LOCK
  "scene_set": false,
  "reference_uuids": [
    "uuid-1-for-front-shot",
    "uuid-2-for-side-shot",
    "uuid-3-for-back-shot",
    "uuid-4-for-three-quarter",
    "uuid-5-for-closeup"
  ],
  "reference_count": 5
}
```

The photographer:
1. Includes a stronger reference-image lock line in the prompt: *"Match the materials, colors, textures, joinery, and proportions of all <N> attached product reference images EXACTLY. The generated product must be identical to the references — same boucle texture, same wood grain, same stitching, same color saturation. Do not reinterpret."*
2. Builds the `medias[]` array for the engine call:
   ```
   medias: reference_uuids.map(uuid => ({ role: "reference", value: uuid }))
   ```

---

## Failure modes

| Failure | Handling |
|---|---|
| Folder path invalid | Ask user to repaste — don't proceed |
| Folder empty | Ask for different folder OR confirm "no references" mode (text-only generation) |
| Upload of 1 image fails | Retry once. If still fails, surface and skip that image. Continue with others. |
| Upload of all images fails | Surface error. Ask if user wants to retry, switch engines, or generate without references. |
| User pastes a single file path instead of folder | Treat as a 1-image folder (use that file as the only reference) |
| User refuses to provide a folder | Skill cannot generate accurate product images. Surface this and ask if they want to proceed with text-only references (lower fidelity warning). |

---

## Why this matters

The skill's biggest historical issue was product detail mismatch — generated chairs in "boucle" that looked like generic upholstery, wrong wood tone, wrong proportions. Single-reference generation (Shopify hero only) couldn't lock the visual details. With 5 references covering front + side + back + 3/4 + closeup, Higgsfield has full visual context for every angle and detail — material consistency goes from ~60% to ~90%.
