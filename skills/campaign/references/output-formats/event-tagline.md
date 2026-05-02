# Output format — `event-tagline`

Used when the user asks for the line under the event title.

## Methods invoked
- `07-two-tone.md` (functional + emotional pairing — this is the engine)
- `10-storybrand.md` (Plan / Success / Failure-avoidance angles)
- `01-jtbd.md` (which job the tagline serves)
- (Plus grounding: JTBD, ICP, Dunford, 5 Pillars)

## Workflow inside the skill

1. Confirm event context (and event title if already chosen)
2. Generate 7 candidates spanning the four two-tone angles:
   - Functional-led + emotional support
   - Emotional-led + functional support
   - Plan-anchored (instructive, "do this")
   - Success-anchored (outcome state)
3. Voice-gate all 7
4. Drop any below pillar-fit 3
5. Recommend one

## Tagline quality bar

- 6–14 words preferred
- Holds two tones (functional + emotional) — not just one
- Names a concrete material, location, or moment
- No exclamation marks
- No urgency phrases ("hurry", "don't miss", "limited")
- No "elevate", "transform", "unlock", "curated experience"
- Should pair with the event title without redundancy
- Should pass the "Sanya read out loud" test

## Deliverable shape

```
TYPE: event-tagline
MODE: <quick / standard / deep>
CONTEXT: <one-line restatement; include event title if known>

CULTURAL MOMENT (standard + deep only):
<one paragraph from researcher agent>

────────────────────────────────────────────────
TAGLINE CANDIDATES (7)

1. <Tagline>
   Functional anchor: <material / fact / location / time>
   Emotional anchor: <feeling / social signal>
   Job served: <functional / emotional / social>
   Stage match: <1–5>
   Pillar-fit: <1–5>  (deep mode only)

2. ...

(continues to 7)
────────────────────────────────────────────────
RECOMMENDED PICK: #<N>
Why: <2–3 sentences — names which job, which Force, which awareness stage>
────────────────────────────────────────────────

VOICE-GATE: APPROVED | BLOCKED-AND-FIXED
```

## Quick mode shortcut

Return 5 taglines, no anchors, no recommendation. Voice gate skipped.

## Common failure modes for this type

- Single-tone taglines (all functional or all emotional)
- Taglines that drift to cliché — flagged by Layer 2 of voice gate v2
- Taglines that target Pull when the segment's blocker is Anxiety
- Taglines with two emotions stacked and zero function
- Taglines redundant with the event title (saying the same thing twice)
