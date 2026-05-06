# Aykah Style Anchors — locked visual phrases

Every prompt the skill assembles MUST include phrases from this file. They are the constants that make every generation recognizably Aykah. Both agents (interior designer + photographer) pull from here. The authoritative pattern lives in `~/.aykah/prompt-pattern.json`; this file expands the vocabulary side.

If a generation drops these anchors, brand drift starts immediately. Never optional.

---

## Brand color rule (read this first)

**Brand colors (Navy `#363B57`, Ivory `#FAF8F4`, Gold `#B8956A`) are IGNORED in image generation.** They are graphic-design / web / typography colors, not image colors.

Default image palette = Benetha's **earthy neutrals**:

`warm beige · cream · taupe · soft brown · deep brown · earthy neutrals · muted tones · desaturated tones · soft charcoal accents`

**No hex codes in prompts ever.** Use descriptive words only.

Apply brand colors only when the user explicitly names them ("include a navy throw", "brushed brass lamp"). Never auto-inject.

**Banned palette language** (drop into anti-patterns if surfaced):
- "vibrant", "bold colors", "saturated palette", "high contrast"
- pure white walls (use "lightly textured warm beige limewash" instead)
- gray-blue undertones (use warm neutrals)
- bright candy pastels (Aykah pastels are MUTED — dusty, dusky, washed-out)
- hex codes inline in any prompt

---

## v10 Collected Lived-In Register (LOCKED 2026-05-06)

The v9 monotone-cream pattern is upgraded to **v10 — Collected Lived-In**: same cream/oatmeal base, but with deep muted earth-tone accents, broader textures, and one subtle-pattern pillow per scene. This is the new master register for living-room lifestyle gens.

### Approved deep-muted accent colors (use 1–2 per scene)

These accents go on pillows / throws / accent chairs / vases / books — NOT walls, NOT floors, NOT primary upholstery:

- **Olive green / sage green / forest green** — muted, dusty, never bright kelly green
- **Chocolate brown / cocoa brown** — deep warm brown, velvet preferred
- **Deep burgundy / wine / oxblood** — restrained merlot, never primary red
- **Mustard / caramel / honey-amber** — golden warm, never lemon
- **Deep rust / terracotta-brown** — fired-clay tone
- **Slate-grey-brown (deep greige)** — taupe with depth

**Maximum 2 different accent colors per scene.** The patterned pillow's dominant tone(s) count toward this 2-accent cap.

### Banned accent colors (clean / bright / saturated — never use)

- Navy (reserved for brand wordmark only — never as room accent)
- Powder blue / sky blue / cornflower
- Millennial pink / dusty rose / blush
- Lemon yellow / butter yellow
- Mint / aqua / teal
- Saturated jewel tones — emerald, sapphire, ruby, amethyst
- Tie-dye / shibori / batik patterns
- Animal print of any kind

### Pillow texture matrix (4–6 pillows per scene, mix 4 textures minimum)

The v10 stack mixes textures rather than relying on knit-only stacks. Use this matrix:

| Slot | Default texture | Acceptable substitutes |
|---|---|---|
| 1 — neutral textured | Ivory tight-loop boucle | Cream waffle-knit, soft sherpa |
| 2 — neutral textured | Oatmeal nubby slub linen | Cream raw linen, oat textured cotton |
| 3 — accent color | Deep-muted velvet (smooth sheen) — olive / chocolate / burgundy / mustard | Velvet is the default sheen contrast — only sub if scene already has a velvet anchor |
| 4 — accent color (optional, for sectionals) | Second deep-muted velvet OR brushed wool | Brushed wool herringbone, linen-velvet blend |
| 5 — patterned (always include exactly ONE) | Faded kilim / earthy tribal / vintage tapestry / thin black-on-cream pinstripe | Earthy block-print, faded southwestern stripe |
| 6 — optional shaggy/fur accent (rare, ~10% of scenes) | Mongolian fur / sheepskin in mustard or cream | Single use only, never paired with another shaggy |

**Hard rule:** at least one velvet (smooth sheen) + at least one knit/boucle (textural matte) + at least one linen-weave (woven matte) per scene. Never all-knit, never all-velvet, never all-linen.

### One subtle-pattern pillow per scene (NEW — always include exactly one)

Every Aykah lifestyle scene includes EXACTLY ONE subtle-pattern pillow. Never zero, never two.

**Approved pattern types:**
- Faded kilim / tribal motif in earth tones (oat + chocolate + rust)
- Subtle vintage tapestry / faded oriental motif (the pillow version of the rug)
- Thin black-on-cream pinstripe (modern, minimal)
- Earthy block-print with widely-spaced muted motif
- Faded southwestern stripe (oat + chocolate + brick)

**Banned pattern types:**
- Modern bold geometric (chevrons, hexagons, big florals)
- Floral prints (tropical, English chintz, watercolor florals)
- Plaid, gingham, buffalo check
- Bold graphic / typography / logo
- Animal print
- Tie-dye / shibori / batik
- High-contrast bright-on-dark anything

