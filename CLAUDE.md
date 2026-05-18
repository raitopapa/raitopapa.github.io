# CLAUDE.md — 樹木管理ナビ (Tree Management Navi)

AI assistant reference for the `raitopapa/raitopapa.github.io` repository.
Read `docs/SPEC.md`, `docs/STATUS.md`, and `docs/HANDOFF.md` before starting any task.

---

## Project Overview

**樹木管理ナビ** is a free, static Japanese-language web tool suite for tree management, supervised by a certified arborist. It runs on GitHub Pages with zero server-side code. Tools cover pest/disease diagnosis, pruning schedules, health checklists, field surveys, risk assessment (ISA TRAQ), and tree appraisal (CTLA).

- **Live site**: https://raitopapa.github.io
- **Target users**: home garden owners, landscapers, certified arborists, municipalities
- **Monetisation path**: AdSense → individual subscription → B2B SaaS (Phase 3, currently frozen)

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Hosting | GitHub Pages | Zero cost; no server |
| Frontend | HTML + CSS + Vanilla JS | No frameworks; no build step |
| Maps | Leaflet.js + OpenStreetMap / 国土地理院 / Esri | `survey.html` only |
| Local storage | IndexedDB via `assets/js/db.js` | All user data stays in browser |
| PWA | `sw.js` + `manifest.json` | Offline-ready |
| Blog | Jekyll (`_posts/`, `_layouts/`, `_includes/`) | GitHub Pages builds automatically |
| i18n | `assets/i18n/ja.json` + `assets/i18n/en.json` | Loaded by `assets/js/i18n.js` |
| Design tokens | `assets/css/tokens.css` | Single source of truth for all CSS variables |
| Analytics | GA4 via `assets/js/analytics.js` | Loaded on every page |
| Forms | Web3Forms (free, unlimited) | `contact.html` |
| Email | MailerLite (free ≤1,000 subscribers) | Newsletter sign-up |

**Never introduce**: React/Vue/Svelte, webpack/vite/rollup, Node.js server, or any paid SaaS that would push monthly costs above ¥500.

---

## Repository Structure

```
raitopapa.github.io/
├── index.html                  # Home / tool directory
├── diagnosis.html              # Pest & disease risk tool
├── pruning.html                # Pruning calendar (40+ species)
├── checklist.html              # 32-item health checklist (A–D rank)
├── traq.html                   # Risk assessment (ISA TRAQ / ANSI A300)
├── ctla.html                   # Tree appraisal (CTLA 10th ed.)
├── survey.html                 # Field survey (GPS, map, photos, CSV/GeoJSON)
├── about.html / contact.html / privacy.html
├── embed.html                  # Iframe-embeddable pruning widget
├── embed/pruning.html          # Standalone embed target
├── glossary.html               # Redirect to /glossary/
├── glossary/index.html         # 200-term tree glossary (internal link hub)
├── blog/index.html             # Blog listing page
├── _posts/                     # 25 Jekyll markdown articles (2026-05-*)
├── _layouts/                   # post.html, blog.html Jekyll layouts
├── _includes/                  # blog-header.html, related-tools.html
├── _data/                      # glossary.csv, glossary_sources.yml
├── _config.yml                 # Jekyll config (permalink, defaults, plugins)
├── assets/
│   ├── css/
│   │   ├── tokens.css          # ALL design tokens — edit here, not in HTML
│   │   └── layout.css          # Shared layout styles
│   ├── js/
│   │   ├── analytics.js        # GA4 tag (loaded on all pages)
│   │   ├── i18n.js             # Language switching loader
│   │   ├── layout.js           # Injects navbar + langbar partials
│   │   ├── internal-links.js   # Related-content card injection
│   │   ├── newsletter.js       # MailerLite sign-up handler
│   │   └── affiliate.js        # Amazon/Rakuten affiliate links
│   ├── i18n/
│   │   ├── ja.json             # All Japanese strings (namespaced by page)
│   │   └── en.json             # All English strings
│   ├── partials/
│   │   ├── navbar.html         # Site navigation (fetched by layout.js)
│   │   └── langbar.html        # Language switcher bar
│   ├── data/                   # Static JSON data files for tools
│   └── images/                 # Photo assets (README.md + SOURCES.md inside)
├── icons/                      # PWA icons (192px, 512px)
├── manifest.json               # PWA manifest
├── sw.js                       # Service worker (cache + offline)
├── sitemap.xml                 # Static sitemap
├── robots.txt / ads.txt
└── docs/
    ├── SPEC.md                 # Master spec & task list (source of truth)
    ├── STATUS.md               # Task progress board (claim tasks here)
    ├── HANDOFF.md              # Collaboration protocol (Claude × Codex)
    ├── UX_PLAN.md              # ElevenLabs-referenced UX improvement plan
    ├── TYPOGRAPHY.md           # Font system Do/Don't rules
    ├── CONTENT_PLAN.md         # Blog article schedule
    ├── IMAGE_ASSETS.md         # Photo asset governance
    ├── NEWSLETTER_PLAN.md      # Email campaign plan
    └── CODEX_NOTES.md          # OpenAI Codex session notes
```

