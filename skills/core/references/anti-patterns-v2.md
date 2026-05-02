# Aykah Voice Gate v2 — Anti-Patterns Ruleset

Loaded by `aykah-voice-gate` agent in addition to `brand-voice.md` and `brand-facts.md`. Adds four new layers to the existing v1 checks: AI-tell pattern catcher, furniture-cliché library, sentence-rhythm audit, voice register fingerprint.

Every output going through the voice gate is scanned against this file. Any HIT in Layers 1–2 = hard FAIL with replacement. Layers 3–4 = soft FAIL with rewrite guidance.

---

## Layer 1 — AI-tell pattern catcher (hard fail)

These phrases are LLM signatures. They appear in 80%+ of unedited AI marketing copy and almost never in human-written copy. Any hit FAILS the item.

### Banned openers / setup phrases
- "in today's world", "in an age of", "in a world where"
- "in the modern age", "in this fast-paced world"
- "as we navigate", "as the world shifts"
- "more than ever", "now more than ever"

### Banned verb constructions
- "unlock" (unlock your potential, unlock the secret)
- "elevate" (elevate your space, elevate your morning)
- "transform your" (transform your space, transform your home)
- "harness the power of"
- "delve into", "dive deep into"
- "navigate the complexities of"
- "explore the world of"
- "discover the magic of"
- "embark on a journey"
- "boasts" / "showcases" / "features" used as marketing verbs (e.g., "the chair boasts solid oak")

### Banned brand-as-hero phrases (StoryBrand violation)
- "we believe…" / "at Aykah we believe"
- "we're passionate about"
- "we're on a mission to"
- "our story began when"
- "we set out to"
- "our journey started"

### Banned framing patterns
- "Not just X, but Y" (used more than once per piece)
- "It's not about X — it's about Y"
- "More than just a [chair/sofa/table]"
- "Where X meets Y"
- "The intersection of X and Y"
- "X, redefined"
- "X, reimagined"

### Banned modifier stacking
Three or more adjectives in a row triggers a flag:
- "thoughtfully crafted, beautifully designed, perfectly proportioned"
- "warm, inviting, considered"
- "modern, timeless, enduring"
- Forced tricolons in general — keep to two beats max

### Banned em-dash overuse
LLMs overuse em-dashes for rhythm. Rule: max **one em-dash per 100 words** in any output. More than that = flag for rhythm-flattening rewrite. Use commas, periods, or restructure.

### Banned reflective phrases
- "a testament to"
- "stands as a testament"
- "speaks to"
- "speaks volumes"
- "embodies"
- "captures the essence of"
- "the very essence of"

### How to fix Layer 1 hits
Rewrite using:
- A **specific noun** instead of an abstract verb ("the bouclé softens after 6 months" not "elevates your space")
- A **concrete moment** instead of a setup phrase ("when the morning light hits the oak" not "in today's world…")
- The **customer's life** instead of brand action ("you'll notice…" not "we believe…")

---

## Layer 2 — Furniture / lifestyle cliché library (hard fail)

These phrases are dead on arrival. Every furniture brand uses them. Aykah doesn't.

### Banned product-marketing clichés
- "where comfort meets style"
- "the perfect blend of [anything]"
- "designed with you in mind"
- "for the discerning [homeowner / customer / buyer]"
- "thoughtfully designed", "thoughtfully curated", "thoughtfully crafted"
- "lovingly made", "lovingly crafted"
- "made with love", "made with care"
- "your sanctuary", "your retreat", "your oasis"
- "your home, your way"
- "elevate your space", "transform your home"
- "the heart of the home"
- "where memories are made"

### Banned superlatives & filler
- "timeless elegance"
- "effortless style"
- "understated luxury"
- "refined simplicity"
- "modern sophistication"
- "casual elegance"
- "quiet luxury" (already overused — use "considered" instead if the meaning fits)
- "iconic" (rarely warranted)
- "stunning", "gorgeous", "incredible", "amazing", "beautiful" (specifics only)

### Banned coffee-table-book language
- "a study in [contrast / form / restraint]"
- "an ode to [craft / simplicity / nature]"
- "an exercise in [restraint / form]"
- "a meditation on"
- "a love letter to"
- "[X], reimagined for the modern home"

### Banned event/campaign clichés
- "celebrate the season"
- "embrace the change"
- "welcome [the season]"
- "the season of [renewal / cozy / comfort]"
- "tis the season"
- "fall in love with"
- "step into [season / space / style]"
- "the new collection has arrived"
- "introducing the new" (use the actual product name, no preamble)

### How to fix Layer 2 hits
- **Replace the cliché with a concrete sensory or material detail.** "Where comfort meets style" → "wax-oiled oak, bouclé that softens"
- **Cut filler superlatives.** Don't replace "stunning" — delete it.
- **Lead with the noun, not the marketing wrapper.** "Aires Dining Chair, in Moonlight bouclé" not "Introducing the all-new Aires Dining Chair, designed to elevate your dining room."

---

## Layer 3 — Sentence-rhythm audit (soft fail)

LLMs write sentences of uniform length and structure. Humans vary cadence. Test:

