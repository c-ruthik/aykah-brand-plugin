# Materials Glossary — placeholder

**Status:** the materials reference document is not yet bundled. Until it lands, this skill operates by ASKING the user for material data and using their answers verbatim.

---

## How the skill behaves now (before the glossary lands)

When writing any section that touches materials (PDP, category, About-with-craft-detail), the skill follows this rule:

1. **Check the user's request.** Did they provide material specs?
2. **If yes** — use them verbatim. Apply proper-noun treatment (capitalize "Belgian Linen", "European Flax", "White Oak"). Cross-check certifications against `certifications-glossary.md`.
3. **If no** — ASK before drafting. Don't infer, don't fabricate.

### The standard ask

> "Before I draft, I need the material spec. Can you share:
> - Frame: wood species, kiln-dried? FSC-certified?
> - Upholstery: fabric or leather? GSM or grade? OEKO-TEX-certified?
> - Foam: density (lb/ft³)? CertiPUR-US-certified?
> - Legs / hardware: material and finish?
> - Dimensions: W x D x H, plus seat depth/height for seating
> - Country of origin
> - Any other certifications (GREENGUARD Gold, etc.)
>
> If any detail isn't available, say 'unknown' and I'll write around it."

### Hard rules

- Don't invent material names ("performance fabric" is vague — ask what kind).
- Don't infer one material from another ("if it's premium furniture, the foam is probably CertiPUR-US" — wrong, ASK).
- Don't fill gaps with safe-sounding language ("durable hardwood frame" — name the species).
- Use proper nouns where the user has provided them. Generic "wood frame" is a fail.

---

## When the real glossary lands

When the canonical materials reference document is bundled at `references/docs/materials-reference.pdf` (or similar):

1. This file will be replaced with a structured glossary.
2. The skill will load it as a REQUIRED PRE-LOAD on any material-led section.
3. The skill will still ASK the user to confirm which materials apply to THIS specific product — the glossary sets the citation format, the user confirms applicability.

Until then, the skill defaults to the ASK pattern above. Never invent.
