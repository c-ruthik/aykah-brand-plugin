# Aykah Brand Design Tokens

**Last updated:** 2026-04-30
**Source:** `03_Brand_Identity/Colors/aykah-design-system-v1.html` + locked typography decision (2026-04-21).

All values are FINAL unless flagged.

---

## Color Palette

### Primary

| Token | Hex | Use |
|---|---|---|
| Navy | `#363B57` | Primary brand color. Headings, accents, dark mode backgrounds. |
| Ivory | `#FAF8F4` | Primary background. Replaces pure white everywhere. |
| Gold | `#B8956A` | Accent only. Hairlines, micro-details, hover states. |

### Background ratio rule

**60 / 30 / 10** — Ivory 60%, Navy 30%, Gold 10%. Do not invert.

### WCAG 2.2 AA — verified pairs

- Navy `#363B57` on Ivory `#FAF8F4` — passes AA for body text
- Ivory `#FAF8F4` on Navy `#363B57` — passes AA for body text
- Gold `#B8956A` on Ivory — **fails for body text** (use only for large display or graphic accents, never paragraphs)
- Gold on Navy — fails AA. Decorative use only.

### Retired colors (do NOT use)

- ❌ Moon Mist `#FAFFE6`
- ❌ Mount Sterling `#CFDEE1`

---

## Typography — LOCKED

**Two fonts. No exceptions.** Decided by team vote, April 21, 2026. Both Google Fonts (zero licensing risk, fast CDN, Shopify-friendly).

### Fonts

| Font | Family stack | Weights | Used for |
|---|---|---|---|
| **Libre Baskerville** | `'Libre Baskerville', Georgia, serif` | 400, 700, italic 400 | Headings, product names, prices, testimonials (italic), subsections |
| **Manrope** | `'Manrope', -apple-system, sans-serif` | 200–800 (use 300–600) | Body, descriptions, buttons, eyebrows, navigation, forms, UI |

### Font import (HTML)

```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Do

- **Prices** always in Libre Baskerville — serif numerals feel more premium
- **Eyebrows** (small labels above headings): Manrope 600, UPPERCASE, letter-spacing **3px**
- **Buttons**: Manrope 600, UPPERCASE, letter-spacing **1.5px**
- **Italic 400 Libre Baskerville** for testimonials and the sub-line "*Made of what matters.*"

### Never

- ❌ Libre Baskerville for body text
- ❌ Manrope for product names or prices
- ❌ Add a third font
- ❌ Go below 10px

### Type scale (starting point — adapt to context)

| Level | Font | Size | Weight | Line-height |
|---|---|---|---|---|
| Display (H1) | Libre Baskerville | 48–64px | 400 | 1.1 |
| H2 | Libre Baskerville | 32–40px | 400 | 1.15 |
| H3 | Libre Baskerville | 24–28px | 400 | 1.2 |
| Body | Manrope | 16–18px | 400 | 1.6 |
| Small / UI | Manrope | 13–14px | 500 | 1.5 |
| Eyebrow | Manrope | 11–12px | 600, UPPERCASE, +3px tracking | 1.4 |
| Button | Manrope | 13–14px | 600, UPPERCASE, +1.5px tracking | 1 |

### Retired fonts (do NOT use)

- ❌ Lora (v1 — too casual)
- ❌ Plus Jakarta Sans (v1)
- ❌ Libre Franklin
- ❌ Stix Two Math

---

## Logo

### Components

- **Icon:** keep as-is. Symbolism (return + togetherness + road) is locked.
- **Wordmark:** redesign IN PROGRESS — current wordmark not balanced with the icon. Use existing `Full_logo_final.svg` for now; replace when wordmark v2 ships.

### Lockup rules

- **Icon scale in secondary lockup:** wordmark text should be ~40–45% of icon width.
- **Stroke weight:** new wordmark stroke must match icon stroke thickness.
- **Clearspace:** minimum 1/4 icon height between icon and wordmark in horizontal lockup.
- **Minimum sizes:**
  - Primary logo: 100px wide minimum
  - Submark / icon-only: 24px wide minimum

### File locations (bundled in the plugin)

Relative to this skill: `references/docs/logo/`
- `Full_logo_final.svg` — vector, primary use
- `Full_logo_final.png` — raster
- `Full_logo.ai` — Illustrator source
- `Logo_breakdown_1.png` · `Logo_breakdown_2.png` · `Logo_breakdown_3.png` — proportion guides

### Don't

- Don't recolor the logo outside Navy / Ivory / Gold.
- Don't apply gradients or shadows.
- Don't compress the wordmark or distort proportions.
- Don't place on busy backgrounds without a solid color shape behind it.

---

## Spacing & layout

- **Generous whitespace** — premium brands breathe. Default to more padding than feels comfortable.
- **Grid:** 12-column on web, 8px base spacing unit.
- **Borders:** 1px Gold or 1px Navy at 20% opacity. Avoid heavy borders.
- **Shadows:** very subtle if used at all (e.g., `0 1px 2px rgba(54, 59, 87, 0.04)`). Premium brands rarely lean on drop shadows.

---

## Imagery direction

- **Color cast:** warm, slightly desaturated. Avoid cold blue tones.
- **Lighting:** soft, directional, daylight-style. Not studio-flat, not high-contrast moody.
- **Composition:** room scenes with negative space; product hero shots on Ivory or warm-neutral surfaces.
- **People:** present but not the focus. The home is the hero.

---

## Motion

- See `08_Motion/` for HyperFrames templates.
- Default brand reveal: 5s, fade + scale + Gold hairline + locations subline.
- All motion: deterministic only (no `Math.random` / `Date.now`), 24fps minimum, easing prefers `expo.out` or `power3.out`.
