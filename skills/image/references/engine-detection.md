# Engine Detection — Higgsfield CLI and MCP Setup & Capability Discovery

This file documents how the skill detects the Higgsfield engines (CLI and/or MCP) installed on the user's machine, caches what each one exposes, and what to do when neither is installed.

The skill supports BOTH engines. When both are installed, the user picks once (and can save as default). The default recommendation is **CLI** because it natively supports 4K output and reference-image conditioning — features MCP variants don't always expose.

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

Run on first use, or when `~/.aykah/engine-capabilities.json` is missing or older than 30 days:

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

Write to `~/.aykah/engine-capabilities.json`:

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

## MCP detection

In addition to the CLI, the skill checks whether the Higgsfield MCP server is connected. Detection: scan the available tools list for any tool whose name starts with `mcp__higgsfield`.

If at least one such tool exists (e.g., `mcp__higgsfield__generate_image`, `mcp__higgsfield__create_character`, `mcp__higgsfield__list_characters`):

- Mark `mcp.installed: true` in the cache
- Record the tool names + their parameter schemas under `mcp.tools`
- Probe whether the MCP exposes `4k` quality option and `image_reference_url` parameter — record `mcp.supports_4k` and `mcp.supports_reference_image` accordingly

The official hosted MCP at `https://mcp.higgsfield.ai/mcp` may expose more parameters than the open-source variants (`geopopos/higgsfield_ai_mcp` Python and `higgsfield-mcp` npm). Schema not always public — discover from the actual `mcp__higgsfield__*` tool signatures available at runtime.

## When neither engine is installed

Show this and STOP — do not generate:

```
Neither Higgsfield CLI nor Higgsfield MCP is installed. /aykah:image needs at least one. Install your preferred option:

  Option A — Higgsfield CLI (recommended)
    Supports 4K output, reference-image conditioning, 35+ models.

    Mac/Linux install:
      curl -fsSL https://raw.githubusercontent.com/higgsfield-ai/cli/main/install.sh | sh

    Or via Homebrew:
      brew install higgsfield-ai/tap/higgsfield

    Authenticate:
      higgsfield auth login
      (device-code flow — opens a browser to higgsfield.ai)

  Option B — Higgsfield MCP
    Easier to install (no shell setup), integrates with Claude tool calls.
    4K and reference-image support depend on MCP variant.

    In Claude Code: Settings → Connectors → Add MCP server
    Server URL: https://mcp.higgsfield.ai/mcp
    Auth: OAuth via Higgsfield account (no API key needed)

After installing one (or both), re-run /aykah:image.

Need a Higgsfield account? Sign up at https://higgsfield.ai
```

Do NOT auto-install. Do NOT fall back to a different image tool without explicit user direction. Some teammates may not have authority to install CLIs.

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

Manual refresh: delete `~/.aykah/engine-capabilities.json` and run any `/aykah:image` command. The skill will re-detect on next invocation.

---

## What to do when --help output is unparseable

If `higgsfield generate create --help` returns text the skill can't parse cleanly:

1. Save the raw output to `~/.aykah/cli-capabilities-raw.txt`
2. Cache only the confirmed `--prompt` flag (always present)
3. Tell the user: *"I couldn't fully parse the CLI help output. Saved the raw output to ~/.aykah/cli-capabilities-raw.txt. I'll proceed with the basic --prompt flag only. To unlock more options, share the raw file with me and I'll update the parser."*

This keeps the skill working even on edge-case CLI versions.
