# Aykah Image Anti-Patterns

Higgsfield CLI does NOT expose negative prompts. Anti-patterns must be baked into the positive prompt as exclusion phrases ("avoid X", "no X", "no Y").

The photographer agent consults this file when adding the technical layer. Every generation positive prompt must end with the relevant exclusions. The authoritative exclusion list lives in `~/.aykah/prompt-pattern.json` under `exclusions` — this file expands and explains it.

---

## v0.14.7 v10 Collected Lived-In Anti-Patterns (locked 2026-05-06)

These bans were learned from a 6-image inspo set + Ollie sectional iteration feedback. They override prior conflicting v9 rules.

### Multiple wall art ban (NEW)
- NEVER 2+ separate pieces of wall art on the same wall.
- A **matched 3-piece gallery set** (3 identical-frame landscapes in a row) counts as ONE unit and is allowed — but only as ~5% of scenes.
- NEVER mix a framed art + framed mirror / framed photo on the same wall.
- NEVER stack a small art piece next to a large art piece — pick one anchor.
- If furniture is the dark anchor (walnut credenza / black coffee table), wall art must be LIGHT/cream/subtle OR omitted entirely.

### Wall art subject ban (v0.15.3 — overrides AI default of "art = floral painting")
- ❌ NEVER floral paintings (single bloom, bouquet, vase-of-flowers, still-life with flowers)
- ❌ NEVER botanical prints, pressed-flower frames, herbarium illustrations
- ❌ NEVER watercolor florals (the AI's default association — explicitly out)
- ❌ NEVER vintage / Victorian floral oil paintings
- ❌ NEVER tropical / monstera / palm-frond prints
- ❌ NEVER sunset / sunrise paintings
- ❌ NEVER pop-art / bright-color modern abstract
- ❌ NEVER inspirational typography or quote prints
- ❌ NEVER family-photo-style portraits / wedding photos
- ❌ NEVER religious iconography
- ❌ NEVER sports / vintage-poster prints
- ❌ NEVER animal-print / leopard / zebra patterned art
- ✅ Approved wall art subjects: gestural abstract ink-wash / minimal line drawing / moody charcoal landscape (cliff, mountain, dunes, horizon — NOT floral fields) / brown-toned animal portrait (bison, horse, dog) / sepia or vintage B&W photograph (architecture, portrait, landscape) / tonal abstract color-field (cream + dark muted earth, NO florals, NO botanicals) / stretched canvas with raw texture + minimal black mark-making

The AI defaults to "framed floral painting" because it's the most common framed-art training data. Every prompt must EXPLICITLY name the approved subject and EXPLICITLY exclude florals/botanicals/watercolor-florals to override the default.

### Monotone same-tone scene ban (NEW)
- NEVER cream-on-cream-on-cream-on-cream with no contrast — produces flat AI look.
- At least ONE element per scene must be a deeper-tone accent: dark walnut wood / matte black / deep velvet pillow / muted accent color.
- Texture variety alone is NOT enough — color depth contrast is required.

### Clean / bright pastel ban (NEW — overrides v0.14.5 "muted pastels OK")
- NEVER powder blue / sky blue / cornflower
- NEVER millennial pink / dusty rose / blush pink
- NEVER mint / aqua / teal
- NEVER lemon yellow / butter yellow
- NEVER navy as a room accent (navy is wordmark-only)
- NEVER saturated jewel tones (emerald, sapphire, ruby)
- The ONLY approved accents are deep muted earth tones: olive / sage / forest / chocolate / burgundy / mustard / caramel / rust / deep greige.

### Knit family BANNED in decor (v0.15.2 — overrides earlier "mix knits with other textures" rule)
- NO knit-family pillows: waffle-knit, cable-knit, sherpa, chunky knit, mongolian fur, sheepskin, shaggy.
- NO knit-family throws: chunky cable-knit, waffle-knit, fringe-knit, sage chunky knit, brown fringe knit, sherpa throws.
- NO knit-family rugs: cream loop-pile, berber chunky knit, cable-knit-style rugs, cozy chunky knit, shaggy / shag-pile rugs, sherpa rugs.
- Required pillow mix per scene: at least 1 velvet (smooth sheen) + at least 1 linen-weave (woven matte) + at least 1 wool flat-weave or matte cotton.
- **Boucle exception:** ONE boucle pillow is allowed ONLY when the catalog product (sofa/chair) is NOT boucle. NEVER boucle-on-boucle (boucle pillow on a boucle sofa = fail).
- Approved throws (woven / flat-weave only): linen-mohair flat blend, brushed wool flat-weave, cashmere flat throw, woven cotton flat throw, raw linen throw.
- Approved rugs (woven / tufted only): vintage faded oriental, hand-woven wool flatweave, tufted wool cut-pile, jute, low-pile vintage moroccan, faded persian medallion.

### Patterned pillow rules (NEW — must include exactly one)
- EVERY living-room scene includes EXACTLY ONE subtle-pattern pillow — never zero, never two.
- Banned pattern types: modern bold geometric (chevrons, hexagons), floral prints, plaid, gingham, buffalo check, bold graphic, typography/logo, animal print, tie-dye/shibori/batik, high-contrast bright-on-dark.
- Approved: faded kilim, vintage tapestry, thin black-on-cream pinstripe, earthy block-print, faded southwestern stripe.

### Modern florals — vintage register ban (NEW)
- NEVER pampas grass.
- NEVER dried wheat / dried lavender bunches.
- NEVER English country dried hydrangeas.
- NEVER heavy ornate vases (chinoiserie, Victorian, brass urns with handles).
- NEVER silk or fake flowers.
- Approved: fresh white tulips, tall fresh green airy branches (eucalyptus, willow, olive), deep rust-red dried berry branches, dried fennel, cherry blossom branches.

### Books with text ban (NEW — books now allowed but with strict rules)
- NEVER books with visible titles, author names, publisher logos, or readable text on spines/covers.
- NEVER stacks of 4+ books — keep to 2–3.
- NEVER books arranged by color (magazine cliché).
- NEVER fanned-open or splayed-open books with visible text pages.
- Approved: 2–3 plain matte hardcovers, solid muted-neutral covers (cream / oat / sage / chocolate / black), spines blank or blind-debossed only, stacked flat at slight off-angle.

### AI-tell exclusions (NEW — must always be present)
- "no mirrored / perfectly symmetrical pillow placement"
- "no perfectly folded throw blanket — one corner must be pulled loose"
- "no books aligned perfectly parallel to coffee table edge — slight off-angle"
- "no plant leaves in perfect radial symmetry — natural variation"
- "no plastic-shine on any surface — matte natural finishes only"
- "no rug edges aligned perfectly to floor planks"
- "light source must have a single believable origin — single window camera-LEFT, no rim-lighting from impossible angles"

### Rug rules (v0.15.2 — knit-family banned, woven-only)
- Vintage faded oriental rugs (sage + burgundy + oat / faded medallion / muted southwestern) — ALLOWED.
- Hand-woven wool flatweave (cream / oatmeal) — ALLOWED.
- Tufted wool cut-pile (cream / oatmeal, plush cut-pile, NOT loop-pile) — ALLOWED.
- Jute (woven natural fiber) — ALLOWED.
- Low-pile vintage moroccan (woven, fine pattern, cream + black motif) — ALLOWED.
- Faded persian medallion (warm-greige + faded burgundy + sage, woven) — ALLOWED.
- BANNED: cream loop-pile, berber chunky knit, cable-knit-style rugs, cozy chunky knit, shaggy / shag-pile, sherpa rugs.
- BANNED: sisal alone (too stiff), bare flatweave low-pile alone (too thin), bright pattern, bold geometric, round rugs.

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

### Pillow palette ban (UPDATED for v10 — see v10 section above for full rules)
- NO cool-blue, slate-blue, dusty-blue, grey-blue, navy pillows or throws on living-room sofas. EVER.
- NO bright/saturated/flashy accent pillows.
- v10 ALLOWS chocolate + olive together (this overrides the 2026-05-05 "no chocolate-vs-olive" rule), as long as both stay deep + muted, not loud.
- Up to 2 deep-muted accent colors per scene. Earth-accents (olive / chocolate / burgundy / mustard / rust / sage / deep greige) are the only approved accent palette.
- Texture mix is REQUIRED (velvet + knit + linen minimum), not just color mix.

### Greenery substantiality
- NO small fiddle-leaf in small pot — reads "decorator-fake" / "placed-in".
- Always specify size: olive tree ~1.5m, tall branches in stoneware floor vase, etc.

### Rug ban (UPDATED for v10)
- NO sisal alone, NO flatweave low-pile alone, NO bright bold geometric, NO round rugs, NO printed pattern.
- Vintage faded warm-tones (sage / burgundy / oat) ARE allowed in v10 — overrides the prior 2026-05-05 ban.
- Designer picks rug type per scene register: cozy = vintage faded oriental; bright-airy = cream berber loop-pile / chunky knit; modern = jute / textured natural fibre.

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
