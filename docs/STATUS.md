# タスク進捗ボード

> [SPEC.md §6](SPEC.md) のタスクを実装する際、着手前にこのファイルを編集してclaim、完了時にdoneへ。詳細は [HANDOFF.md](HANDOFF.md) §1。

## 🚦 現在の進行ステージ: **Phase 0（緊急修正）**

raitopapa 承認済み運用ルール（2026-05-03 v1.2）:
- D1-D10 最終確定（[SPEC §8](SPEC.md)）。D2/D3/D4/D6 は Gate 後に確定
- **コスト上限 ¥500/月** 厳守（[SPEC §7.1](SPEC.md)）。超過する施策は claim 禁止
- **Phase 3 は需要検証 Gate（G1-G7）通過まで全件 blocked**（[SPEC §4.5](SPEC.md)）
- **本体 docs/ への統合は Codex 担当**（タスク T-DOCS-001）
- **Sonnet 初動は T-P0-001 / T-P0-002 / T-P0-003 の順で1タスク=1PR**

**凡例**:
- `todo` — 未着手
- `in-progress(name)` — 着手中（claude-sonnet / openai-codex / human）
- `review` — PR 提出済み、レビュー待ち
- `done` — マージ完了
- `blocked(理由)` — 依存待ち or 判断待ち

---

## メタ・運用タスク

| ID | タイトル | Owner | Status | 着手日 | Branch / PR |
|---|---|---|---|---|---|
| T-DOCS-001 | 本体 main の docs/ 統合（worktree → main、Codex版を CODEX_NOTES.md に保全） | openai-codex | done | 2026-05-03 | docs/SPEC.md, docs/HANDOFF.md, docs/STATUS.md |
| T-DOMAIN-001 | 独自ドメイン候補選定・取得（D10、年¥1,200-2,000） | human(raitopapa) | todo |  | — |
| T-MENTOR-001 | 監修者プロフィール匿名版（資格・経験・監修ポリシー）作成 | human(raitopapa) | todo |  | — |

## Phase 0: 緊急修正

| ID | タイトル | Status | 着手日 | Branch / PR |
|---|---|---|---|---|
| T-P0-001 | index.html の `.hero` CSS 破損修正 | done | 2026-05-03 | local |
| T-P0-002 | contact.html フォーム接続（Web3Forms 推奨） | done | 2026-05-03 | local |
| T-P0-003 | GA4 + Search Console 設置 | done | 2026-05-03 | local |
| T-P0-004 | 外部CDN ライブラリの SRI 化 | todo |  | — |

## Phase 1: 広告最適化

| ID | タイトル | Status | 着手日 | Branch / PR |
|---|---|---|---|---|
| T-P1-101 | 共通レイアウト抽出（partials） | todo |  | — |
| T-P1-102 | i18n を JSON 外出し化 | blocked(T-P1-101) |  | — |
| T-P1-103 | AdSense 配置の最適化 | blocked(T-P0-003) |  | — |
| T-P1-104 | アフィリエイト導線追加 | blocked(T-P1-103) |  | — |
| T-P1-105 | SW の整理（push/sync） | blocked(T-P1-101) |  | — |
| T-P1-106 | デザイントークン化 | blocked(T-P1-101) |  | — |
| T-P1-107 | SEO 強化（構造化データ） | in-progress(claude-sonnet) | 2026-05-03 | task/T-P1-107-seo-structured-data |

## Phase 2: コンテンツSEO + メール

| ID | タイトル | Status | 着手日 | Branch / PR |
|---|---|---|---|---|
| T-P2-201 | ブログ基盤（Jekyll posts） | blocked(T-P1-101) |  | — |
| T-P2-202 | 季節記事25本執筆 | blocked(T-P2-201) |  | — |
| T-P2-203 | 樹木用語集ページ | blocked(T-P2-201) |  | — |
| T-P2-204 | 埋め込みウィジェット配布 | blocked(T-P1-102) |  | — |
| T-P2-205 | メール購読 + 季節リマインダー | blocked(T-P2-201) |  | — |
| T-P2-206 | 内部リンク網の整備 | blocked(T-P2-201, T-P2-203) |  | — |

## Phase 3: Freemium + B2B SaaS（全件 Gate 通過まで凍結）

> **重要**: 全タスクは [SPEC §4.5 凍結ゲート（G1-G7）](SPEC.md) 通過まで `blocked(gate)`。Phase 3 凍結中は新規 claim 禁止。Codex 合意事項。

| ID | タイトル | Status | 着手日 | Branch / PR |
|---|---|---|---|---|
| T-P3-301 | Supabase スキーマ設計 | blocked(gate) |  | — |
| T-P3-302 | 認証 UI | blocked(gate) |  | — |
| T-P3-303 | IndexedDB ↔ Supabase 同期 | blocked(gate) |  | — |
| T-P3-304 | Stripe 決済 | blocked(gate) |  | — |
| T-P3-305 | Pro 機能ゲート | blocked(gate) |  | — |
| T-P3-306 | PDF レポート出力 | blocked(gate) |  | — |
| T-P3-307 | 写真AI診断（Claude haiku） | blocked(gate, D3=保留) |  | — |
| T-P3-308 | 法人プラン UI | blocked(gate) |  | — |
| T-P3-309 | EXIF GPS 読み取り | blocked(gate, T-P1-101) |  | — |
| T-P3-310 | 樹木QR 現地貼付フロー強化 | blocked(gate) |  | — |

## Phase 4: 探索

| ID | タイトル | Status |
|---|---|---|
| T-P4-401 | 樹種同定 API 公開 | future |
| T-P4-402 | PLATEAU 連携 | future |
| T-P4-403 | 多言語追加（ko, zh-TW, de） | future |
| T-P4-404 | ネイティブアプリ化（Capacitor） | future |

---

## 判断待ち（raitopapa）

すべて raitopapa の手作業タスク（コーディング不要）:
- T-DOMAIN-001: ドメイン候補から1つ選定・取得（年¥1,200-2,000）
- T-MENTOR-001: 監修者プロフィール（匿名版）の本文ドラフト
- D2/D3/D4/D6: Phase 3 Gate 通過 or D5 第2段階達成時に再検討

## 直近の Sonnet への指示（raitopapa 承認済 2026-05-03）

```
着手順（1タスク=1PR、コスト¥0で完結）:
  1. T-P0-001 (.hero CSS 修正) — 最初の1コミット
  2. T-P0-002 (Contact form 接続) — Web3Forms（無料・無制限）
  3. T-P0-003 (GA4 + Search Console) — privacy.html も同時更新

P0 完了後:
  - T-P0-004 (SRI) → Phase 1 (T-P1-101 共通レイアウト抽出 から)
```

## 直近の Codex への指示（raitopapa 承認済 2026-05-03）

```
T-DOCS-001 を実行:
  1. main で本 worktree の docs/ を取り込み
  2. Codex 既存の docs/SPEC.md / HANDOFF_LOG.md を CODEX_NOTES.md に退避
  3. 統合PR を作成・マージ
完了後:
  - Sonnet と並行して T-P0-002 or T-P0-003 を着手可能
  - Phase 1 では T-P1-104 (アフィリエイト) や T-P1-107 (SEO 構造化データ) が向く
```

各タスクは独立PR、HANDOFF.md §1 のclaim手順厳守。コスト発生施策は §SPEC §7.1 を参照。
