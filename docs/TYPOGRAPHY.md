# Typography System — 樹木管理ナビ

> Design token reference for Shippori Mincho, DM Mono, and Noto Serif JP.
> Follows ElevenLabs-style Do/Don't conventions. Single source of truth: `assets/css/tokens.css`.

---

## Typefaces

| Role | Family | Weights | Loaded via |
|---|---|---|---|
| Display / Heading | Shippori Mincho | 400, 600, 800 | Google Fonts |
| Label / Badge / Mono | DM Mono | 400, 500 | Google Fonts |
| Body / UI text | Noto Serif JP | 400, 500 | Google Fonts |

---

## Shippori Mincho

**Usage**: h1 page titles, h2/h3 section headings, nav brand, footer brand.

### Size scale (h1 per page)

| Page | clamp value | Context |
|---|---|---|
| survey.html | `clamp(18px, 3.5vw, 26px)` | Compact tool header |
| traq.html, ctla.html | `clamp(20px, 4vw, 30px)` | Tool headers |
| checklist.html, pruning.html | `clamp(22px, 4.5vw, 34px)` | Tool landing |
| contact.html, privacy.html | `clamp(24px, 4vw, 32px)` | Utility pages |
| diagnosis.html | `clamp(24px, 5vw, 38px)` | Tool landing |
| index.html hero | `clamp(28px, 6vw, 52px)` | Top-level hero |
| embed.html, blog layout | `clamp(30px, 6vw, 54px)` | Wide-canvas hero |

### Weights

| Weight | Use |
|---|---|
| 800 | h1, nav brand, `.hero h1` |
| 700 | h2 section titles |
| 600 | h3 sub-headings, small h2 (≤16px) |
| 400 | Body-size Shippori (avoid — use Noto Serif JP instead) |

### Letter spacing (tokens)

```css
--tracking-display: -0.02em;  /* h1 ≥28px */
--tracking-heading: -0.01em;  /* h2 20–28px */
```

**Always apply** `letter-spacing: var(--tracking-display)` to h1. Tight tracking at large sizes reduces visual gaps between Japanese kana and kanji.

---

## DM Mono

**Usage**: labels, badges, timestamps, eyebrows, version strings, monospaced numeric values.

### Size scale

| Size | Letter-spacing | Use |
|---|---|---|
| 9px | 0.15–0.25em | Micro badges, status dots |
| 10px | 0.15–0.20em | Page eyebrows (`page-label`), footer copyright |
| 11px | 0.10–0.15em | Timestamps, secondary labels, form hints |
| 12px | 0.08–0.12em | Inline tags, pill labels |

### Rules

- **Always uppercase** for single-word labels and eyebrows (`text-transform: uppercase`).
- **Never use DM Mono for body text** — minimum 9px, never for multi-sentence content.
- Weight 500 for emphasis labels; weight 400 for timestamps and secondary info.
- Pair with `letter-spacing ≥ 0.1em` — tight monospace at label sizes reads poorly.

---

## Noto Serif JP

**Usage**: all body copy, list items, form labels, long-form descriptions, policy pages.

### Size scale

| Size | Line-height | Use |
|---|---|---|
| 12px | 1.8–2.0 | Dense list items, table cells |
| 13px | 1.85–1.9 | Policy page body, secondary descriptions |
| 14px | 1.8 | Default list items, card body |
| 15px | 1.75 | Mid-weight descriptions |
| 16px | 1.7–1.9 | Lead paragraphs (`.lead`), hero sub-copy |

### Rules

- Line-height must be ≥ 1.7 — Japanese glyphs need vertical breathing room.
- Use weight 400 for body; weight 500 only for form labels or inline emphasis.
- Do not set `letter-spacing` on Noto Serif JP body — glyph spacing is already optimised.

---

## Do / Don't

### Headings

| ✅ Do | ❌ Don't |
|---|---|
| `font-family: 'Shippori Mincho', serif` on all h1–h3 | Mix Noto Serif JP into headings |
| `letter-spacing: var(--tracking-display)` on h1 ≥28px | Use `letter-spacing: 0` on large h1 |
| `font-weight: 800` on h1, `700` on h2 | Use weight 400/600 on h1 |
| clamp() for fluid h1 sizing | Fixed px on h1 (breaks at viewport extremes) |

### Labels & badges

| ✅ Do | ❌ Don't |
|---|---|
| DM Mono + `text-transform: uppercase` + `letter-spacing ≥ 0.1em` | Lowercase DM Mono labels without letter-spacing |
| 10–11px for eyebrows and timestamps | DM Mono below 9px |
| Weight 500 for primary badges | Weight 800 in DM Mono (not loaded) |

### Body text

| ✅ Do | ❌ Don't |
|---|---|
| Noto Serif JP for all multi-sentence content | Use Shippori Mincho for body paragraphs |
| `line-height: 1.8–2.0` on Japanese body | `line-height < 1.7` on Japanese body |
| 13–16px range for body | Body text below 12px |

### Cross-typeface mixing

| ✅ Do | ❌ Don't |
|---|---|
| Shippori heading → Noto Serif body → DM Mono label (3-level hierarchy) | More than 3 typefaces on a single page |
| DM Mono only for data/label roles | DM Mono for headings or body |
| Inherit `font-family` from body on form inputs | Explicitly set system-ui on form inputs (breaks brand voice) |

---

## CSS Quick Reference

```css
/* Headings */
h1 { font-family: 'Shippori Mincho', serif; font-weight: 800; letter-spacing: var(--tracking-display); }
h2 { font-family: 'Shippori Mincho', serif; font-weight: 700; letter-spacing: var(--tracking-heading); }
h3 { font-family: 'Shippori Mincho', serif; font-weight: 600; }

/* Labels */
.label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; }

/* Body */
body { font-family: 'Noto Serif JP', serif; font-size: 14px; line-height: 1.8; }
```

---

*Last updated: 2026-05-05 — T-UX-505*
