# Aykah Image Prompt Pattern — v1

**Status:** Active. Locked 2026-05-01. Source-of-truth for every image generated via `/aykah:image`.
**Origin:** Forensic extraction of Benetha's boss-approved ChatGPT prompts, merged with Aykah's existing skill backbone (catalog + state memory + reference set).
**Defining rule:** *It must feel like a real home photograph, not a render.*
**Defining diff:** Approved = controlled imperfection + lighting specificity + anti-AI constraints. Rejected = generic.

---

## How agents use this document

Both `aykah-interior-designer` and `aykah-photographer` read `~/.aykah/prompt-pattern.json` (the machine-readable mirror of this document) on every run. Plugin updates ship a new template at `skills/image/data/prompt-pattern.json`. On first run, the skill copies the template to `~/.aykah/prompt-pattern.json`. From then on, agents always read the durable copy — plugin updates can't clobber learned local state.

When this document changes (boss's taste evolves), bump to `v2` — keep `v1` for history.

---

## 1 — The 9-block skeleton (locked order)

```
PRODUCT → ROOM → CAMERA → OBJECTS → STYLING → LIGHT → COLOR → CONSTRAINTS → FEEL
```

Every prompt follows this order. Every prompt contains the following named blocks:

### 1. HERO PRODUCT LOCK (always first)

```
Use the exact [product type] provided.
Do not change [shape / proportions / structure / material / texture].
Maintain [exact material + color from catalog.json].
No redesign, no resizing, no distortion.
```

### 2. SCENE & INTERIOR STYLE

```
Create a [mood adjectives: warm / moody / minimal / lived-in] [room type].
Inspired by [style reference: modern organic / Lone Fox / editorial home].
Wall: [finish: limewash / textured wallpaper / painted beige].
No [paneling / architectural features that don't belong].
```

### 3. CAMERA & COMPOSITION

```
Camera: [eye-level / straight-on / 3/4 angled / close-up]
Framing: [full / cropped / one-side / editorial]
Lens: natural, no wide distortion
Composition: [off-center / slightly imperfect / intimate]
Must feel like [real home photo, not catalog]
```

### 4. FURNITURE & ELEMENTS

```
[Anchor furniture appropriate to room: 1-2 nightstands for bedroom,
 coffee + side table for living room, 4-6 chairs + sideboard for dining]
Lighting fixture: [pendant / lamp type + material]
Placement: [natural / slightly imperfect / not symmetrical]
```

### 5. STYLING & DECOR

```
[3-4 props max]
- vase with foliage
- books
- small object (bowl/cup)
- artwork (muted, classic)
Avoid over-styling, keep personal and effortless
```

### 6. PRODUCT-SPECIFIC STYLING (bed / seat / table)

For beds:
```
Base: [neutral bedding]
Layers: [pillows + textures + 1 accent tone]
Add: [throw]
Condition: [wrinkled / relaxed / imperfect]
```

For sofas / lounge chairs:
```
Cushions: [neutral base + 1 accent tone]
Throw: [casual drape on arm]
Condition: [softly creased, lived-in, not perfectly fluffed]
```

For dining tables:
```
Surface: [clean wood / single centerpiece — ceramic bowl OR small tray]
Chairs: [4-6 around the table at slightly varied angles, some pulled out, some tucked in]
NO throws (this is a dining room, not a living room)
```

### 7. LIGHTING

```
Primary: [soft, indirect daylight from one side]
Secondary: [warm lamp/pendant glow]
Time: [late afternoon / early evening — default; respect user-specified vibe]
Shadows: soft falloff, no harsh highlights
```

### 8. FLOORING

```
[wood tone + subtle rug]
```

### 9. COLOR PALETTE

```
[earthy neutrals only — see vocabulary bank]
```

### 10. IMPORTANT CONSTRAINTS

```
Do NOT include [bench / clutter / symmetry / bright lighting / showroom look]
+ [full exclusion list — see Section 5]
```

### 11. FINAL LOOK & FEEL

```
[5-6 mood descriptors: natural, livable, editorial, high-end, soft, grounded]
```

---

## 2 — Vocabulary bank

### Materials & textures

`boucle · linen · soft cotton · woven · textured throw · limewash · subtle textured wallpaper · vertical weave · ceramic · warm wood / walnut / espresso · matte finishes · fabric shade`

### Light descriptors

`soft, diffused daylight · indirect daylight · ambient light · warm glow · gentle shadow gradients · natural falloff · slightly dim · cozy · late afternoon · early evening · moody but not dark`

### Palette words (no hex codes ever — descriptive language only)

`warm beige · cream · taupe · soft brown · deep brown · earthy neutrals · muted tones · desaturated tones · soft charcoal accents`

### Room descriptors

`warm minimal · modern organic · lived-in · curated · quiet luxury · intimate · natural and livable · not overly designed`

### Camera / lens terms

`eye-level · straight-on · 3/4 view · angled perspective · close-up crop · editorial framing · natural lens · no wide-angle distortion · off-center composition`

### Style references

`Lone Fox · modern organic home · editorial home · designer home · real home photography`

(Aykah's existing reference set — Quince, Cuyana, Maiden Home, Brooklinen, Parachute, Sundays — remains available as taste anchors when the scene calls for them. Not forced.)

### Anti-words (very important — exclude these every time)

`no stock image · no showroom · no catalog feel · no artificial rendering · no over-styling · no symmetry · no bright lighting · no harsh shadows · no overly polished look`

---

## 3 — Approved vs rejected diff

**Approved prompts always include:**

- "Must feel like a real home, not staged/catalog"
- Lighting described emotionally + technically (soft, indirect, late afternoon, warm falloff)
- Imperfection language: "slightly wrinkled", "not symmetrical", "natural variation"
- Strict product lock section
- Tight palette control (warm neutrals only)

**Rejected prompts miss:**

- Realism language → outputs feel "rendered"
- Symmetry / perfect composition
- Light direction or time-of-day anchor
- Specific styling (too many objects or vague descriptions)
- Use generic words like "beautiful / modern / luxury" without constraints

**The defining diff:** approved = **controlled imperfection + lighting specificity + anti-AI constraints**. Rejected = generic.

---

## 4 — Scene-building formula

| Field | Rule |
|---|---|
| Props | 3–4 max |
| Anchor furniture | 1 or 2 only (more for dining: 4-6 chairs + sideboard) |
| Lighting | At least 1 natural + 1 artificial |
| Light direction | Almost always side light (off-frame window) |
| Time anchor | Always implied or stated (late afternoon / early evening default) |
| Narrative tone | "Real home moment", not staged |
| Always-included props | Vase, books, soft textiles |

**The soft formula:**
> 1 hero object + 1 anchor furniture + 2–3 soft props + 1 light source + 1 natural light direction

---

## 5 — Negative / exclusion pattern

| Category | Exclusions |
|---|---|
| AI / render tells | avoid artificial rendering · avoid overly polished · avoid perfect symmetry · avoid overly clean |
| Lighting | no harsh shadows · no bright whites · no flat lighting · no overexposure |
| Styling | no clutter · no over-styling · no staged feel · no showroom |
| Composition | avoid centered perfection · avoid catalog framing · avoid wide-angle distortion |
| Objects | no bench at foot · no excessive decor · no live or dried plants · no vases without foliage description · no fruit bowls · no fireplaces · no round rugs |

---

## 6 — Templates by product type

### 6a. BEDROOM (Benetha verbatim — boss-approved)

#### Lifestyle Hero

```
HERO PRODUCT LOCK:
Use the exact boucle upholstered bed provided. Do not change the shape, proportions, or fabric texture. Maintain the exact off-white boucle tone. No redesign or distortion.

SCENE:
Create a warm, moody bedroom in a modern organic home inspired by Lone Fox. The wall behind the bed is a lightly textured warm beige limewash finish. No paneling or architectural features.

CAMERA:
Eye-level, soft 3/4 angled view. Full bed visible but framed with slight off-center composition. Natural lens, no distortion. Should feel like a real home photograph.

FURNITURE:
Dark walnut nightstands on both sides. One fabric-shaded lamp on one side, not perfectly mirrored.

STYLING:
Ceramic vase with dried foliage, stack of books, small bowl. One muted landscape artwork above the bed. Keep styling minimal and slightly varied.

BED:
Cream bedding with soft folds. Layered pillows in taupe and brown tones. Textured throw casually draped. Slight wrinkles for realism.

LIGHTING:
Soft indirect daylight from one side. Warm lamp glow. Late afternoon mood. Soft shadows and natural falloff.

FLOOR:
Warm wood flooring with subtle rug.

PALETTE:
Cream, beige, taupe, warm brown.

CONSTRAINTS:
No bench, no symmetry, no bright lighting, no showroom feel.

FINAL:
Moody, natural, editorial, lived-in, quietly luxurious.
```

#### Detail / Texture Close-Up

```
HERO PRODUCT LOCK:
Use the exact boucle bed. Preserve fabric texture and proportions exactly.

SCENE:
Warm minimal bedroom with soft beige textured wall.

CAMERA:
Eye-level close-up crop. Focus on headboard, pillows, and bedding corner. Slight off-center framing. Natural lens.

ELEMENTS:
One nightstand edge visible. Partial lamp glow.

STYLING:
Single vase, small book stack. Minimal.

BED:
Layered pillows with mixed textures. Highlight boucle and linen contrast. Visible wrinkles and folds.

LIGHTING:
Soft side daylight + warm lamp glow. Moody, diffused, late afternoon.

PALETTE:
Warm neutrals only.

CONSTRAINTS:
No clutter, no symmetry, no artificial look.

FINAL:
Intimate, tactile, soft, lived-in, high-end.
```

#### Room-Context Wide Shot

```
HERO PRODUCT LOCK:
Use the exact bed with no changes to form or texture.

SCENE:
Warm modern organic bedroom. Beige textured wall. No paneling.

CAMERA:
Eye-level straight-on. Full bed centered but slightly imperfect styling. Natural lens.

FURNITURE:
Two dark wood nightstands. One lamp, one slightly varied setup.

STYLING:
Vase, books, subtle decor. Muted artwork above bed.

BED:
Neutral layered bedding with soft imperfections. Throw at foot.

LIGHTING:
Soft indirect daylight from one side. Warm lamp glow. Early evening tone.

FLOOR:
Wood flooring with soft rug.

PALETTE:
Earthy neutrals only.

CONSTRAINTS:
No bench, no symmetry, no bright light, no staged look.

FINAL:
Natural, warm, editorial, livable, grounded.
```

---

### 6b. SOFA / LIVING ROOM (derived — same essence + structure + vocabulary)

#### Lifestyle Hero

```
HERO PRODUCT LOCK:
Use the exact [sofa from catalog — material + color + silhouette]. Do not change the shape, proportions, cushion form, or fabric texture. Maintain the exact [catalog color]. No redesign or distortion.

SCENE:
Create a warm, lived-in living room in a modern organic home inspired by Lone Fox. The wall behind the sofa is a lightly textured warm beige limewash finish. No paneling or architectural features.

CAMERA:
Eye-level, soft 3/4 angled view. Full sofa visible but framed with slight off-center composition. Natural lens, no distortion. Should feel like a real home photograph.

FURNITURE:
A warm walnut coffee table at natural distance from the sofa, slightly off-axis. One small side table at the sofa's end with a fabric-shaded lamp, not perfectly aligned.

STYLING:
Ceramic vase with dried foliage on the coffee table, stack of books, small bowl or cup. One muted landscape artwork on the wall above the sofa. Keep styling minimal and slightly varied.

SOFA:
Cushions in cream and taupe with soft folds. One textured throw casually draped over the arm. Slight creases for realism — softly used, not freshly fluffed.

LIGHTING:
Soft indirect daylight from one side window. Warm lamp glow from the side table. Late afternoon mood. Soft shadows and natural falloff.

FLOOR:
Warm wood flooring with subtle plush rug under the sofa.

PALETTE:
Cream, beige, taupe, warm brown.

CONSTRAINTS:
No symmetry, no bright lighting, no showroom feel, no overstyling, no fruit bowls, no live or dried plants beyond the foliage in the vase.

FINAL:
Moody, natural, editorial, lived-in, quietly luxurious.
```

#### Detail / Texture Close-Up

```
HERO PRODUCT LOCK:
Use the exact sofa. Preserve fabric texture and proportions exactly.

SCENE:
Warm minimal living room with soft beige textured wall.

CAMERA:
Eye-level close-up crop. Focus on cushion corner, fabric weave, and arm. Slight off-center framing. Natural lens.

ELEMENTS:
One coffee table edge visible. Partial lamp glow on the back wall.

STYLING:
Single vase, small book stack on coffee table edge. Minimal.

SOFA:
Cushions with mixed textures highlighting weave detail. Throw partially visible. Visible soft creases and natural folds.

LIGHTING:
Soft side daylight + warm lamp glow. Moody, diffused, late afternoon.

PALETTE:
Warm neutrals only.

CONSTRAINTS:
No clutter, no symmetry, no artificial look.

FINAL:
Intimate, tactile, soft, lived-in, high-end.
```

#### Room-Context Wide Shot

```
HERO PRODUCT LOCK:
Use the exact sofa with no changes to form or texture.

SCENE:
Warm modern organic living room. Beige textured limewash wall. No paneling.

CAMERA:
Eye-level straight-on. Full sofa visible, slightly imperfect styling around it. Natural lens.

FURNITURE:
Warm walnut coffee table off-axis. One side table with lamp. Partial view of an accent chair if catalog has one — not pulled fully into frame.

STYLING:
Vase, books, ceramic bowl on coffee table. Muted artwork above sofa.

SOFA:
Neutral cushions with soft imperfections. Throw casually on the arm.

LIGHTING:
Soft indirect daylight from one side. Warm lamp glow. Early evening tone.

FLOOR:
Wood flooring with soft plush rug under the sofa.

PALETTE:
Earthy neutrals only.

CONSTRAINTS:
No symmetry, no bright light, no staged look, no fireplace, no live plants.

FINAL:
Natural, warm, editorial, livable, grounded.
```

---

### 6c. DINING ROOM (derived — same essence, dining-specific anchors)

#### Lifestyle Hero

```
HERO PRODUCT LOCK:
Use the exact [dining table from catalog — material + finish]. Do not change the shape, proportions, or surface texture. Maintain the exact [catalog wood tone / finish]. No redesign or distortion.

SCENE:
Create a warm, lived-in dining room in a modern organic home inspired by Lone Fox. The wall behind the table is a lightly textured warm beige limewash finish. No paneling or architectural features.

CAMERA:
Slightly elevated 3/4 angled view (20-30° above eye-level), shot from one corner. Full table and all chairs visible. Natural lens, no wide-angle distortion. Should feel like a real home photograph.

FURNITURE:
4-6 [matching dining chairs from catalog] around the table at slightly varied angles — some pulled out, some tucked in, one rotated 10° off-axis. Sideboard or credenza along the back wall.

STYLING:
Single ceramic centerpiece on the table — small bowl or hand-thrown stoneware. Stack of books and a small object on the sideboard. One muted landscape artwork on the back wall.

TABLE:
Clean wood surface. Single centerpiece only — no place settings, no plates, no wine glasses. Honest and simple.

LIGHTING:
Soft indirect daylight from one side window. A pendant or chandelier glows warmly above the table. Late afternoon mood. Soft shadows and natural falloff.

FLOOR:
Warm wood flooring with subtle plush rug under the dining set.

PALETTE:
Cream, beige, taupe, warm brown.

CONSTRAINTS:
No throws on chairs (this is a dining room, not a living room). No symmetry, no bright lighting, no showroom feel. No fruit bowls. No clutter.

FINAL:
Moody, natural, editorial, lived-in, quietly luxurious.
```

#### Detail / Texture Close-Up

```
HERO PRODUCT LOCK:
Use the exact dining table. Preserve wood grain and proportions exactly.

SCENE:
Warm minimal dining room with soft beige textured wall.

CAMERA:
Eye-level close-up crop. Focus on table edge, single ceramic centerpiece, and one chair back partially visible. Slight off-center framing. Natural lens.

ELEMENTS:
One chair partially in frame. Partial pendant glow above.

STYLING:
Single ceramic bowl, small stack of books on a sideboard edge. Minimal.

TABLE:
Clean wood surface, visible grain. One small ceramic centerpiece.

LIGHTING:
Soft side daylight + warm pendant glow. Moody, diffused, late afternoon.

PALETTE:
Warm neutrals only.

CONSTRAINTS:
No clutter, no symmetry, no place settings.

FINAL:
Intimate, tactile, soft, lived-in, high-end.
```

#### Room-Context Wide Shot

```
HERO PRODUCT LOCK:
Use the exact dining table with no changes to form or texture.

SCENE:
Warm modern organic dining room. Beige limewash wall. No paneling.

CAMERA:
Slightly elevated 3/4 angled view from a corner. Full dining set visible, all chairs in frame. Natural lens.

FURNITURE:
4-6 dining chairs around the table at varied angles. Sideboard against back wall with subtle decor.

STYLING:
Single ceramic centerpiece on table. Vase, books, small object on sideboard. Muted artwork above sideboard.

TABLE:
Clean wood surface, single centerpiece.

LIGHTING:
Soft indirect daylight from one side. Warm pendant glow above. Early evening tone.

FLOOR:
Wood flooring with plush rug under the dining set.

PALETTE:
Earthy neutrals only.

CONSTRAINTS:
No throws, no place settings, no symmetry, no bright light.

FINAL:
Natural, warm, editorial, livable, grounded.
```

---

### 6d. LOUNGE / ACCENT CHAIR (derived — same essence, intimate corner)

#### Lifestyle Hero

```
HERO PRODUCT LOCK:
Use the exact [accent chair / lounge chair from catalog — material + color]. Do not change the shape, proportions, or fabric texture. Maintain the exact [catalog color]. No redesign or distortion.

SCENE:
Create a warm, intimate reading corner in a modern organic home inspired by Lone Fox. The wall behind the chair is a lightly textured warm beige limewash finish. No paneling or architectural features.

CAMERA:
Eye-level, soft 3/4 angled view. Full chair visible with slight off-center composition. Natural lens, no distortion. Should feel like a real home photograph.

FURNITURE:
A small warm walnut side table at the chair's edge with a fabric-shaded lamp, not perfectly aligned. Partial view of a floor lamp on the opposite side.

STYLING:
Ceramic vase with dried foliage on the side table, stack of books, small ceramic cup or bowl. One muted artwork on the wall behind the chair. Keep styling minimal and slightly varied.

CHAIR:
A single textured throw casually draped over the back or arm. Soft creases on the seat and back fabric — lived-in, not freshly fluffed.

LIGHTING:
Soft indirect daylight from one side window. Warm lamp glow from the side table. Late afternoon mood. Soft shadows and natural falloff.

FLOOR:
Warm wood flooring with a subtle plush rug under the chair.

PALETTE:
Cream, beige, taupe, warm brown.

CONSTRAINTS:
No symmetry, no bright lighting, no showroom feel. Single chair only — no companion seating in frame.

FINAL:
Moody, natural, editorial, lived-in, quietly luxurious.
```

#### Detail / Texture Close-Up + Room-Context Wide Shot

Follow the same compression as Bedroom and Sofa templates above — close-up focuses on cushion / fabric weave / arm detail; wide shot pulls back to show the full reading-corner context with the side table, lamp, and rug visible.

---

## 7 — Style bible (one paragraph)

Her aesthetic is built on **controlled imperfection** and **lighting realism**. Every prompt starts with strict product accuracy, then builds a warm, modern organic environment using only earthy neutrals. She always anchors scenes with soft side daylight plus a secondary warm light source, usually in a late afternoon or early evening mood. Composition is never perfectly symmetrical and is always described as editorial, off-center, and lived-in to avoid a catalog feel. Styling is minimal and repeatable — usually a vase, books, and one small object — with subtle variation. She aggressively excludes anything that feels artificial, bright, overly polished, or staged. **The defining rule: it must feel like a real home photograph, not a render.**

---

## 8 — Brand color policy (image generation only)

**For image generation, brand colors are IGNORED by default.** The Aykah palette (Navy `#363B57`, Ivory `#FAF8F4`, Gold `#B8956A`) is for graphic design, web, typography, and packaging — not for forcing into AI lifestyle imagery.

The default image palette is Benetha's earthy neutrals: cream, warm beige, taupe, soft brown, deep brown, warm wood, soft charcoal accents.

**When the user explicitly requests brand colors** ("include a navy throw", "brushed brass lamp", "ivory walls"), apply them — but never auto-inject. The agent does not pull `brand-design.md`'s palette into image prompts unless the user names a specific color from it.

This is the deliberate split: graphic-design context = brand colors enforced; image-generation context = warm neutrals default.

---

## 9 — Iteration plan

When boss's taste evolves and this pattern needs updating:

1. Copy `Aykah-Prompt-Pattern-v1.md` to `Aykah-Prompt-Pattern-v2.md`
2. Edit v2 with the change
3. Update `~/.aykah/prompt-pattern.json` to match v2
4. Update `skills/image/data/prompt-pattern.json` (the bundled template) to match v2
5. Bump plugin version
6. Commit + push

Always keep `v1` (and any older versions) for history. Never overwrite. The agents always read whichever version is in `~/.aykah/prompt-pattern.json` — that's the live pointer.

---

*Aykah Image Prompt Pattern · v1 · 2026-05-01 · Boss-approved baseline · Bedroom templates verbatim from Benetha · Sofa / Dining / Lounge templates derived to capture same essence + structure + vocabulary*