**Default size:** lumbar (14×24" or 12×20") — the pattern reads as accent punctuation, not headline. Square (20×20) only when the lumbar slot is already taken by a deep-color velvet.

**Placement on a sofa:** front-and-center (between two corner pillows) OR slightly off-center on dominant arm side.
**Placement on a sectional:** central seat zone OR front of L-bend — NEVER at the extreme far-corner arms or hidden behind the bend.

### Dark anchor — 4 options (was: only matte black art frame)

Every Aykah lifestyle scene has EXACTLY ONE dominant dark visual anchor. Pick one option per scene — never stack two.

**Option A — Wall-art anchor (~50% of scenes — default)**
- Matte black framed abstract (cream + black ink wash / minimal line drawing)
- Moody dark-toned figurative painting (charcoal landscape, brown-toned animal, sepia)

**Option B — Furniture anchor (~30% of scenes)**
- Dark walnut credenza / sideboard behind sofa
- Dark walnut fluted nesting tables / coffee table
- Matte black round or oval coffee table
- Dark fluted reeded base
- **When using furniture anchor → wall art must be LIGHT/cream/subtle, OR no wall art at all**

**Option C — Architectural anchor (~15% of scenes)**
- Matte black sconces flanking subtle cream art (sconces become the anchor)
- Matte black chandelier visible in frame

**Option D — Matched 3-piece gallery set (~5% of scenes — rare)**
- 3 matching small thin-frame landscapes in a row = ONE unit, counts as one anchor
- Use only when the scene calls for symmetry (formal living room, paneled wall)

**Hard rules:**
- NEVER 2+ pieces of wall art on the same wall (matched 3-frame gallery = one unit, exempt)
- NEVER pair dark walnut credenza + dark walnut coffee table — ONE dark wood note per scene
- The anchor must read as the visual gravitational center — bigger, darker, or more dominant than anything else

### Modern florals (drop the vintage register)

**Approved (modern, sculptural, alive or dramatic-dried):**
- Fresh white tulips in cream stoneware (modern, alive)
- Tall fresh airy green branches in stoneware floor vase (eucalyptus, olive sprig, willow)
- Deep rust-red dried berry branches in cream urn (dramatic, muted)
- Tall dried fennel / feathery dried wildflower in cream vase
- Cherry blossom branches (in season)

**Banned (vintage / old-fashioned register):**
- Pampas grass — over and out
- Dried wheat / dried lavender bunches — old-fashioned
- English country dried hydrangeas
- Heavy florals in ornate vases
- Silk / fake flowers of any kind

### Books — solid plain covers, NO text (UPDATED)

Books are now allowed as decor in living-room scenes (overrides the prior "books almost never" rule for living rooms specifically). When books appear:

- Stack of 2–3 plain matte hardcovers, NEVER 4+
- Spines and covers must be **solid muted neutral tones** (cream / oat / sage / chocolate / black)
- **NO visible titles, NO author names, NO publisher logos, NO readable text of any kind**
- Spines plain or with subtle blind-debossed lines only
- Stacked flat on coffee table OR ottoman, NEVER fanned or open
- One closed paperback splayed at a page is OK ONLY if the cover is plain (no Penguin Classics-style design)

### Furniture contrast rule (NEW)

At least ONE piece in the room must be a noticeably darker tone than the sofa. Options:
- Dark walnut coffee table (most common)
- Matte black coffee table
- Dark walnut credenza / sideboard behind sofa
- Dark fluted reeded base on side table
- (Optional 2nd accent furniture) Olive-green velvet swivel chair as a second color note

This prevents the "everything-cream-on-cream" monotone failure mode. If the dark anchor is wall art (Option A), the furniture-contrast piece can still be present (e.g., a dark-walnut coffee table) — the wall art remains the dominant anchor, the furniture is supporting contrast.

### AI-realism cues (always include)

To avoid AI-tells in lifestyle gens, every scene plan includes:
- "Slight asymmetry in pillow arrangement — no mirrored placement"
- "Throws cast naturally with one corner pulled loose, never folded perfectly"
- "Books stacked at slight off-angle, not aligned to coffee table edge"
- "Plant leaves with believable variation — some leaves angled differently, no perfect radial symmetry"
- "Light source has a believable origin — single window from camera-LEFT"
- "Surfaces show real-world texture — visible wood grain, fabric weave, ceramic glaze imperfections"
- "Rug shows subtle wear / pile direction variation, never plastic-perfect"

## Wall finish anchor (Aykah signature)

Every lifestyle prompt should specify the wall as a **subtle limewashed pastel** — not flat paint, not heavy plaster.

The signature phrase pattern:

> "subtle limewashed [tone] walls, smooth finish with gentle tonal variation, matte breathable, soft pastel cast, evenly applied"