### The uniformity flag
Three or more consecutive sentences within ±2 words of each other in the same paragraph = flag. Mark the section for rewrite to vary length.

Example HIT:
> The Aires Dining Chair is built from solid oak. The frame is finished in a wax-oiled walnut. The seat is upholstered in soft bouclé.
> *(11, 11, 10 words — uniform)*

Fix:
> Solid oak frame. Wax-oiled walnut. Bouclé seat that softens with use.
> *(3, 3, 8 — varied)*

### The sentence-opener flag
Three or more consecutive sentences starting with the same word/phrase pattern = flag.

Example HIT:
> Aykah's design language is warm. Aykah's materials are honest. Aykah's price is direct-from-factory.

Fix:
> The design language is warm. Materials are honest — solid oak, real bouclé. Pricing comes direct from the factory in Vietnam.

### The "list of three" flag
LLMs default to triads everywhere. If a piece has 3+ sentences each containing exactly 3 commas, flag it.

### How to fix Layer 3 hits
- Vary sentence length aggressively. Mix 3-word sentences with 18-word sentences.
- Break paragraphs that have uniform rhythm.
- Use sentence fragments where they sound natural.
- Read it out loud. If it sounds metronomic, it is.

---

## Layer 4 — Voice register fingerprint (soft fail)

These rules ensure output sounds like Aykah specifically — not just any "premium furniture brand."

### Aykah register checklist
- **Lower-case warmth.** Aesop register, not RH-formal. Avoid Title Case Marketing Voice. Headers and CTAs in lower case unless brand-facts.md specifies otherwise.
- **No exclamation marks.** Anywhere. Periods. Always periods. (Exception: customer-quote contexts where the customer themselves used one.)
- **No marketing amplifiers.** "amazing", "incredible", "the best", "stunning", "gorgeous", "perfect", "ultimate", "unrivaled", "unmatched". Specifics only.
- **Considered, not loud.** Maximum **one superlative per 100 words.** More than that flags as overhyped.
- **Materials over marketing.** Lead with a material name, a moment, or a sensory detail — not a feature claim.
- **No urgency without facts.** "Limited stock" only if true. "While supplies last" is banned. "Only 3 left" requires actual inventory data.
- **No discount framing as identity.** "Save", "deal", "value", "affordable", "budget", "starting from" all banned (except in factual price disclosure).
- **Round prices.** $1,899 not $1,899.99.

### Aykah voice fingerprint test
Read the output and ask:
1. Could a Structube ad copywriter have written this? → If yes, FAIL.
2. Could an Aesop / Frama / SOJA&CO / Sundays Furniture brand have written this? → If yes, that's the target.
3. Does it sound like Sanya or Salman saying it out loud? → If no, FAIL.
4. Could ANY furniture brand have written this same line? → If yes, sharpen until it could only be Aykah.

### How to fix Layer 4 hits
- **Cut amplifiers.** Don't replace "amazing" — delete the whole clause and start over with a specific detail.
- **Lower-case it.** Everything goes lower case unless it's a proper noun, the start of a sentence, or specified in brand-facts.md.
- **Add the material.** If a sentence has no concrete noun (oak, bouclé, walnut, ivory, navy, brass), add one or rewrite.
- **Read it as Sanya.** If it sounds like marketing-speak, rewrite as if you're telling a friend why this chair is worth $499.

---

## Reporting format addition

When the voice gate runs and finds Layer 1–4 hits, the report adds:

```
Voice Gate v2 Report — Anti-Patterns Found

Layer 1 (AI-tells): N hits
  - "[exact phrase]" in item [N], position [start char]
  - Replacement: [specific fix]

Layer 2 (Clichés): N hits
  - "[exact phrase]" in item [N], position [start char]
  - Replacement: [specific fix]

Layer 3 (Rhythm): N flags
  - Item [N]: [specific issue, e.g., "3 sentences within ±2 words, uniform"]
  - Fix: [vary length, break paragraph, use fragment]

Layer 4 (Register): N flags
  - Item [N]: [specific issue, e.g., "2 superlatives in 80 words"]
  - Fix: [cut amplifier, lower-case header, add material noun]
```

Hits in Layers 1 and 2 = HARD FAIL (BLOCKED).
Flags in Layers 3 and 4 = SOFT FAIL (mandatory rewrite, but not BLOCKED if the fix is noted).

---

## Aykah-specific pre-existing rules (still enforced from v1)

These remain hard-fail, no change from v1:
- "FREE" / "free shipping" / "free returns" → use "complimentary"
- "100-night trial" → does not exist
- "designed in Canada" / "made in Canada" → never claim
- "premium" as a brand-wide adjective → banned until Fall 2026 tier launches
- "luxury experience", "elevated living", "timeless elegance" → clichés
- "affordable", "budget", "cheap", "discount", "deal", "bargain", "value"
- "buy now", "don't miss out", "hurry", "act fast", "grab yours"
- "save $X / X% off", "starting from $", "as low as", "best price guaranteed"
- Prices ending in `.99`
- Exclamation marks (rare exceptions only)

---

## Maintenance

When the maintainer collects feedback files from team members and discovers a new AI-tell or cliché that's leaking into outputs, add it here. This file is the living defense against drift.
