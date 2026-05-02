# Method 15 — 70/20/10 Creative Allocation (Aykah application)

Source: Coca-Cola creative effectiveness model, popularized 2010s. Invoked for `mix` output type. Solves "should we play it safe or take risks?" with a fixed allocation.

## The split

- **70%** — proven creative formats and angles. The reliable workhorse.
- **20%** — variations and iterations of what's working. Refining the workhorse.
- **10%** — bets. Untested, weird, potentially-disastrous ideas.

The 10% is what discovers the next 70%. Without explicit allocation, brands drift to 100% safe (and stagnate) or 100% experimental (and burn budget).

## When `mix` is the requested output type

The skill returns 10 ideas in this allocation:

- 7 ideas in the 70% bucket (proven Aykah formula)
- 2 ideas in the 20% bucket (variations on what's working)
- 1 idea in the 10% bucket (a bet — untested, possibly weird)

Each idea is labeled with its bucket so the user knows which is which.

## Aykah's "proven 70%" formula (the workhorse)

Aykah's proven creative formula is:

- Warm-toned product-in-room photography (real customer or staged)
- Stage-3-or-4 messaging (comparison or social proof)
- Hook → body → showroom-visit CTA OR fabric-swatch CTA
- One material named explicitly (oak, bouclé, walnut, etc.)
- Lower-case warmth, no exclamations, no urgency
- Two-tone positioning (functional + emotional)

When generating 70%-bucket ideas, every idea should fit this formula.

## Examples per bucket — for an Aires Dining Chair Meta campaign

### 70% bucket (proven)
1. "Aires Dining Chair in 4 different real customer dining rooms" + hook "wears in not out" + CTA "see it at Burnaby"
2. "Maria's chairs after 18 months" + close-up of bouclé + CTA "request a swatch"
3. "Cozey vs. Aires" comparison carousel + showroom CTA
4. "What people compliment without realizing you ordered it online" + lifestyle shot
5. "$499. Solid oak. Burnaby + Mississauga showrooms." + product shot
6. "The dining chair your dining room has been waiting for" + hero shot
7. "Sit on it before you commit" + Burnaby map pin

### 20% bucket (variations of what's working)
8. Same proven formula, but text overlay calling out price comparison vs. Cozey directly
9. Same proven formula, but with founder voiceover + product shots

### 10% bucket (bets)
10. A reel of Salman responding to a customer's design dilemma in real time at the Burnaby showroom — unscripted, hand-held, no overlay graphics

## Bucket-bet rules

The 10% must:

- Still pass the voice gate (no banned words, no anti-patterns)
- Still fit the 5 Pillars (no exclamations, no hype)
- Be **executable** — a real idea, not a fantasy
- Be **trackable** — you can measure if it lands or doesn't

The 10% does NOT need to:

- Match the 70% formula (it's a bet because it's different)
- Look like prior Aykah creative (it should look new)
- Be safe (the whole point is risk)

## Common 70/20/10 failures

- Treating 10% as "discretionary" or "if we have time" — it's mandatory. That's the whole point.
- Letting the 70% get stale — refresh the workhorse every 6 months even if it's still working
- Putting the 10% in the worst time slots / lowest budgets — it can't learn anything that way
- The 10% drifts off-brand to feel "different" — different is the goal, off-brand is failure
- Calling everything "the 70%" because the brand is risk-averse — without explicit allocation, the 10% never happens

## Output integration

When type=`mix`, return:

```
70% — Proven workhorse (7 ideas):
1. [idea]
   Why it's proven: [the existing pattern it leverages]
2. ...

20% — Variations (2 ideas):
8. [idea]
   What it varies from the workhorse: [the one element changed]
9. ...

10% — Bet (1 idea):
10. [idea]
    Why it's a bet: [what's untested about it]
    Risk: [what could go wrong]
    Upside: [what could go very right]
```
