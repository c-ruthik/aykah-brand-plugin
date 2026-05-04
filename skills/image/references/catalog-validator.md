# Catalog Validator — preventing product hallucination

How `/aykah:image` enforces catalog discipline. Two-layer defense: **filter inline before agent dispatch** + **validate after agent returns**. Together they make hallucination effectively impossible.

The previous skill version had catalog rules in writing but no enforcement — agents would still invent products like "Pedestal Dining Table" or "Sculptural Lounge Chair" that don't exist in the Aykah line. This file is the enforcement layer.

---

## Layer 1 — Filter inline (prevent hallucination)

Before dispatching the designer agent, the parent skill builds a **filtered catalog slice** and inlines it directly in the agent's prompt. The agent picks ONLY from this list. It cannot hallucinate what isn't in front of it.

### Filter logic

Given the hero product (e.g., `aires-dining-chair`):

1. Look up the hero in `data/catalog.json`.
2. Identify the hero's `pairing_category` (e.g., "dining") and `room_suggestions` (e.g., ["dining room", "kitchen"]).
3. Filter the catalog to products where:
   - `pairing_category` matches the hero's pairing_category, OR
   - `room_suggestions` overlaps with the hero's room_suggestions
4. Cap the slice at 25 products max. If more than 25 match, prioritize:
   - Same `type` first (other dining chairs if hero is a dining chair)
   - Same `pairing_category` second
   - Overlapping `room_suggestions` third

### Inline format passed to the designer

```json
{
  "hero_product": {
    "handle": "aires-dining-chair",
    "title": "Aires Dining Chair",
    "type": "Kitchen & Dining Room Chairs",
    "materials": ["wood", "fabric"],
    "colors": ["white", "brown"],
    "textures": ["boucle"],
    "style_tags": ["modern", "scandinavian", "minimalist"],
    "dimensions": "...",
    "primary_image": "..."
  },
  "available_secondary_products": [
    {"handle": "runa-round-dining-table", "title": "Runa Round Dining Table", "type": "Dining Tables", "materials": ["wood"], "colors": ["walnut"]},
    {"handle": "ollie-sectional", "title": "Ollie Sectional", "type": "Sectionals", "materials": ["fabric"], "colors": ["beige"]},
    ...up to 25 entries...
  ],
  "rules": [
    "Pick supporting furniture ONLY from available_secondary_products.",
    "Use the exact `handle` and `title` from the list.",
    "Never invent a product name.",
    "If you cannot find a needed product type in the list, OMIT that piece — do not substitute with an invented name.",
    "Lamps, mirrors, rugs, plants are decor (not catalog) — those don't need a handle."
  ]
}
```

### What this prevents

| Hallucination pattern | Why filter inline kills it |
|---|---|
| "Pedestal Dining Table" (generic name) | Agent sees the actual list — picks `runa-round-dining-table` instead |
| "Sculptural Lounge Chair" (descriptive guess) | Agent sees real lounge chairs by handle — picks one or omits |
| Naming a product from a different brand | List only contains Aykah handles — no other names available to pick |
| Inventing a "matching coffee table" | Agent sees real coffee tables — uses one or skips |

---

## Layer 2 — Validate after (catch edge cases)

After the designer returns the scene plan, the parent skill runs validation **before** dispatching the photographer.

### Validation algorithm

```js
const sceneText = JSON.stringify(scenePlan);
const catalog = loadCatalog();
const catalogHandles = new Set(catalog.map(p => p.handle));
const catalogTitles = new Set(catalog.map(p => p.title.toLowerCase()));

// Extract every product mention from the scene plan
const mentioned = extractProductReferences(sceneText);
// Each mention has either a handle ("aires-dining-chair") or a title ("Aires Dining Chair")

const invalid = mentioned.filter(m => {
  if (m.type === "handle") return !catalogHandles.has(m.value);
  if (m.type === "title") return !catalogTitles.has(m.value.toLowerCase());
});

if (invalid.length > 0) {
  // BLOCK and re-dispatch designer
  return {
    verdict: "BLOCKED",
    invalid_products: invalid,
    redo_prompt: `Catalog validation failed. The following products are not in the catalog: ${invalid.map(i => i.value).join(", ")}. Use ONLY products from the available_secondary_products list provided. Re-do the scene plan.`
  };
}

return { verdict: "PASS" };
```

### Extraction patterns

The validator scans for product references using these patterns:

1. **Handle mentions** — kebab-case strings matching `[a-z0-9]+(-[a-z0-9]+)+` that appear in fields named `handle`, `product`, `furniture_handle`, etc.
2. **Title mentions** — string fields like `name`, `title`, `furniture_title`, or any field where a value matches a catalog title (case-insensitive).
3. **Inline prose mentions** — strings inside the `narrative` or `placement` text that match a known catalog title pattern (capitalized, 2–4 words, ending in known furniture noun like "Sofa", "Chair", "Table", etc.).

False positives are acceptable; false negatives (missing a hallucination) are not. When in doubt, flag.

### Re-dispatch protocol

On validation failure:

1. Send the designer back the original prompt PLUS:
   - The list of invalid products it included
   - A reminder of the available_secondary_products list
   - A directive: "Replace each invalid product with one from the list, OR omit it entirely."

2. Re-validate the new scene plan.

3. **If a second redo also fails**, surface to user: *"The designer agent is repeatedly inventing products. Likely caused by an unusual scene request. Want to (a) loosen the filter to include all 123 products, (b) skip catalog validation for this gen, or (c) cancel?"*

---

## Layer 3 — Final prompt validation (the photographer's output)

After the photographer assembles the final flowing-paragraph prompt, run the same extraction + validation on the prompt text. Catches:

- Photographer paraphrasing a product name ("walnut dining table" instead of "Runa Round Dining Table")
- Photographer adding a product the designer didn't include
- Spelling errors in product titles

If validation fails, re-dispatch the photographer with the corrections. Same redo protocol.

---

## Catalog freshness

The catalog must be authoritative. If the user references a product that doesn't exist in `catalog.json`:

1. Run a fuzzy match against handles + titles. If close match found (>70% similarity), suggest: *"Did you mean `<closest>`?"*
2. If no close match, ask user to either pick a real handle, manually describe the product, or update the catalog.
3. **Never silently substitute or invent.**

If the user knows a product exists but the catalog is stale, surface this clearly: *"`<handle>` is not in the catalog (last updated 2026-04-30). Generate without catalog metadata, or refresh the catalog first?"*

---

## Why this matters

Without validation, the agents will continue to hallucinate even with rules in their instructions — LLMs don't reliably obey "never invent" without enforcement. The filter-inline approach prevents 90% of hallucination by limiting what the agent CAN say. The validation gate catches the remaining 10%. Together they make hallucination structurally impossible without the agent explicitly working around the filter (which itself is a flag to escalate).
