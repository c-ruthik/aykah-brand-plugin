# Output format — `mix`

Used when the user asks for a portfolio of ideas (safe + variations + bets).

## Methods invoked
- `15-seventy-twenty-ten.md` (the allocation engine — primary lens)
- `08-five-stages.md` (mix should span stages, not bunch up at one)
- `07-two-tone.md` (each idea holds both tones)
- (Plus grounding: JTBD, ICP, Dunford, 5 Pillars)

## Workflow inside the skill

1. Confirm context (campaign / product / event the mix is for)
2. Generate 10 ideas in 70/20/10 allocation:
   - 7 ideas in the proven 70% bucket (Aykah's workhorse formula)
   - 2 ideas in the 20% bucket (variations on what's working)
   - 1 idea in the 10% bucket (a bet)
3. Voice-gate all 10
4. Bets must still pass the gate — being a bet is not an excuse for off-brand
5. Recommend allocation prioritization (which to ship first if budget is constrained)

## Mix quality bar

- 70% bucket ideas must fit Aykah's proven creative formula (warm-toned product-in-room photography, Stage 3–4 messaging, two-tone, showroom or swatch CTA)
- 20% bucket ideas must vary EXACTLY ONE element of the workhorse — not three. Variation, not transformation.
- 10% bucket idea must be **executable** (not a fantasy) and **trackable** (you can measure if it lands)
- Every idea must pass voice gate v2 (banned words + AI-tells + clichés + register)
- Every idea must score 3+ on 5-Pillar fit

## Deliverable shape

```
TYPE: mix
MODE: <quick / standard / deep>
CONTEXT: <one-line restatement>

CULTURAL MOMENT (standard + deep only):
<one paragraph from researcher agent>

────────────────────────────────────────────────
70% BUCKET — Proven workhorse (7 ideas)

1. <idea>
   Why proven: <which existing pattern it leverages>
   Stage: <2/3/4/5>
   Channel: <e.g., Meta cold / retargeting / Pinterest / email>
   Functional anchor: <material / fact / location>
   Emotional anchor: <feeling / signal>
   Pillar-fit: <1–5>  (deep mode only)

2. ...

(continues to 7)
────────────────────────────────────────────────
20% BUCKET — Variations (2 ideas)

8. <idea>
   What it varies from the workhorse: <the one element changed>
   Stage: <2/3/4/5>
   Channel: <surface>
   Pillar-fit: <1–5>  (deep mode only)

9. ...
────────────────────────────────────────────────
10% BUCKET — Bet (1 idea)

10. <idea>
    Why a bet: <what's untested>
    Risk: <what could go wrong — specifics>
    Upside: <what could go very right — specifics>
    Voice-gate verdict: <PASS — bets must still pass>
    Pillar-fit: <1–5>  (deep mode only)
────────────────────────────────────────────────
PRIORITIZATION (if budget-constrained)
Ship first: 70% picks <#1, #2, #3>
Run alongside: 20% picks <#8, #9>
Always include: 10% pick <#10> — even on small budgets, the bet has to run
────────────────────────────────────────────────

VOICE-GATE: APPROVED | BLOCKED-AND-FIXED
```

## Quick mode shortcut

Return 10 ideas labeled by bucket only. No stage / anchor / pillar / risk-upside breakdown. Voice gate skipped.

## Common failure modes for this type

- 70% ideas that don't actually fit Aykah's proven workhorse — they're generic "safe DTC ad" ideas
- 20% ideas that vary too much (became 10% bets) or too little (indistinguishable from 70%)
- 10% bet that's actually unexecutable ("a viral TikTok where Salman becomes a meme" — not a real plan)
- 10% bet that drifts off-brand to feel "different" — different is the goal, off-brand is failure
- Mix bunches at one awareness stage (all 10 ideas are Stage 4) — should span 2–4 at minimum
- 7+2+1 ratio violated (8 safes / 1 variation / 1 bet — not a 70/20/10)
