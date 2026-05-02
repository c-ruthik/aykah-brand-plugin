---
name: campaign
description: Use for any Aykah campaign-ideation or naming task — full marketing campaign briefs, event titles, event taglines, email subject lines, single ad/post hooks, or 70/20/10 idea mixes. Triggers on phrases like "campaign idea", "campaign brief", "name this event", "event title", "event tagline", "subject line", "email headline", "ad hook", "post hook", "give me a mix", or any prompt asking for marketing concepts, event naming, or hook copy. Grounds every output in JTBD + ICP + Dunford positioning + Aykah's 5 Pillars; invokes the right method stack per output type; runs three execution modes (quick / standard / deep); pulls live cultural-trend signal via the aykah-researcher agent in standard and deep modes; gates output through the v2 voice gate before delivery.
---

# Aykah Campaign

Method-driven campaign and naming skill. Built on 18 marketing methods (the canonical reference) but only invokes the 7 that do real work for campaigns + naming. Every output is grounded in customer understanding (JTBD), the Premium Practical ICP, Dunford positioning, and the 5 Pillars before any creative is generated. Three execution modes match output depth to your time budget.

## When to use

- Full campaign briefs (Get/Who/To/By + 5-stage channel map + creative concept)
- Event title / event name candidates
- Event tagline candidates
- Email subject lines (with preview text + stage-targeting)
- Single ad or post hooks (5 candidates per stage)
- 70/20/10 idea mix (proven + variations + bets)

When NOT to use:
- IG/Reels/Pinterest captions → use `/aykah:social`
- Long-form copy (PDP, About, FAQ, policy pages) → use `/aykah:copy`
- Image generation → use `/aykah:image`
- Strategic thinking / pressure-testing decisions → use `/aykah:buddy`

If a campaign brief naturally produces a social asset list, this skill emits a **social asset brief** as a handoff document — it does NOT generate captions. The user runs `/aykah:social` for the actual captions.

## REQUIRED PRE-LOAD

Before any output, load these in order:

1. `../core/references/brand-facts.md` — verified facts (founders, locations, policies, prices). Never invent.
2. `../core/references/brand-voice.md` — banned words, approved vocabulary, voice attributes.
3. `references/methods/01-jtbd.md` — the three jobs (functional / emotional / social) and Forces analysis for the Aykah Premium Practical ICP.
4. `references/methods/02-icp.md` — the Premium Practical narrative + behavioral signals + NOT-our-ICP segments.
5. `references/methods/05-dunford-positioning.md` — competitive alternatives, unique attributes, category frame.
6. `references/methods/18-five-pillars.md` — purpose / vision / mission / values / personality.

These four method files (1, 2, 5, 18) are the **grounding layer**. Everything else builds on them. Skipping any of them invites generic, off-brand output.

After grounding loads, load only the method files needed for the requested output type. See the type router below.

## Scope discipline (HARD RULE)

**If the user asks for ONE type only, return ONLY that type.** Do not volunteer extra deliverables. Do not produce a "bonus" campaign brief alongside requested taglines. Do not append "you might also want…" suggestions.

The user invokes the skill once per output. They get exactly what they asked for. If they want more, they invoke it again.

