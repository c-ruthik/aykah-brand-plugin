# Method 18 — 5 Pillars of Brand Architecture (Aykah application)

Source: Vivaldi / Interbrand brand-architecture framework. Loaded as grounding for every `/aykah:campaign` invocation. Every candidate output is scored 1–5 against the pillars; anything <3 is dropped.

## The five pillars

### 1. Purpose — why we exist beyond profit

> To make a home feel like home, without the markup.

Every campaign output should connect — directly or implicitly — to making a home feel like home. Outputs that feel transactional, salesy, or pure-product-spec drift from purpose. Outputs that feel about home, family, hosting, settling-in are aligned.

### 2. Vision — where we're going (5–10 years)

> By 2030, the most trusted direct-from-factory furniture brand in Canada, with showrooms in every major metro and a direct supply relationship with every craftsperson we work with.

Vision is internal-facing. Don't put this in customer copy. Use it to test whether a campaign supports the long arc (showroom expansion, trust, craft relationships) or undermines it (one-off discount stunts, hype-cycle gimmicks).

### 3. Mission — what we do every day

> Every week, we ship considered furniture that feels grown-up, lasts decades, and costs half what the showroom-on-the-corner charges.

The mission line is the closest thing to copy-ready. Phrases like "considered", "feels grown-up", "lasts decades", "half the markup" are usable raw material.

### 4. Values — how we behave (4 only)

1. **Considered, not loud.** No exclamation marks, no hype, no urgency. The furniture has weight; the marketing should too.
2. **Honest about price, materials, and lead time.** Show the markup math. Name the actual material. Tell them when it will arrive.
3. **Long-haul over hype.** Reject one-off stunts. Build the brand for 2030, not next week's CTR.
4. **Local where it counts.** Showrooms are local. Customer service is local. The factory is in Vietnam — say so. Don't pretend.

When evaluating a candidate output, score it against these four. A candidate that violates "considered, not loud" (e.g., uses an exclamation mark or hype language) is automatically <3 and gets dropped.

### 5. Personality — how we sound, look, feel

- **Warm** but not effusive. Like a friend explaining, not a salesperson selling.
- **Considered** but not cold. Specific over abstract.
- **Grown-up** without being stuffy. Speaks to adults who've earned what they have.
- **Quietly confident.** Knows its quality. Doesn't yell about it.
- **Lower-case warmth.** Not Restoration-Hardware-formal. Not Cozey-energetic.

Reference brands the personality should sound like:
- ✅ Aesop, Frama, SOJA&CO, Sundays Furniture, Quince, Cuyana, Maiden Home
- ❌ Cozey (too energetic), Article (too trendy), Restoration Hardware (too formal), IKEA (too utilitarian), Wayfair (too transactional)

## The 5-Pillar fit score

For every candidate output, score 1–5:

| Score | Meaning | Action |
|---|---|---|
| 5 | Perfect fit — could be the canonical version of this pillar | Recommend |
| 4 | Strong fit — minor polish only | Include |
| 3 | Acceptable — works but doesn't lift | Include if needed |
| 2 | Weak fit — drifts from one or more pillars | Drop |
| 1 | Off-brand — actively contradicts a pillar | Drop and flag |

Standard mode delivers candidates scoring 3+ only. Deep mode shows the pillar score per candidate and explains the rationale.

## Quick scoring heuristics

A candidate is automatically <3 if:
- Uses an exclamation mark (violates Considered)
- Uses urgency language ("hurry", "don't miss", "limited time") (violates Considered + Long-haul)
- Uses hype language ("amazing", "incredible", "stunning") (violates Considered)
- Has no concrete material / sensory detail (violates Honest about materials)
- Sounds like it could be from any DTC furniture brand (violates Personality specificity)
- Promises something not in `brand-facts.md` (violates Honest about price / materials)
- Uses "FREE" or banned-word equivalents (handled by voice gate, but flag here too)

A candidate is 4+ if:
- Names a specific material (oak, bouclé, walnut, bouclé care, hardwood joinery)
- References a sensory moment (morning light, weight of the chair, softening fabric)
- Speaks to a specific job (functional/emotional/social) of the Premium Practical buyer
- Sounds like Sanya or Salman would say it out loud
- Could only be Aykah — wouldn't fit another brand without rewriting

## Common pillar drift failures

- "Designer-quality at IKEA prices" — drifts away from Considered (sounds salesy) and conflicts with Honest (we're not IKEA-priced)
- "Elevate your space with timeless elegance" — every cliché in one line, fails on Considered + Personality
- "Our story began when…" — brand-as-hero StoryBrand violation, drifts from Long-haul (sounds like a pitch deck)
- "FREE shipping over $199" — fails Honest (we say complimentary) and is voice-gate banned anyway
- "Hurry — only 3 left!" — fails Considered, fails Long-haul, fails voice gate
- "Treat yourself to the dining table you deserve" — fails Considered + Honest
