---
name: social
description: Use for any Aykah social media copy task — Instagram captions, Reels/TikTok scripts, Pinterest pin descriptions, alt-text, first comments, content calendars, or social hooks. Triggers on phrases like "write a caption", "Instagram post", "Reels script", "TikTok hook", "Pinterest description", "social copy", "social post", or any prompt mentioning IG / Insta / TT / Pinterest in the context of writing copy. Loads brand voice, runs the channel-specific formula, and gates output through three brand-aligned reviewers plus the banned-words voice gate before delivery.
---

# Aykah Social

Channel-aware social copywriting. Every post is built from the locked Voice Guide v2 formula, drafted for the specific channel, then pressure-tested through three reviewer personas and the banned-words voice gate before it lands.

## When to use

- Instagram captions (feed posts, carousels)
- Reels / TikTok scripts (with timestamps + on-screen text + ASMR notes)
- Pinterest pin descriptions
- Alt-text for any of the above
- First comments (extension copy under a tight caption)
- Hooks (opening lines, scroll-stoppers)
- Content calendars (week of posts grouped by pillar)

## REQUIRED PRE-LOAD

Before drafting ANY social copy, load:

1. `../core/references/brand-voice.md` — banned words, approved vocabulary, voice attributes, **Channel Guide table**, **Social Media Caption Formula**
2. `../core/references/brand-facts.md` — verified facts (founders, locations, policies — never invent)

These two files are non-negotiable. Skipping them invites banned-word leakage.

## Workflow

```
1. Read user request. Identify the channel.
2. If channel unclear, ask ONE multiple-choice question.
3. REQUIRED PRE-LOAD: brand-voice.md + brand-facts.md
4. Load channel reference: references/channels/<channel>.md
5. Load references/formulas/caption-formula.md
6. (Optional) Load references/formulas/hook-bank.md or cta-bank.md if drafting from scratch
7. Draft using the formula + channel rules
8. Run the THREE PERSONAS silently (see references/personas.md)
   - If any FAIL, rewrite. Loop until all three PASS.
9. Run aykah-voice-gate agent on the candidate output (HARD-GATE)
10. If gate returns BLOCKED, apply mandatory fixes. Re-run.
11. Deliver: caption + alt-text + hashtags + (if applicable) first comment / shot list
12. Ask if user wants to save anywhere (never assume a path)
```

## Channel router

| User mentions... | Load |
|---|---|
| Instagram, IG, Insta, feed post, carousel | `references/channels/instagram.md` |
| Reels, TikTok, TT, short-form video, vertical video | `references/channels/reels-tiktok.md` |
| Pinterest, pin, board | `references/channels/pinterest.md` |
| LinkedIn, IN, professional post, founder post, thought leadership, long-form article, B2B post | `references/channels/linkedin.md` |

If the user names a channel not in the list (Threads, X, FB, paid social), say so plainly and ask if they want a generic adaptation or to wait for that channel's reference file in a future version. Do not invent platform rules.

## The three personas (HARD-GATE before delivery)

Run each silently on the draft. If any returns FAIL, rewrite and re-run all three. See `references/personas.md` for the full prompts.

1. **The Sanya filter** — Would the founder actually say this out loud?
2. **The reference-set customer** — Does this feel like a Quince / Cuyana / Sundays brand, or has it drifted toward Structube?
3. **The Channel Guide check** — Does the warmth + formality match what brand-voice.md prescribes for THIS channel?

Only output that passes all three personas + the voice-gate agent ships.

## Universal output rules

These apply on every channel:

1. **No banned words.** "free", "premium" (until Fall 2026 tier), "luxury experience", "elevated living", "timeless elegance", urgency phrases ("hurry", "don't miss out", "act fast"), discount framing, etc. Voice gate catches them; never write them in the first place.
2. **No emojis.** Anywhere. Brand-voice.md is explicit.
3. **No exclamation marks.** Periods. Always periods.
4. **No invented facts.** If a claim isn't in brand-facts.md, ask before writing it.
5. **No corporate filler.** No "we're excited to announce", "thrilled to introduce", "introducing the new...".
6. **Materials over marketing.** Lead with a material, a moment, or a sensory detail — not a feature list or a sale.
7. **Soft CTA only on organic.** "Explore the collection" / "Shop the look" / "Link in bio." Not "Buy now," not "Limited time."
8. **Round prices.** $1,899 not $1,899.99. Premium uses round numbers (Zhang & Wadhwa, 2015).

## Output format

Always return in this shape (adapt to channel):

```
CHANNEL: <Instagram / Reels / Pinterest>
PILLAR: <Materials / Craft / Living / Pricing / Service / Voice / Campaign>

CAPTION:
<the caption text>

ALT-TEXT:
<plain-language description, [Product Name] – [Material/Color] – [Angle/View] – [Context]>

HASHTAGS:
<channel-appropriate set, see channel reference for count + style>

FIRST COMMENT (optional):
<extension copy if caption was kept short>

[For Reels/TikTok only:]
SHOT SCRIPT:
00:00–00:03   Hook       | <visual> | <on-screen text> | <voice/audio>
00:03–00:10   Material   | ...
00:10–00:25   Context    | ...
00:25–00:30   Soft CTA   | ...

VOICE-GATE: APPROVED
PERSONAS: 3/3 passed
```

## Storage permission

If the user asks to save a content calendar or a batch of posts, ask for the full path they want. Never assume a folder structure. Always confirm before creating any new directory.

## Feedback Logging (required)

After every interaction (caption/script delivered, verdict received), append a history entry to `~/Desktop/aykah-feedback/social-history.json` and rebuild `~/Desktop/aykah-feedback/social-feedback.json` per the parent protocol at `../core/references/feedback-protocol.md`. Also append a row to `~/Desktop/aykah-feedback/summary.json`.

Create `~/Desktop/aykah-feedback/` with one-time user confirmation on first run if it doesn't exist. Skip all logging if `~/.aykah/no-feedback-logging` exists.

This is a hard requirement — the plugin maintainer collects these files to improve the skill over time.

## Common mistakes to avoid

| Mistake | Fix |
|---|---|
| Drafting before loading brand-voice.md | REQUIRED PRE-LOAD is mandatory. |
| Sending output without running the three personas | HARD-GATE. Every time. |
| Generic caption pasted across channels | Each channel has different warmth, formality, and structure. Use the channel reference. |
| 10+ hashtags on Instagram | IG 2026 indexes max 5 tags. More dilutes reach. |
| Hashtags on Pinterest | Pinterest is keyword-driven, NOT hashtag-driven. No hashtags. |
| Emojis or exclamations | Banned globally. |
| Caption that sounds like every other furniture brand | Run the three personas — that's exactly what they catch. |
| Inventing a "100-night trial" or "free shipping" | Voice gate will block it. Use brand-facts.md. |
| Skipping the desktop logging step | The protocol is mandatory. See `../core/references/feedback-protocol.md`. |
