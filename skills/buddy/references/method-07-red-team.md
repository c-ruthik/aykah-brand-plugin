# Method 7 — Red Team + Pre-Mortem

**Stack:** CIA-style alternative analysis + Gary Klein Pre-Mortem
**Source research:** Klein's research at the Naval Research Lab — pre-mortems raise failure-prediction accuracy ~30% over standard risk analysis. Mechanism: shifts cognitive task from "predict" (hard) to "explain" (easy). Red Teaming originated post-9/11 at CIA Red Cell and U.S. Army UFMCS at Fort Leavenworth.

---

## What it does

Adversarial stress-test before commitment. Combines alternative analysis with a past-tense failure autopsy.

## When to use

Before any **major** commitment of time, money, or reputation:

- A new pipeline build
- A major hire
- A launch
- A brand-direction shift
- A partnership
- An expensive automation

**Threshold:** generally use when cost is `>$10K`, time is `>2 weeks`, or there's material reputation exposure.

## Hard rules

- Be uncomfortable. Polite red-teaming is useless.
- No hedging. Either the failure mode is real or it isn't.
- Treat assumptions as adversarial.
- The pre-mortem is **past-tense**. Not "could fail" — "did fail." This shifts the cognitive task from "predict" (hard) to "explain" (easy).

## Three techniques (run in sequence)

### Technique 1 — Pre-Mortem (Klein)

Project to 6 months in the future. The plan failed catastrophically. Write the autopsy.

Generate 5–8 distinct failure narratives. Each is a 2–3 sentence story explaining how the failure unfolded. Treat as if it already happened.

**The cognitive shift is critical:** don't ask "what could fail?" — ask "it's six months from now, the project failed badly — what happened?"

### Technique 2 — Red Team Alternative Analysis

Three angles, each as a substantive paragraph:

- **Adversary's view** — What does the strongest critic of this plan say?
- **Competitor's view** — If a competitor knew about this plan, what would they hope happens? What weakness would they exploit?
- **Customer's view** — What would the customer find disappointing or confusing about the outcome?

Score each: `real concern` / `manageable` / `noise`.

### Technique 3 — Key Assumptions Check

List the load-bearing assumptions. For each:

| Assumption | Confidence | What would invalidate it |
|---|---|---|
| ... | low / medium / high | ... |

**Rule:** if any load-bearing assumption is `low confidence` AND would invalidate the plan if wrong — that's the first thing to test before committing.

## Output format

```
Plan being stress-tested: <one paragraph>

Pre-Mortem failure narratives (5–8, past-tense):
  1. <story>
  ...

Red Team:
  Adversary's view: <paragraph> [rating: real concern / manageable / noise]
  Competitor's view: <paragraph> [rating: ...]
  Customer's view: <paragraph> [rating: ...]

Key Assumptions Check (table)

Verdict:
  - Most plausible failure mode: <#1 from Pre-Mortem>
  - Strongest red-team argument: <most damaging real concern>
  - Most fragile assumption: <load-bearing, low confidence>

Recommendation:
  - Proceed: yes / no / not yet      [accept / reject / modify / defer]
  - Conditions before committing: <bullets>
  - Cheapest pre-commitment test: <single experiment that resolves the biggest uncertainty for the lowest cost>
  - Kill criteria: <what would mean "stop">
  - One-line summary: <memorable closing line>
```

This output is long. Ask the user before saving — do not assume a path.

## Common failure modes

- Soft pre-mortem ("it could be slow") — no, "the project was abandoned because latency tripled in week 3"
- Politeness in red teaming (if it doesn't sting, it's not a real adversary)
- High confidence on every assumption (almost every plan has 1–2 low-confidence load-bearing ones)
- Verdict that just rephrases the original plan
- Skipping kill criteria (without them, projects don't die — they linger)
