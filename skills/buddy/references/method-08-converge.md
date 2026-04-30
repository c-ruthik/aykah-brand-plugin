# Method 8 — Converge

**Stack:** Affinity Grouping + 2x2 Matrix + Weighted Scoring + Dot Voting

---

## What it does

Narrows a list of ideas into a decision. The discipline of saying no.

## When to use

After Diverge or Lotus produces many candidates. When the user has 5+ options and needs to pick.

- "Help me prioritize..."
- "Rank these..."
- "Which should I do first?"
- "Which campaign do we run?"

## Hard rules

- Be honest about criteria. Vague criteria produce vague decisions.
- Use numbers where possible.
- Don't keep more than 3 winners.
- The user makes the call. Buddy proposes; the user decides.

## Workflow

### Step 1 — Affinity grouping (always first if 8+ ideas)

Cluster ideas into 3–6 themes. For each cluster: name it, list ideas, note the underlying principle.

Themes reveal the structure of the idea space — and often the right decision is "pick one from each theme" or "pick all from one theme."

### Step 2 — 2x2 Matrix

Plot every idea on two axes. Customize to the decision:

| Decision type | Default axes |
|---|---|
| General | Impact x Effort |
| Marketing campaigns | Brand impact x Execution risk |
| Product features | Customer value x Build cost |
| Project prioritization | Strategic fit x Time to launch |
| Technical decisions | Quality lift x Pipeline complexity |

Four quadrants:

- **Top-right (high impact, low effort)** — Quick wins. Do first.
- **Top-left (high impact, high effort)** — Big bets. Plan for these.
- **Bottom-right (low impact, low effort)** — Fill-in. Do if free.
- **Bottom-left (low impact, high effort)** — Kill. Don't even keep on the list.

Most ideas land bottom-left. That's the point.

### Step 3 — Weighted scoring (only for high-stakes decisions)

Skip for low-stakes calls — overkill.
Use for: hires, major launches, brand-direction shifts, expensive technical builds.

Pick 4–6 criteria. Weight each (must sum to 100%). Score each candidate 1–5 per criterion. Multiply by weight. Sum.

| Candidate | Criterion 1 (30%) | Criterion 2 (20%) | ... | Total |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

### Step 4 — Dot voting (only for collaborative sessions)

Each person gets 3 dots. Place them on favorites. Sum reveals consensus that wasn't obvious from discussion. Skip for solo work.

## Output format

```
Inputs: <how many candidates, where they came from>

Affinity clusters:
  Theme 1 — <name>: <ideas, principle>
  Theme 2 — ...
  ...

2x2 Matrix (axes: <pick the right two>):
  Quick wins: <ideas>
  Big bets: <ideas>
  Fill-in: <ideas>
  Kill list: <ideas>

Weighted scoring (if high-stakes): <table>

Recommended decision:
  - Do this week: 1–2 ideas       [Maturity: Ready]
  - Plan for next quarter: 1–2    [Maturity: Refined]
  - Park: <1 idea max>            [Maturity: Parked]
  - Kill / deprioritize: <list>   [Maturity: Eliminated]

Why: <2–3 sentences>
Verdict: accept / reject / modify / defer
One question to confirm: <yes/no for the user to lock in>
```

## Common failure modes

- Vague criteria ("important" and "good fit" aren't criteria)
- Keeping too many — if 6+ "winners", you didn't converge
- Skipping the kill list (naming what NOT to do is half the value)
- Making the call for the user instead of recommending
- Skipping affinity grouping when there are many ideas