The only exception: a `campaign` request naturally produces a social asset brief, hook seed list, and email subject seeds as PART of the campaign output (because a campaign without those isn't a real campaign). That is not scope creep — it's the type definition.

## Modes — three depths, one skill

The user can name the mode explicitly with `--mode quick|standard|deep` OR the skill detects from context. Default if unclear: `standard`.

| Mode | What it returns | Time | Researcher agent | Voice gate |
|---|---|---|---|---|
| `quick` | 5 candidates, no method anchor, no rationale, no recommended pick | ~30s | NO | NO |
| `standard` | 7 candidates + method anchor per candidate + recommended pick + brief rationale | ~2 min | YES (culture-layer trends only) | YES |
| `deep` | Full strategic chain — JTBD job → ICP fit → 5-stages → outputs → variations + culture-moment overlay + voice gate v2 report | ~5 min | YES (full trend research) | YES |

### Mode detection from context

If the user says any of these, route to `quick`:
- "quick", "fast", "just give me", "real quick", "5 of"

If the user says any of these, route to `deep`:
- "full", "everything", "deep dive", "strategic", "rationale", "explain", "with reasoning", "for the whole campaign"

Otherwise default to `standard` and tell the user which mode you picked in one line.

## Output type router

The user names a type explicitly OR the skill infers it. If unclear, ask ONE multiple-choice question — never assume.

| User mentions… | Type | Methods invoked (in addition to grounding) |
|---|---|---|
| "campaign", "campaign brief", "marketing campaign", "for [event/launch]" | `campaign` | 09-get-who-to-by, 08-five-stages, 07-two-tone |
| "name this event", "event title", "event name", "what should we call" | `event-title` | 10-storybrand, 07-two-tone |
| "event tagline", "tagline for", "headline for the event" | `event-tagline` | 07-two-tone, 10-storybrand |
| "email subject", "subject line", "email headline" | `email-subject` | 08-five-stages, 07-two-tone |
| "hook", "ad hook", "post hook", "opening line", "scroll-stopper" | `hook` | 08-five-stages, 07-two-tone |
| "mix of ideas", "70/20/10", "safe and risky", "ideas portfolio" | `mix` | 15-seventy-twenty-ten |

If the user's intent is ambiguous (e.g., "give me ideas for the spring event"), ask:

> What kind of output do you want?
> 1. Campaign brief (full plan + channels + creative concepts)
> 2. Event title (the name itself)
> 3. Event tagline (the line under the name)
> 4. Email subject lines
> 5. Ad/post hooks
> 6. 70/20/10 idea mix

## Researcher agent — when and how

In `standard` mode, dispatch `aykah-researcher` with a tight, scope-limited prompt:

> Aykah is generating [TYPE] for [CONTEXT]. Pull the **single strongest culture-layer signal** from the last 30 days that this output should ride: Pinterest Predicts, IG home-decor saves, NYT Real Estate / Apartment Therapy / Dwell trend pieces, BC/Ontario regional events. Return ONE paragraph (under 150 words) + 2 sources.

In `deep` mode, dispatch with broader scope:

> Aykah is generating [TYPE] for [CONTEXT]. Pull culture-layer signals from the last 60 days across: Pinterest Predicts, recent design/lifestyle trend pieces (Apartment Therapy, Dwell, Vogue Living, Architectural Digest), Reddit r/HomeDecorating + r/Furniture chatter, Instagram saves trends, Canadian regional cultural moments. Return: (a) 3 dominant signals with sources, (b) what's overdone right now and should be avoided, (c) one specific cultural moment this campaign could ride. Under 400 words.

Pass the researcher's output through to the workflow. It becomes the "Cultural moment" section in the final output (deep mode only) or shapes which candidates get prioritized (standard mode).

In `quick` mode, **skip the researcher entirely.** No external calls.

## Voice gate (HARD-GATE in standard + deep)

After candidates are generated, run them through the `aykah-voice-gate` agent (which now loads `anti-patterns-v2.md`).

- Standard mode: every candidate gets the gate. Anything BLOCKED = drop or rewrite before delivery.
- Deep mode: every candidate gets the gate, AND the gate's full v2 report is included in the deliverable.
- Quick mode: NO voice gate (speed is the priority — user takes responsibility).

If the gate BLOCKS more than 50% of candidates, surface that to the user — it usually means the input concept itself is off-brand and needs reframing, not just rewording.

## Workflow

```
1. Read user request. Detect output type. If ambiguous, ask ONE multiple-choice question.
2. Detect mode (quick/standard/deep). Default standard. Announce in one line.
3. REQUIRED PRE-LOAD:
   - brand-facts.md
   - brand-voice.md
   - methods/01-jtbd.md
   - methods/02-icp.md
   - methods/05-dunford-positioning.md
   - methods/18-five-pillars.md
4. Load type-specific method files (per the router table)
5. Load output format template: references/output-formats/<type>.md
6. (Standard + deep only) Dispatch aykah-researcher with scope-limited prompt
7. Generate candidates per the method stack + format template
8. (Standard + deep only) Run aykah-voice-gate on every candidate
9. (Standard + deep only) If voice gate BLOCKS >50%, surface that to user
10. Apply mandatory fixes from voice gate
11. Deliver in the format prescribed by the type's output template
12. Append history entry per Feedback Logging section
13. Check invocation count — if multiple of 20, surface feedback prompt
14. Ask if user wants to save anywhere (never assume a path)
```

## The 7 methods this skill uses (and why)

**Grounding (always loaded — they don't generate, they filter):**

1. **JTBD (Method 1)** — Forces every output to map to a real customer job. Functional / emotional / social. Forces of Progress (Push / Pull / Anxiety / Habit).
2. **ICP (Method 2)** — Premium Practical narrative. If a candidate doesn't fit this person, drop it.
3. **Dunford Positioning (Method 5)** — Defines the category we're playing in (showroom-backed direct-from-factory) and the competitive frame. Filters out candidates that drift toward Cozey-energy or RH-stuffy.
4. **5 Pillars (Method 18)** — Purpose / vision / mission / values / personality. Every candidate is scored 1–5 against the pillars; <3 dropped.

**Invoked per type (these DO the work):**

5. **Get/Who/To/By (Method 9)** — Forces specificity in campaign briefs. No vague "Who" or fuzzy "To".
6. **5 Stages of Awareness (Method 8)** — Matches message to audience stage. Cold-traffic Stage 1–2 ≠ retargeting Stage 4 ≠ list Stage 5.
7. **Two-Tone (Functional + Emotional, Method 7)** — The engine for taglines and hooks. Pairs the rational claim with the felt one.
8. **StoryBrand SB7 (Method 10)** — Customer-as-hero structure for event names and narrative campaigns. Avoids brand-as-hero failure mode.
9. **70/20/10 (Method 15)** — Risk/safe ratio for the `mix` type. Forces explicit allocation of safe + variation + bet.

The other 9 methods from the canonical reference (Switch Interview, Value Prop Canvas, 4C, Bullseye, Pirate Funnel, Signal Measurement, Hook/Body/CTA testing, Category Design, Blue Ocean) belong in upstream strategy work, not in this skill.

## Output format

Each output type has a specific template at `references/output-formats/<type>.md`. The skill always returns in that format.

Common across all types:

```
TYPE: <campaign / event-title / event-tagline / email-subject / hook / mix>
MODE: <quick / standard / deep>
CONTEXT: <one-line restatement of what user asked for>

[type-specific output — see template]

VOICE-GATE: APPROVED | BLOCKED-AND-FIXED  (skipped in quick mode)
RESEARCHER: <one-line cultural moment summary>  (standard + deep only)
```

## Feedback Logging (required)

After every interaction, append a history entry to `~/Desktop/aykah-feedback/campaign-history.json` and rebuild `~/Desktop/aykah-feedback/campaign-feedback.json` per the parent protocol at `../core/references/feedback-protocol.md`. Also append a row to `~/Desktop/aykah-feedback/summary.json`.

### Per-skill input/output payload for campaign

```json
"inputs": {
  "type": "event-tagline",
  "mode": "standard",
  "context_summary": "<first 200 chars of user's request>",
  "researcher_used": true
},
"output": {
  "candidates_generated": 7,
  "candidates_passed_voice_gate": 6,
  "candidates_blocked": 1,
  "recommended_pick_summary": "<first 100 chars of recommended candidate>"
}
```

Create `~/Desktop/aykah-feedback/` with one-time user confirmation on first run if it doesn't exist. Skip all logging if `~/.aykah/no-feedback-logging` exists.

### 20-invocation feedback prompt (NEW pattern)

Maintain a counter at `~/Desktop/aykah-feedback/campaign-stats.json`:

```json
{
  "invocations_total": 23,
  "invocations_since_last_feedback": 3,
  "last_feedback_at": "2026-04-28T10:15:00Z"
}
```

After every successful interaction:
1. Increment `invocations_total` and `invocations_since_last_feedback`
2. If `invocations_since_last_feedback` is a multiple of 20 (20, 40, 60…), append this to the end of the output:

   ```
   ───────────────────────────────────────
   💭 You've used /aykah:campaign 20 times since your last feedback. The plugin maintainer uses your feedback to upgrade this skill. Want to share what's working / not working?

   - Reply now: `/aykah:campaign --feedback "your note here"`
   - Reply later: same flag, anytime in any session
   - Skip: just keep going. The prompt resets after 5 more invocations.
   ───────────────────────────────────────
   ```

3. If the user ignores the prompt and runs the skill 5 more times without using `--feedback`, RESET `invocations_since_last_feedback` to 0 and don't surface the prompt again until the next 20.

### --feedback flag (works anytime, any input)

If the user invokes the skill with `--feedback "their note"` (with or without other arguments), the skill:

1. Append the note to `~/Desktop/aykah-feedback/campaign-feedback.json`:

   ```json
   {
     "timestamp": "2026-05-02T14:30:00Z",
     "user": "ruthik",
     "skill": "campaign",
     "feedback": "the event-tagline mode is too formal — want warmer tone",
     "context_last_3_invocations": [
       { "type": "event-tagline", "mode": "standard", "context_summary": "..." },
       ...
     ]
   }
   ```

2. Reset `invocations_since_last_feedback` to 0 in stats.json
3. Acknowledge to the user in one line: "Feedback saved. Thanks. Continuing."
4. If the user ALSO included a real request in the same invocation (e.g., `/aykah:campaign hook for spring event --feedback "previous taglines too formal"`), process the request normally AFTER saving feedback.
5. If the invocation was feedback ONLY (no other input), just save and exit.

This is a hard requirement — the maintainer collects these files to improve the skill over time.

## Storage permission

If the user asks to save the campaign brief, taglines, or email subjects to a file, ask for the full path they want. Never assume. Always confirm before creating any new directory.

## Common mistakes to avoid

| Mistake | Fix |
|---|---|
| Drafting before loading the 4 grounding method files | REQUIRED PRE-LOAD is mandatory. Skipping = generic output. |
| Returning all 6 output types when user asked for one | SCOPE DISCIPLINE rule. One ask, one type. |
| Skipping the voice gate in standard mode | Hard rule. Quick is the only mode without it. |
| Inventing a "100-night trial" or "free shipping" | Voice gate blocks it. Use brand-facts.md. |
| Researcher agent dispatched in quick mode | Quick mode skips the researcher. Speed is the point. |
| Loading every method file regardless of type | Only load methods the type actually needs. The router table is canonical. |
| Treating 70/20/10 as a 70% / 20% / 10% percentage of candidates | It's an allocation principle: 7 safe / 2 variations / 1 bet, not 7+2+1=10. |
| Mode picked silently with no announcement | Always tell the user "running in standard mode" in one line. |
| Skipping the 20-invocation feedback prompt | Counter check is part of the workflow. Not optional. |
| Re-running the feedback prompt every invocation | Multiples of 20 only. Reset to 0 after `--feedback` or after 5 more ignored prompts. |
