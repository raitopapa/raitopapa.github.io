# UX/UI ブラッシュアップ計画

> 参照デザイン: [ElevenLabs — Refero Styles](https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26)
> 更新: 2026-05-04

---

## 背景

styles.refero.design の ElevenLabs スタイル参照を軸に、樹木ナビのデザインを照合した。
ElevenLabs は「軽量セリフ + モノスペース + 温かみのある白地」という構成が樹木ナビと最も近く、
Do/Don't 規則が明文化されているため、段階的ブラッシュアップの参照として採用する。

---

## 完了済みステージ

| Stage | 内容 | Branch |
|---|---|---|
| Stage 1 | アクセシビリティ（`:focus-visible` リング・タッチターゲット 44px・フォーム focus shadow） | `task/ux-stage1-*` |
| Stage 2 | design tokens v1.1（radius / shadow / transition）・lang-btn / nav-back `:active` | `task/ux-tokens-stage2` |
| Stage 3 | 全ページ（6ファイル）のボタン `:active` プレス状態統一 | `task/ux-stage3-button-states` |
| Stage 4 | モバイルブレークポイント（iOS zoom 防止・rating-btn 44px・CTA 縦積み） | `task/ux-stage4-mobile` |

---

## 参照: 樹木ナビ × ElevenLabs 比較

| 設計軸 | ElevenLabs | 樹木ナビ（現状） | ギャップ |
|---|---|---|---|
| セリフ見出し | Waldenburg 300, `-0.02em` tracking | Shippori Mincho, tracking 未設定 | 見出し tracking トークン不足 |
| モノスペース | Geist Mono 400, 技術注釈専用 | DM Mono, ラベル・バッジ全般 | ほぼ同等 |
| ページ地 | `#fdfcfc` (Eggshell), 温かみのある白 | `#F5F0E8` (--cream), やや黄みがかった温白 | ほぼ同等 |
| カードエレベーション | hairline inset shadow のみ（border 廃止） | `border 1px + box-shadow` の二重表現 | **border を shadow に統合すべき** |
| サーフェス階層 | Level 0 / 1 / 2 を token で明示管理 | `--cream` / `--pale` / `white` を都度ハードコード | **セマンティック token 化すべき** |
| 見出し tracking | `-0.02em`（32px↑）/ `-0.01em`（20-28px） | 未設定（ブラウザデフォルト） | **token 追加すべき** |
| セクション gap | 48–80px を rule として統一 | ページごとにバラバラ（24–56px 混在） | **gap token 化すべき** |
| ボタン radius | pill (9999px) = primary, 0px = input | 2–4px 統一 | スタイル上の差異（変更不要） |
| アクセントカラー用途 | 特定 UI 要素（ドット）のみに限定 | `--amber` / `--rust` が複数用途 | 用途ルール文書化（コード変更不要） |

---

## 残タスク

### T-UX-501 カードエレベーション統一 — **Codex 推奨**

**方針（ElevenLabs 原則より）**
カードの存在感は `border + box-shadow` の二重表現を使わず、hairline shadow 1本で表現する。
これにより「浮き上がり」ではなく「紙に印刷された平面性」が生まれ、コンテンツへの集中度が上がる。

**変更対象**（CSS のみ、JS 変更なし）

| ファイル | 対象セレクタ | 変更内容 |
|---|---|---|
| index.html | `.tool-card` | `border` 削除 → shadow に置換 |
| checklist.html | `.section`, `.sec-score-card` | border → shadow |
| diagnosis.html | `.section`, `.result-card` | border → shadow |
| traq.html | `.traq-header`, `.result-card` | border → shadow |
| ctla.html | `.section`, `.result-card` | border → shadow |
| pruning.html | `.detail-card`, `.field` | border → shadow |
| survey.html | `.tree-card`, `.report-modal` | border → shadow |

**適用する shadow 値（tokens.css の --shadow-sm を拡張）**
```css
/* 現状 */
--shadow-sm: 0 1px 3px rgba(26,47,26,0.08);

/* T-UX-501 で追加するトークン（tokens.css） */
--shadow-card: rgba(26,47,26,0.06) 0px 0px 0px 1px,
               rgba(26,47,26,0.04) 0px 1px 2px;
--shadow-card-hover: rgba(26,47,26,0.10) 0px 0px 0px 1px,
                     rgba(26,47,26,0.06) 0px 4px 12px;
```

**Do/Don't**
- ✅ hover 時は `--shadow-card-hover` に切り替える（現在の `translateY(-4px)` と併用可）
- ❌ `border: 1px solid var(--mist)` と shadow の二重適用禁止
- ❌ カード内要素に `box-shadow: 0 8px+` の大きなエレベーションを与えない

難易度: ★☆☆ / 担当: **Codex** / 依存: なし

---

### T-UX-502 見出しレタースペーシングトークン — **Sonnet 推奨**

