# Method 7 — Two-Tone Positioning (Aykah application)

Source: standard brand-strategy practice (functional + emotional). Invoked for `event-tagline`, `event-title`, `email-subject`, `hook`, and `campaign` output types. Pairs functional value with emotional value because purchases are 90% emotional, justified rationally.

## The structure

Every Aykah candidate (tagline, hook, subject, campaign concept) should hold two tones:

- **Functional tone** — the rational case (what it does, what it costs, what it's made of)
- **Emotional tone** — the felt case (how it makes the buyer feel, what it signals socially)

Single-tone outputs underperform. The functional case wins the comparison; the emotional case wins the loyalty.

## Aykah pairing examples

### Aires Dining Chair

- **Functional:** "Solid oak frame. Bouclé seat. $499."
- **Emotional:** "The grown-up dining chair you've been waiting for."
- **Two-tone combined:** "Solid-oak dining chair, bouclé seat. The grown-up chair you've been waiting for. $499."

### Burnaby showroom

- **Functional:** "Aykah's flagship Burnaby showroom — 5,000 sq ft, every active piece."
- **Emotional:** "Sit on it before you commit. No ambiguity."
- **Two-tone combined:** "5,000 sq ft of Aykah in Burnaby. Sit on it before you commit."

### Spring "Reset" event

- **Functional:** "Three days, new sectionals + dining sets, 15% off in-store."
- **Emotional:** "The reset your living room has been waiting for."
- **Two-tone combined:** "Reset your living room. Three days only at Burnaby."

## When to lead with functional vs emotional

| Audience | Lead with | Why |
|---|---|---|
| Cold Meta / TikTok (Stage 1–2) | Emotional | Pull, story, feel. They don't yet care about specs. |
| Pinterest organic (Stage 1–2) | Emotional + visual | Pinterest is mood-led. Save-driven. |
| Mid-funnel retargeting (Stage 3) | Functional first, emotional second | Comparison shoppers want specs. |
| PDP visitors (Stage 4) | Functional + reassurance | They have the emotional pull. They need proof. |
| Member emails (Stage 4–5) | Emotional + factual | They're already in. They want to feel good about the choice. |
| Abandoned cart (Stage 5) | Functional + risk reversal | Strip emotional language. Address the actual blocker. |

## Construction rules

When generating any candidate:

1. Write the **functional half** first. Name the material, the price, the dimension, the location.
2. Write the **emotional half** second. Name the feeling, the social signal, the moment.
3. Combine into one line OR keep them in a two-line structure (subject + preview text, hook + body, tagline + sub-tagline).
4. If the candidate has only one tone, ask which is missing and add it.

## Failure modes — flag these in candidates

- **All functional, no emotion:** "Solid oak dining chair, $499." → Reads as a spec sheet. Add emotion.
- **All emotional, no function:** "The chair you'll keep for a decade." → Reads as marketing fluff. Add a fact.
- **Forced emotion that drifts off-brand:** "The chair of your dreams." → Cliché. Re-write the emotional half with a sensory or social specific.
- **Two functions instead of function + emotion:** "Solid oak frame, bouclé seat, $499, ships in 5 days." → All function. Pick one functional anchor + one emotion.
- **Two emotions stacked:** "Where comfort meets style, designed for the way you live." → Two clichés, no function. Hard fail.

## Output integration

For `event-tagline` outputs, return 7 candidates each as a clear two-tone pair:

```
Tagline 1: [the tagline itself]
  Functional anchor: [what fact / spec it leverages]
  Emotional anchor: [what feeling it triggers]
  Stage match: [which awareness stage]
```

For `event-title` outputs, return 7 candidates with the two tones noted in the rationale.

For `hook` outputs, the hook itself should embody both tones in one line.
