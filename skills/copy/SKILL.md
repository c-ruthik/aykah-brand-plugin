---
name: copy
description: Use for any Aykah website or long-form copywriting task — product descriptions (PDP), category and collection pages, About / brand story, founder letter, policy pages (returns, shipping, warranty, privacy), FAQ, and similar long-form copy. Triggers on phrases like "write the returns page", "PDP for [product]", "About page", "founder letter", "FAQ for shipping", "policy copy", "category intro", or any prompt about writing or improving website body copy. The user names the section they're working on; the skill applies the locked Voice Guide v2 foundation and adapts to that section type.
---

# Aykah Copy

Adaptive copywriting for Aykah's website and long-form surfaces. The user names the section they're on (PDP, returns, about, FAQ, etc.) and the skill applies the locked brand foundation, adapts the structure to that section, runs a 3-pass self-review, and gates output through the voice-gate before delivery.

**Core rule:** common foundation, section-flexible structure. Voice never drifts even when the section type changes.

## When to use

- Product descriptions (PDP) — 3-part hook/spec/care
- Category page intros, collection pages
- About / brand story, founder letter
- Policy pages — returns, shipping, warranty, privacy
- FAQ
- Long-form copy where voice consistency matters more than the page type

For social captions, use `/aykah:social` instead. For brainstorming the *idea* before writing, use `/aykah:buddy`.

## REQUIRED PRE-LOAD

Before drafting ANY copy, load:

1. `../core/references/brand-voice.md` — banned words, approved vocabulary, voice attributes, premium spec language
2. `../core/references/brand-facts.md` — verified founders, locations, policies, mission, tagline (never invent)
3. `references/section-guide.md` — how voice and structure flex for the named section
4. `references/certifications-glossary.md` — exact citation format for CertiPUR-US, OEKO-TEX, FSC, GREENGUARD (prevents invented certs)

Load on-demand when relevant:

- `references/materials-glossary.md` — currently a placeholder. If the section involves materials and the user hasn't supplied detail, ASK the user for the material data before drafting.
- `references/anti-patterns.md` — AI rhythm tells + brand drift patterns. Scan draft against this before self-review.
- `references/review-checklist.md` — the 3-pass self-review (Voice match, Specificity, So-what).

## Workflow

```
1. Read user request. Identify the section (PDP, returns, about, FAQ, etc.)
2. If section unclear, ask ONE multiple-choice question.
3. REQUIRED PRE-LOAD: brand-voice + brand-facts + section-guide + certifications-glossary
4. If section involves materials and user hasn't provided them: ASK for the
   specific materials, dimensions, certifications. Do not invent them.
5. Draft using the section-guide entry for the named section
   + the locked Voice Guide v2 spec language for any material claims
6. Run the 3-PASS SELF-REVIEW (references/review-checklist.md)
   - If any pass fails, rewrite. Loop up to 3 times.
7. Run aykah-voice-gate agent on the candidate output (HARD-GATE)
8. If BLOCKED, apply mandatory fixes and re-run the gate.
9. Deliver. Ask before saving anywhere (never assume a path).
```

## Section router

Look up the section the user named in `references/section-guide.md`. If it's not in the guide, ask one clarifying question:

> "What's the primary goal of this section — informational, conversion, or brand-story? I'll adapt from the foundation."

Sections covered in v1: PDP · Category · Returns · Shipping · Warranty · FAQ · About · Founder Letter.

## Material data — ALWAYS ask, never invent

When writing PDP, category, or any material-led copy:

- If the user supplies material specs (e.g., "kiln-dried white oak frame, FSC-certified, 280 GSM Belgian linen, OEKO-TEX 100"), use them verbatim.
- If they don't, ASK before drafting:

> "Before I draft, I need the material spec. Can you share: frame material + certification, fabric/upholstery + GSM/grade, foam (CertiPUR-US?), legs, dimensions, country of origin, and any other certifications? If a detail isn't available, say 'unknown' and I'll write around it."

**Do not** invent certifications, mills, GSM weights, or country-of-origin claims. The certifications glossary has the four standards Aykah uses; check there first to confirm format, but only cite what the user has confirmed applies to this product.

## The 3-pass self-review (HARD-GATE before voice-gate)

Run silently on every draft. See `references/review-checklist.md` for full prompts.

1. **Voice match** — does this read like Aykah's four attributes (natural, confident, warm, design-aware)? Not Structube, not corporate, not stiff.
2. **Specificity** — every material claim is named precisely; every certification is cited correctly; no vague "premium" / "high-quality" / "elevated" language.
3. **So-what** — every sentence earns its place. If a sentence could be cut without losing meaning, cut it.

If any pass FAILS, rewrite addressing the failure reason, then re-run all three. Don't ship at 2/3.

## Universal output rules

These apply to every section:

1. **No banned words.** Voice gate catches them; never write them in the first place.
2. **No emojis. No exclamation marks.** Periods.
3. **No corporate filler** ("We're excited to", "Introducing", "Discover the elegance of").
4. **No invented facts.** Founders, locations, policies, warranty terms, return windows — all from `brand-facts.md`.
5. **Materials get proper-noun treatment.** "European flax" not "premium fabric". "Kiln-dried white oak" not "high-quality wood".
6. **Round prices.** $1,899 not $1,899.99.
7. **Numbers as scannable headers** in policy pages — return windows, fees, time periods bold or in headers.
8. **No defensive language up front** in policies. Generosity opens; restrictions appear later if at all.

## Output format

Adapt to the section, but always include:

```
SECTION: <PDP / Returns / About / etc.>
WORD COUNT: <approx>

DRAFT:
<the copy>

[For PDP only:]
TITLE TAG: <Voice Guide v2 formula>
META DESCRIPTION (150-160 chars): <Voice Guide v2 formula>
ALT-TEXT (one per image referenced): <Voice Guide v2 formula>

[For policy pages:]
SCANNABLE HEADERS: <list of bolded numbers/timeframes>

3-PASS REVIEW: 3/3 passed
VOICE-GATE: APPROVED
```

## Storage permission

Always ask before saving. Never assume a folder layout — different teammates organize differently.

## Common mistakes to avoid

| Mistake | Fix |
|---|---|
| Drafting without loading brand-voice + brand-facts | REQUIRED PRE-LOAD is mandatory. |
| Inventing certifications or material specs | ASK the user. Never fabricate. |
| Using "premium" or "luxury experience" | Banned. Voice gate will block. Run anti-patterns first. |
| Defensive opening on policy pages | Lead with generosity. Restrictions later. |
| Burying numbers in policy prose | Numbers and dollar amounts in headers/bold. Customers scan. |
| Section voice drift across page types | The 3-pass self-review catches this. Don't skip. |
| Saving without asking the user for the path | Always ask. Never assume. |
