# Aykah AI Image Naming Guide

**Scope:** AI-generated lifestyle, product, hero, and portrait imagery produced via the `/aykah:image` skill (Higgsfield CLI / MCP). This is the canonical naming convention for files saved to local folders, shared in Drive, or attached to campaigns.

This guide does **not** apply to real product photography — those live in `Product_Images/` and follow `IMAGE-NAMING-GUIDE.md` in that folder.

---

## Formula

```
aykah-<product-handle>-<variant>-<shot-type>.png
```

## Example

```
aykah-mellow-sofa-silver-mist-front.png
aykah-mellow-sofa-silver-mist-three-quarter.png
aykah-aires-dining-chair-oat-boucle-detail.png
aykah-aura-sectional-walnut-hero.png
```

---

## Field rules

| Field | Rule | Examples |
|---|---|---|
| **Prefix** | Always `aykah-` (lowercase) | `aykah-` |
| **`<product-handle>`** | Shopify handle, lowercase, kebab-case. Match `catalog.json` exactly. Never invent. | `mellow-sofa`, `aires-dining-chair`, `aura-sectional` |
| **`<variant>`** | Color or material variant, lowercase, kebab-case. Skip if only one variant exists. | `silver-mist`, `beige`, `oat-boucle`, `walnut` |
| **`<shot-type>`** | Exactly one from the locked vocabulary below. | `front`, `three-quarter`, `lifestyle` |
| **Extension** | `.png` for 4K masters · `.webp` for web-optimized exports | |

---

## Shot-type vocabulary (locked)

| Shot type | When to use |
|---|---|
| `front` | Straight-on hero, centered |
| `three-quarter` | Furniture angled ~30–40° to camera |
| `side` | Pure profile |
| `back` | Rear view (rare — only when product warrants) |
| `detail` | Close crop on texture, seam, leg, hardware |
| `hero` | Wide editorial composition with full room context |
| `lifestyle` | Staged scene with props or people |
| `portrait` | Person + product |
| `cutout` | Product on white or transparent background |

Use exactly **one** per file. Don't combine (no `front-detail` — pick the dominant intent).

---

## Folder structure

One folder per shoot or campaign. Don't dump every file into one bucket.

```
~/Desktop/aykah-<campaign-or-product-slug>/
    aykah-mellow-sofa-silver-mist-front.png
    aykah-mellow-sofa-silver-mist-three-quarter.png
    aykah-mellow-sofa-silver-mist-detail.png
```

For campaigns spanning multiple products, group by campaign:

```
~/Desktop/aykah-spring-2026-launch/
    aykah-mellow-sofa-silver-mist-hero.png
    aykah-aires-dining-chair-oat-boucle-lifestyle.png
    aykah-aura-sectional-walnut-three-quarter.png
```

---

## Versioning re-rolls

If you re-generate the same shot and the file would collide, append `-v2`, `-v3`:

```
aykah-mellow-sofa-silver-mist-front.png        ← original
aykah-mellow-sofa-silver-mist-front-v2.png     ← re-roll
aykah-mellow-sofa-silver-mist-front-v3.png     ← second re-roll
```

Never use `-final`, `-FINAL-FINAL`, `-new`, `-latest`, or dated suffixes like `-20260430`.

---

## Don'ts

- No spaces · no underscores · no camelCase — **kebab-case only**
- No `IMG_` prefixes, no `DSC_` prefixes
- No emojis, no parentheses, no brackets
- Never invent a product handle — always match `catalog.json`
- Never use this format for real product photography (separate guide)
- No date/time stamps in filenames — versioning handles iteration

---

## Quick reference card

```
FORMULA   aykah-<product-handle>-<variant>-<shot-type>.png

EXAMPLE   aykah-mellow-sofa-silver-mist-front.png

RULES     • all lowercase, kebab-case
          • product handle = Shopify catalog handle
          • variant = color/material (skip if only one exists)
          • shot type = front | three-quarter | side | back |
                        detail | hero | lifestyle | portrait | cutout
          • re-rolls → -v2, -v3 (never -final)
          • one folder per shoot: ~/Desktop/aykah-<campaign>/
```

---

*Aykah Brand Guidelines · Image Naming v1*
