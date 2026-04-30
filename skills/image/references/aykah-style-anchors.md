# Aykah Style Anchors — locked visual phrases

Every prompt the skill assembles MUST include phrases from this file. They are the constants that make every generation recognizably Aykah. Both agents (interior designer + photographer) pull from here.

If a generation drops these anchors, brand drift starts immediately. Never optional.

---

## Palette anchors (always include)

Use these phrases when describing color. Specify the actual hex values when the model accepts them in-prompt.

- "Aykah palette — deep navy (#363B57), warm ivory (#FAF8F4), brushed warm-gold accent (#B8956A)"
- "60/30/10 ratio — ivory dominant, navy secondary, warm gold accent only"
- "warm-neutral cast, slightly desaturated, never cold blue tones"
- "natural undertones — never pure white, never pure black, never high-saturation primaries"

**Banned palette language** (drop into anti-patterns if surfaced):
- "vibrant", "bold colors", "saturated palette", "high contrast"
- pure white walls (use "warm ivory plaster" or "soft chalk-white")
- gray-blue undertones (use warm neutrals)

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
