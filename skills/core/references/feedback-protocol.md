# Aykah Feedback Protocol — required for ALL sub-skills

Every Aykah sub-skill (`/aykah:image`, `/aykah:copy`, `/aykah:social`, `/aykah:buddy`, plus future skills) writes a record of every interaction to a centralized location on the user's Desktop. The plugin maintainer collects these files from teammates and uses them to upgrade the skills.

This file is the contract. Every sub-skill follows it.

---

## Folder structure (centralized, on Desktop)

```
~/Desktop/aykah-feedback/
  README.txt                     # explains the folder to the user
  summary.json                   # lightweight roll-up across all skills
  image-history.json             # /aykah:image — every generation
  image-feedback.json            # /aykah:image — distilled lessons
  copy-history.json              # /aykah:copy — every draft + verdict
  copy-feedback.json             # /aykah:copy — distilled lessons
  social-history.json            # /aykah:social — every caption/script + verdict
  social-feedback.json           # /aykah:social — distilled lessons
  buddy-history.json             # /aykah:buddy — every method run + outcome
  buddy-feedback.json            # /aykah:buddy — distilled lessons
```

Files appear only as the corresponding skills are used. Untouched skills don't create empty files.

---

## Folder creation (one-time, per-machine, per-user)

On the FIRST run of ANY Aykah sub-skill, check whether `~/Desktop/aykah-feedback/` exists.

**If it does not exist:**

1. Ask the user once:

   > Aykah skills log every interaction to `~/Desktop/aykah-feedback/` so the plugin maintainer can collect feedback and improve the skills. The folder doesn't exist yet — create it now? [yes / no / never ask again]

2. On `yes` → create the folder, write the README.txt template (below), proceed with the skill.
3. On `no` → skip logging for this session. Ask again next session.
4. On `never ask again` → write `~/.aykah/no-feedback-logging` flag file. Don't ask again on this machine. All sub-skills skip logging.

**If it exists:** proceed silently. No re-confirmation needed.

---

## README.txt template (written into the folder on creation)

```
Aykah Feedback Folder
=====================

This folder is created and maintained by the Aykah Claude Code plugin
(https://github.com/c-ruthik/aykah-brand-plugin).

What's in here?
  - history files: every interaction with an Aykah skill (full record)
  - feedback files: distilled lessons over time (approved patterns,
    disliked patterns, common refinement requests)
  - summary.json: lightweight roll-up across all skills

Why does it exist?
  The plugin maintainer (the person running this Aykah project) uses
  these files to upgrade the skills over time. When you produce
  feedback during a skill session ("approve", "refine", "discard with
  reason"), it lands here.

What gets logged?
  - Timestamp, your $USER on this machine
  - Skill name (image / copy / social / buddy)
  - Inputs you provided (mode, product, vibe, channel, section, etc.)
  - The agent's output summary
  - Your verdict (approved / refined / discarded) and reason

What does NOT get logged?
  - Your email, full file paths to private files, API keys
  - Soul ID UUIDs from your Higgsfield account (those are private)
  - Customer data, internal financials, or anything not directly
    relevant to a skill interaction

How do I share these with the maintainer?
  Zip this folder and send it. Or share specific files individually.

How do I disable logging?
  Run any Aykah skill and answer "never ask again" when prompted, OR
  manually create an empty file at ~/.aykah/no-feedback-logging.
  All sub-skills will skip logging on this machine.

How do I redact something?
  Open the relevant .json file in any text editor and delete or edit
  the entry. The skills will not re-create deleted history.
```

---

## Universal event schema

Every entry in any history file follows this shape:

```json
{
  "timestamp": "2026-04-30T14:30:00Z",
  "user": "ruthik",
  "machine": "<short hostname, no FQDN>",
  "skill": "image",
  "session_id": "<short uuid or timestamp-based id>",
  "event_type": "interaction",
  "inputs": {
    /* skill-specific — what the user asked for */
  },
  "output": {
    /* skill-specific — what the skill produced (summary, not full payload) */
  },
  "verdict": "approved" | "approved_as_reference" | "refined" | "discarded" | "draft",
  "reason_if_refined_or_discarded": "<one short sentence>",
  "metadata": {
    /* skill-specific extras */
  }
}
```

Append the entry to `<skill>-history.json` (an array). Never overwrite, never delete.

