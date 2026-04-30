# CLI Detection — Higgsfield Setup & Capability Discovery

This file documents how the skill detects the Higgsfield CLI on the user's machine, caches what flags it actually exposes, and what to do when it isn't installed.

---

## Why auto-detection?

The Higgsfield CLI README is a marketing landing page, not a reference. It documents:

- Install command
- Auth: `higgsfield auth login` (device-code flow)
- Generate: `higgsfield generate create <MODEL> --prompt "..."`
- Categories: text-to-image, image-to-image, image-to-video, reference-based; 35+ models including Nano Banana, Soul, Veo, Kling, Seedance, Flux

It does NOT document:

- Reference-image flag name (`--reference`? `--ref-image`? `--init-image`?)
- 4K / quality flag and accepted values
- Aspect ratio flag
- Output path / format
- Sync vs async behavior
- Soul ID subcommand syntax
- Marketing Studio subcommand syntax

So instead of hardcoding flags from the README, the skill runs the CLI's own `--help` output, parses the flags, and caches what it finds. This way:

- No assumptions about flag names
- Survives CLI version bumps automatically
- Honest with the user about what's actually available

---

## Detection commands

Run on first use, or when `~/.aykah/cli-capabilities.json` is missing or older than 30 days:

```bash
which higgsfield                                      # PATH check
higgsfield --version                                  # version capture
higgsfield --help                                     # top-level groups
higgsfield generate --help                            # generate group
higgsfield generate create --help                     # generation flags
higgsfield soul --help                                # soul / character training
higgsfield workspace --help                           # workspace info / balance
higgsfield generate create nano_banana_2 --help       # model-specific (nano_banana_2 is in README)
```

Also try (without expecting success):

```bash
higgsfield generate create soul_2 --help              # if Soul model exists
higgsfield generate create flux --help                # if Flux exists
```

Capture stdout from each. If a command exits non-zero, log the error and skip.

---

## Capability cache schema

Write to `~/.aykah/cli-capabilities.json`:

```json
{
  "detected_at": "2026-04-30T14:30:00Z",
  "cli_version": "<from --version>",
  "cli_path": "/usr/local/bin/higgsfield",
  "top_level_commands": ["auth", "generate", "soul", "workspace", "marketing-studio", "..."],
  "generate_create": {
    "models_documented": ["nano_banana_2", "soul_2", "..."],
    "flags": {
      "--prompt": { "type": "string", "required": true },
      "--reference": { "type": "string", "description": "..." },
      "--quality": { "type": "enum", "values": ["720p", "1080p", "4k"] },
      "--aspect-ratio": { "type": "enum", "values": ["..."] },
      "--seed": { "type": "int" },
      "--output": { "type": "string", "description": "save path" }
    },
    "supports_4k": true,
    "supports_reference_image": true,
    "supports_negative_prompt": false
  },
  "soul": {
    "subcommands": ["create", "list", "use"],
    "create_flags": { "...": "..." }
  },
  "workspace": {
    "subcommands": ["balance", "history", "switch"]
  }
}
```

**The skill never invents capabilities not present in this cache.** If `supports_4k` is false, the skill tells the user honestly:

> "4K is not exposed by the installed CLI version. Highest available: 1080p."

---

## When CLI is not installed

The skill detects this by `which higgsfield` returning empty. Show this exact message and STOP — do not generate, do not fall back silently:

```
Higgsfield CLI is not installed. To use /aykah:image you need to install it.

Install (Mac/Linux):
  curl -fsSL https://raw.githubusercontent.com/higgsfield-ai/cli/main/install.sh | sh

Or via Homebrew:
  brew install higgsfield-ai/tap/higgsfield

Then authenticate:
  higgsfield auth login
  (device-code flow — opens a browser to higgsfield.ai)

Then re-run /aykah:image.

Need an account first? Sign up at https://higgsfield.ai
```

Do NOT auto-install. Do NOT fall back to a different image MCP without explicit user direction. Some teammates may not have authority to install CLIs.

---

## When CLI is installed but not authenticated

If `higgsfield generate create --help` works but `higgsfield workspace balance` fails with auth error, surface:

```
Higgsfield CLI is installed but not authenticated. Run:
  higgsfield auth login

Then re-run /aykah:image.
```

---

## Cache refresh

Auto-refresh cache when:

- Cache file is missing (first run)
- Cache `detected_at` is older than 30 days (CLI may have updated)
- User explicitly asks ("re-detect the CLI", "refresh capabilities")
- A generation fails with a "flag not recognized" error (the CLI may have removed/renamed a flag)

Manual refresh: delete `~/.aykah/cli-capabilities.json` and run any `/aykah:image` command. The skill will re-detect on next invocation.

---

## What to do when --help output is unparseable

If `higgsfield generate create --help` returns text the skill can't parse cleanly:

1. Save the raw output to `~/.aykah/cli-capabilities-raw.txt`
2. Cache only the confirmed `--prompt` flag (always present)
3. Tell the user: *"I couldn't fully parse the CLI help output. Saved the raw output to ~/.aykah/cli-capabilities-raw.txt. I'll proceed with the basic --prompt flag only. To unlock more options, share the raw file with me and I'll update the parser."*

This keeps the skill working even on edge-case CLI versions.
