# 3-Pass Self-Review

Run silently on every draft before the voice-gate agent. If any pass FAILS, rewrite addressing the failure reason and re-run all three. Don't ship at 2/3.

---

## Pass 1 — Voice match

**The question:** Does this read like Aykah's four voice attributes?

1. Natural & conversational (not corporate)
2. Confident but understated (not pushy or salesy)
3. Warm but not emotional (not theatrical)
4. Design-aware but not pretentious (not condescending)

**FAIL signs:**

- Reads like a marketing department wrote it ("We're excited to introduce", "Discover the elegance of")
- Stiff or formal in a section that should be warm (About, Founder Letter)
- Casual or chatty in a section that should be precise (Returns, Warranty)
- Has a single exclamation mark
- Uses any banned word from `core/references/brand-voice.md`
- Reads like Structube (transactional, urgency-driven, discount-coded)
- Reads like Restoration Hardware (overwrought, "elevated", "timeless elegance")

**PASS sign:** A teammate reading it would recognize it as Aykah without the byline.

---

## Pass 2 — Specificity

**The question:** Is every claim named precisely, or is anything vague?

**FAIL signs:**

- "Premium materials" — vague (and the word "premium" is banned)
- "High-quality wood" — name the species
- "Soft fabric" — name the fabric, GSM, weave
- "Eco-friendly" / "sustainable" / "non-toxic" — name the certification (CertiPUR-US, OEKO-TEX, FSC, GREENGUARD)
- "Durable" — replace with "Engineered for longevity" or name the construction method (kiln-dried, dovetail, corner-blocked)
- "Long-lasting comfort" — describe the cushion/foam construction instead
- "Industry-leading" / "best-in-class" / "world-class" — overclaiming, no specifics

**PASS sign:** Every material claim names the actual material; every certification cited is one the user has confirmed; no vague adjective is doing load-bearing work.

---

## Pass 3 — So-what

**The question:** Does every sentence earn its place?

For each sentence in the draft, ask "so what?" If the sentence's purpose isn't immediately clear, cut it.

**FAIL signs:**

- Stock-phrase opener ("In a world where...", "When it comes to furniture...", "Looking for the perfect sofa?")
- Closing summary ("In conclusion...", "Truly representing...")
- Filler transitions ("That's why we...", "And that's not all...")
- Sentences that restate the previous sentence with different words
- Sentences that could apply to any furniture brand (not specifically Aykah)

**PASS sign:** Cutting any sentence would lose specific information or break the rhythm.

---

## Output of the review (internal, not shown to user)

For each pass:

```
Pass 1 (Voice match):    PASS / FAIL — <one-line reason>
Pass 2 (Specificity):    PASS / FAIL — <one-line reason>
Pass 3 (So-what):        PASS / FAIL — <one-line reason>
```

If any FAIL: rewrite, re-run all three from Pass 1. Loop up to 3 attempts.

If still failing after 3 rewrite attempts: surface the issue to the user with the most stubborn FAIL reason. The brief may need clarification (e.g., user-supplied material specs, a real founder anecdote, a verified policy detail).

User sees only the final approved output and:

```
3-PASS REVIEW: 3/3 passed
```
