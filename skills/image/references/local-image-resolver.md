# Local Image Resolver — folder validation + multi-image upload

How `/aykah:image` handles user-provided reference image folders. The user pastes a folder path; the skill scans it, confirms with the user, uploads all images to Higgsfield, and passes the UUIDs to the photographer agent.

This replaces the previous Shopify-URL-based reference flow. **Higgsfield gets visual references from the user's local files, not from the Shopify CDN.**

---

## Why local images, not Shopify URLs

The user has high-quality product photos on their laptop, organized by product handle and color variant (e.g., `Product_Images/ecom-images/dining-chairs/aires-dining-chair/moonlight-boucle/`). Each variant has 4–5 reference angles: `front`, `back`, `side`, `angle` (= three-quarter), `closeup` (= detail).

**Multi-image references = stronger product fidelity.** Passing 5 reference images to Higgsfield locks materials, proportions, joinery details, and color far more accurately than a single Shopify hero shot. Higgsfield's `medias[]` array accepts unlimited references.

---

## The folder input flow (Step 2.5b in SKILL.md)

### Validation sequence

1. **Path exists and is a directory?**
   - Use `bash test -d <path>` or equivalent.
   - If not, ask: *"That path doesn't exist or isn't a folder. Paste the full path again."*
   - If user pasted with `~` (home shorthand), expand it before checking.
   - If user pasted with quotes (`"path with spaces"`), strip them.

2. **Scan for image files (case-insensitive):**
   - Extensions accepted: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Top-level only by default — do NOT recurse into subfolders unless user opts in.
   - Skip hidden files (`.DS_Store`, `._*`, etc.).
   - Skip thumbnail/resized variants if obvious from naming (`*-thumb.jpg`, `*-150x150.jpg`).

3. **Count check:**
   - 0 images at top level → ask: *"No images at top level of `<folder>`. Want me to recurse into subfolders? [y/n]"*
     - If yes, recurse one level deep (don't go deeper without explicit ask).
     - If still 0, ask for a different folder.
   - 1–3 images → confirm and warn: *"Found 2 images. More references = better match — 4–5 is ideal. Continue with 2, or point me to a folder with more? [continue/different]"*
   - 4–10 images → ideal. Confirm count and proceed.
   - 11+ images → confirm but cap at 10: *"Found 23 images. I'll upload the first 10 (more isn't always better — Higgsfield weights early images more heavily). OK? [y/n]"*

4. **User confirmation:**
   - Always confirm count and folder back to the user in one line before uploading.
   - Example: *"Found 5 images in `~/Downloads/Product_Images/ecom-images/dining-chairs/aires-dining-chair/moonlight-boucle/`. Uploading all 5 as product references. Continue? [y/n]"*

### Edge cases

- **Spaces in path:** strip surrounding quotes, accept either escaped (`\ `) or quoted (`"path with spaces"`).
- **Symlinks:** follow them. If symlink target doesn't exist, treat as missing path.
- **Permission denied:** ask user to fix permissions or pick a different folder.
- **Mixed extensions:** include all supported extensions; don't filter to one type.
- **Folder with non-image files mixed in:** silently ignore non-image files; don't list them.

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
