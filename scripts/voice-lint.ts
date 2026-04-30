#!/usr/bin/env bun
/**
 * Aykah voice-lint — flags banned words from the Voice & Language Guide v2
 * (April 2026) and suggests on-brand replacements.
 *
 * Source of truth: skills/home/references/docs/voice-and-language-guide-v2.pdf
 *
 * Usage:
 *   bun scripts/voice-lint.ts <file>
 *
 * Exit codes:
 *   0  no issues
 *   1  one or more errors
 *   2  bad invocation (missing file, file not readable)
 */

interface Rule {
  pattern: RegExp;
  replacement: string;
  severity: "error" | "warn";
}

// Order matters: longer/more-specific patterns first so they "claim" the
// region before bare-word rules (overlap detection skips later matches).
const RULES: Rule[] = [
  // ─── Hard bans: shipping/returns/policy claims ──────────────────────────
  { pattern: /\bfree shipping\b/gi, replacement: "complimentary delivery", severity: "error" },
  { pattern: /\bfree returns?\b/gi, replacement: "(remove — returns are not free)", severity: "error" },
  { pattern: /\b100[\s-]?night trial\b/gi, replacement: "(remove — not an Aykah policy)", severity: "error" },
  { pattern: /\brisk[\s-]free\b/gi, replacement: "(remove — sales-y, not on-brand)", severity: "error" },
  { pattern: /\bdesigned in canada\b/gi, replacement: "Canadian-owned, internationally sourced", severity: "error" },
  { pattern: /\bmade in canada\b/gi, replacement: "(remove — not true)", severity: "error" },

  // ─── Hard bans: pricing & discount language ─────────────────────────────
  { pattern: /\bbest price guaranteed\b/gi, replacement: "(remove — discount-store framing)", severity: "error" },
  { pattern: /\bstarting from \$/gi, replacement: "(state the price plainly)", severity: "error" },
  { pattern: /\bsave \$\d/gi, replacement: "(remove — discount framing)", severity: "error" },
  { pattern: /\bsave \d+%\s*off\b/gi, replacement: "(remove — discount framing)", severity: "error" },
  { pattern: /\bas low as\b/gi, replacement: "(remove — discount framing)", severity: "error" },
  { pattern: /\bbargain\b/gi, replacement: "(never use)", severity: "error" },
  { pattern: /\bdiscount\b/gi, replacement: "(reframe as event / curation / edit)", severity: "error" },
  { pattern: /\bdeal\b/gi, replacement: "(remove — discount framing)", severity: "error" },

  // ─── Hard bans: urgency & sales pressure ────────────────────────────────
  { pattern: /\bbuy now\b/gi, replacement: "Explore / Discover the collection", severity: "error" },
  { pattern: /\bdon'?t miss out\b/gi, replacement: "(remove — manufactured urgency)", severity: "error" },
  { pattern: /\bact fast\b/gi, replacement: "(remove — manufactured urgency)", severity: "error" },
  { pattern: /\bgrab yours\b/gi, replacement: "(remove — manufactured urgency)", severity: "error" },
  { pattern: /\bhurry\b/gi, replacement: "(remove — manufactured urgency)", severity: "error" },

  // ─── Hard bans: cliché & overclaim adjectives ───────────────────────────
  { pattern: /\bluxury experience\b/gi, replacement: "Finely made / Well-designed", severity: "error" },
  { pattern: /\belevated living\b/gi, replacement: "(remove — cliché)", severity: "error" },
  { pattern: /\btimeless elegance\b/gi, replacement: "(remove — cliché)", severity: "error" },
  { pattern: /\bdesigner[-\s]?quality\b/gi, replacement: "(remove — vague)", severity: "error" },
  { pattern: /\bhigh[-\s]?quality materials?\b/gi, replacement: "Name the actual material (e.g., kiln-dried oak, full-grain leather)", severity: "error" },
  { pattern: /\bgame[\s-]?changer\b/gi, replacement: "(never use)", severity: "error" },
  { pattern: /\bunbeatable\b/gi, replacement: "(never use)", severity: "error" },
  { pattern: /\bwhy pay more\??/gi, replacement: "(remove — confrontational)", severity: "error" },
  { pattern: /\btreat yourself\b/gi, replacement: "(remove — sales-y)", severity: "error" },
  { pattern: /\byou deserve this\b/gi, replacement: "(remove — sales-y)", severity: "error" },
  { pattern: /\bdupe(s| of)?\b/gi, replacement: "(never use — implies copying)", severity: "error" },

  // ─── Hard bans: pricing-tier language ───────────────────────────────────
  { pattern: /\baffordable\b/gi, replacement: "Within reach / Beautifully made", severity: "error" },
  { pattern: /\bbudget\b/gi, replacement: "(remove entirely)", severity: "error" },
  { pattern: /\bcheap\b/gi, replacement: "(never use)", severity: "error" },
  // "premium" — banned brand-wide until Fall 2026 tier launches
  { pattern: /\bpremium\b/gi, replacement: "Quietly better / Finely made (Premium reserved for Fall 2026 tier only)", severity: "error" },

  // ─── Hard bans: "free" as gift framing — covered by complimentary ───────
  { pattern: /\bfree\b/gi, replacement: "complimentary", severity: "error" },

  // ─── Warnings: discouraged but not banned ───────────────────────────────
  { pattern: /\bvalue\b/gi, replacement: "quality / craft / consideration", severity: "warn" },
  { pattern: /\bbest[-\s]?seller\b/gi, replacement: "Signature piece / Most coveted", severity: "warn" },
  { pattern: /\bcomfortable\b/gi, replacement: "Describe the sensation (e.g., 'sink-in support')", severity: "warn" },
  { pattern: /\bdurable\b/gi, replacement: "Engineered for longevity", severity: "warn" },
  { pattern: /\bcustomer service\b/gi, replacement: "Client care", severity: "warn" },
  { pattern: /\bno assembly required\b/gi, replacement: "Arrives fully assembled", severity: "warn" },

  // ─── Style warnings ─────────────────────────────────────────────────────
  { pattern: /!{1,}/g, replacement: "(prefer a period — exclamations are off-brand)", severity: "warn" },
  // Prices ending in .99 (e.g., $899.99) — premium uses round numbers.
  { pattern: /\$\d+(?:,\d{3})*\.99\b/g, replacement: "Use round numbers (e.g., $900 not $899.99)", severity: "warn" },
];

function lineFor(text: string, index: number): number {
  return text.slice(0, index).split("\n").length;
}

async function main() {
  const file = Bun.argv[2];
  if (!file) {
    console.error("Usage: bun scripts/voice-lint.ts <file>");
    process.exit(2);
  }

  const f = Bun.file(file);
  if (!(await f.exists())) {
    console.error(`File not found: ${file}`);
    process.exit(2);
  }

  const text = await f.text();
  let errors = 0;
  let warnings = 0;
  const findings: Array<{ line: number; tag: string; match: string; suggestion: string }> = [];
  const claimed: Array<[number, number]> = [];

  const overlaps = (start: number, end: number) =>
    claimed.some(([s, e]) => start < e && end > s);

  for (const rule of RULES) {
    const matches = [...text.matchAll(rule.pattern)];
    for (const m of matches) {
      const idx = m.index ?? 0;
      const end = idx + m[0].length;
      if (overlaps(idx, end)) continue;
      claimed.push([idx, end]);
      findings.push({
        line: lineFor(text, idx),
        tag: rule.severity === "error" ? "ERROR" : "warn ",
        match: m[0],
        suggestion: rule.replacement,
      });
      if (rule.severity === "error") errors++;
      else warnings++;
    }
  }

  if (findings.length === 0) {
    console.log(`✓ ${file} — clean`);
    process.exit(0);
  }

  // Stable sort by line, then by error severity first.
  findings.sort((a, b) => a.line - b.line || a.tag.localeCompare(b.tag));
  for (const x of findings) {
    console.log(`${x.tag}  ${file}:${x.line}  "${x.match}"  →  ${x.suggestion}`);
  }
  console.log(`\n${errors} error(s), ${warnings} warning(s)`);
  process.exit(errors > 0 ? 1 : 0);
}

await main();