---

## Per-skill input/output payload

Each sub-skill defines what goes in `inputs` and `output`. Keep it summary-level — no giant prompts inline.

### image
```json
"inputs": {
  "mode": "lifestyle",
  "product_handle": "aires-dining-chair",
  "vibe": "calm morning",
  "room": "kitchen",
  "people": 1,
  "model": "nano_banana_2",
  "aspect_ratio": "4:5",
  "quality": "1080p",
  "reference_image": "catalog | url | none"
},
"output": {
  "prompt_summary": "<first 200 chars of assembled prompt>",
  "output_path": "<folder + filename>",
  "generation_seconds": 28
}
```

### copy
```json
"inputs": {
  "section": "policy-returns",
  "free_text_brief": "<first 200 chars of user's request>"
},
"output": {
  "draft_word_count": 240,
  "review_passes_passed": "3/3"
}
```

### social
```json
"inputs": {
  "channel": "instagram",
  "product_handle": "aires-dining-chair",
  "pillar": "Materials"
},
"output": {
  "caption_word_count": 32,
  "personas_passed": "3/3",
  "voice_gate": "APPROVED"
}
```

### buddy
```json
"inputs": {
  "user_question_summary": "<first 200 chars>",
  "method_routed": "Method 5 — Pressure-Test"
},
"output": {
  "verdict": "accept",
  "memorable_closing_line": "<the one line>"
}
```

---

## Distilled feedback file format

`<skill>-feedback.json` is rebuilt from the history file every session. It distills patterns that help the maintainer understand what's working and what isn't:

```json
{
  "last_rebuilt_at": "2026-04-30T14:30:00Z",
  "totals": {
    "interactions": 47,
    "approved": 31,
    "approved_as_reference": 9,
    "refined": 5,
    "discarded": 2
  },
  "approved_patterns": [
    "calm morning + north window + 50mm",
    "boucle + warm wax-oiled oak",
    "ivory-dominant 60/30/10 ratio"
  ],
  "disliked_patterns": [
    { "pattern": "overhead lighting", "occurrences": 3 },
    { "pattern": "magazine-perfect throw", "occurrences": 2 },
    { "pattern": "espresso wood stain", "occurrences": 1 }
  ],
  "refinement_themes": [
    { "theme": "linen too saturated", "occurrences": 2 },
    { "theme": "person too posed", "occurrences": 1 }
  ]
}
```

The skill rebuilds this file each session by scanning the history. Fast, no external service needed.

---

## summary.json — the cross-skill roll-up

Lightweight, append-only:

```json
[
  {
    "timestamp": "2026-04-30T14:30:00Z",
    "user": "ruthik",
    "skill": "image",
    "verdict": "approved_as_reference",
    "topic": "aires-dining-chair lifestyle"
  },
  {
    "timestamp": "2026-04-30T14:35:00Z",
    "user": "ruthik",
    "skill": "copy",
    "verdict": "approved",
    "topic": "returns-policy"
  }
]
```

This file lets the maintainer get a quick overview without opening per-skill files.

---

## Privacy rules

Never write to any of these files:

- Email addresses (use `$USER` only — first part of email is fine if that's the OS username)
- Full home directory paths (use `~` prefix in any path field)
- API keys, OAuth tokens, Soul ID UUIDs, Higgsfield account identifiers
- Customer data, internal financials, anything not directly relevant
- Full prompts longer than 200 characters in inline fields (truncate with `...`)

When in doubt: log less, not more.

---

## When the user opts out

If `~/.aykah/no-feedback-logging` exists (any content, including empty), all sub-skills skip every logging step. No history written, no feedback updated, no summary appended. The skill works normally otherwise.

---

## How sub-skills implement this protocol

Each sub-skill SKILL.md includes a section near the end:

```markdown
## Feedback Logging (required)

After every interaction (draft delivered, generation finished, verdict
received), append a history entry to `~/Desktop/aykah-feedback/<skill>-history.json`
and rebuild `<skill>-feedback.json` per the parent protocol at
`../core/references/feedback-protocol.md`. Create the folder with one-time
user confirmation if it doesn't exist. Skip if `~/.aykah/no-feedback-logging`
exists.
```

That single paragraph delegates everything to this file. No duplication across sub-skills.
