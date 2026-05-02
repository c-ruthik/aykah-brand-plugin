# Output format — `event-title`

Used when the user asks for event name candidates.

## Methods invoked
- `10-storybrand.md` (customer-as-hero anchoring)
- `07-two-tone.md` (functional + emotional pairing)
- (Plus grounding: JTBD, ICP, Dunford, 5 Pillars)

## Workflow inside the skill

1. Confirm event context with user (showroom location, season, audience, intent)
2. Generate 7 candidates spanning angles:
   - Customer-state-titled (where they are now)
   - Customer-action-titled (what they'll do)
   - Customer-success-titled (the better state on the other side)
   - Anti-marketing-titled (deliberately under-stated, anti-hype)
3. Voice-gate all 7
4. Drop any below pillar-fit 3
5. Recommend one with rationale

## Title quality bar

- 1–4 words preferred. 5 max.
- Lower-case where reasonable (per Aykah register)
- No exclamation marks
- No "spring sale", "summer event", "holiday savings"
- No "you" / "your" pronouns are fine but don't force them
- Should hint at the customer's journey, not Aykah's act
- Should sound like Sanya/Salman would say it without flinching

## Deliverable shape

```
TYPE: event-title
MODE: <quick / standard / deep>
CONTEXT: <one-line restatement>

CULTURAL MOMENT (standard + deep only):
<one paragraph from researcher agent — what's resonating right now>

────────────────────────────────────────────────
TITLE CANDIDATES (7)

1. <Title>
   Angle: <customer-state | customer-action | customer-success | anti-marketing>
   StoryBrand element: <which SB7 piece it leans on — e.g., Plan, Success, Failure-avoidance>
   Functional anchor: <fact / location / time>
   Emotional anchor: <feeling / social signal>
   Pillar-fit: <1–5>  (deep mode only)

2. ...

(continues to 7)
────────────────────────────────────────────────
RECOMMENDED PICK: #<N>
Why: <2–3 sentences naming which SB7 element + which audience stage + which 5 Pillars value it leverages>
────────────────────────────────────────────────

VOICE-GATE: APPROVED | BLOCKED-AND-FIXED
```

## Quick mode shortcut

Return 5 titles, no angle / SB7 / anchor breakdowns, no recommendation. Voice gate skipped.

## Common failure modes for this type

- Defaulting to "Spring Sale" / "Summer Event" / "Holiday Savings" — banned generic patterns
- Using exclamation marks in the title
- Brand-first titles ("Aykah's Spring Edit") — should be customer-first
- 6+ word titles (loses memorability)
- Drift to luxury framing ("The Aykah Edit at Burnaby") — keep grounded
