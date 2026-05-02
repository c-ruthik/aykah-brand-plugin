# Output format — `campaign`

Used when the user asks for a full campaign brief.

## Methods invoked
- `09-get-who-to-by.md` (campaign brief discipline)
- `08-five-stages.md` (channel × stage map)
- `07-two-tone.md` (creative concept tone)
- (Plus the 4 grounding methods: JTBD, ICP, Dunford, 5 Pillars)

## Workflow inside the skill

1. Confirm campaign context with user in one sentence
2. Generate the Get/Who/To/By brief
3. Map awareness stages to channels (Stage 1–2 cold, Stage 3 retargeting, Stage 4–5 list/PDP/SR)
4. Write 3 creative concepts at the awareness stage that's the campaign's center of gravity
5. List the social asset brief (handoff to `/aykah:social`)
6. List email subject seeds for the campaign's email cadence
7. List measurement signals to track (which would shift creative if they moved)
8. Voice-gate every named creative line

## Deliverable shape

```
TYPE: campaign
MODE: <quick / standard / deep>
CONTEXT: <one-line restatement of what user asked for>

────────────────────────────────────────────────
1. THE BRIEF — Get / Who / To / By

Get: <specific behavior change>
Who: <specific person — behavioral signal, not demographic>
To: <specific measurable action>
By: <specific message or stimulus>

Center of gravity: <which awareness stage this campaign primarily serves>
────────────────────────────────────────────────
2. CHANNEL × STAGE MAP

Stage 1–2 (Unaware / Problem-aware):
  - Channels: <e.g., cold Meta, TikTok, Pinterest reach>
  - Message angle: <one line>

Stage 3 (Solution-aware):
  - Channels: <e.g., retargeting Meta, Google Search>
  - Message angle: <one line>

Stage 4 (Product-aware):
  - Channels: <e.g., PDP, retargeting, abandoned cart, member email>
  - Message angle: <one line>

Stage 5 (Most aware):
  - Channels: <e.g., abandoned cart, list email, in-store>
  - Message angle: <one line>
────────────────────────────────────────────────
3. CREATIVE CONCEPTS (3)

Concept A: <name>
  Stage match: <stage>
  Functional anchor: <fact / spec / location>
  Emotional anchor: <feeling / social signal>
  Hero line: <one sentence>
  CTA: <specific, no-urgency action>

Concept B: <name>
  ...

Concept C: <name>
  ...
────────────────────────────────────────────────
4. SOCIAL ASSET BRIEF (handoff to /aykah:social)

Theme: <one line>
Pillars to use: <Materials / Craft / Living / Pricing / Service / Voice / Campaign>
Channels: <IG / Reels / Pinterest>
Tone: <e.g., warm + factual + showroom-pulling>
Do: <3 bullets>
Don't: <3 bullets>
Asset list: <e.g., 5 IG carousels, 2 Reels, 8 Pinterest pins>
────────────────────────────────────────────────
5. EMAIL SUBJECT SEEDS

Welcome / sequence opener (Stage 2): <subject>
Mid-funnel (Stage 3): <subject>
Reassurance (Stage 4): <subject>
Direct (Stage 5): <subject>
────────────────────────────────────────────────
6. MEASUREMENT SIGNALS

Signal 1: <metric> | Threshold: <value> | Action if crossed: <what we change>
Signal 2: ...
Signal 3: ...
────────────────────────────────────────────────

VOICE-GATE: APPROVED | BLOCKED-AND-FIXED
RESEARCHER: <one-line cultural moment>  (standard + deep only)
PILLAR-FIT (deep mode only): <avg score / notes>
```

## Quick mode shortcut

In quick mode, skip 4–6 (social brief, email seeds, measurement). Return only sections 1–3 with no rationale, no voice gate.