**方針（ElevenLabs 原則より）**
大サイズ見出し（32px↑）には `-0.02em`、中サイズ（20-28px）には `-0.01em` の
negative tracking を付ける。組版の引き締まりが生まれ「活字の権威感」が増す。

**変更対象**

```css
/* tokens.css に追加 */
--tracking-display:  -0.02em;  /* h1, 大見出し (32px↑) */
--tracking-heading:  -0.01em;  /* セクション見出し (20-28px) */
--tracking-label:     0.10em;  /* DM Mono ラベル (9-11px) — 既存維持 */
```

適用ファイル: tokens.css + index.html の h1 + 各ページヘッダ h1

難易度: ★☆☆ / 担当: **Sonnet** / 依存: なし

---

### T-UX-503 サーフェス階層トークン — **Sonnet 推奨**

**方針（ElevenLabs 原則より）**
ページ上のサーフェスを 3 階層のセマンティックトークンで管理する。
現在は `--cream` / `--pale` / `white` を都度ハードコードしており、
テーマ変更・ダークモード拡張・forest 系ページのオーバーライドが困難。

**変更内容**

```css
/* tokens.css に追加（既存トークンへのエイリアス） */
--surface-page:   var(--cream);   /* Level 0: ページ背景 */
--surface-raised: var(--pale);    /* Level 1: セクション・ホバー背景 */
--surface-card:   #ffffff;        /* Level 2: カード・フォーム */

/* forest ページ (:root override) では */
--surface-page:   #1A2F1A;
--surface-raised: #2E5E2E;
--surface-card:   rgba(255,255,255,0.08);
```

難易度: ★★☆ / 担当: **Sonnet** / 依存: T-UX-501（先に shadow 移行を済ませると白地置換が楽）

---

### T-UX-504 セクション gap 標準化 — **Codex 推奨**

**方針（ElevenLabs 原則より）**
主要セクション間の vertical gap は `--gap-section` トークン 1 本で統一する。
現状はページごとに `margin-bottom: 24px` ~ `56px` が混在。

**変更内容**

```css
/* tokens.css に追加 */
--gap-section:  64px;   /* ページ内セクション間（tool pages）*/
--gap-section-lg: 80px; /* index.html のメジャーセクション間 */
--gap-element:  20px;   /* セクション内コンポーネント間 */
```

各ページの section/wrap margin を token 参照に置き換え。

難易度: ★☆☆ / 担当: **Codex** / 依存: なし（T-UX-501 と同時並行可）

---

### T-UX-505 タイポグラフィ Do/Don't 文書化 — **Sonnet（ドキュメントのみ）**

樹木ナビのフォントシステムを ElevenLabs 形式で明文化する。
コード変更なし、`docs/TYPOGRAPHY.md` として新規作成。

内容:
- Shippori Mincho の使用ルール（サイズ・ウェイト・用途）
- DM Mono の使用ルール（ラベル・バッジ・コード）
- Noto Serif JP の用途（補助 body text）
- フォントサイズスケール（現在の clamp 値を一覧化）
- Do/Don't 規則（最小サイズ、ウェイト制限など）

難易度: ★☆☆ / 担当: **Sonnet** / 依存: なし

---

## 推奨着手順

```
Codex:   T-UX-501 (カード shadow)  →  T-UX-504 (gap)  — CSS only、並行可
Sonnet:  T-UX-502 (tracking)  →  T-UX-503 (surface)  →  T-UX-505 (docs)
```

T-UX-501 と T-UX-502 は互いに独立。**Codex と Sonnet が同時着手できる**。
T-UX-503 は T-UX-501 完了後が望ましい（white card surface 置換のタイミング合わせ）。

---

## Codex への指示

```
T-UX-501 を実行:
  1. tokens.css に --shadow-card / --shadow-card-hover を追加
  2. 下記7ファイルのカード border を削除し、box-shadow: var(--shadow-card) に置き換え
     - index.html: .tool-card
     - checklist.html: .section, .sec-score-card
     - diagnosis.html: .section, .result-card
     - traq.html: .traq-header, .result-card
     - ctla.html: .section, .result-card
     - pruning.html: .detail-card, .field
     - survey.html: .tree-card
  3. hover 時のみ --shadow-card-hover に切り替え（translateY は維持）
  4. 1タスク=1PR、branch: task/ux-501-card-shadow

T-UX-504 を T-UX-501 と並行して実行可:
  1. tokens.css に --gap-section / --gap-section-lg / --gap-element を追加
  2. 各ページ .wrap / section の margin/padding を token に置き換え
  3. branch: task/ux-504-section-gap
```

---

## 参照リンク

- ElevenLabs style: https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26
- Refero Styles: https://styles.refero.design/
- WCAG 2.5.5 (Touch targets): https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
- 現行 tokens: [assets/css/tokens.css](../assets/css/tokens.css)
