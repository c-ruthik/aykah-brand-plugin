# The Three Personas — silent reviewers before delivery

Every social draft passes through three reviewers in sequence. Each asks ONE specific question. If any persona returns FAIL, rewrite the draft and re-run all three. Only when 3/3 pass does the draft move to the voice-gate agent.

These personas are not the same as the `aykah-voice-gate` agent. The voice gate is a mechanical check — banned words, fact verification, exclamation marks. The personas catch the stuff regex misses: tone drift, taste failures, channel mismatch.

Run them silently. The user only sees the final approved output.

---

## Persona 1 — The Sanya filter

**The question this reviewer asks:**
> "Would Sanya (the co-founder) actually say this out loud, in a normal voice, to a colleague?"

**This persona FAILS the draft if it contains:**

- Corporate filler — "We're thrilled to introduce", "Excited to announce", "Pleased to share"
- Marketing-department voice — "Discover the new", "Indulge in", "Experience the difference"
- Adjective stacking with no substance — "Beautiful, stunning, luxurious oak"
- Lines that read like an ad-agency brief rather than a person speaking
- Anything that needs an exclamation mark to feel right (because it's hollow without one)

**What this persona LIKES:**

- Plain-spoken observations — "The linen weave softens after the third wash."
- A single concrete material detail named clearly
- A founder's-voice cadence — short, confident, unhurried
- Lines that would sound natural said over coffee

**FAIL example:** "Discover the elegance of our new oak collection — designed to elevate your space."
**PASS example:** "New oak. Solid through, kiln-dried, finished with hard wax oil. Made to live in."

---

## Persona 2 — The reference-set customer

**The question this reviewer asks:**
> "If someone who shops at Quince, Cuyana, Maiden Home, Brooklinen, Parachute, or Sundays Furniture scrolled past this, would it feel like one of *their* brands — or like Structube?"

**This persona FAILS the draft if it contains:**

- Discount-store framing — "Starting at $X," "Save big," "Best price"
- Manufactured urgency — "Limited time," "Only 3 left," "Today only"
- Transactional CTAs — "Buy now," "Add to cart," "Don't miss out"
- Loud confidence about taste — "The most stunning", "The best you'll find"
- Generic "lifestyle" language without a specific anchor — "Live your best life", "Make your house a home"

**What this persona LIKES:**

- Quiet confidence — the brand doesn't have to convince you it's nice
- A single moment, room, or sensory observation as the entry point
- Soft CTAs that invite, don't pressure — "Explore the collection," "Shop the look"
- Restraint that signals premium without saying "premium"

**FAIL example:** "The sectional everyone's talking about — limited stock, ships fast. Don't miss it."
**PASS example:** "The Aura sectional. Belgian linen, kiln-dried oak frame, made for the kind of Sunday that doesn't end."

---

## Persona 3 — The Channel Guide check

**The question this reviewer asks:**
> "Does the warmth + formality + hook type match what Voice Guide v2's Channel Guide prescribes for THIS specific channel?"

**Reference (from `core/references/brand-voice.md`):**

| Channel | Warmth | Formality | Primary hook(s) |
|---|---|---|---|
| Social Media (IG feed) | High | Low | Materials hook + living hook |
| Reels / TikTok | High | Low | Materials hook + craft hook + ASMR audio |
| Paid Social | Medium | Low | "Belgian linen. Solid oak. $1,299." format |
| Email Promos | Medium-High | Low–Medium | Sub-line + product specifics |
| Showroom Signage | Medium | Medium | Materials hook + tagline |

**This persona FAILS the draft if:**

- The warmth dial is wrong — IG feed asks for High warmth; if the draft reads cold or stiff, FAIL
- The formality dial is wrong — Reels asks for Low formality; if the draft sounds like a press release, FAIL
- The hook type is wrong — Reels needs Materials + Craft hook; if it leads with pricing or generic lifestyle, FAIL
- The channel-specific rule is broken — Pinterest description with hashtags, IG with 12 hashtags, Reels with no on-screen text plan

**What this persona LIKES:**

- Hook type matches the channel's prescribed hooks (Materials hook for IG/Reels, Sub-line for product pages, etc.)
- Warmth feels right — Reels is warm and present, Paid is more clipped
- Format respects channel rules — Pinterest = keyword-led + 500 char + no hashtags

**FAIL example (Reels):** "The Aura sectional offers exceptional comfort and durability for modern living."
*(Wrong dial. Reels asks for High warmth + Materials hook + ASMR audio. This is medium warmth, generic features, no audio plan.)*

**PASS example (Reels):** "Hand pressing on the linen weave. The way it softens. The Aura sectional, Belgian linen, kiln-dried oak frame."
*(High warmth, Materials hook, an audio cue implied — the press, the soften.)*

---

## How to run them

For each persona:

1. Read the draft
2. Ask the persona's question
3. Return one of: `PASS — <one-line reason>` or `FAIL — <one-line reason + what to fix>`
4. Move to the next persona

If any FAIL, rewrite the draft addressing the FAIL reason, then re-run all three from Persona 1. Don't ship with 2/3 — only 3/3.

Keep the persona reasoning internal. The user sees only:

```
PERSONAS: 3/3 passed
```

If you couldn't get to 3/3 after three rewrite attempts, surface the issue to the user with the most stubborn FAIL reason — they may need to clarify the brief.

---

## Persona 4 — The Industry-Pro filter (LinkedIn channel ONLY)

**The question this reviewer asks:**
> "Would an interior designer / hospitality buyer / Canadian DTC founder reading this think 'this is real, not marketing'?"

This persona ONLY runs on LinkedIn drafts. For Instagram / Reels / Pinterest, skip this persona — it's not the right audience filter. So LinkedIn drafts run 4/4 personas; other channels stay at 3/3.

**This persona FAILS the LinkedIn draft if it contains:**

- AI-templated openers — "I just did X. Here's what it taught me about life."
- Broetry walls — every line a new paragraph for fake drama
- Hustle-culture markers — "Day 47 of building Aykah", "rise and grind"
- Inspirational quote pasted as if original
- Hook over 140 characters (lost on mobile cutoff)
- "Most people get this wrong. Here's why..." opener
- Engagement-bait closers — "Agree?", "Thoughts?", "DM me"
- "🚀 BIG NEWS 🚀" / emoji walls
- "I'm humbled to announce…" / "Thrilled to share…"
- "Game-changer", "disruptor", "10x", "leverage", "synergize" — broetry signals
- Off-topic for the founder's profile (LinkedIn algorithm now matches post topic to job-title metadata; Sanya/Salman should post on furniture/retail/sourcing/DTC ops, NOT generic leadership lessons — those will be suppressed)
- Single hero image attached (UNDER-performs text-only — image direction should specify carousel or video instead)
- External link in feed post body (60% reach penalty — link should be removed or moved to an article)
- "Link in first comment" trick (now also penalized as of early 2026)

**What this persona LIKES:**

- Specific moment + tension or surprise + 2–3 line synthesis + one quotable closing line
- Real numbers (years operating, units shipped, customer count, lead-time data)
- A real customer voice quoted directly
- Operational transparency — supply-chain, returns math, showroom economics
- Slightly contrarian takes when warranted (DTC playbook says no showrooms — we built two)
- 1,300–1,900 character body length (the engagement sweet-spot)
- Document carousel OR short native video format direction (the format winners)
- Founder's voice mode (sanya/salman) for thought-leadership posts; company voice only for milestones/hiring/partnerships
- Quotable closing line — single specific declarative ("That's why we don't do X.") OR a question that doesn't demand an answer ("Would you buy this?") OR a forward-looking line ("We're betting on this for the next five years.")

**Tone calibration:**

LinkedIn voice is the Aykah brand voice translated for professionals. Confident not braggy. Specific not generic. Founder-first (Sanya/Salman as protagonists, brand as canvas). Operational truth over hype. Plain language, not corporate jargon.

If a draft passes Persona 1 (Sanya filter) and Persona 2 (reference-set customer) and Persona 3 (channel guide) but FAILS this persona, it's usually because the post is brand-correct but doesn't read as professional / on-topic / non-AI. Rewrite with more specificity (a real number, a real moment, a real customer name) and cut the broetry / cliché markers.

---

## Updated execution rules

LinkedIn drafts: run all 4 personas (Sanya filter → reference-set customer → channel guide → industry-pro filter). Need 4/4 to pass.

All other channels (IG, Reels/TikTok, Pinterest): run personas 1–3. Need 3/3 to pass.

Output to user:

```
PERSONAS: 3/3 passed   (for non-LinkedIn channels)
PERSONAS: 4/4 passed   (for LinkedIn channel)
```
