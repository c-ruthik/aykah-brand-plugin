# Aykah Image Anti-Patterns

Higgsfield CLI does NOT expose negative prompts. Anti-patterns must be baked into the positive prompt as exclusion phrases ("avoid X", "no X", "no Y").

The photographer agent consults this file when adding the technical layer. Every generation positive prompt must end with the relevant exclusions. The authoritative exclusion list lives in `~/.aykah/prompt-pattern.json` under `exclusions` — this file expands and explains it.

---

## v0.14.5 Living Room DNA Anti-Patterns (locked 2026-05-05)

These bans were learned from real boss feedback after 11 iterations on Ollie Sectional + new living-room reference set:

### Pink-cast prevention
- "warm" qualifier overuse — repeating "warm" multiple times in cream descriptions amplifies into pink. Use "warm-natural" once.
- Light-oak window frames — too much warm wood, room goes pink. Use WHITE window casings instead.
- Light-oak beam + light-oak coffee table + light-oak floor stacked = pink loop. Pick ONE warm-wood note as dominant.
- 4400K Kelvin — pulls amber. NEVER use.

### Sterile-cool prevention
- 6500K Kelvin — sterile cool, Nordic-minimal. NEVER use.
- Pure stark-white walls without limewash texture — feels like department store. Always specify lime-washed plaster.
- Empty walls without art or architectural feature — feels designer-fake. Always include ONE architectural feature.

### Walnut accent wall ban
- Walnut vertical-plank walls behind sofa push EVERYTHING warm-amber. DROP walnut accent walls entirely.
- Use cream lime-washed plaster + ONE warm-wood beam OR ONE dark-walnut credenza instead.

### Pillow palette ban
- NO cool-blue, slate-blue, dusty-blue, grey-blue, navy pillows or throws on living-room sofas. EVER.
- NO pure chocolate-vs-olive contrast (boss feedback: too loud).
- NO bright/saturated/flashy accent pillows.
- Pillows stay in 3-step warm-neutral spectrum: ivory → oatmeal → deep-greige → brown. Earth-accent (rust/forest-green) OK as ONE accent.
- Texture mix > color mix.

### Greenery substantiality
- NO small fiddle-leaf in small pot — reads "decorator-fake" / "placed-in".
- Always specify size: olive tree ~1.5m, tall branches in stoneware floor vase, etc.

### Rug ban
- NO vintage-faded subtle-pattern as a default — user prefers cozy chunky knit / loop-pile / berber for bright-airy.
- NO sisal alone, NO flatweave low-pile alone, NO bright bold geometric.
- Vintage faded warm-tones OK for cozy register specifically.

### Wall feature stacking ban
- NEVER stack wainscot + picture rail + gallery wall + coffered ceiling + multiple windows + statement frame all in one scene.
- Designer picks ONE architectural feature that complements the scene.

### Bare/empty room ban
- NO plain blank walls without ONE architectural feature.
- NO sparse staging where the sofa floats in an empty room.
- Always include: lighting fixture, considered decor, plant, rug, drapes, art OR architectural feature.

### Dual-mode rendering ban (Ollie sleeper lesson)
- For dual-function products (sleeper sofas, storage benches), NEVER render both functions open simultaneously. Pick ONE function per gen.
- Sleeper extended + chaise lid open = always fails structural fidelity in nano_banana_2 / marketing_studio_image.

### Cool-pop textile ban (overrides v0.14.4)
- v0.14.4 mandated cool-pop textile for light heroes. **REMOVED.** Living rooms stay tonal-harmony only.
- Contrast comes from ONE dark anchor (frame / coffee table / credenza), NOT from cool-color pops.

---

## Benetha's full anti-AI exclusion set (locked)

Every prompt's `Excluded:` block must contain phrases from these five categories. Pulled from `prompt-pattern.json`:

### AI / render tells

`avoid artificial rendering · avoid overly polished · avoid perfect symmetry · avoid overly clean`

### Lighting

`no harsh shadows · no bright whites · no flat lighting · no overexposure`

### Styling

`no clutter · no over-styling · no staged feel · no showroom`

### Composition

`avoid centered perfection · avoid catalog framing · avoid wide-angle distortion`

### Objects

`no bench at foot · no excessive decor · no live or dried plants beyond foliage in a single described vase · no fruit bowls · no fireplaces · no round rugs`

---

## Anti-words (Benetha vocabulary)

These never appear in any prompt:

`no stock image · no showroom · no catalog feel · no artificial rendering · no over-styling · no symmetry · no bright lighting · no harsh shadows · no overly polished look`

