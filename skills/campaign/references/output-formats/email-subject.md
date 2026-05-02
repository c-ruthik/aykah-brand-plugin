# Output format — `email-subject`

Used when the user asks for email subject lines (with preview text + stage targeting).

## Methods invoked
- `08-five-stages.md` (subject lines are stage-specific — this is the primary lens)
- `07-two-tone.md` (functional + emotional pairing inside the subject)
- (Plus grounding: JTBD, ICP, Dunford, 5 Pillars)

## Workflow inside the skill

1. Confirm what email this is for (welcome, nurture, event invite, abandoned cart, member preview, etc.)
2. Identify the awareness stage the recipient is in (depends on segment)
3. Generate 7 candidates in stage-appropriate patterns:
   - For Stage 2 emails: educational / problem-naming
   - For Stage 3 emails: comparison / alternative-framing
   - For Stage 4 emails: social proof / specifics / reassurance
   - For Stage 5 emails: direct, factual, no urgency
4. Pair each subject with a preview text (the second line shown in inbox)
5. Voice-gate all 7
6. Drop any below pillar-fit 3
7. Recommend one (with A/B variant suggestion)

## Subject line quality bar

- **30–50 characters preferred.** Mobile inbox cuts at ~40.
- Preview text fills the next 30–50 characters that show under the subject.
- No exclamation marks.
- No urgency words ("hurry", "last chance", "expires").
- No ALL CAPS.
- No emojis. (Banned per brand-voice.md)
- No clickbait ("You won't believe…", "This changes everything").
- Should match the recipient's awareness stage — Stage-1 educational subjects fail to a list that's already Stage-3.
- Lower-case warmth allowed and preferred.

## Deliverable shape

```
TYPE: email-subject
MODE: <quick / standard / deep>
CONTEXT: <one-line restatement; include email type — welcome / nurture / event / cart / preview>

RECIPIENT STAGE: <2 / 3 / 4 / 5>  (with reasoning)

CULTURAL MOMENT (standard + deep only):
<one paragraph from researcher agent>

────────────────────────────────────────────────
SUBJECT LINE CANDIDATES (7)

1. Subject: "<line>"   (chars: NN)
   Preview: "<preview line>"   (chars: NN)
   Stage match: <2/3/4/5>
   Functional anchor: <what fact it leverages>
   Emotional anchor: <what feeling it triggers>
   Pillar-fit: <1–5>  (deep mode only)

2. ...

(continues to 7)
────────────────────────────────────────────────
RECOMMENDED PICK: #<N>
Why: <2–3 sentences — stage match + emotional pull + format fit>

A/B VARIANT SUGGESTION:
  Variant A (the recommended pick): <subject>
  Variant B (alternate angle): <subject from another candidate>
  Hypothesis: <which audience segment which version should win with>
────────────────────────────────────────────────

VOICE-GATE: APPROVED | BLOCKED-AND-FIXED
```

## Quick mode shortcut

Return 5 subject + preview pairs only. No stage/anchor/pillar/A-B. Voice gate skipped.

## Common failure modes for this type

- Subject + preview saying the same thing twice
- Subject too long for mobile (>50 chars without strategic truncation)
- Stage-1 educational subjects sent to a Stage-3+ list (the list is already past stage 1)
- Urgency or hype language anywhere in the subject or preview
- "Re:" or "Fwd:" tricks (banned — feels manipulative)
- Emoji in subject (banned per brand-voice.md)
- Different stage in subject vs. preview (e.g., Stage-2 subject paired with Stage-5 preview)