Aykah-aligned limewash pastel options (pick one per scene, vary across scenes):
- Warm chalk-cream (default — most neutral, works for any room)
- Soft oat / sand (warm beige cast)
- Pale dove grey (cool-leaning warm)
- Muted sage (dusty greenish-grey, very pale)
- Soft blush (dusty warm pink, barely there)
- Pale terracotta (washed-out warm clay)
- Soft butter / cream-yellow (warm sun-cast)
- Warm taupe (muted earthy neutral)
- Pale ochre (soft warm gold)

**Critical AI-rendering safety:** always include the qualifiers "smooth finish" and "no rough patches" in the wall description. Limewash without these qualifiers tends to render as ugly textured patches in AI generations. The qualifiers force the model toward smooth gentle variation instead.

---

## Materials vocabulary anchors

Always name materials specifically. Generic materials cause AI drift.

| Use this | Not this |
|---|---|
| "kiln-dried solid white oak with visible fine grain" | "wood frame" / "premium wood" |
| "European Belgian linen weave, 280 GSM, matte finish" | "fabric upholstery" / "soft fabric" |
| "full-grain leather, natural patina, supple drape" | "leather sofa" |
| "brushed brass-finished steel hardware" | "metal legs" |
| "hand-tufted boucle in oat colorway" | "boucle fabric" |
| "linen-blend in fog gray, performance weave" | "linen sofa" |

Surface texture is critical. Always include "visible weave" / "visible grain" / "fine grain" / "matte finish" / "natural texture" — these tell the model to render material rather than smooth it.

---

## Lighting anchors (always include exactly one)

Furniture brand photography uses ONE dominant light source. Mixed lights = AI tell. Pick one per prompt:

- **"Soft north-facing window light from camera-left, overcast quality, gradual falloff"** (default for lifestyle)
- **"Late-afternoon golden hour, low warm sun from camera-right, long soft shadows"**
- **"Diffused overcast daylight through sheer linen curtain, even soft falloff"**
- **"Early morning side light, cool ivory cast, restrained shadows"**

**Banned lighting language:**
- overhead ceiling lighting
- mixed sources (window + lamp lit)
- ring light or flash
- studio softbox (too commercial)
- HDR / high dynamic range
- "magic hour" without specifying direction
- lens flare

---

## Camera anchors (always include)

- **Lens:** 35mm or 50mm prime (specify which)
- **Aperture:** f/2.8 to f/4 (shallow but not bokeh-soup)
- **Camera height:** eye-level OR slight low-angle (never high-angle / overhead unless explicitly art-directed)
- **Color grade:** "muted, warm-leaning, RAW-look, low-contrast"
- **Sharpness:** "tack-sharp on the product, gentle background falloff"

Default phrasing: *"Shot on a 50mm prime, f/2.8, eye-level, RAW color-graded warm-muted, tack-sharp on the product."*

---

## Composition anchors

- "Rule-of-thirds, asymmetric, never center-symmetrical"
- "Negative space dominant — let the room breathe"
- "Lived-in, not staged — one mug on the table, throw not perfectly folded, a single book open"
- "Wide-plank oak floor visible at the bottom edge"
- "12-foot ceiling feel — show vertical breathing room"

**Banned composition language:**
- "perfectly arranged", "magazine-staged", "showroom-perfect"
- center-symmetric framing (Restoration Hardware look)
- overhead/flat-lay (unless explicitly product-only mode)

---

## Mood anchors

These are the brand's tonal direction in image form:

- "Aesop meets RH" — restrained, considered, premium without shouting
- "Quietly better, made of what matters" — visual restraint, material focus
- "Canadian-domestic — not European villa, not Brooklyn loft" — homes that feel real, lived in
- Reference set: Quince, Cuyana, Maiden Home, Brooklinen, Parachute, Sundays Furniture

**Anti-mood (always avoid):**
- Structube look — disposable, transactional, cheap-coded
- Restoration Hardware — overwrought, bronze and dark wood, theatrical
- IKEA — flat-lit, synthetic, plastic textures
- Magazine cover — too perfect, too staged

---

## People anchors (when humans are in the shot)

- One person at a time unless otherwise asked. Two-person shots are conversational, never modeling poses.
- Eyes: looking off-frame, never direct camera contact (those read stock-photo)
- Posture: candid, mid-action — pouring, reading, walking past, sitting in profile
- Hands: hidden, holding an object, OR explicitly described to dodge AI six-finger tells
- Skin: natural — not retouched-smooth, not glamour-shot
- Diversity: real Canadian demographic mix; specify when needed

---

## Aykah signature phrases (use as flavor, sparingly)

Drop these into prompts when they fit:

- "morning light through linen curtains"
- "the kind of room you actually live in"
- "Sunday-afternoon stillness"
- "warm wax-oiled oak"
- "soft drape, settled cushion"

---

## How the agents use this file

**Interior designer:** uses palette + materials + composition + mood anchors when building the scene brief. Never writes a brief without at least 3 anchors from this file.

**Photographer:** uses lighting + camera + composition anchors when adding the technical layer. Always picks exactly ONE lighting anchor and ONE camera anchor per prompt.

If a draft prompt is missing anchors, the prompt is incomplete. Add them before sending to the CLI.
