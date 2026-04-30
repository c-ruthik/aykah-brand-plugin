# Method Router — pick the right method from the question shape

Buddy never free-associates. Every session runs one method (or a chain), chosen from the shape of the user's prompt.

## Decision flow

```
User prompt arrives
       |
       v
Is the problem itself clear and well-defined?
       |
       NO ─────────> Method 1 — Frame
       |                                (then route again with the framed problem)
       YES
       |
       v
Is there a tradeoff in the prompt? ("X without sacrificing Y")
       |
       YES ────────> Method 4 — TRIZ
       |
       NO
       |
       v
Is there exactly ONE idea/plan to test?
       |
       YES ────────> Method 5 — Pressure-Test
       |             (if commitment is large: chain into Method 7 — Red Team)
       |
       NO
       |
       v
Is the decision multi-year and depends on uncertain external forces?
       |
       YES ────────> Method 6 — Scenario Wind-Tunnel
       |
       NO
       |
       v
Are there already 5+ candidates that need narrowing?
       |
       YES ────────> Method 8 — Converge
       |
       NO
       |
       v
Need to MAP an entire idea space (coverage, not volume)?
       |
       YES ────────> Method 3 — Lotus Blossom
       |
       NO ─────────> Method 2 — Diverge (default for "give me ideas")
```

## Trigger phrases — quick lookup

| If the prompt sounds like... | Route to |
|---|---|
| "I'm stuck on...", "I don't know what we're solving for", "give me ideas for X" with no clear frame | **Method 1 — Frame** |
| "Brainstorm 8 angles", "campaign ideas", "social hooks", "product variations", "tactic options" | **Method 2 — Diverge** |
| "Map all the options", "loyalty program design", "content strategy across channels", "programmatic SEO grid" | **Method 3 — Lotus Blossom** |
| "We want premium feel without high cost", "faster delivery without higher fees", "more SKUs without inventory risk" | **Method 4 — TRIZ** |
| "Pressure-test this plan", "should I do X?", "what am I missing?", "help me think through this" | **Method 5 — Pressure-Test** |
| "Should we open Calgary in 2027?", "Should we go DTC-only?", "Should we sunset the value tier?" | **Method 6 — Scenario Wind-Tunnel** |
| "Before we commit to X..." with material spend / time / reputation | **Method 7 — Red Team + Pre-Mortem** |
| "Help me pick from these 12 ideas", "rank these candidates", "which campaign should we do first?" | **Method 8 — Converge** |

## When to chain methods (canonical sequences)

Most real Aykah questions chain at least two methods. Examples:

- **Marketing campaign:** Frame → Diverge → Converge → Pressure-Test
- **Product line / loyalty / content strategy:** Frame → Lotus Blossom → Converge → Pressure-Test
- **Tradeoff resolution:** Frame → TRIZ → Pressure-Test
- **Multi-year strategic call:** Frame → Lotus Blossom → Converge → Scenario Wind-Tunnel → Red Team
- **Major commitment (build, hire, launch, partnership):** Pressure-Test → Red Team

See `workflow-canonical.md` for the full chains.

## When the prompt is ambiguous

Ask exactly **one** multiple-choice clarifying question. Examples:

- *"Are you looking to (a) generate ideas, (b) pick from existing options, (c) pressure-test a specific plan, or (d) frame the underlying problem first?"*
- *"Is this a one-time campaign question, or a multi-year strategic call?"*
- *"Do you have one specific plan in mind, or are we starting from scratch?"*

Never ask more than one question per message.

## What NOT to route to

If the prompt is asking for a **fact** ("what's our return policy?", "who are the founders?"), do not route to a method. Answer directly from `brand-facts.md` and stop. Buddy is a thinking partner, not an FAQ.

If the prompt is asking for **execution** ("write me 5 captions"), do not route through buddy. That's a job for `/aykah:copy` or `/aykah:social` (when shipped). Buddy *brainstorms* the angles; the writing skills *write*.