---

---

## AI-generation tells (always exclude)

These are the visible tells of AI-generated imagery. Bake exclusions into every prompt:

- **Hands with wrong finger count** → "hands hidden or holding an object, no exposed full-finger anatomy"
- **Melted or asymmetric ears** → "ears partially obscured or shot from angles that don't show ear detail"
- **Plastic skin / glamour retouch** → "natural skin texture, not retouched"
- **Double shadows / inconsistent light direction** → already handled by single-source-light anchor
- **Floating objects / impossible physics** → "all objects make solid contact with surfaces"
- **Text on signage / books / packaging** → "no readable text, no logos, no branding"
- **Reflective surfaces showing nothing** → "if mirrors are visible, they reflect the room consistently"
- **Six-toe feet** → "feet hidden, in shoes, or framed out"

---

## Brand-anti-patterns (always exclude)

Visual cues that make the image read like a brand Aykah is NOT:

### Looks like Structube (disposable / transactional)

- Bright commercial lighting
- Glossy plastic textures
- Polished symmetric staging
- Discount-store color saturation
- Plastic plant decor

### Looks like Restoration Hardware (overwrought)

- Heavy bronze fixtures
- Dark stained wood ("Espresso", "Cocoa")
- Theatrical chandelier as focal point
- Thick velvet upholstery
- Black-and-bronze color schemes

### Looks like IKEA (flat / synthetic)

- Flat overhead lighting
- Plastic-looking materials
- Compressed depth
- Uniform color casts
- "showroom" lighting setups

### Looks like a magazine cover (over-staged)

- Perfectly folded throw blanket
- Books arranged by color
- Coffee table with one identical magazine
- Center-symmetric frame
- Empty space arranged geometrically

### Looks like stock photography

- Direct camera contact from human subjects
- Forced smiles / obvious modeling
- Hand-on-chin "thinking" poses
- Clipboard or laptop in laps without context
- Generic "lifestyle" backgrounds

---

## Material anti-patterns

When the model gets material-specific cues wrong:

| Wrong rendering | Add to prompt |
|---|---|
| Linen looks polyester / synthetic | "matte natural-fiber linen with visible weave, no plastic sheen" |
| Oak looks like dark stain / espresso | "warm wax-oiled white oak, fine straight grain, mid-tone honey brown" |
| Leather looks like vinyl | "full-grain leather, natural patina, soft drape, no shine" |
| Boucle looks like fluff / cotton ball | "tight-loop boucle, structured, not fuzzy" |
| Brass looks like polished gold | "brushed brass-finished steel, matte not mirror" |
| Marble looks like plastic-printed pattern | "if marble appears, real veining, matte not gloss" |

---

## Composition anti-patterns

| Wrong | Add to prompt |
|---|---|
| Center-symmetric framing | "asymmetric, rule-of-thirds, never centered" |
| Overhead flat-lay | "eye-level or slight low-angle, never overhead unless product-only mode" |
| HDR contrast pop | "muted, low-contrast, RAW color grade" |
| Crowded composition | "negative space dominant, let the room breathe" |
| All-front-facing furniture | "asymmetric placement, three-quarter angles preferred" |

---

## How to format exclusions in the positive prompt

The CLI takes one prompt. Append exclusions at the end as a comma-separated list. Example:

```
Shot of [Aykah Aures Dining Chair] in [warm-ivory plaster kitchen, north-facing
window light from camera-left, overcast quality, soft falloff], styled with
[mug on the wood table, single sprig of greenery, throw thrown casually], shot on
[50mm prime, f/2.8, eye-level, RAW warm-muted color grade, tack-sharp on chair].
Excluded: hands with finger anatomy detail, overhead ceiling lighting, magazine
symmetry, polished plastic textures, espresso wood stain, direct camera contact
from any people, readable text or logos, magazine-perfect throw blanket
arrangement, center-symmetric frame, plastic-shine boucle, glossy varnish on oak.
```

The "Excluded: ..." block is the closest the CLI gets to a negative prompt. Always include it.

---

## When a generation hits an anti-pattern

If the user feedback says the image hit one of these (e.g., "the lighting looks overhead"), the skill should:

1. Add the violated anti-pattern to `~/.aykah/image-state.json` under `disliked_patterns`
2. Bake it into ALL future positive prompts as a stronger exclusion
3. Tell the photographer agent to escalate the strength of that exclusion phrase

Each repeated violation makes the exclusion phrase more specific over time. That's the photographer's training loop.