---

## Development Workflow

### Before Starting Any Task

```bash
git fetch origin && git checkout main && git pull
# Read docs/STATUS.md — find a task with status "todo" and resolved dependencies
# Read SPEC.md §6 for full task details and acceptance criteria
```

### Claiming a Task

Edit `docs/STATUS.md` and change the task row to `in-progress(claude-sonnet)`, then push **that single commit** before writing any implementation code:

```
chore(status): claim T-P1-101
```

If the push fails due to conflict, someone else claimed it — pick a different task.

### Branch Naming

```
task/{TASK_ID}-{kebab-case-summary}

Examples:
  task/T-P0-001-fix-hero-css
  task/T-P1-102-i18n-json-extraction
  task/ux-502-tracking-tokens
```

### Local Dev Server

```bash
python -m http.server 8080
# Visit http://localhost:8080
# Required for: Service Worker, IndexedDB, GPS, camera APIs
```

Jekyll blog posts are only rendered by GitHub Pages (or `bundle exec jekyll serve`). For tool HTML pages, the Python server is sufficient.

### Commit Message Format

```
feat: 共通レイアウトを partials/ に抽出
fix: index.html のヒーロー CSS 構文エラーを修正
docs: SPEC.md に T-P3-307 を追加
refactor: i18n を JSON ファイルに分離
style: tokens.css に tracking 変数を追加
chore(status): claim T-P1-101

# Body (optional): explain WHY, not WHAT
# Always append task reference: Refs: T-P1-101
```

### Pull Request Format

```markdown
## タスク
- [T-P1-101] Extract common layout partials

## 変更内容
- (bullet list of files changed)

## 受け入れ基準
- [ ] (copy from SPEC.md for this task)
- [ ] Lighthouse regression-free (main 4 metrics)
- [ ] ja/en both tested

## 動作確認
`python -m http.server 8080` で全6ページ + 言語切替

## Author
claude-sonnet (via raitopapa)
```

---

## Code Conventions

### Hard Rules (never violate)

- **Vanilla JS only** — no React, Vue, Svelte, or any frontend framework
- **No build step** — no webpack/vite/rollup; files are served as-is
- **CSS variables from `tokens.css`** — do not add page-local `:root` variables; extend `tokens.css` instead
- **i18n strings from JSON** — no hardcoded Japanese/English UI text in HTML; use `assets/i18n/{ja,en}.json` with page namespaces (`diagnosis.*`, `pruning.*`, etc.)
- **IndexedDB via `assets/js/db.js`** — never call `indexedDB.open()` directly in page code
- **External CDN libraries must have SRI** — `integrity=` + `crossorigin=anonymous` + pinned version on every `<script>` and `<link>`
- **No API keys in source** — affiliate IDs use the pattern in `affiliate.js`; never commit secrets
- **No direct push to `main`** — always use a feature branch + PR

### CSS / Design Tokens

All tokens live in `assets/css/tokens.css`. Key token groups:

| Group | Tokens | Purpose |
|---|---|---|
| Colors | `--bark`, `--forest`, `--moss`, `--amber`, `--cream`, `--pale`, `--mist` | Brand palette |
| Surface | `--surface-page`, `--surface-raised`, `--surface-card` | Semantic surface levels |
| Shadow | `--shadow-sm`, `--shadow-card`, `--shadow-card-hover` | Elevation system |
| Typography | `--tracking-display` (`-0.02em`), `--tracking-heading` (`-0.01em`), `--tracking-label` | Letter spacing |
| Spacing | `--gap-section` (64px), `--gap-section-lg` (80px), `--gap-element` (20px) | Section gaps |

**Card elevation rule**: use `box-shadow: var(--shadow-card)` only — never combine `border` + `box-shadow` on the same card.

### Typography (see `docs/TYPOGRAPHY.md` for full rules)

| Role | Font | Weight |
|---|---|---|
| h1 (display) | Shippori Mincho | 800 + `var(--tracking-display)` |
| h2 (section) | Shippori Mincho | 700 + `var(--tracking-heading)` |
| h3 | Shippori Mincho | 600 |
| Body / UI text | Noto Serif JP | 400, line-height ≥ 1.7 |
| Labels / badges / mono | DM Mono | 500, uppercase, `letter-spacing ≥ 0.1em` |

### Navbar & Langbar

Both are injected via `assets/js/layout.js` into placeholder elements:
```html
<div id="langbar-ph"></div>
<div id="navbar-ph"></div>
```
Never hardcode nav HTML inside tool pages.

### i18n Pattern

```javascript
// assets/i18n/ja.json
{ "diagnosis": { "title": "病害虫リスク診断", ... } }

// assets/js/i18n.js applies data-i18n="diagnosis.title" attributes automatically
```

### Jekyll Blog Posts

- File: `_posts/YYYY-MM-DD-slug.md`
- Front matter: `layout: post`, `title:`, `tags:`, `tools:` (related tool slugs)
- Permalink format: `/blog/YYYY/MM/DD/slug/`
- Each article must link to ≥2 related tools

---

## Current Phase & Task Status

As of 2026-05-18:

| Phase | Status |
|---|---|
| Phase 0 (emergency fixes) | **Complete** |
| Phase 1 (ads / partials / SEO) | **Complete** |
| Phase 2 (blog 25 articles / glossary / email) | **Complete** |
| UX polish (T-UX-S1–S4, T-UX-501–505) | Mostly done; T-UX-503 in review |
| Phase 3 (Supabase / Stripe / SaaS) | **FROZEN** — awaiting demand gate |
| Phase 4 | Future |

### Phase 3 is Frozen

Do **not** implement anything from Phase 3 (Supabase Auth, Stripe payments, IndexedDB↔cloud sync, photo AI, org management) until all 7 Gate KPIs (G1–G7 in `docs/SPEC.md §4.5`) are met and raitopapa gives explicit approval. Claiming a `T-P3-*` task is **prohibited**.

### Open Tasks (as of last STATUS.md update)

- **T-UX-503** (`review`) — surface hierarchy tokens, branch `task/ux-503-surface-tokens-v2`
- **T-DOMAIN-001** — custom domain acquisition (human task)
- **T-MENTOR-001** — supervisor profile page (human task)

Pick a `todo` task from `docs/STATUS.md` if you need work to do.

---

## Cost Constraint: ¥500/month Hard Cap

Every technical decision must keep total monthly operating costs ≤ ¥500. Currently the only cost is the custom domain (~¥100–170/month). Any service that would add recurring cost requires explicit raitopapa approval and Phase 3 gate passage.

Allowed free tiers:
- GitHub Pages (hosting)
- Google Analytics 4 / Search Console
- Google AdSense
- Web3Forms (contact form, unlimited)
- MailerLite (email, ≤1,000 subscribers)
- Supabase free tier — **only after Phase 3 gate**
- Stripe — sell-side fees only, no fixed cost — **only after Phase 3 gate**

---

## Quality Gates (every PR)

- Lighthouse: no regression in Performance, Accessibility, Best Practices, SEO vs. `main`
- Both `ja` and `en` languages must render correctly
- No broken internal links
- CLS ≤ 0.05 (AdSense CLS policy)
- No hardcoded strings — all UI text through i18n JSON
- No new page-local CSS variables (use or extend `tokens.css`)

---

## Key Business Rules

- **Brand**: "樹木管理ナビ" (Tree Management Navi). The arborist supervisor is the authority; the site is the product.
- **E-E-A-T**: Never modify supervised copy. Never claim "diagnosis", "guarantee", or "certification" — use "初期確認" (initial check) and "参考情報" (reference information).
- **TRAQ/CTLA framing**: These tools are "参考・補助" (reference/supplementary), not authoritative assessments.
- **Privacy**: All user data stays in the browser's IndexedDB. Zero server uploads for tool data. GA4 tracks behaviour only, no PII.
- **AdSense compliance**: `ads.txt` in root. Manual ad placement with fixed-size reservations to prevent CLS. No ad slots on pages that have no meaningful content.

---

## Reference Documents

| Doc | Purpose |
|---|---|
| `docs/SPEC.md` | Master spec, task list, ADRs, monetisation plan, Gate conditions |
| `docs/STATUS.md` | Live task board — claim tasks here |
| `docs/HANDOFF.md` | Claude × Codex collaboration protocol |
| `docs/UX_PLAN.md` | Staged UX improvements with ElevenLabs design reference |
| `docs/TYPOGRAPHY.md` | Font system rules and Do/Don't |
| `docs/CONTENT_PLAN.md` | Blog article schedule and SEO targets |
| `docs/IMAGE_ASSETS.md` | Photo asset sourcing and governance |
| `README.md` | User-facing overview (keep in sync with major feature changes) |
